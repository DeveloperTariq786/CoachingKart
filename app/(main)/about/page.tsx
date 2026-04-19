import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Users, Sparkles, GraduationCap, ArrowRight, Monitor, Laptop, Award, MapPin } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white pt-16">

            {/* Hero */}
            <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-40 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                    src="/promotions/office.png"
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

            {/* Core Concept - The Shopify for Coaching */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                                The <span className="text-primary-600">&quot;Shopify&quot;</span> for <br /> Educational Institutions
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

            {/* Stats */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Empowering the Future of Learning</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Bridging the gap between traditional classrooms and digital convenience.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-2">
                            <div className="text-5xl font-extrabold text-primary-600">1000+</div>
                            <div className="text-slate-600 font-bold uppercase tracking-widest text-xs">Institutions Registered</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-extrabold text-primary-600">50,000+</div>
                            <div className="text-slate-600 font-bold uppercase tracking-widest text-xs">Active Students</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-extrabold text-primary-600">50+</div>
                            <div className="text-slate-600 font-bold uppercase tracking-widest text-xs">Cities Covered</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,1)_1px,transparent_1px)] bg-[length:32px_32px]" />
                </div>
                <div className="max-w-4xl mx-auto px-4 relative text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Make Your Coaching Digital?</h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        Join hundreds of institutions already using CoachingKart to scale their impact.
                    </p>
                    <Link
                        href="https://institution.coachingkart.in/"
                        target="_blank"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary-600 text-white font-bold text-lg hover:bg-primary-700 transition-all hover:scale-105 shadow-2xl shadow-primary-900/50"
                    >
                        Sign Up as Institution
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
