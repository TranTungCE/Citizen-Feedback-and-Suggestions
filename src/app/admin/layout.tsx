'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Inbox, 
  FileSpreadsheet, 
  Settings, 
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { LogoSvg } from '@/components/LogoSvg';

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 phút không thao tác thì tự động đăng xuất

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleLogout = () => {
    document.cookie = "dh_admin_session=; path=/; max-age=0";
    document.cookie = "atd_admin_session=; path=/; max-age=0";
    if (typeof window !== 'undefined') {
      localStorage.removeItem("dh_admin_last_activity");
      localStorage.removeItem("atd_admin_last_activity");
    }
    router.push('/admin/login');
  };

  // Kiểm tra trạng thái đăng nhập và cơ chế tự động logout khi không hoạt động
  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    const checkSession = () => {
      const cookies = document.cookie.split('; ');
      const hasSession = cookies.some((row) => 
        row.startsWith('dh_admin_session=') || row.startsWith('atd_admin_session=')
      );

      const lastActivity = localStorage.getItem("dh_admin_last_activity") || localStorage.getItem("atd_admin_last_activity");
      const now = Date.now();

      if (!hasSession || (lastActivity && now - parseInt(lastActivity, 10) > INACTIVITY_TIMEOUT_MS)) {
        setIsAuthenticated(false);
        handleLogout();
        return false;
      }
      return true;
    };

    if (checkSession()) {
      setIsAuthenticated(true);
      localStorage.setItem("dh_admin_last_activity", Date.now().toString());
    }

    // Lắng nghe sự kiện người dùng hoạt động để reset bộ đếm thời gian
    const updateActivity = () => {
      localStorage.setItem("atd_admin_last_activity", Date.now().toString());
    };

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);

    // Kiểm tra định kỳ mỗi phút
    const interval = setInterval(() => {
      checkSession();
    }, 60000);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      clearInterval(interval);
    };
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#B22222] border-t-transparent rounded-full animate-spin"></div>
          <span>Đang xác thực quyền truy cập cán bộ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-white border-r border-stone-200 flex flex-col shrink-0 shadow-sm">
        <div className="p-5 border-b border-stone-100 bg-red-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 shadow-sm border border-red-200 shrink-0">
              <LogoSvg className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#B22222] tracking-wider leading-none">
                MTTQ Phường Diên Hồng
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
              <span>Tùy chỉnh Lĩnh vực & Cài đặt</span>
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

        {/* Trạng thái cán bộ & Đăng xuất */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/60 text-xs">
          <div className="flex items-center gap-2 mb-2 font-medium text-stone-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Cán bộ: Quản trị viên</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-stone-500 hover:text-[#B22222] flex items-center gap-1.5 transition text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Thoát phiên làm việc</span>
          </button>
        </div>
      </aside>

      {/* Vùng nội dung chính */}
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-stone-50 text-xs text-stone-500">Đang tải...</div>}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
