import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, AuthContext, UserRole, AuthState } from '../types/auth.types';

interface AuthActions {
    setAuth: (user: AuthUser, token: string, context?: AuthContext, role?: UserRole | null, refreshToken?: string) => void;
    setUser: (user: AuthUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,
            context: null,
            role: null,
            isAuthenticated: false,
            isLoading: false,

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
            name: 'auth-storage',
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
