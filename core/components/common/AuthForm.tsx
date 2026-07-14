'use client';

import React, { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';

export interface AuthFieldConfig {
    id: string;
    label: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    icon: React.ElementType;
    value: string;
    onChange: (val: string) => void;
    required?: boolean;
    autoComplete?: string;
}

interface AuthFormProps {
    fields: AuthFieldConfig[];
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    error?: string;
    submitText: string;
    loadingText: string;
    footer?: React.ReactNode;
    extraErrorContent?: React.ReactNode;
    primaryColor?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
    fields,
    onSubmit,
    isLoading,
    error,
    submitText,
    loadingText,
    footer,
    extraErrorContent,
    primaryColor = '#2563eb' // Default primary-600
}) => {
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const togglePasswordVisibility = (fieldId: string) => {
        setShowPassword(prev => ({
            ...prev,
            [fieldId]: !prev[fieldId]
        }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                    <label 
                        htmlFor={field.id}
                        className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1"
                    >
                        {field.label}
                    </label>
                    <div className="relative group">
                        <div 
                            className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                                focusedField === field.id ? "text-primary-600" : "text-slate-400"
                            )}
                            style={focusedField === field.id ? { color: primaryColor } : {}}
                        >
                            <field.icon size={18} />
                        </div>
                        <Input
                            id={field.id}
                            type={field.type === 'password' ? (showPassword[field.id] ? 'text' : 'password') : field.type}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            placeholder={field.placeholder}
                            className="bg-slate-50 border-slate-100 pl-11 pr-11 h-13 text-slate-900 rounded-2xl focus:bg-white transition-all font-medium placeholder:text-slate-300"
                            style={focusedField === field.id ? { 
                                borderColor: primaryColor,
                                boxShadow: `0 0 0 4px ${primaryColor}1a` // 1a is ~10% opacity
                            } : {}}
                            required={field.required}
                            autoComplete={field.autoComplete}
                        />
                        {field.type === 'password' && (
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility(field.id)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                aria-label={showPassword[field.id] ? "Hide password" : "Show password"}
                            >
                                {showPassword[field.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {(error || extraErrorContent) && (
                <div className="flex flex-col gap-1.5 px-1 -mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    {error && (
                        <div className="flex items-center gap-2">
                            <AlertCircle className="text-rose-500 flex-shrink-0" size={14} />
                            <p className="text-rose-500 text-xs font-bold tracking-tight">{error}</p>
                        </div>
                    )}
                    {extraErrorContent}
                </div>
            )}

            <div className="pt-4">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                        'w-full h-14 text-white font-bold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 text-base cursor-pointer',
                        isLoading && 'animate-pulse'
                    )}
                    style={{
                        backgroundColor: primaryColor,
                        boxShadow: `0 20px 25px -5px ${primaryColor}1a, 0 10px 10px -5px ${primaryColor}0a`
                    }}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>{loadingText}</span>
                        </>
                    ) : (
                        submitText
                    )}
                </Button>
            </div>

            {footer}
        </form>
    );
};

export default AuthForm;
