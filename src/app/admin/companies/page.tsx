'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Company } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, Plus, Trash2, Eye } from 'lucide-react';

export default function AdminCompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCompanies = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .order('name');

        if (error) console.error('Error fetching companies:', error);
        else setCompanies(data as any as Company[]); // Casting because Supabase types might not match perfectly initially
        setLoading(false);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const deleteCompany = async (id: string) => {
        if (!confirm('Are you sure you want to delete this company? This cannot be undone.')) return;

        const { error } = await supabase.from('companies').delete().eq('slug', id);
        if (error) {
            alert('Error deleting company: ' + error.message);
        } else {
            fetchCompanies();
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline text-white">Companies</h1>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/admin/companies/new">
                        <Plus className="w-4 h-4 mr-2" /> Add Company
                    </Link>
                </Button>
            </div>

            <Card className="bg-card/30 backdrop-blur-sm border-white/10">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading companies...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="text-primary/80 pl-6">Name</TableHead>
                                    <TableHead className="text-primary/80">Status</TableHead>
                                    <TableHead className="text-primary/80">Tagline</TableHead>
                                    <TableHead className="text-right text-primary/80 pr-6">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companies.map((company) => {
                                    const slug = (company as any).slug; // Access raw slug from Supabase
                                    return (
                                        <TableRow key={company.id} className="border-white/10 hover:bg-white/5 transition-colors">
                                            <TableCell className="font-medium text-white pl-6">
                                                <div className="flex items-center gap-3">
                                                    {company.logoUrl && (
                                                        <img src={company.logoUrl} alt={company.name} className="w-8 h-8 rounded-full object-cover bg-white/10" />
                                                    )}
                                                    {company.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={company.status === 'Operational' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-blue-500/50 text-blue-400 bg-blue-500/10'}>
                                                    {company.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs truncate">
                                                {company.tagline}
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild className="hover:text-primary hover:bg-primary/10">
                                                        <Link href={`/companies/${slug || company.id}`} target="_blank">
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild className="hover:text-amber-400 hover:bg-amber-400/10">
                                                        <Link href={`/admin/companies/${slug}`}>
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => deleteCompany(slug)} className="hover:text-destructive hover:bg-destructive/10">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
