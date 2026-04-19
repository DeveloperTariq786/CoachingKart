'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { VideoPlayer, Chat, LectureTabs } from '@/modules/institutes/lecture';
import Link from 'next/link';
import { cn, generateSessionId } from '@/core/lib/utils/utils';
import { useLectureDetail } from '@/modules/institutes/lectures/hooks/useLectureDetail';
import { useLectures } from '@/modules/institutes/lectures/hooks/useLectures';
import { Skeleton } from '@/core/components/ui/skeleton';
import { LectureResources } from '@/modules/institutes/resources';
import { lectureService } from '@/modules/institutes/lectures/services/lecture.service';
import { toast } from 'sonner';
import { chatService } from '@/modules/institutes/chat/services/chat.service';
import { useAuthStore } from '@/core/store/auth.store';

export default function LectureDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [sessionId, setSessionId] = useState<string | null>(null);
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;
    const batchSlug = params.batchSlug as string;
    const lectureId = params.lectureSlug as string;

    const { data: lecture, isLoading, error } = useLectureDetail(lectureId);
    const { user } = useAuthStore();

    React.useEffect(() => {
        if (user?.email && lectureId && !isLoading) {
            const sid = generateSessionId();
            chatService.createSession(user.email, sid, lectureId)
                .then(data => {
                    console.log('Initial page chat session created:', data.id);
                    setSessionId(data.id);
                })
                .catch(err => console.error('Failed to create initial chat session:', err));
        }
    }, [user?.email, lectureId, isLoading]);


    // Fetch lectures to get total count for pagination
    const { data: lecturesData } = useLectures(
        lecture ? batchSlug : undefined,
        1, 1, lecture?.subjectId
    );

    const totalLectures = lecturesData?.pagination.totalLectures || 0;
    const hasNext = lecture ? lecture.order < totalLectures : false;

    const [activeTab, setActiveTab] = useState('overview');
    const navigatingToRef = React.useRef<string | null>(null);
    const [, forceRender] = useState(0);

    // Clear navigation target once the loaded lecture matches what we navigated to
    React.useEffect(() => {
        if (navigatingToRef.current && lecture && lecture.id === navigatingToRef.current && !isLoading) {
            navigatingToRef.current = null;
            forceRender(n => n + 1);
        }
    }, [lecture, lectureId, isLoading]);

    const isNavigating = navigatingToRef.current !== null;

    const handleNavigation = async (newOrder: number) => {
        if (newOrder < 1 || isNavigating) return;

        try {
            navigatingToRef.current = '__pending__';
            forceRender(n => n + 1);
            const nextLecture = await lectureService.getLectureDetail(undefined, newOrder, batchSlug);
            if (nextLecture) {
                navigatingToRef.current = nextLecture.id;
                router.replace(`/${slug}/${courseSlug}/${batchSlug}/${nextLecture.id}`);
            } else {
                navigatingToRef.current = null;
                forceRender(n => n + 1);
            }
        } catch (err) {
            toast.error("No more lectures found");
            navigatingToRef.current = null;
            forceRender(n => n + 1);
        }
    };

    const formatDurationHHMMSS = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [hrs, mins, secs]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    };

    const basePath = `/${slug}/${courseSlug}/${batchSlug}`;

    // Ensure page starts at top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading || isNavigating || (lecture && lecture.id !== lectureId)) {
        return (
            <div className="flex flex-col lg:flex-row gap-6 p-6 h-full">
                <div className="flex-1 space-y-6">
                    <Skeleton className="aspect-video w-full rounded-3xl bg-slate-100" />
                    <Skeleton className="h-10 w-3/4 bg-slate-100 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 bg-slate-100 rounded-lg" />
                </div>
                <div className="hidden lg:block w-[450px] space-y-6">
                    <Skeleton className="h-12 w-full bg-slate-100 rounded-xl" />
                    <Skeleton className="h-[400px] w-full bg-slate-100 rounded-2xl" />
                </div>
            </div>
        );
    }

    if (error || !lecture) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
                <p className="text-lg font-bold">Failed to load lecture</p>
                <Link href={basePath} className="text-primary-600 font-bold mt-4 hover:underline">
                    Back to Lectures
                </Link>
            </div>
        );
    }

    const renderTabContent = (isSidebar?: boolean) => {
        return (
            <div className={cn(isSidebar ? "mt-4" : "mt-8", "h-full")}>
                {/* Overview TabContent */}
                <div className={cn(activeTab !== 'overview' && "hidden")}>
                    <div className="bg-background rounded-2xl p-6 border border-slate-100">
                        <h3 className="font-bold text-foreground mb-4">About this Lecture</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            {lecture?.description}
                        </p>
                        <div className={cn(
                            "grid gap-4 mt-6 grid-cols-2"
                        )}>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <p className="text-xl font-bold text-primary-600">
                                    {lecture && formatDurationHHMMSS(lecture.duration)}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">Duration</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-primary-600">
                                    {lecture?.resources?.studyMaterials || 0}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">Resources</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resources TabContent */}
                <div className={cn(activeTab !== 'resources' && "hidden")}>
                    <div className="mb-10">
                        <LectureResources lectureId={lectureId} isSidebar={isSidebar} />
                    </div>
                </div>

                {/* Chat TabContent */}
                <div className={cn(activeTab !== 'chat-room' && "hidden")}>
                    <div className={cn(
                        "bg-background rounded-2xl border border-slate-100 overflow-hidden mb-10",
                        isSidebar ? "h-[calc(100vh-140px)]" : "h-[500px]"
                    )}>
                        <Chat lectureId={lectureId} sessionId={sessionId} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in fade-in duration-500 h-full overflow-hidden">
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 lg:items-start h-full">
                {/* Video Section */}
                <div className="flex-1 min-w-0 w-full h-full overflow-y-auto lg:overflow-visible">
                    <VideoPlayer
                        lectureTitle={lecture.title}
                        instructorName={lecture.faculty.name}
                        instructorProfileImage={lecture.faculty.profileImage}
                        instructorTag={lecture.faculty.tag}
                        videoUrl={lecture.videoUrl}
                        thumbnail={lecture.thumbnail}
                        onNext={() => handleNavigation(lecture.order + 1)}
                        onPrev={() => handleNavigation(lecture.order - 1)}
                        hasPrev={lecture.order > 1}
                        hasNext={hasNext}
                        isNavigating={isNavigating}
                    // onBack={() => router.push(basePath)}
                    />

                    {/* Mobile Tabs Container */}
                    <div className="lg:hidden mt-8 pb-10">
                        <LectureTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            counts={{ resources: lecture.resources?.studyMaterials }}
                        />
                        {renderTabContent(false)}
                    </div>
                </div>

                {/* Sidebar Section - Desktop Only */}
                <div className="hidden lg:flex flex-col w-[450px] h-full shrink-0">
                    <div className="mt-[-4px]">
                        <LectureTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            counts={{ resources: lecture.resources?.studyMaterials }}
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
                        {renderTabContent(true)}
                    </div>
                </div>
            </div>
        </div>
    );
}
