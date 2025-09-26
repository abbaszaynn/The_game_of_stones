
'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import type { Company } from '@/lib/types';
import { Button } from '../ui/button';
import Link from 'next/link';

interface MapContainerProps {
  companies: Company[];
  apiKey: string;
}

// Helper to calculate the center of a polygon
const getPolygonCenter = (polygon: { lat: number; lng: number }[]) => {
  if (typeof window === 'undefined' || !window.google) {
    return { lat: 0, lng: 0 };
  }
  const bounds = new window.google.maps.LatLngBounds();
  polygon.forEach(p => bounds.extend(p));
  const center = bounds.getCenter();
  return { lat: center.lat(), lng: center.lng() };
};

const Polygons = ({ companies, onPolygonClick }: { companies: Company[], onPolygonClick: (company: Company, location: Company['locations'][0]) => void }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const allPolygons: google.maps.Polygon[] = [];

    companies.forEach(company => {
      company.locations.forEach(location => {
        const polygon = new google.maps.Polygon({
          paths: location.polygon,
          strokeColor: "#FFC107",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FFC107",
          fillOpacity: 0.35,
          map: map,
        });

        polygon.addListener('click', () => {
          onPolygonClick(company, location);
        });

        allPolygons.push(polygon);
      });
    });

    // Cleanup function to remove polygons when the component unmounts or dependencies change
    return () => {
      allPolygons.forEach(p => p.setMap(null));
    };
  }, [map, companies, onPolygonClick]);

  return null; // This component does not render anything itself
};


export default function MapContainer({ companies, apiKey }: MapContainerProps) {
  const [selected, setSelected] = useState<{ company: Company; location: Company['locations'][0] } | null>(null);

  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';
  
  const handlePolygonClick = (company: Company, location: Company['locations'][0]) => {
    setSelected({ company, location });
  };

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
        <Polygons companies={companies} onPolygonClick={handlePolygonClick} />

        {selected && (
          <InfoWindow
            position={getPolygonCenter(selected.location.polygon)}
            onCloseClick={() => setSelected(null)}
          >
            <div className="p-2 max-w-xs space-y-3">
              <div>
                <h3 className="font-bold text-lg text-primary">{selected.company.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.location.name}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant="outline" size="sm" onClick={() => alert("3D Tour coming soon!")}>
                  Virtual 3D Tour
                </Button>
                <Button asChild size="sm">
                  <Link href={`/companies/${selected.company.id}`}>View Company</Link>
                </Button>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
