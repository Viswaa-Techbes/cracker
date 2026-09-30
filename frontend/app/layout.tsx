import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { ToastProvider } from '@/lib/toastContext';
import { AuthProvider } from '@/lib/authContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Sparkle Crackers | Sivakasi Fireworks Direct Catalogue & Offline Orders',
  description:
    'Browse our comprehensive 2026 festive fireworks catalogue from Sivakasi. Authentic sparkles, flower pots, chakkars, aerial comet shots, and gift boxes with transparent offline payment.',
  keywords: [
    'Sivakasi crackers',
    'fireworks catalogue',
    'Diwali crackers 2026',
    'offline crackers order',
    'sparklers',
    'flower pots',
    'chakkars',
    'comet shots',
    'gift boxes',
  ],
  openGraph: {
    title: 'Sparkle Crackers Sivakasi - Direct Festive Catalogue',
    description: 'Explore all 14 categories of certified celebration fireworks.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#FAFAFA]">
        <ToastProvider>
          <CartProvider>
            <AuthProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
            </AuthProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
