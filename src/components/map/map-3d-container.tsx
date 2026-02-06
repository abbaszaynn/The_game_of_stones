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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMineSelect = (company: Company, location: Company['locations'][0]) => {
        setSelectedMine({ company, location });
        // On mobile, close sidebar after selection to show map/details
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
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

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute top-20 left-4 z-20 md:hidden bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-white/10 text-white"
            >
                {isSidebarOpen ? (
                    <span className="flex items-center gap-2">Close List ✕</span>
                ) : (
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                        Mines List
                    </span>
                )}
            </button>

            {/* Mine Sidebar */}
            <div className={`
                absolute top-32 md:top-20 left-4 z-10 w-[calc(100vw-32px)] md:w-80 
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0 md:translate-x-0 md:opacity-100'}
                max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-120px)] overflow-y-auto
            `}>
                <div className="bg-background/95 backdrop-blur-sm rounded-xl shadow-xl border p-4">
                    <h2 className="text-lg font-bold mb-4 font-headline flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full animate-pulse"
                            style={{ background: GOLD_COLOR, boxShadow: `0 0 10px ${GOLD_GLOW}` }}
                        />
                        Mining Sites
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
                <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-10 md:w-96">
                    <div className="bg-background/95 backdrop-blur-sm rounded-xl shadow-xl border p-4 relative group">

                        {/* Close button for mobile details */}
                        <button
                            onClick={() => setSelectedMine(null)}
                            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-white md:hidden"
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-3 mb-3 pr-6 md:pr-0">
                            <div
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: `radial-gradient(circle, ${GOLD_COLOR} 0%, rgba(212, 175, 55, 0.3) 100%)`,
                                    boxShadow: `0 0 20px ${GOLD_GLOW}`,
                                }}
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-base md:text-lg truncate">{selectedMine.location.name}</h3>
                                <p className="text-xs md:text-sm text-muted-foreground truncate">{selectedMine.company.name}</p>
                            </div>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
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
