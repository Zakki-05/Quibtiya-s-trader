import { prisma } from "@/lib/db";
import { Package, FileText, Users, IndianRupee, TrendingUp, Activity, CheckCircle2 } from 'lucide-react';

export default async function DashboardPage() {
    const [productCount, invoiceCount, traderCount, categoryCount] = await Promise.all([
        prisma.product.count(),
        prisma.invoice.count(),
        prisma.trader.count(),
        prisma.category.count(),
    ]);

    const stats = [
        { label: 'Total Products', value: productCount, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Invoices', value: invoiceCount, icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Verified Traders', value: traderCount, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Categories', value: categoryCount, icon: IndianRupee, color: 'text-gold', bg: 'bg-gold/5' },
    ];

    return (
        <div className="space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tight">Overview</h1>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">System live & Monitoring active</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-navy bg-white border border-gray-100 px-4 py-2 shadow-sm">
                    <Activity className="w-3.5 h-3.5 text-gold" />
                    <span>Live Stats Tracking</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 md:p-8 border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} -mr-12 -mt-12 rounded-full opacity-50 group-hover:scale-110 transition-transform`} />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-sm`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Inventory</span>
                        </div>
                        <div className="space-y-1 relative z-10">
                            <div className="text-3xl font-black text-navy group-hover:text-gold transition-colors">{stat.value}</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black flex items-center">
                                <span>{stat.label}</span>
                                <TrendingUp className="w-3 h-3 ml-2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white p-6 md:p-8 border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                        <h3 className="font-black text-navy uppercase tracking-tight flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-gold" />
                            Recent Invoices
                        </h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-navy hover:text-gold transition-colors">View All</button>
                    </div>
                    <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <FileText className="w-6 h-6 text-gray-200" />
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest italic">
                            No recent transactions recorded today.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 md:p-8 border border-gray-100 shadow-sm space-y-8">
                    <h3 className="font-black text-navy uppercase tracking-tight flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-gold" />
                        Status
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: 'Prisma DB', status: 'Optimal', icon: CheckCircle2 },
                            { name: 'Next.js API', status: 'Online', icon: CheckCircle2 },
                            { name: 'File Storage', status: 'Active', icon: CheckCircle2 },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-sm hover:bg-gold/5 transition-all group">
                                <div className="flex items-center space-x-3">
                                    <s.icon className="w-4 h-4 text-green-500" />
                                    <span className="text-[10px] font-bold text-navy uppercase tracking-widest">{s.name}</span>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-green-600 group-hover:text-gold transition-colors">{s.status}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                        <div className="bg-navy p-4 text-center">
                            <div className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-1">Backup Schedule</div>
                            <div className="text-[8px] text-white/50 uppercase tracking-widest">Next Run: 00:00 GMT</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
