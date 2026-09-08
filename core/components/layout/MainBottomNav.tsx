'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, School, User } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

const BottomNav: React.FC = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions', 'about', 'careers', 'privacy', 'terms'].includes(segments[0]);
    const isInstitutionAbout = segments.length === 2 && ['about', 'faculty', 'gallery', 'results', 'reviews'].includes(segments[1]) && !['institutions', 'tuitions'].includes(segments[0]);

    if (isInstitutionDetail || isInstitutionAbout) return null;

    const navItems = [
        {
            label: 'Home',
            icon: Home,
            href: '/',
        },
        {
            label: 'Find Coaching',
            icon: School,
            href: '/institutions',
        },
        // {
        //     label: 'My Coaching',
        //     icon: BookOpen,
        //     href: '/my-coaching',
        // },
        {
            label: 'Profile',
            icon: User,
            href: '/profile',
        },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,0px)]">
            <nav className="flex items-center justify-around max-w-md mx-auto px-4 h-11">
                {navItems.map((item) => {
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center transition-all py-0.5 px-2",
                                isActive ? "text-primary-600" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <div className={cn(
                                "p-0.5 rounded-md transition-all",
                                isActive ? "bg-primary-50 text-primary-600" : "bg-transparent"
                            )}>
                                <Icon
                                    size={16}
                                    className={cn(
                                        "transition-all",
                                        isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"
                                    )}
                                />
                            </div>
                            <span className={cn(
                                "text-[8.5px] font-bold uppercase tracking-wider transition-all leading-none mt-0.5",
                                isActive ? "opacity-100" : "opacity-70"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default BottomNav;
