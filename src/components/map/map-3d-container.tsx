'use client';

import { useState } from 'react';
import type { Company } from '@/lib/types';

// Gold color for mines
const GOLD_COLOR = '#D4AF37';
const GOLD_GLOW = 'rgba(212, 175, 55, 0.6)';

// Gilgit Baltistan coordinates
const GILGIT_BALTISTAN = {
    lat: 35.8,
    lng: 74.5,
};

interface Map3DContainerProps {
    companies: Company[];
}

export default function Map3DContainer({ companies }: Map3DContainerProps) {
    const [selectedMine, setSelectedMine] = useState<{ company: Company; location: Company['locations'][0] } | null>(null);

    // Generate Google Maps embed URL centered on selected mine or region
    const getMapUrl = () => {
        if (selectedMine) {
            const center = selectedMine.location.polygon.reduce(
                (acc, p) => ({
                    lat: acc.lat + p.lat / selectedMine.location.polygon.length,
                    lng: acc.lng + p.lng / selectedMine.location.polygon.length,
                }),
                { lat: 0, lng: 0 }
            );
            return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1704000000000!5m2!1sen!2s`;
        }
        // Default: Gilgit Baltistan region
        return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d800000!2d${GILGIT_BALTISTAN.lng}!3d${GILGIT_BALTISTAN.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1704000000000!5m2!1sen!2s`;
    };

    return (
        <div className="relative w-full h-full bg-gradient-to-b from-slate-900 to-slate-800">
            {/* Embedded Google Map (Free, no API key required for embeds) */}
            <div className="absolute inset-0">
                <iframe
                    src={getMapUrl()}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gilgit Baltistan Mining Sites"
                />
            </div>

            {/* Custom overlay with mine markers */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none" />

            {/* Mine Sidebar */}
            <div className="absolute top-20 left-4 z-10 w-80 max-h-[calc(100vh-120px)] overflow-y-auto">
                <div className="bg-background/95 backdrop-blur-sm rounded-xl shadow-xl border p-4">
                    <h2 className="text-lg font-bold mb-4 font-headline flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full animate-pulse"
                            style={{ background: GOLD_COLOR, boxShadow: `0 0 10px ${GOLD_GLOW}` }}
                        />
                        Mining Sites - Gilgit Baltistan
                    </h2>

                    {selectedMine && (
                        <button
                            onClick={() => setSelectedMine(null)}
                            className="w-full mb-4 px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                        >
                            ← Back to Region View
                        </button>
                    )}

                    <div className="space-y-3">
                        {companies.map((company) =>
                            company.locations.map((location, idx) => (
                                <button
                                    key={`${company.id}-${idx}`}
                                    onClick={() => setSelectedMine({ company, location })}
                                    className={`w-full text-left p-3 rounded-lg border transition-all ${selectedMine?.location.name === location.name
                                            ? 'bg-accent/20 border-accent'
                                            : 'bg-card hover:bg-accent/10 border-transparent hover:border-accent/50'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                                            style={{
                                                background: `radial-gradient(circle, ${GOLD_COLOR} 0%, rgba(212, 175, 55, 0.5) 100%)`,
                                                boxShadow: `0 0 8px ${GOLD_GLOW}`,
                                            }}
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">{location.name}</p>
                                            <p className="text-xs text-muted-foreground">{company.name}</p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Selected Mine Info Card */}
            {selectedMine && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-96 max-w-[90vw]">
                    <div className="bg-background/95 backdrop-blur-sm rounded-xl shadow-xl border p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: `radial-gradient(circle, ${GOLD_COLOR} 0%, rgba(212, 175, 55, 0.3) 100%)`,
                                    boxShadow: `0 0 20px ${GOLD_GLOW}`,
                                }}
                            >
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{selectedMine.location.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedMine.company.name}</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {selectedMine.company.description}
                        </p>
                        <a
                            href={`/companies/${selectedMine.company.id}`}
                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                            View Company Details →
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
