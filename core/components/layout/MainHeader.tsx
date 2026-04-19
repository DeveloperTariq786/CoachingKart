'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils/utils';
import { useAuthStore } from '@/core/store/auth.store';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Auth states
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const prevPathname = useRef<string | null>(null);

    // Navigation and Layout states
    const isHome = pathname === '/';
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions', 'tuitions', 'about', 'careers'].includes(segments[0]);
    const isInstitutionAbout = segments.length === 2 && ['about', 'faculty', 'gallery', 'results', 'reviews'].includes(segments[1]) && !['institutions', 'tuitions'].includes(segments[0]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Click outside listener for profile menu
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Auto-open search on institutions page if query exists or if navigating there
    useEffect(() => {
        const isInstitutionsPage = pathname === '/institutions';
        const arrivingAtInstitutions = isInstitutionsPage && prevPathname.current !== '/institutions';
        const searchQueryParam = searchParams?.get('search');
        const courseQueryParam = searchParams?.get('courseName');

        if (isInstitutionsPage) {
            // Auto-open only on fresh arrival (if no course filter) or if there's an active search
            if ((arrivingAtInstitutions && !courseQueryParam) || searchQueryParam) {
                setIsSearchOpen(true);
            }

            // Always sync search query state with URL
            if (searchQueryParam) {
                setSearchQuery(decodeURIComponent(searchQueryParam.replace(/\+/g, ' ')));
            } else {
                setSearchQuery('');
            }
        } else {
            setIsSearchOpen(false);
            setSearchQuery('');
        }

        // Update prevPathname for next run
        prevPathname.current = pathname;
    }, [pathname, searchParams]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const formattedQuery = searchQuery.trim().replace(/\s+/g, '+');
            router.push(`/institutions?search=${formattedQuery}`);
        }
    };

    const handleCancel = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        if (pathname === '/institutions') {
            router.push('/institutions');
        }
    };

    // Use scrolled style always if not on home page
    const navStyle = !isHome || isScrolled ? 'bg-white shadow-md py-3 border-b border-slate-100' : 'bg-transparent py-5';
    const textStyle = !isHome || isScrolled ? 'text-slate-900' : 'text-white';
    const buttonIconStyle = !isHome || isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10';

    // Specific style for the profile button to ensure it looks good on dark/light backgrounds
    const profileButtonStyle = !isHome || isScrolled
        ? 'text-slate-700 bg-slate-100 hover:bg-slate-200'
        : 'text-white bg-white/20 hover:bg-white/30';

    if (isInstitutionDetail || isInstitutionAbout) return null;

    return (
        <nav className={cn("fixed w-full z-50 transition-all duration-300", navStyle)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer group">
                            <div className="flex items-center gap-0">
                                <Image
                                    src="/logos/logo-wbg.webp"
                                    alt="CoachingKart"
                                    width={120}
                                    height={120}
                                    className={cn(
                                        "h-8 md:h-10 w-auto object-contain transition-all duration-300 scale-[2.0] md:scale-[2.5] origin-left",
                                        isHome && !isScrolled ? "brightness-0 invert" : ""
                                    )}
                                    priority
                                />

                            </div>
                        </Link>
                    </div>

                    {/* Right Side: Action & Profile */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Mobile Search Icon */}
                        <button
                            onClick={() => {
                                if (pathname === '/institutions') {
                                    setIsSearchOpen(true);
                                } else {
                                    router.push('/institutions');
                                }
                            }}
                            className={cn(
                                "flex md:hidden p-2 rounded-full transition-all duration-300",
                                buttonIconStyle
                            )}
                            aria-label="Toggle search"
                        >
                            <Search size={22} />
                        </button>

                        <Button
                            onClick={() => {
                                if (pathname === '/institutions') {
                                    setIsSearchOpen(true);
                                } else {
                                    router.push('/institutions');
                                }
                            }}
                            className={cn(
                                "hidden md:flex relative px-6 py-2.5 h-auto text-sm font-bold rounded-full transition-all duration-500 overflow-hidden group/btn animate-attention",
                                isHome && !isScrolled
                                    ? "bg-white text-primary-600 hover:bg-white shadow-xl shadow-white/20"
                                    : "bg-primary-600 text-white hover:bg-primary-700 shadow-xl shadow-primary-500/30"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {/* Base Searching Animation (Always Active) */}
                                <span className="absolute inset-x-0 h-[100%] bg-gradient-to-b from-white/0 via-white/30 to-white/0 animate-scan pointer-events-none" />

                                {/* Shimmer on Hover */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer pointer-events-none" />

                                <span className="relative flex items-center justify-center">
                                    <Search size={16} className="animate-pulse group-hover/btn:scale-110 transition-transform" />
                                </span>

                                <span className="relative cursor-pointer">Find Coaching</span>
                            </div>
                        </Button>

                        {/* Profile Icon (Desktop Only) */}
                        {isAuthenticated && (
                            <Link
                                href="/profile"
                                className={cn(
                                    "hidden md:flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ml-1 md:ml-3",
                                    isHome && !isScrolled
                                        ? "text-white bg-white/20 hover:bg-white/30 shadow-lg shadow-white/10"
                                        : "text-slate-700 bg-slate-100 hover:bg-slate-200 shadow-sm"
                                )}
                            >
                                <User size={20} className="text-primary-600" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="absolute inset-x-0 top-0 h-full bg-white z-[60] flex items-center px-3 md:px-6 border-b border-slate-100 shadow-sm animate-in fade-in duration-200">
                    <form onSubmit={handleSearch} className="w-full flex items-center gap-2 md:gap-3">
                        <Search className="flex-shrink-0 text-slate-400" size={20} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search by Institute, Course..."
                            className="flex-1 min-w-0 bg-transparent border-none outline-none text-base md:text-lg text-slate-900 placeholder:text-slate-400 py-2 font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="flex-shrink-0 p-1.5 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-shrink-0 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Header;
