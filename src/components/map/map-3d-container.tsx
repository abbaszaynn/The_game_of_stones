import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Company } from '@/lib/types';

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('./leaflet-map'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">Loading Map...</div>
});

// Gold color for mines
const GOLD_COLOR = '#D4AF37';
const GOLD_GLOW = 'rgba(212, 175, 55, 0.6)';

interface Map3DContainerProps {
    companies: Company[];
}

export default function Map3DContainer({ companies }: Map3DContainerProps) {
    const [selectedMine, setSelectedMine] = useState<{ company: Company; location: Company['locations'][0] } | null>(null);

    const handleMineSelect = (company: Company, location: Company['locations'][0]) => {
        setSelectedMine({ company, location });
    };

    return (
        <div className="relative w-full h-full bg-gradient-to-b from-slate-900 to-slate-800">
            {/* Interactive Leaflet Map */}
            <div className="absolute inset-0 z-0">
                <LeafletMap
                    companies={companies}
                    selectedMine={selectedMine}
                    onMineSelect={handleMineSelect}
                />
            </div>

            {/* Custom overlay with fixed header */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none z-10" />

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
                                    onClick={() => handleMineSelect(company, location)}
                                    className={`w-full text-left p-3 rounded-lg border transition-all ${selectedMine?.location.name === location.name && selectedMine?.company.id === company.id
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
