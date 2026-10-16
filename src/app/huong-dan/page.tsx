import React from 'react';
import { BookOpen, CheckCircle2, Clock, Send, Search } from 'lucide-react';
import Link from 'next/link';

export default function HuongDanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">
          Ủy ban MTTQ Việt Nam Xã An Thới Đông
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 mt-1">
          Hướng dẫn gửi và theo dõi phản ánh
        </h1>
        <p className="text-stone-600 text-sm mt-2">
          Các bước chi tiết để người dân gửi ý kiến đóng góp, kiến nghị đến chính quyền và Mặt trận xã
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-xs">1</span>
            Chuẩn bị thông tin phản ánh
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            - Ghi rõ nội dung sự việc: mô tả ngắn gọn, trung thực tình trạng xảy ra (ví dụ: đường hư hỏng, rác thải ùn ứ, đèn chiếu sáng không sáng...).<br/>
            - Địa điểm cụ thể: Ấp, tuyến đường, số nhà hoặc mốc định vị dễ nhận biết trên địa bàn xã An Thới Đông.<br/>
            - Thời gian phát hiện sự việc.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-xs">2</span>
            Lựa chọn hình thức cung cấp danh tính
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            - <strong>Chế độ có thông tin liên hệ:</strong> Người dân điền họ tên, số điện thoại hoặc email. Cán bộ MTTQ sẽ dễ dàng liên lạc khi cần xác minh thêm và gửi thông báo kết quả xử lý qua email.<br/>
            - <strong>Chế độ ẩn danh:</strong> Người dân không cần cung cấp bất kỳ thông tin cá nhân nào nếu muốn giữ kín danh tính. Tuy nhiên, quý công dân cần tự lưu lại mã tiếp nhận để tra cứu kết quả.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-xs">3</span>
            Lưu mã tiếp nhận và Tra cứu kết quả
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Sau khi bấm <strong>"Gửi phản ánh"</strong>, hệ thống sẽ cấp một mã duy nhất định dạng <code>DH-YYMMDD-XXXX</code>. Hãy bấm nút sao chép và lưu lại mã này. Bạn có thể nhập mã này vào trang Tra cứu bất kỳ lúc nào để xem tiến độ giải quyết của cơ quan chức năng.
          </p>
        </div>
      </div>

      <div className="text-center pt-4 flex justify-center gap-4">
        <Link
          href="/gui-gop-y"
          className="px-6 py-3 bg-[#8B0000] text-white font-bold rounded-lg hover:bg-red-900 transition flex items-center gap-2 text-sm shadow"
        >
          <Send className="w-4 h-4" /> Bắt đầu gửi phản ánh
        </Link>
        <Link
          href="/tra-cuu"
          className="px-6 py-3 bg-stone-100 text-stone-700 font-bold rounded-lg hover:bg-stone-200 transition flex items-center gap-2 text-sm"
        >
          <Search className="w-4 h-4" /> Tra cứu mã đã có
        </Link>
      </div>
    </div>
  );
}
