'use client';

import React from 'react';
import { TRUST_FEATURES } from '@/core/constants';

const getColorClasses = (color: string) => {
    switch (color) {
        case 'blue': return 'bg-blue-50 text-blue-600';
        case 'indigo': return 'bg-indigo-50 text-indigo-600';
        case 'amber': return 'bg-amber-50 text-amber-600';
        case 'emerald': return 'bg-emerald-50 text-emerald-600';
        default: return 'bg-slate-50 text-slate-600';
    }
};

const TrustSection: React.FC = () => {
    return (
        <section className="py-24 bg-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">What we Promise</h2>
                    <p className="text-lg text-slate-600">
                        We are building the trust layer for offline education, ensuring a seamless experience for students and parents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TRUST_FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${getColorClasses(feature.color)}`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
