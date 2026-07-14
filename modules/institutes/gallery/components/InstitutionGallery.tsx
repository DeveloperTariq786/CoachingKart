'use client';

import React from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';

interface InstitutionGalleryProps {
    institutionId?: string;
    formattedName: string;
}

const InstitutionGallery: React.FC<InstitutionGalleryProps> = ({ institutionId, formattedName }) => {
    const { data: response, isLoading } = useGallery(institutionId);

    const galleryItems = response?.data || [];

    if (isLoading) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Updated to lg:grid-cols-4 and gap-6 for better spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Increased placeholder array to 8 items to match a 4-column row */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="aspect-[4/3] rounded-3xl bg-slate-200 animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!galleryItems || galleryItems.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-slate-500">No gallery images found.</p>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10 pt-8 md:pt-10">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 bg-background px-4 py-1.5 rounded-full mb-4 border border-foreground/10 shadow-sm">
                    <ImageIcon size={14} className="text-primary-600" />
                    Our Gallery
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Our <span className="text-primary-600">Gallery</span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-[17px] leading-relaxed">
                    Explore the environment where excellence is nurtured. A glimpse into the life at {formattedName}.
                </p>
            </div>

            {/* Gallery Grid - Updated to responsive 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-background"
                    >
                        <Image
                            src={item.image}
                            alt={item.tag}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            // Updated sizes to include a 25vw calculation for the 4-column layout
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-white text-xl font-bold">{item.tag}</p>
                                <div className="w-10 h-1 bg-primary-500 mt-2 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstitutionGallery;