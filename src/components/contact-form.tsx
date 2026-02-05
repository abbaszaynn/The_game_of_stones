'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            const { error } = await supabase.from('inquiries').insert([data]);

            if (error) throw error;
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto bg-card/50 backdrop-blur-sm border-white/10 shadow-2xl">
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Contact Us</CardTitle>
                <CardDescription>
                    Have questions or investment inquiries? Send us a message directly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-in fade-in zoom-in">
                        <div className="p-3 bg-green-500/10 rounded-full border border-green-500/20">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                            <p className="text-muted-foreground mt-2">Thank you for reaching out. Our team will get back to you shortly.</p>
                        </div>
                        <Button onClick={() => setStatus('idle')} variant="outline" className="mt-4">
                            Send Another
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" placeholder="Investment Opportunity" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Type your message here..." required className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary/50" />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20">
                                <AlertCircle className="w-4 h-4" />
                                {errorMessage}
                            </div>
                        )}

                        <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}
