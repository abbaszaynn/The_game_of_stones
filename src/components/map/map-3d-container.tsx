
'use client';

import { useEffect, useRef } from 'react';
import type { Company } from '@/lib/types';

interface Map3DContainerProps {
  companies: Company[];
  mapId: string;
}

export default function Map3DContainer({ companies, mapId }: Map3DContainerProps) {
    const mapDivRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const polygonsRef = useRef<any[]>([]);
    const infoBoxesRef = useRef<any[]>([]);

    useEffect(() => {
        if (!mapDivRef.current || typeof window === 'undefined' || !window.google || !window.google.maps?.maps3d) {
            console.warn('Google Maps or 3D API not ready yet.');
            return;
        }

        const gme = window.google.maps.maps3d;

        if (!mapRef.current) {
            mapRef.current = new window.google.maps.Map(mapDivRef.current, {
                mapId: mapId,
                center: { lat: 35.6, lng: 75.0 },
                zoom: 8,
                tilt: 60,
                heading: 45,
                mapTypeControl: false,
                streetViewControl: false,
            });
        }
        const map = mapRef.current;

        polygonsRef.current.forEach(p => p.setMap(null));
        polygonsRef.current = [];
        infoBoxesRef.current.forEach(ib => ib.setMap(null));
        infoBoxesRef.current = [];

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
                polygonsRef.current.push(polygon);
                
                const bounds = new window.google.maps.LatLngBounds();
                location.polygon.forEach(p => bounds.extend(p));
                const center = bounds.getCenter();

                const infoBox = new gme.InfoBox({
                    position: {lat: center.lat(), lng: center.lng(), altitude: 100},
                    content: createInfoBoxContent(company, location),
                });
                
                infoBoxesRef.current.push(infoBox);

                polygon.addListener('click', () => {
                   infoBoxesRef.current.forEach(ib => ib.setMap(null));
                   infoBox.setMap(map);
                });
            });
        });
        
        const mapClickListener = map.addListener('click', () => {
            infoBoxesRef.current.forEach(ib => ib.setMap(null));
        });

        return () => {
            polygonsRef.current.forEach(p => p.setMap(null));
            infoBoxesRef.current.forEach(ib => ib.setMap(null));
            window.google.maps.event.removeListener(mapClickListener);
        };

    }, [companies, mapId]);

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
    <div ref={mapDivRef} style={{ width: '100%', height: '100vh' }} />
  );
}
