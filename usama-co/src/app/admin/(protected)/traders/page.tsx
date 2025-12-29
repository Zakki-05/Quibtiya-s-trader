import { prisma } from "@/lib/db";
import { AdminTradersList } from "@/components/AdminTradersList";

export default async function AdminTradersPage() {
    const traders = await prisma.trader.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return <AdminTradersList traders={traders} />;
}
