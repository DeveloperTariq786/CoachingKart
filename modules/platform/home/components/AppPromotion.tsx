'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

/* Reusable small phone mockup — image always visible */
const SmallPhone: React.FC<{ imageSrc: string; imageAlt: string }> = ({ imageSrc, imageAlt }) => (
    <div className="relative border-slate-900 bg-slate-900 border-[6px] sm:border-[8px] rounded-[1.4rem] sm:rounded-[1.8rem] h-[160px] sm:h-[200px] w-[80px] sm:w-[100px] shadow-xl flex-shrink-0 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-2.5 sm:h-3 bg-slate-900 flex justify-center items-center z-20">
            <div className="w-6 sm:w-8 h-1 sm:h-1.5 bg-black rounded-full" />
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
        <section className="py-8 sm:py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-50 via-primary-50/70 to-blue-50/50 border border-primary-100/80 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-10 shadow-sm">

                    {/* Left content column */}
                    <div className="flex-1 space-y-6 md:space-y-8 z-10 max-w-2xl w-full">
                        <div className="space-y-3 sm:space-y-4 text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                                Your Offline Coaching, Now in Your Phone.
                            </h2>
                        </div>

                        {/* Feature list */}
                        <ul className="space-y-3 sm:space-y-4">
                            {[
                                "Access lectures & study materials anytime",
                                "Stay updated with your classes & batches",
                                "Learn, revise & practice wherever you go"
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-sm mt-0.5 sm:mt-0">
                                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                                    </div>
                                    <span className="text-slate-800 text-sm sm:text-base md:text-lg font-medium">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* App Stores badges */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1 md:pt-2">

                            {/* Google Play Store — official badge image */}
                            <div
                                className="shadow-md rounded-xl overflow-hidden opacity-80 cursor-not-allowed select-none"
                                aria-label="Get it on Google Play"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Get it on Google Play"
                                    width={135}
                                    height={40}
                                    className="h-9 sm:h-10 w-auto"
                                    unoptimized
                                />
                            </div>

                            {/* Apple App Store — official badge image */}
                            <div
                                className="shadow-md rounded-xl overflow-hidden opacity-80 cursor-not-allowed select-none"
                                aria-label="Download on the App Store"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt="Download on the App Store"
                                    width={135}
                                    height={40}
                                    className="h-9 sm:h-10 w-auto"
                                    unoptimized
                                />
                            </div>

                        </div>
                    </div>

                    {/* Right Mockup column — big phone center, small phones flanking */}
                    <div className="relative w-full max-w-[320px] sm:max-w-[420px] h-[250px] sm:h-[320px] md:h-[360px] flex-shrink-0 select-none mx-auto md:mx-0">

                        {/* Small phone — LEFT */}
                        <div className="absolute left-2 sm:left-0 bottom-4 sm:bottom-6 z-10 opacity-90">
                            <SmallPhone imageSrc="/images/app-ui.jpg" imageAlt="Mock Tests Screen" />
                        </div>

                        {/* Big phone — CENTER, image always visible */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 border-slate-900 bg-slate-900 border-[8px] sm:border-[10px] rounded-[1.8rem] sm:rounded-[2.2rem] h-[240px] sm:h-[300px] w-[120px] sm:w-[150px] shadow-2xl overflow-hidden">
                            {/* Camera Notch */}
                            <div className="absolute top-0 inset-x-0 h-3 sm:h-4 bg-slate-900 flex justify-center items-center z-20">
                                <div className="w-8 sm:w-10 h-1.5 sm:h-2 bg-black rounded-full" />
                            </div>
                            {/* Screen — image always shown */}
                            <div className="absolute inset-0">
                                <Image
                                    src="/images/app-ui.jpg"
                                    alt="App Interface Mockup"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Small phone — RIGHT */}
                        <div className="absolute right-2 sm:right-0 bottom-4 sm:bottom-6 z-10 opacity-90">
                            <SmallPhone imageSrc="/images/app-ui.jpg" imageAlt="Progress Tracking Screen" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppPromotion;