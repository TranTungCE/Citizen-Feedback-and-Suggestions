'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  FileText,
  Send,
  ShieldCheck
} from 'lucide-react';
import { feedbackStore, STATUS_LABELS, PRIORITY_LABELS } from '@/lib/feedback/store';
import { formatVietnameseDateTime } from '@/lib/utils';
import { FeedbackStatus } from '@/types';

function FeedbackDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const item = feedbackStore.getById(id);
  const history = item ? feedbackStore.getHistory(item.id) : [];

  const [status, setStatus] = useState<FeedbackStatus>(item?.status || 'new');
  const [statusNote, setStatusNote] = useState('');
  const [officialResponse, setOfficialResponse] = useState(item?.official_response || '');
  const [internalNote, setInternalNote] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!item) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
        <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-stone-800">Không tìm thấy phản ánh</h2>
        <p className="text-stone-500 text-xs mt-1">Phản ánh này có thể đã bị lưu trữ hoặc ID không hợp lệ.</p>
        <Link href="/admin/feedback" className="mt-4 inline-block text-xs font-bold text-[#8B0000]">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    feedbackStore.update(
      item.id,
      {
        status,
        official_response: officialResponse || undefined,
        official_response_at: officialResponse ? new Date().toISOString() : undefined
      },
      'cb-anthoidong',
      statusNote || `Cập nhật trạng thái sang ${STATUS_LABELS[status]?.label}`
    );
    setStatusNote('');
    setSuccessMsg('Cập nhật trạng thái và phản hồi thành công!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Nút quay lại */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/feedback"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách phản ánh
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-[#8B0000] bg-red-50 border border-red-200 px-3 py-1 rounded">
            {item.tracking_code}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_LABELS[item.status]?.badgeClass}`}>
            {STATUS_LABELS[item.status]?.label}
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Chi tiết nội dung và Thông tin người dân */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs text-stone-500 font-medium">Tiêu đề phản ánh:</span>
              <h1 className="text-xl font-bold text-stone-900 mt-0.5">{item.title}</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t">
              <div>
                <span className="text-stone-500">Lĩnh vực:</span>
                <div className="font-semibold text-stone-800">{item.category?.name || 'Chung'}</div>
              </div>
              <div>
                <span className="text-stone-500">Mức độ ưu tiên:</span>
                <div className="font-semibold text-stone-800">{PRIORITY_LABELS[item.priority]?.label}</div>
              </div>
              <div>
                <span className="text-stone-500">Thời điểm gửi:</span>
                <div className="font-semibold text-stone-800">{formatVietnameseDateTime(item.submitted_at)}</div>
              </div>
              <div>
                <span className="text-stone-500">Địa điểm xảy ra:</span>
                <div className="font-semibold text-stone-800">{item.location_text}</div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <span className="text-xs font-bold text-stone-700 block mb-1">Nội dung chi tiết:</span>
              <div className="bg-stone-50 p-4 rounded-lg text-sm text-stone-800 whitespace-pre-wrap leading-relaxed border border-stone-200">
                {item.content}
              </div>
            </div>
          </div>

          {/* Thông tin người gửi (Chỉ hiển thị cho Cán bộ) */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#8B0000]" />
              Thông tin người gửi (Bảo mật nội bộ)
            </h2>

            {item.is_anonymous ? (
              <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-600">
                Người dân lựa chọn <strong>Gửi ẩn danh</strong>. Không cung cấp thông tin liên hệ.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded border">
                  <div className="text-stone-500">Họ và tên:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{item.submitter_name || 'Không cung cấp'}</div>
                </div>
                <div className="p-3 bg-stone-50 rounded border">
                  <div className="text-stone-500">Số điện thoại:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{item.submitter_phone || 'Không cung cấp'}</div>
                </div>
                <div className="p-3 bg-stone-50 rounded border">
                  <div className="text-stone-500">Email:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{item.submitter_email || 'Không cung cấp'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Lịch sử xử lý */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8B0000]" />
              Lịch sử cập nhật trạng thái
            </h2>

            <div className="space-y-3">
              {history.map((h) => (
                <div key={h.id} className="text-xs border-l-2 border-[#8B0000] pl-3 py-1 space-y-0.5">
                  <div className="flex items-center gap-2 text-stone-500">
                    <span>{formatVietnameseDateTime(h.created_at)}</span>
                    <span>•</span>
                    <span className="font-semibold text-stone-800">{STATUS_LABELS[h.new_status]?.label}</span>
                  </div>
                  {h.note && <div className="text-stone-700">{h.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cột phải: Thao tác cập nhật trạng thái và Phản hồi công khai */}
        <div className="space-y-6">
          <form onSubmit={handleUpdateStatus} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b pb-3">
              <CheckCircle2 className="w-4 h-4 text-[#8B0000]" />
              Xử lý & Cập nhật trạng thái
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Chuyển trạng thái
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as FeedbackStatus)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000] bg-white font-medium"
              >
                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Ghi chú mốc xử lý (Hiển thị cho dân theo dõi)
              </label>
              <input
                type="text"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="VD: Đã chuyển Tổ tự quản ấp kiểm tra..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Kết quả trả lời / Phản hồi chính thức
              </label>
              <textarea
                rows={4}
                value={officialResponse}
                onChange={(e) => setOfficialResponse(e.target.value)}
                placeholder="Nội dung kết luận hoặc giải pháp sau khi đơn vị chức năng đã hoàn thành xử lý..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              ></textarea>
              <span className="text-[11px] text-stone-500 block mt-1">
                * Nội dung này sẽ được công khai trên trang tra cứu cho người dân.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#8B0000] hover:bg-red-900 text-white text-xs font-bold rounded-lg transition shadow"
            >
              Lưu thay đổi & Cập nhật
            </button>
          </form>

          {/* Ghi chú nội bộ bí mật */}
          <div className="bg-amber-50/60 p-5 rounded-xl border border-amber-200 space-y-3">
            <h3 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Ghi chú nghiệp vụ nội bộ
            </h3>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Các thông tin phân công, số biên bản kiểm tra thực địa hoặc ghi chú trao đổi giữa cán bộ MTTQ và chính quyền xã. Tuyệt đối không để lộ cho người tra cứu công khai.
            </p>
            <textarea
              rows={3}
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Nhập ghi chú chỉ cán bộ xem được..."
              className="w-full p-2.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none"
            ></textarea>
            <button
              type="button"
              onClick={() => {
                alert('Đã lưu ghi chú nghiệp vụ nội bộ.');
                setInternalNote('');
              }}
              className="px-3 py-1.5 bg-amber-800 text-white rounded text-xs font-bold hover:bg-amber-900 transition"
            >
              Lưu ghi chú nội bộ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-stone-500">Đang tải thông tin chi tiết phản ánh...</div>}>
      <FeedbackDetailContent />
    </Suspense>
  );
}
