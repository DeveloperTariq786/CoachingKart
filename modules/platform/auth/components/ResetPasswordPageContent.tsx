'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Globe, FileText, BookOpen, MessageCircleQuestion, Bell, Video, ArrowLeft } from 'lucide-react';

import { ResetPasswordForm } from './ResetPasswordForm';
import { useInstituteStore } from '@/modules/institutes/institute/store/useInstituteStore';
import { instituteService } from '@/modules/institutes/institute/services/institute.service';

const HIGHLIGHTS = [
{ icon: Video, label: 'Live & recorded lectures' },
{ icon: Globe, label: 'Learn from anywhere, anytime' },
{ icon: FileText, label: 'Practice with unlimited mock tests' },
{ icon: BookOpen, label: 'Access notes and study material instantly' },
{ icon: MessageCircleQuestion, label: 'Get doubts resolved quickly' },
{ icon: Bell, label: 'Stay updated with batch announcements' },
] as const;


export const ResetPasswordPageContent: React.FC = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug') ?? undefined;

    const { detailsCache, setDetails } = useInstituteStore();

    const institutionName = slug ? detailsCache[slug]?.name || 'CoachingKart' : 'CoachingKart';
    const institutionLogo = slug ? detailsCache[slug]?.logo : undefined;
    const institutionTheme = slug ? detailsCache[slug]?.institutionTheme || detailsCache[slug]?.theme : undefined;

    const primaryColor = institutionTheme?.primary || '#0ea5e9';
    const secondaryColor = institutionTheme?.secondary || '#1d6ddd';
    const accentColor = institutionTheme?.background || 'white';

    useEffect(() => {
        if (!slug || detailsCache[slug]) return;

        instituteService.getInstituteDetails(slug)
            .then((res) => {
                if (res.success && res.data) {
                    setDetails(slug, res.data);
                }
            })
            .catch(() => {});
    }, [slug, detailsCache, setDetails]);

    return (
        <main className="h-screen overflow-hidden flex flex-col lg:flex-row bg-white">
            {/* Form panel */}
            <section className="relative flex flex-1 flex-col justify-start overflow-hidden px-6 pt-16 pb-8 sm:px-10 lg:px-12 xl:px-16 bg-white">
                <div className="mx-auto w-full max-w-[400px] animate-in fade-in duration-400">
                    <Link href="/" className="mb-6 inline-flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded border border-[#16233F]/15 bg-white">
                            {institutionLogo ? (
                                <Image
                                    src={institutionLogo}
                                    alt={institutionName}
                                    width={44}
                                    height={44}
                                    className="h-full w-full object-contain p-1.5"
                                />
                            ) : (
                               <Image
                                        src="/logos/logo_icon.png"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-contain"
                                    />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#16233F]">{institutionName}</p>
                        </div>
                    </Link>

                    <div className="mb-5">
                        <h1 
                            className="font-serif text-2xl font-semibold tracking-tight"
                            style={{ color: primaryColor }}
                        >
                            Reset your password
                        </h1>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#33312D]/70">
                            Enter your registered email and set a new password to regain access to your account.
                        </p>
                    </div>

                    <ResetPasswordForm primaryColor={primaryColor} />

                    <div className="mt-5 flex items-center justify-between border-t border-dashed border-[#16233F]/15 pt-4">
                        <div className="flex items-center gap-2 text-xs text-[#33312D]/60">
                            <ShieldCheck size={14} style={{ color: secondaryColor }} />
                            <span>Secure reset, verified for <span style={{ fontWeight: 'bold', color: primaryColor }}>{institutionName}</span> students</span>
                        </div>
                    </div>

                    <Link
                        href={`/login${slug ? `?slug=${slug}` : ''}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                        style={{ color: primaryColor }}
                    >
                        <ArrowLeft size={14} />
                        Back to Sign In
                    </Link>
                </div>
            </section>

            {/* Perforated tear-line divider */}
            <div
                aria-hidden
                className="hidden lg:block w-px shrink-0"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.9) 2.5px, transparent 3px)',
                    backgroundSize: '100% 22px',
                    backgroundRepeat: 'repeat-y',
                    backgroundColor: 'rgba(22,35,63,0.18)',
                    backgroundPositionY: '-11px',
                }}
            />

            {/* Admit-card panel */}
            <section 
                className="relative hidden flex-1 flex-col justify-start overflow-hidden px-12 pt-16 pb-8 xl:px-16 lg:flex"
                style={{ backgroundColor: primaryColor }}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative">
                    <div>
                        <div className="flex items-start justify-between border-b border-dashed border-white/20 pb-4">
                            <div>
                                <h2 className="mt-2 font-serif text-2xl font-semibold text-white">
                                    {institutionName}
                                </h2>
                            </div>
                            <div className="flex h-16 w-14 items-center justify-center rounded border border-dashed border-white/25 bg-white">
                                {institutionLogo ? (
                                    <Image
                                        src={institutionLogo}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-fill"
                                    />
                                ) : (
                                    <Image
                                        src="/logos/logo_icon.png"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-contain p-1"
                                    />
                                )}
                            </div>
                        </div>

                        <p className="mt-6 font-serif text-2xl font-semibold leading-tight text-white xl:text-3xl">
                            Your learning, all in one place.
                        </p>

                      <ul className="mt-6 space-y-3">
                            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-3">
                                    <div 
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-white/15"
                                        style={{ color: accentColor }}
                                    >
                                        <Icon size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-white/85">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-dashed border-white/20 pt-4">
                        <p className="font-mono text-[11px] text-white">
                            Powered by CoachingKart · You teach. We deliver.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ResetPasswordPageContent;
