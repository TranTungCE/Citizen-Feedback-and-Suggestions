import { NextRequest, NextResponse } from 'next/server';
import { generateReportData, renderReportEmailHtml } from '@/lib/reporting';
import { sendTransactionalEmail, isResendConfigured } from '@/lib/email/resend';
import { getAdminSupabase } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  // 1. Kiểm tra xác thực Bearer token hoặc secret query param để chống spam
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'anthoidong_cron_secret_2026';
  const url = new URL(req.url);
  const secretParam = url.searchParams.get('secret');

  if (
    authHeader !== `Bearer ${cronSecret}` &&
    secretParam !== cronSecret &&
    process.env.NODE_ENV === 'production'
  ) {
    return NextResponse.json({ error: 'Không có quyền truy cập tác vụ tự động' }, { status: 401 });
  }

  const type = (url.searchParams.get('type') as 'daily' | 'weekly' | 'monthly') || 'daily';
  const reportData = generateReportData(type);
  const emailHtml = renderReportEmailHtml(reportData);

  // Danh sách email người nhận từ biến môi trường
  const recipientConfig = process.env.REPORT_RECIPIENT_EMAILS || 'lanhdao.anthoidong@gmail.com';
  const recipients = recipientConfig.split(',').map((e) => e.trim()).filter(Boolean);

  const idempotencyKey = `${type}:${new Date().toISOString().slice(0, 10)}`;

  // Thử lưu log vào Supabase nếu có
  const supabase = getAdminSupabase();
  if (supabase) {
    await supabase.from('report_runs').insert({
      report_type: type,
      period_start: new Date().toISOString(),
      period_end: new Date().toISOString(),
      idempotency_key: idempotencyKey,
      status: 'pending',
      recipient_summary: recipients.join(', ')
    });
  }

  // 2. Gửi email
  let sendResult: { success: boolean; messageId: string | null; error: string | null } = {
    success: false,
    messageId: null,
    error: 'Chưa cấu hình dịch vụ Resend'
  };
  if (isResendConfigured()) {
    sendResult = await sendTransactionalEmail({
      to: recipients,
      subject: `[BÁO CÁO ${type.toUpperCase()}] MTTQ Xã An Thới Đông - ${reportData.periodLabel}`,
      html: emailHtml
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Tác vụ tổng hợp báo cáo đã thực thi',
    idempotencyKey,
    period: reportData.periodLabel,
    totalRecords: reportData.totalReceived,
    emailResult: sendResult
  });
}
