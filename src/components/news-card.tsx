import NextImage from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { NewsArticle } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  article: NewsArticle;
  companyName?: string;
}

export default function NewsCard({ article, companyName }: NewsCardProps) {
  return (
    <Link href={`/news/${article.id}`} className="flex h-full">
      <Card className="flex flex-col overflow-hidden w-full transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-video relative">
          <NextImage
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            data-ai-hint="news article"
          />
        </div>
        <CardHeader>

          <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
          <CardDescription>{formatDate(article.publishDate)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm font-semibold text-accent hover:text-accent/80">Read More &rarr;</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
