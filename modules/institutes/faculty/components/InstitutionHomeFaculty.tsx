'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { GraduationCap } from 'lucide-react';
import { useFaculties } from '@/modules/institutes/faculty/hooks/useFaculties';

interface InstitutionHomeFacultyProps {
    institutionId?: string;
}

const InstitutionHomeFaculty: React.FC<InstitutionHomeFacultyProps> = ({ institutionId }) => {
    const params = useParams();
    const slug = params.slug as string;

    const { data: facultiesResponse, isLoading } = useFaculties(
        institutionId
            ? { institutionId, limit: 10 }
            : undefined
    );

    const faculties = facultiesResponse?.data || [];

    return (
        <section className="py-8 md:py-16 bg-slate-50/50 border-t border-slate-100">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-primary-100 shadow-sm text-primary-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-2.5 sm:mb-4">
                        <GraduationCap size={14} className="sm:w-4 sm:h-4" />
                        <span>Educators</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-1.5 sm:mt-2 md:mt-3 mb-2 sm:mb-2.5 md:mb-4 tracking-tight">
                        Meet Our <span className="text-primary-600">Expert Faculty</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Learn from highly qualified educators dedicated to preparing you for competitive success.
                    </p>
                </div>

                {/* Faculty Grid - 5 per row */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Card
                                key={i}
                                className="border border-slate-100 shadow-sm rounded-xl md:rounded-2xl bg-white overflow-hidden"
                            >
                                <CardContent className="p-3 md:p-5 text-center flex flex-col items-center animate-pulse">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-slate-200 mx-auto mb-2.5 sm:mb-3 md:mb-4"></div>
                                    <div className="hidden md:block h-3 bg-slate-200 rounded w-16 mb-1.5"></div>
                                    <div className="h-3 bg-slate-200 rounded w-20 md:w-24 mb-1 md:mb-0.5"></div>
                                    <div className="h-2.5 bg-slate-200 rounded w-16 md:w-20 mb-1 md:mb-2.5"></div>
                                    <div className="hidden md:block h-2 bg-slate-200 rounded w-full"></div>
                                    <div className="hidden md:block h-2 bg-slate-200 rounded w-3/4 mt-1"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : faculties.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                        <p className="text-slate-400 text-xs sm:text-sm md:text-base">No faculty members found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
                        {faculties.map((member) => (
                            <Card
                                key={member.id}
                                className="group border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl md:rounded-2xl bg-white overflow-hidden"
                            >
                                <CardContent className="p-3 md:p-5 text-center flex flex-col items-center">
                                    {/* Avatar Container with hover effect */}
                                    <div className="relative mb-2.5 sm:mb-3 md:mb-4">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-slate-100 group-hover:ring-primary-100 transition-all duration-300 mx-auto">
                                            <Image
                                                src={member.profileImage}
                                                alt={member.name}
                                                width={96}
                                                height={96}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <span className="absolute bottom-0 right-0 bg-primary-600 text-white text-[8px] sm:text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                                            {member.experience}+ Yrs
                                        </span>
                                    </div>

                                    {/* Subject Badge */}
                                    <span className="hidden md:inline-block text-[9px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                                        {member.subject?.name}
                                    </span>

                                    {/* Name & Tag */}
                                    <h3 className="font-bold text-slate-800 text-xs md:text-sm mb-0.5 group-hover:text-primary-600 transition-colors duration-200 line-clamp-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-slate-400 text-[9px] sm:text-[10px] font-medium mb-1 md:mb-2.5 truncate w-full">{member.tag}</p>

                                    {/* Description */}
                                    <p className="hidden md:line-clamp-4 text-slate-500 text-[11px] leading-relaxed">
                                        {member.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* View All Faculty Button */}
                <div className="mt-6 sm:mt-8 md:mt-12 text-center">
                    <Link
                        href={`/${slug}/faculty`}
                        className="inline-flex items-center justify-center gap-2 text-primary-600 font-semibold text-xs sm:text-sm md:text-[16px] tracking-wide border-b border-dashed border-primary-600 pb-0.5 hover:text-primary-700 hover:border-primary-700 transition-all duration-200"
                    >
                        View All Faculty
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InstitutionHomeFaculty;
