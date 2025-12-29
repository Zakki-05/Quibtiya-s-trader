import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="flex flex-col">
            <section className="bg-navy py-24 text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold tracking-tight mb-8 uppercase">Get in <span className="text-gold">Touch.</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Whether you're looking for wholesale prices or specific product details, our team is
                        ready to assist your business.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        {/* Contact Form */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-navy uppercase tracking-tight">Wholesale Inquiry</h2>
                                <p className="text-gray-500">Fill out the form below and ours sales representative will contact you within 24 hours.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy">Full Name</label>
                                        <input type="text" className="w-full border-b border-gray-200 focus:border-gold outline-none py-3 text-sm transition-colors bg-transparent" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy">Business Name</label>
                                        <input type="text" className="w-full border-b border-gray-200 focus:border-gold outline-none py-3 text-sm transition-colors bg-transparent" placeholder="Acme Corp" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy">Email Address</label>
                                        <input type="email" className="w-full border-b border-gray-200 focus:border-gold outline-none py-3 text-sm transition-colors bg-transparent" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy">Phone Number</label>
                                        <input type="tel" className="w-full border-b border-gray-200 focus:border-gold outline-none py-3 text-sm transition-colors bg-transparent" placeholder="+91 00000 00000" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy">Message / Inquiry Details</label>
                                    <textarea rows={4} className="w-full border-b border-gray-200 focus:border-gold outline-none py-3 text-sm transition-colors bg-transparent resize-none" placeholder="Interested in bulk order for leather shoes..."></textarea>
                                </div>
                                <button type="submit" className="bg-navy text-white px-10 py-5 font-bold uppercase text-xs tracking-[0.2em] hover:bg-gold transition-all flex items-center space-x-3">
                                    <span>Send Message</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        {/* Office Info */}
                        <div className="space-y-16 lg:pl-24">
                            <div className="grid grid-cols-1 gap-12">
                                {[
                                    { icon: MapPin, title: "Our Office", detail: "123 Business Avenue, Leather Market, Agra, Uttar Pradesh - 282001" },
                                    { icon: Phone, title: "Phone", detail: "+91 000 000 0000 / +91 000 000 0000" },
                                    { icon: Mail, title: "Email", detail: "contact@usamaco.com / wholesale@usamaco.com" },
                                    { icon: Clock, title: "Business Hours", detail: "Monday - Saturday: 10:00 AM - 08:00 PM" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-6">
                                        <div className="bg-gray-50 p-4 rounded-full border border-gray-100">
                                            <item.icon className="w-5 h-5 text-gold" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-navy">{item.title}</h4>
                                            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="h-64 bg-gray-50 border border-gray-100 flex items-center justify-center grayscale opacity-50">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy">Interactive Map View</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
