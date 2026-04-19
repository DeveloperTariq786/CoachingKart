import { create } from 'zustand';
import { Faculty } from '../types/faculty.types';

interface FacultyState {
    faculties: Faculty[];
    setFaculties: (faculties: Faculty[]) => void;
}

export const useFacultyStore = create<FacultyState>((set) => ({
    faculties: [],
    setFaculties: (faculties) => set({ faculties }),
}));
