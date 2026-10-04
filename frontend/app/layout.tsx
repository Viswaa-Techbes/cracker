import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { ToastProvider } from '@/lib/toastContext';
import { AuthProvider } from '@/lib/authContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Sri Sai Traders | Dealers in All Types of Crackers Wholesale & Retail',
  description:
    'Official Diwali 2026 fireworks catalogue from Sri Sai Traders Sivakasi. 140 products across 15 categories: Sparkles, Flower Pots, Chakkars, Comets, Rockets, and Gift Boxes with direct WhatsApp order enquiries.',
  keywords: [
    'Sri Sai Traders',
    'Sivakasi crackers wholesale',
    'crackers catalogue 2026',
    'Diwali crackers price list',
    'crackers WhatsApp enquiry',
    'Standard fireworks',
    'sparklers',
    'flower pots',
    'chakkars',
    'gift boxes',
  ],
  openGraph: {
    title: 'Sri Sai Traders - Fireworks Wholesale & Retail Catalogue',
    description: 'Explore 140 Sivakasi cracker products with direct WhatsApp enquiry.',
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
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#F8FAFC]">
        <ToastProvider>
          <CartProvider>
            <AuthProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <FloatingWhatsApp />
              <Footer />
            </AuthProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
