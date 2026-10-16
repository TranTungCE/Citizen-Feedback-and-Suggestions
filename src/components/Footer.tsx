import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldAlert, ShieldCheck } from 'lucide-react';
import { LogoSvg } from './LogoSvg';

export function Footer() {
  return (
    <footer className="bg-red-950 text-white text-sm mt-20 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thông tin đơn vị */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 shrink-0 shadow">
                <LogoSvg className="w-8 h-8" />
              </div>
              <h3 className="text-white font-bold text-base leading-snug">
                Ủy ban Mặt trận Tổ quốc Việt Nam<br/>
                <span className="text-amber-300">xã An Thới Đông</span>
              </h3>
            </div>
            <p className="text-red-100 text-xs sm:text-sm mb-4 leading-relaxed font-normal">
              Cổng tiếp nhận ý kiến, hiến kế và phản ánh của Nhân dân phục vụ công tác giám sát, phản biện và xây dựng chính quyền địa phương vững mạnh.
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-red-100">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Ấp An Nghĩa, xã An Thới Đông, huyện Cần Giờ, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>028 3874 0123</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>mattran.anthoidong@tphcm.gov.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Thứ Hai - Thứ Sáu: 07:30 - 17:00</span>
              </div>
            </div>
          </div>

          {/* Liên kết tiện ích */}
          <div>
            <h3 className="text-amber-300 font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
              Chức năng & Tiện ích
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-red-100">
              <li>
                <Link href="/gui-gop-y" className="hover:text-amber-300 transition">
                  • Gửi phản ánh, kiến nghị mới
                </Link>
              </li>
              <li>
                <Link href="/tra-cuu" className="hover:text-amber-300 transition">
                  • Tra cứu tiến độ giải quyết bằng mã tiếp nhận
                </Link>
              </li>
              <li>
                <Link href="/huong-dan" className="hover:text-amber-300 transition">
                  • Hướng dẫn quy trình gửi và xử lý thông tin
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-amber-300 transition">
                  • Chính sách bảo vệ dữ liệu cá nhân & quyền riêng tư
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-amber-300 transition">
                  • Điều khoản sử dụng dịch vụ tiếp nhận
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  href="/admin" 
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-amber-200 rounded font-semibold transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Đăng nhập Cổng Quản trị Cán bộ
                </Link>
              </li>
            </ul>
          </div>

          {/* Lưu ý phạm vi */}
          <div className="bg-red-900/60 p-5 rounded-xl border border-red-800/80">
            <h3 className="text-amber-300 font-bold text-sm mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Lưu ý về phạm vi tiếp nhận
            </h3>
            <p className="text-xs text-red-100 leading-relaxed">
              Website do Ủy ban MTTQ Việt Nam xã An Thới Đông vận hành để tiếp nhận ý kiến của Nhân dân trên địa bàn xã. Website không thay thế Cổng 1022 TP.HCM, không thay thế việc gửi đơn tố tụng hình sự, khiếu nại tố cáo theo luật định. Trong tình huống khẩn cấp, người dân hãy gọi các đầu số 113, 114, 115 hoặc Công an xã.
            </p>
          </div>
        </div>

        <div className="border-t border-red-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-red-200">
          <div>
            © 2026 Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông, Huyện Cần Giờ.
          </div>
          <div className="mt-2 sm:mt-0 font-medium">
            Hệ thống chuẩn mực - Thân thiện - Phục vụ Nhân dân
          </div>
        </div>
      </div>
    </footer>
  );
}
