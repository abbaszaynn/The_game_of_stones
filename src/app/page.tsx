
import { getCompanies, getGalleryImages } from '@/lib/data';
import CompanyCard from '@/components/company-card';
import { Camera } from 'lucide-react';
import ImageGallery from '@/components/image-gallery';
import { Button } from '@/components/ui/button';
import GlobeHeroWrapper from '@/components/globe-hero-wrapper';

export default async function Home() {
  const companies = await getCompanies();
  const galleryImages = await getGalleryImages();

  return (
    <>
      {/* 3D Globe Hero Section */}
      <section className="relative w-full h-screen -mt-14">
        <GlobeHeroWrapper companies={companies} />
      </section>

      {/* Featured Companies Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/30 px-4 py-1.5 text-sm font-medium text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Featured Companies
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Leaders in Mineral Exploration
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
      <section
        className="w-full py-16 md:py-32 lg:py-40 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://i.postimg.cc/TYNGkP6M/image-1.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-white">
              THE GAME OF STONES
            </h2>
            <p className="mx-auto max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers immersive 3D virtual tours of mine sites. Explore the terrain and infrastructure from anywhere in the world.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <ImageGallery images={galleryImages}>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                View Gallery <Camera className="ml-2 h-5 w-5" />
              </Button>
            </ImageGallery>
          </div>
        </div>
      </section>
    </>
  );
}
