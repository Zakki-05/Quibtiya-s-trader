'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, FileText, Users, LayoutDashboard, Menu, X, LogOut, ExternalLink } from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Invoices', href: '/admin/invoices', icon: FileText },
    { name: 'Traders', href: '/admin/traders', icon: Users },
];

export function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleSignOut = () => {
        signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-navy text-white flex items-center justify-between px-4 z-[60]">
                <Link href="/" className="text-lg font-bold tracking-tighter uppercase">
                    Usama<span className="text-gold">&</span>Co
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-white hover:text-gold transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-navy text-white flex flex-col z-[55] transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-8">
                    <Link href="/" className="text-2xl font-black tracking-tighter uppercase group flex items-center">
                        Usama<span className="text-gold transition-transform group-hover:rotate-12">&</span>Co
                        <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-50 transition-all" />
                    </Link>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">Admin Control</p>
                </div>

                <nav className="flex-grow px-4 space-y-1 mt-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-3 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all group rounded-sm ${isActive
                                        ? 'bg-gold text-white'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gold'}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/5 bg-navy-light/30">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-400 transition-colors w-full group"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
