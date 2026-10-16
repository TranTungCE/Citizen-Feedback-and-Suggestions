'use server';

import { verifyAdminSession } from '@/lib/auth/admin';
import { 
  updateFeedbackStatus as updateStatusService, 
  addInternalNote as addNoteService,
  getAdminFeedbackDetail as getDetailService,
  getAllCategories as getCategoriesService
} from '@/lib/feedback/service';
import { FeedbackStatus } from '@/types';
import { feedbackStore } from '@/lib/feedback/store';
import { getAdminSupabase } from '@/lib/supabase/admin';

/**
 * Server Action: Cập nhật trạng thái và phản hồi chính thức (Yêu cầu phiên Admin)
 */
export async function updateFeedbackStatusAction(
  id: string,
  updates: {
    status: FeedbackStatus;
    official_response?: string;
    note?: string;
  }
) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: 'Không có quyền truy cập quản trị.' };
  }

  return await updateStatusService(id, updates);
}

/**
 * Server Action: Thêm ghi chú nội bộ cán bộ
 */
export async function addInternalNoteAction(feedbackId: string, content: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: 'Không có quyền truy cập quản trị.' };
  }

  return await addNoteService(feedbackId, content);
}

/**
 * Server Action: Lấy chi tiết phản ánh cho admin
 */
export async function getAdminFeedbackDetailAction(id: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: 'Không có quyền truy cập quản trị.' };
  }

  const data = await getDetailService(id);
  return { success: true, data };
}

/**
 * Server Action: Thêm mới danh mục lĩnh vực (Admin)
 */
export async function addCategoryAction(name: string, description: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: 'Không có quyền truy cập quản trị.' };
  }

  const supabase = getAdminSupabase();
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  if (supabase) {
    try {
      const { data, error } = await supabase.from('feedback_categories').insert({
        name,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        description,
        is_active: true,
        sort_order: 10
      }).select().single();

      if (!error && data) {
        return { success: true, data };
      }
      return { success: false, error: error?.message || 'Lỗi thêm danh mục' };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  }

  const created = feedbackStore.addCategory(name, description);
  return { success: true, data: created };
}

/**
 * Server Action: Cập nhật danh mục lĩnh vực (Admin)
 */
export async function updateCategoryAction(id: string, updates: { name?: string; description?: string; is_active?: boolean }) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: 'Không có quyền truy cập quản trị.' };
  }

  const supabase = getAdminSupabase();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('feedback_categories')
        .update(updates)
        .eq('id', id);

      if (!error) {
        return { success: true };
      }
      return { success: false, error: error.message };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  }

  feedbackStore.updateCategory(id, updates);
  return { success: true };
}

/**
 * Server Action: Xóa danh mục lĩnh vực (Admin)
 */
export async function deleteCategoryAction(id: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: 'Không có quyền truy cập quản trị.' };
  }

  const supabase = getAdminSupabase();
  if (supabase) {
    try {
      const { error } = await supabase
        .from('feedback_categories')
        .delete()
        .eq('id', id);

      if (!error) {
        return { success: true };
      }
      return { success: false, error: error.message };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  }

  feedbackStore.deleteCategory(id);
  return { success: true };
}
