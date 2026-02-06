'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { useParams, usePathname } from 'next/navigation';

const InstituteFooter: React.FC = () => {
    const params = useParams();
    const pathname = usePathname();
    const instName = params.slug as string;

    // Hide footer on batch dashboard pages (path: /[slug]/[courseSlug]/[batchSlug] and subpages)
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length >= 3) {
        return null;
    }

    const formattedName = instName ? instName.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Institution';

    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                C
                            </div>
                            <span className="font-bold text-xl text-white">{formattedName}</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Providing quality education and empowering students with the best coaching and guidance.
                        </p>
                    </div>

                    {/* Courses */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Our Courses</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#courses" className="hover:text-primary-400 transition-colors">Science Academy</Link></li>
                            <li><Link href="#courses" className="hover:text-primary-400 transition-colors">Commerce Hub</Link></li>
                            <li><Link href="#courses" className="hover:text-primary-400 transition-colors">Aptitude Training</Link></li>
                            <li><Link href="#courses" className="hover:text-primary-400 transition-colors">Public Speaking</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href={`/${instName}/faculty`} className="hover:text-primary-400 transition-colors">Our Faculty</Link></li>
                            <li><Link href={`/${instName}/gallery`} className="hover:text-primary-400 transition-colors">Campus Gallery</Link></li>
                            <li><Link href={`/${instName}/reviews`} className="hover:text-primary-400 transition-colors">Student Reviews</Link></li>
                            <li><Link href={`/${instName}/about`} className="hover:text-primary-400 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Connect</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-500 shrink-0" />
                                <span>Main Road, Sector 4, Bangalore, Karnataka 560001</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary-500 shrink-0" />
                                <span>info@institute.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">© 2024 {formattedName} • Powered by ClassroomConnect</p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"><Twitter size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default InstituteFooter;
