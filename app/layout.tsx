
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://happiness-index.vercel.app'),

  title: 'Happiness Index',
  description: 'Happiness Index Quiz - Discover your happiness score',

  icons: {
    icon: '/logo.png',
  },

  openGraph: {
    title: 'Happiness Index',
    description: 'Happiness Index Quiz - Discover your happiness score',
    url: 'https://happiness-index.vercel.app/',
    siteName: 'Happiness Index',
    type: 'website',
    images: [
      {
        url: 'https://happiness-index.vercel.app/hi.png',
        width: 1200,
        height: 630,
        alt: 'Happiness Index Quiz',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Happiness Index',
    description: 'Happiness Index Quiz - Discover your happiness score',
    images: ['https://happiness-index.vercel.app/hi.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
