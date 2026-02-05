

import { getCompanies, getGalleryImages } from '@/lib/data';

export const dynamic = 'force-dynamic';
import CompanyCard from '@/components/company-card';
import { Camera } from 'lucide-react';
import NextImage from 'next/image';
import ImageGallery from '@/components/image-gallery';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GlobeHeroWrapper from '@/components/globe-hero-wrapper';
import { StarBackground } from '@/components/ui/star-background';
import JsonLd from '@/components/seo/json-ld';

export default async function Home() {
  const companies = await getCompanies();
  const galleryImages = await getGalleryImages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Game of Stones',
    url: 'https://gameofstones.world',
    logo: 'https://gameofstones.world/logo.png',
    description: 'A global dashboard for mining companies, investors, and the public.',
    sameAs: [
      'https://twitter.com/gameofstones',
      'https://linkedin.com/company/gameofstones'
    ]
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* 3D Globe Hero Section */}
      <section className="relative w-full h-screen">
        <GlobeHeroWrapper companies={companies} />
      </section>

      {/* Featured Companies Section */}
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
        {/* Starfield Background */}
        <div className="absolute inset-0 bg-black">
          <StarBackground className="opacity-100" count={200} />
          {/* Subtle Blue Gradient Overlay for seamless transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">

              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Leaders in Mineral Exploration
              </h1>
              <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the pioneers shaping the future of the mining industry in Gilgit Baltistan.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
            {companies.slice(0, 3).map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative w-full py-20 lg:py-32 bg-black overflow-hidden">

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          {/* Framed Image Container */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(212,175,55,0.15)] mx-auto max-w-6xl group">

            {/* Background Image */}
            <div className="absolute inset-0">
              <NextImage
                src="https://i.postimg.cc/TYNGkP6M/image-1.png"
                alt="Mining exploration site gallery background"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority={false}
              />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />


            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center md:px-12 md:py-32">
              <div className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-2xl">
                <Camera className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              </div>

              <h2 className="text-4xl font-bold tracking-tighter md:text-6xl font-headline text-white mb-6 drop-shadow-2xl">
                THE GAME OF STONES
              </h2>

              <p className="mx-auto max-w-2xl text-lg text-zinc-200 md:text-xl leading-relaxed mb-10 drop-shadow-lg">
                Our platform offers immersive 3D virtual tours of mine sites. Explore the terrain and infrastructure from anywhere in the world.
              </p>

              <div className="w-full max-w-md">
                <ImageGallery images={galleryImages}>
                  <Button size="lg" className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105 rounded-full border border-white/20">
                    View Gallery <Camera className="ml-2 h-5 w-5" />
                  </Button>
                </ImageGallery>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
