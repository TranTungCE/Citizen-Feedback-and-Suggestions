import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 text-sm mt-16 border-t-4 border-[#8B0000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thông tin đơn vị */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông
            </h3>
            <p className="text-stone-400 mb-4 leading-relaxed">
              Cổng tiếp nhận góp ý, kiến nghị và phản ánh nhằm phát huy quyền làm chủ của Nhân dân, chung tay xây dựng địa phương ngày càng phát triển, văn minh và nghĩa tình.
            </p>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
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
                <span>Thứ Hai - Thứ Sáu (07:30 - 17:00)</span>
              </div>
            </div>
          </div>

          {/* Liên kết tiện ích */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              Liên kết & Chức năng
            </h3>
            <ul className="space-y-2.5 text-stone-400">
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
              <li>
                <Link href="/admin/login" className="hover:text-amber-300 transition text-stone-500">
                  • Cổng thông tin nội bộ dành cho Cán bộ
                </Link>
              </li>
            </ul>
          </div>

          {/* Lưu ý pháp lý & phạm vi tiếp nhận */}
          <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700/60">
            <h3 className="text-amber-300 font-semibold text-sm mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Lưu ý về phạm vi tiếp nhận
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed space-y-2">
              Website là kênh kết nối do Ủy ban MTTQ Việt Nam xã An Thới Đông vận hành để tiếp nhận ý kiến của người dân. Website không thay thế Cổng thông tin 1022 TP.HCM, không thay thế việc gửi đơn tố tụng hình sự, khiếu nại tố cáo theo Luật Khiếu nại, Luật Tố cáo. Trong các tình huống khẩn cấp về an ninh trật tự hoặc cứu nạn, người dân vui lòng liên hệ ngay các đầu số 113, 114, 115 hoặc Công an xã.
            </p>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <div>
            © 2026 Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông, Huyện Cần Giờ. Bảo lưu mọi quyền.
          </div>
          <div className="mt-2 sm:mt-0">
            Hệ thống vận hành theo giờ chuẩn Việt Nam (UTC+7).
          </div>
        </div>
      </div>
    </footer>
  );
}
