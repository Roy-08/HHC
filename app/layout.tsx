
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Happiness Index";

const description =
  "Happiness Index Quiz - Discover your happiness score.";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://happiness-index.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title,
  description,
  applicationName: "Happiness Index",

  icons: {
    icon: "/hi.png",
    shortcut: "/hi.png",
  },

  openGraph: {
    type: "website",
    siteName: "Happiness Index",
    locale: "en_US",
    url: "/",
    title,
    description,
    images: [
      {
        url: "/hi.png",
        alt: "Happiness Index",
      },
    ],
  },

  twitter: {
    card: "summary",
    title,
    description,
    images: ["/hi.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
