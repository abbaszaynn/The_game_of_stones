
import { getCompanies } from '@/lib/data';
import { Suspense } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Map3DContainer from '@/components/map/map-3d-container';

export default async function MapPage() {
  const companies = await getCompanies();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  if (!apiKey || !mapId) {
    return (
      <div className="container mx-auto px-4 py-24 md:px-6">
         <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            The Google Maps API key or Map ID is missing. Please add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> and <code>NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID</code> to your environment variables in a <code>.env.local</code> file to enable the map feature. Until then, this page will be disabled.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
       <div className="absolute top-20 left-4 z-10 max-w-md">
        <Alert variant="destructive">
           <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Map Loading Issue?</AlertTitle>
          <AlertDescription>
            If you see a "Something went wrong" or "This page can't load Google Maps correctly" error, please ensure that billing is enabled for your Google Cloud project and that the Maps JavaScript API and Map 3D API are enabled.
          </AlertDescription>
        </Alert>
      </div>
      <Suspense fallback={<div className="bg-muted w-full h-full animate-pulse" />}>
        <Map3DContainer companies={companies} mapId={mapId} />
      </Suspense>
    </div>
  );
}
