'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const categoryId = formData.get('categoryId') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;
    const featured = formData.get('featured') === 'on';

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await prisma.product.create({
        data: {
            name,
            slug,
            description,
            price,
            categoryId,
            type,
            featured,
            images: '/images/placeholder.jpg', // Default for now
        }
    });

    revalidatePath('/admin/products');
    revalidatePath('/products');
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    revalidatePath('/products');
}
