import { prisma } from "@/lib/db";
import { AdminProductsList } from "@/components/AdminProductsList";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });

    const categories = await prisma.category.findMany();

    return <AdminProductsList products={products} categories={categories} />;
}
