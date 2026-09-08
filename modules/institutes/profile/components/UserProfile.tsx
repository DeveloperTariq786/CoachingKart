'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore, useAuthHydration, getLoginUrl } from '@/modules/platform/auth';
import { LogOut, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ConfirmationDialog } from '@/core/components/common';
import { profileService } from '../services/profile.service';
import { EnrollmentSection } from './EnrollmentSection';
import { useProfile } from '../hooks/useProfile';
import { Skeleton } from '@/core/components/ui/skeleton';

const INK = '#1F2A22';

const ProfileSkeleton: React.FC = () => (
    <main className="min-h-screen bg-white">
        <section className="pt-20 pb-20 sm:pt-24 sm:pb-24 md:pt-32 md:pb-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start">
                <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-5 md:space-y-8">
                    <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-slate-100" />
                    <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start">
                        <Skeleton className="h-3 w-20 sm:w-24 bg-slate-100 rounded-full" />
                        <Skeleton className="h-7 sm:h-9 w-48 sm:w-full bg-slate-100 rounded-lg" />
                        <Skeleton className="h-4 sm:h-5 w-36 sm:w-3/4 bg-slate-100 rounded-lg" />
                        <Skeleton className="h-8 sm:h-10 w-28 sm:w-32 bg-slate-100 rounded-full" />
                    </div>
                </div>

                <div className="space-y-6 md:space-y-8 md:border-l md:border-dashed md:border-black/10 md:pl-12 pt-8 md:pt-0 border-t border-dashed border-black/10 md:border-t-0">
                    <Skeleton className="h-4 w-32 bg-slate-100 rounded-full" />
                    <div className="grid gap-3 sm:gap-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex bg-white border border-black/[0.06] rounded-xl sm:rounded-2xl overflow-hidden">
                                <div className="w-1.5 bg-slate-100 shrink-0" />
                                <div className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2.5 sm:gap-3.5">
                                            <Skeleton className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-slate-50" />
                                            <Skeleton className="h-4 sm:h-5 w-28 sm:w-40 bg-slate-50" />
                                        </div>
                                        <Skeleton className="h-4 sm:h-5 w-16 sm:w-24 bg-slate-50 rounded-full" />
                                    </div>
                                    <div className="border-t border-dashed border-black/10" />
                                    <div className="flex gap-4 sm:gap-6">
                                        <Skeleton className="h-6 sm:h-8 w-16 sm:w-20 bg-slate-50 rounded" />
                                        <Skeleton className="h-6 sm:h-8 w-20 sm:w-24 bg-slate-50 rounded" />
                                        <Skeleton className="h-6 sm:h-8 w-16 sm:w-20 bg-slate-50 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </main>
);

export const UserProfile: React.FC = () => {
    const { user, token, logout } = useAuthStore();
    const { profile, isLoading } = useProfile();
    const router = useRouter();
    const hasHydrated = useAuthHydration();
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const savedImage = localStorage.getItem(`profile_image_${user?.id}`);
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, [user?.id]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfileImage(base64String);
                localStorage.setItem(`profile_image_${user?.id}`, base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (hasHydrated && !user && !isLoggingOut) {
            router.replace(getLoginUrl({ redirect: '/profile' }));
        }
    }, [hasHydrated, user, isLoggingOut, router]);

    const handleLogoutClick = () => {
        setIsLogoutConfirmOpen(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            await profileService.logout(token, user?.email || undefined);
        } catch (error) {
            console.error('Logout API failed:', error);
        } finally {
            logout();
            setIsLogoutConfirmOpen(false);
            setIsLoggingOut(false);
            router.push('/');
        }
    };

    if (!hasHydrated || (!user && !isLoggingOut) || (isLoading && !profile)) {
        return <ProfileSkeleton />;
    }

    if (!user && isLoggingOut) return null;

    const displayUser = profile || user;

    return (
        <main className="min-h-screen bg-white">
            <section className="pt-20 pb-20 sm:pt-24 sm:pb-24 md:pt-32 md:pb-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start">
                    {/* left: user details */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left md:sticky md:top-32 space-y-5 md:space-y-8">
                        {/* Profile Photo */}
                        <div className="relative group w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 border-2 border-dashed border-black/5 flex items-center justify-center transition-all group-hover:border-black/10 relative">
                                <Image
                                    src={profileImage || '/images/image.png'}
                                    alt={displayUser?.name || 'Profile'}
                                    fill
                                    className="object-cover rounded-full"
                                    unoptimized
                                />
                            </div>
                            <label className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg border border-black/5 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 group-hover:shadow-xl">
                                <Camera size={15} className="sm:size-[18px]" style={{ color: INK }} />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2 flex flex-col items-center md:items-start">
                            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: `${INK}55` }}>
                                Student pass
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight break-words" style={{ color: INK }}>
                                {displayUser?.name}
                            </h1>
                            <p className="font-mono text-xs sm:text-sm break-all" style={{ color: `${INK}66` }}>
                                {displayUser?.email}
                            </p>
                        </div>

                        <button
                            onClick={handleLogoutClick}
                            className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] rounded-full border border-dashed transition-colors cursor-pointer hover:border-rose-400 hover:text-rose-600"
                            style={{ color: INK, borderColor: `${INK}40` }}
                        >
                            <LogOut size={13} className="sm:size-3.5" />
                            Logout
                        </button>
                    </div>

                    {/* right: enrollments */}
                    <div className="md:border-l md:border-dashed md:border-black/10 md:pl-12 pt-8 md:pt-0 border-t border-dashed border-black/10 md:border-t-0">
                        <EnrollmentSection enrollments={profile?.enrollments || []} />
                    </div>
                </div>
            </section>

            <ConfirmationDialog
                isOpen={isLogoutConfirmOpen}
                onClose={() => setIsLogoutConfirmOpen(false)}
                onConfirm={confirmLogout}
                title="Logout"
                description="Are you sure you want to log out? You will need to log in again to access your courses."
                confirmText="Logout"
                
                isLoading={isLoggingOut}
                variant="danger"
            />
        </main>
    );
};