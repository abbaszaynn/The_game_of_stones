'use client';

import { getCompanies } from '@/lib/data';
import { useEffect, useState } from 'react';
import Map3DContainer from '@/components/map/map-3d-container';
import type { Company } from '@/lib/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive 3D Mining Map | Game of Stones',
  description: 'Explore Gilgit Baltistan\'s mineral wealth through our interactive 3D map. Visualize mine locations, geological data, and infrastructure in high fidelity.',
  keywords: ['3D Mining Map', 'Gilgit Baltistan Mineral Map', 'Virtual Tour Mines', 'Geological Data GB', 'Mining Locations Pakistan', 'Interactive Mineral Map'],
};

export default function MapPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Failed to load companies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCompanies();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, #D4AF37 0%, rgba(212, 175, 55, 0.3) 50%, transparent 80%)',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
            }}
          />
          <p className="text-white/80">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <Map3DContainer companies={companies} />
    </div>
  );
}
