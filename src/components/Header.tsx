'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Search, Menu, X, Home, BookOpen, PhoneCall } from 'lucide-react';
import { LogoSvg } from './LogoSvg';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#B22222] text-white shadow-md border-b-2 border-amber-400">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo SVG chính thức & Tên cơ quan */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3.5 group shrink-0">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center p-0.5 sm:p-1 shadow-md group-hover:scale-105 transition-transform shrink-0">
              <LogoSvg className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-200 font-semibold leading-tight truncate max-w-[200px] sm:max-w-none">
                Ủy ban Mặt trận Tổ quốc Phường Diên Hồng
              </div>
              <div className="text-sm sm:text-lg font-extrabold text-white group-hover:text-amber-100 transition tracking-tight truncate max-w-[210px] sm:max-w-none">
                Cổng Tiếp Nhận Góp Ý
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            <Link href="/" className="text-white hover:text-amber-300 transition py-1">
              Trang chủ
            </Link>
            <Link href="/gui-gop-y" className="text-white hover:text-amber-300 transition flex items-center gap-1.5 py-1">
              <Send className="w-4 h-4 text-amber-300" />
              Gửi góp ý
            </Link>
            <Link href="/tra-cuu" className="text-white hover:text-amber-300 transition flex items-center gap-1.5 py-1">
              <Search className="w-4 h-4 text-amber-300" />
              Tra cứu mã
            </Link>
            <Link href="/huong-dan" className="text-white hover:text-amber-300 transition py-1">
              Hướng dẫn
            </Link>
            <Link href="/lien-he" className="text-white hover:text-amber-300 transition py-1">
              Liên hệ
            </Link>
          </nav>

          {/* Mobile Actions: Nút gửi góp ý + Nút mở Drawer Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/gui-gop-y"
              className="bg-amber-400 active:bg-amber-500 text-[#8B0000] font-bold px-2.5 py-1.5 rounded-lg text-xs shadow flex items-center gap-1 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Góp ý</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 active:bg-white/30 transition focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-200" /> : <Menu className="w-5 h-5 text-amber-200" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#991B1B] border-t border-red-700/80 px-4 pt-3 pb-5 space-y-2 shadow-xl animate-fade-in-up">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 active:bg-white/20 transition"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Trang chủ</span>
          </Link>
          <Link
            href="/gui-gop-y"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 active:bg-white/20 transition"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Gửi phản ánh, góp ý mới</span>
          </Link>
          <Link
            href="/tra-cuu"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 active:bg-white/20 transition"
          >
            <Search className="w-4 h-4 text-amber-300" />
            <span>Tra cứu tiến độ xử lý</span>
          </Link>
          <Link
            href="/huong-dan"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 active:bg-white/20 transition"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Hướng dẫn quy trình</span>
          </Link>
          <Link
            href="/lien-he"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 active:bg-white/20 transition"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            <span>Thông tin liên hệ & Tiếp dân</span>
          </Link>
        </div>
      )}
    </header>
  );
}
