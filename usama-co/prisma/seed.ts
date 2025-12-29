import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const CATEGORIES = [
    { name: "Shoes & Leather", slug: "shoes-leather", description: "Qhibtiya’s Shoes & Leather Goods" },
    { name: "Ladies Dress", slug: "ladies-dress", description: "Premium Apparel" },
    { name: "Painting", slug: "painting", description: "Painting Products" },
    { name: "Lights", slug: "lights", description: "Lighting Solutions" },
];

async function main() {
    console.log('Start seeding...')

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@usamaco.com' },
        update: {},
        create: {
            email: 'admin@usamaco.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });
    console.log('Admin user created: admin@usamaco.com / admin123');

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
                images: "/images/placeholder.jpg",
                categoryId: shoeCat.id,
                type: "Men's Shoes",
                featured: true,
            }
        });

        await prisma.product.upsert({
            where: { slug: "leather-tote-bag" },
            update: {},
            create: {
                name: "Luxury Leather Tote",
                slug: "leather-tote-bag",
                description: "Spacious and elegant tote bag made from premium full-grain leather.",
                price: 3200.0,
                images: "/images/placeholder.jpg",
                categoryId: shoeCat.id,
                type: "Leather Goods",
                featured: true,
            }
        });
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
