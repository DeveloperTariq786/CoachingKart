'use client';

import React, { useEffect } from 'react';
import { X, MessageSquare, Clock, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { useChatStore } from '../store/chat.store';
import { Skeleton } from "@/core/components/ui/skeleton";

interface RecentChatsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    lectureId: string;
    onSelectSession: (sessionId: string) => void;
    currentSessionId: string | null;
}

const RecentChatsDialog: React.FC<RecentChatsDialogProps> = ({
    isOpen,
    onClose,
    email,
    lectureId,
    onSelectSession,
    currentSessionId
}) => {
    const { 
        sessions, 
        isLoadingSessions, 
        fetchSessions, 
        totalSessions, 
        currentPage, 
        setPage 
    } = useChatStore();

    const LIMIT = 10;

    useEffect(() => {
        if (isOpen && email && lectureId) {
            fetchSessions(email, lectureId, LIMIT, (currentPage - 1) * LIMIT);
        }
    }, [isOpen, email, lectureId, currentPage, fetchSessions]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(totalSessions / LIMIT);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            {/* Dialog Content */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-primary-50 text-primary-600 rounded-xl">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Recent Chats</h2>
                            <p className="text-xs text-slate-500 font-medium">Your session history for this video</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Session List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {isLoadingSessions ? (
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-transparent bg-slate-50/50">
                                    <Skeleton className="w-10 h-10 rounded-xl" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-3 w-[60%] rounded-full" />
                                        <Skeleton className="h-2 w-[30%] rounded-full opacity-50" />
                                    </div>
                                    <Skeleton className="w-4 h-4 rounded-full opacity-30" />
                                </div>
                            ))}
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-slate-900 font-bold mb-1">No recent chats</h3>
                            <p className="text-slate-500 text-sm max-w-[200px]">Start a new session to see it here later.</p>
                        </div>
                    ) : (
                        sessions.map((session) => {
                            const isCurrent = session.id === currentSessionId;
                            const date = new Date(session.create_time);
                            
                            return (
                                <button
                                    key={session.id}
                                    onClick={() => onSelectSession(session.id)}
                                    className={cn(
                                        "w-full flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 group text-left border relative cursor-pointer",
                                        isCurrent 
                                            ? "bg-primary-50 border-primary-100 ring-1 ring-primary-100" 
                                            : "hover:bg-slate-50 border-transparent hover:border-slate-100 active:scale-[0.98]"
                                    )}
                                >
                                    <div className={cn(
                                        "p-2.5 rounded-xl transition-colors",
                                        isCurrent ? "bg-white text-primary-600" : "bg-slate-100 text-slate-500 group-hover:bg-white"
                                    )}>
                                        <MessageSquare size={18} />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className={cn(
                                                "text-xs font-bold truncate pr-2",
                                                isCurrent ? "text-primary-900" : "text-slate-800"
                                            )}>
                                                {session.firstUserMessage || "New Session"}
                                            </p>
                                            <span className="text-[10px] whitespace-nowrap text-slate-400 font-medium">
                                                {new Intl.DateTimeFormat('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric', 
                                                    hour: 'numeric', 
                                                    minute: '2-digit' 
                                                }).format(date)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <ChevronRight 
                                        size={16} 
                                        className={cn(
                                            "mt-1 transition-all",
                                            isCurrent ? "text-primary-400 opacity-100" : "text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                                        )} 
                                    />
                                    
                                    {isCurrent && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full" />
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    {/* Pagination */}
                    {totalPages > 1 ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1 || isLoadingSessions}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-xs font-bold text-slate-600 min-w-16 text-center">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages || isLoadingSessions}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-[10px] text-slate-400 font-medium">
                            Showing {sessions.length} of {totalSessions} sessions
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecentChatsDialog;
