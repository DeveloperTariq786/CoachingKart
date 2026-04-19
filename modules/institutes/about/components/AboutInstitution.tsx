'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, Flag, Info } from 'lucide-react';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import { useAbout } from '../hooks/useAbout';

import { Skeleton } from '@/core/components/ui/skeleton';

const AboutInstitutionSkeleton: React.FC = () => {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <Skeleton className="h-4 w-24 mb-4" />
                        <Skeleton className="h-12 w-full max-w-md mb-6" />
                        <Skeleton className="h-8 w-2/3 mb-10" />
                        <div className="space-y-8">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex gap-5">
                                    <Skeleton className="shrink-0 w-12 h-12 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
                </div>
            </div>
        </section>
    );
};

const AboutInstitution: React.FC = () => {
    const { details, isLoading: isInstituteLoading } = useInstitute();
    const institutionId = details?.id;
    const { aboutData, isLoading } = useAbout(institutionId);

    if (isLoading || isInstituteLoading) {
        return <AboutInstitutionSkeleton />;
    }

    if (!aboutData || (!aboutData.title && !aboutData.description)) {
        return (
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-background rounded-3xl p-12 shadow-sm border border-foreground/10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center text-slate-400 mb-6">
                            <Info size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">About Content Not Available</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            The institution has not yet published its "About" section content. Please check back later for more information about our legacy, vision, and mission.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content Column */}
                    <div>
                        <h3 className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4">
                            Our Journey
                        </h3>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                            {aboutData.title}
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            {aboutData.description}
                        </p>

                        <div className="space-y-8">
                            {/* Vision */}
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                    <Eye size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-2">
                                        {aboutData.visionTitle || 'Our Vision'}
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        {aboutData.visionContent}
                                    </p>
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                    <Flag size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-2">
                                        {aboutData.missionTitle || 'Our Mission'}
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        {aboutData.missionContent}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={aboutData.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"}
                                alt="Institution"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {/* Decorative background blur */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-primary-100 rounded-3xl blur-3xl opacity-50" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutInstitution;
