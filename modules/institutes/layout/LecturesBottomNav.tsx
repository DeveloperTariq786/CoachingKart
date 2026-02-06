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
        { label: 'Study Material', icon: FileText, href: `${basePath}/study-material`, segment: 'study-material' },
        { label: 'Tests', icon: ClipboardCheck, href: `${basePath}/tests`, segment: 'tests' },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-sm">
            <nav className="flex items-center justify-between max-w-md mx-auto px-6 py-3 pb-safe-area">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-all",
                                isActive ? "text-primary-600" : "text-slate-400"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all",
                                isActive ? "bg-primary-50" : "bg-transparent"
                            )}>
                                <Icon
                                    size={20}
                                    className={cn(
                                        "transition-all",
                                        isActive ? "stroke-[2.5px]" : "stroke-[2px]"
                                    )}
                                />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wider transition-all",
                                isActive ? "opacity-100" : "opacity-60"
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
