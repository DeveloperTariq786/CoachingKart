'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn, generateSessionId } from '@/core/lib/utils/utils';
import { Send, MoreVertical, Image as ImageIcon, Paperclip, Smile, Plus, History, Maximize2, Minimize2 } from 'lucide-react';
import { useAuthStore } from '@/modules/platform/auth';
import { chatService } from '@/modules/institutes/chat/services/chat.service';
import { Message, ChatProps, ChatSession } from '@/modules/institutes/chat/types/chat.types';
import RecentChatsDialog from './RecentChatsDialog';
import { useChatStore } from '../store/chat.store';
import { Skeleton } from "@/core/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/core/components/ui/tooltip";

const Chat: React.FC<ChatProps> = ({ lectureId, sessionId }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { fetchSessions } = useChatStore();

    const { user } = useAuthStore();
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionId || null);

    // Keep currentSessionId in sync with the prop if provided from outside
    useEffect(() => {
        if (sessionId) {
            setCurrentSessionId(sessionId);
        }
    }, [sessionId]);


    const createSession = async () => {
        if (!user?.email || messages.length === 0) return;

        // Generate a unique session ID locally for Optimistic UI
        const newSessionId = generateSessionId(lectureId || "default");

        // Update state immediately without waiting for API
        setCurrentSessionId(newSessionId);
        setMessages([]);

        try {
            // Register the session on the background
            await chatService.createSession(
                user.email,
                newSessionId,
                lectureId || "c7209c5b-3c99-476a-abfc-c33ea3306399"
            );

            // Refresh sessions list in store in background
            if (user.email) {
                fetchSessions(user.email, lectureId || "c7209c5b-3c99-476a-abfc-c33ea3306399", 10, 0, true);
            }
        } catch (error) {
            console.error('Background session creation failed:', error);
            // Since we're optimistic, we don't revert immediately to avoid UI flicker,
            // but we log the error for debugging.
        }
    };

    /* Removed auto-session creation on mount (handled by page) */


    const [messages, setMessages] = useState<Message[]>([]);




    const isFirstMount = useRef(true);

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior, block: 'nearest' });
        }
    };

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            scrollToBottom('auto');
            return;
        }
        scrollToBottom('smooth');
    }, [messages]);

    const handleSend = async () => {
        if (!message.trim() || !user?.email || !currentSessionId || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            author: 'You',
            content: message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };

        setMessages(prev => [...prev, userMsg]);
        const currentMsg = message;
        setMessage('');
        setIsLoading(true);

        try {
            const aiResponse = await chatService.sendMessage(user.email, currentSessionId, currentMsg);

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                author: 'AI',
                content: aiResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: false
            };
            setMessages(prev => [...prev, aiMsg]);

            // If this was the first message, refresh sessions to get the new session title
            if (messages.length === 0 && user.email) {
                fetchSessions(user.email, lectureId || "c7209c5b-3c99-476a-abfc-c33ea3306399", 10, 0, true);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            const errMsg: Message = {
                id: (Date.now() + 2).toString(),
                author: 'System',
                content: 'Failed to send message. Please try again.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: false
            };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectSession = async (newSessionId: string) => {
        if (!user?.email) return;

        setCurrentSessionId(newSessionId);
        setIsHistoryOpen(false);
        setIsHistoryLoading(true);

        try {
            const detail = await chatService.getSessionDetail(user.email, newSessionId);

            // Map backend events to frontend Message format
            const historyMessages: Message[] = detail.events.map(event => ({
                id: event.id,
                author: event.content.role === 'user' ? 'You' : 'AI',
                content: event.content.parts[0]?.text || '',
                timestamp: new Date(event.timestamp * 1000).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                isOwn: event.content.role === 'user'
            }));

            setMessages(historyMessages);
        } catch (error) {
            console.error('Failed to load session history:', error);
            setMessages([]);
        } finally {
            setIsHistoryLoading(false);
        }
    };

    return (
        <div className={cn(
            "flex flex-col overflow-hidden transition-all duration-300",
            isExpanded
                ? "fixed inset-0 z-[100] bg-background h-screen w-screen rounded-none"
                : "h-full bg-background rounded-2xl border border-slate-100"
        )}>
            <div className={cn(
                "flex flex-col h-full w-full",
                isExpanded && "max-w-4xl mx-auto shadow-2xl bg-background"
            )}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-foreground text-sm">VeoChat</h3>
                        {isExpanded && (
                            <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Full Screen Mode</span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
                                    >
                                        {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isExpanded ? "Exit Full Screen" : "Full Screen"}</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={createSession}
                                        className="p-1.5 rounded-lg transition-colors text-slate-400 hover:bg-slate-50 hover:text-primary-600 cursor-pointer"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{messages.length === 0 ? "Session already exist" : "New Session"}</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setIsHistoryOpen(true)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
                                    >
                                        <History size={18} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Recent History</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 relative min-h-0">
                    {isHistoryLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className={cn("flex flex-col gap-1", i % 2 === 0 ? "items-end" : "items-start")}>
                                    <Skeleton className={cn(
                                        "h-10 rounded-2xl",
                                        i % 2 === 0 ? "w-[60%] rounded-br-md" : "w-[70%] rounded-bl-md"
                                    )} />
                                    <Skeleton className="h-3 w-16 opacity-50" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {messages.length === 0 && !isLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-700">
                                    <h4 className="text-slate-900 font-bold text-lg mb-2">Welcome to VeoChat</h4>
                                    <p className="text-slate-500 text-sm max-w-[280px] leading-relaxed">
                                        Ask me anything about this lecture to get started!
                                    </p>
                                </div>
                            )}

                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex flex-col max-w-[95%]",
                                        msg.isOwn ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                                            msg.isOwn
                                                ? "bg-primary-600 text-white rounded-br-md"
                                                : "bg-slate-100 text-slate-800 rounded-bl-md"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex flex-col items-start max-w-[95%] animate-in fade-in slide-in-from-bottom-2">
                                    <div className="px-4 py-2.5 rounded-2xl text-sm bg-slate-50 text-slate-400 rounded-bl-md flex items-center gap-1.5">
                                        <span className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                                        </span>
                                        <span className="italic text-xs font-medium">VeoChat is thinking...</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={currentSessionId ? "Ask about lecture..." : "Initializing session..."}
                            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-slate-400 outline-none"
                            disabled={isLoading || !currentSessionId}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || isLoading || !currentSessionId}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                message.trim()
                                    ? "bg-primary-600 text-white hover:bg-primary-700"
                                    : "bg-slate-200 text-slate-400"
                            )}
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>

                <RecentChatsDialog
                    isOpen={isHistoryOpen}
                    onClose={() => setIsHistoryOpen(false)}
                    email={user?.email || ''}
                    lectureId={lectureId || "c7209c5b-3c99-476a-abfc-c33ea3306399"}
                    onSelectSession={handleSelectSession}
                    currentSessionId={currentSessionId}
                />
            </div>
        </div>
    );
};

export default Chat;
