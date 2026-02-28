import { getNews, getCompanies } from '@/lib/data';
import NewsCard from '@/components/news-card';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs & Insights | Game of Stones',
  description: 'Read our latest blogs and insights about the mining potential, geological discoveries, and investment opportunities in Gilgit Baltistan.',
  keywords: ['Mining Blogs', 'Gilgit Baltistan Minerals', 'Copper Mining GB', 'Sustainable Mining', 'Gemstones Pakistan', 'Mining Industry Insights'],
};

export default async function NewsPage() {
  const articles = await getNews();
  const companies = await getCompanies();

  const getCompanyName = (companyId?: string) => {
    if (!companyId) return undefined;
    return companies.find(c => c.id.includes(companyId))?.name;
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Latest Blogs & Insights
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Dive into our articles exploring the vast mineral potential of Northern Pakistan, sustainable practices, and the future of the industry.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} companyName={getCompanyName(article.companyId)} />
        ))}
      </div>
    </div>
  );
}
