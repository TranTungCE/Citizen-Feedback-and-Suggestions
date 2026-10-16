import React from 'react';
import Link from 'next/link';
import { Send, Search } from 'lucide-react';
import { LogoSvg } from './LogoSvg';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#B22222] text-white shadow-md border-b-2 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo SVG chính thức & Tên cơ quan */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md group-hover:scale-105 transition-transform">
              <LogoSvg className="w-10 h-10" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider text-amber-200 font-semibold leading-tight">
                Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông
              </div>
              <div className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-100 transition tracking-tight">
                Cổng Tiếp Nhận Góp Ý & Phản Ánh
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Đã ẩn nút admin ra ngoài giao diện công khai */}
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

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/gui-gop-y"
              className="bg-amber-400 text-[#8B0000] font-bold px-3 py-1.5 rounded-md text-xs shadow hover:bg-amber-300 transition"
            >
              Gửi góp ý
            </Link>
            <Link
              href="/tra-cuu"
              className="bg-white/15 text-white font-semibold px-2.5 py-1.5 rounded-md text-xs hover:bg-white/25 transition flex items-center gap-1"
            >
              Tra cứu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
