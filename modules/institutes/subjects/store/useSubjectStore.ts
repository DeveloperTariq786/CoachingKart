import { create } from 'zustand';
import { Subject } from '../types/subject.types';

interface SubjectState {
    subjects: Subject[];
    setSubjects: (subjects: Subject[]) => void;
}

export const useSubjectStore = create<SubjectState>((set) => ({
    subjects: [],
    setSubjects: (subjects) => set({ subjects }),
}));
