'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const isInstitutionDetail = segments.length === 1 && !['institutions'].includes(segments[0]);
    const isInstitutionAbout = segments.length === 2 && ['about', 'faculty', 'gallery', 'results', 'reviews'].includes(segments[1]) && !['institutions', 'tuitions'].includes(segments[0]);

    if (isInstitutionDetail || isInstitutionAbout) return null;

    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center group">
                            <Image
                                src="/images/full_logo.png"
                                alt="CoachingKart"
                                width={280}
                                height={70}
                                className="h-20 md:h-24 w-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
                            />
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Empowering local education. Connecting students with the best offline coaching centers in their neighborhood.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="/find-tuitions" className="hover:text-primary-600 transition-colors">Find Tuitions</Link></li>
                            <li><Link href="/browse-exams" className="hover:text-primary-600 transition-colors">Browse Exams</Link></li>
                            <li><Link href="/login" className="hover:text-primary-600 transition-colors">Student Login</Link></li>
                            <li><Link href="/institute/login" className="hover:text-primary-600 transition-colors">Institute Login</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary-600 transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Get in Touch</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-md hover:-translate-y-1 transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-md hover:-translate-y-1 transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-md hover:-translate-y-1 transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-md hover:-translate-y-1 transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <Mail size={16} className="text-primary-600" />
                            <span>support@classroomconnect.com</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">© 2024 ClassroomConnect Technologies Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
                        <Link href="/cookies" className="hover:text-slate-900 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
