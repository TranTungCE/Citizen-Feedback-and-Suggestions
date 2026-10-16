'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Tag, 
  ChevronRight,
  Send
} from 'lucide-react';
import { feedbackStore, STATUS_LABELS, PRIORITY_LABELS } from '@/lib/feedback/store';
import { formatVietnameseDateTime } from '@/lib/utils';
import { FeedbackItem, FeedbackHistory } from '@/types';

function SearchFeedbackContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeedbackItem | null>(null);
  const [history, setHistory] = useState<FeedbackHistory[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialCode) {
      handleSearchCode(initialCode);
    }
  }, [initialCode]);

  const handleSearchCode = async (code: string) => {
    if (!code.trim()) return;
    setLoading(true);
    setNotFound(false);
    setHasSearched(true);

    try {
      // Đồng bộ từ database nếu có bản ghi mới
      await fetch('/api/feedback').catch(() => {});
    } catch {}

    const item = feedbackStore.getByTrackingCode(code);
    if (item) {
      setResult(item);
      setHistory(feedbackStore.getHistory(item.id));
      setNotFound(false);
    } else {
      setResult(null);
      setHistory([]);
      setNotFound(true);
    }
    setLoading(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchCode(trackingCode);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#8B0000]">
          Tra cứu tiến độ phản ánh
        </h1>
        <p className="text-stone-600 text-sm mt-2">
          Nhập mã tiếp nhận (định dạng DH-YYMMDD-XXXX) được cấp khi gửi phản ánh để kiểm tra tiến trình giải quyết
        </p>
      </div>

      {/* FORM TÌM KIẾM */}
      <form onSubmit={onSubmit} className="max-w-xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              placeholder="Nhập mã tiếp nhận: DH-261016-8921..."
              className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent text-sm font-mono uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#8B0000] text-white font-bold rounded-lg hover:bg-red-900 transition flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Tra cứu'
            )}
          </button>
        </div>
      </form>

      {/* THÔNG BÁO KHÔNG TÌM THẤY */}
      {notFound && (
        <div className="max-w-xl mx-auto p-6 bg-stone-50 border border-stone-200 rounded-xl text-center">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <h3 className="font-bold text-stone-800 text-base">Không tìm thấy mã tiếp nhận</h3>
          <p className="text-stone-600 text-xs mt-1">
            Vui lòng kiểm tra lại chính xác các ký tự trong mã hoặc liên hệ Ủy ban MTTQ xã nếu cần hỗ trợ.
          </p>
        </div>
      )}

      {/* KẾT QUẢ TRA CỨU HỢP LỆ (BẢO VỆ DỮ LIỆU CÁ NHÂN THEO QUY ĐỊNH) */}
      {result && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden space-y-6 p-6 sm:p-8">
          {/* Header kết quả */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-lg text-[#8B0000]">
                  {result.tracking_code}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_LABELS[result.status]?.badgeClass || 'bg-stone-100'}`}>
                  {STATUS_LABELS[result.status]?.label || result.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-stone-900">
                {result.title}
              </h2>
            </div>

            <div className="text-xs text-stone-500 sm:text-right">
              <div>Thời gian gửi:</div>
              <div className="font-medium text-stone-700">{formatVietnameseDateTime(result.submitted_at)}</div>
            </div>
          </div>

          {/* Chi tiết nội dung công khai */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3 bg-stone-50 rounded-lg space-y-1">
              <span className="text-stone-500 font-medium">Lĩnh vực:</span>
              <div className="font-semibold text-stone-800">{result.category?.name || 'Chung'}</div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg space-y-1">
              <span className="text-stone-500 font-medium">Khu vực xảy ra:</span>
              <div className="font-semibold text-stone-800">{result.location_text}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Nội dung phản ánh tóm tắt:
            </h3>
            <div className="p-4 bg-stone-50 rounded-lg text-sm text-stone-700 leading-relaxed border border-stone-200">
              {result.content}
            </div>
          </div>

          {/* PHẢN HỒI CHÍNH THỨC CỦA CƠ QUAN CHỨC NĂNG (NẾU CÓ) */}
          {result.official_response && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-300 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Kết quả trả lời / Phản hồi chính thức
                </div>
                {result.official_response_at && (
                  <span className="text-xs text-emerald-700">
                    Cập nhật lúc: {formatVietnameseDateTime(result.official_response_at)}
                  </span>
                )}
              </div>
              <div className="text-sm text-emerald-950 leading-relaxed pt-1">
                {result.official_response}
              </div>
            </div>
          )}

          {/* TIẾN TRÌNH XỬ LÝ (TIMELINE CÔNG KHAI) */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8B0000]" />
              Tiến trình tiếp nhận & cập nhật trạng thái
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {history.map((step, idx) => (
                <div key={step.id || idx} className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#8B0000] ring-4 ring-white"></div>
                  <div className="text-xs text-stone-500">
                    {formatVietnameseDateTime(step.created_at)}
                  </div>
                  <div className="text-sm font-semibold text-stone-900 mt-0.5">
                    {STATUS_LABELS[step.new_status]?.label || step.new_status}
                  </div>
                  {step.note && (
                    <div className="text-xs text-stone-600 mt-1 bg-stone-50 p-2.5 rounded border border-stone-200">
                      {step.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            Nhằm bảo đảm quyền riêng tư, thông tin cá nhân của người gửi không được hiển thị trên trang tra cứu công khai.
          </div>
        </div>
      )}
    </div>
  );
}

export default function TraCuuPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-16 text-center">Đang tải trang tra cứu...</div>}>
      <SearchFeedbackContent />
    </Suspense>
  );
}
