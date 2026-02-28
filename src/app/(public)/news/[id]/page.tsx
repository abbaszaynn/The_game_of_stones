import { getNewsById, getCompanies } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: PageProps) {
    const article = await getNewsById(params.id);
    if (!article) return { title: 'Blog Not Found' };

    return {
        title: `${article.title} | Game of Stones`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: article.publishDate,
            authors: ['Game of Stones'],
            images: [
                {
                    url: article.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [article.imageUrl],
        },
    };
}

export default async function NewsDetailPage({ params }: PageProps) {
    const article = await getNewsById(params.id);

    if (!article) {
        notFound();
    }

    const companies = await getCompanies();
    const companyName = article.companyId
        ? companies.find((c) => c.id === article.companyId)?.name
        : undefined;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        image: article.imageUrl,
        datePublished: article.publishDate,
        dateModified: article.publishDate,
        author: {
            '@type': 'Organization',
            name: 'Game of Stones',
            url: 'https://gameofstones.world',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Game of Stones',
            logo: {
                '@type': 'ImageObject',
                url: 'https://gameofstones.world/logo.png',
            },
        },
        description: article.excerpt,
    };

    return (
        <div className="container mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="max-w-4xl mx-auto">
                <div className="mb-8 text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        {companyName && (
                            <Badge variant="outline" className="text-sm px-3 py-1">
                                {companyName}
                            </Badge>
                        )}
                        <span className="text-muted-foreground text-sm">
                            {formatDate(article.publishDate)}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight">
                        {article.title}
                    </h1>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12 shadow-2xl">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    {article.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-6 leading-relaxed text-slate-300">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>
        </div>
    );
}
