'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils/utils';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Auth states (Simulation)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const router = useRouter();

    // Check if we are on the home page
    const isHome = pathname === '/';
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions', 'tuitions'].includes(segments[0]);
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

    // Auto-open search on tuition page if query exists or if navigating there
    useEffect(() => {
        if (pathname === '/tuitions') {
            setIsSearchOpen(true);
            const query = new URLSearchParams(window.location.search).get('search');
            if (query) setSearchQuery(query);
        } else {
            setIsSearchOpen(false);
        }
    }, [pathname]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/tuitions?search=${encodeURIComponent(searchQuery.trim())}`);
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
                            <Image
                                src="/images/logo.png"
                                alt="CoachingKart"
                                width={150}
                                height={0}
                                className={cn(
                                    "h-14 md:h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105",
                                    isHome && !isScrolled ? "brightness-0 invert shadow-white/10" : "brightness-0"
                                )}
                                priority
                            />
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

                                <span className="relative">Find My Coaching</span>
                            </div>
                        </Button>

                        {isLoggedIn && (
                            <div className="relative" ref={profileMenuRef}>
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className={cn("p-2 rounded-full transition-colors flex items-center justify-center", profileButtonStyle)}
                                >
                                    <User size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="absolute inset-0 bg-white z-[60] flex items-center px-4 md:px-8 border-b border-slate-100 shadow-sm animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSearch} className="max-w-7xl mx-auto w-full flex items-center gap-4">
                        {/* On desktop, search icon and input on the right side if preferred, but keeping it centered-clean */}
                        <div className="flex-1 flex items-center justify-center">
                            <div className="relative w-full max-w-2xl group">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-primary-600" size={20} />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search for tuitions, subjects, or tutors..."
                                    className="w-full bg-transparent border-none outline-none text-lg md:text-xl text-slate-900 placeholder:text-slate-400 pl-10 py-2 font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(false)}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all duration-300 hover:rotate-90"
                            aria-label="Close search"
                        >
                            <X size={24} />
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Header;
