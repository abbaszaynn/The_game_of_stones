import Image from 'next/image';
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
    <Card className="flex flex-col overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          data-ai-hint="news article"
        />
      </div>
      <CardHeader>
        {companyName && (
          <Badge variant="outline" className="w-fit mb-2">{companyName}</Badge>
        )}
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
  );
}
