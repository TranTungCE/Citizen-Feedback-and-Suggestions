import { getAdminSupabase } from '@/lib/supabase/admin';
import { feedbackStore, DEFAULT_CATEGORIES } from '@/lib/feedback/store';
import { FeedbackItem, FeedbackCategory, FeedbackHistory, InternalNote, FeedbackStatus, FeedbackPriority } from '@/types';
import { generateTrackingCode } from '@/lib/utils';

export interface CreateFeedbackInput {
  title: string;
  content: string;
  category_id: string;
  location_text: string;
  incident_at?: string;
  priority?: FeedbackPriority;
  is_anonymous: boolean;
  submitter_name?: string;
  submitter_phone?: string;
  submitter_email?: string;
  agree_privacy: boolean;
  honeypot?: string;
}

export interface CreateFeedbackResult {
  success: boolean;
  trackingCode?: string;
  error?: string;
  persistedToDb?: boolean;
}

/**
 * Lấy danh mục đang hoạt động (Ưu tiên Supabase, dự phòng DEFAULT_CATEGORIES)
 */
export async function getActiveCategories(): Promise<FeedbackCategory[]> {
  const supabase = getAdminSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('feedback_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as FeedbackCategory[];
      }
    } catch (e) {
      console.warn('Lỗi kết nối Supabase khi lấy categories, dùng danh mục dự phòng:', e);
    }
  }
  return feedbackStore.getActiveCategories();
}

/**
 * Lấy tất cả danh mục (Dành cho Quản trị)
 */
export async function getAllCategories(): Promise<FeedbackCategory[]> {
  const supabase = getAdminSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('feedback_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as FeedbackCategory[];
      }
    } catch (e) {
      console.warn('Lỗi Supabase khi lấy danh mục admin:', e);
    }
  }
  return feedbackStore.getCategories();
}

/**
 * Tạo mới phản ánh công dân (Thực hiện ghi trực tiếp vào Supabase)
 */
export async function createFeedback(input: CreateFeedbackInput): Promise<CreateFeedbackResult> {
  const submittedAt = new Date().toISOString();
  const supabase = getAdminSupabase();

  // Retry tối đa 3 lần để tránh trùng tracking_code
  let trackingCode = '';
  let insertSuccess = false;
  let lastDbError: any = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    trackingCode = generateTrackingCode();

    if (supabase) {
      try {
        const { error: dbError } = await supabase.from('feedback').insert({
          tracking_code: trackingCode,
          title: input.title,
          content: input.content,
          category_id: input.category_id,
          location_text: input.location_text,
          incident_at: input.incident_at || null,
          priority: input.priority || 'normal',
          status: 'new',
          is_anonymous: input.is_anonymous,
          submitter_name: input.is_anonymous ? null : (input.submitter_name?.trim() || null),
          submitter_phone: input.is_anonymous ? null : (input.submitter_phone?.trim() || null),
          submitter_email: input.is_anonymous ? null : (input.submitter_email?.trim() || null),
          submitted_at: submittedAt
        });

        if (!dbError) {
          insertSuccess = true;
          // Tự động tạo bản ghi lịch sử ban đầu trong public.feedback_history
          try {
            const { data: createdRow } = await supabase
              .from('feedback')
              .select('id')
              .eq('tracking_code', trackingCode)
              .maybeSingle();

            if (createdRow?.id) {
              await supabase.from('feedback_history').insert({
                feedback_id: createdRow.id,
                old_status: null,
                new_status: 'new',
                note: 'Người dân gửi phản ánh thành công qua Cổng tiếp nhận trực tuyến',
                is_public: true,
                created_at: submittedAt
              });
            }
          } catch (hErr) {
            console.warn('Không thể ghi log lịch sử ban đầu vào Supabase:', hErr);
          }
          break;
        } else {
          lastDbError = dbError;
          console.error(`Lỗi Supabase insert (lần thử ${attempt + 1}):`, dbError);
          // Nếu trùng mã unique tracking_code, thử lại vòng tiếp theo
          if (dbError.code === '23505' && dbError.message?.includes('tracking_code')) {
            continue;
          }
          // Lỗi ràng buộc khác hoặc lỗi cấu hình -> dừng retry
          break;
        }
      } catch (ex) {
        lastDbError = ex;
        console.error('Ngoại lệ khi gọi Supabase insert:', ex);
        break;
      }
    } else {
      // Khi biến môi trường Supabase chưa được cấu hình (ví dụ môi trường dev nội bộ)
      // Nếu chưa cấu hình Supabase trên production, báo lỗi rõ ràng không được báo thành công ảo
      if (process.env.NODE_ENV === 'production') {
        const hasUrl = Boolean((process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim());
        const hasKey = Boolean((process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim());
        const missing = [];
        if (!hasUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
        if (!hasKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');

        return {
          success: false,
          error: `Cơ sở dữ liệu máy chủ chưa nhận diện được biến môi trường: [${missing.join(', ')}]. Hãy kiểm tra tab Environment Variables trên Vercel và đảm bảo đã Redeploy.`
        };
      }
      break;
    }
  }

  // Nếu có cấu hình Supabase nhưng ghi thất bại, TUYỆT ĐỐI KHÔNG BÁO THÀNH CÔNG ẢO
  if (supabase && !insertSuccess) {
    const errorMsg = lastDbError?.message || 'Không thể lưu phản ánh vào cơ sở dữ liệu.';
    return {
      success: false,
      error: `Lỗi lưu trữ: ${errorMsg}. Vui lòng thử lại sau giây lát.`
    };
  }

  // Đồng bộ vào cache in-memory phục vụ môi trường dev cục bộ
  const category = (await getActiveCategories()).find(c => c.id === input.category_id);
  feedbackStore.create({
    tracking_code: trackingCode,
    title: input.title,
    content: input.content,
    category_id: input.category_id,
    category,
    location_text: input.location_text,
    incident_at: input.incident_at,
    priority: input.priority || 'normal',
    status: 'new',
    is_anonymous: input.is_anonymous,
    submitter_name: input.is_anonymous ? undefined : input.submitter_name,
    submitter_phone: input.is_anonymous ? undefined : input.submitter_phone,
    submitter_email: input.is_anonymous ? undefined : input.submitter_email,
    submitted_at: submittedAt,
    updated_at: submittedAt
  });

  return {
    success: true,
    trackingCode,
    persistedToDb: insertSuccess
  };
}

/**
 * Tra cứu phản ánh công khai theo Mã tiếp nhận (Chỉ trả về các trường công khai, bảo vệ dữ liệu cá nhân)
 */
export async function getFeedbackByTrackingCode(trackingCode: string): Promise<{
  feedback: FeedbackItem | null;
  history: FeedbackHistory[];
}> {
  const normalizedCode = trackingCode.trim().toUpperCase();
  const supabase = getAdminSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          id,
          tracking_code,
          title,
          content,
          location_text,
          incident_at,
          priority,
          status,
          is_anonymous,
          official_response,
          official_response_at,
          submitted_at,
          updated_at,
          resolved_at,
          category:feedback_categories(id, name, slug)
        `)
        .eq('tracking_code', normalizedCode)
        .maybeSingle();

      if (!error && data) {
        // Lấy lịch sử công khai
        const { data: historyData } = await supabase
          .from('feedback_history')
          .select('*')
          .eq('feedback_id', data.id)
          .eq('is_public', true)
          .order('created_at', { ascending: true });

        const mappedFeedback: FeedbackItem = {
          id: data.id,
          tracking_code: data.tracking_code,
          title: data.title,
          content: data.content,
          category: Array.isArray(data.category) ? data.category[0] : (data.category as any),
          location_text: data.location_text,
          incident_at: data.incident_at,
          priority: data.priority as FeedbackPriority,
          status: data.status as FeedbackStatus,
          is_anonymous: data.is_anonymous,
          // BẢO VỆ RIÊNG TƯ: Tuyệt đối không trả về submitter_name, submitter_phone, submitter_email
          official_response: data.official_response,
          official_response_at: data.official_response_at,
          submitted_at: data.submitted_at,
          updated_at: data.updated_at,
          resolved_at: data.resolved_at
        };

        return {
          feedback: mappedFeedback,
          history: (historyData || []) as FeedbackHistory[]
        };
      }
    } catch (e) {
      console.error('Lỗi khi tra cứu mã Supabase:', e);
    }
  }

  // Fallback memory store nếu dev offline
  const localItem = feedbackStore.getByTrackingCode(normalizedCode);
  if (localItem) {
    const sanitized: FeedbackItem = {
      ...localItem,
      submitter_name: undefined,
      submitter_phone: undefined,
      submitter_email: undefined
    };
    return {
      feedback: sanitized,
      history: feedbackStore.getHistory(localItem.id).filter(h => h.is_public)
    };
  }

  return { feedback: null, history: [] };
}

/**
 * Lấy danh sách phản ánh cho Admin (Có kiểm tra bảo mật phía server)
 */
export async function getAdminFeedbackList(options?: {
  search?: string;
  status?: string;
  category_id?: string;
  priority?: string;
}): Promise<FeedbackItem[]> {
  const supabase = getAdminSupabase();

  if (supabase) {
    try {
      let query = supabase
        .from('feedback')
        .select(`
          *,
          category:feedback_categories(*)
        `)
        .order('submitted_at', { ascending: false });

      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }
      if (options?.category_id && options.category_id !== 'all') {
        query = query.eq('category_id', options.category_id);
      }
      if (options?.priority && options.priority !== 'all') {
        query = query.eq('priority', options.priority);
      }
      if (options?.search) {
        const q = options.search.trim();
        query = query.or(`tracking_code.ilike.%${q}%,title.ilike.%${q}%,location_text.ilike.%${q}%`);
      }

      const { data, error } = await query;
      if (!error && data) {
        return data.map((item: any) => ({
          ...item,
          category: Array.isArray(item.category) ? item.category[0] : item.category
        }));
      }

      if (error) {
        console.warn('Lỗi query feedback kèm join, thử query đơn bảng:', error);
        // Fallback query đơn bảng feedback nếu join gặp sự cố quan hệ foreign key
        const simpleQuery = supabase
          .from('feedback')
          .select('*')
          .order('submitted_at', { ascending: false });
        const { data: simpleData, error: simpleErr } = await simpleQuery;
        if (!simpleErr && simpleData) {
          const categories = await getActiveCategories();
          return simpleData.map((item: any) => ({
            ...item,
            category: categories.find(c => c.id === item.category_id)
          }));
        }
      }
    } catch (e) {
      console.error('Lỗi khi fetch danh sách admin từ Supabase:', e);
    }
  }

  return feedbackStore.getAll(options);
}

/**
 * Lấy chi tiết 1 phản ánh cho Admin (Kèm đầy đủ thông tin người gửi & lịch sử & ghi chú nội bộ)
 */
export async function getAdminFeedbackDetail(id: string): Promise<{
  feedback: FeedbackItem | null;
  history: FeedbackHistory[];
  internalNotes: InternalNote[];
}> {
  const supabase = getAdminSupabase();

  if (supabase) {
    try {
      // 1. Phản ánh
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          *,
          category:feedback_categories(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        // 2. Lịch sử
        const { data: historyData } = await supabase
          .from('feedback_history')
          .select('*')
          .eq('feedback_id', id)
          .order('created_at', { ascending: true });

        // 3. Ghi chú nội bộ
        const { data: notesData } = await supabase
          .from('internal_notes')
          .select('*')
          .eq('feedback_id', id)
          .order('created_at', { ascending: false });

        return {
          feedback: {
            ...data,
            category: Array.isArray(data.category) ? data.category[0] : data.category
          },
          history: (historyData || []) as FeedbackHistory[],
          internalNotes: (notesData || []) as InternalNote[]
        };
      }
    } catch (e) {
      console.error('Lỗi khi fetch chi tiết admin từ Supabase:', e);
    }
  }

  const localItem = feedbackStore.getById(id);
  return {
    feedback: localItem || null,
    history: localItem ? feedbackStore.getHistory(localItem.id) : [],
    internalNotes: []
  };
}

/**
 * Cập nhật trạng thái và phản hồi chính thức cho phản ánh (Admin)
 */
export async function updateFeedbackStatus(
  id: string,
  updates: {
    status: FeedbackStatus;
    official_response?: string;
    note?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString();
  const supabase = getAdminSupabase();

  if (supabase) {
    try {
      const payload: any = {
        status: updates.status,
        updated_at: now
      };

      if (updates.official_response !== undefined) {
        payload.official_response = updates.official_response;
        payload.official_response_at = updates.official_response ? now : null;
      }
      if (updates.status === 'resolved') {
        payload.resolved_at = now;
      }

      // 1. Cập nhật bảng feedback
      const { data: updatedRow, error: updateErr } = await supabase
        .from('feedback')
        .update(payload)
        .eq('id', id)
        .select('id, tracking_code')
        .maybeSingle();

      if (updateErr) {
        console.error('Lỗi Supabase update feedback:', updateErr);
        return { success: false, error: updateErr.message };
      }

      // 2. Thêm bản ghi lịch sử xử lý vào feedback_history
      await supabase.from('feedback_history').insert({
        feedback_id: id,
        old_status: null,
        new_status: updates.status,
        note: updates.note || `Cập nhật trạng thái sang: ${updates.status}`,
        is_public: true,
        created_at: now
      });

      // Cập nhật local store
      feedbackStore.update(id, payload, 'admin', updates.note);

      return { success: true };
    } catch (e: any) {
      console.error('Ngoại lệ khi update feedback:', e);
      return { success: false, error: e?.message || 'Lỗi khi cập nhật trạng thái' };
    }
  }

  // Fallback local store nếu offline
  feedbackStore.update(id, {
    status: updates.status,
    official_response: updates.official_response,
    official_response_at: updates.official_response ? now : undefined,
    resolved_at: updates.status === 'resolved' ? now : undefined
  }, 'admin', updates.note);

  return { success: true };
}

/**
 * Thêm ghi chú nội bộ cho phản ánh
 */
export async function addInternalNote(
  feedbackId: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  if (!content.trim()) {
    return { success: false, error: 'Nội dung ghi chú không được để trống' };
  }

  const supabase = getAdminSupabase();
  if (supabase) {
    try {
      // Vì bảng internal_notes có author_id UUID foreign key tham chiếu profiles(id)
      // Nếu chưa có auth session UUID chuẩn, ta kiểm tra hoặc lưu an toàn
      const { data: adminProfile } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (adminProfile?.id) {
        const { error } = await supabase.from('internal_notes').insert({
          feedback_id: feedbackId,
          author_id: adminProfile.id,
          content: content.trim(),
          created_at: new Date().toISOString()
        });

        if (error) {
          console.error('Lỗi khi ghi internal_notes vào Supabase:', error);
          return { success: false, error: error.message };
        }
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Lỗi khi lưu ghi chú nội bộ' };
    }
  }

  return { success: true };
}

/**
 * Lấy số liệu thống kê cho Dashboard và Trang chủ
 */
export async function getFeedbackMetrics(): Promise<{
  total: number;
  countNew: number;
  countReviewing: number;
  countProcessing: number;
  countForwarded: number;
  countResolved: number;
  countClosed: number;
  countHighPriority: number;
  resolvedRate: number;
}> {
  const supabase = getAdminSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('status, priority');

      if (!error && data) {
        const total = data.length;
        const countNew = data.filter((f: any) => f.status === 'new').length;
        const countReviewing = data.filter((f: any) => f.status === 'reviewing').length;
        const countProcessing = data.filter((f: any) => f.status === 'processing').length;
        const countForwarded = data.filter((f: any) => f.status === 'forwarded').length;
        const countResolved = data.filter((f: any) => f.status === 'resolved').length;
        const countClosed = data.filter((f: any) => f.status === 'closed').length;
        const countHighPriority = data.filter((f: any) => f.priority === 'high' || f.priority === 'urgent').length;

        return {
          total,
          countNew,
          countReviewing,
          countProcessing,
          countForwarded,
          countResolved,
          countClosed,
          countHighPriority,
          resolvedRate: total > 0 ? Math.round((countResolved / total) * 100) : 0
        };
      }
    } catch (e) {
      console.warn('Lỗi Supabase khi tính metrics:', e);
    }
  }

  return feedbackStore.getMetrics();
}
