'use client';

import React from 'react';
import Image from 'next/image';
import { FEATURED_TUITIONS } from '@/core/constants';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';

import { Card, CardContent } from '@/core/components/ui/card';

import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';

const QualifiersChoice: React.FC = () => {
    const router = useRouter();
    // Take a subset for this section
    const choiceTuitions = FEATURED_TUITIONS.slice(0, 3);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Qualifiers choice</h2>
                        <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                            Handpicked premium centers with proven track records.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {choiceTuitions.map((tuition) => {
                        const slug = tuition.name.toLowerCase().replace(/\s+/g, '-');

                        return (
                            <Card
                                key={tuition.id}
                                onClick={() => router.push(`/${slug}`)}
                                className="group bg-slate-50 rounded-3xl border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden flex flex-row relative outline-none cursor-pointer"
                            >
                                {/* Decorative Circle */}
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-200 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

                                {/* Left Side: Image Area (Matching TuitionCard logic) */}
                                <div className="relative w-28 xs:w-36 sm:w-56 flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={tuition.imageUrl}
                                        alt={tuition.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 640px) 150px, 300px"
                                    />

                                    {/* Feature Badge (Unique to this section) */}
                                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                                        <Badge className="bg-primary-600 hover:bg-primary-700 font-bold uppercase tracking-wider text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-md shadow-lg border-none whitespace-nowrap">
                                            Qualifiers Choice
                                        </Badge>
                                    </div>
                                </div>

                                {/* Right Side: Content Area (Matching TuitionCard elements) */}
                                <CardContent className="flex-1 p-3 sm:p-6 flex flex-col min-w-0 pt-3 sm:pt-6 bg-transparent border-none shadow-none">
                                    <div className="mb-1 sm:mb-2">
                                        <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors block leading-tight truncate sm:whitespace-normal">
                                            {tuition.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center text-slate-500 text-[10px] sm:text-sm mb-2 sm:mb-3">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1 flex-shrink-0 text-slate-400" />
                                        <span className="truncate">{tuition.location}</span>
                                    </div>

                                    <p className="text-[10px] sm:text-sm text-slate-500 line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-4 leading-normal sm:leading-relaxed">
                                        {tuition.desc}
                                    </p>

                                    {/* Tags (Matching TuitionCard) */}
                                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-6">
                                        {tuition.exams.slice(0, 3).map((exam) => (
                                            <span key={exam} className="bg-white text-slate-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-tight px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
                                                {exam}
                                            </span>
                                        ))}
                                        {tuition.exams.length > 3 && (
                                            <span className="bg-white/50 text-slate-400 text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                +{tuition.exams.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        <Button className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-primary-500/20 active:scale-95 h-auto">
                                            Explore Choice
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default QualifiersChoice;
