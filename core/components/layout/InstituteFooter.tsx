'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import { Skeleton } from '@/core/components/ui/skeleton';

const InstituteFooter: React.FC = () => {
    const { institution, details, isLoading: isInstituteLoading } = useInstitute();
    const pathname = usePathname();
    const instSlug = useParams().slug as string;

    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length >= 3) {
        return null;
    }

    const formattedName = details?.name || institution?.name || 'Institution';

    // Extracted dynamic contact strings for cleaner fallback handling
    const email = details?.tuitionEmail || 'info@institute.com';
    const phone = details?.tuitionPhone || '+91 98765 43210';
    const addressString = details?.location
        ? `${details.location.address}, ${details.location.city}, ${details.location.country}`
        : 'Main Road, Sector 4, Bangalore, Karnataka 560001';

    const quickLinksCol1 = [
        { label: 'Courses', href: `/${instSlug}#courses` },
        { label: 'Faculty', href: `/${instSlug}/faculty` },
        { label: 'Results', href: `/${instSlug}/results` },
    ];

    const quickLinksCol2 = [
        { label: 'About Us', href: `/${instSlug}/about` },
        { label: 'Gallery', href: `/${instSlug}/gallery` },
        { label: 'Reviews', href: `/${instSlug}/reviews` },
    ];

    return (
        <footer className="bg-primary-600 text-white pt-5 md:pt-16 pb-6 md:pb-8">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 md:mb-12">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 group">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-base md:text-lg group-hover:scale-110 transition-transform overflow-hidden">
                                {isInstituteLoading ? (
                                    <Skeleton className="w-full h-full bg-white/20" />
                                ) : details?.logo ? (
                                    <Image
                                        src={details.logo}
                                        alt={details.name}
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                ) : (
                                    formattedName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <span className="font-bold text-lg md:text-xl text-white">
                                {isInstituteLoading
                                    ? <Skeleton className="h-6 w-32 bg-white/20" />
                                    : formattedName}
                            </span>
                        </div>
                        <div className="text-white/70 text-xs md:text-sm leading-relaxed">
                            {isInstituteLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-full bg-white/20" />
                                    <Skeleton className="h-3 w-4/5 bg-white/20" />
                                </div>
                            ) : (
                                details?.description ||
                                'Providing quality education and empowering students with the best coaching and guidance.'
                            )}
                        </div>
                    </div>

                    {/* Quick Links — Column 1 */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-white mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-wider">
                            Quick Links
                        </h4>
                        <div className="w-6 md:w-8 h-0.5 bg-white mb-3 md:mb-6" />
                        <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                            {quickLinksCol1.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links — Column 2 */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-white mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-wider">
                            Quick Links
                        </h4>
                        <div className="w-6 md:w-8 h-0.5 bg-white mb-3 md:mb-6" />
                        <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                            {quickLinksCol2.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <h4 className="font-bold text-white mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-wider">
                            Contact Us
                        </h4>
                        <div className="w-6 md:w-8 h-0.5 bg-white mb-3 md:mb-6" />
                        <div className="space-y-3 md:space-y-4 text-xs md:text-sm text-white/70">

                            {/* Email */}
                            <div className="flex items-start gap-2.5 md:gap-3 group">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 flex items-center justify-center shrink-0 transition-colors group-hover:border-white">
                                    <Mail size={14} className="text-white md:w-[15px] md:h-[15px]" />
                                </div>
                                <div className="flex-1 leading-relaxed pt-1 md:pt-1.5 break-all sm:break-normal">
                                    {isInstituteLoading ? (
                                        <Skeleton className="h-3 w-40 bg-white/20" />
                                    ) : (
                                        <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                                            {email}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-2.5 md:gap-3 group">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 flex items-center justify-center shrink-0 transition-colors group-hover:border-white">
                                    <Phone size={14} className="text-white md:w-[15px] md:h-[15px]" />
                                </div>
                                <div className="flex-1 leading-relaxed pt-1 md:pt-1.5">
                                    {isInstituteLoading ? (
                                        <Skeleton className="h-3 w-32 bg-white/20" />
                                    ) : (
                                        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                                            {phone}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-2.5 md:gap-3 group">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 flex items-center justify-center shrink-0 transition-colors group-hover:border-white">
                                    <MapPin size={14} className="text-white md:w-[15px] md:h-[15px]" />
                                </div>
                                <div className="flex-1 leading-relaxed pt-1 md:pt-1.5">
                                    {isInstituteLoading ? (
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-full bg-white/20" />
                                            <Skeleton className="h-3 w-2/3 bg-white/20" />
                                        </div>
                                    ) : (
                                        <a
                                            href={`https://maps.google.com/?q=${encodeURIComponent(addressString)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-white transition-colors"
                                        >
                                            {addressString}
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
                    <p className="text-xs md:text-sm text-white/50">
                        © {new Date().getFullYear()}{' '}
                        <Link href={`/${instSlug}`} className="hover:text-white transition-colors">
                            {formattedName}
                        </Link>{' '}
                        • Powered by{' '}
                        <a
                            href="https://coachingkart.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium hover:underline"
                        >
                            CoachingKart
                        </a>
                    </p>
                    <div className="flex items-center gap-4 md:gap-6 text-[11px] md:text-xs text-white/40">
                        <Link href={`/${instSlug}/privacy`} className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href={`/${instSlug}/terms`} className="hover:text-white transition-colors">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default InstituteFooter;