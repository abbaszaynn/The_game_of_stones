import { MetadataRoute } from 'next';
import { getNews } from '@/lib/data';

// Determine the base URL dynamically or fallback to localhost
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://gameofstones.world';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static Routes
    const staticRoutes = [
        '',
        '/news',
        '/companies',
        '/interactive-map',
        '/contact', // assuming a contact route based on previous context
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Blog Routes
    const newsBase = await getNews();
    const blogRoutes = newsBase.map((post) => ({
        url: `${baseUrl}/news/${post.id}`,
        lastModified: new Date(post.publishDate).toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
}
