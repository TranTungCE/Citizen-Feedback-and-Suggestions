'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { LogoSvg } from '@/components/LogoSvg';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Xác thực tài khoản mặc định bảo mật admin/admin123
    setTimeout(() => {
      if (
        (username.trim() === 'admin' && password === 'admin123') ||
        (username.trim().toLowerCase() === 'admin@anthoidong.gov.vn' && password === 'admin123')
      ) {
        // Lưu cookie phiên đăng nhập
        document.cookie = "atd_admin_session=authenticated; path=/; max-age=86400";
        router.push('/admin');
      } else {
        setError('Tài khoản hoặc mật khẩu không chính xác.');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-stone-50/50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 p-1 border border-red-200 shadow-sm">
            <LogoSvg className="w-12 h-12" />
          </div>
          <span className="text-[11px] font-bold text-[#B22222] uppercase tracking-wider block">
            Ủy ban MTTQ Việt Nam Xã An Thới Đông
          </span>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Đăng nhập Quản trị Cán bộ
          </h1>
          <p className="text-xs text-stone-500">
            Hệ thống nội bộ phục vụ công tác tiếp nhận và xử lý phản ánh
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Tên đăng nhập
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Mật khẩu xác thực
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full pl-9 pr-10 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 transition"
                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#B22222] hover:bg-red-900 text-white font-bold text-xs rounded-lg transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Đăng nhập hệ thống <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="border-t border-stone-100 pt-4 text-center text-[11px] text-stone-500">
          Chỉ dành riêng cho cán bộ được phân quyền phụ trách.
        </div>
      </div>
    </div>
  );
}
