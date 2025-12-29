import { getProducts, getCategories } from '@/lib/products';
import Link from 'next/link';
import { Filter, ChevronRight } from 'lucide-react';

export default async function ProductsPage() {
    const products = await getProducts({});
    const categories = await getCategories();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-6 flex items-center">
                            <Filter className="w-3 h-3 mr-2" />
                            Categories
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/products" className="text-sm font-bold text-navy hover:text-gold transition-colors">
                                    All Products
                                </Link>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/products/${cat.slug}`}
                                        className="text-sm text-gray-500 hover:text-gold transition-colors flex justify-between items-center group"
                                    >
                                        <span>{cat.name}</span>
                                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full group-hover:bg-gold/10 transition-colors">
                                            {cat._count.products}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h1 className="text-3xl font-bold text-navy uppercase tracking-tight mb-2">Collection</h1>
                            <p className="text-sm text-gray-400">Showing all {products.length} products</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {products.map(product => (
                            <Link key={product.id} href={`/products/${product.category.slug}/${product.slug}`} className="group">
                                <div className="aspect-[4/5] bg-gray-50 border border-gray-100 mb-6 flex items-center justify-center overflow-hidden relative">
                                    <span className="text-xs tracking-widest text-navy/10 font-bold uppercase">Product Image</span>
                                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/5 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                                        {product.type || product.category.name}
                                    </div>
                                    <h3 className="font-bold text-navy uppercase text-sm tracking-tight group-hover:text-gold transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="text-lg font-light text-navy">
                                        ₹{product.price.toLocaleString()}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
