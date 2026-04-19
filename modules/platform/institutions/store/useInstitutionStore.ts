import { create } from 'zustand';
import { Institution } from '../types/institution.types';

interface InstitutionState {
    institutions: Institution[];
    setInstitutions: (institutions: Institution[]) => void;
}

export const useInstitutionStore = create<InstitutionState>((set) => ({
    institutions: [],
    setInstitutions: (institutions) => set({ institutions }),
}));
