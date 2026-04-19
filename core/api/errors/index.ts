import { AxiosError } from 'axios';
import { toast } from 'sonner';

/**
 * Custom Application Error class
 */
export class ApplicationError extends Error {
    public readonly code: string;
    public readonly statusCode: number;
    public readonly context?: Record<string, unknown>;

    constructor(
        message: string,
        code: string = 'UNKNOWN_ERROR',
        statusCode: number = 500,
        context?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'ApplicationError';
        this.code = code;
        this.statusCode = statusCode;
        this.context = context;
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}

/**
 * App Error structure for normalized error handling
 */
export interface AppError {
    message: string;
    code: string;
    statusCode: number;
    originalError?: unknown;
}

/**
 * Normalize different error types into consistent AppError format
 */
export function handleError(error: unknown): AppError {
    // Handle Axios errors
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        const statusCode = error.response?.status || 500;
        const code = error.code || 'API_ERROR';

        return {
            message,
            code,
            statusCode,
            originalError: error,
        };
    }

    // Handle ApplicationError
    if (error instanceof ApplicationError) {
        return {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            originalError: error,
        };
    }

    // Handle standard Error
    if (error instanceof Error) {
        return {
            message: error.message,
            code: 'ERROR',
            statusCode: 500,
            originalError: error,
        };
    }

    // Handle unknown errors
    return {
        message: 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 500,
        originalError: error,
    };
}

/**
 * Display error toast notification
 */
export function showErrorToast(error: unknown): void {
    const appError = handleError(error);
    toast.error(appError.message);
}

/**
 * Extract user-friendly error message from any error type
 */
export function getErrorMessage(error: unknown): string {
    return handleError(error).message;
}

/**
 * Check if an error is network-related
 */
export function isNetworkError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return !error.response && error.code !== 'ECONNABORTED';
    }
    return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.response?.status === 401;
    }
    return false;
}
