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

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const categoryId = formData.get('categoryId') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;
    const featured = formData.get('featured') === 'on';

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await prisma.product.update({
        where: { id },
        data: {
            name,
            slug,
            description,
            price,
            categoryId,
            type,
            featured,
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

// Traders Actions
export async function createTrader(formData: FormData) {
    const name = formData.get('name') as string;
    const business = formData.get('business') as string;
    const contact = formData.get('contact') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;

    await prisma.trader.create({
        data: { name, business, contact, email, address }
    });

    revalidatePath('/admin/traders');
    revalidatePath('/traders');
}

export async function updateTrader(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const business = formData.get('business') as string;
    const contact = formData.get('contact') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;

    await prisma.trader.update({
        where: { id },
        data: { name, business, contact, email, address }
    });

    revalidatePath('/admin/traders');
    revalidatePath('/traders');
}

export async function deleteTrader(id: string) {
    await prisma.trader.delete({ where: { id } });
    revalidatePath('/admin/traders');
    revalidatePath('/traders');
}

// Invoice Actions
export async function createInvoice(data: any) {
    const invoice = await prisma.invoice.create({
        data: {
            invoiceNumber: data.invoiceNumber,
            customerName: data.customerName,
            customerAddress: data.customerAddress,
            customerContact: data.customerContact,
            placeOfSupply: data.placeOfSupply,
            totalAmount: data.totalAmount,
            gstin: data.gstin,
            status: 'PAID',
            items: {
                create: data.items.map((item: any) => ({
                    productName: item.productName,
                    hsn: item.hsn,
                    quantity: parseInt(item.quantity),
                    rate: parseFloat(item.rate),
                    amount: parseFloat(item.amount),
                    unit: item.unit || 'PRS'
                }))
            }
        }
    });

    revalidatePath('/admin/invoices');
    return invoice;
}

