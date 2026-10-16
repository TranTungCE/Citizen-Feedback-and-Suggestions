'use server';

import { feedbackSubmissionSchema, FeedbackSubmissionForm } from '@/lib/validation/feedback';
import { createFeedback } from '@/lib/feedback/service';
import { sendTransactionalEmail } from '@/lib/email/resend';

export interface SubmitFeedbackResult {
  success: boolean;
  trackingCode?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export async function submitFeedbackAction(formData: FeedbackSubmissionForm): Promise<SubmitFeedbackResult> {
  // 1. Kiểm tra validation nghiêm ngặt với Zod
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

  // 2. Chống Spam Honeypot
  if (data.honeypot && data.honeypot.length > 0) {
    return { success: false, error: 'Hành vi gửi thông tin không hợp lệ.' };
  }

  // 3. Thực hiện lưu trữ bền vững vào Supabase
  const result = await createFeedback({
    title: data.title,
    content: data.content,
    category_id: data.category_id,
    location_text: data.location_text,
    incident_at: data.incident_at,
    priority: data.priority,
    is_anonymous: data.is_anonymous,
    submitter_name: data.submitter_name,
    submitter_phone: data.submitter_phone,
    submitter_email: data.submitter_email,
    agree_privacy: data.agree_privacy,
    honeypot: data.honeypot
  });

  if (!result.success || !result.trackingCode) {
    return {
      success: false,
      error: result.error || 'Không thể lưu phản ánh vào cơ sở dữ liệu. Vui lòng thử lại.'
    };
  }

  const trackingCode = result.trackingCode;

  // 4. Gửi email xác nhận nếu người dân cung cấp email (Không làm fail transaction nếu gửi email lỗi)
  if (!data.is_anonymous && data.submitter_email) {
    try {
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
    } catch (emailErr) {
      console.warn('Lỗi gửi email xác nhận cho công dân (dữ liệu phản ánh đã lưu an toàn):', emailErr);
    }
  }

  return {
    success: true,
    trackingCode
  };
}
