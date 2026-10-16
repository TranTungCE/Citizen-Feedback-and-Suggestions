import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function ChinhSachBaoMatPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">
          Ủy ban MTTQ Việt Nam Phường Diên Hồng
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 mt-1">
          Chính sách bảo vệ dữ liệu cá nhân & Quyền riêng tư
        </h1>
        <p className="text-stone-500 text-xs mt-1">Ban hành và áp dụng từ tháng 10/2026</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">1. Mục đích thu thập thông tin</h2>
          <p>
            Cổng tiếp nhận thông tin thu thập dữ liệu (họ tên, số điện thoại, địa chỉ email) chỉ nhằm mục đích duy nhất là phục vụ công tác liên lạc, thẩm tra, xác minh và phản hồi kết quả giải quyết phản ánh của Nhân dân.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">2. Quyền gửi thông tin ẩn danh</h2>
          <p>
            Hệ thống tôn trọng tuyệt đối quyền riêng tư của công dân. Người dân hoàn toàn có quyền lựa chọn chế độ gửi ẩn danh. Khi chọn chế độ này, hệ thống không lưu trữ thông tin cá nhân và cán bộ sẽ chỉ xem xét tính xác thực của nội dung sự việc được phản ánh.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">3. Bảo mật trên giao diện công khai</h2>
          <p>
            Trên trang Tra cứu công khai và các báo cáo định kỳ công bố, mọi thông tin định danh cá nhân (họ tên, số điện thoại, email) đều bị loại bỏ hoặc mã hóa. Chỉ có cán bộ phụ trách có thẩm quyền được cấp tài khoản bảo mật mới có thể xem thông tin liên lạc của người gửi để phục vụ nghiệp vụ.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">4. Trách nhiệm người phản ánh</h2>
          <p>
            Người gửi phản ánh cam kết thông tin cung cấp là đúng thực tế, không bịa đặt, không vu khống, xúc phạm danh dự của tổ chức và cá nhân khác.
          </p>
        </section>
      </div>
    </div>
  );
}
