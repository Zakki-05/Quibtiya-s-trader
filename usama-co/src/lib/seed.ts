import { prisma } from './db';

const CATEGORIES = [
    { name: "Shoes & Leather", slug: "shoes-leather", description: "Qhibtiya’s Shoes & Leather Goods" },
    { name: "Ladies Dress", slug: "ladies-dress", description: "Premium Apparel" },
    { name: "Painting", slug: "painting", description: "Painting Products" },
    { name: "Lights", slug: "lights", description: "Lighting Solutions" },
];

export async function seed() {
    for (const cat of CATEGORIES) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    const shoeCat = await prisma.category.findUnique({ where: { slug: "shoes-leather" } });

    if (shoeCat) {
        await prisma.product.upsert({
            where: { slug: "premium-leather-oxfords" },
            update: {},
            create: {
                name: "Premium Leather Oxfords",
                slug: "premium-leather-oxfords",
                description: "Handcrafted calfskin leather oxfords for men. Perfect for formal occasions.",
                price: 4500.0,
                images: "/images/shoe1.jpg",
                categoryId: shoeCat.id,
                type: "Men's Shoes",
                featured: true,
            }
        });
    }
}
