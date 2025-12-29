import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { Package, FileText, Users, LayoutDashboard, LogOut } from 'lucide-react';

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin/login");
    }

    const navItems = [
        { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Invoices', href: '/admin/invoices', icon: FileText },
        { name: 'Traders', href: '/admin/traders', icon: Users },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-navy text-white flex flex-col fixed inset-y-0">
                <div className="p-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
                        Usama<span className="text-gold">&</span>Co
                    </Link>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">Admin Panel</p>
                </div>

                <nav className="flex-grow px-4 space-y-2 mt-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 text-sm font-medium hover:bg-white/5 hover:text-gold transition-all group rounded-lg"
                        >
                            <item.icon className="w-4 h-4 text-gray-400 group-hover:text-gold" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors w-full">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-12">
                {children}
            </main>
        </div>
    );
}
