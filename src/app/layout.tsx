import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TEDxMaitama - Ideas Worth Spreading",
  description: "TEDxMaitama brings together innovative thinkers and inspiring speakers in Maitama, Abuja, Nigeria. Join us for ideas worth spreading.",
  keywords: ["TEDx", "Maitama", "Abuja", "Nigeria", "ideas", "innovation", "speakers", "conference"],
  authors: [{ name: "TEDxMaitama Team" }],
  creator: "TEDxMaitama",
  publisher: "TEDxMaitama",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tedxmaitama.com"),
  openGraph: {
    title: "TEDxMaitama - Ideas Worth Spreading",
    description: "TEDxMaitama brings together innovative thinkers and inspiring speakers in Maitama, Abuja, Nigeria.",
    url: "https://tedxmaitama.com",
    siteName: "TEDxMaitama",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxMaitama - Ideas Worth Spreading",
    description: "TEDxMaitama brings together innovative thinkers and inspiring speakers in Maitama, Abuja, Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
