
'use client';

import { useEffect, useRef, useState, use } from 'react';
import type { Company } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Define types for the Google Maps 3D Web Components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmp-map': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'api-key'?: string;
        'map-id': string;
        center?: string;
        zoom?: string;
        tilt?: string;
        heading?: string;
        style?: React.CSSProperties;
      }, HTMLElement & { center: { lat: number; lng: number } }>;
      'gmp-advanced-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        position: string;
        title: string;
      }, HTMLElement>;
      'gmp-polygon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        paths: string;
        'stroke-color': string;
        'stroke-opacity': string;
        'stroke-weight': string;
        'fill-color': string;
        'fill-opacity': string;
      }, HTMLElement>;
    }
  }
}

interface Map3DContainerProps {
  companies: Company[];
  mapId: string;
}

export default function Map3DContainer({ companies, mapId }: Map3DContainerProps) {
    const mapRef = useRef<HTMLElement & { center: { lat: number; lng: number } }>(null);
    const [selected, setSelected] = useState<{ company: Company; location: Company['locations'][0] } | null>(null);
    const infoBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || typeof window === 'undefined' || !window.google) return;
        
        map.center = { lat: 35.6, lng: 75.0 };

        const gme = (window.google.maps as any).maps3d;
        if (!gme) {
            console.error("Google Maps 3D library not loaded.");
            return;
        }

        const polygons: any[] = [];
        const infoBoxes: any[] = [];

        companies.forEach(company => {
            company.locations.forEach(location => {
                const polygon = new gme.Polygon({
                    paths: location.polygon,
                    strokeColor: "#FFC107",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FFC107",
                    fillOpacity: 0.35,
                    altitudeMode: 'clampToGround',
                });
                polygon.setMap(map);
                polygons.push(polygon);
                
                const bounds = new window.google.maps.LatLngBounds();
                location.polygon.forEach(p => bounds.extend(p));
                const center = bounds.getCenter();

                const infoBox = new gme.InfoBox({
                    position: {lat: center.lat(), lng: center.lng(), altitude: 100},
                    content: createInfoBoxContent(company, location),
                });
                
                infoBoxes.push(infoBox);

                polygon.addListener('click', () => {
                   infoBoxes.forEach(ib => ib.setMap(null)); // Close all other infoboxes
                   infoBox.setMap(map);
                });
            });
        });
        
        map.addEventListener('click', (event: any) => {
            // Check if the click was on the map itself and not a polygon or infobox
            if (event.target === map) {
                infoBoxes.forEach(ib => ib.setMap(null));
            }
        });


        // Cleanup function
        return () => {
            polygons.forEach(p => p.setMap(null));
            infoBoxes.forEach(ib => ib.setMap(null));
        };

    }, [companies]);

    const createInfoBoxContent = (company: Company, location: Company['locations'][0]): HTMLElement => {
        const container = document.createElement('div');
        container.className = 'p-3 max-w-xs space-y-3 bg-white rounded-lg shadow-lg border';
        
        const textContainer = document.createElement('div');
        textContainer.innerHTML = `
            <h3 class="font-bold text-lg text-primary">${company.name}</h3>
            <p class="text-sm text-muted-foreground">${location.name}</p>
        `;
        container.appendChild(textContainer);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex items-center gap-2';
        
        const tourButton = document.createElement('button');
        tourButton.className = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3';
        tourButton.innerText = 'Virtual 3D Tour';
        tourButton.onclick = () => alert('3D Tour coming soon!');
        
        const companyLink = document.createElement('a');
        companyLink.className = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3';
        companyLink.href = `/companies/${company.id}`;
        companyLink.innerText = 'View Company';

        buttonContainer.appendChild(tourButton);
        buttonContainer.appendChild(companyLink);
        container.appendChild(buttonContainer);

        return container;
    };


  return (
    // @ts-ignore
    <gmp-map
        ref={mapRef}
        map-id={mapId}
        zoom="8"
        tilt="60"
        heading="45"
        style={{ width: '100%', height: '100vh' }}
    >
    </gmp-map>
  );
}
