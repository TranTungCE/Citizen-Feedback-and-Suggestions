import Link from 'next/link';
import { 
  Send, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Building2,
  TreePine,
  HeartHandshake,
  ShieldAlert,
  Users2,
  HelpCircle
} from 'lucide-react';
import { feedbackStore, DEFAULT_CATEGORIES } from '@/lib/feedback/store';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'ha-tang-giao-thong': Building2,
  'mo-truong-ve-sinh': TreePine,
  'an-sinh-xa-hoi': HeartHandshake,
  'an-ninh-trat-tu': ShieldAlert,
  'thu-tuc-hanh-chinh': FileText,
  'mat-tran-phong-trao': Users2,
  'y-kien-khac': HelpCircle
};

export default function HomePage() {
  const metrics = feedbackStore.getMetrics();

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#8B0000] via-[#A00000] to-[#700000] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-400">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Lắng nghe ý kiến Nhân dân <br className="hidden sm:inline" />
            <span className="text-amber-300">— Chung tay xây dựng địa phương</span>
          </h1>

          <p className="text-stone-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Kênh trực tuyến tiếp nhận các ý kiến góp ý, hiến kế, kiến nghị và phản ánh về đời sống, môi trường, hạ tầng và dân sinh trên địa bàn xã An Thới Đông.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/gui-gop-y"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-amber-400 text-[#8B0000] font-bold text-base shadow-lg hover:bg-amber-300 hover:shadow-xl transition transform active:scale-95"
            >
              <Send className="w-5 h-5" />
              Gửi phản ánh, góp ý ngay
            </Link>

            <Link
              href="/tra-cuu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/30 backdrop-blur-sm transition"
            >
              <Search className="w-5 h-5 text-amber-300" />
              Tra cứu mã phản ánh
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SỐ LIỆU HOẠT ĐỘNG THỰC TẾ (REAL METRICS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-md border border-stone-200">
          <div className="text-center p-3 border-r last:border-0 border-stone-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#8B0000]">{metrics.total}</div>
            <div className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">Tổng phản ánh tiếp nhận</div>
          </div>
          <div className="text-center p-3 border-r last:border-0 border-stone-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">{metrics.countNew + metrics.countReviewing}</div>
            <div className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">Mới / Đang phân loại</div>
          </div>
          <div className="text-center p-3 border-r last:border-0 border-stone-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">{metrics.countProcessing + metrics.countForwarded}</div>
            <div className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">Đang phối hợp xử lý</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{metrics.countResolved}</div>
            <div className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">Đã có kết quả giải quyết</div>
          </div>
        </div>
      </section>

      {/* 3. CÁC NHÓM LĨNH VỰC TIẾP NHẬN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Lĩnh vực tiếp nhận ý kiến
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Hệ thống tiếp nhận phản ánh, kiến nghị thuộc các nhóm vấn đề dân sinh trên địa bàn xã
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEFAULT_CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.slug] || HelpCircle;
            return (
              <div 
                key={cat.id} 
                className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition group"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 text-[#8B0000] flex items-center justify-center mb-4 group-hover:bg-[#8B0000] group-hover:text-white transition">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-base mb-2 group-hover:text-[#8B0000] transition">
                  {cat.name}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {cat.description}
                </p>
                <Link
                  href={`/gui-gop-y?category=${cat.id}`}
                  className="inline-flex items-center text-xs font-semibold text-[#8B0000] hover:text-red-800 transition"
                >
                  Gửi góp ý lĩnh vực này <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. QUY TRÌNH TIẾP NHẬN 4 BƯỚC */}
      <section className="bg-stone-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Quy trình tiếp nhận & giải quyết
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              4 bước minh bạch và rõ ràng trong công tác xử lý ý kiến của Nhân dân
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-[#8B0000] text-white font-bold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Người dân gửi thông tin</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Người dân điền biểu mẫu trực tuyến, mô tả rõ nội dung, địa điểm và có thể đính kèm ảnh chụp hiện trường.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-[#8B0000] text-white font-bold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Cấp mã tiếp nhận</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Hệ thống tự động cấp mã duy nhất (ví dụ ATD-261016-XXXX). Người dân dùng mã này để theo dõi tiến độ.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-[#8B0000] text-white font-bold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Phân loại & Xử lý</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Cán bộ MTTQ tiếp nhận, kiểm tra tính xác thực và chuyển đến các bộ phận chức năng hoặc chính quyền giải quyết.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 relative">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-4">
                4
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Thông báo kết quả</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Kết quả xử lý và câu trả lời chính thức được cập nhật trên cổng tra cứu và gửi email nếu người dân đăng ký.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NGUYÊN TẮC BẢO VỆ VÀ CAM KẾT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 text-amber-300 font-semibold text-sm">
              <ShieldCheck className="w-5 h-5" />
              Cam kết quyền riêng tư và minh bạch
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Bảo vệ danh tính người phản ánh & Xử lý trách nhiệm
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Người dân có thể lựa chọn chế độ gửi phản ánh ẩn danh nếu không muốn cung cấp tên hoặc số điện thoại. Dữ liệu cá nhân (nếu cung cấp) chỉ được cán bộ có thẩm quyền sử dụng để liên hệ xác minh sự việc và tuyệt đối không công khai trên mạng.
            </p>
            <div className="pt-2">
              <Link
                href="/chinh-sach-bao-mat"
                className="text-amber-300 hover:text-amber-200 text-sm font-semibold underline underline-offset-4"
              >
                Xem chi tiết Chính sách bảo vệ dữ liệu cá nhân →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
