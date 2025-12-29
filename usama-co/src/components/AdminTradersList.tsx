'use client';

import { Plus, Building2, MapPin, Trash2, Edit } from 'lucide-react';

export function AdminTradersList({ traders }: { traders: any[] }) {
    const handleAddTrader = () => alert("Add Trader Modal would open here");
    const handleEditTrader = (id: string) => alert(`Edit Trader ${id}`);
    const handleDeleteTrader = (id: string) => {
        if (confirm("Are you sure you want to delete this trader?")) {
            alert(`Delete Trader ${id}`);
        }
    };

    return (
        <div className="space-y-12 pb-24">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-navy uppercase tracking-tight">Trader Management</h1>
                    <p className="text-sm text-gray-400">Manage your verified business partners and distributors.</p>
                </div>
                <button
                    onClick={handleAddTrader}
                    className="bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-gold transition-all"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Trader</span>
                </button>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-navy">
                            <th className="px-8 py-5">Trader / Business</th>
                            <th className="px-8 py-5">Contact</th>
                            <th className="px-8 py-5">Location</th>
                            <th className="px-8 py-5">Performance</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {traders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-12 text-center text-gray-400 italic text-sm">
                                    No traders registered yet.
                                </td>
                            </tr>
                        ) : (
                            traders.map(trader => (
                                <tr key={trader.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-gray-50 p-2 text-gold">
                                                <Building2 className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-navy uppercase">{trader.business}</div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{trader.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs font-medium text-navy">{trader.email || 'No Email'}</div>
                                    </td>
                                    <td className="px-8 py-6 text-gray-500 text-xs">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="w-3 h-3 text-gold" />
                                            <span>{trader.address || 'India'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-green-50 text-green-600 text-[8px] font-black uppercase px-2 py-1 tracking-widest border border-green-100">Active Partner</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                onClick={() => handleEditTrader(trader.id)}
                                                className="text-gray-300 hover:text-navy transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTrader(trader.id)}
                                                className="text-gray-300 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
