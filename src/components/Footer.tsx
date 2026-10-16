import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';
import { LogoSvg } from './LogoSvg';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 text-sm mt-20 border-t-4 border-[#B22222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Cột 1: Thông tin cơ quan Phường Diên Hồng */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center p-1 shrink-0 shadow-sm border border-stone-200">
                <LogoSvg className="w-9 h-9" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-amber-400">
                  Ủy ban Mặt trận Tổ quốc Việt Nam
                </div>
                <h3 className="text-white font-extrabold text-base sm:text-lg">
                  Phường Diên Hồng, TP. Hồ Chí Minh
                </h3>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Cổng tiếp nhận ý kiến đóng góp, phản ánh và kiến nghị của Nhân dân nhằm xây dựng địa bàn phường văn minh, hiện đại, an toàn và nghĩa tình.
            </p>

            <div className="space-y-2.5 text-xs text-stone-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Số 1A Thành Thái (góc đường 3 Tháng 2), Phường Diên Hồng, Thành phố Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>028 3865 0123</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>mttq.phuongdienhong@tphcm.gov.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Thứ Hai - Thứ Sáu: 07:30 - 11:30 | 13:00 - 17:00</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Danh mục liên kết tiện ích */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-stone-800 pb-2">
              Liên kết Tiện ích
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <Link href="/gui-gop-y" className="hover:text-amber-400 transition">
                  • Gửi phản ánh, kiến nghị mới
                </Link>
              </li>
              <li>
                <Link href="/tra-cuu" className="hover:text-amber-400 transition">
                  • Tra cứu tiến độ giải quyết
                </Link>
              </li>
              <li>
                <Link href="/huong-dan" className="hover:text-amber-400 transition">
                  • Hướng dẫn quy trình gửi ý kiến
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-amber-400 transition">
                  • Chính sách bảo vệ dữ liệu công dân
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-amber-400 transition">
                  • Điều khoản sử dụng hệ thống
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Khung lưu ý về thẩm quyền và tiếp nhận */}
          <div className="md:col-span-4">
            <div className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/70 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Phạm vi & Thẩm quyền tiếp nhận</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Hệ thống do Ủy ban MTTQ Việt Nam Phường Diên Hồng vận hành phục vụ công tác giám sát và phối hợp chính quyền địa phương giải quyết kiến nghị của bà con nhân dân. Trong các tình huống khẩn cấp về an ninh trật tự hoặc y tế, vui lòng liên hệ ngay 113, 114, 115 hoặc Công an Phường Diên Hồng (Số 592 Bà Hạt).
              </p>
            </div>
          </div>
        </div>

        {/* Chân trang bản quyền */}
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <div>
            © Đoàn Thanh niên - Hội Sinh viên Trường Đại học Bách khoa - ĐHQG-HCM
          </div>
          <div className="mt-2 sm:mt-0 text-stone-600">
            Hệ thống Cổng Tiếp Nhận Phản Ánh Trực Tuyến
          </div>
        </div>
      </div>
    </footer>
  );
}
