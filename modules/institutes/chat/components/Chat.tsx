'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn, generateSessionId } from '@/core/lib/utils/utils';
import { Send, Image as ImageIcon, Paperclip, Smile, Plus, History, Maximize2, Minimize2 } from 'lucide-react';
import { useAuthStore } from '@/core/store/auth.store';
import { chatService } from '../services/chat.service';
import { Message, ChatProps } from '../types/chat.types';

const Chat: React.FC<ChatProps> = ({ lectureId, sessionId }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuthStore();
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionId || null);


    // Keep currentSessionId in sync with the prop if provided from outside
    useEffect(() => {
        if (sessionId) {
            setCurrentSessionId(sessionId);
        }
    }, [sessionId]);


    const createSession = async () => {
        if (!user?.email) return;

        // Generate a unique session ID using common utility
        const sessionId = generateSessionId();

        try {
            const data = await chatService.createSession(
                user.email,
                sessionId,
                lectureId || "b1808c1c-9815-475f-be92-cba41df8f2b6"
            );

            if (data && data.id) {
                setCurrentSessionId(data.id);
                console.log('Chat session created:', data.id);
                // Reset to empty state for the new session
                setMessages([]);
            }
        } catch (error) {
            console.error('Error in Chat session creation flow:', error);
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

    return (
        <div className={cn(
            "flex flex-col bg-white overflow-hidden transition-all duration-300",
            isExpanded
                ? "fixed inset-0 z-[100] rounded-none h-screen w-screen"
                : "h-full rounded-2xl border border-slate-100"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-900 text-sm">Video Chat</h3>
                    {isExpanded && (
                        <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Full Screen Mode</span>
                    )}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
                        title={isExpanded ? "Exit Full Screen" : "Full Screen"}
                    >
                        {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                    <button
                        onClick={createSession}
                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
                        title="New Session"
                    >
                        <Plus size={18} />
                    </button>
                    <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors cursor-pointer" title="Recent History">
                        <History size={18} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative min-h-0">
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
                            {/* <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                            </span> */}
                            <span className="italic text-xs font-medium">VeoChat is thinking...</span>
                        </div>
                    </div>
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
                        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
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
        </div>
    );
};

export default Chat;
