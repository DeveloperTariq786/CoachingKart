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

const LecturesSidebar: React.FC = () => {
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
        <aside className="hidden lg:flex w-64 flex-col bg-background border-r border-foreground/5 fixed top-14 h-[calc(100vh-56px)] overflow-y-auto shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm relative overflow-hidden",
                                isActive
                                    ? "bg-primary-50 text-primary-600 shadow-sm"
                                    : "text-slate-500 hover:bg-foreground/[0.02] hover:text-foreground"
                            )}
                        >
                            {/* Active indicator bar */}
                            {isActive && (
                                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary-500 rounded-r-full" />
                            )}

                            <Icon
                                size={20}
                                className={cn(
                                    "transition-transform duration-200 group-hover:scale-110",
                                    isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
                                )}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default LecturesSidebar;
