import Link from 'next/link';
import { 
  BarChart3, 
  Inbox, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet,
  Mail
} from 'lucide-react';
import { STATUS_LABELS } from '@/lib/feedback/store';
import { formatVietnameseDateTime } from '@/lib/utils';
import { getFeedbackMetrics, getAdminFeedbackList } from '@/lib/feedback/service';

export default async function AdminDashboardPage() {
  const metrics = await getFeedbackMetrics();
  const allList = await getAdminFeedbackList();
  const recentList = allList.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">
            Khu vực Quản trị Nghiệp vụ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Tổng quan Hoạt động Tiếp nhận & Giải quyết
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Dữ liệu tổng hợp thực tế theo giờ Việt Nam (UTC+7)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/feedback"
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg text-sm font-semibold hover:bg-red-900 transition flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            Xử lý phản ánh
          </Link>
          <Link
            href="/admin/reports"
            className="px-4 py-2 bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-sm font-semibold hover:bg-stone-200 transition flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-stone-600" />
            Báo cáo định kỳ
          </Link>
        </div>
      </div>

      {/* Grid thống kê chính */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
            <span>Tổng số tiếp nhận</span>
            <Inbox className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900">{metrics.total}</div>
          <div className="text-xs text-stone-500 mt-1">Từ các nguồn trực tuyến</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-blue-600 text-xs font-medium mb-2">
            <span>Chờ phân loại / Mới</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-blue-600">{metrics.countNew + metrics.countReviewing}</div>
          <div className="text-xs text-stone-500 mt-1">Cần cán bộ kiểm tra</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-amber-600 text-xs font-medium mb-2">
            <span>Đang xử lý / Đã chuyển</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600">{metrics.countProcessing + metrics.countForwarded}</div>
          <div className="text-xs text-stone-500 mt-1">Đang phối hợp thực địa</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 text-xs font-medium mb-2">
            <span>Đã có kết quả</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">{metrics.countResolved}</div>
          <div className="text-xs text-emerald-700 mt-1 font-semibold">Tỷ lệ: {metrics.resolvedRate}%</div>
        </div>
      </div>

      {/* Danh sách phản ánh mới nhất cần chú ý */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
          <div>
            <h2 className="font-bold text-stone-900 text-base">Phản ánh mới tiếp nhận</h2>
            <p className="text-xs text-stone-500 mt-0.5">Danh sách các phản ánh gửi gần đây nhất cần xử lý</p>
          </div>
          <Link
            href="/admin/feedback"
            className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1"
          >
            Xem tất cả <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-stone-200">
          {recentList.map((item) => (
            <div key={item.id} className="p-5 hover:bg-stone-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#8B0000] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {item.tracking_code}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_LABELS[item.status]?.badgeClass}`}>
                    {STATUS_LABELS[item.status]?.label}
                  </span>
                  {item.is_anonymous && (
                    <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      Ẩn danh
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-stone-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500">
                  Địa điểm: {item.location_text} • Tiếp nhận: {formatVietnameseDateTime(item.submitted_at)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/feedback/${item.id}`}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition"
                >
                  Xử lý chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
