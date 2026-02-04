'use client';

import { useState } from 'react';
import { companies, news } from '@/lib/data';
import { initializeFirebase } from '@/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

export default function DataSeeder() {
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const seedCompanies = async () => {
        setLoading(true);
        setStatus('Initializing Firebase...');

        try {
            const { firestore } = initializeFirebase();
            const batch = writeBatch(firestore);

            setStatus(`Preparing ${companies.length} companies...`);

            companies.forEach((company) => {
                const docRef = doc(collection(firestore, 'companies'), company.id);
                // Ensure standard object properties (remove any undefined to avoid Firestore errors)
                const cleanData = JSON.parse(JSON.stringify(company));
                batch.set(docRef, cleanData);
            });

            setStatus('Committing batch write...');
            await batch.commit();
            setStatus(`✅ Successfully seeded ${companies.length} companies to Firestore!`);
        } catch (error: any) {
            console.error(error);
            setStatus(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const seedNews = async () => {
        setLoading(true);
        setStatus('Initializing Firebase...');

        try {
            const { firestore } = initializeFirebase();
            const batch = writeBatch(firestore);

            setStatus(`Preparing ${news.length} news articles...`);

            // Since news articles in data.ts have 'id', we can use that for document ID
            news.forEach((article) => {
                const docRef = doc(collection(firestore, 'news'), article.id);
                const cleanData = JSON.parse(JSON.stringify(article));
                batch.set(docRef, cleanData);
            });

            setStatus('Committing batch write...');
            await batch.commit();
            setStatus(`✅ Successfully seeded ${news.length} news articles to Firestore!`);
        } catch (error: any) {
            console.error(error);
            setStatus(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto bg-card rounded-xl border border-primary/20 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-primary">Data Seeder</h2>

            <div className="space-y-4">
                <button
                    onClick={seedCompanies}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    Seed Companies Data
                </button>

                <button
                    onClick={seedNews}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 disabled:opacity-50 transition-colors"
                >
                    Seed News Data
                </button>
            </div>

            {status && (
                <div className={`mt-6 p-4 rounded-md text-sm font-medium ${status.includes('Error') ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                    {status}
                </div>
            )}
        </div>
    );
}
