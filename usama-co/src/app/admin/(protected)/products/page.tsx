import { prisma } from "@/lib/db";
import { deleteProduct } from "@/lib/actions";
import { Plus, Trash2, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });

    const categories = await prisma.category.findMany();

    return (
        <div className="space-y-12 pb-24">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-navy uppercase tracking-tight">Product Management</h1>
                    <p className="text-sm text-gray-400">Total {products.length} products in your catalog.</p>
                </div>
                <button className="bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-gold transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                </button>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-navy">
                            <th className="px-8 py-5">Product Details</th>
                            <th className="px-8 py-5">Category</th>
                            <th className="px-8 py-5">Price</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] text-gray-300">IMG</div>
                                        <div>
                                            <div className="text-sm font-bold text-navy uppercase">{product.name}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.type || 'Standard'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gold">{product.category.name}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-light text-navy italic">₹{product.price.toLocaleString()}</span>
                                </td>
                                <td className="px-8 py-6">
                                    {product.featured ? (
                                        <span className="bg-gold/10 text-gold text-[8px] font-black uppercase px-2 py-1 tracking-widest border border-gold/20">Featured</span>
                                    ) : (
                                        <span className="text-[8px] text-gray-300 font-bold uppercase tracking-widest">Standard</span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end space-x-4">
                                        <Link href={`/products/${product.category.slug}/${product.slug}`} target="_blank" className="text-gray-300 hover:text-navy transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <button className="text-gray-300 hover:text-navy transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-gray-300 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
