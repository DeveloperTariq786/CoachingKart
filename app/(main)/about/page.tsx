import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Monitor, Laptop, Award, MapPin } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white pt-16">

            {/* Hero */}
            <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-40 -z-10" />

                <div className="w-full px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                                Making <span className="text-primary-600">Offline Coaching</span> <br className="hidden md:block" />
                                Online & Accessible
                            </h1>
                            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                CoachingKart empowers educators to bring their expertise online. Manage your institution, courses, and students effortlessly—all without the cost and complexity of building your own infrastructure.
                            </p>
                            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                                <Link
                                    href="/institutions"
                                    className="px-8 py-4 rounded-full bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-900/20"
                                >
                                    Explore Platforms
                                </Link>
                                <Link
                                    href="https://institution.coachingkart.in/"
                                    target="_blank"
                                    className="px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-200 font-bold hover:bg-slate-50 transition-all"
                                >
                                    Register Institution
                                </Link>
                            </div>
                        </div>

                        {/* Image on the right */}
                        <div className="relative mt-12 lg:mt-0 flex justify-center">
                            <div className="relative w-full max-w-lg transition-transform hover:-translate-y-2 duration-500">
                                <div className="absolute inset-0 bg-primary-100 rounded-[2rem] rotate-3 translate-x-3 translate-y-3 -z-10"></div>
                                <Image
                                    src="/promotions/officenew.jpg"
                                    alt="CoachingKart Office"
                                    width={800}
                                    height={800}
                                    className="rounded-[2rem] border-8 border-white shadow-2xl object-cover relative z-10 w-full"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Concept - The Digital Operating System for Coaching Institutes */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="w-full px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                                The <span className="text-primary-600">Digital Operating System</span> <br /> for Coaching Institutes
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Why build from scratch when you can launch in minutes? CoachingKart provides a plug-and-play digital storefront for your coaching center. Customize your brand, manage your faculty, and reach students across the country.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Custom Branding (Logo & Themes)',
                                    'Faculty & Center Management',
                                    'Course & Batch Organization',
                                    'Performance & Result Tracking'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                                            <Sparkles size={14} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative group">
                            {/* Decorative background flash cards */}
                            <div className="absolute inset-0 bg-primary-100 rounded-3xl -rotate-3 transition-transform group-hover:-rotate-6 duration-500" />
                            <div className="absolute inset-0 bg-primary-600/10 rounded-3xl rotate-3 transition-transform group-hover:rotate-6 duration-500" />

                            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4 hover:-translate-y-2 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
                                        <Monitor className="text-primary-600" size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900">Live Classes</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Engage students in real-time with interactive virtual classrooms and seamless audio-video quality.</p>
                                </div>
                                <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4 hover:-translate-y-2 transition-all duration-300 md:mt-12">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                                        <Laptop className="text-orange-500" size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900">Recorded Content</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Let students learn at their own pace with stored lectures and 24/7 access to study materials.</p>
                                </div>
                                <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4 hover:-translate-y-2 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                                        <Award className="text-green-600" size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900">Proven Results</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Showcase your success stories and student performance with detailed analytics.</p>
                                </div>
                                <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4 hover:-translate-y-2 transition-all duration-300 md:mt-12">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                                        <MapPin className="text-purple-600" size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900">Multi-Center</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">Manage multiple offline locations smoothly through a single, unified digital dashboard.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
