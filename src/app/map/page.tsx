import { getCompanies } from '@/lib/data';
import MapContainer from '@/components/map/map-container';
import { Suspense } from 'react';

export default async function MapPage() {
  const companies = await getCompanies();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Configuration Error</h1>
        <p className="text-muted-foreground mt-2">
          The Google Maps API key is missing. Please add it to your environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full">
      <Suspense fallback={<div className="bg-muted w-full h-full animate-pulse" />}>
        <MapContainer companies={companies} apiKey={apiKey} />
      </Suspense>
    </div>
  );
}
