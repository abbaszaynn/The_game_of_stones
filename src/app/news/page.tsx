import { getNews, getCompanies } from '@/lib/data';
import NewsCard from '@/components/news-card';

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
            Latest News & Updates
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stay informed with the latest announcements, industry trends, and project milestones from our network of companies.
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
