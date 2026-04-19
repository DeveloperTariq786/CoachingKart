'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils/utils';
import { type FeaturedTuition } from '@/core/constants/tuitions';
import { Institution, NearMeInstitution } from '@/modules/platform/institutions/types/institution.types';

interface TuitionCardProps {
    tuition: FeaturedTuition | Institution | NearMeInstitution;
    className?: string;
}

const InstitutionCard: React.FC<TuitionCardProps> = ({ tuition, className }) => {
    const router = useRouter();
    const name = tuition.name;
    const slug = tuition.slug;

    // Handle both types
    const isInstitution = 'logo' in tuition;
    const imageUrl = isInstitution ? (tuition.coverImage || tuition.logo) : (tuition as FeaturedTuition).imageUrl;
    const rating = tuition.rating;
    const reviewCount = isInstitution ? ((tuition as Institution).totalReviews || 0) : ((tuition as FeaturedTuition).reviewCount || 0);
    const inst = tuition as Institution;
    const location = isInstitution 
        ? (inst.location?.city ? `${inst.location.city}, ${inst.location.country || ''}` : 'Location N/A') 
        : (tuition as FeaturedTuition).location;
    const exams = isInstitution 
        ? (inst.courses?.map(c => c.name) || []) 
        : ((tuition as FeaturedTuition).exams || []);
    const distance = 'distance' in tuition ? (tuition as NearMeInstitution).distance : undefined;

    return (
        <Card
            className={cn(
                "overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-slate-100 group flex flex-col h-full rounded-2xl bg-slate-50",
                className
            )}
        >
            {/* Card Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={imageUrl || 'https://picsum.photos/id/11/800/600'}
                    alt={name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {distance !== undefined && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm border border-slate-100">
                        <Navigation className="w-3.5 h-3.5 text-primary-600" />
                        <span className="ml-1 text-xs font-bold text-slate-800">
                            {distance.toFixed(1)} km
                        </span>
                    </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm border border-slate-100">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                        <span className="ml-1 text-xs font-bold text-slate-800">{rating}</span>
                        <span className="ml-1 text-xs text-slate-500">({reviewCount})</span>
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <CardContent className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-primary-600 transition-colors block">
                        {name}
                    </h3>
                </div>

                <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-slate-400" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {exams.slice(0, 3).map((exam) => (
                        <span key={exam} className="bg-white text-slate-600 text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded-full shadow-sm">
                            {exam}
                        </span>
                    ))}
                    {exams.length > 3 && (
                        <span className="bg-white/50 text-slate-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            +{exams.length - 3}
                        </span>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                    <Button
                        onClick={() => router.push(`/${slug}`)}
                        className="w-full py-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-primary-500/20 active:scale-95 cursor-pointer"
                    >
                        Explore
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstitutionCard;
