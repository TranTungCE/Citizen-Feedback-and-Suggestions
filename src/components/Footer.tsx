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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Cột 1: Thông tin cơ quan Phường Diên Hồng */}
          <div className="md:col-span-5 space-y-4">
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

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
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

          {/* Cột 2: Danh mục liên kết tiện ích (Thẻ Button hiện đại, rõ ràng) */}
          <div className="md:col-span-3 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-extrabold text-xs uppercase tracking-wider border-b border-stone-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#B22222]"></span>
              <span>Liên kết Tiện ích</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <Link
                href="/gui-gop-y"
                className="group flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200/80 hover:border-red-300 hover:shadow-xs transition text-stone-700 hover:text-[#B22222]"
              >
                <div className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Gửi phản ánh, kiến nghị</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/tra-cuu"
                className="group flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200/80 hover:border-red-300 hover:shadow-xs transition text-stone-700 hover:text-[#B22222]"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Tra cứu tiến độ giải quyết</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/huong-dan"
                className="group flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200/80 hover:border-red-300 hover:shadow-xs transition text-stone-700 hover:text-[#B22222]"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Hướng dẫn gửi ý kiến</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/chinh-sach-bao-mat"
                className="group flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200/80 hover:border-red-300 hover:shadow-xs transition text-stone-700 hover:text-[#B22222]"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Chính sách bảo vệ dữ liệu</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/dieu-khoan-su-dung"
                className="group flex items-center justify-between p-2 rounded-lg bg-white border border-stone-200/80 hover:border-red-300 hover:shadow-xs transition text-stone-700 hover:text-[#B22222]"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#B22222] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Điều khoản sử dụng</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Cột 3: Khung lưu ý về thẩm quyền và tiếp nhận (Thiết kế Card tinh tế, nổi bật số khẩn cấp) */}
          <div className="md:col-span-4 space-y-3">
            <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#B22222] font-extrabold text-xs uppercase tracking-wider border-b border-red-100 pb-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Phạm vi & Thẩm quyền tiếp nhận</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hệ thống do Ủy ban MTTQ Việt Nam Phường Diên Hồng vận hành phục vụ công tác giám sát và phối hợp chính quyền địa phương giải quyết kiến nghị của bà con nhân dân.
              </p>

              {/* Hộp liên hệ khẩn cấp nổi bật */}
              <div className="bg-red-50/70 p-3 rounded-xl border border-red-100 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#B22222] font-bold text-[11px] uppercase">
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>Trường hợp khẩn cấp (An ninh / Cứu nạn):</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 bg-white font-mono font-bold text-red-700 rounded border border-red-200">113 (Công an)</span>
                  <span className="px-2 py-0.5 bg-white font-mono font-bold text-red-700 rounded border border-red-200">114 (PCCC)</span>
                  <span className="px-2 py-0.5 bg-white font-mono font-bold text-red-700 rounded border border-red-200">115 (Y tế)</span>
                </div>
                <p className="text-[11px] text-stone-600 pt-1">
                  Hoặc liên hệ trực tiếp <strong>Công an Phường Diên Hồng</strong>: Số 592 Bà Hạt.
                </p>
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
