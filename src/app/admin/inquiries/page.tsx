'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Inquiry } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Mail, CheckCircle, Archive, Trash2 } from 'lucide-react';

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const fetchInquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching inquiries:', error);
        else setInquiries(data as Inquiry[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('inquiries')
            .update({ status })
            .eq('id', id);

        if (!error) {
            if (selectedInquiry?.id === id) {
                setSelectedInquiry({ ...selectedInquiry, status } as any);
            }
            fetchInquiries();
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'New': return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">New</Badge>;
            case 'Read': return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Read</Badge>;
            case 'Replied': return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Replied</Badge>;
            case 'Archived': return <Badge variant="secondary" className="bg-white/10 text-muted-foreground">Archived</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline text-white">Inquiries</h1>
            </div>

            <Card className="bg-card/30 backdrop-blur-sm border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">Loading inquiries...</div>
                    ) : inquiries.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No recent inquiries.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="text-primary/80">Status</TableHead>
                                    <TableHead className="text-primary/80">Date</TableHead>
                                    <TableHead className="text-primary/80">From</TableHead>
                                    <TableHead className="text-primary/80">Subject</TableHead>
                                    <TableHead className="text-right text-primary/80">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.map((inquiry) => (
                                    <TableRow key={inquiry.id} className="border-white/10 hover:bg-white/5 transition-colors">
                                        <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-white">{inquiry.name}</div>
                                            <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                                        </TableCell>
                                        <TableCell className="text-white max-w-xs truncate">{inquiry.subject}</TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" onClick={() => {
                                                        setSelectedInquiry(inquiry);
                                                        if (inquiry.status === 'New') updateStatus(inquiry.id, 'Read');
                                                    }}>
                                                        View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl bg-[#0a0a0a] border-white/10 text-white">
                                                    {selectedInquiry && (
                                                        <>
                                                            <DialogHeader>
                                                                <DialogTitle className="text-2xl font-headline">{selectedInquiry.subject}</DialogTitle>
                                                                <DialogDescription>
                                                                    From: {selectedInquiry.name} ({selectedInquiry.email}) on {format(new Date(selectedInquiry.created_at), 'PPP p')}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="mt-4 p-6 rounded-lg bg-white/5 border border-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap">
                                                                {selectedInquiry.message}
                                                            </div>
                                                            <div className="mt-6 flex justify-end gap-3">
                                                                <Button variant="outline" onClick={() => updateStatus(selectedInquiry.id, 'Archived')} className="border-white/10 hover:bg-white/5 hover:text-white">
                                                                    <Archive className="w-4 h-4 mr-2" /> Archive
                                                                </Button>
                                                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                                                                    <a href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`} onClick={() => updateStatus(selectedInquiry.id, 'Replied')}>
                                                                        <Mail className="w-4 h-4 mr-2" /> Reply via Email
                                                                    </a>
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
