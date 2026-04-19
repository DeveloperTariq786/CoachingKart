import { create } from 'zustand';
import { InstitutionCourse } from '../types/course.types';

interface CourseStoreState {
    // Cache courses by institutionId to persist across navigation
    coursesCache: Record<string, { data: InstitutionCourse[], limit: number }>;
    setCourses: (institutionId: string, courses: InstitutionCourse[], limit: number) => void;
    // Persist selected tabs across navigation
    activeTabs: Record<string, string>; // key: courseId or courseSlug
    setActiveTab: (courseId: string, tabName: string) => void;
}

export const useCourseStore = create<CourseStoreState>((set) => ({
    coursesCache: {},
    activeTabs: {},

    setCourses: (institutionId, courses, limit) =>
        set((state) => ({
            coursesCache: {
                ...state.coursesCache,
                [institutionId]: { data: courses, limit }
            }
        })),

    setActiveTab: (courseId, tabName) =>
        set((state) => ({
            activeTabs: {
                ...state.activeTabs,
                [courseId]: tabName
            }
        })),
}));
