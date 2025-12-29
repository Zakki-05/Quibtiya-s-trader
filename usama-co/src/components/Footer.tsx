export default function Footer() {
    return (
        <footer className="bg-navy text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-6 tracking-tight uppercase">
                            Usama<span className="text-gold">&</span>Co
                        </h3>
                        <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                            Premium multi-division trading business specializing in luxury footwear, leather goods,
                            ladies' wear, and specialty lighting solutions. Serving wholesale and retail markets worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6 text-gold uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="/products" className="hover:text-gold transition-colors">Product Catalog</a></li>
                            <li><a href="/traders" className="hover:text-gold transition-colors">Our Traders</a></li>
                            <li><a href="/about" className="hover:text-gold transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-gold transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="font-bold mb-6 text-gold uppercase tracking-wider text-sm">Connect</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>Wholesale Inquiries</li>
                            <li className="text-white font-medium">+91 XXX-XXX-XXXX</li>
                            <li>support@usamaco.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:row items-center justify-between text-xs text-gray-500 uppercase tracking-widest gap-4">
                    <p>© {new Date().getFullYear()} Usama & Co. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
