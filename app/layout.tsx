import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { MobileNav } from "@/components/layout/MobileNav";
import { Toast } from "@/components/ui/Toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "luxury.Raw — High-End Luxury Fashion Maison",
  description:
    "Explore the architectural luxury universe of luxury.Raw. Handcrafted Italian leather goods, double-faced cashmere greatcoats, sculptural fine jewelry, and contemporary fashion monographs.",
  keywords: [
    "luxury.Raw",
    "luxury fashion maison",
    "Italian leather handbags",
    "cashmere outerwear",
    "sculptural jewelry",
    "quiet luxury fashion",
  ],
  openGraph: {
    title: "luxury.Raw — Digital Luxury Fashion Maison",
    description:
      "Monumental brutalist silhouettes crafted with pure Italian artisanal integrity.",
    url: "https://luxuryraw.com",
    siteName: "luxury.Raw Maison",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "luxury.Raw Autumn Winter 2026 Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#09090b] text-[#f4f3ef] antialiased selection:bg-[#b59a6d] selection:text-black">
        <Providers>
          <div className="min-h-screen flex flex-col justify-between">
            <div>
              <AnnouncementBar />
              <Header />
              <main className="min-h-[70vh]">{children}</main>
            </div>
            <Footer />
          </div>

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <SearchModal />
          <QuickViewModal />
          <SizeGuideModal />
          <MobileNav />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
