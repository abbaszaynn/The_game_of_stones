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
    const polygonsRef = useRef<google.maps.Polygon[]>([]);
    const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);

    useEffect(() => {
        if (!mapDivRef.current || typeof window === 'undefined' || !window.google || !window.google.maps) {
            console.warn('Google Maps API not ready yet.');
            return;
        }

        if (!window.google.maps.Map) {
            console.warn('Google Maps Map class not ready.');
            return;
        }

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

        // Clear previous polygons and info windows
        polygonsRef.current.forEach(p => p.setMap(null));
        polygonsRef.current = [];
        infoWindowsRef.current.forEach(iw => iw.close());
        infoWindowsRef.current = [];

        companies.forEach(company => {
            company.locations.forEach(location => {
                const polygon = new window.google.maps.Polygon({
                    paths: location.polygon,
                    strokeColor: "#FFC107",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FFC107",
                    fillOpacity: 0.35,
                });
                polygon.setMap(map);
                polygonsRef.current.push(polygon);
                
                const bounds = new window.google.maps.LatLngBounds();
                location.polygon.forEach(p => bounds.extend(p));
                const center = bounds.getCenter();

                const infoWindow = new window.google.maps.InfoWindow({
                    content: createInfoWindowContent(company, location),
                    position: center,
                });
                infoWindowsRef.current.push(infoWindow);

                polygon.addListener('click', () => {
                   infoWindowsRef.current.forEach(iw => iw.close());
                   infoWindow.open(map);
                });
            });
        });
        
        const mapClickListener = map.addListener('click', () => {
            infoWindowsRef.current.forEach(iw => iw.close());
        });

        return () => {
            polygonsRef.current.forEach(p => p.setMap(null));
            infoWindowsRef.current.forEach(iw => iw.close());
            if (mapClickListener) {
                window.google.maps.event.removeListener(mapClickListener);
            }
        };

    }, [companies, mapId]);

    const createInfoWindowContent = (company: Company, location: Company['locations'][0]): HTMLElement => {
        const container = document.createElement('div');
        container.className = 'p-1 max-w-xs space-y-2 bg-white';
        
        const textContainer = document.createElement('div');
        textContainer.innerHTML = `
            <h3 class="font-bold text-lg text-primary">${company.name}</h3>
            <p class="text-sm text-muted-foreground">${location.name}</p>
        `;
        container.appendChild(textContainer);

        const companyLink = document.createElement('a');
        companyLink.className = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 w-full mt-2 text-center';
        companyLink.href = `/companies/${company.id}`;
        companyLink.innerText = 'View Company';

        container.appendChild(companyLink);

        return container;
    };

  return (
    <div ref={mapDivRef} style={{ width: '100%', height: '100vh' }} />
  );
}
