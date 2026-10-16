'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle, 
  EyeOff, 
  MapPin, 
  Calendar, 
  FileText, 
  User, 
  Phone, 
  Mail,
  ShieldAlert
} from 'lucide-react';
import { feedbackStore } from '@/lib/feedback/store';
import { submitFeedbackAction } from '@/app/actions/feedback';
import { FeedbackCategory } from '@/types';

export default function SubmitFeedbackPage() {
  const [categories, setCategories] = useState<FeedbackCategory[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    location_text: '',
    incident_at: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    content: '',
    submitter_name: '',
    submitter_phone: '',
    submitter_email: '',
    agree_privacy: false,
    honeypot: ''
  });

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.length > 0) {
          setCategories(json.data);
          setFormData((prev) => ({
            ...prev,
            category_id: prev.category_id || json.data[0].id
          }));
        } else {
          const list = feedbackStore.getActiveCategories();
          setCategories(list);
          if (list.length > 0) {
            setFormData((prev) => ({ ...prev, category_id: prev.category_id || list[0].id }));
          }
        }
      })
      .catch(() => {
        const list = feedbackStore.getActiveCategories();
        setCategories(list);
        if (list.length > 0) {
          setFormData((prev) => ({ ...prev, category_id: prev.category_id || list[0].id }));
        }
      });
  }, []);

  const handleCopyCode = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    if (!formData.agree_privacy) {
      setErrorMessage('Bạn cần đánh dấu đồng ý với Điều khoản xử lý dữ liệu và quyền riêng tư.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await submitFeedbackAction({
        ...formData,
        is_anonymous: isAnonymous
      });

      if (res.success && res.trackingCode) {
        setSubmittedCode(res.trackingCode);
      } else {
        setErrorMessage(res.error || 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.');
        if (res.errors) {
          setFieldErrors(res.errors);
        }
      }
    } catch (err: unknown) {
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedCode) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden text-center p-8 sm:p-12">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 mb-3">
            Đã tiếp nhận thành công
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-3">
            Cảm ơn bạn đã gửi ý kiến đóng góp!
          </h1>
          <p className="text-stone-600 text-sm max-w-lg mx-auto mb-8">
            Ủy ban Mặt trận Tổ quốc Việt Nam Phường Diên Hồng đã ghi nhận thông tin của bạn. Dưới đây là mã tiếp nhận chính thức để bạn theo dõi kết quả.
          </p>

          <div className="bg-stone-50 border-2 border-dashed border-[#B22222] p-6 rounded-xl max-w-md mx-auto mb-6">
            <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">
              Mã tiếp nhận của bạn
            </div>
            <div className="text-3xl font-mono font-black text-[#B22222] tracking-wider mb-3">
              {submittedCode}
            </div>
            <button
              onClick={handleCopyCode}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-bold transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  Đã sao chép mã
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Sao chép mã tiếp nhận
                </>
              )}
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left max-w-md mx-auto mb-8 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              Lưu ý quan trọng:
            </div>
            <p>• Vui lòng lưu lại mã tiếp nhận trên để tra cứu tiến độ xử lý.</p>
            <p>• Việc tiếp nhận thông tin không đồng nghĩa với việc sự việc đã được giải quyết xong ngay lập tức.</p>
            <p>• Cán bộ MTTQ Phường Diên Hồng sẽ tiến hành thẩm tra và phối hợp với cơ quan có thẩm quyền xử lý theo quy định.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/tra-cuu?code=${submittedCode}`}
              className="w-full sm:w-auto px-6 py-3 bg-[#B22222] text-white font-bold rounded-lg hover:bg-red-900 transition shadow"
            >
              Tra cứu trạng thái ngay
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-stone-100 text-stone-700 font-medium rounded-lg hover:bg-stone-200 transition"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#B22222]">
          Gửi góp ý, kiến nghị & phản ánh
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Ủy ban Mặt trận Tổ quốc Việt Nam Phường Diên Hồng trân trọng tiếp nhận ý kiến đóng góp của người dân
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div>{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* CHỌN CHẾ ĐỘ GỬI */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
          <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B22222]"></span>
            Hình thức cung cấp danh tính
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`p-4 rounded-lg border-2 cursor-pointer flex items-start gap-3 transition ${
                !isAnonymous
                  ? 'border-[#B22222] bg-red-50/50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="identity_mode"
                checked={!isAnonymous}
                onChange={() => setIsAnonymous(false)}
                className="mt-1 text-[#B22222] focus:ring-[#B22222]"
              />
              <div>
                <div className="font-bold text-sm text-stone-900">Có thông tin liên hệ</div>
                <div className="text-xs text-stone-500 mt-1">
                  Được cán bộ liên hệ phản hồi trực tiếp và nhận thông báo kết quả qua email (dữ liệu được bảo mật).
                </div>
              </div>
            </label>

            <label
              className={`p-4 rounded-lg border-2 cursor-pointer flex items-start gap-3 transition ${
                isAnonymous
                  ? 'border-[#B22222] bg-red-50/50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <input
                type="radio"
                name="identity_mode"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(true)}
                className="mt-1 text-[#B22222] focus:ring-[#B22222]"
              />
              <div>
                <div className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  <EyeOff className="w-4 h-4 text-stone-600" />
                  Gửi ẩn danh
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Không cung cấp họ tên hay số điện thoại. Cần chủ động lưu mã để tự tra cứu kết quả trên website.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* THÔNG TIN NỘI DUNG PHẢN ÁNH */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b pb-3">
            <FileText className="w-5 h-5 text-[#B22222]" />
            Nội dung phản ánh, góp ý
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Tiêu đề ngắn gọn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Đèn đường chiếu sáng tại đường Thành Thái bị hỏng"
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] text-sm"
              />
              {fieldErrors.title && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.title[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Lĩnh vực góp ý <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] text-sm bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Mức độ cấp thiết đề xuất
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] text-sm bg-white"
              >
                <option value="normal">Bình thường / Theo định kỳ</option>
                <option value="high">Ưu tiên cao / Cần lưu ý sớm</option>
                <option value="urgent">Khẩn cấp (ảnh hưởng nghiêm trọng an toàn)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Địa điểm xảy ra sự việc (Khu phố, số nhà, ngõ/hẻm, tuyến đường) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.location_text}
                  onChange={(e) => setFormData({ ...formData, location_text: e.target.value })}
                  placeholder="Ví dụ: Đoạn trước số 1A Thành Thái, Phường Diên Hồng"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] text-sm"
                />
              </div>
              {fieldErrors.location_text && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.location_text[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Thời điểm xảy ra sự việc (nếu biết)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="datetime-local"
                  value={formData.incident_at}
                  onChange={(e) => setFormData({ ...formData, incident_at: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] text-sm"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-700 mb-1">
                Nội dung chi tiết phản ánh, kiến nghị <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Mô tả cụ thể diễn biến, thực trạng và đề xuất giải pháp xử lý..."
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] text-sm leading-relaxed"
              ></textarea>
              {fieldErrors.content && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.content[0]}</p>
              )}
            </div>
          </div>
        </div>

        {/* THÔNG TIN LIÊN HỆ */}
        {!isAnonymous && (
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b pb-3">
              <User className="w-5 h-5 text-[#B22222]" />
              Thông tin liên hệ người gửi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={formData.submitter_name}
                  onChange={(e) => setFormData({ ...formData, submitter_name: e.target.value })}
                  placeholder="Nguyễn Văn An"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={formData.submitter_phone}
                    onChange={(e) => setFormData({ ...formData, submitter_phone: e.target.value })}
                    placeholder="0912345678"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Địa chỉ email (nhận mã & kết quả)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={formData.submitter_email}
                    onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HONEYPOT */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            autoComplete="off"
          />
        </div>

        {/* CAM KẾT */}
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.agree_privacy}
              onChange={(e) => setFormData({ ...formData, agree_privacy: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#B22222] rounded border-stone-300 focus:ring-[#B22222]"
            />
            <span className="text-xs text-stone-700 leading-relaxed">
              Tôi cam đoan những nội dung phản ánh, góp ý nêu trên là đúng sự thật và chịu trách nhiệm trước pháp luật về tính xác thực của thông tin cung cấp. Tôi đồng ý để Ủy ban MTTQ Việt Nam Phường Diên Hồng sử dụng thông tin này phục vụ công tác xác minh và xử lý.
            </span>
          </label>
        </div>

        {/* SUBMIT */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-10 py-3.5 bg-[#B22222] text-white font-bold text-base rounded-lg hover:bg-red-900 transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang gửi thông tin...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Gửi phản ánh, góp ý chính thức
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
