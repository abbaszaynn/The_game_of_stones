'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MessageSquare, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
    const [stats, setStats] = useState({ companies: 0, inquiries: 0, unreadInquiries: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            // Get companies count
            const { count: companyCount } = await supabase
                .from('companies')
                .select('*', { count: 'exact', head: true });

            // Get inquiries count
            const { count: inquiriesCount } = await supabase
                .from('inquiries')
                .select('*', { count: 'exact', head: true });

            // Get unread inquiries count
            const { count: unreadCount } = await supabase
                .from('inquiries')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'New');

            setStats({
                companies: companyCount || 0,
                inquiries: inquiriesCount || 0,
                unreadInquiries: unreadCount || 0
            });
            setLoading(false);
        }

        fetchStats();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold font-headline text-white">Dashboard Overview</h1>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-card/30 backdrop-blur-sm border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Companies
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{loading ? '...' : stats.companies}</div>
                        <p className="text-xs text-muted-foreground">Portfolio entities</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/30 backdrop-blur-sm border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Inquiries
                        </CardTitle>
                        <MessageSquare className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{loading ? '...' : stats.inquiries}</div>
                        <p className="text-xs text-muted-foreground">All time messages</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/30 backdrop-blur-sm border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Unread Messages
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{loading ? '...' : stats.unreadInquiries}</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            { /* Placeholder for Recent Activity or Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border border-white/10 bg-card/10 backdrop-blur-sm p-6">
                    <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                            <p className="font-medium text-white">Add New Company</p>
                            <p className="text-sm text-muted-foreground">Create a new portfolio entry</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                            <p className="font-medium text-white">View Inquiries</p>
                            <p className="text-sm text-muted-foreground">Check latest messages</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
