import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const defaultFrom = process.env.EMAIL_FROM || 'Cổng Góp Ý An Thới Đông <onboarding@resend.dev>';

export const isResendConfigured = () => {
  return Boolean(resendApiKey && !resendApiKey.includes('your_api_key'));
};

const resendClient = isResendConfigured() ? new Resend(resendApiKey) : null;

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendTransactionalEmail(options: SendEmailOptions) {
  if (!isResendConfigured() || !resendClient) {
    return {
      success: false,
      messageId: null,
      error: 'Resend API Key chưa được cấu hình trong biến môi trường (RESEND_API_KEY).'
    };
  }

  try {
    const { data, error } = await resendClient.emails.send({
      from: options.from || defaultFrom,
      to: options.to,
      subject: options.subject,
      html: options.html
    });

    if (error) {
      return { success: false, messageId: null, error: error.message };
    }

    return { success: true, messageId: data?.id || null, error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định khi gửi email';
    return { success: false, messageId: null, error: errorMessage };
  }
}
