import { create } from 'zustand';
import { ChatSession } from '../types/chat.types';
import { chatService } from '../services/chat.service';

interface ChatState {
    sessions: ChatSession[];
    sessionCache: Record<number, ChatSession[]>; // Cache sessions by offset
    isLoadingSessions: boolean;
    totalSessions: number;
    currentPage: number;
    lastFetchedLectureId: string | null;
    lastFetchedEmail: string | null;
}

interface ChatActions {
    fetchSessions: (email: string, lectureId: string, limit?: number, offset?: number, force?: boolean) => Promise<void>;
    setSessions: (sessions: ChatSession[]) => void;
    setPage: (page: number) => void;
    clearSessions: () => void;
}

export type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>((set, get) => ({
    sessions: [],
    sessionCache: {},
    isLoadingSessions: false,
    totalSessions: 0,
    currentPage: 1,
    lastFetchedLectureId: null,
    lastFetchedEmail: null,

    fetchSessions: async (email, lectureId, limit = 10, offset = 0, force = false) => {
        const { lastFetchedLectureId, lastFetchedEmail, sessionCache } = get();
        
        // Check if lecture/email changed - if so, clear everything
        const isIdentityChanged = lastFetchedLectureId !== lectureId || lastFetchedEmail !== email;
        
        if (isIdentityChanged) {
            set({ sessionCache: {}, sessions: [], lastFetchedLectureId: lectureId, lastFetchedEmail: email });
        }

        // Use cache if not forced and data exists for this offset
        if (!force && !isIdentityChanged && sessionCache[offset]) {
            set({ sessions: sessionCache[offset] });
            return;
        }

        set({ isLoadingSessions: true });
        try {
            const data = await chatService.getSessions(email, lectureId, limit, offset);
            set((state) => ({ 
                sessions: data.sessions, 
                sessionCache: { ...state.sessionCache, [offset]: data.sessions },
                totalSessions: data.total,
                lastFetchedLectureId: lectureId,
                lastFetchedEmail: email,
                isLoadingSessions: false 
            }));
        } catch (error) {
            console.error('Failed to fetch sessions in store:', error);
            set({ isLoadingSessions: false });
        }
    },

    setSessions: (sessions) => set({ sessions }),

    setPage: (page) => set({ currentPage: page }),
    
    clearSessions: () => set({ 
        sessions: [], 
        sessionCache: {},
        totalSessions: 0,
        currentPage: 1,
        lastFetchedLectureId: null, 
        lastFetchedEmail: null
    }),
}));

export default useChatStore;
