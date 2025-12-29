import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-navy">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest">
              <Star className="w-3 h-3 fill-gold" />
              <span>Premium Wholesale Trading</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              LUXURY IN <br />
              <span className="text-gold">EVERY DETAIL.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              Serving retail and wholesale markets across footwear, leather goods, and premium lighting.
              Quality craftsmanship meets professional business distribution.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/products"
                className="bg-gold hover:bg-gold-dark text-navy px-8 py-4 font-bold transition-all flex items-center space-x-2"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 hover:border-gold text-white px-8 py-4 font-bold transition-all"
              >
                Get Wholesale Price
              </Link>
            </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "Certified Quality",
                desc: "Every product undergoes strict quality checks before distribution."
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                desc: "Optimized logistics chain for both retail and bulk wholesale orders."
              },
              {
                icon: Star,
                title: "Premium Support",
                desc: "Dedicated account managers for our wholesale and distributor partners."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 border border-gray-100 hover:border-gold/30 transition-all">
                <feature.icon className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4 text-navy uppercase tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Divisions Section Placeholder */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4 tracking-tight">OUR CATEGORIES</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-16">
            Multiple divisions specializing in diverse product categories to serve your business needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Footwear', 'Leather Goods', 'Ladies Dress', 'Lighting'].map((cat) => (
              <div key={cat} className="h-64 bg-white border border-gray-100 flex items-center justify-center font-bold text-navy/50 hover:text-gold transition-colors">
                {cat} Section
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
