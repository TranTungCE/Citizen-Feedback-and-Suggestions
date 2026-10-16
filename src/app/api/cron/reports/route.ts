import { NextRequest, NextResponse } from 'next/server';
import { generateReportData, renderReportEmailHtml } from '@/lib/reporting';
import { sendTransactionalEmail, isResendConfigured } from '@/lib/email/resend';
import { getAdminSupabase } from '@/lib/supabase/admin';
import { feedbackStore } from '@/lib/feedback/store';
import { verifyAdminSessionFromRequest } from '@/lib/auth/admin';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'anthoidong_cron_secret_2026';
  const url = new URL(req.url);
  const secretParam = url.searchParams.get('secret');
  const isAdmin = verifyAdminSessionFromRequest(req);

  const isAuthorized = 
    (authHeader === `Bearer ${cronSecret}`) ||
    (secretParam === cronSecret) ||
    isAdmin;

  if (!isAuthorized && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Không có quyền truy cập tác vụ tự động' }, { status: 401 });
  }

  const type = (url.searchParams.get('type') as 'daily' | 'weekly' | 'monthly') || 'daily';
  const customTo = url.searchParams.get('to');
  const reportData = await generateReportData(type);
  const emailHtml = renderReportEmailHtml(reportData);

  // Lấy email người nhận: ưu tiên param ?to=, sau đó từ store, rồi đến env
  const recipientConfig = customTo || feedbackStore.getRecipientEmails() || process.env.REPORT_RECIPIENT_EMAILS || 'tung.trandt2413883@hcmut.edu.vn';
  const recipients = recipientConfig.split(',').map((e) => e.trim()).filter(Boolean);

  const idempotencyKey = `${type}:${new Date().toISOString().slice(0, 10)}:${Date.now()}`;

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
      subject: `[BÁO CÁO ${type.toUpperCase()}] MTTQ Phường Diên Hồng - ${reportData.periodLabel}`,
      html: emailHtml
    });
  }

  return NextResponse.json({
    success: true,
    message: `Đã kết xuất báo cáo và chuyển lệnh gửi thư đến ${recipients.join(', ')}`,
    idempotencyKey,
    period: reportData.periodLabel,
    totalRecords: reportData.totalReceived,
    recipients,
    emailResult: sendResult
  });
}
