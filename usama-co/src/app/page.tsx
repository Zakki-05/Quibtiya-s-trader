import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Zap, Footprints, Briefcase, Sparkles, Lightbulb } from 'lucide-react';

export default function Home() {
  const categories = [
    {
      name: 'Footwear',
      icon: Footprints,
      desc: 'Premium leather shoes and luxury comfort.',
      color: 'gold'
    },
    {
      name: 'Leather Goods',
      icon: Briefcase,
      desc: 'Executive bags, wallets, and accessories.',
      color: 'navy'
    },
    {
      name: 'Ladies Dress',
      icon: Sparkles,
      desc: 'Boutique fashion and high-end apparel.',
      color: 'gold'
    },
    {
      name: 'Lighting',
      icon: Lightbulb,
      desc: 'Architectural and luxury lighting solutions.',
      color: 'navy'
    }
  ];

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-navy text-white pt-20">
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center space-x-2 bg-gold/10 px-4 py-2 rounded-full border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest">
              <Star className="w-3 h-3 fill-gold" />
              <span>International Trading Partner</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
              Premium <br />
              <span className="text-gold">Wholesale</span> <br />
              Excellence.
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed font-medium">
              Bridging global manufacturers with local retailers. Elite distribution in footwear, leather, and premium lifestyle goods.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <Link
                href="/products"
                className="group bg-gold hover:bg-gold-dark text-navy px-10 py-5 font-black uppercase tracking-widest transition-all flex items-center space-x-3 shadow-2xl shadow-gold/20"
              >
                <span>Elite Catalog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-white/10 hover:border-gold text-white px-10 py-5 font-black uppercase tracking-widest transition-all hover:bg-white/5"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative h-[600px] animate-in fade-in zoom-in duration-1000">
            <div className="absolute inset-0 bg-gold/10 blur-[100px] rounded-full translate-x-1/2" />
            <div className="relative z-10 h-full border-l-4 border-gold/30 pl-12 flex flex-col justify-center space-y-12">
              <div className="space-y-2">
                <p className="text-gold font-black text-6xl">20+</p>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Years of Trust</p>
              </div>
              <div className="space-y-2">
                <p className="text-white font-black text-6xl">500+</p>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Retail Partners</p>
              </div>
              <div className="space-y-2">
                <p className="text-gold font-black text-6xl">10k+</p>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Premium SKU's</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Banner */}
      <div className="bg-gold px-4 py-8 overflow-hidden">
        <div className="flex items-center justify-center space-x-12 animate-pulse">
          {['QUALITY', 'INTEGRITY', 'INNOVATION', 'RELIABILITY'].map((text) => (
            <span key={text} className="text-navy text-xs font-black tracking-[0.5em] uppercase whitespace-nowrap opacity-60">{text}</span>
          ))}
        </div>
      </div>

      {/* Feature Sections */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 shadow-2xl bg-white -mt-32 relative z-20">
            {[
              {
                icon: ShieldCheck,
                title: "Quality Verified",
                desc: "Every item passes 12-point quality check before wholesale shipment."
              },
              {
                icon: Zap,
                title: "Rapid Sourcing",
                desc: "Direct-to-manufacturer links ensure the best prices and fast supply."
              },
              {
                icon: Star,
                title: "Elite Support",
                desc: "Custom pricing models and logistics support for bulk partners."
              }
            ].map((feature, i) => (
              <div key={i} className="p-12 border-r border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <feature.icon className="w-12 h-12 text-gold mb-8" />
                <h3 className="text-2xl font-black mb-4 text-navy uppercase tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Upgrade */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-5xl font-black text-navy uppercase tracking-tighter">Vertical Divisions</h2>
            <div className="h-1.5 w-24 bg-gold mx-auto" />
            <p className="text-lg text-gray-500 font-medium">Specialized inventory across four strategic business categories designed for high-end retail markets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link key={i} href={`/products?category=${cat.name.toLowerCase().replace(' ', '-')}`} className="group relative bg-white border border-gray-100 p-10 hover:border-gold transition-all duration-500 hover:shadow-2xl">
                <div className="bg-navy p-5 inline-block mb-8 group-hover:bg-gold transition-colors duration-500">
                  <cat.icon className="w-8 h-8 text-white group-hover:text-navy transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-black text-navy uppercase mb-4 tracking-tight group-hover:text-gold transition-colors">{cat.name}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">{cat.desc}</p>
                <div className="flex items-center text-xs font-black uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <span>Explore Division</span>
                  <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="bg-navy py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 opacity-50 pattern-grid-gold" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-gold font-black text-4xl italic leading-tight max-w-4xl mx-auto">
            "Our mission is to redefine professional trading through unwavering integrity and elite craftsmanship."
          </h2>
          <p className="text-white/40 uppercase tracking-[1em] text-xs font-bold">Usama Traders Philosophy</p>
        </div>
      </section>
    </div>
  );
}
