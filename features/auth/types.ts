export type AuthContext = 'PLATFORM' | 'INSTITUTION';
export type UserRole = 'ADMIN' | 'STUDENT' | 'FACULTY' | 'USER';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    refreshToken: string | null;
    context: AuthContext | null;
    role: UserRole | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
