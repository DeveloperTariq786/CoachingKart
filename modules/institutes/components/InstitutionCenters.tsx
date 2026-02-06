'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { INSTITUTION_CENTERS } from '@/core/constants';

interface InstitutionCentersProps {
    institutionName?: string;
}

const InstitutionCenters: React.FC<InstitutionCentersProps> = ({ institutionName = 'Elite Academy' }) => {
    const centerCount = INSTITUTION_CENTERS.length;

    return (
        <section className="py-16 md:py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <MapPin size={16} />
                        <span>Our Centers</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Visit Our Centers
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg">
                        <span className="font-semibold text-primary-600">{institutionName}</span> has {centerCount} convenient {centerCount === 1 ? 'location' : 'locations'} to serve you.
                    </p>
                </div>

                {/* Centers Grid - Optimized for 3-4 centers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {INSTITUTION_CENTERS.map((center) => (
                        <div
                            key={center.id}
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-video overflow-hidden">
                                <Image
                                    src={center.imageUrl}
                                    alt={center.cityName}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white font-bold text-xl drop-shadow-lg">
                                        {center.cityName}
                                    </h3>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <div className="flex flex-col gap-3 text-sm text-slate-600">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                                            <MapPin size={14} />
                                        </div>
                                        <span className="line-clamp-2">123 Main Street, {center.cityName}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                                            <Phone size={14} />
                                        </div>
                                        <span>+91 98765 43210</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutionCenters;
