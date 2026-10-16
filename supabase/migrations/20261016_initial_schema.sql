-- ==============================================================================
-- CỔNG TIẾP NHẬN GÓP Ý, PHẢN ÁNH PHƯỜNG DIÊN HỒNG
-- SUPABASE POSTGRESQL MIGRATION & SCHEMA DEFINITION
-- ==============================================================================

-- Bật extension cần thiết
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG HỒ SƠ NGƯỜI DÙNG / CÁN BỘ (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'officer', 'viewer')) DEFAULT 'viewer',
    phone TEXT,
    department TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 2. BẢNG DANH MỤC LĨNH VỰC GÓP Ý (FEEDBACK CATEGORIES)
CREATE TABLE IF NOT EXISTS public.feedback_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 3. BẢNG TIẾP NHẬN PHẢN ÁNH / GÓP Ý (FEEDBACK)
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id UUID REFERENCES public.feedback_categories(id) ON DELETE SET NULL,
    location_text TEXT NOT NULL,
    incident_at TIMESTAMPTZ,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'normal', 'high', 'urgent')) DEFAULT 'normal',
    status TEXT NOT NULL CHECK (status IN ('new', 'reviewing', 'processing', 'forwarded', 'waiting_info', 'resolved', 'closed', 'out_of_scope')) DEFAULT 'new',
    
    -- Thông tin người gửi (cho phép ẩn danh)
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    submitter_name TEXT,
    submitter_email TEXT,
    submitter_phone TEXT,
    
    -- Điều phối xử lý
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    official_response TEXT,
    official_response_at TIMESTAMPTZ,
    official_response_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Mốc thời gian
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    resolved_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    
    -- Bảo vệ idempotency
    idempotency_hash TEXT
);

-- 4. BẢNG ĐÍNH KÈM TỆP (FEEDBACK ATTACHMENTS)
CREATE TABLE IF NOT EXISTS public.feedback_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_id UUID NOT NULL REFERENCES public.feedback(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 5. BẢNG LỊCH SỬ THAY ĐỔI TRẠNG THÁI (FEEDBACK HISTORY)
CREATE TABLE IF NOT EXISTS public.feedback_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_id UUID NOT NULL REFERENCES public.feedback(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    old_status TEXT,
    new_status TEXT NOT NULL,
    note TEXT,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 6. BẢNG GHI CHÚ NỘI BỘ (INTERNAL NOTES - Chỉ dành cho cán bộ nội bộ)
CREATE TABLE IF NOT EXISTS public.internal_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_id UUID NOT NULL REFERENCES public.feedback(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 7. BẢNG CẤU HÌNH WEBSITE (SITE SETTINGS)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 8. BẢNG CẤU HÌNH LỊCH BÁO CÁO (REPORT SCHEDULES)
CREATE TABLE IF NOT EXISTS public.report_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_type TEXT NOT NULL CHECK (report_type IN ('daily', 'weekly', 'monthly')),
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    send_hour INT NOT NULL DEFAULT 8, -- Giờ gửi theo múi giờ Việt Nam
    timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    recipient_emails TEXT[] NOT NULL DEFAULT '{}',
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 9. BẢNG LỊCH SỬ THỰC THI BÁO CÁO (REPORT RUNS)
CREATE TABLE IF NOT EXISTS public.report_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_type TEXT NOT NULL CHECK (report_type IN ('daily', 'weekly', 'monthly')),
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    idempotency_key TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
    attempt_count INT NOT NULL DEFAULT 1,
    recipient_summary TEXT,
    provider_message_id TEXT,
    metrics_summary JSONB,
    error_summary TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    completed_at TIMESTAMPTZ
);

-- 10. BẢNG AUDIT LOGS (NHẬT KÝ KIỂM TOÁN HỆ THỐNG)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ==============================================================================
-- INDEX TỐI ƯU HIỆU NĂNG TRUY VẤN
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_feedback_tracking_code ON public.feedback(tracking_code);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON public.feedback(category_id);
CREATE INDEX IF NOT EXISTS idx_feedback_submitted_at ON public.feedback(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_assigned_to ON public.feedback(assigned_to);
CREATE INDEX IF NOT EXISTS idx_feedback_history_feedback ON public.feedback_history(feedback_id);
CREATE INDEX IF NOT EXISTS idx_internal_notes_feedback ON public.internal_notes(feedback_id);
CREATE INDEX IF NOT EXISTS idx_report_runs_idempotency ON public.report_runs(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Hàm trợ giúp lấy role của người dùng hiện tại
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- 1. Profiles:
-- Cán bộ nội bộ được xem profile
CREATE POLICY "Profiles viewable by authenticated staff"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

-- Super admin được chỉnh sửa profiles
CREATE POLICY "Super admin can update profiles"
ON public.profiles FOR UPDATE
TO authenticated
USING (public.current_user_role() = 'super_admin');

-- 2. Feedback Categories:
-- Công khai xem danh mục
CREATE POLICY "Categories are viewable by everyone"
ON public.feedback_categories FOR SELECT
TO anon, authenticated
USING (is_active = true OR public.current_user_role() IN ('super_admin', 'admin'));

-- Admin/Super admin được chỉnh sửa
CREATE POLICY "Admin can modify categories"
ON public.feedback_categories FOR ALL
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin'));

-- 3. Feedback:
-- Người dân tạo phản ánh mới
CREATE POLICY "Public can insert feedback"
ON public.feedback FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Tra cứu công khai giới hạn (hoặc cán bộ đăng nhập xem toàn bộ)
CREATE POLICY "Staff can view all feedback"
ON public.feedback FOR SELECT
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin', 'officer', 'viewer'));

-- Cán bộ chỉnh sửa phản ánh
CREATE POLICY "Staff can update feedback"
ON public.feedback FOR UPDATE
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin', 'officer'));

-- 4. Feedback History:
CREATE POLICY "Public view public history"
ON public.feedback_history FOR SELECT
TO anon, authenticated
USING (is_public = true OR public.current_user_role() IN ('super_admin', 'admin', 'officer', 'viewer'));

CREATE POLICY "Staff can insert history"
ON public.feedback_history FOR INSERT
TO authenticated
WITH CHECK (public.current_user_role() IN ('super_admin', 'admin', 'officer'));

-- 5. Internal Notes: Tuyệt đối không cho phép anon truy cập
CREATE POLICY "Staff can view internal notes"
ON public.internal_notes FOR SELECT
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin', 'officer', 'viewer'));

CREATE POLICY "Staff can insert internal notes"
ON public.internal_notes FOR INSERT
TO authenticated
WITH CHECK (public.current_user_role() IN ('super_admin', 'admin', 'officer'));

-- 6. Site Settings:
CREATE POLICY "Public can view active site settings"
ON public.site_settings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin can update site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin'));

-- 7. Report Schedules & Runs:
CREATE POLICY "Admin can view and manage reports"
ON public.report_schedules FOR ALL
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin'));

CREATE POLICY "Admin can view report runs"
ON public.report_runs FOR ALL
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin'));

-- 8. Audit logs:
CREATE POLICY "Admin can view audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.current_user_role() IN ('super_admin', 'admin'));

CREATE POLICY "Staff can insert audit logs"
ON public.audit_logs FOR INSERT
TO authenticated
WITH CHECK (true);
