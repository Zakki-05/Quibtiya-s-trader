'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid credentials. Please check your email and password.');
            } else {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('System error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-navy/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-md w-full px-4 relative z-10">
                <div className="mb-8 flex justify-center">
                    <Link href="/" className="flex items-center space-x-2 p-2 text-navy/40 hover:text-navy transition-colors text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Website</span>
                    </Link>
                </div>

                <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

                    <div className="text-center space-y-4 mb-10">
                        <div className="inline-flex items-center justify-center p-4 bg-navy text-gold shadow-lg mb-2">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-navy uppercase tracking-tighter">Admin Portal</h2>
                            <div className="flex items-center justify-center space-x-2 mt-1">
                                <div className="h-[1px] w-4 bg-gold/30" />
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Secure Verification</p>
                                <div className="h-[1px] w-4 bg-gold/30" />
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-left-2 duration-300">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy/40 mb-2 block group-focus-within:text-gold transition-colors">Email Identity</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-gold transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none outline-none focus:ring-1 focus:ring-gold/30 text-sm transition-all"
                                        placeholder="admin@usamaco.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-navy/40 mb-2 block group-focus-within:text-gold transition-colors">Access Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-gold transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none outline-none focus:ring-1 focus:ring-gold/30 text-sm transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center items-center py-5 px-4 bg-navy text-white text-xs font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-gold shadow-xl disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center space-x-3">
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <span>Authorize Entry</span>
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                        </button>
                    </form>

                    <div className="mt-12 text-center border-t border-gray-50 pt-8">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                            Authorized personnel only. <br />
                            System activity is logged and monitored.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
