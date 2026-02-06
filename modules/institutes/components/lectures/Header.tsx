'use client';

import React from 'react';
import { cn } from '@/core/lib/utils/utils';
import { FlaskConical, Atom, Activity } from 'lucide-react';

interface Subject {
    id: string;
    name: string;
    icon: React.ElementType;
}

interface SubjectHeaderProps {
    activeSubject: string;
    onSubjectChange: (id: string) => void;
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
    activeSubject,
    onSubjectChange
}) => {
    const subjects: Subject[] = [
        { id: 'physics', name: 'Physics', icon: FlaskConical },
        { id: 'chemistry', name: 'Chemistry', icon: Atom },
        { id: 'biology', name: 'Biology', icon: Activity },
    ];

    return (
        <div className="border-b border-slate-200 mb-10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-10">
                {subjects.map((subject) => {
                    const isActive = activeSubject === subject.id;
                    const Icon = subject.icon;

                    return (
                        <button
                            key={subject.id}
                            onClick={() => onSubjectChange(subject.id)}
                            className={cn(
                                "flex items-center gap-2.5 pb-4 text-sm font-bold transition-all relative group whitespace-nowrap",
                                isActive
                                    ? "text-primary-600"
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <Icon
                                size={18}
                                className={cn(
                                    "transition-all duration-300",
                                    isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-500"
                                )}
                            />
                            {subject.name}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.3)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SubjectHeader;
