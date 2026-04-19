import React from 'react';
import { Briefcase, Plane, Coffee, Heart, GraduationCap, ArrowRight, MapPin, Clock } from 'lucide-react';

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white pt-16">

            {/* Hero */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold uppercase tracking-wider mb-8">
                        We&apos;re Hiring
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                        Join our mission to <br className="hidden md:block" />
                        <span className="text-primary-600">bring coaching online</span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        We&apos;re building the digital bridge that empowers offline institutions to thrive. Join a team that&apos;s passionate about making quality coaching accessible to every student, everywhere.
                    </p>
                </div>
            </section>

            {/* Perks */}
            <section className="py-12 md:py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Why Join Us?</h2>
                        <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">A work culture that values growth, flexibility, and impact.</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3 hover:shadow-lg hover:border-primary-200 transition-all">
                            <Heart className="w-8 h-8 text-primary-500 mx-auto" />
                            <h3 className="font-bold text-slate-900 text-sm">Passionate Team</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Work with driven individuals in education tech.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3 hover:shadow-lg hover:border-primary-200 transition-all">
                            <GraduationCap className="w-8 h-8 text-primary-500 mx-auto" />
                            <h3 className="font-bold text-slate-900 text-sm">Growth</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Ample opportunities to learn and grow fast.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3 hover:shadow-lg hover:border-primary-200 transition-all">
                            <Plane className="w-8 h-8 text-primary-500 mx-auto" />
                            <h3 className="font-bold text-slate-900 text-sm">Flexible Remote</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Work from anywhere with flexible hours.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3 hover:shadow-lg hover:border-primary-200 transition-all">
                            <Coffee className="w-8 h-8 text-primary-500 mx-auto" />
                            <h3 className="font-bold text-slate-900 text-sm">Perks & Benefits</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Health benefits and fun team activities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Openings */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-10">
                        <Briefcase className="w-6 h-6 text-primary-600" />
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Current Openings</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Job 1 */}
                        <div className="p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-primary-200 hover:bg-white transition-all">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1.5">Full Stack Developer</h3>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Full-time</span>
                                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Remote</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2-4 Years</span>
                                </div>
                            </div>
                            <button className="px-5 py-2.5 rounded-full bg-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider group-hover:bg-primary-600 group-hover:text-white transition-all shrink-0 cursor-pointer">
                                Apply Now
                            </button>
                        </div>

                        {/* Job 2 */}
                        <div className="p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-primary-200 hover:bg-white transition-all">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1.5">UI/UX Designer</h3>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Full-time</span>
                                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Remote</span>
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 1-3 Years</span>
                                </div>
                            </div>
                            <button className="px-5 py-2.5 rounded-full bg-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider group-hover:bg-primary-600 group-hover:text-white transition-all shrink-0 cursor-pointer">
                                Apply Now
                            </button>
                        </div>
                    </div>

                    {/* Open Application */}
                    <div className="mt-10 p-8 md:p-10 text-center rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200">
                        <h4 className="font-bold text-slate-700 mb-2 text-lg">Don&apos;t see a perfect fit?</h4>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm">Tell us about yourself and we&apos;ll get back to you when a matching role opens up.</p>
                        <a
                            href="mailto:careers@coachingkart.com"
                            className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all"
                        >
                            Send us your resume
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
