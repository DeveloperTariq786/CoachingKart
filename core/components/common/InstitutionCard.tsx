'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { type FeaturedTuition } from '@/core/constants/tuitions';
import { Institution, NearMeInstitution } from '@/modules/platform/institutions/types/institution.types';
import { getOptimizedImageUrl } from '@/core/lib/utils/image-utils';

interface TuitionCardProps {
    tuition?: FeaturedTuition | Institution | NearMeInstitution;
    className?: string;
    isLoading?: boolean;
}

const InstitutionCard: React.FC<TuitionCardProps> = ({ tuition, className, isLoading }) => {
    if (isLoading || !tuition) {
        return (
            <div
                className={cn(
                    'flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden h-full',
                    className
                )}
            >
                {/* Image skeleton */}
                <div className="relative w-full bg-slate-200 animate-pulse rounded-t-2xl" style={{ aspectRatio: '16/9' }} />
                {/* Body skeleton */}
                <div className="flex flex-col flex-grow p-4 gap-3">
                    <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                    <div className="flex gap-2">
                        <div className="h-5 w-14 bg-slate-200 rounded-full animate-pulse" />
                        <div className="h-5 w-14 bg-slate-200 rounded-full animate-pulse" />
                    </div>
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    const name = tuition.name;
    const slug = tuition.slug;

    const isInstitution = 'logo' in tuition;
    const rawImageUrl = isInstitution
        ? (tuition.coverImage || tuition.logo)
        : (tuition as FeaturedTuition).imageUrl;

    const imageUrl = getOptimizedImageUrl(rawImageUrl || '', {
        width: 800,
        height: 450,
        fit: 'cover',       // ← change from 'contain'
        gravity: 'center',
        quality: 85,
        format: 'webp',
        // remove background — not needed with cover
    });

    const rating = tuition.rating;
    const reviewCount = isInstitution
        ? ((tuition as Institution).totalReviews || 0)
        : ((tuition as FeaturedTuition).reviewCount || 0);
    const inst = tuition as Institution;
    const location = isInstitution
        ? (inst.location?.city ? `${inst.location.city}, ${inst.location.country || ''}` : 'Location N/A')
        : (tuition as FeaturedTuition).location;
    const exams = isInstitution
        ? (inst.courses?.map(c => c.name) || [])
        : ((tuition as FeaturedTuition).exams || []);
    const distance = 'distance' in tuition ? (tuition as NearMeInstitution).distance : undefined;

    return (
        <Link
            href={`/${slug}`}
            className={cn(
                'group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-visible transition-all duration-300 hover:shadow-lg hover:border-slate-200 cursor-pointer h-full relative',
                className
            )}
        >
            {/* Image container — fixed 16:9 aspect ratio, no clipping */}
            <div className="relative w-full bg-slate-50 rounded-t-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                    src={imageUrl || 'https://picsum.photos/id/11/800/450'}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: 'center' }}
                />

                {/* Subtle overlay for badge readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

                {/* Distance badge */}
                {distance !== undefined && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-100 shadow-sm">
                        <Navigation className="w-3 h-3 text-primary-600" />
                        <span className="text-xs font-semibold text-slate-800">
                            {distance.toFixed(1)} km
                        </span>
                    </div>
                )}

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-100 shadow-sm">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-slate-800">{rating}</span>
                    <span className="text-xs text-slate-400">({reviewCount})</span>
                </div>
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-grow p-4 gap-3 overflow-visible">

                {/* Name */}
                <h3 className="text-base font-semibold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                    {name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Exam tags */}
                {exams.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 overflow-visible">
                        {exams.slice(0, 3).map((exam) => (
                            <span
                                key={exam}
                                className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full"
                            >
                                {exam}
                            </span>
                        ))}
                        {exams.length > 3 && (
                            <div className="relative group/tag">
                                <span
                                    className="text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-slate-100 hover:text-slate-600 transition-colors"
                                >
                                    +{exams.length - 3} more
                                </span>
                                {/* Custom Tooltip with Primary Color Details */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] opacity-0 invisible group-hover/tag:opacity-100 group-hover/tag:visible transition-all duration-200 z-[60] pointer-events-none">
                                    <div className="bg-slate-800 text-white text-[11px] font-medium p-2.5 rounded-xl shadow-xl flex flex-col gap-1.5 border border-slate-700">
                                        <div className="text-primary-400 text-[10px] uppercase tracking-wider mb-0.5 px-1 font-bold">Other Exams</div>
                                        {exams.slice(3).map((exam, idx) => (
                                            <div key={idx} className="px-1 truncate text-slate-100">
                                                • {exam}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800"></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Divider + CTA */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                        View Institute
                    </span>
                    <span className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default InstitutionCard;