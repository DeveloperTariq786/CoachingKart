'use client';

import React from 'react';
import { cn } from '@/core/lib/utils/utils';
import { FlaskConical, Atom, Activity, BookOpen } from 'lucide-react';
import { Subject } from '../types/lecture.types';

interface SubjectHeaderProps {
    subjects: Subject[];
    activeSubject: string;
    onSubjectChange: (id: string) => void;
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
    subjects,
    activeSubject,
    onSubjectChange
}) => {
    // Default subjects if none provided or for initial loading

    return (
        <div className="border-b border-foreground/10 mb-10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-10">
                {subjects.map((subject) => {
                    const isActive = activeSubject === subject.id;

                    return (
                        <button
                            key={subject.id}
                            onClick={() => onSubjectChange(subject.id)}
                            className={cn(
                                "flex items-center gap-2.5 pb-4 text-sm font-bold transition-all relative group whitespace-nowrap cursor-pointer",
                                isActive
                                    ? "text-primary-600"
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {subject.icon ? (
                                <img src={subject.icon} alt={subject.name} className="w-[18px] h-[18px] object-contain" />
                            ) : (
                                <BookOpen size={18} />
                            )}
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
