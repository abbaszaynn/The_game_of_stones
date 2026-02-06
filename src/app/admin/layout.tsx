'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/sidebar';
import { useUser } from '@/firebase/provider';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login'); // Redirect to login if not authenticated
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-muted-foreground animate-pulse">Loading admin...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
