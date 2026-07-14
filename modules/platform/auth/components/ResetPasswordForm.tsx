'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import { AuthForm, AuthFieldConfig } from '@/core/components/common/AuthForm';
import { validateEmail, validatePassword } from '../utils/validation';

interface ResetPasswordFormProps {
    primaryColor?: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ primaryColor }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug') ?? undefined;

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            setError(passwordValidation.message);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await authService.resetPassword(email, newPassword);

            if (response.success) {
                toast.success(response.message || 'Password reset successfully. Redirecting to sign in...');
                setTimeout(() => {
                    router.push(`/login${slug ? `?slug=${slug}` : ''}`);
                }, 1500);
            } else {
                setError(response.message || 'Password reset failed. Please try again.');
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            setError(axiosError.response?.data?.message || 'Password reset failed. Please check your network connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const fields: AuthFieldConfig[] = [
        {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'Enter your registered email',
            icon: Mail,
            value: email,
            onChange: setEmail,
            required: true,
            autoComplete: 'email'
        },
        {
            id: 'newPassword',
            label: 'New Password',
            type: 'password',
            placeholder: 'Enter new password',
            icon: Lock,
            value: newPassword,
            onChange: setNewPassword,
            required: true,
            autoComplete: 'new-password'
        },
        {
            id: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm new password',
            icon: Lock,
            value: confirmPassword,
            onChange: setConfirmPassword,
            required: true,
            autoComplete: 'new-password'
        }
    ];

    return (
        <AuthForm
            fields={fields}
            onSubmit={handleResetPassword}
            isLoading={isLoading}
            error={error}
            submitText="Reset Password"
            loadingText="Resetting..."
            primaryColor={primaryColor}
        />
    );
};

export default ResetPasswordForm;
