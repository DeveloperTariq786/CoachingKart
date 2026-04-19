'use client';

import React from 'react';
import { Mail, Shield, User as UserIcon, Calendar } from 'lucide-react';
import { StudentProfileData } from '../types/profile';

interface ProfileSummaryProps {
    profile: StudentProfileData;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ profile }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 border-l-4 border-slate-900 pl-4">Account Summary</h2>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400">
                            <Mail size={18} />
                        </div>
                        <div className="overflow-hidden text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">Email Address</p>
                            <p className="font-semibold text-slate-700 truncate">{profile.email}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400">
                            <Shield size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">Account Status</p>
                            <p className="font-semibold text-green-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Verified Student
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400">
                            <Calendar size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">Member Since</p>
                            <p className="font-semibold text-slate-700">{formatDate(profile.enrolledAt)}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400">
                            <UserIcon size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">Role</p>
                            <p className="font-semibold text-slate-700">Student</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
