'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const galleryImages = [
    { src: 'https://picsum.photos/id/10/800/600', alt: 'Classroom' },
    { src: 'https://picsum.photos/id/20/800/600', alt: 'Library' },
    { src: 'https://picsum.photos/id/30/800/600', alt: 'Laboratory' },
    { src: 'https://picsum.photos/id/40/800/600', alt: 'Student Area' },
    { src: 'https://picsum.photos/id/50/800/600', alt: 'Campus View' },
    { src: 'https://picsum.photos/id/60/800/600', alt: 'Faculty Room' },
    { src: 'https://picsum.photos/id/70/800/600', alt: 'Auditorium' },
    { src: 'https://picsum.photos/id/80/800/600', alt: 'Discussion Hub' },
    { src: 'https://picsum.photos/id/90/800/600', alt: 'Sports Complex' },
];

export default function GalleryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const formattedName = slug ? slug.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Elite Academy';

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Our <span className="text-primary-600">Gallery</span>
                    </h1>
                    <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full mb-8"></div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                        Explore the environment where excellence is nurtured. A glimpse into the life at {formattedName}.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-white text-xl font-bold">{image.alt}</p>
                                    <div className="w-10 h-1 bg-primary-500 mt-2 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
