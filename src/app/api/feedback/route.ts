import { NextRequest, NextResponse } from 'next/server';
import { getAdminFeedbackList } from '@/lib/feedback/service';
import { verifyAdminSessionFromRequest } from '@/lib/auth/admin';

export async function GET(req: NextRequest) {
  // BẢO MẬT: Bắt buộc phiên đăng nhập Admin hợp lệ mới được lấy danh sách toàn bộ phản ánh
  const isAdmin = verifyAdminSessionFromRequest(req);
  if (!isAdmin) {
    return NextResponse.json({
      success: false,
      error: 'Yêu cầu quyền quản trị viên để truy cập danh sách này.'
    }, { status: 401 });
  }

  const url = new URL(req.url);
  const search = url.searchParams.get('search') || undefined;
  const status = url.searchParams.get('status') || undefined;
  const category_id = url.searchParams.get('category_id') || undefined;
  const priority = url.searchParams.get('priority') || undefined;

  const items = await getAdminFeedbackList({
    search,
    status,
    category_id,
    priority
  });

  return NextResponse.json({
    success: true,
    data: items
  });
}
