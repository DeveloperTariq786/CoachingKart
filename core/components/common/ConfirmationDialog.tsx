'use client';

import React from 'react';
import { CommonDialog } from './CommonDialog';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils/utils';
import { Loader2 } from 'lucide-react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: 'danger' | 'primary';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    variant = 'primary'
}) => {
    return (
        <CommonDialog
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            showCloseIcon={!isLoading}
        >
            <div className="flex items-center justify-end gap-3 mt-6">
                <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                     className="px-6 h-10 rounded-lg font-medium text-slate-600 border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-700 transition-all text-sm cursor-pointer"
               >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={cn(
                        "px-8 h-10 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm cursor-pointer",
                        variant === 'danger' 
                            ? "bg-rose-600 hover:bg-rose-700 text-white" 
                            : "bg-primary-600 hover:bg-primary-700 text-white"
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        confirmText
                    )}
                </Button>
            </div>
        </CommonDialog>
    );
};
