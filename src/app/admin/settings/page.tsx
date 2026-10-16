'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DEFAULT_CATEGORIES } from '@/lib/feedback/store';

export default function AdminSettingsPage() {
  const [allowAnonymous, setAllowAnonymous] = useState(true);
  const [slaHours, setSlaHours] = useState(72);
  const [recipientEmails, setRecipientEmails] = useState('lanhdao.anthoidong@gmail.com, mattran.anthoidong@tphcm.gov.vn');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">
          Cấu hình Hệ thống & Danh mục
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Thiết lập các tham số vận hành cổng tiếp nhận thông tin theo quy chế của đơn vị
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Đã lưu cấu hình hệ thống thành công!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Cấu hình chính sách */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-stone-900 border-b pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8B0000]" />
            Chính sách tiếp nhận và SLA
          </h2>

          <div className="space-y-4 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowAnonymous}
                onChange={(e) => setAllowAnonymous(e.target.checked)}
                className="w-4 h-4 text-[#8B0000] rounded focus:ring-[#8B0000]"
              />
              <div>
                <div className="font-bold text-stone-800">Cho phép người dân gửi ẩn danh</div>
                <div className="text-stone-500 mt-0.5">Nếu tắt, người dân bắt buộc phải cung cấp họ tên và số điện thoại khi gửi phản ánh.</div>
              </div>
            </label>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Thời hạn xử lý tiêu chuẩn (SLA - Giờ)</label>
              <input
                type="number"
                value={slaHours}
                onChange={(e) => setSlaHours(Number(e.target.value))}
                className="w-48 px-3 py-2 border rounded-lg"
              />
              <span className="text-stone-500 block mt-1">Mặc định: 72 giờ làm việc (3 ngày).</span>
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Danh sách Email nhận báo cáo tự động (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={recipientEmails}
                onChange={(e) => setRecipientEmails(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Danh sách danh mục */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-stone-900 border-b pb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#8B0000]" />
            Danh mục Lĩnh vực tiếp nhận ({DEFAULT_CATEGORIES.length})
          </h2>

          <div className="space-y-2">
            {DEFAULT_CATEGORIES.map((c, idx) => (
              <div key={c.id} className="p-3 bg-stone-50 rounded-lg flex items-center justify-between text-xs border">
                <div>
                  <span className="font-bold text-stone-800">{idx + 1}. {c.name}</span>
                  <div className="text-stone-500 mt-0.5">{c.description}</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded">
                  Đang hoạt động
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#8B0000] hover:bg-red-900 text-white text-xs font-bold rounded-lg transition shadow flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Lưu cấu hình
        </button>
      </form>
    </div>
  );
}
