'use server';

import { verifyAdminSession } from '@/lib/auth/admin';
import { generateReportData as generateReportDataService, ReportData } from '@/lib/reporting';

export async function getReportPreviewAction(type: 'daily' | 'weekly' | 'monthly'): Promise<{
  success: boolean;
  data?: ReportData;
  error?: string;
}> {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return { success: false, error: 'Không có quyền truy cập quản trị.' };
  }

  const data = await generateReportDataService(type);
  return { success: true, data };
}
