'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils/utils';
import { type FeaturedTuition } from '@/core/constants/tuitions';

interface TuitionCardProps {
    tuition: FeaturedTuition;
    className?: string;
}

const InstitutionCard: React.FC<TuitionCardProps> = ({ tuition, className }) => {
    const router = useRouter();
    const slug = tuition.name.toLowerCase().replace(/\s+/g, '-');

    return (
        <Card
            onClick={() => router.push(`/${slug}`)}
            className={cn(
                "overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-slate-100 group flex flex-col h-full rounded-3xl bg-slate-50 cursor-pointer",
                className
            )}
        >
            {/* Card Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={tuition.imageUrl}
                    alt={tuition.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm border border-slate-100">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                    <span className="ml-1 text-xs font-bold text-slate-800">{tuition.rating}</span>
                    <span className="ml-1 text-xs text-slate-500">({tuition.reviewCount})</span>
                </div>
            </div>

            {/* Card Content */}
            <CardContent className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-primary-600 transition-colors block">
                        {tuition.name}
                    </h3>
                </div>

                <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-slate-400" />
                    <span className="truncate">{tuition.location}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tuition.exams.slice(0, 3).map((exam) => (
                        <span key={exam} className="bg-white text-slate-600 text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 rounded-full shadow-sm">
                            {exam}
                        </span>
                    ))}
                    {tuition.exams.length > 3 && (
                        <span className="bg-white/50 text-slate-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            +{tuition.exams.length - 3}
                        </span>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                    <Button className="w-full py-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-primary-500/20 active:scale-95">
                        Explore
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstitutionCard;
