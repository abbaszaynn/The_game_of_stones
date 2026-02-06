import type { Metadata } from 'next';
import MapClient from './map-client';

export const metadata: Metadata = {
  title: 'Interactive 3D Mining Map | Game of Stones',
  description: 'Explore Gilgit Baltistan\'s mineral wealth through our interactive 3D map. Visualize mine locations, geological data, and infrastructure in high fidelity.',
  keywords: ['3D Mining Map', 'Gilgit Baltistan Mineral Map', 'Virtual Tour Mines', 'Geological Data GB', 'Mining Locations Pakistan', 'Interactive Mineral Map'],
};

export default function MapPage() {
  return <MapClient />;
}

