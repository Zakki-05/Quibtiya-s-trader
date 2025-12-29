import { prisma } from "@/lib/db";
import { Package, FileText, Users, IndianRupee } from 'lucide-react';

export default async function DashboardPage() {
    const [productCount, invoiceCount, traderCount, categoryCount] = await Promise.all([
        prisma.product.count(),
        prisma.invoice.count(),
        prisma.trader.count(),
        prisma.category.count(),
    ]);

    const stats = [
        { label: 'Total Products', value: productCount, icon: Package, color: 'text-blue-600' },
        { label: 'Total Invoices', value: invoiceCount, icon: FileText, color: 'text-green-600' },
        { label: 'Verified Traders', value: traderCount, icon: Users, color: 'text-purple-600' },
        { label: 'Categories', value: categoryCount, icon: IndianRupee, color: 'text-gold' },
    ];

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-navy uppercase tracking-tight">Overview</h1>
                <p className="text-sm text-gray-400">Welcome to your trading control center.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 border border-gray-100 shadow-sm hover:border-gold/30 transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Updated Now</span>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-bold text-navy">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 border border-gray-100 shadow-sm space-y-6">
                    <h3 className="font-bold text-navy uppercase tracking-tight">Recent Invoices</h3>
                    <div className="py-12 text-center text-gray-400 italic text-sm border-t border-gray-50">
                        No recent invoices found.
                    </div>
                </div>
                <div className="bg-white p-8 border border-gray-100 shadow-sm space-y-6">
                    <h3 className="font-bold text-navy uppercase tracking-tight">System Status</h3>
                    <div className="space-y-4 pt-4 border-t border-gray-50">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Database</span>
                            <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Online</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Storage</span>
                            <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
