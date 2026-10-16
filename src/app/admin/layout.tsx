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
  ShieldAlert
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-200 border-r border-stone-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-stone-800">
          <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
            MTTQ Xã An Thới Đông
          </div>
          <div className="text-base font-extrabold text-white mt-0.5">
            Trang Quản Trị Cán Bộ
          </div>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 text-sm font-medium">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:bg-stone-800 hover:text-white transition"
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            Tổng quan (Dashboard)
          </Link>

          <Link
            href="/admin/feedback"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:bg-stone-800 hover:text-white transition"
          >
            <Inbox className="w-4 h-4 text-amber-400" />
            Quản lý phản ánh
          </Link>

          <Link
            href="/admin/reports"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:bg-stone-800 hover:text-white transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            Báo cáo & Gửi Email
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-300 hover:bg-stone-800 hover:text-white transition"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            Cấu hình danh mục & SLA
          </Link>

          <div className="pt-4 mt-4 border-t border-stone-800">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-stone-400 hover:bg-stone-800 hover:text-stone-200 text-xs transition"
            >
              <ExternalLink className="w-4 h-4" />
              Xem Cổng người dân
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-stone-800 text-xs text-stone-400">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Tài khoản: Cán bộ tiếp nhận</span>
          </div>
          <Link
            href="/"
            className="text-stone-500 hover:text-stone-300 flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Đăng xuất
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
