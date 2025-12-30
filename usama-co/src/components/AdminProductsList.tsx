'use client';

import { Plus, Trash2, Edit, ExternalLink, Search, Filter, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions';

export function AdminProductsList({ products, categories }: { products: any[], categories: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);

    const handleAddClick = () => {
        setIsEditing(false);
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product: any) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
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
                    onClick={handleAddClick}
                    className="w-full md:w-auto bg-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gold transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                </button>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden text-navy">
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
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-navy border-b border-gray-100">
                                <th className="px-8 py-5 text-navy">Product Details</th>
                                <th className="px-8 py-5 text-navy">Category</th>
                                <th className="px-8 py-5 text-navy">Price</th>
                                <th className="px-8 py-5 text-navy">Status</th>
                                <th className="px-8 py-5 text-right text-navy">Actions</th>
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
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-navy uppercase leading-tight">{product.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">{product.type || 'Standard Inventory'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-navy">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/5 px-2 py-1 border border-gold/10">{product.category.name}</span>
                                        </td>
                                        <td className="px-8 py-6 text-navy">
                                            <span className="text-sm font-medium">₹{product.price.toLocaleString()}</span>
                                        </td>
                                        <td className="px-8 py-6 text-navy">
                                            {product.featured ? (
                                                <span className="bg-navy text-gold text-[8px] font-black uppercase px-2 py-1 tracking-widest border border-gold/20 flex items-center w-fit">
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
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleEditClick(product)}
                                                    className="p-2 text-gray-300 hover:text-navy hover:bg-gray-50 transition-all rounded-sm"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(product.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-sm"
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white max-w-2xl w-full shadow-2xl relative overflow-hidden">
                        <div className="bg-navy p-6 flex justify-between items-center">
                            <h2 className="text-white font-black uppercase tracking-widest">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form action={async (formData) => {
                            if (isEditing) {
                                await updateProduct(currentProduct.id, formData);
                            } else {
                                await createProduct(formData);
                            }
                            setIsModalOpen(false);
                        }} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-navy">Product Name</label>
                                    <input
                                        name="name"
                                        required
                                        defaultValue={currentProduct?.name}
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs text-navy"
                                        placeholder="e.g. Premium Leather Oxford"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-navy">Category</label>
                                    <select
                                        name="categoryId"
                                        required
                                        defaultValue={currentProduct?.categoryId}
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs text-navy appearance-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-navy">Price (₹)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        required
                                        defaultValue={currentProduct?.price}
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs text-navy"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-navy">Type / Badge</label>
                                    <input
                                        name="type"
                                        defaultValue={currentProduct?.type}
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs text-navy"
                                        placeholder="e.g. Men's Shoes"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    defaultValue={currentProduct?.description}
                                    rows={4}
                                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs text-navy resize-none"
                                    placeholder="Provide detailed product specifications..."
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    id="featured"
                                    defaultChecked={currentProduct?.featured}
                                    className="w-4 h-4 border-gray-300 text-gold focus:ring-gold"
                                />
                                <label htmlFor="featured" className="text-[10px] font-black uppercase tracking-widest text-navy cursor-pointer">Mark as Featured Product</label>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-navy text-white py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-xl"
                                >
                                    {isEditing ? 'Update Product Details' : 'Catalog New Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
