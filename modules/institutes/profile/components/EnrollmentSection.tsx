import React, { useState, useEffect } from 'react';
import { Enrollment } from '../types/profile';
import { ChevronRight, Building2, Timer } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { instituteService } from '@/modules/institutes/institute/services/institute.service';

interface EnrollmentSectionProps {
    enrollments: Enrollment[];
}

const INK = '#1F2A22';
const PAPER = '#FFFFFF';
const PAPER_MUTED = '#F9FAFB';

const TicketField: React.FC<{
    label: string;
    value: string;
    accent?: string;
    dot?: boolean;
    icon?: React.ReactNode;
}> = ({ label, value, accent, dot, icon }) => (
    <div className="min-w-0">
        <div
            className="text-[9px] font-mono uppercase tracking-[0.15em] mb-1"
            style={{ color: `${INK}66` }}
        >
            {label}
        </div>
        <div
            className="flex items-center gap-1.5 text-sm font-bold truncate"
            style={{ color: accent || INK }}
        >
            {dot && (
                <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: accent }}
                />
            )}
            {icon}
            <span className="truncate">{value}</span>
        </div>
    </div>
);

const EnrollmentCard: React.FC<{ item: Enrollment }> = ({ item }) => {
    const router = useRouter();
    const [primaryColor, setPrimaryColor] = useState<string>('#0ea5e9'); // default fallback (global primary)
    const [durationLeft, setDurationLeft] = useState<any>(item.durationLeft);

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleEnrollmentClick = () => {
        const slug = item.institution.slug;
        const courseSlug = slugify(item.course.name);
        const batchSlug = item.batch.id; // batchSlug in the URL is the batch ID
        router.push(`/${slug}/${courseSlug}/${batchSlug}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleEnrollmentClick();
        }
    };

    // Fetch dynamic primary color from institution details
    useEffect(() => {
        if (item.institution.slug) {
            instituteService.getInstituteDetails(item.institution.slug)
                .then(res => {
                    if (res.success && res.data?.theme?.primary) {
                        setPrimaryColor(res.data.theme.primary);
                    }
                })
                .catch(err => console.error("Error fetching institute theme in profile:", err));
        }
    }, [item.institution.slug]);

    // Live countdown timer
    useEffect(() => {
        if (!durationLeft || durationLeft.isExpired || durationLeft.totalSeconds <= 0) return;

        const timer = setInterval(() => {
            setDurationLeft((prev: any) => {
                if (!prev || prev.totalSeconds <= 1) {
                    clearInterval(timer);
                    return { ...prev, isExpired: true, totalSeconds: 0 };
                }
                const total = prev.totalSeconds - 1;
                const days = Math.floor(total / (24 * 3600));
                const hours = Math.floor((total % (24 * 3600)) / 3600);
                const minutes = Math.floor((total % 3600) / 60);
                const seconds = total % 60;
                return {
                    isExpired: false,
                    days,
                    hours,
                    minutes,
                    seconds,
                    totalSeconds: total
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [durationLeft?.totalSeconds]);

    const formatDuration = (duration: any) => {
        if (!duration) return "";
        if (duration.isExpired) return "Expired";
        const parts = [];
        if (duration.days > 0) parts.push(`${duration.days}d`);
        if (duration.hours > 0) parts.push(`${duration.hours}h`);
        if (duration.minutes > 0) parts.push(`${duration.minutes}m`);
        if (parts.length === 0 || (duration.days === 0 && duration.hours === 0 && duration.minutes === 0)) {
            parts.push(`${duration.seconds}s`);
        }
        return parts.join(' ');
    };

    return (
        <div
            onClick={handleEnrollmentClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="group relative flex bg-[color:var(--paper)] rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_1px_0_rgba(31,42,34,0.06)] hover:shadow-[0_16px_32px_-12px_rgba(31,42,34,0.22)] motion-safe:hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
                '--paper': PAPER,
                '--tw-ring-color': primaryColor,
            } as React.CSSProperties}
        >
            {/* institution-colored ticket edge */}
            <div className="w-1.5 shrink-0" style={{ backgroundColor: primaryColor }} />

            {/* main stub */}
            <div className="flex-1 p-6 flex flex-col gap-4 min-w-0">
                <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center shrink-0 relative overflow-hidden" style={{ color: INK, opacity: 0.5 }}>
                            {item.institution.logo ? (
                                <Image
                                    src={item.institution.logo}
                                    alt={item.institution.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <Building2 size={20} />
                            )}
                        </div>
                        <h3 className="text-base font-bold tracking-tight truncate" style={{ color: INK }}>
                            {item.institution.name}
                        </h3>
                    </div>
                    <div
                        className="shrink-0 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] border border-dashed rounded-full px-2.5 py-1"
                        style={{ color: `${INK}80`, borderColor: `${INK}33` }}
                    >
                        Enrolled &middot; {new Date(item.joinedAt).getFullYear()}
                    </div>
                </div>

                <div className="border-t border-dashed" style={{ borderColor: `${INK}22` }} />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4">
                    <TicketField label="Course" value={item.course.name} accent={primaryColor} dot />
                    <TicketField label="Program" value={item.program.name} />
                    <TicketField label="Batch" value={item.batch.name} />
                    {durationLeft && (
                        <TicketField
                            label="Time remaining"
                            value={formatDuration(durationLeft)}
                            accent={primaryColor}
                            icon={<Timer size={12} className="shrink-0" />}
                        />
                    )}
                </div>

                <div className="flex md:hidden items-center justify-end gap-1 text-xs font-mono uppercase tracking-widest pt-1" style={{ color: primaryColor }}>
                    View ticket <ChevronRight size={14} />
                </div>
            </div>

            {/* perforation */}
            <div className="hidden md:block relative w-0">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white" />
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white" />
                <div className="h-full border-l border-dashed" style={{ borderColor: `${INK}33` }} />
            </div>

            {/* stub */}
            <div
                className="hidden md:flex flex-col items-center justify-center gap-4 px-5 shrink-0"
                style={{ backgroundColor: PAPER_MUTED }}
            >
                <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
                    style={{ color: `${INK}80` }}
                    title={item.batch.name}
                >
                    {item.batch.name.length > 18 ? `${item.batch.name.substring(0, 15)}...` : item.batch.name}
                </span>
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" style={{ color: primaryColor }} />
            </div>
        </div>
    );
};

export const EnrollmentSection: React.FC<EnrollmentSectionProps> = ({ enrollments }) => {
    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em]" style={{ color: `${INK}66` }}>
                    Enrollments &mdash; {String(enrollments.length).padStart(2, '0')}
                </h2>
            </div>

            <div className="grid gap-4">
                {enrollments.length > 0 ? (
                    enrollments.map((item) => (
                        <EnrollmentCard key={item.enrollmentId} item={item} />
                    ))
                ) : (
                    <div
                        className="py-14 text-center border-2 border-dashed rounded-2xl"
                        style={{ borderColor: `${INK}14` }}
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: `${INK}44` }}>
                            Gate closed &mdash; no active enrollments
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};