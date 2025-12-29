import { prisma } from "@/lib/db";
import { AdminProductsList } from "@/components/AdminProductsList";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });

    return <AdminProductsList products={products} />;
}
