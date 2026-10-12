import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import MotionMain from "./MotionMain";
import Preloader from "./Preloader";

import NavigationProgress from "@/components/NavigationProgress";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://i-vision.studio"),
  title: {
    default: "I-VISION — Archival Eyewear & Sunglasses",
    template: "%s | I-VISION",
  },
  description: "Handcrafted optical frames and polarized sunglasses shaped for everyday clarity. Considered forms, Japanese beta-titanium, and cured bio-acetate.",
  applicationName: "I-VISION",
  authors: [{ name: "I-VISION Studio" }],
  keywords: [
    "I-VISION",
    "luxury eyewear",
    "optical frames",
    "designer sunglasses",
    "polarized sunglasses",
    "titanium glasses",
    "acetate frames",
  ],
  openGraph: {
    title: "I-VISION — Archival Eyewear & Sunglasses",
    description: "Handcrafted optical frames and polarized sunglasses shaped for everyday clarity and considered forms.",
    siteName: "I-VISION",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "I-VISION — Archival Eyewear Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I-VISION — Archival Eyewear & Sunglasses",
    description: "Handcrafted optical frames and polarized sunglasses shaped for everyday clarity and considered forms.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <NavigationProgress />
        <Preloader />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
        >
          Skip to content
        </a>
        <Header />
        <MotionMain>{children}</MotionMain>
        <Footer />
      </body>
    </html>
  );
}
