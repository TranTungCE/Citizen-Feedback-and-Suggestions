import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Cổng tiếp nhận góp ý, phản ánh Phường Diên Hồng',
  description: 'Cổng tiếp nhận ý kiến đóng góp, phản ánh của Nhân dân phục vụ Ủy ban Mặt trận Tổ quốc Việt Nam Phường Diên Hồng, Thành phố Hồ Chí Minh.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
