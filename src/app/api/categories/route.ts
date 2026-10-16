import { NextResponse } from 'next/server';
import { getActiveCategories } from '@/lib/feedback/service';

export async function GET() {
  try {
    const categories = await getActiveCategories();
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || 'Không thể tải danh mục'
    }, { status: 500 });
  }
}
