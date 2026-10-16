import { NextRequest, NextResponse } from 'next/server';
import { getFeedbackByTrackingCode } from '@/lib/feedback/service';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code || !code.trim()) {
    return NextResponse.json({
      success: false,
      error: 'Vui lòng cung cấp mã tiếp nhận'
    }, { status: 400 });
  }

  try {
    const { feedback, history } = await getFeedbackByTrackingCode(code);
    if (!feedback) {
      return NextResponse.json({
        success: false,
        error: 'Không tìm thấy phản ánh với mã tiếp nhận này'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        feedback,
        history
      }
    });
  } catch (err: any) {
    console.error('Lỗi khi tra cứu mã phản ánh:', err);
    return NextResponse.json({
      success: false,
      error: 'Lỗi máy chủ khi tra cứu mã phản ánh'
    }, { status: 500 });
  }
}
