import { prisma } from '@/lib/db';

export async function getProducts(searchParams: { category?: string; trader?: string; sort?: string }) {
    return await prisma.product.findMany({
        where: {
            category: searchParams.category ? { slug: searchParams.category } : undefined,
        },
        include: {
            category: true,
        },
        orderBy: searchParams.sort === 'price_asc' ? { price: 'asc' } : { createdAt: 'desc' },
    });
}

export async function getCategories() {
    return await prisma.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        }
    });
}

export async function getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
        }
    });
}
