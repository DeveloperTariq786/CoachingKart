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

export interface LoginResponseData {
    user: AuthUser;
    token: string;
    context: AuthContext;
    institutionRole?: UserRole | null;
}

export interface AuthApiResponse {
    success: boolean;
    message?: string;
    data: LoginResponseData;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    institutionId: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}
