'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Download, 
  Inbox, 
  Eye, 
  MapPin, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { feedbackStore, STATUS_LABELS, PRIORITY_LABELS, DEFAULT_CATEGORIES } from '@/lib/feedback/store';
import { formatVietnameseDateTime } from '@/lib/utils';
import { FeedbackStatus, FeedbackPriority } from '@/types';

export default function FeedbackManagementPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const items = feedbackStore.getAll({
    search,
    status: statusFilter,
    category_id: categoryFilter,
    priority: priorityFilter
  });

  const exportCSV = () => {
    const headers = ['Mã tiếp nhận', 'Tiêu đề', 'Lĩnh vực', 'Trạng thái', 'Ưu tiên', 'Địa điểm', 'Thời gian gửi', 'Người gửi', 'SĐT'];
    const rows = items.map(item => [
      item.tracking_code,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.category?.name || ''}"`,
      `"${STATUS_LABELS[item.status]?.label || item.status}"`,
      `"${PRIORITY_LABELS[item.priority]?.label || item.priority}"`,
      `"${item.location_text.replace(/"/g, '""')}"`,
      item.submitted_at,
      item.is_anonymous ? 'Ẩn danh' : (item.submitter_name || ''),
      item.is_anonymous ? '' : (item.submitter_phone || '')
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `danh_sach_phan_anh_anthoidong_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900">
            Quản lý phản ánh, góp ý
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Tổng cộng: {items.length} bản ghi phù hợp với bộ lọc
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition shadow"
        >
          <Download className="w-4 h-4" />
          Xuất dữ liệu CSV
        </button>
      </div>

      {/* Bộ lọc và Tìm kiếm */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">Tìm kiếm</label>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Mã, tiêu đề, địa điểm..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">Trạng thái</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000] bg-white"
          >
            <option value="all">Tất cả trạng thái</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">Lĩnh vực</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000] bg-white"
          >
            <option value="all">Tất cả lĩnh vực</option>
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 mb-1">Mức độ ưu tiên</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000] bg-white"
          >
            <option value="all">Tất cả mức độ</option>
            {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
              <th className="p-3">Mã tiếp nhận</th>
              <th className="p-3">Tiêu đề phản ánh</th>
              <th className="p-3">Lĩnh vực</th>
              <th className="p-3">Địa điểm</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Ngày gửi</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-stone-500">
                  Không tìm thấy phản ánh nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50 transition">
                  <td className="p-3 font-mono font-bold text-[#8B0000] whitespace-nowrap">
                    {item.tracking_code}
                  </td>
                  <td className="p-3 font-semibold text-stone-900 max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="p-3 text-stone-600 whitespace-nowrap">
                    {item.category?.name || 'Chung'}
                  </td>
                  <td className="p-3 text-stone-600 max-w-xs truncate">
                    {item.location_text}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full font-semibold border ${STATUS_LABELS[item.status]?.badgeClass}`}>
                      {STATUS_LABELS[item.status]?.label}
                    </span>
                  </td>
                  <td className="p-3 text-stone-500 whitespace-nowrap">
                    {formatVietnameseDateTime(item.submitted_at)}
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/feedback/${item.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
