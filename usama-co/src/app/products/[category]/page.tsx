import { getProducts, getCategories } from '@/lib/products';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categorySlug } = await params;
    const products = await getProducts({ category: categorySlug });
    const categories = await getCategories();
    const currentCategory = categories.find(c => c.slug === categorySlug);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">Collections</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/products" className="text-sm text-gray-400 hover:text-gold transition-colors">
                                    All Products
                                </Link>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/products/${cat.slug}`}
                                        className={`text-sm hover:text-gold transition-colors flex justify-between items-center group ${cat.slug === categorySlug ? 'font-bold text-navy' : 'text-gray-500'}`}
                                    >
                                        <span>{cat.name}</span>
                                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full">{cat._count.products}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold text-navy uppercase tracking-tight mb-2">
                            {currentCategory?.name || 'Category'}
                        </h1>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
                            {currentCategory?.description || `Explore our premium collection of ${categorySlug}.`}
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="py-24 text-center border border-dashed border-gray-200">
                            <p className="text-gray-400">No products found in this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {products.map(product => (
                                <Link key={product.id} href={`/products/${categorySlug}/${product.slug}`} className="group">
                                    <div className="aspect-[4/5] bg-gray-50 border border-gray-100 mb-6 flex items-center justify-center relative">
                                        <span className="text-xs tracking-widest text-navy/10 font-bold uppercase">Product Image</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                                            {product.type || currentCategory?.name}
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
                    )}
                </div>
            </div>
        </div>
    );
}
