
import CompanyForm from '@/components/admin/company-form';

export default function EditCompanyPage({ params }: { params: { id: string } }) {
    // Decode the generic slug if necessary, but params.id is just the string
    return <CompanyForm companyId={params.id} />;
}
