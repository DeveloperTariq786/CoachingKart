import React from 'react';
import { Enrollment } from '../types/profile';
import { ChevronRight, Calendar, Building2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface EnrollmentSectionProps {
    enrollments: Enrollment[];
}

export const EnrollmentSection: React.FC<EnrollmentSectionProps> = ({ enrollments }) => {
    const router = useRouter();

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleEnrollmentClick = (item: Enrollment) => {
        const slug = item.institution.slug;
        const courseSlug = slugify(item.course.name);
        const batchSlug = item.batch.id; // batchSlug in the URL is the batch ID
        router.push(`/${slug}/${courseSlug}/${batchSlug}`);
    };

    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Enrollments ({enrollments.length})
                </h2>
            </div>

            <div className="grid gap-4">
                {enrollments.length > 0 ? (
                    enrollments.map((item) => (
                        <div
                            key={item.enrollmentId}
                            onClick={() => handleEnrollmentClick(item)}
                            className="group bg-white p-6 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer relative border border-transparent hover:border-slate-100"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors relative overflow-hidden">
                                            {item.institution.logo ? (
                                                <Image
                                                    src={item.institution.logo}
                                                    alt={item.institution.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <Building2 size={24} />
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                                            {item.institution.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-md">
                                        <Calendar size={10} />
                                        {new Date(item.joinedAt).getFullYear()}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary-600" />
                                        <span className="text-sm font-bold text-primary-600">
                                            {item.course.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className="text-sm font-semibold text-slate-600">
                                            {item.program.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                                        <span className="text-sm font-medium text-slate-400">
                                            {item.batch.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 group-hover:text-primary-400 transition-colors hidden md:block">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center border-2 border-dashed border-slate-50 rounded-2xl">
                        <p className="text-slate-300 font-medium text-sm">No active enrollments found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
