import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function LienHePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#B22222] uppercase tracking-wider">
          Ủy ban MTTQ Việt Nam Phường Diên Hồng
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 mt-1">
          Thông tin liên hệ & Tiếp công dân
        </h1>
        <p className="text-stone-600 text-sm mt-2">
          Địa chỉ cơ quan và các kênh liên lạc chính thức với Ban Thường trực Ủy ban Mặt trận Tổ quốc Phường
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 border-b pb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B22222]"></span>
            Trụ sở làm việc
          </h2>
          <div className="space-y-3 text-sm text-stone-600">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#B22222] shrink-0 mt-0.5" />
              <div>
                <strong>Địa chỉ:</strong><br />
                Số 1A Thành Thái (hoặc số 474 đường 3 Tháng 2), Phường Diên Hồng, Thành phố Hồ Chí Minh.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#B22222] shrink-0" />
              <div>
                <strong>Điện thoại cơ quan:</strong> 028 3865 0123
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#B22222] shrink-0" />
              <div>
                <strong>Thư điện tử:</strong> mttq.phuongdienhong@tphcm.gov.vn
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#B22222] shrink-0 mt-0.5" />
              <div>
                <strong>Thời gian làm việc:</strong><br />
                Thứ Hai - Thứ Sáu: 07:30 - 11:30 | 13:00 - 17:00<br />
                (Nghỉ Thứ Bảy, Chủ Nhật và các ngày Lễ, Tết theo quy định)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 border-b pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#B22222]" />
            Công tác tiếp công dân
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Ban Thường trực Ủy ban Mặt trận Tổ quốc Việt Nam Phường Diên Hồng thực hiện lịch tiếp công dân định kỳ tại Trụ sở để lắng nghe tâm tư, nguyện vọng và tiếp nhận các kiến nghị của đồng bào cử tri và Nhân dân trên địa bàn.
          </p>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold">Lưu ý khi đến liên hệ:</div>
            <p>• Người dân vui lòng mang theo Căn cước công dân (hoặc ứng dụng VNeID).</p>
            <p>• Chuẩn bị sẵn các giấy tờ, tài liệu liên quan đến vụ việc để thuận tiện trong quá trình trao đổi.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
