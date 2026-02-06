'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FEATURED_TUITIONS } from '@/core/constants';
import { InstitutionCard } from '@/core/components/common';
import { Button } from '@/core/components/ui/button';

const NearByCenters: React.FC = () => {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Nearby Coachings</h2>
                        <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                            Explore top rated coachings in your neighborhood.
                        </p>
                    </div>

                    <Button variant="link" asChild className="hidden md:flex p-0 h-auto text-primary-600 font-bold hover:text-primary-700 transition-all items-center gap-1 group decoration-2 hover:underline underline-offset-4">
                        <Link href="/find-tuitions">
                            View all
                            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                    {FEATURED_TUITIONS.map((tuition) => (
                        <InstitutionCard key={tuition.id} tuition={tuition} />
                    ))}
                </div>

                <div className="mt-16 text-center md:hidden">
                    <Button asChild variant="outline" className="w-full py-7 text-base font-bold rounded-2xl border-slate-200 text-slate-700 bg-white">
                        <Link href="/find-tuitions">
                            View all
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default NearByCenters;
