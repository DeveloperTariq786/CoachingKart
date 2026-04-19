'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Home, BookOpen, MessageCircle, Info, Phone } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

const InstituteBottomNav: React.FC = () => {
    const pathname = usePathname();
    const params = useParams();
    const slug = params.slug as string;
    const segments = pathname.split('/').filter(Boolean);
    const isSubPage = segments.length >= 2 && ['about', 'faculty', 'gallery', 'results', 'reviews'].includes(segments[1]);

    if (isSubPage) return null;

    const navItems = [
        {
            label: 'Home',
            icon: Home,
            href: `/${slug}`,
        },
        {
            label: 'Courses',
            icon: BookOpen,
            href: `/${slug}#courses`,
        },
        {
            label: 'Enquiry',
            icon: MessageCircle,
            href: `/${slug}#enquiry`,
        },
        {
            label: 'Contact',
            icon: Phone,
            href: `/${slug}#contact`,
        },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
            <nav className="bg-foreground/90 backdrop-blur-xl border border-background/10 px-4 py-3 flex items-center justify-between shadow-2xl rounded-2xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex flex-col items-center gap-1 group relative"
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                isActive
                                    ? "text-primary-400 bg-primary-400/10 scale-110"
                                    : "text-slate-400 group-hover:text-slate-200"
                            )}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold transition-colors duration-300 uppercase tracking-tighter",
                                isActive ? "text-primary-400" : "text-slate-500"
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

export default InstituteBottomNav;
