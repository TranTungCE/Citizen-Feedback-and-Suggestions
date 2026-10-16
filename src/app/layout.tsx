import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased selection:bg-[#8B0000] selection:text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
