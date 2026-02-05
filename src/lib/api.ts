
import { supabase } from './supabase';
import type { Company, Location, Leadership, Deposit, InvestorContact, GalleryImage, Video } from './types';

// Helper to map Supabase results to our app's types
const mapCompanyData = (data: any): Company => {
    return {
        id: data.slug, // We use slug as the ID in the app
        name: data.name,
        tagline: data.tagline,
        description: data.description,
        history: data.history,
        logoUrl: data.logo_url,
        status: data.status,
        leadership: data.leadership?.map((l: any) => ({ name: l.name, title: l.title })) || [],
        projects: [], // Projects are currently inferred or hardcoded, or we could add a table. For now empty or we map from locations name?
        // In data.ts projects were hardcoded strings. We might need a projects table or just map locations. 
        // The schema didn't have a 'projects' table, but 'locations' have names. 
        // Let's assume projects ~ locations for now or leave empty if not critical. 
        // Actually, in the seeder, I didn't seed 'projects' specifically as a table.
        // Let's use locations names as projects for now to populate the UI.
        locations: data.locations?.map((l: any) => ({
            name: l.name,
            polygon: l.polygon, // JSONB array
        })) || [],
        deposits: data.deposits?.map((d: any) => ({
            name: d.name,
            location: d.location_text,
            type: d.type,
            details: d.details, // JSONB array
        })) || [],
        investorContacts: data.contacts?.map((c: any) => ({
            name: c.name,
            email: c.email,
            phone: c.phone,
        })) || [],
        images: data.media_assets?.filter((m: any) => m.type === 'image').map((m: any) => ({
            id: m.id,
            url: m.url,
            alt: m.title || m.description || 'Company Image',
            companyName: data.name, // Added this field to match GalleryImage type
        })) || [],
        videos: data.media_assets?.filter((m: any) => m.type === 'video').map((m: any) => ({
            id: m.id,
            url: m.url,
            title: m.title,
        })) || [],
        virtualTourUrl: '#', // Placeholder
        documents: [], // We need a documents table if we want dynamic docs, for now returning empty or we could add a table.
    };
};

export async function getCompanies(): Promise<Company[]> {
    const { data, error } = await supabase
        .from('companies')
        .select(`
      *,
      leadership(*),
      locations(*),
      deposits(*),
      contacts(*),
      media_assets(*)
    `);

    if (error) {
        console.error('Error fetching companies:', error);
        return [];
    }

    return data.map(mapCompanyData);
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
    const { data, error } = await supabase
        .from('companies')
        .select(`
      *,
      leadership(*),
      locations(*),
      deposits(*),
      contacts(*),
      media_assets(*)
    `)
        .eq('slug', id)
        .single();

    if (error) {
        console.error(`Error fetching company ${id}:`, error);
        return undefined;
    }

    return mapCompanyData(data);
}
