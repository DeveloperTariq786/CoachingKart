'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide, Autoplay, Pagination } from '@/core/lib/utils/swiper';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';

interface Student {
    id: string;
    name: string;
    rank: string;
    imageUrl: string;
}

const ORIGINAL_PERFORMERS: Student[] = [
    { id: '1', name: 'Utkarsh Awadhiya', rank: 'AIR 2', imageUrl: 'https://picsum.photos/id/101/400/500' },
    { id: '2', name: 'Krishang Joshi', rank: 'AIR 3', imageUrl: 'https://picsum.photos/id/102/400/500' },
    { id: '3', name: 'Avika Aggarwal', rank: 'AIR 5', imageUrl: 'https://picsum.photos/id/103/400/500' },
    { id: '4', name: 'Harsh Kedawat', rank: 'AIR 9', imageUrl: 'https://picsum.photos/id/104/400/500' },
    { id: '5', name: 'Aditya Sharma', rank: 'AIR 1', imageUrl: 'https://picsum.photos/id/105/400/500' },
];

// Duplicate for smoother infinite looping
const TOP_PERFORMERS = [...ORIGINAL_PERFORMERS, ...ORIGINAL_PERFORMERS];

const STATS = [
    { value: '3392*', label: 'NEET Qualifiers' },
    { value: '1900+', label: 'JEE Main/Advanced' },
    { value: '25+', label: 'In Top 100 AIR' },
    { value: '12K', label: 'Board Top Scorers' },
];

const InstitutionResultsHeader: React.FC = () => {
    return (
        <div className="relative pt-24 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="border-r border-b border-slate-200" />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">
                    Our <span className="text-primary-600 block sm:inline">Achievements</span>
                </h2>
                <p className="text-sm md:text-base text-slate-500 mb-10 font-medium max-w-xl mx-auto">
                    We are setting new benchmarks of excellence year after year.
                </p>

                {/* Swiper Slider Section - Robust Infinite Loop */}
                <div className="relative w-full max-w-4xl mx-auto pb-8">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={15}
                        slidesPerView={1.8}
                        centeredSlides={true}
                        loop={true}
                        speed={1000}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false
                        }}
                        pagination={{ clickable: true, el: '.custom-pagination' }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4.5 },
                        }}
                        className="!overflow-visible"
                    >
                        {TOP_PERFORMERS.map((student, idx) => (
                            <SwiperSlide key={`${student.id}-${idx}`}>
                                {({ isActive }) => (
                                    <div className={cn(
                                        "relative transition-all duration-700 ease-in-out transform",
                                        isActive ? "scale-105 opacity-100 z-10" : "scale-90 opacity-40 grayscale blur-[0.5px]"
                                    )}>
                                        <Card className="overflow-hidden border-2 border-white shadow-xl rounded-3xl bg-slate-50">
                                            <CardContent className="p-0 relative aspect-[4/5]">
                                                <Image src={student.imageUrl} alt={student.name} fill className="object-cover" />

                                                {/* Float Info Card */}
                                                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-md flex flex-col items-center">
                                                    <p className="text-lg font-black text-primary-500">{student.rank}</p>
                                                    <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter line-clamp-1 text-center">{student.name}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="custom-pagination flex justify-center gap-1.5 mt-10 [&_.swiper-pagination-bullet]:w-6 [&_.swiper-pagination-bullet]:h-1 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-200 [&_.swiper-pagination-bullet-active]:bg-primary-500 [&_.swiper-pagination-bullet-active]:w-8 transition-all" />
                </div>

                {/* Smaller Stats Bar */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 py-8 px-4 max-w-4xl mx-auto divide-x divide-slate-100">
                    {STATS.map((stat, i) => (
                        <div key={i} className="text-center px-2 first:divide-none">
                            <p className="text-xl md:text-2xl font-black text-primary-600 mb-0.5">{stat.value}</p>
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstitutionResultsHeader;
