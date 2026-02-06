'use client';

import React from 'react';
import { cn } from '@/core/lib/utils/utils';

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface LectureTabsProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const LectureTabs: React.FC<LectureTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs: Tab[] = [
        { id: 'overview', label: 'Overview' },
        { id: 'resources', label: 'Resources', count: 3 },
        { id: 'chat-room', label: 'Chat' },
    ];

    return (
        <div className="border-b border-slate-200">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "flex items-center gap-2 pb-3 text-sm font-semibold transition-all relative whitespace-nowrap",
                                isActive
                                    ? "text-primary-600"
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {tab.label}
                            {tab.count && (
                                <span
                                    className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                                        isActive
                                            ? "bg-primary-100 text-primary-600"
                                            : "bg-slate-100 text-slate-500"
                                    )}
                                >
                                    {tab.count}
                                </span>
                            )}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-600 rounded-t-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default LectureTabs;
