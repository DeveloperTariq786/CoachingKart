'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { MOCK_FACULTY, FACULTY_DEPARTMENTS } from '@/core/constants';

const InstitutionFaculty: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All Departments');

    const filteredFaculty = activeTab === 'All Departments'
        ? MOCK_FACULTY
        : MOCK_FACULTY.filter(member => member.department === activeTab);

    return (
        <section className="py-12 md:py-16 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                        Meet Our Expert Faculty
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Learn from the industry&apos;s best educators dedicated to your academic success. Our faculty brings years of specialized experience in various competitive disciplines.
                    </p>
                </div>

                {/* Department Tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                    {FACULTY_DEPARTMENTS.map((dept) => (
                        <button
                            key={dept}
                            onClick={() => setActiveTab(dept)}
                            className={cn(
                                "px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors",
                                activeTab === dept
                                    ? "bg-primary-600 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            {dept}
                        </button>
                    ))}
                </div>

                {/* Faculty Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredFaculty.map((member) => (
                        <Card key={member.id} className="border-slate-200 shadow-sm overflow-hidden rounded-xl bg-white hover:shadow-lg transition-shadow">
                            <CardContent className="p-5 md:p-6 text-center">
                                {/* Avatar with Experience Badge */}
                                <div className="relative inline-block mb-4">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-slate-100 mx-auto">
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <span className="absolute bottom-0 right-0 bg-primary-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                                        {member.experience} Yrs
                                    </span>
                                </div>

                                {/* Name & Role */}
                                <h3 className="font-bold text-slate-900 text-sm md:text-base mb-0.5">{member.name}</h3>
                                <p className="text-primary-600 text-xs md:text-sm font-medium mb-3">{member.role}</p>

                                {/* Description */}
                                <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3">
                                    {member.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutionFaculty;
