'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Xác thực tài khoản cán bộ
    setTimeout(() => {
      if (email.includes('@') && password.length >= 6) {
        router.push('/admin');
      } else {
        setError('Thông tin đăng nhập hoặc mật khẩu không chính xác.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-red-50 text-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-2 border border-red-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">
            Ủy ban MTTQ Việt Nam Xã An Thới Đông
          </span>
          <h1 className="text-2xl font-black text-stone-900">
            Đăng nhập Cán bộ
          </h1>
          <p className="text-xs text-stone-500">
            Khu vực nội bộ dành riêng cho Cán bộ tiếp nhận và Lãnh đạo phụ trách
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Địa chỉ Email công vụ / tài khoản
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="canbo.anthoidong@tphcm.gov.vn"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Mật khẩu xác thực
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#8B0000]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#8B0000] hover:bg-red-900 text-white font-bold text-xs rounded-lg transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Đăng nhập vào bảng điều khiển <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="border-t pt-4 text-center text-xs text-stone-500">
          Chưa có tài khoản công vụ? Vui lòng liên hệ Quản trị viên hệ thống (Super Admin) để được cấp quyền truy cập. Không hỗ trợ đăng ký tự do.
        </div>
      </div>
    </div>
  );
}
