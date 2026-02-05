'use client';

import { useState } from 'react';
import { companies } from '@/lib/companies-data';
import { supabase } from '@/lib/supabase';

export default function DataSeeder() {
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const seedCompanies = async () => {
        setLoading(true);
        setStatus('Initializing Supabase migration...');

        try {
            for (const company of companies) {
                setStatus(`Migrating ${company.name}...`);

                // 1. Insert Company
                const { data: companyData, error: companyError } = await supabase
                    .from('companies')
                    .upsert({
                        slug: company.id, // Using the string ID as slug
                        name: company.name,
                        tagline: company.tagline,
                        description: company.description,
                        history: company.history,
                        logo_url: company.logoUrl,
                        status: company.status,
                    }, { onConflict: 'slug' })
                    .select()
                    .single();

                if (companyError) throw new Error(`Company Error: ${companyError.message}`);
                const companyId = companyData.id;

                // 2. Insert Leadership
                if (company.leadership) {
                    const leadershipData = company.leadership.map(l => ({
                        company_id: companyId,
                        name: l.name,
                        title: l.title
                    }));
                    const { error: leaderError } = await supabase.from('leadership').insert(leadershipData);
                    if (leaderError) throw new Error(`Leadership Error: ${leaderError.message}`);
                }

                // 3. Insert Locations
                if (company.locations) {
                    const locationsData = company.locations.map(l => ({
                        company_id: companyId,
                        name: l.name,
                        polygon: l.polygon, // JSONB will handle the array
                        area_size: 'N/A' // Placeholder if not in data 
                    }));
                    const { error: locError } = await supabase.from('locations').insert(locationsData);
                    if (locError) throw new Error(`Location Error: ${locError.message}`);
                }

                // 4. Insert Contacts (Investor)
                if (company.investorContacts) {
                    const contactsData = company.investorContacts.map(c => ({
                        company_id: companyId,
                        name: c.name,
                        email: c.email,
                        phone: c.phone
                    }));
                    const { error: contactError } = await supabase.from('contacts').insert(contactsData);
                    if (contactError) throw new Error(`Contact Error: ${contactError.message}`);
                }
                
                // 5. Insert Deposits
                if (company.deposits) {
                    const depositsData = company.deposits.map(d => ({
                        company_id: companyId,
                        name: d.name,
                        type: d.type,
                        details: d.details,
                        location_text: d.location
                    }));
                    const { error: depError } = await supabase.from('deposits').insert(depositsData);
                    if (depError) throw new Error(`Deposit Error: ${depError.message}`);
                }
            }

            setStatus(`✅ Successfully seeded ${companies.length} companies to Supabase!`);
        } catch (error: any) {
            console.error(error);
            setStatus(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto bg-card rounded-xl border border-primary/20 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-primary">Supabase Seeder</h2>

            <div className="space-y-4">
                <button
                    onClick={seedCompanies}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Migrating...' : 'Start Migration'}
                </button>
            </div>

            {status && (
                <div className={`mt-6 p-4 rounded-md text-sm font-medium ${status.includes('Error') ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                    {status}
                </div>
            )}
        </div>
    );
}
