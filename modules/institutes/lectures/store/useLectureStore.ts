import { create } from 'zustand';
import { LecturesResponse, LectureDetailResponse, BatchSubjectsResponse } from '../types/lecture.types';

type LectureData = LecturesResponse['data'];
type LectureDetailData = LectureDetailResponse['data'];
type BatchSubjectsData = BatchSubjectsResponse['data'];

interface LectureStoreState {
    lecturesCache: Record<string, LectureData>; // key: `${batchId}:${subjectId}:${page}:${limit}`
    batchSubjectsCache: Record<string, BatchSubjectsData>; // key: batchId
    lectureDetailCache: Record<string, LectureDetailData>; // key: lectureId
    batchNames: Record<string, string>; // key: batchId
    activeSubjects: Record<string, string>; // key: batchId, value: subjectId
    setLectures: (batchId: string, subjectId: string | undefined, page: number, limit: number, data: LectureData, search?: string) => void;
    setBatchSubjects: (batchId: string, data: BatchSubjectsData) => void;
    setLectureDetail: (lectureId: string, data: LectureDetailData) => void;
    setActiveSubject: (batchId: string, subjectId: string) => void;
}

export const useLectureStore = create<LectureStoreState>((set) => ({
    lecturesCache: {},
    batchSubjectsCache: {},
    lectureDetailCache: {},
    batchNames: {},
    activeSubjects: {},
    setLectures: (batchId, subjectId, page, limit, data, search) =>
        set((state) => ({
            lecturesCache: {
                ...state.lecturesCache,
                [`${batchId}:${subjectId || 'all'}:${page}:${limit}:${search || ''}`]: data
            }
        })),
    setBatchSubjects: (batchId, data) =>
        set((state) => ({
            batchSubjectsCache: {
                ...state.batchSubjectsCache,
                [batchId]: data
            },
            batchNames: {
                ...state.batchNames,
                [batchId]: data.batch?.name || state.batchNames[batchId] || ''
            }
        })),
    setLectureDetail: (lectureId, data) =>
        set((state) => ({
            lectureDetailCache: {
                ...state.lectureDetailCache,
                [lectureId]: data
            }
        })),
    setActiveSubject: (batchId, subjectId) =>
        set((state) => ({
            activeSubjects: {
                ...state.activeSubjects,
                [batchId]: subjectId
            }
        })),
}));
