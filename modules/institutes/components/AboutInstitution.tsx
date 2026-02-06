'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, Flag } from 'lucide-react';

const AboutInstitution: React.FC = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content Column */}
                    <div>
                        <h3 className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-4">
                            Our Journey
                        </h3>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Legacy of <br className="hidden lg:block" />
                            Excellence in <br className="hidden lg:block" />
                            Science Education
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            Founded with a vision to revolutionize science coaching, Elite Science Academy has been at the forefront of academic excellence for over 15 years. We believe that every student has the potential to achieve greatness when provided with the right mentorship and environment.
                        </p>

                        <div className="space-y-8">
                            {/* Vision */}
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary-600">
                                    <Eye size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        To be the global leader in providing transformative education that empowers students to innovate and lead.
                                    </p>
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="flex gap-5">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary-600">
                                    <Flag size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        Nurturing talent through personalized guidance and a rigorous curriculum designed for competitive success.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
                                alt="Student studying"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {/* Decorative background blur */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-primary-100 rounded-3xl blur-3xl opacity-50" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutInstitution;
