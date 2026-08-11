import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Eye, Lock, Database, UserCheck, Bell, FileText, Mail, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy | CoachingKart',
    description: 'Learn how CoachingKart collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
    const lastUpdated = 'August 11, 2026';

    const sections = [
        { id: 'introduction', title: '1. Introduction & Scope', icon: Shield },
        { id: 'information-collected', title: '2. Information We Collect', icon: Database },
        { id: 'how-we-use', title: '3. How We Use Your Data', icon: Eye },
        { id: 'sharing-disclosure', title: '4. Data Sharing & Third Parties', icon: UserCheck },
        { id: 'data-security', title: '5. Security & Retention', icon: Lock },
        { id: 'user-rights', title: '6. Your Privacy Rights', icon: Bell },
        { id: 'cookies', title: '7. Cookies & Tracking', icon: FileText },
        { id: 'contact', title: '8. Contact Us', icon: Mail },
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
                                Privacy <span className="text-primary-600">Policy</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                At CoachingKart, we take your privacy seriously. Learn how we handle, protect, and process your personal information across our platform.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-medium border-t border-slate-100 pt-4">
                                <span>Last Updated: {lastUpdated}</span>
                                <span>•</span>
                                <span>Applies to all users & institutions</span>
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
                                    <p className="text-xs text-slate-400 leading-relaxed mb-2">Have privacy concerns?</p>
                                    <a
                                        href="mailto:hello@coachingkart.in"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:underline"
                                    >
                                        Contact Support <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Legal Content */}
                        <div className="lg:col-span-9 space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm text-slate-700 text-sm leading-relaxed">
                            
                            {/* Section 1 */}
                            <div id="introduction" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <Shield className="w-5 h-5 text-primary-600 shrink-0" />
                                    1. Introduction & Scope
                                </h2>
                                <p>
                                    Welcome to CoachingKart (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). CoachingKart provides digital platform solutions enabling educational institutions and coaching centers to manage courses, students, live sessions, and academic administrative operations.
                                </p>
                                <p>
                                    This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of information obtained through our website (<strong className="text-slate-900">coachingkart.in</strong>), mobile applications, and connected services.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div id="information-collected" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <Database className="w-5 h-5 text-primary-600 shrink-0" />
                                    2. Information We Collect
                                </h2>
                                <p>We collect information to provide better services to all our users. Information is collected in the following ways:</p>
                                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
                                    <li>
                                        <strong className="text-slate-900">Personal Information:</strong> Name, email address, phone number, profile photo, and password provided when registering an account.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900">Academic & Institutional Details:</strong> Institution name, enrolled courses, batch details, test scores, and attendance records.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900">Usage & Technical Data:</strong> IP address, device type, browser specifications, operating system, and interaction analytics within the app.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900">Payment & Transaction Data:</strong> Transaction histories and payment confirmation details processed via secure payment gateways. We do not store raw credit card numbers.
                                    </li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div id="how-we-use" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <Eye className="w-5 h-5 text-primary-600 shrink-0" />
                                    3. How We Use Your Data
                                </h2>
                                <p>Your information is utilized for the following core purposes:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <h4 className="font-semibold text-slate-900 mb-1 text-xs">Service Provision</h4>
                                        <p className="text-xs text-slate-500">Delivering interactive classes, course material, and platform features.</p>
                                    </div>
                                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <h4 className="font-semibold text-slate-900 mb-1 text-xs">Communication</h4>
                                        <p className="text-xs text-slate-500">Sending class reminders, result updates, and administrative alerts.</p>
                                    </div>
                                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <h4 className="font-semibold text-slate-900 mb-1 text-xs">Platform Improvement</h4>
                                        <p className="text-xs text-slate-500">Analyzing usage metrics to enhance overall platform performance.</p>
                                    </div>
                                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <h4 className="font-semibold text-slate-900 mb-1 text-xs">Security & Support</h4>
                                        <p className="text-xs text-slate-500">Preventing unauthorized access, fraud, and providing technical support.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div id="sharing-disclosure" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <UserCheck className="w-5 h-5 text-primary-600 shrink-0" />
                                    4. Data Sharing & Third Parties
                                </h2>
                                <p>We do not sell or rent your personal data to third parties. We share data only in the following necessary contexts:</p>
                                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                                    <li><strong>With Educational Institutions:</strong> If you are enrolled in an institution hosted on CoachingKart, your academic records and profile are accessible to that institution&apos;s administrators and faculty.</li>
                                    <li><strong>Service Infrastructure Providers:</strong> Trusted third-party vendors (cloud hosting, notification delivery, payment gateways) bound by strict confidentiality agreements.</li>
                                    <li><strong>Legal Obligations:</strong> When required by law enforcement, legal proceedings, or to protect the safety and rights of CoachingKart users.</li>
                                </ul>
                            </div>

                            {/* Section 5 */}
                            <div id="data-security" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <Lock className="w-5 h-5 text-primary-600 shrink-0" />
                                    5. Data Security & Retention
                                </h2>
                                <p>
                                    We employ industry-standard technical and organizational security measures, including HTTPS encryption in transit, secure data storage access controls, and regular system audits.
                                </p>
                                <p>
                                    We retain personal information for as long as your account remains active or as required to fulfill our legal, accounting, and institutional service obligations.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div id="user-rights" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <Bell className="w-5 h-5 text-primary-600 shrink-0" />
                                    6. Your Privacy Rights
                                </h2>
                                <p>Subject to applicable regulations, you possess the following rights regarding your data:</p>
                                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                                    <li><strong>Access & Correction:</strong> View and update your profile details directly within the account settings.</li>
                                    <li><strong>Account Deletion:</strong> Request account closure and deletion of associated personal data.</li>
                                    <li><strong>Communication Preferences:</strong> Opt out of non-essential marketing emails at any time.</li>
                                </ul>
                            </div>

                            {/* Section 7 */}
                            <div id="cookies" className="scroll-mt-28 space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-100">
                                    <FileText className="w-5 h-5 text-primary-600 shrink-0" />
                                    7. Cookies & Local Storage
                                </h2>
                                <p>
                                    CoachingKart uses essential cookies and browser storage mechanisms to maintain session state, authenticate active users, and store basic interface preferences. You can adjust browser cookie settings, though essential platform functions may be affected.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div id="contact" className="scroll-mt-28 space-y-4 pt-4 border-t border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                                    <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                                    8. Contact Us
                                </h2>
                                <p>
                                    If you have any questions, concerns, or requests regarding this Privacy Policy or data protection, please contact our team:
                                </p>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                                    <p className="font-semibold text-slate-900 text-sm">CoachingKart Data Protection Team</p>
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
