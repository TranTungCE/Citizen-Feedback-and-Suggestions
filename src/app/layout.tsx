import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Sử dụng font Inter hỗ trợ hoàn hảo bộ ký tự tiếng Việt với các dấu thanh
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Cổng tiếp nhận góp ý, phản ánh xã An Thới Đông',
  description: 'Cổng tiếp nhận ý kiến đóng góp, phản ánh của Nhân dân phục vụ Ủy ban Mặt trận Tổ quốc Việt Nam xã An Thới Đông, huyện Cần Giờ, TP. Hồ Chí Minh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-stone-900 font-sans antialiased selection:bg-[#B22222] selection:text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
