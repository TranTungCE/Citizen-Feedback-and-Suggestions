import { FeedbackItem, FeedbackCategory, FeedbackHistory, STATUS_LABELS, PRIORITY_LABELS } from '@/types';
export { STATUS_LABELS, PRIORITY_LABELS };

// Danh mục mặc định chuẩn hóa theo đơn vị Phường Diên Hồng
export const DEFAULT_CATEGORIES: FeedbackCategory[] = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Hạ tầng đô thị, giao thông & chiếu sáng',
    slug: 'ha-tang-giao-thong',
    description: 'Đường sá, vỉa hè, nắp cống, biển báo, đèn chiếu sáng đô thị, hẻm dân cư',
    sort_order: 1,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Vệ sinh môi trường & rác thải sinh hoạt',
    slug: 'mo-truong-ve-sinh',
    description: 'Thu gom rác thải, điểm tập kết rác tự phát, thoát nước, ô nhiễm tiếng ồn',
    sort_order: 2,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Trật tự lòng lề đường & an toàn đô thị',
    slug: 'an-ninh-trat-tu',
    description: 'Lấn chiếm vỉa hè kinh doanh, trật tự buôn bán, an toàn sinh hoạt khu phố',
    sort_order: 3,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000004',
    name: 'An sinh xã hội & chăm lo đời sống',
    slug: 'an-sinh-xa-hoi',
    description: 'Chính sách hỗ trợ gia đình khó khăn, người cao tuổi, bảo hiểm y tế, việc làm',
    sort_order: 4,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000005',
    name: 'Thủ tục hành chính & thái độ phục vụ',
    slug: 'thu-tuc-hanh-chinh',
    description: 'Quy trình giải quyết hồ sơ công dân, dịch vụ công trực tuyến, tinh thần phục vụ',
    sort_order: 5,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000006',
    name: 'Công tác Mặt trận & xây dựng đời sống văn hóa',
    slug: 'mat-tran-phong-trao',
    description: 'Cuộc vận động Toàn dân đoàn kết, hiến kế phong trào khu dân cư văn minh',
    sort_order: 6,
    is_active: true
  },
  {
    id: 'c1000000-0000-0000-0000-000000000007',
    name: 'Ý kiến, kiến nghị và hiến kế khác',
    slug: 'y-kien-khac',
    description: 'Các vấn đề đời sống xã hội khác trên địa bàn Phường Diên Hồng',
    sort_order: 7,
    is_active: true
  }
];

class MemoryFeedbackStore {
  private feedbackList: FeedbackItem[] = [];
  private historyList: FeedbackHistory[] = [];
  private categories: FeedbackCategory[] = [];
  private recipientEmails: string = 'tung.trandt2413883@hcmut.edu.vn';

  constructor() {
    this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    // Chỉ nạp dữ liệu mẫu khi đang chạy development cục bộ và không có cấu hình production
    if (process.env.NODE_ENV === 'development' && process.env.ENABLE_DEMO_SEED === 'true') {
      this.seedInitial();
    }
  }

  // Quản lý danh mục lĩnh vực động
  getCategories(): FeedbackCategory[] {
    return [...this.categories].sort((a, b) => a.sort_order - b.sort_order);
  }

  getActiveCategories(): FeedbackCategory[] {
    return this.categories.filter((c) => c.is_active).sort((a, b) => a.sort_order - b.sort_order);
  }

  addCategory(name: string, description: string): FeedbackCategory {
    const newCat: FeedbackCategory = {
      id: 'cat_' + Math.random().toString(36).substring(2, 10),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      description,
      is_active: true,
      sort_order: this.categories.length + 1
    };
    this.categories.push(newCat);
    return newCat;
  }

  updateCategory(id: string, updates: Partial<FeedbackCategory>): FeedbackCategory | null {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.categories[index] = { ...this.categories[index], ...updates };
    return this.categories[index];
  }

  deleteCategory(id: string): boolean {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.categories.splice(index, 1);
    return true;
  }

  getRecipientEmails(): string {
    return this.recipientEmails;
  }

  setRecipientEmails(emails: string): void {
    this.recipientEmails = emails;
  }

  private seedInitial() {
    const item1: FeedbackItem = {
      id: 'f1000000-0000-0000-0000-000000000001',
      tracking_code: 'DH-261016-8921',
      title: 'Đèn chiếu sáng công cộng tại hẻm đường Thành Thái bị hỏng',
      content: 'Bóng đèn chiếu sáng công cộng đoạn giao hẻm đường Thành Thái bị chập chờn và tắt hẳn 3 ngày nay, gây khó khăn cho bà con và người già đi lại vào buổi tối.',
      category_id: this.categories[0]?.id,
      category: this.categories[0],
      location_text: 'Khu phố 3, hẻm đường Thành Thái, Phường Diên Hồng',
      incident_at: '2026-10-14T19:00:00+07:00',
      priority: 'normal',
      status: 'resolved',
      is_anonymous: false,
      submitter_name: 'Nguyễn Văn An',
      submitter_phone: '0901234567',
      official_response: 'Ủy ban MTTQ Phường đã chuyển phản ánh đến Bộ phận Đô thị và Môi trường. Đơn vị kỹ thuật đã tiến hành thay mới bóng đèn vào ngày 15/10/2026.',
      official_response_at: '2026-10-15T15:30:00+07:00',
      submitted_at: '2026-10-14T20:15:00+07:00',
      updated_at: '2026-10-15T15:30:00+07:00',
      resolved_at: '2026-10-15T15:30:00+07:00'
    };

    const item2: FeedbackItem = {
      id: 'f1000000-0000-0000-0000-000000000002',
      tracking_code: 'DH-261016-5412',
      title: 'Kiến nghị kiểm tra điểm tập kết rác thải tự phát gần chợ',
      content: 'Khu vực gần ngã tư có một số hộ vứt rác thải bừa bãi sau giờ thu gom gây mùi hôi và mất mỹ quan đô thị.',
      category_id: this.categories[1]?.id,
      category: this.categories[1],
      location_text: 'Đoạn đường 3 Tháng 2, Phường Diên Hồng',
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
        note: 'Chuyển Bộ phận Quản lý đô thị Phường kiểm tra',
        is_public: true,
        created_at: '2026-10-15T08:00:00+07:00'
      },
      {
        id: 'h3',
        feedback_id: item1.id,
        old_status: 'processing',
        new_status: 'resolved',
        note: 'Đã hoàn tất thay mới đèn chiếu sáng công cộng',
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
        note: 'Đang phối hợp Ban điều hành Khu phố kiểm tra thực địa',
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

const globalStore = global as unknown as { __feedbackStore?: MemoryFeedbackStore };
if (!globalStore.__feedbackStore) {
  globalStore.__feedbackStore = new MemoryFeedbackStore();
}

export const feedbackStore = globalStore.__feedbackStore;
