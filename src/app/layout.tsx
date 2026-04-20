import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase'; // Keeping for now to avoid breakages if still used
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://gameofstones.world'),
  title: {
    default: 'Game of Stones | Global Mining Dashboard',
    template: '%s | Game of Stones',
  },
  description: 'The Game of Stones is a global dashboard for mining companies, investors, and the public. Explore immersive 3D virtual tours, detailed company profiles, and mineral deposit data in Gilgit Baltistan.',
  keywords: ['Mining', 'Gilgit Baltistan', 'Mineral Exploration', 'Copper', 'Gold', 'Marble', 'Investment', '3D Maps', 'Game of Stones', 'GB MINES', 'Potential mines in GB', 'Top mining companies in Gilgit Baltistan', 'Gemstones Pakistan'],
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
        url: '/images/og-image.jpg',
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
  verification: {
    google: 'KmI437Kih8yGjsTFoJIShD-G1IWjIB6798XxH1OnDyE',
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
          {children}
          <Toaster />
          <SpeedInsights />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
