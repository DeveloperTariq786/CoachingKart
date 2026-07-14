'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

/* Reusable small phone mockup — image always visible */
const SmallPhone: React.FC<{ imageSrc: string; imageAlt: string }> = ({ imageSrc, imageAlt }) => (
    <div className="relative border-slate-900 bg-slate-900 border-[8px] rounded-[1.8rem] h-[200px] w-[100px] shadow-xl flex-shrink-0 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-3 bg-slate-900 flex justify-center items-center z-20">
            <div className="w-8 h-1.5 bg-black rounded-full" />
        </div>
        {/* Screen — image always shown */}
        <div className="absolute inset-0">
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                unoptimized
            />
        </div>
    </div>
);

const AppPromotion: React.FC = () => {
    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="relative rounded-3xl bg-gradient-to-r from-primary-50 via-primary-50/70 to-blue-50/50 border border-primary-100/80 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">

                    {/* Left content column */}
                    <div className="flex-1 space-y-8 z-10 max-w-2xl">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                Join 15 Million students on the app today!
                            </h2>
                        </div>

                        {/* Feature list */}
                        <ul className="space-y-4">
                            {[
                                "Live & recorded classes available at ease",
                                "Dashboard for progress tracking",
                                "Lakhs of practice questions"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-sm">
                                        <Check className="w-4 h-4 stroke-[3]" />
                                    </div>
                                    <span className="text-slate-800 text-base md:text-lg font-medium">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* App Stores badges */}
                        <div className="flex flex-wrap gap-4 pt-2">

                            {/* Google Play Store — official badge image */}
                            <a
                                href="#"
                                className="transition-all duration-300 hover:scale-105 active:scale-95 shadow-md rounded-xl overflow-hidden"
                                aria-label="Get it on Google Play"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Get it on Google Play"
                                    width={135}
                                    height={40}
                                    className="h-10 w-auto"
                                    unoptimized
                                />
                            </a>

                            {/* Apple App Store — official badge image */}
                            <a
                                href="#"
                                className="transition-all duration-300 hover:scale-105 active:scale-95 shadow-md rounded-xl overflow-hidden"
                                aria-label="Download on the App Store"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt="Download on the App Store"
                                    width={135}
                                    height={40}
                                    className="h-10 w-auto"
                                    unoptimized
                                />
                            </a>

                        </div>
                    </div>

                    {/* Right Mockup column — big phone center, small phones flanking */}
                    <div className="relative w-full max-w-[420px] h-[360px] flex-shrink-0 select-none">

                        {/* Small phone — LEFT */}
                        <div className="absolute left-0 bottom-6 z-10 opacity-90">
                            <SmallPhone imageSrc="/images/newi.webp" imageAlt="Mock Tests Screen" />
                        </div>

                        {/* Big phone — CENTER, image always visible */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 border-slate-900 bg-slate-900 border-[10px] rounded-[2.2rem] h-[300px] w-[150px] shadow-2xl overflow-hidden">
                            {/* Camera Notch */}
                            <div className="absolute top-0 inset-x-0 h-4 bg-slate-900 flex justify-center items-center z-20">
                                <div className="w-10 h-2 bg-black rounded-full" />
                            </div>
                            {/* Screen — image always shown */}
                            <div className="absolute inset-0">
                                <Image
                                    src="/images/newi.webp"
                                    alt="App Interface Mockup"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Small phone — RIGHT */}
                        <div className="absolute right-0 bottom-6 z-10 opacity-90">
                            <SmallPhone imageSrc="/images/newi.webp" imageAlt="Progress Tracking Screen" />
                        </div>




                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppPromotion;