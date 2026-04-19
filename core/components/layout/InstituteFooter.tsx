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

    // Hide footer on batch dashboard pages (path: /[slug]/[courseSlug]/[batchSlug] and subpages)
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length >= 3) {
        return null;
    }

    const formattedName = details?.name || institution?.name || 'Institution';

    return (
        <footer className="bg-foreground text-background/80 border-t border-background/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-left">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center text-primary-600 font-bold group-hover:scale-110 transition-transform overflow-hidden border border-background/10">
                                {isInstituteLoading ? (
                                    <Skeleton className="w-full h-full bg-slate-200" />
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
                            <span className="font-bold text-xl text-background">
                                {isInstituteLoading ? <Skeleton className="h-6 w-32 bg-slate-800" /> : formattedName}
                            </span>
                        </div>
                        <div className="text-slate-400 text-sm leading-relaxed">
                            {isInstituteLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-full bg-slate-800" />
                                    <Skeleton className="h-3 w-4/5 bg-slate-800" />
                                </div>
                            ) : details?.description || "Providing quality education and empowering students with the best coaching and guidance."}
                        </div>
                    </div>


                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-background mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href={`/${instSlug}/faculty`} className="hover:text-primary-400 transition-colors">Our Faculty</Link></li>
                            <li><Link href={`/${instSlug}/results`} className="hover:text-primary-400 transition-colors">Our Achievements</Link></li>
                            <li><Link href={`/${instSlug}/reviews`} className="hover:text-primary-400 transition-colors">Student Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-background mb-6">Connect</h4>
                        <div className="space-y-4 text-sm text-slate-400">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    {isInstituteLoading ? (
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-full bg-slate-800" />
                                            <Skeleton className="h-3 w-2/3 bg-slate-800" />
                                        </div>
                                    ) : (
                                        details?.location ? `${details.location.address}, ${details.location.city}, ${details.location.country}` : "Main Road, Sector 4, Bangalore, Karnataka 560001"
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-500 shrink-0" />
                                {isInstituteLoading ? <Skeleton className="h-3 w-32 bg-slate-800" /> : <span>{details?.tuitionPhone || "+91 98765 43210"}</span>}
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary-500 shrink-0" />
                                {isInstituteLoading ? <Skeleton className="h-3 w-40 bg-slate-800" /> : <span>{details?.tuitionEmail || "info@institute.com"}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-background/50">© {new Date().getFullYear()} {formattedName} • Powered by CoachingKart</p>
                </div>
            </div>
        </footer>
    );
};

export default InstituteFooter;
