# CỔNG TIẾP NHẬN GÓP Ý VÀ PHẢN ÁNH AN THỚI ĐÔNG

Ứng dụng web tiếp nhận góp ý, kiến nghị và phản ánh của Nhân dân phục vụ **Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông, huyện Cần Giờ, Thành phố Hồ Chí Minh**.

Hệ thống được thiết kế theo tiêu chuẩn công quyền trang trọng, thân thiện, bảo vệ danh tính người phản ánh, hỗ trợ tra cứu công khai và cung cấp bộ công cụ quản trị, phân loại, thống kê và gửi báo cáo tự động qua email.

---

## 1. CÔNG NGHỆ SỬ DỤNG
- **Framework**: Next.js 16 (App Router, Turbopack, React 19).
- **Ngôn ngữ**: TypeScript (Strict Mode).
- **Giao diện**: Tailwind CSS v4, Lucide Icons.
- **Biểu mẫu & Xác thực**: Zod, React Hook Form.
- **Cơ sở dữ liệu & Xác thực**: Supabase PostgreSQL + Supabase Auth & RLS.
- **Dịch vụ Email định kỳ**: Resend API.
- **Múi giờ**: `Asia/Ho_Chi_Minh` (UTC+7).
- **Môi trường triển khai**: Vercel.

---

## 2. KIẾN TRÚC VÀ CÁC CHỨC NĂNG CHÍNH

### 2.1. Cổng Thông tin Công khai dành cho Người dân
1. **Trang chủ (`/`)**:
   - Khẩu hiệu: *"Lắng nghe ý kiến Nhân dân — Chung tay xây dựng địa phương"*.
   - Số liệu thống kê hoạt động tiếp nhận thực tế từ cơ sở dữ liệu.
   - Nhóm 7 lĩnh vực tiếp nhận chuẩn hóa.
   - Quy trình tiếp nhận 4 bước minh bạch.
2. **Gửi góp ý, phản ánh (`/gui-gop-y`)**:
   - Biểu mẫu nhập liệu trực quan, xác thực Zod nghiêm ngặt.
   - Hỗ trợ 2 chế độ: **Có thông tin liên hệ** hoặc **Gửi ẩn danh**.
   - Chống Spam bằng cơ chế Honeypot ẩn.
   - Cấp mã tiếp nhận duy nhất định dạng chuẩn: `ATD-YYMMDD-XXXX` (ví dụ `ATD-261016-8921`).
   - Tự động gửi thư xác nhận nếu người dân cung cấp địa chỉ email.
3. **Tra cứu tiến độ giải quyết (`/tra-cuu`)**:
   - Tra cứu bằng mã tiếp nhận.
   - Hiển thị tiến trình xử lý và phản hồi chính thức từ cơ quan chức năng.
   - **Bảo vệ quyền riêng tư**: Tuyệt đối không hiển thị thông tin cá nhân (tên, SĐT, email) của người gửi.
4. **Trang Hướng dẫn (`/huong-dan`)**, **Liên hệ (`/lien-he`)**, **Chính sách bảo mật (`/chinh-sach-bao-mat`)** và **Điều khoản sử dụng (`/dieu-khoan-su-dung`)**.

### 2.2. Khu vực Quản trị Nội bộ dành cho Cán bộ (`/admin`)
1. **Đăng nhập xác thực (`/admin/login`)**:
   - Phân quyền RBAC: Super Admin, Admin, Cán bộ tiếp nhận, Cán bộ chỉ xem.
   - Không cho phép đăng ký tự do ngoài công chúng.
2. **Dashboard Tổng quan (`/admin`)**:
   - Thống kê thời gian thực: Mới tiếp nhận, Đang phân loại, Đang phối hợp xử lý, Đã có kết quả, Tỷ lệ hoàn tất.
   - Danh sách phản ánh mới nhất cần lưu ý.
3. **Quản lý & Điều phối phản ánh (`/admin/feedback`)**:
   - Bộ lọc đa tiêu chí: Tìm kiếm theo mã, từ khóa, lọc theo trạng thái, lĩnh vực, mức độ ưu tiên.
   - Xuất dữ liệu báo cáo sang định dạng CSV (hỗ trợ tiếng Việt UTF-8 BOM).
4. **Chi tiết & Phê duyệt kết quả (`/admin/feedback/[id]`)**:
   - Xem thông tin liên hệ người gửi (chỉ dành cho cán bộ).
   - Chuyển trạng thái quy trình tiếp nhận và ghi chú tiến trình.
   - Nhập phản hồi chính thức để công khai cho người dân tra cứu.
   - Khu vực lưu ghi chú nghiệp vụ nội bộ bảo mật.
5. **Quản lý Báo cáo & Lịch gửi Email (`/admin/reports`)**:
   - Báo cáo định kỳ: Hằng ngày (Daily), Hằng tuần (Weekly), Hằng tháng (Monthly).
   - Nút "Tạo & Gửi báo cáo ngay" để kiểm tra tức thì.
   - Xem trước giao diện email HTML gửi tới Lãnh đạo.
6. **Cấu hình Hệ thống (`/admin/settings`)**:
   - Bật/tắt chế độ gửi ẩn danh.
   - Cấu hình hạn mức thời gian xử lý chuẩn (SLA).
   - Danh sách email lãnh đạo nhận báo cáo tự động.

### 2.3. Tự động hóa Báo cáo (Cron & Resend)
- **API Endpoint**: `/api/cron/reports?type=daily&secret=...`
- Khóa bảo vệ `CRON_SECRET` chống truy cập trái phép.
- Cơ chế khóa định danh chống gửi trùng lặp (Idempotency Key: `daily:YYYY-MM-DD`).
- Tính toán số liệu thống kê chuẩn xác theo múi giờ `Asia/Ho_Chi_Minh`.

---

## 3. HƯỚNG DẪN CẤU HÌNH VÀ KHỞI CHẠY DỰ ÁN

### 3.1. Cài đặt môi trường phát triển (Local)
1. Sao chép file cấu hình:
   ```bash
   cp .env.example .env.local
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Chạy ứng dụng ở chế độ phát triển:
   ```bash
   npm run dev
   ```
   Truy cập: `http://localhost:3000`

4. Chạy kiểm tra build production:
   ```bash
   npm run build
   ```

### 3.2. Cấu hình Supabase (PostgreSQL & Auth)
1. Tạo project trên [Supabase](https://supabase.com).
2. Vào **SQL Editor** trên Supabase Dashboard, copy toàn bộ nội dung từ file [initial_schema.sql](file:///d:/HK253/1.%20HoSiVi%20253/5.%20TH%C3%94NG%20TIN%20G%C3%93P%20%C3%9D/supabase/migrations/20261016_initial_schema.sql) và chạy để khởi tạo các bảng, chỉ mục và chính sách Row Level Security (RLS).
3. Tiếp tục chạy file [seed.sql](file:///d:/HK253/1.%20HoSiVi%20253/5.%20TH%C3%94NG%20TIN%20G%C3%93P%20%C3%9D/supabase/seed.sql) để nạp danh mục lĩnh vực mặc định và cấu hình ban đầu.
4. Lấy `URL`, `anon key` và `service_role key` trong mục **Settings -> API** điền vào `.env.local`.

### 3.3. Cấu hình Email Resend
1. Đăng ký tài khoản tại [Resend](https://resend.com) và tạo một API Key.
2. Thêm vào file môi trường:
   ```env
   RESEND_API_KEY=re_xxxxxxxxx
   EMAIL_FROM=Cổng Góp Ý An Thới Đông <onboarding@resend.dev>
   REPORT_RECIPIENT_EMAILS=lanhdao@anthoidong.gov.vn
   ```

### 3.4. Triển khai lên Vercel
1. Đẩy mã nguồn lên kho lưu trữ GitHub:
   ```bash
   git add .
   git commit -m "feat: complete An Thoi Dong Feedback and Reporting Portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Truy cập [Vercel](https://vercel.com) -> New Project -> Import Repository.
3. Trong phần **Environment Variables**, khai báo đầy đủ các biến từ `.env.example`.
4. Nhấn **Deploy**.
5. Cấu hình **Vercel Cron Jobs** trong `vercel.json` (hoặc Dashboard) để kích hoạt API `/api/cron/reports` định kỳ mỗi ngày.

---

## 4. BẢO MẬT VÀ PHẠM VI TIẾP NHẬN
- Website không tự nhận là Cổng thông tin 1022 TP.HCM, không thay thế đơn thư khiếu nại, tố cáo chính thức theo Luật Khiếu nại và Luật Tố cáo.
- Dữ liệu cá nhân của người dân được bảo vệ và cách ly an toàn qua Server-side và Row Level Security.
- Không lưu bất kỳ API Secret Key nào trong mã frontend hoặc client bundle.
