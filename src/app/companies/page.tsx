import { getCompanies } from '@/lib/data';
import CompanyCard from '@/components/company-card';

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Our Portfolio of Companies
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore detailed profiles of the mining companies in our network. Discover their history, projects, and performance.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
