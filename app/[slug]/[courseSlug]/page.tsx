'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/core/components/ui/button';
import { Skeleton } from '@/core/components/ui/skeleton';
import ProgramsHeader from '@/modules/institutes/programs/components/Programs';
import Batches from '@/modules/institutes/batches/components/Batches';
import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import { institutionCourseService } from '@/modules/institutes/courses/services/course.service';
import { InstitutionCourse } from '@/modules/institutes/courses/types/course.types';
import { useCourseStore } from '@/modules/institutes/courses/store/useCourseStore';

export default function ProgramsPage() {
    const params = useParams();
    const courseSlug = params.courseSlug as string;
    const { details, isLoading: isInstLoading, slug } = useInstitute();
    const { coursesCache, setCourses: setCoursesCache, activeTabs, setActiveTab: setActiveTabInStore } = useCourseStore();

    // Use courseSlug as the key for persistent tab state
    const [activeTab, setActiveTabInternal] = useState(activeTabs[courseSlug] || '');

    const handleTabChange = (tab: string) => {
        setActiveTabInternal(tab);
        setActiveTabInStore(courseSlug, tab);
    };

    // Initialize from cache if possible
    const [courses, setCourses] = useState<InstitutionCourse[]>(
        details?.id && coursesCache[details.id] ? coursesCache[details.id].data : []
    );

    const [isCoursesLoading, setIsCoursesLoading] = useState(
        !(details?.id && coursesCache[details.id])
    );

    useEffect(() => {
        const fetchCourses = async () => {
            if (!details?.id) {
                if (!isInstLoading) setIsCoursesLoading(false);
                return;
            }

            // Check if we hit the cache while waiting for details to change
            if (coursesCache[details.id]) {
                setCourses(coursesCache[details.id].data);
                setIsCoursesLoading(false);
                return;
            }

            try {
                setIsCoursesLoading(true);
                const response = await institutionCourseService.getInstitutionCourses(details.id);
                if (response.success) {
                    setCourses(response.data);
                    setCoursesCache(details.id, response.data, response.data.length || 6);
                }
            } catch (error) {
                console.error("Error fetching courses for detail page:", error);
            } finally {
                setIsCoursesLoading(false);
            }
        };

        fetchCourses();
    }, [details?.id, isInstLoading, coursesCache, setCoursesCache]);

    const course = useMemo(() => {
        const foundCourse = courses.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === courseSlug);
        return foundCourse;
    }, [courses, courseSlug]);

    // Set initial active tab to first program if available and none selected
    useEffect(() => {
        if (course?.programs && course.programs.length > 0 && !activeTab) {
            handleTabChange(course.programs[0].name);
        }
    }, [course, activeTab]);

    const isLoading = isInstLoading || isCoursesLoading;

    const activeProgramId = useMemo(() => {
        return course?.programs.find(p => p.name === activeTab)?.id;
    }, [course, activeTab]);

    if (isLoading) {
        return (
            <div className="bg-background min-h-screen pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton className="h-12 w-1/2 mx-auto mb-6 bg-slate-100 rounded-lg" />
                    <Skeleton className="h-6 w-1/3 mx-auto mb-10 bg-slate-100 rounded-lg" />
                    <Skeleton className="h-10 w-full bg-slate-100 rounded-lg mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Skeleton className="h-64 bg-slate-100 rounded-2xl" />
                        <Skeleton className="h-64 bg-slate-100 rounded-2xl" />
                        <Skeleton className="h-64 bg-slate-100 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

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
        <div className="bg-background min-h-screen pt-8">
            <ProgramsHeader
                courseTitle={course.name}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                programs={course.programs}
            />
            <Batches
                activeTab={activeTab}
                programId={activeProgramId}
            />
        </div>
    );
}
