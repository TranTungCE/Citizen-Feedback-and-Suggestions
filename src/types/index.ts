export type StaffRole = 'super_admin' | 'admin' | 'officer' | 'viewer';

export type FeedbackStatus = 
  | 'new'
  | 'reviewing'
  | 'processing'
  | 'forwarded'
  | 'waiting_info'
  | 'resolved'
  | 'closed'
  | 'out_of_scope';

export type FeedbackPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface FeedbackCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
}

export interface FeedbackItem {
  id: string;
  tracking_code: string;
  title: string;
  content: string;
  category_id?: string;
  category?: FeedbackCategory;
  location_text: string;
  incident_at?: string;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  is_anonymous: boolean;
  submitter_name?: string;
  submitter_email?: string;
  submitter_phone?: string;
  assigned_to?: string;
  official_response?: string;
  official_response_at?: string;
  official_response_by?: string;
  submitted_at: string;
  updated_at: string;
  resolved_at?: string;
  archived_at?: string;
}

export interface FeedbackHistory {
  id: string;
  feedback_id: string;
  actor_id?: string;
  actor_name?: string;
  old_status?: FeedbackStatus;
  new_status: FeedbackStatus;
  note?: string;
  is_public: boolean;
  created_at: string;
}

export interface InternalNote {
  id: string;
  feedback_id: string;
  author_id: string;
  author_name?: string;
  content: string;
  created_at: string;
}

export interface FeedbackAttachment {
  id: string;
  feedback_id: string;
  storage_path: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  uploaded_at: string;
}

export interface PortalInfoSettings {
  portal_name: string;
  organization_name: string;
  sub_organization: string;
  address: string;
  phone: string;
  email: string;
  working_hours: string;
}

export interface PolicySettings {
  allow_anonymous: boolean;
  require_phone: boolean;
  require_email: boolean;
  sla_hours_default: number;
  max_file_size_mb: number;
  allowed_file_types: string[];
}

export interface ReportSchedule {
  id: string;
  report_type: 'daily' | 'weekly' | 'monthly';
  is_enabled: boolean;
  send_hour: number;
  timezone: string;
  recipient_emails: string[];
  updated_at: string;
}

export interface ReportRun {
  id: string;
  report_type: 'daily' | 'weekly' | 'monthly';
  period_start: string;
  period_end: string;
  idempotency_key: string;
  status: 'pending' | 'success' | 'failed';
  attempt_count: number;
  recipient_summary?: string;
  provider_message_id?: string;
  metrics_summary?: Record<string, unknown>;
  error_summary?: string;
  started_at: string;
  completed_at?: string;
}

export const STATUS_LABELS: Record<FeedbackStatus, { label: string; badgeClass: string; description: string }> = {
  new: {
    label: 'Mới tiếp nhận',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Hệ thống đã ghi nhận, đang chờ cán bộ phân loại'
  },
  reviewing: {
    label: 'Đang phân loại',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Cán bộ đang kiểm tra và phân công đơn vị xử lý'
  },
  processing: {
    label: 'Đang xử lý',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    description: 'Đơn vị liên quan đang tiến hành xử lý thực tế'
  },
  forwarded: {
    label: 'Đã chuyển đơn vị liên quan',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Đã chuyển thông tin tới cơ quan/bộ phận chuyên môn phụ trách'
  },
  waiting_info: {
    label: 'Chờ bổ sung thông tin',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Cần người dân cung cấp thêm thông tin làm rõ'
  },
  resolved: {
    label: 'Đã có kết quả',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Nội dung phản ánh đã được giải quyết hoặc trả lời cụ thể'
  },
  closed: {
    label: 'Đã đóng',
    badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
    description: 'Quy trình tiếp nhận đã kết thúc'
  },
  out_of_scope: {
    label: 'Ngoài phạm vi tiếp nhận',
    badgeClass: 'bg-red-100 text-red-800 border-red-200',
    description: 'Nội dung không thuộc thẩm quyền hoặc không đủ điều kiện xử lý'
  }
};

export const PRIORITY_LABELS: Record<FeedbackPriority, { label: string; badgeClass: string }> = {
  low: { label: 'Bình thường', badgeClass: 'bg-slate-100 text-slate-700' },
  normal: { label: 'Ưu tiên trung bình', badgeClass: 'bg-sky-100 text-sky-800' },
  high: { label: 'Ưu tiên cao', badgeClass: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Khẩn cấp', badgeClass: 'bg-red-100 text-red-800 font-bold' }
};
