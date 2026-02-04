'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils'; // Assumes you have a utils file with cn (clsx + tailwind-merge)

interface StarBackgroundProps {
    className?: string;
    count?: number;
}

export const StarBackground = ({ className, count = 100 }: StarBackgroundProps) => {
    const [stars, setStars] = React.useState<any[]>([]);

    React.useEffect(() => {
        const generatedStars = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: Math.random() * 3 + 2,
            animationDelay: Math.random() * 5,
        }));
        setStars(generatedStars);
    }, [count]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animationDuration: `${star.animationDuration}s`,
                        animationDelay: `${star.animationDelay}s`,
                    }}
                />
            ))}
        </div>
    );
};
