'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import apiClient from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { useAuthStore } from '@/core/store/auth.store';
import { cn } from '@/core/lib/utils/utils';
import { useParams } from 'next/navigation';
import { useInstituteStore } from '@/modules/institutes/institute/store/useInstituteStore';

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, onSuccess }) => {
    const [email, setEmail] = useState('shaheendeveloper@gmail.com');
    const [password, setPassword] = useState('shaheendeveloper@gmail.com');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { setAuth } = useAuthStore();
    const params = useParams();
    const slug = params.slug as string;
    const { detailsCache } = useInstituteStore();

    const institutionName = detailsCache[slug]?.name || 'CoachingKart';
    const institutionLogo = detailsCache[slug]?.logo;
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
                email,
                password
            });

            if (response.data.success) {
                const { user, token, context, institutionRole } = response.data.data;
                setAuth(user, token, context, institutionRole);
                if (onSuccess) {
                    onSuccess();
                } else {
                    onClose();
                }
            } else {
                setError(response.data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your network connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[440px] bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[28px] p-0 overflow-hidden">
                <div className="relative overflow-hidden pt-8 px-8 pb-10">
                    {/* Background decoration */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-50 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50" />

                    <DialogHeader className="relative z-10 mb-8 items-center text-center">
                        <div className="w-20 h-20 bg-gradient-to-b from-white to-slate-50/50 rounded-[24px] flex items-center justify-center mb-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group transition-transform hover:scale-105 duration-300 overflow-hidden border border-slate-100">
                            {institutionLogo ? (
                                <Image 
                                    src={institutionLogo} 
                                    alt={institutionName} 
                                    width={80} 
                                    height={80} 
                                    className="w-full h-full object-contain p-3.5"
                                />
                            ) : (
                                <div className="w-full h-full bg-primary-600 flex items-center justify-center">
                                    <Lock className="text-white" size={30} />
                                </div>
                            )}
                        </div>
                        <DialogTitle className="text-2xl font-bold text-slate-800 tracking-tight mb-1.5">
                            Welcome to {institutionName}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium text-[15px]">
                            Log in to access your courses
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleLogin} className="relative z-10 space-y-5">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-slate-50 border-slate-100 pl-11 h-13 text-slate-900 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Password</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="bg-slate-50 border-slate-100 pl-11 pr-11 h-13 text-slate-900 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium placeholder:text-slate-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-1 -mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
                                <AlertCircle className="text-rose-500" size={14} />
                                <p className="text-rose-500 text-xs font-bold tracking-tight">
                                    {error}
                                </p>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full h-14 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary-100 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 text-base cursor-pointer",
                                    isLoading && "animate-pulse"
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="bg-slate-50 p-6 flex justify-center border-t border-slate-100">
                    <p className="text-slate-500 text-xs font-medium">
                        Secure login for <b>{institutionName}</b> students
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
