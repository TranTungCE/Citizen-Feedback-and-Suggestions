import React from 'react';

export default function DieuKhoanSuDungPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">
          Ủy ban MTTQ Việt Nam Phường Diên Hồng
        </span>
        <h1 className="text-3xl font-extrabold text-stone-900 mt-1">
          Điều khoản sử dụng Cổng tiếp nhận
        </h1>
        <p className="text-stone-500 text-xs mt-1">Ban hành và áp dụng từ tháng 10/2026</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">1. Phạm vi tiếp nhận</h2>
          <p>
            Cổng tiếp nhận các ý kiến đóng góp, phản ánh, hiến kế liên quan đến hạ tầng giao thông, vệ sinh môi trường, an sinh xã hội, an ninh trật tự sinh hoạt cộng đồng và thái độ phục vụ hành chính trên địa bàn Phường Diên Hồng.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">2. Các trường hợp từ chối tiếp nhận</h2>
          <p>
            - Đơn khiếu nại, tố cáo đã và đang được cơ quan tiến hành tố tụng thụ lý giải quyết theo Luật Tố tụng.<br/>
            - Nội dung mang tính chất kích động, bạo lực, vi phạm an ninh quốc gia hoặc thuần phong mỹ tục.<br/>
            - Nội dung quảng cáo, rao vặt thương mại không liên quan đến đời sống cộng đồng.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">3. Thời gian và quy trình xử lý</h2>
          <p>
            Ý kiến gửi đến sẽ được cán bộ kiểm tra và chuyển đến cơ quan có thẩm quyền trong thời hạn quy định (thường từ 24h - 72h làm việc). Kết quả giải quyết sẽ được cập nhật công khai trên cổng hoặc gửi trực tiếp cho người phản ánh.
          </p>
        </section>
      </div>
    </div>
  );
}
