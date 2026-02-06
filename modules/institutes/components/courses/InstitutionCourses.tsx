'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { EXAM_CATEGORIES } from '@/core/constants';

const InstitutionCourses: React.FC = () => {
    const params = useParams();
    const slug = params.slug as string;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Our Courses
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Prepare for your dream career with our meticulously crafted course structures.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {EXAM_CATEGORIES.map((category) => (
                        <div
                            key={category.id}
                            className="group relative bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary-100 flex flex-col justify-between overflow-hidden"
                        >
                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    {category.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-8 pr-24">
                                    {category.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 group-hover:border-primary-200 group-hover:text-primary-700 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Action */}
                            <div className="relative z-10 mt-auto">
                                <Link
                                    href={`/${slug}/${category.id}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors"
                                >
                                    Explore
                                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                                        <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </div>

                            {/* Decorative Background & Icon */}
                            <div className={cn(
                                "absolute -right-6 top-1/2 -translate-y-1/2 w-48 h-64 rounded-l-full opacity-50 group-hover:scale-110 transition-transform duration-500",
                                category.color
                            )} />

                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                                <img
                                    src={category.icon}
                                    alt={category.title}
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/categories"
                        className="inline-block text-primary-600 font-bold hover:underline underline-offset-4 decoration-2"
                    >
                        View All
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InstitutionCourses;
