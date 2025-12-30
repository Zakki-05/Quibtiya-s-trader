import { getProductBySlug } from '@/lib/products';
import Link from 'next/link';
import { ChevronRight, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.name,
        description: product.description.substring(0, 160),
        openGraph: {
            title: `${product.name} | Usama & Co`,
            description: product.description,
            images: [product.images],
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
    const { category, slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
    };

    const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the "${product.name}" (${product.slug}). Could you provide more wholesale details?`);

    return (
        <div className="flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Link href="/" className="hover:text-gold">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/products" className="hover:text-gold">Products</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/products/${category}`} className="hover:text-gold">{product.category.name}</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-navy">{product.name}</span>
                    </nav>
                </div>
            </div>

            <section className="py-12 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Product Images Placeholder */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center">
                                <span className="text-sm font-bold text-navy/10 uppercase tracking-[0.2em]">Primary Image</span>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-navy/5 uppercase">Img {i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-10">
                            <div className="space-y-4 border-b border-gray-100 pb-10">
                                <div className="text-xs font-bold uppercase tracking-widest text-gold">{product.type || product.category.name}</div>
                                <h1 className="text-4xl font-bold text-navy tracking-tight uppercase leading-none">
                                    {product.name}
                                </h1>
                                <div className="text-3xl font-light text-navy">
                                    ₹{product.price.toLocaleString()}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-gray-500 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="space-y-4 pt-6">
                                    <a
                                        href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center space-x-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 font-bold transition-all uppercase text-sm tracking-widest"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Inquire via WhatsApp</span>
                                    </a>
                                    <Link
                                        href="/contact"
                                        className="flex items-center justify-center w-full border border-navy text-navy hover:bg-navy hover:text-white py-5 font-bold transition-all uppercase text-sm tracking-widest"
                                    >
                                        Wholesale Inquiry Form
                                    </Link>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-gray-100">
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <ShieldCheck className="w-5 h-5 text-gold" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-navy">Authentic Leather</span>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <Truck className="w-5 h-5 text-gold" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-navy">Safe Shipping</span>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <RefreshCw className="w-5 h-5 text-gold" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-navy">Quality Check</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
