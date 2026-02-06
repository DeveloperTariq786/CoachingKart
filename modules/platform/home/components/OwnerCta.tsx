'use client';

import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const OwnerCta: React.FC = () => {
    return (
        <section id="partner-with-us" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-800 rounded-3xl overflow-hidden shadow-2xl relative">

                    {/* Abstract Background Patterns */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">

                        {/* Text Content */}
                        <div className="text-left">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-50 font-medium text-sm mb-4">
                                For Institute Owners
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                Scale Your Offline Center with <span className="text-blue-200">Digital Power</span>
                            </h2>
                            <p className="text-base text-blue-100 mb-6 max-w-lg leading-relaxed">
                                Don't just compete—dominate your local market. Get a premium listing, manage batches digitally, and provide students with a modern hybrid learning experience.
                            </p>

                            <ul className="space-y-3 mb-6">
                                {[
                                    'Premium listing with "Verified" badge',
                                    'Student management dashboard',
                                    'Upload notes & videos',
                                    'Direct inquiries'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center text-white/90 font-medium text-sm">
                                        <CheckCircle className="w-4 h-4 mr-3 text-cyan-300 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Card / Visual */}
                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 text-center shadow-xl">
                                <h3 className="text-xl font-bold text-white mb-2">Partner with us</h3>
                                <p className="text-blue-100 mb-6 text-sm">Join 500+ institutes growing with ClassroomConnect.</p>

                                <div className="space-y-4">
                                    <button className="w-full bg-white text-slate-900 font-bold text-base py-3 rounded-xl shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 flex items-center justify-center group">
                                        Register Institute for Free
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default OwnerCta;
