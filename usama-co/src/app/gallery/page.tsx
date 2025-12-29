export default function GalleryPage() {
    return (
        <div className="flex flex-col pb-24">
            <section className="bg-navy py-24 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold tracking-tight mb-8 uppercase">Product <span className="text-gold">Showcase.</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        A visual documentation of our craftsmanship, warehouse operations, and featured product collections.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className={`bg-gray-50 border border-gray-100 overflow-hidden relative group cursor-pointer ${i % 3 === 0 ? 'md:row-span-2' : ''}`}>
                                <div className="aspect-[4/5] flex items-center justify-center">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/10">Showcase Image {i}</span>
                                </div>
                                <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-6 text-center">
                                    <span className="text-[10px] text-gold font-bold uppercase tracking-widest mb-2">Collection</span>
                                    <span className="text-white text-xs font-bold uppercase">Division {i}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
