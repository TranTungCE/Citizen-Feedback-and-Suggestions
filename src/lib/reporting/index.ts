import { feedbackStore, STATUS_LABELS } from '@/lib/feedback/store';
import { formatVietnameseDate } from '@/lib/utils';

export interface ReportData {
  periodType: 'daily' | 'weekly' | 'monthly';
  periodLabel: string;
  totalReceived: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
  highPriorityCount: number;
  resolvedCount: number;
  highlightItems: Array<{
    code: string;
    title: string;
    status: string;
    location: string;
  }>;
}

export function generateReportData(type: 'daily' | 'weekly' | 'monthly'): ReportData {
  const all = feedbackStore.getAll();
  const metrics = feedbackStore.getMetrics();
  
  const today = new Date();
  let periodLabel = '';

  if (type === 'daily') {
    periodLabel = `Ngày ${formatVietnameseDate(today)}`;
  } else if (type === 'weekly') {
    periodLabel = `Tuần ${Math.ceil(today.getDate() / 7)}, Tháng ${today.getMonth() + 1}/${today.getFullYear()}`;
  } else {
    periodLabel = `Tháng ${today.getMonth() + 1}/${today.getFullYear()}`;
  }

  const byStatus: Record<string, number> = {};
  const byCategory: Record<string, number> = {};

  for (const item of all) {
    byStatus[item.status] = (byStatus[item.status] || 0) + 1;
    const catName = item.category?.name || 'Khác';
    byCategory[catName] = (byCategory[catName] || 0) + 1;
  }

  const highlightItems = all.slice(0, 5).map((f) => ({
    code: f.tracking_code,
    title: f.title,
    status: STATUS_LABELS[f.status]?.label || f.status,
    location: f.location_text
  }));

  return {
    periodType: type,
    periodLabel,
    totalReceived: all.length,
    byStatus,
    byCategory,
    highPriorityCount: metrics.countHighPriority,
    resolvedCount: metrics.countResolved,
    highlightItems
  };
}

export function renderReportEmailHtml(data: ReportData): string {
  const typeName = data.periodType === 'daily' ? 'HẰNG NGÀY' : data.periodType === 'weekly' ? 'HẰNG TUẦN' : 'HẰNG THÁNG';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #222; line-height: 1.5;">
      <div style="background-color: #8B0000; color: #ffffff; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h3 style="margin: 0; font-size: 14px; color: #FFD700; text-transform: uppercase;">Ủy ban MTTQ Việt Nam Xã An Thới Đông</h3>
        <h1 style="margin: 8px 0 0; font-size: 20px;">BÁO CÁO TỔNG HỢP GÓP Ý, PHẢN ÁNH ${typeName}</h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: #f0f0f0;">Thời gian: ${data.periodLabel}</p>
      </div>

      <div style="padding: 24px; border: 1px solid #e0e0e0; border-top: none; background: #ffffff; border-radius: 0 0 8px 8px;">
        <h2 style="font-size: 16px; color: #8B0000; border-bottom: 2px solid #8B0000; padding-bottom: 6px; margin-top: 0;">
          1. Số liệu tổng quan kỳ báo cáo
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee;"><strong>Tổng phản ánh tiếp nhận:</strong></td>
            <td style="padding: 10px; border: 1px solid #eee; text-align: right; font-weight: bold; font-size: 16px; color: #8B0000;">${data.totalReceived}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee;"><strong>Đã có kết quả giải quyết:</strong></td>
            <td style="padding: 10px; border: 1px solid #eee; text-align: right; font-weight: bold; color: #16a34a;">${data.resolvedCount}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #eee;"><strong>Số lượng phản ánh mức độ cao / khẩn:</strong></td>
            <td style="padding: 10px; border: 1px solid #eee; text-align: right; font-weight: bold; color: #ea580c;">${data.highPriorityCount}</td>
          </tr>
        </table>

        <h2 style="font-size: 16px; color: #8B0000; border-bottom: 2px solid #8B0000; padding-bottom: 6px;">
          2. Phân loại theo Lĩnh vực
        </h2>
        <ul style="padding-left: 20px; font-size: 14px; margin-bottom: 20px;">
          ${Object.entries(data.byCategory).map(([cat, count]) => `
            <li style="margin-bottom: 6px;"><strong>${cat}:</strong> ${count} phản ánh</li>
          `).join('')}
        </ul>

        <h2 style="font-size: 16px; color: #8B0000; border-bottom: 2px solid #8B0000; padding-bottom: 6px;">
          3. Danh sách phản ánh cần lưu ý
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
          <thead>
            <tr style="background: #f0f0f0; text-align: left;">
              <th style="padding: 8px; border: 1px solid #ddd;">Mã</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Tiêu đề</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Địa bàn</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${data.highlightItems.map(item => `
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-family: monospace; font-weight: bold; color: #8B0000;">${item.code}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.title}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.location}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #fffbe6; border: 1px solid #ffe58f; border-radius: 6px; font-size: 12px; color: #873800;">
          * Báo cáo này được tự động kết xuất từ cơ sở dữ liệu Hệ thống tiếp nhận góp ý An Thới Đông theo lịch định kỳ. Dữ liệu chỉ dùng phục vụ công tác điều hành nội bộ của Ủy ban MTTQ xã và các cơ quan liên quan.
        </div>
      </div>
    </div>
  `;
}
