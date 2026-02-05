import NextImage from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Company } from '@/lib/types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] group">
      <CardHeader className="flex-row items-center gap-4 pb-2">
        <div className="relative">
          <NextImage
            src={company.logoUrl}
            alt={`${company.name} logo`}
            width={64}
            height={64}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg border border-primary/20 group-hover:border-primary/50 transition-colors bg-black/50 p-1"
          />
          <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <CardTitle className="text-xl font-headline text-white group-hover:text-primary transition-colors">{company.name}</CardTitle>
          <CardDescription className="text-primary/80">{company.tagline}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{company.description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 transition-all duration-300">
          <Link href={`/companies/${company.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
