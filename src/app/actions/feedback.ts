'use server';

import { feedbackSubmissionSchema, FeedbackSubmissionForm } from '@/lib/validation/feedback';
import { feedbackStore, DEFAULT_CATEGORIES } from '@/lib/feedback/store';
import { generateTrackingCode } from '@/lib/utils';
import { sendTransactionalEmail } from '@/lib/email/resend';
import { getAdminSupabase } from '@/lib/supabase/admin';

export interface SubmitFeedbackResult {
  success: boolean;
  trackingCode?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export async function submitFeedbackAction(formData: FeedbackSubmissionForm): Promise<SubmitFeedbackResult> {
  // 1. Kiểm tra validation với Zod
  const validation = feedbackSubmissionSchema.safeParse(formData);
  if (!validation.success) {
    const errorFormatted: Record<string, string[]> = {};
    for (const issue of validation.error.issues) {
      const path = issue.path[0]?.toString() || 'general';
      if (!errorFormatted[path]) errorFormatted[path] = [];
      errorFormatted[path].push(issue.message);
    }
    return {
      success: false,
      error: 'Vui lòng kiểm tra lại các trường dữ liệu bắt buộc.',
      errors: errorFormatted
    };
  }

  const data = validation.data;

  // Chống Spam Honeypot
  if (data.honeypot && data.honeypot.length > 0) {
    return { success: false, error: 'Hành vi gửi thông tin không hợp lệ.' };
  }

  // 2. Tạo mã tiếp nhận định dạng chuẩn
  const trackingCode = generateTrackingCode();
  const submittedAt = new Date().toISOString();

  // 3. Chuẩn bị bản ghi
  const category = DEFAULT_CATEGORIES.find((c) => c.id === data.category_id);

  // Thử lưu vào Supabase nếu đã có cấu hình thực tế
  const supabaseAdmin = getAdminSupabase();
  if (supabaseAdmin) {
    try {
      const { error: dbError } = await supabaseAdmin.from('feedback').insert({
        tracking_code: trackingCode,
        title: data.title,
        content: data.content,
        category_id: data.category_id,
        location_text: data.location_text,
        incident_at: data.incident_at || null,
        priority: data.priority,
        status: 'new',
        is_anonymous: data.is_anonymous,
        submitter_name: data.is_anonymous ? null : data.submitter_name,
        submitter_phone: data.is_anonymous ? null : data.submitter_phone,
        submitter_email: data.is_anonymous ? null : data.submitter_email,
        submitted_at: submittedAt
      });

      if (dbError) {
        console.error('Lỗi khi ghi dữ liệu Supabase:', dbError);
      }
    } catch (e) {
      console.error('Ngoại lệ kết nối Supabase:', e);
    }
  }

  // Đồng thời lưu vào local feedback store (đảm bảo hoạt động trơn tru ngay cả khi đang cấu hình ban đầu)
  feedbackStore.create({
    tracking_code: trackingCode,
    title: data.title,
    content: data.content,
    category_id: data.category_id,
    category: category,
    location_text: data.location_text,
    incident_at: data.incident_at,
    priority: data.priority,
    status: 'new',
    is_anonymous: data.is_anonymous,
    submitter_name: data.is_anonymous ? undefined : data.submitter_name,
    submitter_phone: data.is_anonymous ? undefined : data.submitter_phone,
    submitter_email: data.is_anonymous ? undefined : data.submitter_email,
    submitted_at: submittedAt,
    updated_at: submittedAt
  });

  // 4. Gửi email xác nhận nếu người dân cung cấp email
  if (!data.is_anonymous && data.submitter_email) {
    await sendTransactionalEmail({
      to: data.submitter_email,
      subject: `[MTTQ Phường Diên Hồng] Tiếp nhận phản ánh - Mã ${trackingCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="background-color: #8B0000; color: #fff; padding: 18px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 18px; color: #FFD700;">ỦY BAN MTTQ VIỆT NAM PHƯỜNG DIÊN HỒNG</h2>
            <p style="margin: 4px 0 0; font-size: 14px;">Cổng tiếp nhận góp ý, phản ánh Nhân dân</p>
          </div>
          <div style="padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; background: #fafafa;">
            <p>Kính gửi <strong>${data.submitter_name || 'Quý công dân'}</strong>,</p>
            <p>Ủy ban MTTQ Việt Nam Phường Diên Hồng xác nhận đã tiếp nhận ý kiến đóng góp/phản ánh của Quý công dân với thông tin chi tiết như sau:</p>
            <div style="background: #fff; padding: 16px; border-radius: 6px; border-left: 4px solid #8B0000; margin: 16px 0;">
              <p style="margin: 4px 0;"><strong>Mã tiếp nhận:</strong> <span style="font-size: 18px; color: #8B0000; font-weight: bold;">${trackingCode}</span></p>
              <p style="margin: 4px 0;"><strong>Tiêu đề:</strong> ${data.title}</p>
              <p style="margin: 4px 0;"><strong>Địa điểm:</strong> ${data.location_text}</p>
              <p style="margin: 4px 0;"><strong>Trạng thái:</strong> Mới tiếp nhận (Chờ phân loại)</p>
            </div>
            <p>Quý công dân có thể sử dụng Mã tiếp nhận <strong>${trackingCode}</strong> để tra cứu tiến độ giải quyết trực tuyến bất kỳ lúc nào.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666; margin: 0;">
              * Lưu ý: Việc tiếp nhận thông tin không đồng nghĩa với việc sự việc đã được giải quyết xong. Cán bộ MTTQ sẽ tiến hành kiểm tra, xác minh và chuyển cơ quan có thẩm quyền xử lý theo quy định.
            </p>
          </div>
        </div>
      `
    });
  }

  return {
    success: true,
    trackingCode
  };
}
