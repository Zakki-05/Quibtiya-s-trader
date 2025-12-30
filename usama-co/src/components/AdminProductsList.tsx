'use client';

import { Plus, Trash2, Edit, ExternalLink, Search, Filter, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function AdminProductsList({ products }: { products: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddProduct = () => alert("Add Product Modal would open here");
    const handleEditProduct = (id: string) => alert(`Edit Product ${id}`);
    const handleDeleteProduct = (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            alert(`Delete Product ${id}`);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 md:space-y-12 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-navy uppercase tracking-tight">Product Management</h1>
                    <p className="text-sm text-gray-400">Total {products.length} products in your catalog.</p>
                </div>
                <button
                    onClick={handleAddProduct}
                    className="w-full md:w-auto bg-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gold transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                </button>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 text-navy bg-white">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-3 text-navy/40 hover:text-navy hover:bg-gray-50 transition-all rounded-sm flex items-center space-x-2">
                            <Filter className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-navy border-b border-gray-100">
                                <th className="px-8 py-5">Product Details</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                                <ImageIcon className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <div className="text-sm font-medium text-gray-400 italic">No products found. Add your first product to get started.</div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] text-gray-300 rounded-[2px] overflow-hidden group-hover:border-gold/30 transition-all relative">
                                                    <ImageIcon className="w-4 h-4 opacity-20" />
                                                    <div className="absolute inset-0 bg-navy/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy uppercase leading-tight">{product.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">{product.type || 'Standard Inventory'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/5 px-2 py-1 border border-gold/10">{product.category.name}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-medium text-navy">₹{product.price.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            {product.featured ? (
                                                <span className="bg-navy text-gold text-[8px] font-black uppercase px-2 py-1 tracking-widest border border-gold/20 flex items-center w-fit">
                                                    <span className="w-1 h-1 bg-gold rounded-full mr-1.5 animate-pulse" />
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-[8px] text-gray-300 font-black uppercase tracking-widest">Standard</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end items-center space-x-2">
                                                <Link
                                                    href={`/products/${product.category.slug}/${product.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-300 hover:text-navy hover:bg-gray-50 transition-all rounded-sm"
                                                    title="View Public Link"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleEditProduct(product.id)}
                                                    className="p-2 text-gray-300 hover:text-navy hover:bg-gray-50 transition-all rounded-sm"
                                                    title="Edit Product"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-sm"
                                                    title="Delete Product"
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
                    <span>Showing {filteredProducts.length} Products</span>
                    <span>Admin Inventory Control</span>
                </div>
            </div>
        </div>
    );
}
