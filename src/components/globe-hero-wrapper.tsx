'use client';

import dynamic from 'next/dynamic';
import type { Company } from '@/lib/types';

import { Suspense } from 'react';

// Dynamically import GlobeHero to avoid SSR issues
const GlobeHero = dynamic(() => import('./globe-hero'), {
    ssr: false,
});

const LoadingFallback = () => (
    <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-center">
            <div
                className="w-20 h-20 mx-auto mb-4 rounded-full animate-pulse"
                style={{
                    background: 'radial-gradient(circle, #D4AF37 0%, rgba(212, 175, 55, 0.3) 50%, transparent 80%)',
                    boxShadow: '0 0 60px rgba(212, 175, 55, 0.6)',
                }}
            />
            <p className="text-white/80">Loading 3D Earth...</p>
        </div>
    </div>
);

interface GlobeHeroWrapperProps {
    companies: Company[];
}

export default function GlobeHeroWrapper({ companies }: GlobeHeroWrapperProps) {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <GlobeHero companies={companies} />
        </Suspense>
    );
}
