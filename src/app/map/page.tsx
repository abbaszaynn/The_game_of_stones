
import { getCompanies } from '@/lib/data';
import MapContainer from '@/components/map/map-container';
import { Suspense } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default async function MapPage() {
  const companies = await getCompanies();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="container mx-auto px-4 py-24 md:px-6">
         <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            The Google Maps API key is missing. Please add it to your environment variables in a <code>.env.local</code> file to enable the map feature. Until then, this page will be disabled.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full">
       <div className="absolute top-4 left-4 z-10 max-w-md">
        <Alert variant="destructive">
           <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Map Loading Issue?</AlertTitle>
          <AlertDescription>
            If you see a "Something went wrong" or "This page can't load Google Maps correctly" error, please ensure that billing is enabled for your Google Cloud project. This is required by Google Maps Platform.
          </AlertDescription>
        </Alert>
      </div>
      <Suspense fallback={<div className="bg-muted w-full h-full animate-pulse" />}>
        <MapContainer companies={companies} apiKey={apiKey} />
      </Suspense>
    </div>
  );
}
