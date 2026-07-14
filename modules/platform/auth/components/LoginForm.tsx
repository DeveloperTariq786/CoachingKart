'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/useAuthStore';
import { AuthForm, AuthFieldConfig } from '@/core/components/common/AuthForm';
import { validateEmail, validatePassword } from '../utils/validation';

interface LoginFormProps {
    onSuccess?: () => void;
    primaryColor?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, primaryColor }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForceLogin, setShowForceLogin] = useState(false);

    const { setAuth } = useAuthStore();

    const handleAuthSuccess = (data: {
        user: Parameters<typeof setAuth>[0];
        token: string;
        context?: Parameters<typeof setAuth>[2];
        institutionRole?: Parameters<typeof setAuth>[3];
    }) => {
        setAuth(data.user, data.token, data.context, data.institutionRole ?? null);
        onSuccess?.();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Client-side validation
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            setError(passwordValidation.message);
            return;
        }

        setIsLoading(true);
        setError('');
        setShowForceLogin(false);

        try {
            const response = await authService.login(email, password);

            if (response.success) {
                handleAuthSuccess(response.data);
            } else {
                setError(response.message || 'Login failed. Please check your credentials.');
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const message = axiosError.response?.data?.message || 'Login failed. Please check your network connection.';
            setError(message);
            if (message.toLowerCase().includes('already logged in')) {
                setShowForceLogin(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleForceLogin = async () => {
        setIsLoading(true);
        setError('');
        setShowForceLogin(false);

        try {
            const response = await authService.forceLogin(email, password);

            if (response.success) {
                handleAuthSuccess(response.data);
            } else {
                setError(response.message || 'Force login failed. Please try again.');
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            setError(axiosError.response?.data?.message || 'Force login failed. Please check your network connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const fields: AuthFieldConfig[] = [
        {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'Enter your email',
            icon: Mail,
            value: email,
            onChange: setEmail,
            required: true,
            autoComplete: 'email'
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            icon: Lock,
            value: password,
            onChange: setPassword,
            required: true,
            autoComplete: 'current-password'
        }
    ];

    const extraErrorContent = showForceLogin && (
        <button
            type="button"
            onClick={handleForceLogin}
            className="text-[11px] font-semibold hover:underline transition-colors cursor-pointer ml-5 text-left"
            style={{ color: primaryColor }}
        >
            Want to login here?
        </button>
    );

    return (
        <>
            <AuthForm
                fields={fields}
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
                submitText="Sign In"
                loadingText="Signing in..."
                extraErrorContent={extraErrorContent}
                primaryColor={primaryColor}
            />
            <div className="mt-3 text-right">
                <Link
                    href="/forgot-password"
                    className="text-xs font-semibold transition-colors hover:opacity-80"
                    style={{ color: primaryColor }}
                >
                    Forgot password?
                </Link>
            </div>
        </>
    );
};

export default LoginForm;
