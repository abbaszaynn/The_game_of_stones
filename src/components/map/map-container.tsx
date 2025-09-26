'use client';

import { useState } from 'react';
import { APIProvider, Map, InfoWindow } from '@vis.gl/react-google-maps';
import { Polygon } from '@vis.gl/react-google-maps';
import type { Company } from '@/lib/types';
import { Button } from '../ui/button';
import Link from 'next/link';

interface MapContainerProps {
  companies: Company[];
  apiKey: string;
}

export default function MapContainer({ companies, apiKey }: MapContainerProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; position: { lat: number, lng: number } } | null>(null);

  const handlePolygonClick = (company: Company, location: Company['locations'][0]) => {
    const bounds = new window.google.maps.LatLngBounds();
    location.polygon.forEach(p => bounds.extend(p));
    const center = bounds.getCenter();
    
    setSelectedCompany(company);
    setSelectedLocation({
        name: location.name,
        position: { lat: center.lat(), lng: center.lng() }
    });
  };

  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={{ lat: 35.3, lng: 75.6 }}
        defaultZoom={8}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={mapId}
        className="h-full w-full"
      >
        {companies.map((company) =>
          company.locations.map((location) => (
            <Polygon
              key={`${company.id}-${location.name}`}
              paths={location.polygon}
              strokeColor="#FFC107"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#FFC107"
              fillOpacity={0.35}
              clickable={true}
              onClick={() => handlePolygonClick(company, location)}
            />
          ))
        )}

        {selectedCompany && selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => {
              setSelectedCompany(null);
              setSelectedLocation(null);
            }}
          >
            <div className="p-2 max-w-xs space-y-3">
              <div>
                <h3 className="font-bold text-lg text-primary">{selectedCompany.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedLocation.name}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant="outline" size="sm" onClick={() => alert("3D Tour coming soon!")}>
                  Virtual 3D Tour
                </Button>
                <Button asChild size="sm">
                  <Link href={`/companies/${selectedCompany.id}`}>View Company</Link>
                </Button>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
