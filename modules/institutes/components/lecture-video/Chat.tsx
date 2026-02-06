'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/core/lib/utils/utils';
import { Send, MoreVertical, Image as ImageIcon, Paperclip, Smile } from 'lucide-react';

interface Message {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    isOwn?: boolean;
}

interface ChatProps {
    lectureId?: string;
}

const Chat: React.FC<ChatProps> = ({ lectureId }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages] = useState<Message[]>([
        {
            id: '1',
            author: 'You',
            content: 'What is inertia?',
            timestamp: '10:05 AM',
            isOwn: true
        },
        {
            id: '2',
            author: 'AI',
            content: 'Inertia is the resistance of an object to any change in its motion.',
            timestamp: '10:05 AM',
            isOwn: false
        },
        {
            id: '3',
            author: 'You',
            content: 'Give me an example',
            timestamp: '10:06 AM',
            isOwn: true
        },
        {
            id: '4',
            author: 'AI',
            content: 'When a car stops suddenly, passengers lean forward due to inertia.',
            timestamp: '10:06 AM',
            isOwn: false
        },
        {
            id: '5',
            author: 'You',
            content: 'Does it depend on mass?',
            timestamp: '10:10 AM',
            isOwn: true
        },
        {
            id: '6',
            author: 'AI',
            content: 'Yes, inertia is directly proportional to mass. The more mass an object has, the greater its inertia.',
            timestamp: '10:10 AM',
            isOwn: false
        },
        {
            id: '7',
            author: 'You',
            content: "What about Newton's first law?",
            timestamp: '10:12 AM',
            isOwn: true
        },
        {
            id: '8',
            author: 'AI',
            content: "Newton's first law is often called the Law of Inertia. It states that an object will remain at rest or in uniform motion unless acted upon by an external force.",
            timestamp: '10:12 AM',
            isOwn: false
        }
    ]);

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

    const handleSend = () => {
        if (!message.trim()) return;
        // Handle sending message
        setMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">VeoChat</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim()}
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
