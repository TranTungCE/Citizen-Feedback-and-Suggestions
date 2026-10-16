import Link from 'next/link';
import { 
  Send, 
  Search, 
  CheckCircle2, 
  Clock, 
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
import { feedbackStore } from '@/lib/feedback/store';
import { LogoSvg } from '@/components/LogoSvg';

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
  const categories = feedbackStore.getActiveCategories();

  return (
    <div className="space-y-16 pb-8">
      {/* 1. HERO SECTION TRẮNG - ĐỎ TRANG TRỌNG & ANIMATION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-white to-red-50/30 py-14 sm:py-20 border-b border-red-100">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-100/40 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-subtle"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-red-200 text-[#B22222] text-xs sm:text-sm font-bold shadow-sm animate-float">
            <LogoSvg className="w-6 h-6 shrink-0" />
            <span>Ủy ban Mặt trận Tổ quốc Việt Nam Phường Diên Hồng</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.2]">
            Lắng nghe ý kiến <span className="text-[#B22222]">Nhân dân</span> <br />
            <span className="text-stone-800 text-2xl sm:text-4xl font-extrabold mt-2 inline-block">
              Chung tay xây dựng Phường Diên Hồng văn minh, hiện đại
            </span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Kênh trực tuyến tiếp nhận các ý kiến đóng góp, hiến kế, kiến nghị và phản ánh về đô thị, môi trường, hạ tầng và dân sinh trên địa bàn Phường Diên Hồng, Thành phố Hồ Chí Minh.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/gui-gop-y"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#B22222] text-white font-bold text-base shadow-lg shadow-red-900/20 hover:bg-[#8B0000] hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-5 h-5 text-amber-300" />
              Gửi ý kiến, phản ánh ngay
            </Link>

            <Link
              href="/tra-cuu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-stone-50 text-[#B22222] font-bold text-base border-2 border-[#B22222]/30 shadow-sm transition-all hover:border-[#B22222]"
            >
              <Search className="w-5 h-5 text-[#B22222]" />
              Tra cứu mã phản ánh
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SỐ LIỆU HOẠT ĐỘNG THỰC TẾ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="text-center p-3 border-r last:border-0 border-stone-100 group">
            <div className="text-3xl sm:text-4xl font-black text-[#B22222] group-hover:scale-105 transition-transform">{metrics.total}</div>
            <div className="text-xs sm:text-sm text-stone-700 mt-1 font-bold">Tổng phản ánh tiếp nhận</div>
          </div>
          <div className="text-center p-3 border-r last:border-0 border-stone-100 group">
            <div className="text-3xl sm:text-4xl font-black text-blue-600 group-hover:scale-105 transition-transform">{metrics.countNew + metrics.countReviewing}</div>
            <div className="text-xs sm:text-sm text-stone-700 mt-1 font-bold">Mới / Đang phân loại</div>
          </div>
          <div className="text-center p-3 border-r last:border-0 border-stone-100 group">
            <div className="text-3xl sm:text-4xl font-black text-amber-600 group-hover:scale-105 transition-transform">{metrics.countProcessing + metrics.countForwarded}</div>
            <div className="text-xs sm:text-sm text-stone-700 mt-1 font-bold">Đang phối hợp xử lý</div>
          </div>
          <div className="text-center p-3 group">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 group-hover:scale-105 transition-transform">{metrics.countResolved}</div>
            <div className="text-xs sm:text-sm text-stone-700 mt-1 font-bold">Đã có kết quả giải quyết</div>
          </div>
        </div>
      </section>

      {/* 3. CÁC NHÓM LĨNH VỰC TIẾP NHẬN (ĐỘNG TỪ STORE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B22222] bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Lĩnh vực tiếp nhận
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-2">
            Ý kiến phản ánh theo từng lĩnh vực
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Bấm chọn lĩnh vực bạn muốn phản ánh hoặc hiến kế để gửi thông tin nhanh nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.slug] || HelpCircle;
            return (
              <div 
                key={cat.id} 
                className="bg-white p-6 rounded-xl border border-stone-200 hover:border-red-300 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#B22222] flex items-center justify-center mb-4 group-hover:bg-[#B22222] group-hover:text-white transition-colors duration-200">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-2 group-hover:text-[#B22222] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>
                <Link
                  href={`/gui-gop-y?category=${cat.id}`}
                  className="inline-flex items-center text-xs font-bold text-[#B22222] hover:text-red-800 transition pt-2 border-t border-stone-100"
                >
                  Gửi phản ánh lĩnh vực này <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. QUY TRÌNH TIẾP NHẬN 4 BƯỚC */}
      <section className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B22222]">
              Quy trình công khai
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              4 Bước tiếp nhận & giải quyết ý kiến
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Đơn giản, minh bạch và theo dõi tiến trình thuận tiện
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative group hover:border-red-300 transition">
              <div className="w-9 h-9 rounded-full bg-[#B22222] text-white font-bold flex items-center justify-center text-sm mb-4 shadow">
                1
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Người dân gửi ý kiến</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Người dân điền biểu mẫu trực tuyến, mô tả rõ nội dung sự việc và địa chỉ cụ thể tại khu phố, tuyến đường.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative group hover:border-red-300 transition">
              <div className="w-9 h-9 rounded-full bg-[#B22222] text-white font-bold flex items-center justify-center text-sm mb-4 shadow">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Cấp mã tiếp nhận</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Hệ thống cấp ngay mã định danh (ví dụ DH-261016-XXXX). Người dân dùng mã để tra cứu bất cứ lúc nào.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative group hover:border-red-300 transition">
              <div className="w-9 h-9 rounded-full bg-[#B22222] text-white font-bold flex items-center justify-center text-sm mb-4 shadow">
                3
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Phân loại & Xử lý</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Cán bộ MTTQ tiếp nhận, xác minh thực tế và phối hợp bộ phận chuyên môn phường xử lý dứt điểm.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative group hover:border-emerald-300 transition">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow">
                4
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">Trả lời kết quả</h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Kết quả giải quyết được cập nhật công khai trên cổng tra cứu và gửi thông báo qua email (nếu có).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GHI CHÚ BẢO VỆ DANH TÍNH (THU NHỎ GỌN GÀNG) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-red-50/80 via-white to-red-50/50 rounded-xl p-4 sm:p-5 border border-red-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[#B22222] font-bold text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Bảo vệ danh tính & Quyền riêng tư của công dân</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-stone-900">
              Bạn có thể gửi phản ánh ẩn danh
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed max-w-xl">
              Nếu không muốn cung cấp họ tên hoặc số điện thoại, hệ thống hoàn toàn cho phép gửi ẩn danh. Cán bộ MTTQ vẫn tiếp nhận và xác minh sự việc công tâm.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <Link
              href="/gui-gop-y"
              className="px-4 py-2 bg-[#B22222] text-white font-bold text-xs rounded-lg hover:bg-red-900 transition shadow-xs"
            >
              Gửi phản ánh ngay
            </Link>
            <Link
              href="/chinh-sach-bao-mat"
              className="px-3.5 py-2 bg-white text-stone-700 font-semibold text-xs rounded-lg border border-stone-200 hover:bg-stone-50 transition"
            >
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
