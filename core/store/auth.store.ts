import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, AuthContext, UserRole, AuthState } from '@/features/auth/types';

/**
 * Auth Store Actions
 */
interface AuthActions {
    setAuth: (user: AuthUser, token: string, context?: AuthContext, role?: UserRole | null, refreshToken?: string) => void;
    setUser: (user: AuthUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

/**
 * Zustand Auth Store with localStorage persistence
 */
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            // Initial State
            user: null,
            token: null,
            refreshToken: null,
            context: null,
            role: null,
            isAuthenticated: false,
            isLoading: false,

            // Actions
            setAuth: (user, token, context, role, refreshToken) => {
                set({
                    user,
                    token,
                    refreshToken: refreshToken || null,
                    context: context || 'PLATFORM',
                    role: role || null,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            setUser: (user) => {
                set({ user });
            },

            setToken: (token) => {
                set({ token });
            },

            logout: () => {
                // Clear all localStorage
                localStorage.clear();

                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    context: null,
                    role: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            setLoading: (loading) => {
                set({ isLoading: loading });
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
                context: state.context,
                role: state.role,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;
