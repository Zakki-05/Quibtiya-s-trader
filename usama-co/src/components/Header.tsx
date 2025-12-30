'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Lock, Search, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Traders', href: '/traders' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { data: session, status } = useSession();
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
    }, [pathname]);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-2xl font-black tracking-tighter text-navy uppercase flex items-center">
                        Usama<span className="text-gold group-hover:rotate-12 transition-transform">&</span>Co
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:text-gold relative group ${pathname === item.href ? 'text-gold' : 'text-navy/60'
                                }`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full ${pathname === item.href ? 'w-full' : ''
                                }`} />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-2 text-navy/60 hover:text-gold transition-colors"
                        aria-label="Toggle Search"
                    >
                        {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                    </button>

                    {status === 'authenticated' ? (
                        <div className="hidden md:flex items-center space-x-4 border-l border-gray-100 pl-4">
                            <Link
                                href="/admin/dashboard"
                                className="text-[10px] font-black uppercase tracking-widest text-navy bg-gold/5 px-3 py-1.5 border border-gold/20 hover:bg-gold hover:text-white transition-all flex items-center space-x-2"
                            >
                                <LayoutDashboard className="w-3.5 h-3.5" />
                                <span>Dashboard</span>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="text-navy/40 hover:text-red-500 transition-colors"
                                title="Sign Out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/admin/login"
                            className="p-2 text-navy/20 hover:text-navy transition-colors"
                            title="Admin Login"
                        >
                            <Lock className="w-4 h-4" />
                        </Link>
                    )}

                    <button
                        className="md:hidden p-2 text-navy hover:text-gold transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 animate-in slide-in-from-top duration-300">
                    <div className="container mx-auto max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products, categories, or keywords..."
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none text-navy font-medium focus:ring-1 focus:ring-gold transition-all"
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed inset-0 top-20 bg-white z-40 md:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full bg-white">
                    <nav className="flex flex-col p-8 space-y-6">
                        {navigation.map((item, i) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-2xl font-bold text-navy hover:text-gold transition-colors border-b border-gray-50 pb-4"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto p-8 bg-gray-50 border-t border-gray-100">
                        {status === 'authenticated' ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-navy text-gold flex items-center justify-center rounded-full">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-navy uppercase">Admin Account</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">{session.user?.email}</div>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/dashboard"
                                    className="block w-full text-center py-4 bg-navy text-white text-xs font-black uppercase tracking-widest hover:bg-gold transition-all"
                                >
                                    Go to Dashboard
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-center py-4 text-navy text-xs font-black uppercase tracking-widest border border-gray-200 hover:text-red-600 transition-all"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/admin/login"
                                className="block w-full text-center py-4 bg-navy text-white text-xs font-black uppercase tracking-widest"
                            >
                                Secure Admin Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
