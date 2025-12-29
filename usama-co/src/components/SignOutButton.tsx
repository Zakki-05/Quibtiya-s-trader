'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors w-full"
        >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
        </button>
    );
}
