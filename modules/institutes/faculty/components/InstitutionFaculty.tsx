'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
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
        <section className="py-12 md:py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                        Meet Our Expert Faculty
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Learn from the industry&apos;s best educators dedicated to your academic success. Our faculty brings years of specialized experience in various competitive disciplines.
                    </p>
                </div>

                {/* Department Tabs */}
                {isSubjectsLoading ? (
                    <div className="flex justify-center mb-8 md:mb-12">
                        <div className="animate-pulse flex gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-8 md:h-10 w-24 bg-slate-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                        {departmentTabs.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => handleTabClick(dept)}
                                className={cn(
                                    "px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors cursor-pointer",
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <Card key={i} className="border-foreground/10 shadow-sm overflow-hidden rounded-xl bg-background">
                                <CardContent className="p-5 md:p-6 text-center animate-pulse">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-foreground/5 mx-auto mb-4"></div>
                                    <div className="h-4 bg-foreground/5 rounded w-3/4 mx-auto mb-2"></div>
                                    <div className="h-3 bg-foreground/5 rounded w-1/2 mx-auto mb-3"></div>
                                    <div className="h-3 bg-foreground/5 rounded w-full mx-auto"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : faculties.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-sm md:text-base">No faculty members found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {faculties.map((member) => (
                            <Card key={member.id} className="border-foreground/10 shadow-sm overflow-hidden rounded-xl bg-background hover:shadow-lg transition-shadow">
                                <CardContent className="p-5 md:p-6 text-center">
                                    {/* Avatar with Experience Badge */}
                                    <div className="relative inline-block mb-4">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-foreground/5 mx-auto">
                                            <Image
                                                src={member.profileImage}
                                                alt={member.name}
                                                width={96}
                                                height={96}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <span className="absolute bottom-0 right-0 bg-primary-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                                            {member.experience}+ Yrs
                                        </span>
                                    </div>

                                    {/* Name & Role */}
                                    <h3 className="font-bold text-foreground text-sm md:text-base mb-0.5">{member.name}</h3>
                                    <p className="text-primary-600 text-xs md:text-sm font-medium mb-1">{member.tag}</p>
                                    <p className="text-slate-400 text-[11px] md:text-xs mb-3">{member.subject?.name}</p>

                                    {/* Description */}
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3">
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
