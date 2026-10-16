'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, Plus, Trash2, Edit3, X, Check } from 'lucide-react';
import { feedbackStore } from '@/lib/feedback/store';
import { FeedbackCategory } from '@/types';

export default function AdminSettingsPage() {
  const [allowAnonymous, setAllowAnonymous] = useState(true);
  const [slaHours, setSlaHours] = useState(48);
  const [recipientEmails, setRecipientEmails] = useState('tung.trandt2413883@hcmut.edu.vn');
  const [saved, setSaved] = useState(false);
  const [categories, setCategories] = useState<FeedbackCategory[]>([]);

  // State cho thêm mới category
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // State cho chỉnh sửa category
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    setCategories(feedbackStore.getCategories());
    setRecipientEmails(feedbackStore.getRecipientEmails());
  }, []);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    feedbackStore.setRecipientEmails(recipientEmails);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    feedbackStore.addCategory(newCatName.trim(), newCatDesc.trim());
    setCategories(feedbackStore.getCategories());
    setNewCatName('');
    setNewCatDesc('');
    setShowAddModal(false);
  };

  const startEditCategory = (c: FeedbackCategory) => {
    setEditingId(c.id);
    setEditName(c.name);
    setEditDesc(c.description || '');
  };

  const handleSaveEdit = (id: string) => {
    feedbackStore.updateCategory(id, {
      name: editName,
      description: editDesc
    });
    setCategories(feedbackStore.getCategories());
    setEditingId(null);
  };

  const handleToggleActive = (id: string, current: boolean) => {
    feedbackStore.updateCategory(id, { is_active: !current });
    setCategories(feedbackStore.getCategories());
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa lĩnh vực này khỏi danh sách tiếp nhận?')) {
      feedbackStore.deleteCategory(id);
      setCategories(feedbackStore.getCategories());
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900">
          Tùy chỉnh Lĩnh vực & Cài đặt Hệ thống
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Quản lý các nhóm lĩnh vực tiếp nhận ý kiến của người dân Phường Diên Hồng và cấu hình email báo cáo
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Đã lưu cấu hình hệ thống thành công!
        </div>
      )}

      {/* 1. TÙY CHỈNH LĨNH VỰC TIẾP NHẬN (CRUD HOÀN CHỈNH) */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#B22222]" />
            Danh mục Lĩnh vực Tiếp nhận Xử lý ({categories.length})
          </h2>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B22222] hover:bg-red-900 text-white text-xs font-bold rounded-lg transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm lĩnh vực mới
          </button>
        </div>

        {/* Form thêm mới Modal inline */}
        {showAddModal && (
          <form onSubmit={handleAddCategory} className="p-4 bg-red-50/50 rounded-lg border border-red-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B22222]">Thêm lĩnh vực tiếp nhận mới:</span>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Tên lĩnh vực (VD: An toàn thực phẩm, Cây xanh...)"
                  className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#B22222]"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Mô tả tóm tắt nội dung hướng dẫn người dân..."
                  className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-[#B22222]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-200 rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#B22222] text-white text-xs font-bold rounded hover:bg-red-900"
              >
                Xác nhận thêm
              </button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {categories.map((c, idx) => (
            <div
              key={c.id}
              className={`p-3.5 rounded-lg border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                c.is_active ? 'bg-white border-stone-200' : 'bg-stone-50 border-stone-200 opacity-60'
              }`}
            >
              {editingId === c.id ? (
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-2 py-1 text-xs border rounded"
                  />
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="px-2 py-1 text-xs border rounded"
                  />
                </div>
              ) : (
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-xs">{idx + 1}. {c.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded font-semibold ${
                        c.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {c.is_active ? 'Đang mở tiếp nhận' : 'Tạm khóa'}
                    </span>
                  </div>
                  <div className="text-stone-500 text-xs leading-relaxed">{c.description}</div>
                </div>
              )}

              <div className="flex items-center gap-2 shrink-0">
                {editingId === c.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(c.id)}
                      className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                      title="Lưu thay đổi"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 bg-stone-300 text-stone-700 rounded hover:bg-stone-400"
                      title="Hủy"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleToggleActive(c.id, c.is_active)}
                      className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 px-2 py-1 border rounded bg-stone-50"
                    >
                      {c.is_active ? 'Tạm ẩn' : 'Kích hoạt'}
                    </button>
                    <button
                      onClick={() => startEditCategory(c)}
                      className="p-1 text-stone-500 hover:text-stone-800"
                      title="Chỉnh sửa"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(c.id)}
                      className="p-1 text-stone-400 hover:text-red-600"
                      title="Xóa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CẤU HÌNH EMAIL & CHÍNH SÁCH TIẾP NHẬN */}
      <form onSubmit={handleSaveGeneral} className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-stone-900 border-b pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#B22222]" />
          Chính sách & Cấu hình Email Báo cáo
        </h2>

        <div className="space-y-4 text-xs">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allowAnonymous}
              onChange={(e) => setAllowAnonymous(e.target.checked)}
              className="w-4 h-4 text-[#B22222] rounded focus:ring-[#B22222]"
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
            <span className="text-stone-500 block mt-1">Mặc định tại đô thị: 48 giờ làm việc (2 ngày).</span>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Email nhận báo cáo tự động định kỳ</label>
            <input
              type="text"
              value={recipientEmails}
              onChange={(e) => setRecipientEmails(e.target.value)}
              placeholder="tung.trandt2413883@hcmut.edu.vn"
              className="w-full px-3 py-2 border rounded-lg font-mono text-xs"
            />
            <span className="text-stone-500 block mt-1">
              Hệ thống sẽ gửi các bản tin báo cáo ngày/tuần/tháng đến địa chỉ này.
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#B22222] hover:bg-red-900 text-white text-xs font-bold rounded-lg transition shadow flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Lưu cấu hình hệ thống
        </button>
      </form>
    </div>
  );
}
