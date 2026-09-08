'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
    PlayCircle,
    FileText,
    ClipboardCheck
} from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

interface NavItem {
    label: string;
    icon: React.ElementType;
    href: string;
    segment: string | null;
}

const LecturesBottomNav: React.FC = () => {
    const params = useParams();
    const pathname = usePathname();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;
    const batchSlug = params.batchSlug as string;

    const basePath = `/${slug}/${courseSlug}/${batchSlug}`;

    const navItems: NavItem[] = [
        { label: 'Lectures', icon: PlayCircle, href: basePath, segment: null },
        { label: 'Resources', icon: FileText, href: `${basePath}/resources`, segment: 'resources' },
        { label: 'Mock', icon: ClipboardCheck, href: `${basePath}/mock`, segment: 'mock' },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-slate-200/80 shadow-xs pb-[env(safe-area-inset-bottom,0px)]">
            <nav className="flex items-center justify-around max-w-md mx-auto px-4 h-11">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
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

export default LecturesBottomNav;
