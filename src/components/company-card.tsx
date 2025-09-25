import Image from 'next/image';
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
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center gap-4">
        <Image
          src={company.logoUrl}
          alt={`${company.name} logo`}
          width={64}
          height={64}
          className="rounded-lg border"
          data-ai-hint="company logo"
        />
        <div>
          <CardTitle className="text-xl">{company.name}</CardTitle>
          <CardDescription>{company.tagline}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{company.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/companies/${company.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
