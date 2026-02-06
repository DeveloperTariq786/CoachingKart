'use client';

import React from 'react';

const InstitutionStats: React.FC = () => {
    const stats = [
        {
            value: '10k+',
            label: 'ACTIVE STUDENTS',
        },
        {
            value: '15+',
            label: 'YEARS EXPERIENCE',
        },
        {
            value: '98%',
            label: 'SUCCESS RATE',
        },
    ];

    return (
        <section className="bg-white py-16 md:py-20 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center justify-center text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2 tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutionStats;
