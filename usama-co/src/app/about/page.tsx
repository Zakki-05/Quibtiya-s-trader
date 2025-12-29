import { ArrowRight, History, Award, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="flex flex-col pb-24">
            {/* Header */}
            <section className="bg-navy py-24 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold tracking-tight mb-8 uppercase">
                            Tradition Meets <span className="text-gold">Innovation.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Usama & Co is a multi-division trading powerhouse dedicated to bridging the gap
                            between global manufacturing excellence and local business needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-widest text-xs">
                                <History className="w-4 h-4" />
                                <span>Our Journey</span>
                            </div>
                            <h2 className="text-3xl font-bold text-navy uppercase tracking-tight">Decades of Trading Excellence</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Founded with a vision to provide premium footwear and leather goods, Usama & Co has expanded
                                into a diversified trading entity. Today, we handle multiple categories including
                                High-end Lighting, Painting Products, and Luxury Apparel.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our business model is built on trust, transparency, and a relentless commitment to quality.
                                We serve thousands of retailers and distributors, ensuring they have access to the best
                                products at competitive wholesale prices.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-64 bg-gray-50 flex items-center justify-center border border-gray-100 uppercase text-xs tracking-widest text-navy/20 font-bold">Image 1</div>
                            <div className="h-64 bg-gray-50 mt-12 flex items-center justify-center border border-gray-100 uppercase text-xs tracking-widest text-navy/20 font-bold">Image 2</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-navy text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { val: "15+", label: "Years Experience" },
                            { val: "4", label: "Product Divisions" },
                            { val: "500+", label: "Wholesale Partners" },
                            { val: "10K+", label: "Products Delivered" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <div className="text-4xl font-bold text-gold tracking-tight">{stat.val}</div>
                                <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divisions */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-navy text-center mb-16 uppercase tracking-tight">Our Business Divisions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Qhibtiya’s Shoes", desc: "Premium leather footwear for men, women, and children." },
                            { title: "Leather Goods", desc: "Handcrafted bags, belts, and wallets from genuine leather." },
                            { title: "Ladies Dress", desc: "Contemporary and traditional apparel for the modern woman." },
                            { title: "Painting Products", desc: "Professional grade painting supplies and tools." },
                            { title: "Lighting Solutions", desc: "High-end interior and exterior lighting products." }
                        ].map((div, i) => (
                            <div key={i} className="p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gold/20 transition-all group">
                                <Award className="w-8 h-8 text-gold mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-lg font-bold text-navy mb-4 uppercase">{div.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{div.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
