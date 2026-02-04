'use client';

import { useEffect, useRef } from 'react';
import type { Company } from '@/lib/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js
// safely check if window is defined to avoid SSR errors even though this is client comp
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

interface LeafletMapProps {
    companies: Company[];
    selectedMine: { company: Company; location: Company['locations'][0] } | null;
    onMineSelect: (company: Company, location: Company['locations'][0]) => void;
}

export default function LeafletMap({ companies, selectedMine, onMineSelect }: LeafletMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const layersRef = useRef<L.LayerGroup | null>(null);

    // Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current) return;
        if (mapInstanceRef.current) return; // Already initialized

        // Create map instance
        const map = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false
        }).setView([35.8, 74.5], 8);

        // Define Base Layers
        const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });

        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 19
        });

        // Add default layer (Satellite for "Google Earth" feel as requested)
        satelliteLayer.addTo(map);

        // Add Layer Control
        const baseLayers = {
            "Satellite View": satelliteLayer,
            "Dark Mode": darkLayer
        };
        L.control.layers(baseLayers, undefined, { position: 'bottomright' }).addTo(map);

        mapInstanceRef.current = map;
        layersRef.current = L.layerGroup().addTo(map);

        // Cleanup
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                layersRef.current = null;
            }
        };
    }, []);

    // Handle Polygons Rendering
    useEffect(() => {
        if (!mapInstanceRef.current || !layersRef.current) return;

        // Clear existing layers
        layersRef.current.clearLayers();

        const goldOptions: L.PathOptions = {
            color: '#D4AF37',
            fillColor: 'transparent',
            fillOpacity: 0,
            weight: 3
        };

        companies.forEach(company => {
            company.locations.forEach(location => {
                if (!location.polygon || location.polygon.length === 0) return;

                const latLngs = location.polygon.map(p => [p.lat, p.lng] as [number, number]);

                const polygon = L.polygon(latLngs, goldOptions);

                // Add Popup with Virtual Tour Button
                const hasTour = company.virtualTourUrl && company.virtualTourUrl !== '#' && company.virtualTourUrl.length > 0;

                const popupContent = `
                    <div class="glass-popup p-3 min-w-[200px]">
                        <h3 class="font-bold text-[#D4AF37] text-lg mb-1">${location.name}</h3>
                        <p class="text-sm text-gray-800 font-medium mb-3">${company.name}</p>
                        
                        ${hasTour ? `
                            <a href="${company.virtualTourUrl}" target="_blank" rel="noopener noreferrer" 
                               class="block w-full text-center bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold py-2 px-3 rounded transition-colors mb-2">
                                🌐 Start Virtual Tour
                            </a>
                        ` : ''}
                        
                        <a href="/companies/${company.id}" 
                           class="block w-full text-center border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-medium py-1 px-3 rounded transition-colors text-sm">
                            View Company Details
                        </a>
                    </div>
                `;
                polygon.bindPopup(popupContent);

                // Add Click Handler
                polygon.on('click', () => {
                    onMineSelect(company, location);
                });

                if (layersRef.current) {
                    layersRef.current.addLayer(polygon);
                }
            });
        });

    }, [companies, onMineSelect]);

    // Handle View Updates based on Selection
    useEffect(() => {
        if (!mapInstanceRef.current || !selectedMine) {
            // Optional: Reset view if nothing selected? 
            // mapInstanceRef.current?.flyTo([35.8, 74.5], 8, { duration: 1.5 });
            return;
        }

        if (selectedMine.location.polygon.length > 0) {
            const latSum = selectedMine.location.polygon.reduce((sum, p) => sum + p.lat, 0);
            const lngSum = selectedMine.location.polygon.reduce((sum, p) => sum + p.lng, 0);
            const centerLat = latSum / selectedMine.location.polygon.length;
            const centerLng = lngSum / selectedMine.location.polygon.length;

            mapInstanceRef.current.flyTo([centerLat, centerLng], 13, { duration: 1.5 });

            // Allow time for map to move then open popup?
            // Complex with raw Leaflet, simpler to just zoom for now.
        }

    }, [selectedMine]);


    return (
        <div
            ref={mapContainerRef}
            style={{ height: '100%', width: '100%', background: '#0f172a' }}
        />
    );
}
