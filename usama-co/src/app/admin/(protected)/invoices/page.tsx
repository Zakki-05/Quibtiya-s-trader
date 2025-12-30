import { prisma } from "@/lib/db";
import AdminInvoicesClient from "@/components/AdminInvoicesClient";

export default async function AdminInvoicesPage() {
    const invoices = await prisma.invoice.findMany({
        include: { items: true },
        orderBy: { date: 'desc' }
    });

    return <AdminInvoicesClient initialInvoices={invoices} />;
}
