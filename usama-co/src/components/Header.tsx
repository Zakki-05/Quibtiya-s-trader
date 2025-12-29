import Link from 'next/link';
import { Lock, Search, Menu } from 'lucide-react';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Traders', href: '/traders' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold tracking-tighter text-navy uppercase">
                        Usama<span className="text-gold">&</span>Co
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-navy/70 hover:text-gold transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-navy/70 hover:text-gold transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link
                        href="/admin/login"
                        className="p-2 text-navy/30 hover:text-navy transition-colors"
                        title="Admin Login"
                    >
                        <Lock className="w-4 h-4" />
                    </Link>

                    <button className="md:hidden p-2 text-navy">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
