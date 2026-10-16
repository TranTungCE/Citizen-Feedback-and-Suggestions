'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { generateReportData, renderReportEmailHtml, ReportData } from '@/lib/reporting';

export default function ReportsManagementPage() {
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    setReportData(generateReportData(reportType));
  }, [reportType]);

  const handleRunReportNow = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      const res = await fetch(`/api/cron/reports?type=${reportType}&secret=anthoidong_cron_secret_2026`);
      const data = await res.json();
      setTestResult(data);
    } catch (err: unknown) {
      setTestResult({
        success: false,
        error: 'Lỗi khi gọi API tác vụ báo cáo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">
            Quản trị Báo cáo định kỳ & Gửi Email
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Tổng hợp dữ liệu theo giờ Việt Nam và gửi email tự động tới Lãnh đạo Ủy ban MTTQ xã
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Ẩn xem trước' : 'Xem trước nội dung email'}
          </button>

          <button
            onClick={handleRunReportNow}
            disabled={loading}
            className="px-4 py-2 bg-[#8B0000] hover:bg-red-900 text-white text-xs font-bold rounded-lg transition shadow flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Tạo & Gửi báo cáo ngay
          </button>
        </div>
      </div>

      {testResult && (
        <div className={`p-4 rounded-xl border text-xs ${testResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
          <div className="font-bold flex items-center gap-2 mb-1">
            {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            {testResult.message || 'Kết quả thực thi:'}
          </div>
          <div>Mã chống trùng (Idempotency Key): <strong>{testResult.idempotencyKey}</strong></div>
          <div>Số bản ghi tổng hợp: <strong>{testResult.totalRecords}</strong></div>
          <div className="mt-1 text-[11px] text-stone-600">
            Trạng thái gửi thư: {testResult.emailResult?.success ? 'Đã gửi thành công qua Resend' : `Thông báo: ${testResult.emailResult?.error}`}
          </div>
        </div>
      )}

      {/* Cấu hình chu kỳ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['daily', 'weekly', 'monthly'] as const).map((type) => (
          <div
            key={type}
            onClick={() => setReportType(type)}
            className={`p-5 rounded-xl border-2 cursor-pointer transition ${
              reportType === type
                ? 'border-[#8B0000] bg-red-50/40 shadow-sm'
                : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-stone-900 uppercase">
                {type === 'daily' ? 'Báo cáo ngày' : type === 'weekly' ? 'Báo cáo tuần' : 'Báo cáo tháng'}
              </span>
              <Clock className="w-4 h-4 text-stone-400" />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {type === 'daily'
                ? 'Gửi lúc 18:00 hằng ngày tổng hợp phản ánh mới tiếp nhận và cần lưu ý.'
                : type === 'weekly'
                ? 'Gửi sáng thứ Hai hàng tuần tổng hợp tiến độ và tồn đọng.'
                : 'Gửi ngày mùng 1 đầu tháng đánh giá tỷ lệ xử lý và phân bổ theo ấp.'}
            </p>
          </div>
        ))}
      </div>

      {/* Tóm tắt số liệu kỳ đã chọn */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-stone-900 border-b pb-3 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-[#8B0000]" />
          Dữ liệu kết xuất kỳ: {reportData?.periodLabel || 'Đang nạp...'}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-stone-50 rounded-lg">
            <div className="text-xl font-extrabold text-[#8B0000]">{reportData?.totalReceived ?? 0}</div>
            <div className="text-xs text-stone-500 mt-0.5">Tiếp nhận</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg">
            <div className="text-xl font-extrabold text-emerald-600">{reportData?.resolvedCount ?? 0}</div>
            <div className="text-xs text-stone-500 mt-0.5">Đã có kết quả</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg">
            <div className="text-xl font-extrabold text-amber-600">{reportData?.highPriorityCount ?? 0}</div>
            <div className="text-xs text-stone-500 mt-0.5">Ưu tiên cao</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg">
            <div className="text-xl font-extrabold text-blue-600">
              {reportData && reportData.totalReceived > 0 ? Math.round((reportData.resolvedCount / reportData.totalReceived) * 100) : 0}%
            </div>
            <div className="text-xs text-stone-500 mt-0.5">Tỷ lệ hoàn tất</div>
          </div>
        </div>
      </div>

      {/* Xem trước giao diện email */}
      {showPreview && reportData && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Xem trước nội dung email mẫu gửi tới Lãnh đạo:
          </h3>
          <div
            className="border rounded-lg p-4 bg-stone-50 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: renderReportEmailHtml(reportData) }}
          />
        </div>
      )}
    </div>
  );
}
