'use client';

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Polygon } from '@vis.gl/react-google-maps';
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
        defaultCenter={{ lat: 35.75, lng: 74.8 }}
        defaultZoom={9}
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
              strokeColor="#D4AF37"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#D4AF37"
              fillOpacity={0.35}
              onClick={() => handlePolygonClick(company, location)}
            />
          ))
        )}

        {selectedCompany && selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedCompany(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg text-primary">{selectedCompany.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedLocation.name}</p>
              <p className="text-xs my-2">{selectedCompany.tagline}</p>
              <Button asChild size="sm">
                <Link href={`/companies/${selectedCompany.id}`}>View Details</Link>
              </Button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
