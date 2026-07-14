'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, User } from 'lucide-react';
import { authService } from '../services/auth.service';
import { toast } from 'sonner';
import { AuthForm, AuthFieldConfig } from '@/core/components/common/AuthForm';
import { validateEmail, validatePassword } from '../utils/validation';

interface RegisterFormProps {
    onSuccess?: () => void;
    loginHref?: string;
    initialInstitutionId?: string;
    primaryColor?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ 
    onSuccess, 
    loginHref = '/login', 
    initialInstitutionId = '',
    primaryColor 
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [institutionId, setInstitutionId] = useState(initialInstitutionId);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Update institutionId if initialInstitutionId changes (e.g. after fetch)
    useEffect(() => {
        if (initialInstitutionId) {
            setInstitutionId(initialInstitutionId);
        }
    }, [initialInstitutionId]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!institutionId) {
            setError('Institution information is missing. Please try refreshing the page.');
            return;
        }

        // Client-side validation
        if (!name.trim()) {
            setError('Please enter your full name.');
            return;
        }

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

        try {
            const response = await authService.register({
                name,
                email,
                password,
                institutionId,
            });

            if (response.success) {
                toast.success(response.message || 'Registration successful! Please login.');
                onSuccess?.();
            } else {
                setError(response.message || 'Registration failed. Please try again.');
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const message = axiosError.response?.data?.message || 'Registration failed. Please check your network connection.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const fields: AuthFieldConfig[] = [
        {
            id: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Enter your full name',
            icon: User,
            value: name,
            onChange: setName,
            required: true,
            autoComplete: 'name'
        },
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
            placeholder: 'Create password',
            icon: Lock,
            value: password,
            onChange: setPassword,
            required: true,
            autoComplete: 'new-password'
        }
    ];

    const footer = (
        <p className="text-center text-sm text-slate-500 font-medium pt-1">
            Already have an account?{' '}
            <Link 
                href={loginHref} 
                className="font-bold hover:underline"
                style={{ color: primaryColor }}
            >
                Sign In
            </Link>
        </p>
    );

    return (
        <AuthForm
            fields={fields}
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error}
            submitText="Register Now"
            loadingText="Creating account..."
            footer={footer}
            primaryColor={primaryColor}
        />
    );
};

export default RegisterForm;
