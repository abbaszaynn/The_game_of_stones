'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CompanyForm({ companyId }: { companyId?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!companyId);

    const [formData, setFormData] = useState({
        slug: '',
        name: '',
        tagline: '',
        description: '',
        history: '',
        status: 'Exploratory Phase',
        logo_url: '',
    });

    useEffect(() => {
        if (companyId) {
            const fetchCompany = async () => {
                const { data, error } = await supabase
                    .from('companies')
                    .select('*')
                    .eq('slug', companyId)
                    .single();

                if (error) {
                    console.error(error);
                    alert('Error fetching company');
                    router.push('/admin/companies');
                } else if (data) {
                    setFormData({
                        slug: data.slug,
                        name: data.name,
                        tagline: data.tagline || '',
                        description: data.description || '',
                        history: data.history || '',
                        status: data.status || 'Exploratory Phase',
                        logo_url: data.logo_url || '',
                    });
                }
                setFetching(false);
            };
            fetchCompany();
        }
    }, [companyId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (value: string) => {
        setFormData({ ...formData, status: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (companyId) {
                // Update
                const { error } = await supabase
                    .from('companies')
                    .update(formData)
                    .eq('slug', companyId);
                if (error) throw error;
            } else {
                // Create
                // Auto-generate slug if empty (simple version)
                const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const { error } = await supabase
                    .from('companies')
                    .insert([{ ...formData, slug }]);
                if (error) throw error;
            }

            router.push('/admin/companies');
            router.refresh();
        } catch (error: any) {
            alert('Error saving company: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="flex justify-center p-12 text-primary"><Loader2 className="animate-spin w-8 h-8" /></div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/companies"><ArrowLeft className="w-4 h-4" /></Link>
                </Button>
                <h1 className="text-2xl font-bold font-headline text-white">
                    {companyId ? 'Edit Company' : 'New Company'}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <Card className="bg-card/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                        <CardTitle className="text-primary">Company Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-white/5 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (ID)</Label>
                                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} placeholder="auto-generated-if-empty" disabled={!!companyId} className="bg-white/5 border-white/10" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tagline">Tagline</Label>
                            <Input id="tagline" name="tagline" value={formData.tagline} onChange={handleChange} className="bg-white/5 border-white/10" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={formData.status} onValueChange={handleStatusChange}>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Operational">Operational</SelectItem>
                                        <SelectItem value="Exploratory Phase">Exploratory Phase</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo_url">Logo URL</Label>
                                <Input id="logo_url" name="logo_url" value={formData.logo_url} onChange={handleChange} placeholder="/images/logos/..." className="bg-white/5 border-white/10" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} className="bg-white/5 border-white/10" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="history">History</Label>
                            <Textarea id="history" name="history" value={formData.history} onChange={handleChange} rows={5} className="bg-white/5 border-white/10" />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[150px]">
                                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Company
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
