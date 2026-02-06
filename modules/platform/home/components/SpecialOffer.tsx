'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/core/components/ui/button';

const SpecialOffer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 12,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const timeBlocks = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500 opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-50 text-xs font-semibold tracking-wide uppercase mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                            Limited Time Admission Offer
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            Unlock Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">Dream College</span>
                        </h2>

                        <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Enroll in our premium Board & JEE batches today. Get instant access to recorded lectures,
                            verified study materials, and 1-on-1 mentorship.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button className="h-14 px-8 rounded-full bg-white text-primary-700 font-bold text-base shadow-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 group">
                                <GraduationCap className="mr-2 w-5 h-5 text-primary-600" />
                                Claim Offer Now
                            </Button>
                        </div>
                    </div>

                    {/* Right: Countdown & Visual Card */}
                    <div className="flex-1 w-full max-w-lg">
                        {/* Mobile Badge: Show only on small screens */}
                        <div className="lg:hidden flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-50 text-xs font-semibold tracking-wide uppercase">
                                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                                Limited Time Admission Offer
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-all duration-500">

                            {/* Glass Reflective Effect */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="text-center mb-8">
                                <p className="text-blue-100 text-sm font-medium uppercase tracking-widest mb-2">Offer Ends In</p>
                                <div className="flex justify-between items-center bg-black/20 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/5">
                                    {timeBlocks.map((block, index) => (
                                        <div key={block.label} className="flex flex-col items-center flex-1">
                                            <span className="text-3xl md:text-4xl font-bold text-white tabular-nums leading-none mb-1">
                                                {block.value.toString().padStart(2, '0')}
                                            </span>
                                            <span className="text-[10px] uppercase font-medium text-blue-200/70 tracking-wider">
                                                {block.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-2xl font-bold text-white mb-1">50%</div>
                                    <div className="text-xs text-blue-100 font-medium">Scholarship on Tuition Fees</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-2xl font-bold text-white mb-1">Free</div>
                                    <div className="text-xs text-blue-100 font-medium">All India Mock Test Series</div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SpecialOffer;