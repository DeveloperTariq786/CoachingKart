'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';

const InstituteHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { details, slug } = useInstitute();
    const pathname = usePathname();
    const displayInstName = details?.name || (slug ? slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Institution');
    const segments = pathname?.split('/').filter(Boolean) || [];

    const isSubPage = segments.length >= 2;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navStyle = (isScrolled || isMenuOpen || isSubPage) ? 'bg-white shadow-md py-2 md:py-3 border-b border-slate-100' : 'bg-transparent pt-1 pb-3 md:py-5';
    const textStyle = 'text-slate-900';

    const menuLinks = [
        { label: 'Home', href: `/` },
        { label: 'About Us', href: `/${slug}/about` },
        { label: 'Faculty', href: `/${slug}/faculty` },
        { label: 'Gallery', href: `/${slug}/gallery` },
        { label: 'Results', href: `/${slug}/results` },
        { label: 'Reviews', href: `/${slug}/reviews` },
    ];

    return (
        <nav className={cn("fixed w-full z-50 transition-all duration-300", navStyle)}>
            <div className="w-full pl-4 pr-1 sm:px-6 lg:px-10 relative">
                <div className="flex justify-between items-center">
                    {/* Brand/Logo */}
                    <div className={cn(
                        "items-center relative z-20 min-w-0 mr-2 transition-all duration-300",
                        (isScrolled || isSubPage || isMenuOpen) ? "flex animate-in fade-in duration-300" : "hidden md:flex"
                    )}>
                        <Link href={`/${slug}`} className="flex items-center gap-2 cursor-pointer group min-w-0">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-primary-600 font-bold text-base md:text-lg group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                                {details?.logo ? (
                                    <Image
                                        src={details.logo}
                                        alt={details.name}
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                ) : (
                                    displayInstName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <span className={cn(
                                "font-bold text-base md:text-xl tracking-tight transition-colors truncate max-w-[190px] sm:max-w-xs md:max-w-none",
                                textStyle
                            )}>
                                {displayInstName}
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links - Centered (Desktop) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
                        {menuLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={cn("text-sm font-bold hover:text-primary-600 transition-colors", textStyle)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side actions (Desktop) */}
                    <div className="hidden md:flex items-center gap-4 relative z-20">
                        <Link
                            href="/profile"
                            className="flex items-center justify-center p-2.5 rounded-full bg-primary-600 hover:bg-primary-700 transition-all duration-300 shadow-sm"
                        >
                            <User size={20} className="text-white" />
                        </Link>
                    </div>

                    {/* Mobile Actions */}
                    <div className="md:hidden flex items-center relative z-20 ml-auto -mr-1 -mt-1">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={cn("p-1 rounded-lg transition-colors cursor-pointer", textStyle)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Professional Dropdown */}
                <div className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isMenuOpen ? "max-h-[32rem] opacity-100 mt-2.5 pt-2.5 border-t border-slate-100" : "max-h-0 opacity-0"
                )}>
                    <div className="flex flex-col gap-0.5 pb-2">
                        {menuLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="py-2.5 px-2 text-base font-semibold text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 mt-1 border-t border-slate-100">
                            <Link
                                href="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 py-2.5 px-2 text-base font-semibold text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-sm">
                                    <User size={16} />
                                </div>
                                <span>Profile</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default InstituteHeader;