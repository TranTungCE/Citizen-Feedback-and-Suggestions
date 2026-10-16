import React from 'react';
import Link from 'next/link';
import { Send, Search, ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#8B0000] text-white shadow-md border-b-2 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Cơ quan */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-inner">
              {/* Biểu trưng placeholder trang trọng hình hoa sen/mặt trận cách điệu */}
              <div className="w-full h-full rounded-full bg-[#8B0000] flex items-center justify-center text-amber-300 font-bold text-xs tracking-tighter text-center leading-none">
                MTTQ<br/>ATĐ
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-200 font-semibold">
                Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông
              </div>
              <div className="text-base sm:text-lg font-bold text-white group-hover:text-amber-100 transition">
                Cổng Tiếp Nhận Góp Ý & Phản Ánh
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-white hover:text-amber-300 transition">
              Trang chủ
            </Link>
            <Link href="/gui-gop-y" className="text-white hover:text-amber-300 transition flex items-center gap-1.5">
              <Send className="w-4 h-4" />
              Gửi góp ý
            </Link>
            <Link href="/tra-cuu" className="text-white hover:text-amber-300 transition flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              Tra cứu mã
            </Link>
            <Link href="/huong-dan" className="text-white hover:text-amber-300 transition">
              Hướng dẫn
            </Link>
            <Link href="/lien-he" className="text-white hover:text-amber-300 transition">
              Liên hệ
            </Link>
            <Link
              href="/admin/login"
              className="text-xs text-amber-200 hover:text-white px-2.5 py-1 rounded border border-amber-300/40 hover:border-white transition flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Cán bộ
            </Link>
          </nav>

          {/* CTA Mobile / Quick CTA */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/gui-gop-y"
              className="bg-amber-400 text-[#8B0000] font-bold px-3 py-1.5 rounded-md text-xs shadow hover:bg-amber-300 transition"
            >
              Gửi góp ý
            </Link>
            <Link
              href="/tra-cuu"
              className="bg-white/10 text-white font-medium px-2.5 py-1.5 rounded-md text-xs hover:bg-white/20 transition"
            >
              Tra cứu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
