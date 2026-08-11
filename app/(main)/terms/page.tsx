import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, ShieldCheck, UserCheck, AlertCircle, CreditCard, Ban, Scale, Mail, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms & Conditions | CoachingKart',
    description: 'Read the Terms and Conditions governing your use of CoachingKart platform and services.',
};

export default function TermsAndConditionsPage() {
    const lastUpdated = 'August 11, 2026';

    const sections = [
        { id: 'acceptance', title: '1. Acceptance of Terms', icon: ShieldCheck },
        { id: 'services', title: '2. Platform Services', icon: FileText },
        { id: 'user-accounts', title: '3. User Accounts & Security', icon: UserCheck },
        { id: 'intellectual-property', title: '4. Intellectual Property', icon: Scale },
        { id: 'payments', title: '5. Payments & Billing', icon: CreditCard },
        { id: 'prohibited-activities', title: '6. Prohibited Conduct', icon: Ban },
        { id: 'limitation-liability', title: '7. Limitation of Liability', icon: AlertCircle },
        { id: 'contact', title: '8. Governing Law & Contact', icon: Mail },
    ];

    return (
        <main className="min-h-screen bg-white pt-16">
            {/* Hero Section matching About Page style */}
            <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-40 -z-10" />

                <div className="w-full px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                                Terms & <span className="text-primary-600">Conditions</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Please review these Terms and Conditions carefully. They govern your access to and use of CoachingKart web platform and services.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-medium border-t border-slate-100 pt-4">
                                <span>Last Updated: {lastUpdated}</span>
                                <span>•</span>
                                <span>Binding Agreement</span>
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

            {/* Main Content Body */}
            <section className="py-12 md:py-20 bg-slate-50 border-y border-slate-100">
                <div className="w-full px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* Quick Navigation Sidebar */}
                        <aside className="lg:col-span-3 hidden lg:block">
                            <div className="sticky top-28 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                                    On This Page
                                </h3>
                                <nav className="space-y-1">
                                    {sections.map((sec) => {
                                        const Icon = sec.icon;
                                        return (
                                            <a
                                                key={sec.id}
                                                href={`#${sec.id}`}
                                                className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-100 hover:text-primary-600 transition-colors"
                                            >
                                                <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>{sec.title}</span>
                                            </a>
                                        );
                                    })}
                                </nav>

                                <div className="pt-4 border-t border-slate-100 mt-4 px-3">
                                    <p className="text-xs text-slate-400 leading-relaxed mb-2">Questions about these terms?</p>
                                    <a
                                        href="mailto:hello@coachingkart.in"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:underline"
                                    >
                                        Contact Legal Team <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Legal Content */}
                        <div className="lg:col-span-9 space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm text-slate-700 text-sm leading-relaxed">
                            
                            {/* Section 1 */}
                            <div id="acceptance" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <ShieldCheck className="w-5 h-5 text-primary-600 shrink-0" />
                                    1. Acceptance of Terms
                                </h2>
                                <p>
                                    By accessing, registering for, or using the CoachingKart platform (&quot;Service&quot;), you agree to be bound by these Terms & Conditions. If you do not agree to all terms, you must not access or use our services.
                                </p>
                                <p>
                                    If you are agreeing to these Terms on behalf of an educational institution, coaching center, or organization, you represent that you have full legal authority to bind that entity.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div id="services" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <FileText className="w-5 h-5 text-primary-600 shrink-0" />
                                    2. Platform Services
                                </h2>
                                <p>
                                    CoachingKart provides digital infrastructure for educational institutes, tutors, and students. Our platform facilitates online course delivery, live virtual classrooms, batch management, student performance tracking, and digital administrative operations.
                                </p>
                                <p>
                                    CoachingKart acts as a facilitator and platform provider. Content delivered by specific institutions (e.g. lectures, study materials, exam prep) remains the responsibility of the respective educational provider.
                                </p>
                            </div>

                            {/* Section 3 */}
                            <div id="user-accounts" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <UserCheck className="w-5 h-5 text-primary-600 shrink-0" />
                                    3. User Accounts & Security
                                </h2>
                                <p>To use most features of CoachingKart, you must register for an account. You agree to:</p>
                                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
                                    <li>Provide accurate, current, and complete registration information.</li>
                                    <li>Maintain the confidentiality of your login credentials and restrict access to your device.</li>
                                    <li>Promptly notify us of any unauthorized use or security breach related to your account.</li>
                                    <li>Remain responsible for all activities occurring under your account.</li>
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div id="intellectual-property" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <Scale className="w-5 h-5 text-primary-600 shrink-0" />
                                    4. Intellectual Property Rights
                                </h2>
                                <p>
                                    The CoachingKart platform software, design, logos, trademarks, and source code are the exclusive property of CoachingKart. You receive a limited, non-exclusive, non-transferable license to access and use the platform for educational purposes.
                                </p>
                                <p>
                                    Study materials, course video recordings, and institution logos uploaded by educational partners remain the intellectual property of the respective institutions or creators.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div id="payments" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <CreditCard className="w-5 h-5 text-primary-600 shrink-0" />
                                    5. Payments, Fees & Billing
                                </h2>
                                <p>
                                    Payments for courses, institute subscriptions, or platform features are processed through authorized payment gateway partners. All applicable fees, taxes, and payment terms will be clearly displayed prior to transaction confirmation.
                                </p>
                                <p>
                                    Refund policies for course enrollments are subject to the specific terms set by the operating institution or CoachingKart refund guidelines.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div id="prohibited-activities" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <Ban className="w-5 h-5 text-primary-600 shrink-0" />
                                    6. Prohibited Conduct
                                </h2>
                                <p>Users agree not to engage in any of the following activities on CoachingKart:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100">
                                        <h4 className="font-semibold text-red-900 mb-1 text-xs">Unauthorized Distribution</h4>
                                        <p className="text-xs text-red-600/80">Downloading, recording, or redistributing course content without explicit permission.</p>
                                    </div>
                                    <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100">
                                        <h4 className="font-semibold text-red-900 mb-1 text-xs">Account Sharing</h4>
                                        <p className="text-xs text-red-600/80">Selling, renting, or sharing individual account access with unauthorized third parties.</p>
                                    </div>
                                    <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100">
                                        <h4 className="font-semibold text-red-900 mb-1 text-xs">Platform Abuse</h4>
                                        <p className="text-xs text-red-600/80">Attempting to reverse engineer, disrupt, or bypass platform security controls.</p>
                                    </div>
                                    <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100">
                                        <h4 className="font-semibold text-red-900 mb-1 text-xs">Harassment</h4>
                                        <p className="text-xs text-red-600/80">Posting abusive, deceptive, or inappropriate materials in interactive sessions.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 7 */}
                            <div id="limitation-liability" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <AlertCircle className="w-5 h-5 text-primary-600 shrink-0" />
                                    7. Limitation of Liability
                                </h2>
                                <p>
                                    CoachingKart is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While we strive for maximum uptime and seamless delivery, we do not guarantee uninterrupted operational availability.
                                </p>
                                <p>
                                    To the fullest extent permitted by law, CoachingKart shall not be liable for indirect, incidental, or consequential damages arising from service interruption, data loss, or content inaccuracy.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div id="contact" className="scroll-mt-28 space-y-4 pt-4 border-t border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                                    <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                                    8. Governing Law & Contact Information
                                </h2>
                                <p>
                                    These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to jurisdiction of applicable Indian courts.
                                </p>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                                    <p className="font-semibold text-slate-900 text-sm">CoachingKart Legal Affairs</p>
                                    <p className="text-xs text-slate-600">Email: <a href="mailto:hello@coachingkart.in" className="text-primary-600 underline">hello@coachingkart.in</a></p>
                                    <p className="text-xs text-slate-600">Phone: <a href="tel:+917889396003" className="text-primary-600 underline">+91 7889396003</a></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
