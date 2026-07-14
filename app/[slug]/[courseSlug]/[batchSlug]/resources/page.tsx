'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import SubjectHeader from '@/modules/institutes/lectures/components/Header';
import { useBatchSubjects } from '@/modules/institutes/lectures/hooks/useBatchSubjects';
import { useLectureStore } from '@/modules/institutes/lectures/store/useLectureStore';
import { Skeleton } from '@/core/components/ui/skeleton';
import { useRequireAuth } from '@/modules/platform/auth';
import { BatchResources } from '@/modules/institutes/resources';

export default function ResourcesPage() {
    const params = useParams();
    const batchId = params.batchSlug as string;

    const { hasHydrated, isAuthenticated } = useRequireAuth();
    const { activeSubjects, setActiveSubject } = useLectureStore();
    const activeSubject = activeSubjects[batchId] || null;

    const { data: batchSubjectsData, isLoading: isBatchLoading } = useBatchSubjects(
        hasHydrated && isAuthenticated ? batchId : undefined
    );

    const subjects = batchSubjectsData?.subjects || [];
    const activeSubjectName = subjects.find(s => s.id === activeSubject)?.name || '';

    useEffect(() => {
        if (!isBatchLoading && subjects.length > 0) {
            setActiveSubject(batchId, subjects[0].id);
        }
    }, [isBatchLoading, subjects.length, batchId, setActiveSubject]);

    if (!hasHydrated || !isAuthenticated) {
        return (
            <div className="space-y-8">
                <div className="flex gap-4 border-b border-slate-200 pb-4">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-6 w-24 bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {isBatchLoading ? (
                <div className="flex gap-4 border-b border-slate-200 pb-4 mb-8">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-6 w-24 bg-slate-100" />
                    ))}
                </div>
            ) : (
                <div className="mb-8">
                    <SubjectHeader
                        subjects={subjects}
                        activeSubject={activeSubject || ''}
                        onSubjectChange={(id) => setActiveSubject(batchId, id)}
                    />
                </div>
            )}

            <BatchResources batchId={batchId} subjectId={activeSubject} activeSubjectName={activeSubjectName} />
        </div>
    );
}
