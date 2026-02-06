'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { EXAM_CATEGORIES } from '@/core/constants';
import Link from 'next/link';
import { Button } from '@/core/components/ui/button';
import CourseClassTabs from '@/modules/institutes/components/courses/CourseHeader';
import RecommendedBatches from '@/modules/institutes/components/courses/CoursePrograms';

export default function CourseDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;

    const [activeTab, setActiveTab] = useState('Class 12+/Droppers');

    const course = EXAM_CATEGORIES.find(c => c.id === courseSlug);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h1 className="text-2xl font-bold">Course not found</h1>
                <Link href={`/${slug}`}>
                    <Button variant="outline">Back to Institution</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-8">
            <CourseClassTabs
                courseTitle={course.title}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <RecommendedBatches
                activeTab={activeTab}
            />
        </div>
    );
}
