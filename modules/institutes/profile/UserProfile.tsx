'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/core/store/auth.store';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useRouter } from 'next/navigation';
import { LoginDialog } from '@/core/components/auth/LoginDialog';
import { CommonDialog } from '@/core/components/common';

// New Components
import { EnrollmentSection } from './components/EnrollmentSection';
import { useProfile } from './hooks/useProfile';
import { Skeleton } from '@/core/components/ui/skeleton';

export const UserProfile: React.FC = () => {
    const { user, logout } = useAuthStore();
    const { profile, isLoading, error, refetch } = useProfile();
    const router = useRouter();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-white">
                <CommonDialog
                    isOpen={true}
                    onClose={() => {}}
                    title="Profile Access"
                    description="Sign in to view your academic journey."
                    icon={<User size={32} className="text-white" />}
                >
                    <div className="space-y-4">
                        <Button
                            onClick={() => setIsLoginOpen(true)}
                            className="w-full bg-slate-900 hover:bg-black text-white rounded-xl py-6 font-bold shadow-none"
                        >
                            Sign In
                        </Button>
                    </div>
                </CommonDialog>

                <LoginDialog
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                />
            </div>
        );
    }

    if (isLoading && !profile) {
        return (
            <main className="min-h-screen bg-white">
                {/* Header Skeleton */}
                <section className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-64 bg-slate-50 rounded-lg animate-pulse" />
                                <Skeleton className="h-6 w-48 bg-slate-50/50 rounded-lg animate-pulse" />
                            </div>
                            <Skeleton className="h-10 w-28 bg-slate-50/50 rounded-xl animate-pulse" />
                        </div>
                    </div>
                </section>

                {/* Content Skeleton */}
                <section className="pb-32">
                    <div className="max-w-4xl mx-auto px-8">
                        <div className="pt-12 border-t border-slate-50 space-y-8">
                            <Skeleton className="h-4 w-32 bg-slate-50/50 rounded-full animate-pulse" />
                            <div className="grid gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="border border-slate-50 p-6 rounded-2xl space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                <Skeleton className="w-12 h-12 rounded-xl bg-slate-50 animate-pulse" />
                                                <Skeleton className="h-6 w-48 bg-slate-50 animate-pulse" />
                                            </div>
                                            <Skeleton className="h-5 w-16 bg-slate-50/50 rounded-md animate-pulse" />
                                        </div>
                                        <div className="flex gap-4">
                                            <Skeleton className="h-4 w-24 bg-slate-50/50 rounded-md animate-pulse" />
                                            <Skeleton className="h-4 w-32 bg-slate-50/50 rounded-md animate-pulse" />
                                            <Skeleton className="h-4 w-28 bg-slate-50/50 rounded-md animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    const displayUser = profile || user;

    return (
        <main className="min-h-screen bg-white">
            {/* Ultra Minimal Header */}
            <section className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                {displayUser?.name}
                            </h1>
                            <p className="text-slate-400 font-medium text-lg">
                                {displayUser?.email}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-5 py-2.5 text-rose-600 bg-rose-50 hover:bg-rose-100 font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-32">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="pt-12 border-t border-slate-50">
                        <EnrollmentSection enrollments={profile?.enrollments || []} />
                    </div>
                </div>
            </section>
        </main>
    );
};
