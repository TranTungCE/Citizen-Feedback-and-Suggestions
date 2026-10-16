import { NextResponse } from 'next/server';
import { feedbackStore } from '@/lib/feedback/store';
import { getAdminSupabase } from '@/lib/supabase/admin';
import { FeedbackItem } from '@/types';

export async function GET() {
  const supabaseAdmin = getAdminSupabase();

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('feedback')
        .select(`
          *,
          category:feedback_categories(*)
        `)
        .order('submitted_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Đồng bộ dữ liệu Supabase vào store trong bộ nhớ
        for (const item of data) {
          const mapped: FeedbackItem = {
            id: item.id,
            tracking_code: item.tracking_code,
            title: item.title,
            content: item.content,
            category_id: item.category_id,
            category: item.category,
            location_text: item.location_text,
            incident_at: item.incident_at,
            priority: item.priority,
            status: item.status,
            is_anonymous: item.is_anonymous,
            submitter_name: item.submitter_name,
            submitter_phone: item.submitter_phone,
            submitter_email: item.submitter_email,
            official_response: item.official_response,
            official_response_at: item.official_response_at,
            submitted_at: item.submitted_at,
            updated_at: item.updated_at,
            resolved_at: item.resolved_at
          };
          if (!feedbackStore.getById(mapped.id) && !feedbackStore.getByTrackingCode(mapped.tracking_code)) {
            feedbackStore.create(mapped);
          }
        }
      }
    } catch (err) {
      console.error('Lỗi khi fetch Supabase:', err);
    }
  }

  const allItems = feedbackStore.getAll();
  return NextResponse.json({
    success: true,
    data: allItems
  });
}
