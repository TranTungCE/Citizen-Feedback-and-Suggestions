import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Inbox, 
  FileSpreadsheet, 
  Settings, 
  Users, 
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { LogoSvg } from '@/components/LogoSvg';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar Admin: Thiết kế Nền Trắng - Đỏ Đô Hiện Đại, Dễ Nhìn */}
      <aside className="w-full md:w-64 bg-white border-r border-stone-200 flex flex-col shrink-0 shadow-sm">
        {/* Header Sidebar */}
        <div className="p-5 border-b border-stone-100 bg-red-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 shadow-sm border border-red-200 shrink-0">
              <LogoSvg className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#B22222] tracking-wider leading-none">
                MTTQ Xã An Thới Đông
              </div>
              <div className="text-sm font-black text-stone-900 mt-1">
                Khu Vực Cán Bộ
              </div>
            </div>
          </div>
        </div>

        {/* Menu Quản trị */}
        <nav className="p-4 space-y-1.5 flex-1 text-xs sm:text-sm font-semibold">
          <Link
            href="/admin"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-stone-700 hover:bg-red-50 hover:text-[#B22222] transition group"
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4 text-stone-400 group-hover:text-[#B22222]" />
              <span>Tổng quan (Dashboard)</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/admin/feedback"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-stone-700 hover:bg-red-50 hover:text-[#B22222] transition group"
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4 text-stone-400 group-hover:text-[#B22222]" />
              <span>Quản lý phản ánh</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/admin/reports"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-stone-700 hover:bg-red-50 hover:text-[#B22222] transition group"
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-4 h-4 text-stone-400 group-hover:text-[#B22222]" />
              <span>Báo cáo & Gửi Email</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-stone-700 hover:bg-red-50 hover:text-[#B22222] transition group"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-stone-400 group-hover:text-[#B22222]" />
              <span>Cấu hình danh mục & SLA</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <div className="pt-4 mt-4 border-t border-stone-100">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-100 text-xs font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              <span>Xem Cổng người dân</span>
            </Link>
          </div>
        </nav>

        {/* Trạng thái cán bộ */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/60 text-xs">
          <div className="flex items-center gap-2 mb-2 font-medium text-stone-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Cán bộ tiếp nhận</span>
          </div>
          <Link
            href="/"
            className="text-stone-500 hover:text-[#B22222] flex items-center gap-1.5 transition text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Thoát phiên làm việc</span>
          </Link>
        </div>
      </aside>

      {/* Vùng nội dung chính */}
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
