
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://YOUR-DEPLOYED-DOMAIN.vercel.app'),

  title: 'Happiness Index',
  description:
    'Happiness Index Quiz - Discover your happiness score',

  icons: {
    icon: '/hi.png',
  },

  openGraph: {
    title: 'Happiness Index',
    description:
      'Happiness Index Quiz - Discover your happiness score',
    type: 'website',
    images: [
      {
        url: '/hi.png',
        alt: 'Happiness Index Quiz',
      },
    ],
  },

  twitter: {
    card: 'summary',
    title: 'Happiness Index',
    description:
      'Happiness Index Quiz - Discover your happiness score',
    images: ['/hi.png'],
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
