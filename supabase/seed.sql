-- ==============================================================================
-- DỮ LIỆU SEED MẪU DÀNH CHO CỔNG GÓP Ý XÃ AN THỚI ĐÔNG
-- Lưu ý: Không dùng tài khoản thật hoặc dữ liệu cá nhân thật trong file seed.
-- ==============================================================================

-- 1. SEED DANH MỤC LĨNH VỰC TIẾP NHẬN
INSERT INTO public.feedback_categories (id, name, slug, description, sort_order, is_active) VALUES
('c1000000-0000-0000-0000-000000000001', 'Hạ tầng, giao thông và chiếu sáng', 'ha-tang-giao-thong', 'Phản ánh đường sá, cầu cống, biển báo, đèn đường chiếu sáng nông thôn...', 1, true),
('c1000000-0000-0000-0000-000000000002', 'Môi trường, rác thải và vệ sinh', 'mo-truong-ve-sinh', 'Phản ánh tình trạng xả rác, ô nhiễm nguồn nước kênh rạch, thu gom rác thải...', 2, true),
('c1000000-0000-0000-0000-000000000003', 'An sinh xã hội và đời sống Nhân dân', 'an-sinh-xa-hoi', 'Chính sách hỗ trợ hộ nghèo, người già neo đơn, việc làm, đời sống...', 3, true),
('c1000000-0000-0000-0000-000000000004', 'Trật tự, an toàn và cộng đồng', 'an-ninh-trat-tu', 'Tiếng ồn, trật tự buôn bán lấn chiếm lề đường, an toàn sinh hoạt cộng đồng...', 4, true),
('c1000000-0000-0000-0000-000000000005', 'Thủ tục hành chính và phục vụ', 'thu-tuc-hanh-chinh', 'Thái độ phục vụ, quy trình giải quyết hồ sơ tại bộ phận một cửa...', 5, true),
('c1000000-0000-0000-0000-000000000006', 'Công tác Mặt trận và phong trào', 'mat-tran-phong-trao', 'Cuộc vận động Toàn dân đoàn kết xây dựng nông thôn mới, hiến kế hoạt động...', 6, true),
('c1000000-0000-0000-0000-000000000007', 'Góp ý, kiến nghị khác', 'y-kien-khac', 'Các vấn đề đời sống xã hội khác trên địa bàn xã An Thới Đông...', 7, true)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED CẤU HÌNH HỆ THỐNG BAN ĐẦU
INSERT INTO public.site_settings (key, value, description) VALUES
('portal_info', '{
    "portal_name": "Cổng tiếp nhận góp ý và phản ánh An Thới Đông",
    "organization_name": "Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông",
    "sub_organization": "Huyện Cần Giờ, Thành phố Hồ Chí Minh",
    "address": "Ấp An Nghĩa, Xã An Thới Đông, Huyện Cần Giờ, TP. Hồ Chí Minh",
    "phone": "028 3874 0123",
    "email": "mattran.anthoidong@tphcm.gov.vn",
    "working_hours": "Thứ Hai - Thứ Sáu: 07:30 - 17:00 (Nghỉ Thứ Bảy, Chủ Nhật và ngày Lễ)"
}'::jsonb, 'Thông tin đơn vị và liên hệ'),

('policy_settings', '{
    "allow_anonymous": true,
    "require_phone": false,
    "require_email": false,
    "sla_hours_default": 72,
    "max_file_size_mb": 5,
    "allowed_file_types": ["image/jpeg", "image/png", "image/webp", "application/pdf"]
}'::jsonb, 'Quy định chính sách tiếp nhận và upload');

-- 3. SEED LỊCH BÁO CÁO MẪU
INSERT INTO public.report_schedules (report_type, is_enabled, send_hour, timezone, recipient_emails) VALUES
('daily', true, 18, 'Asia/Ho_Chi_Minh', '{"lanhdao.anthoidong@gmail.com"}'),
('weekly', true, 8, 'Asia/Ho_Chi_Minh', '{"lanhdao.anthoidong@gmail.com"}'),
('monthly', true, 8, 'Asia/Ho_Chi_Minh', '{"lanhdao.anthoidong@gmail.com"}')
ON CONFLICT DO NOTHING;
