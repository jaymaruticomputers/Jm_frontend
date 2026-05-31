import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "./_components/Nav";
import MobileMenu from "./_components/MobileMenu";
import Footer from "./_components/Footer";
import WhatsAppFab from "./_components/WhatsAppFab";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jmcomputer.in"),
  title: "JM COMPUTERS — Custom RTX Gaming PCs, Laptops & Repair in Pune",
  description:
    "JM COMPUTERS, Sadashiv Peth Pune — Custom RTX Gaming PC Builds, laptop sales, SSD/RAM upgrades, chip-level repair, AMC, data recovery, CCTV & networking. 18+ years experience. Mon–Sun 10 AM–8 PM.",
  verification: {
    google: "FTlsgKcvr69U8wHaBQuaojY9CyHH_tYwFEFol1MQp1g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          referrerPolicy="no-referrer"
        />
        <link rel="stylesheet" href="/css/site.css?v=20260531-5" />
      </head>
      <body>
        <Nav />
        <MobileMenu />
        {children}
        <Footer />
        <WhatsAppFab />
        <Script src="/js/products.js?v=20260531-2" strategy="afterInteractive" />
        <Script src="/js/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
