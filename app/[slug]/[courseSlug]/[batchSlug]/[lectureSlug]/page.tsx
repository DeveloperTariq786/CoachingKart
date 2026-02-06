'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { VideoPlayer, Chat, LectureTabs } from '@/modules/institutes/components/lecture-video';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/core/lib/utils/utils';

export default function LectureDetailsPage() {
    const params = useParams();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;
    const batchSlug = params.batchSlug as string;
    const lectureSlug = params.lectureSlug as string;

    const [activeTab, setActiveTab] = useState('overview');

    const formatSlug = (str: string) => {
        if (!str) return '';
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const basePath = `/${slug}/${courseSlug}/${batchSlug}`;

    // Ensure page starts at top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const renderTabContent = (isSidebar?: boolean) => {
        return (
            <div className={cn(isSidebar ? "mt-4" : "mt-8", "h-full")}>
                {activeTab === 'overview' && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">About this Lecture</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            This lecture covers the fundamental concepts of motion and its basic principles.
                            We explore displacement, velocity, and acceleration vectors, along with their
                            mathematical representations.
                        </p>
                        <div className={cn(
                            "grid gap-4 mt-6",
                            isSidebar ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
                        )}>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-primary-600">45</p>
                                <p className="text-xs text-slate-500 mt-1">Minutes</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-primary-600">12</p>
                                <p className="text-xs text-slate-500 mt-1">Topics</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-primary-600">3</p>
                                <p className="text-xs text-slate-500 mt-1">Resources</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-primary-600">5</p>
                                <p className="text-xs text-slate-500 mt-1">Doubts</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4">Resources</h3>
                        <div className="space-y-3">
                            {['Lecture Notes.pdf', 'Practice Problems.pdf', 'Formula Sheet.pdf'].map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <span className="text-xs font-bold text-red-600">PDF</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-900">{file}</span>
                                    </div>
                                    <button className="text-primary-600 text-sm font-semibold hover:underline">
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'chat-room' && (
                    <div className={cn(
                        "bg-white rounded-2xl border border-slate-100 overflow-hidden",
                        isSidebar ? "h-[calc(100vh-140px)]" : "h-[500px]"
                    )}>
                        <Chat lectureId={lectureSlug} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="animate-in fade-in duration-500 h-full overflow-hidden">
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 items-start h-full">
                {/* Video Section */}
                <div className="flex-1 min-w-0 h-full overflow-y-auto lg:overflow-visible">
                    <VideoPlayer
                        lectureTitle={formatSlug(lectureSlug)}
                        instructorName="Prof. R. Sharma"
                    />

                    {/* Mobile Tabs Container */}
                    <div className="lg:hidden mt-8 pb-10">
                        <LectureTabs activeTab={activeTab} onTabChange={setActiveTab} />
                        {renderTabContent(false)}
                    </div>
                </div>

                {/* Sidebar Section - Desktop Only */}
                <div className="hidden lg:flex flex-col w-[450px] h-full shrink-0">
                    <div className="mt-[-4px]">
                        <LectureTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
                        {renderTabContent(true)}
                    </div>
                </div>
            </div>
        </div>
    );
}
