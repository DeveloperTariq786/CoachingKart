'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

const InstituteHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const params = useParams();
    const pathname = usePathname();
    const instName = params.slug as string;
    const segments = pathname?.split('/').filter(Boolean) || [];
    // It's a sub-page if it's one of the specific sub-pages OR if it's a course detail page (2 segments)
    const isSubPage = segments.length >= 2;

    const [] = useState(false);


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

    const navStyle = (isScrolled || isMenuOpen || isSubPage) ? 'bg-white shadow-md py-3 border-b border-slate-100' : 'bg-transparent py-5';
    const textStyle = (isScrolled || isSubPage || isMenuOpen) ? 'text-slate-900' : 'text-white';

    const menuLinks = [
        { label: 'Home', href: `/` },
        { label: 'About Us', href: `/${instName}/about` },
        { label: 'Faculty', href: `/${instName}/faculty` },
        { label: 'Gallery', href: `/${instName}/gallery` },
        { label: 'Results', href: `/${instName}/results` },
        { label: 'Reviews', href: `/${instName}/reviews` },
    ];

    return (
        <nav className={cn("fixed w-full z-50 transition-all duration-300", navStyle)}>
            <div className="w-full px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center">
                    {/* Brand/Logo */}
                    <div className="flex items-center relative z-20">
                        <Link href={`/${instName}`} className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                                C
                            </div>
                            <span className={cn("font-bold text-xl tracking-tight transition-colors", textStyle)}>
                                {instName ? instName.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'ClassroomConnect'}
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

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center relative z-20">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={cn("p-2 rounded-lg transition-colors", textStyle)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Professional Dropdown */}
                <div className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isMenuOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
                )}>
                    <div className="flex flex-col gap-1 pb-2">
                        {menuLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="py-3 px-2 text-base font-semibold text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default InstituteHeader;
