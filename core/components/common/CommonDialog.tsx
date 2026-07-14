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
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white border-none shadow-2xl rounded-xl p-0 overflow-hidden outline-none">
                <div className="relative pt-6 px-6 pb-6">
                    {showCloseIcon && (
                        <button 
                            onClick={handleBack}
                            className="absolute right-4 top-4 z-20 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <DialogHeader className="relative z-10 mb-4 items-start text-left">
                        {icon && (
                            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                                {icon}
                            </div>
                        )}
                        <DialogTitle className="text-xl font-semibold text-slate-900 tracking-tight">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 font-normal text-[15px] mt-2">
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
