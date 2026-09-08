'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { useFaculties } from '@/modules/institutes/faculty/hooks/useFaculties';
import { useSubjects } from '@/modules/institutes/subjects/hooks/useSubjects';
import { Subject } from '@/modules/institutes/subjects/types/subject.types';

interface InstitutionFacultyProps {
    institutionId?: string;
}

const InstitutionFaculty: React.FC<InstitutionFacultyProps> = ({ institutionId }) => {
    const [activeTab, setActiveTab] = useState<string>('All Departments');
    const [activeSubjectId, setActiveSubjectId] = useState<string | undefined>(undefined);

    const { data: subjectsResponse, isLoading: isSubjectsLoading } = useSubjects(institutionId);

    const subjects: Subject[] = subjectsResponse?.data || [];
    const departmentTabs = ['All Departments', ...subjects.map(s => s.name)];

    // Fetch faculties — pass subjectId only when a specific department is selected
    const { data: facultiesResponse, isLoading: isFacultiesLoading } = useFaculties(
        institutionId
            ? { institutionId, ...(activeSubjectId ? { subjectId: activeSubjectId } : {}) }
            : undefined
    );

    const faculties = facultiesResponse?.data || [];

    const handleTabClick = (dept: string) => {
        setActiveTab(dept);
        if (dept === 'All Departments') {
            setActiveSubjectId(undefined);
        } else {
            const subject = subjects.find(s => s.name === dept);
            setActiveSubjectId(subject?.id);
        }
    };

    return (
        <section className="py-8 md:py-16 bg-background">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Section Header */}
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-primary-100 shadow-sm text-primary-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-2.5 sm:mb-4">
                        <GraduationCap size={14} className="sm:w-4 sm:h-4 text-primary-600" />
                        <span>Our Faculty</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-1.5 sm:mt-2 md:mt-3 mb-2 sm:mb-2.5 md:mb-4 tracking-tight">
                        Meet Our <span className="text-primary-600">Expert Faculty</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-[17px] leading-relaxed">
                        Learn from the industry&apos;s best educators dedicated to your academic success. Our faculty brings years of specialized experience in various competitive disciplines.
                    </p>
                </div>

                {/* Department Tabs */}
                {isSubjectsLoading ? (
                    <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
                        <div className="animate-pulse flex gap-1.5 sm:gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-7 sm:h-8 md:h-10 w-20 sm:w-24 bg-slate-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-6 sm:mb-8 md:mb-12">
                        {departmentTabs.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => handleTabClick(dept)}
                                className={cn(
                                    "px-3 sm:px-4 py-1.5 sm:py-2 text-xs md:text-sm font-medium rounded-lg transition-colors cursor-pointer",
                                    activeTab === dept
                                        ? "bg-primary-600 text-white shadow-md"
                                        : "text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                )}

                {/* Faculty Grid */}
                {isFacultiesLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5].map(i => (
                            <Card key={i} className="border-foreground/10 shadow-sm overflow-hidden rounded-xl md:rounded-2xl bg-background">
                                <CardContent className="p-3 md:p-6 text-center animate-pulse">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-foreground/5 mx-auto mb-2.5 sm:mb-3 md:mb-4"></div>
                                    <div className="h-3.5 sm:h-4 bg-foreground/5 rounded w-3/4 mx-auto mb-1.5 md:mb-2"></div>
                                    <div className="h-2.5 sm:h-3 bg-foreground/5 rounded w-1/2 mx-auto mb-2 md:mb-3"></div>
                                    <div className="hidden md:block h-3 bg-foreground/5 rounded w-full mx-auto"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : faculties.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                        <p className="text-slate-400 text-xs sm:text-sm md:text-base">No faculty members found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-6">
                        {faculties.map((member) => (
                            <Card key={member.id} className="border-foreground/10 shadow-sm overflow-hidden rounded-xl md:rounded-2xl bg-background hover:shadow-lg transition-shadow">
                                <CardContent className="p-3 md:p-6 text-center">
                                    {/* Avatar with Experience Badge */}
                                    <div className="relative inline-block mb-2.5 sm:mb-3 md:mb-4">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-foreground/5 mx-auto">
                                            <Image
                                                src={member.profileImage}
                                                alt={member.name}
                                                width={96}
                                                height={96}
                                                className="object-cover w-full h-full"
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
                                    <h3 className="font-bold text-slate-800 text-xs md:text-sm mb-0.5 line-clamp-1">{member.name}</h3>
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
            </div>
        </section>
    );
};

export default InstitutionFaculty;
