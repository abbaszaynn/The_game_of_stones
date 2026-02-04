'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useRouter } from 'next/navigation';
import type { Company } from '@/lib/types';

// Texture URLs (high-quality assets from standard repositories)
const EARTH_TEXTURE_MAP = 'https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/textures/planets/earth_atmos_2048.jpg';
const EARTH_SPECULAR_MAP = 'https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/textures/planets/earth_specular_2048.jpg';
const EARTH_NORMAL_MAP = 'https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/textures/planets/earth_normal_2048.jpg';
const EARTH_CLOUDS_MAP = 'https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/textures/planets/earth_clouds_1024.png';

// Gold color for mines
const GOLD_COLOR = new THREE.Color('#D4AF37');

// Helper to convert Lat/Lng to Vector3
function latLngToVector3(lat: number, lng: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
}

// Earth Component
function Earth({ companies }: { companies: Company[] }) {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
        EARTH_TEXTURE_MAP,
        EARTH_NORMAL_MAP,
        EARTH_SPECULAR_MAP,
        EARTH_CLOUDS_MAP,
    ]);

    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Auto-rotate
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (earthRef.current) {
            earthRef.current.rotation.y = elapsedTime / 20;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = elapsedTime / 15;
        }
        if (groupRef.current) {
            // Gentle floating animation
            groupRef.current.position.y = Math.sin(elapsedTime / 2) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Earth Sphere */}
            <mesh ref={earthRef} position={[0, 0, 0]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    specular={new THREE.Color(0x333333)}
                    shininess={5}
                />

                {/* Mine Markers as children of Earth so they rotate with it */}
                {companies.flatMap(company =>
                    company.locations.map((location, idx) => {
                        // Calculate center of polygon
                        const center = location.polygon.reduce(
                            (acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }),
                            { lat: 0, lng: 0 }
                        );
                        center.lat /= location.polygon.length;
                        center.lng /= location.polygon.length;

                        const position = latLngToVector3(center.lat, center.lng, 2.01); // Slightly above surface

                        return (
                            <mesh key={`${company.id}-${idx}`} position={position}>
                                <sphereGeometry args={[0.03, 16, 16]} />
                                <meshStandardMaterial
                                    color={GOLD_COLOR}
                                    emissive={GOLD_COLOR}
                                    emissiveIntensity={2}
                                    toneMapped={false}
                                />
                                {/* Glow effect */}
                                <pointLight color="#D4AF37" distance={0.5} intensity={2} />
                            </mesh>
                        );
                    })
                )}
            </mesh>

            {/* Atmosphere Glow (Custom Shader-like effect using simple geometry for performance) */}
            <mesh position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshBasicMaterial
                    color="#4DB5FF"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Clouds Layer */}
            <mesh ref={cloudsRef} position={[0, 0, 0]}>
                <sphereGeometry args={[2.02, 64, 64]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.8}
                    userData={{ alphaMap: cloudsMap }} // Use texture alpha
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

// Main Component
export default function GlobeHero({ companies }: { companies: Company[] }) {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            {/* 3D Scene */}
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} color="#ffffff" />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-10, -5, -10]} intensity={0.5} color="#4444ff" /> {/* Blue rim light */}
                <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />

                <Earth companies={companies} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.5}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10">
                <div className="pointer-events-auto mt-[20vh]">
                    {/* Gold accent line */}
                    <div
                        className="w-16 h-1 mx-auto mb-6 rounded-full"
                        style={{
                            background: '#D4AF37',
                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)'
                        }}
                    />

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline mb-4 text-white drop-shadow-lg">
                        Game of Stones
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 drop-shadow">
                        Explore the golden treasures of Gilgit Baltistan&apos;s premier mining sites in realistic 3D
                    </p>

                    <button
                        onClick={() => router.push('/map')}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                        style={{
                            background: `linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)`,
                            color: '#1a1a1a',
                            boxShadow: '0 4px 30px rgba(212, 175, 55, 0.6)',
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Explore the Mines
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
                    <div className="text-white">Loading 3D Earth...</div>
                </div>
            )}
        </div>
    );
}
