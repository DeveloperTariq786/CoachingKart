'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, BookOpen, GraduationCap, School } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

const BottomNav: React.FC = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions', 'about', 'careers'].includes(segments[0]);
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
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            {/* Safe Area Background */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-white/80 backdrop-blur-xl border-t border-slate-100" />

            <nav className="relative bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex items-center justify-between shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,12px)]">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex flex-col items-center gap-1 group relative"
                        >
                            {/* Active Indicator Dot */}
                            {isActive && (
                                <span className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
                            )}

                            <div className={cn(
                                "p-1 rounded-xl transition-all duration-300",
                                isActive
                                    ? "text-primary-600 scale-110"
                                    : "text-slate-400 group-hover:text-slate-600"
                            )}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>

                            <span className={cn(
                                "text-[10px] font-bold transition-colors duration-300 uppercase tracking-tighter",
                                isActive ? "text-primary-700" : "text-slate-400"
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
