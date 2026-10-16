'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldAlert, 
  Send, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { LogoSvg } from './LogoSvg';

function FooterContent() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // NẾU Ở KHU VỰC TRANG ADMIN: FOOTER GỌN GÀNG ĐÚNG CHUẨN
  if (isAdminRoute) {
    return (
      <footer className="bg-stone-50 text-stone-700 text-xs border-t border-stone-200 py-3.5 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-0.5 shadow-xs border border-red-200 shrink-0">
              <LogoSvg className="w-6 h-6" />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase font-bold text-[#B22222]">
                Ủy ban Mặt trận Tổ quốc Việt Nam
              </div>
              <div className="text-xs font-extrabold text-stone-900">
                Phường Diên Hồng, TP. Hồ Chí Minh
              </div>
            </div>
          </div>

          <div className="space-y-0.5 sm:text-right">
            <div className="font-semibold text-stone-700">
              © Đoàn Thanh niên - Hội Sinh viên Trường Đại học Bách khoa - ĐHQG-HCM
            </div>
            <div className="text-[11px] text-stone-500">
              Cổng Tiếp Nhận Góp Ý & Phản Ánh Trực Tuyến
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // NẾU Ở KHU VỰC CÔNG KHAI DÀNH CHO NGƯỜI DÂN: THIẾT KẾ HIỆN ĐẠI, THẨM MỸ CAO
  return (
    <footer className="bg-gradient-to-b from-stone-50 to-stone-100/90 text-stone-700 text-sm mt-20 border-t border-red-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cột Trái (lg:col-span-6): Thông tin cơ quan Phường Diên Hồng */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shrink-0 shadow-sm border border-red-200">
                <LogoSvg className="w-10 h-10" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#B22222]">
                  Ủy ban Mặt trận Tổ quốc Việt Nam
                </div>
                <h3 className="text-stone-900 font-black text-base sm:text-lg tracking-tight">
                  Phường Diên Hồng, TP. Hồ Chí Minh
                </h3>
              </div>
            </div>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              Cổng tiếp nhận ý kiến đóng góp, phản ánh và kiến nghị của Nhân dân nhằm xây dựng địa bàn phường văn minh, hiện đại, an toàn và nghĩa tình.
            </p>

            <div className="space-y-2 text-xs text-stone-600 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B22222] mt-0.5 shrink-0" />
                <span>Số 1A Thành Thái (góc đường 3 Tháng 2), Phường Diên Hồng, Thành phố Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B22222] shrink-0" />
                <span className="font-semibold text-stone-800">028 3865 0123</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B22222] shrink-0" />
                <span>mttq.phuongdienhong@tphcm.gov.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B22222] shrink-0" />
                <span>Thứ Hai - Thứ Sáu: 07:30 - 11:30 | 13:00 - 17:00</span>
              </div>
            </div>
          </div>

          {/* Cột Phải (lg:col-span-6): Dồn toàn bộ Tiện ích & Hỗ trợ về bên phải gọn gàng */}
          <div className="lg:col-span-6 space-y-4">
            {/* Khối tiện ích liên kết nhanh dạng hàng thẻ gọn */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#B22222]"></span>
                  <span>Liên kết Tiện ích</span>
                </div>
                <span className="text-[11px] text-stone-400">Dịch vụ trực tuyến</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <Link
                  href="/gui-gop-y"
                  className="group flex items-center justify-between p-2 rounded-lg bg-stone-50/70 hover:bg-red-50/50 border border-stone-200/60 hover:border-red-200 transition text-stone-700 hover:text-[#B22222]"
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Gửi phản ánh mới</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/tra-cuu"
                  className="group flex items-center justify-between p-2 rounded-lg bg-stone-50/70 hover:bg-red-50/50 border border-stone-200/60 hover:border-red-200 transition text-stone-700 hover:text-[#B22222]"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Tra cứu tiến độ</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/huong-dan"
                  className="group flex items-center justify-between p-2 rounded-lg bg-stone-50/70 hover:bg-red-50/50 border border-stone-200/60 hover:border-red-200 transition text-stone-700 hover:text-[#B22222]"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Hướng dẫn quy trình</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/chinh-sach-bao-mat"
                  className="group flex items-center justify-between p-2 rounded-lg bg-stone-50/70 hover:bg-red-50/50 border border-stone-200/60 hover:border-red-200 transition text-stone-700 hover:text-[#B22222]"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Chính sách bảo mật</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/dieu-khoan-su-dung"
                  className="group flex items-center justify-between p-2 rounded-lg bg-stone-50/70 hover:bg-red-50/50 border border-stone-200/60 hover:border-red-200 transition text-stone-700 hover:text-[#B22222] sm:col-span-2"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Điều khoản sử dụng hệ thống</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Khối lưu ý phạm vi và tiếp nhận viết đầy đủ, đồng nhất */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 text-xs text-stone-600 leading-relaxed mt-2">
                Hệ thống do Ủy ban MTTQ Việt Nam Phường Diên Hồng vận hành phục vụ công tác giám sát và phối hợp chính quyền địa phương giải quyết kiến nghị của bà con nhân dân. Trong các tình huống khẩn cấp về an ninh trật tự hoặc y tế, vui lòng liên hệ ngay 113, 114, 115 hoặc Công an Phường Diên Hồng (Số 592 Bà Hạt).
              </div>
            </div>
          </div>
        </div>

        {/* Chân trang bản quyền */}
        <div className="border-t border-stone-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <div className="font-semibold text-stone-700">
            © Đoàn Thanh niên - Hội Sinh viên Trường Đại học Bách khoa - ĐHQG-HCM
          </div>
          <div className="mt-2 sm:mt-0 text-stone-500 font-medium">
            Cổng Tiếp Nhận Góp Ý & Phản Ánh Trực Tuyến
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <Suspense fallback={null}>
      <FooterContent />
    </Suspense>
  );
}
