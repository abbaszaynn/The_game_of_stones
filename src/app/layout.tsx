import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://gameofstones.world'),
  title: {
    default: 'Game of Stones | Global Mining Dashboard',
    template: '%s | Game of Stones',
  },
  description: 'A global dashboard for mining companies, investors, and the public. Explore 3D virtual tours, detailed company profiles, and mineral deposit data.',
  keywords: ['Mining', 'Gilgit Baltistan', 'Mineral Exploration', 'Copper', 'Gold', 'Marble', 'Investment', '3D Maps'],
  authors: [{ name: 'Game of Stones' }],
  creator: 'Game of Stones',
  publisher: 'Game of Stones',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gameofstones.world',
    title: 'Game of Stones | Global Mining Dashboard',
    description: 'Explore the future of mining in Gilgit Baltistan with our immersive 3D dashboard.',
    siteName: 'Game of Stones',
    images: [
      {
        url: '/images/og-image.jpg', // Ensure this image exists in public folder or remove if not ready
        width: 1200,
        height: 630,
        alt: 'Game of Stones Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game of Stones | Global Mining Dashboard',
    description: 'Explore the future of mining in Gilgit Baltistan with our immersive 3D dashboard.',
    // images: ['/images/twitter-image.jpg'], // Add when available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <FirebaseClientProvider>
          <Header />
          <main className='-mt-14'>{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
