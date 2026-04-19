'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Youtube, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions', 'about', 'careers'].includes(segments[0]);
    const isInstitutionAbout = segments.length === 2 && ['about', 'faculty', 'gallery', 'results', 'reviews'].includes(segments[1]) && !['institutions', 'tuitions'].includes(segments[0]);

    if (isInstitutionDetail || isInstitutionAbout) return null;

    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 mb-12">

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="/institutions" className="font-bold hover:text-primary-600 transition-colors">Find Institute</Link></li>
                            <li><Link href="https://institution.coachingkart.in/" target="_blank" className="font-bold hover:text-primary-600 transition-colors">Register Institute</Link></li>
                            {/* <li><Link href="https://institution.coachingkart.in/" target="_blank" className="font-bold hover:text-primary-600 transition-colors">Register Tuition</Link></li> */}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="/about" className="font-bold hover:text-primary-600 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="font-bold hover:text-primary-600 transition-colors">Careers</Link></li>
                            {/* <li><Link href="/blog" className="font-bold hover:text-primary-600 transition-colors">Blog</Link></li> */}

                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Get in Touch</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Phone size={16} className="text-primary-600 shrink-0" />
                                <span className="font-bold">+91 7889396003</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Mail size={16} className="text-primary-600" />
                                <span className="font-bold">support@coachingkart.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
                    <div className="flex items-center gap-0">
                        <Image
                            src="/logos/logo-wbg.webp"
                            alt="CoachingKart"
                            width={120}
                            height={120}
                            className="h-8 md:h-10 w-auto object-contain transition-all duration-300 scale-[1.5] md:scale-[1.8] origin-left"
                        />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                        © {new Date().getFullYear()} <span className="text-primary-600 font-bold">CoachingKart.</span> All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
