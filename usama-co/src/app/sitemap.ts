import { prisma } from '@/lib/db';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://usamaco.com';

    const products = await prisma.product.findMany({
        include: { category: true }
    });

    const productUrls = products.map((p) => ({
        url: `${baseUrl}/products/${p.category.slug}/${p.slug}`,
        lastModified: p.updatedAt,
    }));

    const categories = await prisma.category.findMany();
    const categoryUrls = categories.map((c) => ({
        url: `${baseUrl}/products/${c.slug}`,
        lastModified: new Date(),
    }));

    return [
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/about`, lastModified: new Date() },
        { url: `${baseUrl}/products`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },
        { url: `${baseUrl}/gallery`, lastModified: new Date() },
        { url: `${baseUrl}/traders`, lastModified: new Date() },
        ...categoryUrls,
        ...productUrls,
    ];
}
