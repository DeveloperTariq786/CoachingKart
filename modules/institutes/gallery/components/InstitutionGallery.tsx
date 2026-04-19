'use client';

import React from 'react';
import Image from 'next/image';
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
                    Our <span className="text-primary-600">Gallery</span>
                </h1>
                <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full mb-8"></div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                    Explore the environment where excellence is nurtured. A glimpse into the life at {formattedName}.
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
