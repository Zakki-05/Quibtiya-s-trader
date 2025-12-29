import { prisma } from '@/lib/db';
import { Briefcase, Building2, MapPin } from 'lucide-react';

export default async function TradersPage() {
    const traders = await prisma.trader.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="flex flex-col pb-24">
            <section className="bg-navy py-24 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold tracking-tight mb-8 uppercase">Our <span className="text-gold">Traders.</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Meet our verified trading partners and distributors who make Usama & Co a reliable global network.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    {traders.length === 0 ? (
                        <div className="py-24 text-center border border-dashed border-gray-200 bg-gray-50/50">
                            <p className="text-gray-400 font-medium italic">Our global network of traders will be listed here soon.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {traders.map(trader => (
                                <div key={trader.id} className="p-8 border border-gray-100 bg-white hover:border-gold/30 transition-all space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-navy p-3 text-gold">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-navy uppercase text-lg tracking-tight">{trader.business}</h3>
                                            <p className="text-xs text-gold font-bold uppercase tracking-widest">{trader.name}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-50">
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <MapPin className="w-4 h-4" />
                                                <span>Location</span>
                                            </div>
                                            <span className="text-navy font-medium">{trader.address || 'Global'}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <Briefcase className="w-4 h-4" />
                                                <span>Category</span>
                                            </div>
                                            <span className="text-navy font-medium">Verified Partner</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
