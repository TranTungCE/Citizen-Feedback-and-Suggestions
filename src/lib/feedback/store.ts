import { FeedbackItem, FeedbackCategory, FeedbackHistory, STATUS_LABELS, PRIORITY_LABELS } from '@/types';
export { STATUS_LABELS, PRIORITY_LABELS };

// Danh mục mặc định chuẩn hóa theo yêu cầu
export const DEFAULT_CATEGORIES: FeedbackCategory[] = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Hạ tầng, giao thông và chiếu sáng',
    slug: 'ha-tang-giao-thong',
    description: 'Đường sá, cầu cống, biển báo, đèn chiếu sáng nông thôn',
    sort_order: 1,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Môi trường, rác thải và vệ sinh',
    slug: 'mo-truong-ve-sinh',
    description: 'Xả rác, ô nhiễm kênh rạch, thu gom rác thải sinh hoạt',
    sort_order: 2,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'An sinh xã hội và đời sống Nhân dân',
    slug: 'an-sinh-xa-hoi',
    description: 'Chính sách hỗ trợ hộ nghèo, khó khăn, việc làm, đời sống',
    sort_order: 3,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000004',
    name: 'Trật tự, an toàn và cộng đồng',
    slug: 'an-ninh-trat-tu',
    description: 'Tiếng ồn, an toàn sinh hoạt cộng đồng, buôn bán lấn chiếm lề đường',
    sort_order: 4,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000005',
    name: 'Thủ tục hành chính và phục vụ',
    slug: 'thu-tuc-hanh-chinh',
    description: 'Thái độ phục vụ, quy trình giải quyết hồ sơ tại bộ phận một cửa',
    sort_order: 5,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000006',
    name: 'Công tác Mặt trận và phong trào',
    slug: 'mat-tran-phong-trao',
    description: 'Cuộc vận động Toàn dân đoàn kết, hiến kế phong trào địa phương',
    sort_order: 6,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000007',
    name: 'Góp ý, kiến nghị khác',
    slug: 'y-kien-khac',
    description: 'Các vấn đề đời sống xã hội khác trên địa bàn xã An Thới Đông',
    sort_order: 7,
    is_active: true
  }
];

// In-memory / Mock store cho môi trường kiểm thử khi chưa kết nối Supabase
class MemoryFeedbackStore {
  private feedbackList: FeedbackItem[] = [];
  private historyList: FeedbackHistory[] = [];

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const item1: FeedbackItem = {
      id: 'f1000000-0000-0000-0000-000000000001',
      tracking_code: 'ATD-261016-8921',
      title: 'Đèn chiếu sáng công cộng tại đường An Thới Đông bị hỏng',
      content: 'Đoạn đường gần ngã ba An Nghĩa có 2 bóng đèn đường bị chập chờn và tắt hẳn 3 ngày nay, gây khó khăn cho bà con đi lại vào buổi tối.',
      category_id: 'c1000000-0000-0000-0000-000000000001',
      category: DEFAULT_CATEGORIES[0],
      location_text: 'Ấp An Nghĩa, gần ngã ba đường An Thới Đông',
      incident_at: '2026-10-14T19:00:00+07:00',
      priority: 'normal',
      status: 'resolved',
      is_anonymous: false,
      submitter_name: 'Nguyễn Văn A',
      submitter_phone: '0901234567',
      official_response: 'Ủy ban MTTQ xã đã chuyển phản ánh đến Ban Quản lý hạ tầng xã. Đơn vị kỹ thuật đã tiến hành thay mới bóng đèn vào ngày 15/10/2026.',
      official_response_at: '2026-10-15T15:30:00+07:00',
      submitted_at: '2026-10-14T20:15:00+07:00',
      updated_at: '2026-10-15T15:30:00+07:00',
      resolved_at: '2026-10-15T15:30:00+07:00'
    };

    const item2: FeedbackItem = {
      id: 'f1000000-0000-0000-0000-000000000002',
      tracking_code: 'ATD-261016-5412',
      title: 'Kiến nghị kiểm tra điểm tập kết rác thải tự phát bờ kênh',
      content: 'Khu vực giáp rạch có một số hộ vứt rác thải bừa bãi gây mùi hôi và ô nhiễm nguồn nước kênh rạch.',
      category_id: 'c1000000-0000-0000-0000-000000000002',
      category: DEFAULT_CATEGORIES[1],
      location_text: 'Tổ 5, Ấp Rạch Lá, xã An Thới Đông',
      priority: 'high',
      status: 'processing',
      is_anonymous: true,
      submitted_at: '2026-10-16T08:30:00+07:00',
      updated_at: '2026-10-16T09:45:00+07:00'
    };

    this.feedbackList.push(item1, item2);

    this.historyList.push(
      {
        id: 'h1',
        feedback_id: item1.id,
        new_status: 'new',
        note: 'Tiếp nhận phản ánh từ người dân qua cổng trực tuyến',
        is_public: true,
        created_at: '2026-10-14T20:15:00+07:00'
      },
      {
        id: 'h2',
        feedback_id: item1.id,
        old_status: 'new',
        new_status: 'processing',
        note: 'Chuyển Ban Quản lý hạ tầng xã kiểm tra',
        is_public: true,
        created_at: '2026-10-15T08:00:00+07:00'
      },
      {
        id: 'h3',
        feedback_id: item1.id,
        old_status: 'processing',
        new_status: 'resolved',
        note: 'Đã hoàn tất thay mới đèn chiếu sáng',
        is_public: true,
        created_at: '2026-10-15T15:30:00+07:00'
      },
      {
        id: 'h4',
        feedback_id: item2.id,
        new_status: 'new',
        note: 'Tiếp nhận phản ánh từ người dân qua cổng trực tuyến',
        is_public: true,
        created_at: '2026-10-16T08:30:00+07:00'
      },
      {
        id: 'h5',
        feedback_id: item2.id,
        old_status: 'new',
        new_status: 'processing',
        note: 'Đang phối hợp Tổ tự quản môi trường ấp Rạch Lá kiểm tra thực địa',
        is_public: true,
        created_at: '2026-10-16T09:45:00+07:00'
      }
    );
  }

  getAll(options?: {
    search?: string;
    status?: string;
    category_id?: string;
    priority?: string;
  }) {
    let list = [...this.feedbackList];

    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (f) =>
          f.tracking_code.toLowerCase().includes(q) ||
          f.title.toLowerCase().includes(q) ||
          f.location_text.toLowerCase().includes(q)
      );
    }

    if (options?.status && options.status !== 'all') {
      list = list.filter((f) => f.status === options.status);
    }

    if (options?.category_id && options.category_id !== 'all') {
      list = list.filter((f) => f.category_id === options.category_id);
    }

    if (options?.priority && options.priority !== 'all') {
      list = list.filter((f) => f.priority === options.priority);
    }

    return list.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
  }

  getByTrackingCode(code: string) {
    return this.feedbackList.find(
      (f) => f.tracking_code.toUpperCase() === code.trim().toUpperCase()
    );
  }

  getById(id: string) {
    return this.feedbackList.find((f) => f.id === id);
  }

  getHistory(feedbackId: string) {
    return this.historyList
      .filter((h) => h.feedback_id === feedbackId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  create(feedback: Omit<FeedbackItem, 'id'>): FeedbackItem {
    const newItem: FeedbackItem = {
      ...feedback,
      id: 'f' + Math.random().toString(36).substring(2, 11)
    };
    this.feedbackList.unshift(newItem);

    // Thêm lịch sử khởi tạo
    this.historyList.push({
      id: 'h' + Math.random().toString(36).substring(2, 11),
      feedback_id: newItem.id,
      new_status: newItem.status,
      note: 'Người dân gửi phản ánh thành công qua cổng tiếp nhận trực tuyến',
      is_public: true,
      created_at: newItem.submitted_at
    });

    return newItem;
  }

  update(id: string, updates: Partial<FeedbackItem>, actorId?: string, note?: string): FeedbackItem | null {
    const index = this.feedbackList.findIndex((f) => f.id === id);
    if (index === -1) return null;

    const oldItem = this.feedbackList[index];
    const updatedItem: FeedbackItem = {
      ...oldItem,
      ...updates,
      updated_at: new Date().toISOString()
    };

    if (updates.status && updates.status !== oldItem.status) {
      if (updates.status === 'resolved' && !updatedItem.resolved_at) {
        updatedItem.resolved_at = new Date().toISOString();
      }
      this.historyList.push({
        id: 'h' + Math.random().toString(36).substring(2, 11),
        feedback_id: id,
        actor_id: actorId,
        old_status: oldItem.status,
        new_status: updates.status,
        note: note || `Cập nhật trạng thái sang ${updates.status}`,
        is_public: true,
        created_at: new Date().toISOString()
      });
    }

    this.feedbackList[index] = updatedItem;
    return updatedItem;
  }

  getMetrics() {
    const total = this.feedbackList.length;
    const countNew = this.feedbackList.filter((f) => f.status === 'new').length;
    const countReviewing = this.feedbackList.filter((f) => f.status === 'reviewing').length;
    const countProcessing = this.feedbackList.filter((f) => f.status === 'processing').length;
    const countForwarded = this.feedbackList.filter((f) => f.status === 'forwarded').length;
    const countResolved = this.feedbackList.filter((f) => f.status === 'resolved').length;
    const countClosed = this.feedbackList.filter((f) => f.status === 'closed').length;
    const countHighPriority = this.feedbackList.filter((f) => f.priority === 'high' || f.priority === 'urgent').length;

    return {
      total,
      countNew,
      countReviewing,
      countProcessing,
      countForwarded,
      countResolved,
      countClosed,
      countHighPriority,
      resolvedRate: total > 0 ? Math.round((countResolved / total) * 100) : 0
    };
  }
}

// Global singleton instance
const globalStore = global as unknown as { __feedbackStore?: MemoryFeedbackStore };
if (!globalStore.__feedbackStore) {
  globalStore.__feedbackStore = new MemoryFeedbackStore();
}

export const feedbackStore = globalStore.__feedbackStore;
