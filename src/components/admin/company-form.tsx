'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface CompanyFormProps {
    companyId?: string; // Slug
}

export default function CompanyForm({ companyId }: CompanyFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    // General Fields
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [history, setHistory] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [status, setStatus] = useState('Exploratory Phase');
    const [dbId, setDbId] = useState<string | null>(null); // Real UUID

    // Related Data States
    const [media, setMedia] = useState<{ id?: string; url: string; type: 'image' | 'video'; title?: string }[]>([]);
    const [documents, setDocuments] = useState<{ id?: string; title: string; type: string; url: string }[]>([]);
    const [contacts, setContacts] = useState<{ id?: string; name: string; email: string; phone: string }[]>([]);
    const [leadership, setLeadership] = useState<{ id?: string; name: string; title: string }[]>([]);

    useEffect(() => {
        if (companyId) {
            const fetchCompany = async () => {
                setIsLoading(true);
                // Fetch Company
                const { data: company, error } = await supabase
                    .from('companies')
                    .select('*')
                    .eq('slug', companyId)
                    .single();

                if (error) {
                    console.error('Error fetching company:', error);
                    toast({ title: 'Error', description: 'Failed to fetch company.', variant: 'destructive' });
                    return;
                }

                setDbId(company.id);
                setName(company.name);
                setTagline(company.tagline || '');
                setDescription(company.description || '');
                setHistory(company.history || '');
                setLogoUrl(company.logo_url || '');
                setStatus(company.status || 'Exploratory Phase');

                // Fetch Related Data in Parallel
                const [mediaRes, docsRes, contactsRes, leadRes] = await Promise.all([
                    supabase.from('media_assets').select('*').eq('company_id', company.id),
                    supabase.from('documents').select('*').eq('company_id', company.id),
                    supabase.from('contacts').select('*').eq('company_id', company.id),
                    supabase.from('leadership').select('*').eq('company_id', company.id)
                ]);

                if (mediaRes.data) setMedia(mediaRes.data);
                if (docsRes.data) setDocuments(docsRes.data);
                if (contactsRes.data) setContacts(contactsRes.data);
                if (leadRes.data) setLeadership(leadRes.data);

                setIsLoading(false);
            };

            fetchCompany();
        }
    }, [companyId, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let currentCompanyId = dbId;

            // 1. Upsert Company
            const companyData = {
                name,
                slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
                tagline,
                description,
                history,
                logo_url: logoUrl,
                status,
            };

            if (dbId) {
                // Update
                const { error } = await supabase.from('companies').update(companyData).eq('id', dbId);
                if (error) throw error;
            } else {
                // Insert
                const { data, error } = await supabase.from('companies').insert([companyData]).select().single();
                if (error) throw error;
                currentCompanyId = data.id;
                setDbId(data.id);
            }

            if (!currentCompanyId) throw new Error('Failed to get Company ID');

            // 2. Handle Related Data using Smart Reconcile (Upsert + Delete Removed)

            const reconcile = async (table: string, items: any[]) => {
                // 1. Upsert current items
                if (items.length > 0) {
                    const { error: upsertError } = await supabase.from(table).upsert(items.map(item => ({
                        ...item,
                        company_id: currentCompanyId
                    })));
                    if (upsertError) throw upsertError;
                }

                // 2. Delete items not in current list
                const currentIds = items.map(i => i.id).filter(Boolean);
                let query = supabase.from(table).delete().eq('company_id', currentCompanyId);

                if (currentIds.length > 0) {
                    query = query.not('id', 'in', `(${currentIds.join(',')})`);
                }

                const { error: deleteError } = await query;
                if (deleteError) throw deleteError;
            };

            await reconcile('documents', documents);
            await reconcile('media_assets', media);
            await reconcile('contacts', contacts);
            await reconcile('leadership', leadership);

            toast({ title: 'Success', description: 'Company and related data saved.' });
            router.refresh();
            if (!companyId) {
                router.push('/admin/companies');
            }

        } catch (error: any) {
            console.error('Error saving:', error);
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    // Helper Functions for Arrays
    const addMedia = () => setMedia([...media, { url: '', type: 'image', title: '' }]);
    const removeMedia = (index: number) => setMedia(media.filter((_, i) => i !== index));
    const updateMedia = (index: number, field: string, value: string) => {
        const newMedia = [...media];
        newMedia[index] = { ...newMedia[index], [field]: value };
        setMedia(newMedia);
    };

    const addDocument = () => setDocuments([...documents, { title: '', type: 'Geological Report', url: '' }]);
    const removeDocument = (index: number) => setDocuments(documents.filter((_, i) => i !== index));
    const updateDocument = (index: number, field: string, value: string) => {
        const newDocs = [...documents];
        newDocs[index] = { ...newDocs[index], [field]: value };
        setDocuments(newDocs);
    };

    const addContact = () => setContacts([...contacts, { name: '', email: '', phone: '' }]);
    const removeContact = (index: number) => setContacts(contacts.filter((_, i) => i !== index));
    const updateContact = (index: number, field: string, value: string) => {
        const newContacts = [...contacts];
        newContacts[index] = { ...newContacts[index], [field]: value };
        setContacts(newContacts);
    };

    const addLeader = () => setLeadership([...leadership, { name: '', title: '' }]);
    const removeLeader = (index: number) => setLeadership(leadership.filter((_, i) => i !== index));
    const updateLeader = (index: number, field: string, value: string) => {
        const newLeaders = [...leadership];
        newLeaders[index] = { ...newLeaders[index], [field]: value };
        setLeadership(newLeaders);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/companies"><ArrowLeft className="w-4 h-4" /></Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight text-white">{companyId ? `Edit ${name}` : 'New Company'}</h1>
                </div>

                <Button onClick={handleSubmit} disabled={isLoading} className="bg-amber-500 hover:bg-amber-600 text-black">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-zinc-900 border border-white/10">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="media">Multimedia</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="contacts">Contacts</TabsTrigger>
                    <TabsTrigger value="leadership">Leadership</TabsTrigger>
                </TabsList>

                {/* --- GENERAL TAB --- */}
                <TabsContent value="general" className="space-y-6 mt-6">
                    <Card className="bg-zinc-900 border-white/10">
                        <CardHeader><CardTitle className="text-white">Company Details</CardTitle><CardDescription>Basic information about the company.</CardDescription></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2"><Label>Company Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Durr Mines" className="bg-zinc-800 border-white/10" required /></div>
                            <div className="grid gap-2"><Label>Tagline</Label><Input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Short catchphrase" className="bg-zinc-800 border-white/10" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2"><Label>Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue placeholder="Select status" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Operational">Operational</SelectItem>
                                            <SelectItem value="Exploratory Phase">Exploratory Phase</SelectItem>
                                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2"><Label>Logo URL</Label><Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="bg-zinc-800 border-white/10" /></div>
                            </div>
                            <div className="grid gap-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="bg-zinc-800 border-white/10" /></div>
                            <div className="grid gap-2"><Label>History</Label><Textarea value={history} onChange={(e) => setHistory(e.target.value)} rows={5} className="bg-zinc-800 border-white/10" /></div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- MULTIMEDIA TAB --- */}
                <TabsContent value="media" className="space-y-6 mt-6">
                    <Card className="bg-zinc-900 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div><CardTitle className="text-white">Images & Videos</CardTitle><CardDescription>Manage gallery images and video links.</CardDescription></div>
                            <Button size="sm" onClick={addMedia} variant="outline" className="text-black"><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {media.map((item, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 border border-white/5 rounded-lg bg-white/5">
                                    <div className="grid gap-4 flex-1 md:grid-cols-12">
                                        <div className="md:col-span-2">
                                            <Select value={item.type} onValueChange={(val: any) => updateMedia(index, 'type', val)}>
                                                <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                                                <SelectContent><SelectItem value="image">Image</SelectItem><SelectItem value="video">Video</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="md:col-span-6"><Input value={item.url} onChange={(e) => updateMedia(index, 'url', e.target.value)} placeholder="URL (https://...)" className="bg-zinc-800 border-white/10" /></div>
                                        <div className="md:col-span-4"><Input value={item.title || ''} onChange={(e) => updateMedia(index, 'title', e.target.value)} placeholder="Title / Caption" className="bg-zinc-800 border-white/10" /></div>
                                    </div>
                                    <Button size="icon" variant="destructive" onClick={() => removeMedia(index)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            ))}
                            {media.length === 0 && <p className="text-muted-foreground text-center py-8">No media assets added.</p>}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- DOCUMENTS TAB --- */}
                <TabsContent value="documents" className="space-y-6 mt-6">
                    <Card className="bg-zinc-900 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div><CardTitle className="text-white">Documents</CardTitle><CardDescription>Reports, Licenses, and Certificates.</CardDescription></div>
                            <Button size="sm" onClick={addDocument} variant="outline" className="text-black"><Plus className="w-4 h-4 mr-2" /> Add Document</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {documents.map((doc, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 border border-white/5 rounded-lg bg-white/5">
                                    <div className="grid gap-4 flex-1 md:grid-cols-12">
                                        <div className="md:col-span-4"><Input value={doc.title} onChange={(e) => updateDocument(index, 'title', e.target.value)} placeholder="Document Title" className="bg-zinc-800 border-white/10" /></div>
                                        <div className="md:col-span-3">
                                            <Select value={doc.type} onValueChange={(val) => updateDocument(index, 'type', val)}>
                                                <SelectTrigger className="bg-zinc-800 border-white/10"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Geological Report">Geological Report</SelectItem>
                                                    <SelectItem value="License">License</SelectItem>
                                                    <SelectItem value="Financial Summary">Financial Summary</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="md:col-span-5"><Input value={doc.url} onChange={(e) => updateDocument(index, 'url', e.target.value)} placeholder="File URL" className="bg-zinc-800 border-white/10" /></div>
                                    </div>
                                    <Button size="icon" variant="destructive" onClick={() => removeDocument(index)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            ))}
                            {documents.length === 0 && <p className="text-muted-foreground text-center py-8">No documents added.</p>}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- CONTACTS TAB --- */}
                <TabsContent value="contacts" className="space-y-6 mt-6">
                    <Card className="bg-zinc-900 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div><CardTitle className="text-white">Investor Relations</CardTitle><CardDescription>Public contacts for investors.</CardDescription></div>
                            <Button size="sm" onClick={addContact} variant="outline" className="text-black"><Plus className="w-4 h-4 mr-2" /> Add Contact</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {contacts.map((contact, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 border border-white/5 rounded-lg bg-white/5">
                                    <div className="grid gap-4 flex-1 md:grid-cols-12">
                                        <div className="md:col-span-4"><Input value={contact.name} onChange={(e) => updateContact(index, 'name', e.target.value)} placeholder="Contact Name" className="bg-zinc-800 border-white/10" /></div>
                                        <div className="md:col-span-4"><Input value={contact.email} onChange={(e) => updateContact(index, 'email', e.target.value)} placeholder="Email" className="bg-zinc-800 border-white/10" /></div>
                                        <div className="md:col-span-4"><Input value={contact.phone} onChange={(e) => updateContact(index, 'phone', e.target.value)} placeholder="Phone" className="bg-zinc-800 border-white/10" /></div>
                                    </div>
                                    <Button size="icon" variant="destructive" onClick={() => removeContact(index)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            ))}
                            {contacts.length === 0 && <p className="text-muted-foreground text-center py-8">No contacts added.</p>}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- LEADERSHIP TAB --- */}
                <TabsContent value="leadership" className="space-y-6 mt-6">
                    <Card className="bg-zinc-900 border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div><CardTitle className="text-white">Leadership Team</CardTitle><CardDescription>Key executives and directors.</CardDescription></div>
                            <Button size="sm" onClick={addLeader} variant="outline" className="text-black"><Plus className="w-4 h-4 mr-2" /> Add Leader</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {leadership.map((leader, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 border border-white/5 rounded-lg bg-white/5">
                                    <div className="grid gap-4 flex-1 md:grid-cols-2">
                                        <Input value={leader.name} onChange={(e) => updateLeader(index, 'name', e.target.value)} placeholder="Name" className="bg-zinc-800 border-white/10" />
                                        <Input value={leader.title} onChange={(e) => updateLeader(index, 'title', e.target.value)} placeholder="Job Title" className="bg-zinc-800 border-white/10" />
                                    </div>
                                    <Button size="icon" variant="destructive" onClick={() => removeLeader(index)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            ))}
                            {leadership.length === 0 && <p className="text-muted-foreground text-center py-8">No leadership team added.</p>}
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}
