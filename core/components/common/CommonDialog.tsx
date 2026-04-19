'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/core/components/ui/dialog";
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommonDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    showCloseIcon?: boolean;
    onBackClick?: () => void;
}

export const CommonDialog: React.FC<CommonDialogProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    description, 
    children, 
    icon,
    showCloseIcon = true,
    onBackClick
}) => {
    const router = useRouter();

    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            router.back();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[440px] bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[28px] p-0 overflow-hidden outline-none">
                <div className="relative overflow-hidden pt-10 px-8 pb-10">
                    {/* Background decoration */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-50 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50" />

                    {showCloseIcon && (
                        <button 
                            onClick={handleBack}
                            className="absolute right-6 top-6 z-20 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <DialogHeader className="relative z-10 mb-8 items-center text-center">
                        {icon && (
                            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-200 group transition-transform hover:scale-105 duration-300">
                                {icon}
                            </div>
                        )}
                        <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium text-base">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
