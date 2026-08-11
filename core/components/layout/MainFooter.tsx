'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions', 'about', 'careers', 'privacy', 'terms'].includes(segments[0]);
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
                            Bridging the gap between traditional classrooms and digital convenience.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <a href="https://www.linkedin.com/company/coachingkart/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.4v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13H3.5V9h3.6v11.4zM22.2 0H1.8A1.8 1.8 0 0 0 0 1.8v20.4A1.8 1.8 0 0 0 1.8 24h20.4A1.8 1.8 0 0 0 24 22.2V1.8A1.8 1.8 0 0 0 22.2 0z" /></svg>
                            </a>
                            <a href="https://wa.me/917889396003" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                                className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.205.326-1.155 4.218 4.316-1.132.377.255zm10.818-6.126c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-5">Download App</h4>
                        <div className="flex flex-col gap-2.5">
                            {/* Google Play */}
                            <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm opacity-80 cursor-not-allowed select-none">
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
                            </div>
                            {/* App Store */}
                            <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm opacity-80 cursor-not-allowed select-none">
                                <svg className="w-5 h-5 shrink-0 fill-slate-800" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div>
                                    <p className="text-[10px] text-slate-400 leading-none mb-0.5">DOWNLOAD ON THE</p>
                                    <p className="text-sm font-semibold text-slate-900 leading-none">App Store</p>
                                </div>
                            </div>
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
                            <li>
                                <Link href="/privacy" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Terms & Conditions
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
                                <Link href="/privacy" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:shaheendevelopers4@gmail.com" className="text-slate-600 hover:text-primary-600 transition-colors">
                                    Careers
                                </a>
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
                            <a href="https://wa.me/917889396003" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-600 hover:text-primary-600 transition-colors">
                                <svg className="w-3.5 h-3.5 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.205.326-1.155 4.218 4.316-1.132.377.255zm10.818-6.126c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                                </svg>
                                WhatsApp: +91 7889396003
                            </a>
                            <a href="mailto:hello@coachingkart.in" className="flex items-center gap-2.5 text-slate-600 hover:text-primary-600 transition-colors">
                                <Mail size={14} className="text-primary-600 shrink-0" />
                                hello@coachingkart.in
                            </a>
                            <a href="mailto:shaheendevelopers4@gmail.com" className="flex items-center gap-2.5 text-slate-600 hover:text-primary-600 transition-colors">
                                <Mail size={14} className="text-primary-600 shrink-0" />
                                shaheendevelopers4@gmail.com
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
                        <Link href="/terms" className="hover:text-slate-800 transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;