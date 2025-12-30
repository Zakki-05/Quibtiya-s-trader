'use client';

import { Plus, Building2, MapPin, Trash2, Edit, Search, Filter, Users } from 'lucide-react';
import { useState } from 'react';

export function AdminTradersList({ traders }: { traders: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddTrader = () => alert("Add Trader form functionality would trigger here");
    const handleEditTrader = (id: string) => alert(`Edit Trader ${id}`);
    const handleDeleteTrader = (id: string) => {
        if (confirm("Are you sure you want to delete this trader?")) {
            alert(`Delete Trader ${id}`);
        }
    };

    const filteredTraders = traders.filter(t =>
        t.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 md:space-y-12 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-navy uppercase tracking-tight">Trader Management</h1>
                    <p className="text-sm text-gray-400">Manage your verified business partners and distributors.</p>
                </div>
                <button
                    onClick={handleAddTrader}
                    className="w-full md:w-auto bg-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gold transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Trader</span>
                </button>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search by business or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-3 text-navy/40 hover:text-navy hover:bg-gray-50 transition-all rounded-sm">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-navy border-b border-gray-100">
                                <th className="px-8 py-5">Trader / Business</th>
                                <th className="px-8 py-5">Contact</th>
                                <th className="px-8 py-5">Location</th>
                                <th className="px-8 py-5">Performance</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredTraders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                                <Users className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <div className="text-sm font-medium text-gray-400 italic">No traders match your search criteria.</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredTraders.map(trader => (
                                    <tr key={trader.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-navy text-gold p-2.5 rounded-sm shadow-sm group-hover:scale-110 transition-transform">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy uppercase leading-tight">{trader.business}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{trader.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-[10px] font-bold text-navy tracking-wider">{trader.email || 'NO EMAIL REGISTERED'}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                                                <MapPin className="w-3 h-3 text-gold" />
                                                <span>{trader.address || 'India (Pan India Supply)'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="bg-green-50 text-green-600 text-[8px] font-black uppercase px-2 py-1 tracking-widest border border-green-100 rounded-[2px]">VERIFIED PARTNER</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end items-center space-x-3">
                                                <button
                                                    onClick={() => handleEditTrader(trader.id)}
                                                    className="p-2 text-gray-300 hover:text-navy hover:bg-gray-50 transition-all rounded-sm"
                                                    title="Edit Trader"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTrader(trader.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-sm"
                                                    title="Delete Trader"
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
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Showing {filteredTraders.length} of {traders.length} Partners</span>
                    <span>Last updated: Just now</span>
                </div>
            </div>
        </div>
    );
}
