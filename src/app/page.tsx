
import Image from 'next/image';
import Link from 'next/link';
import { getCompanies } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyCard from '@/components/company-card';
import { ArrowRight, Globe, Map as MapIcon } from 'lucide-react';

export default async function Home() {
  const companies = await getCompanies();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <>
      <section className="relative w-full h-screen">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Vast mining landscape"
            fill
            className="object-cover rotate-180"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-black/10" />
        <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-end text-center text-primary-foreground pb-24">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline text-accent text-shadow">
            THE GAME OF STONES
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-primary-foreground/80">
            MineSight Global provides unparalleled insights into the world's leading mining operations. Explore rich data, interactive maps, and real-time news.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/map">
                Visit the Mines <MapIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Featured Companies
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Leaders in Mineral Exploration
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the pioneers shaping the future of the mining industry. Detailed profiles, project updates, and investment opportunities.
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

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Experience the Mines, Virtually
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers immersive 3D virtual tours of mine sites. Explore the terrain and infrastructure from anywhere in the world.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
             <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/map">
                <Globe className="mr-2 h-5 w-5" /> Launch Virtual Tour
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
