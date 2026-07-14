'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions', 'about', 'careers'].includes(segments[0]);
    const isInstitutionAbout = segments.length === 2 && ['about', 'faculty', 'gallery', 'results', 'reviews'].includes(segments[1]) && !['institutions', 'tuitions'].includes(segments[0]);

    if (isInstitutionDetail || isInstitutionAbout) return null;

    return (
        <footer className="relative bg-slate-50 border-t border-slate-200 pt-16 pb-8 overflow-hidden">
            <div className="relative w-full px-4 sm:px-6 lg:px-10">


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

                    {/* Brand + tagline */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">CoachingKart</h4>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            India's smartest platform to discover, compare, and connect with top coaching institutes near you — all in one place.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" /></svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"
                                className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.9 1h3.7l-8 9.1L24 23h-7.4l-5.8-7.5L4.4 23H.7l8.6-9.8L0 1h7.6l5.2 6.8L18.9 1zm-1.3 19.8h2L6.5 3.2H4.3l13.3 17.6z" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/coachingkart/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.4v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13H3.5V9h3.6v11.4zM22.2 0H1.8A1.8 1.8 0 0 0 0 1.8v20.4A1.8 1.8 0 0 0 1.8 24h20.4A1.8 1.8 0 0 0 24 22.2V1.8A1.8 1.8 0 0 0 22.2 0z" /></svg>
                            </a>
                        </div>
                    </div>


                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-5">Download App</h4>
                        <div className="flex flex-col gap-2.5">
                            {/* Google Play */}
                            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2.5 transition-all shadow-sm">
                                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                                    <path d="M3.18 23.5c.37.2.8.22 1.19.05l11.55-6.67-2.62-2.62-10.12 9.24z" fill="#EA4335" />
                                    <path d="M20.82 10.37 17.6 8.54l-2.94 2.94 2.94 2.94 3.24-1.85a1.63 1.63 0 0 0 0-3.2z" fill="#FBBC04" />
                                    <path d="M4.37.45A1.63 1.63 0 0 0 3.18.5L13.3 10.62l2.62-2.62L4.37.45z" fill="#4285F4" />
                                    <path d="M3.18.5A1.64 1.64 0 0 0 2.5 1.9v20.2c0 .57.27 1.08.68 1.4L13.3 13.38 3.18.5z" fill="#34A853" />
                                </svg>
                                <div>
                                    <p className="text-[10px] text-slate-400 leading-none mb-0.5">GET IT ON</p>
                                    <p className="text-sm font-semibold text-slate-900 leading-none">Google Play</p>
                                </div>
                            </a>
                            {/* App Store */}
                            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2.5 transition-all shadow-sm">
                                <svg className="w-5 h-5 shrink-0 fill-slate-800" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div>
                                    <p className="text-[10px] text-slate-400 leading-none mb-0.5">DOWNLOAD ON THE</p>
                                    <p className="text-sm font-semibold text-slate-900 leading-none">App Store</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-5">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/institutions" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Find Institute
                                </Link>
                            </li>
                            <li>
                                <Link href="https://institution.coachingkart.in/" target="_blank" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Register Institute
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-5">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact — app buttons removed */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-5">Get in Touch</h4>
                        <div className="space-y-3 text-sm">
                            <a href="tel:+917889396003" className="flex items-center gap-2.5 text-slate-600 hover:text-primary-600 transition-colors">
                                <Phone size={14} className="text-primary-600 shrink-0" />
                                +91 7889396003
                            </a>
                            <a href="mailto:support@coachingkart.com" className="flex items-center gap-2.5 text-slate-600 hover:text-primary-600 transition-colors">
                                <Mail size={14} className="text-primary-600 shrink-0" />
                                support@coachingkart.com
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 order-2 sm:order-1">
                        © {new Date().getFullYear()} <span className="text-primary-600 font-semibold">CoachingKart.</span> All rights reserved.
                    </p>
                    <div className="flex items-center gap-5 text-xs text-slate-500 order-1 sm:order-2">
                        <Link href="/privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;