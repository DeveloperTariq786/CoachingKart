'use client';

import React from 'react';
import { Search, MapPin, Smartphone } from 'lucide-react';

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-16 bg-white overflow-hidden">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                <div className="text-center mb-10">
                    <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">Workflow</span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">How CoachingKart Works</h2>
                    <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                        Bridging physical classrooms with digital convenience.
                    </p>

                </div>

                <div className="max-w-4xl mx-auto">



                    {/* For Students */}
                    <div className="relative">
                        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 relative overflow-hidden h-full border border-slate-100">
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-200 rounded-full opacity-50"></div>


                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">
                                        <Search className="w-6 h-6 text-slate-700" />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-lg font-semibold text-slate-900">Discover Nearby Centers</h4>
                                        <p className="mt-1 text-slate-600 text-sm">Find top-rated coaching institutes near you by searching for exams, subjects, or institutions.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">
                                        <MapPin className="w-6 h-6 text-slate-700" />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-lg font-semibold text-slate-900">Visit & Enroll Offline</h4>
                                        <p className="mt-1 text-slate-600 text-sm">Visit the center, interact with teachers, attend classes, and enroll with confidence.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">
                                        <Smartphone className="w-6 h-6 text-slate-700" />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-lg font-semibold text-slate-900">Learn Anytime, Anywhere</h4>
                                        <p className="mt-1 text-slate-600 text-sm">Using CoachingKart Platform get access to recorded lectures, notes, and updates online so you never miss a class.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
