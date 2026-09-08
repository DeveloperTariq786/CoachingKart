'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/core/lib/utils/utils';
import { BookOpen, SlidersHorizontal, X, Check } from 'lucide-react';
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
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (isMobileDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileDrawerOpen]);

    const activeSubjectObj = subjects.find(s => s.id === activeSubject);

    return (
        <>
            {/* Desktop: Horizontal subject scroll / tabs */}
            <div className="hidden md:block border-b border-foreground/10 mb-8 md:mb-10 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-8 lg:gap-10">
                    {subjects.map((subject) => {
                        const isActive = activeSubject === subject.id;

                        return (
                            <button
                                key={subject.id}
                                onClick={() => onSubjectChange(subject.id)}
                                className={cn(
                                    "pb-4 text-xs lg:text-sm font-bold transition-all relative group whitespace-nowrap cursor-pointer",
                                    isActive
                                        ? "text-primary-600"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {subject.name}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.3)]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Mobile: Subject Filter Trigger Bar */}
            <div className="md:hidden flex items-center justify-between mb-4 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block">Subject</span>
                    <span className="text-xs font-bold text-slate-900 truncate block">
                        {activeSubjectObj?.name || "Select Subject"}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMobileDrawerOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 active:scale-95"
                >
                    <SlidersHorizontal size={13} />
                    <span>Subjects</span>
                </button>
            </div>

            {/* Mobile Slide-over Sidebar (Drawer) */}
            {isMobileDrawerOpen && (
                <div className="md:hidden fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
                        onClick={() => setIsMobileDrawerOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 text-left">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-primary-50 text-primary-600 rounded-xl">
                                    <BookOpen size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none">Select Subject</h3>
                                    <p className="text-[11px] text-slate-400 mt-1">Filter lectures by subject</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsMobileDrawerOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                                aria-label="Close subject filter"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Subjects List */}
                        <div className="flex-1 overflow-y-auto p-4 no-scrollbar space-y-2">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">
                                Available Subjects ({subjects.length})
                            </div>
                            {subjects.map((subject) => {
                                const isActive = activeSubject === subject.id;
                                return (
                                    <button
                                        key={subject.id}
                                        type="button"
                                        onClick={() => {
                                            onSubjectChange(subject.id);
                                            setIsMobileDrawerOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border text-left cursor-pointer active:scale-98",
                                            isActive
                                                ? "bg-primary-50 text-primary-700 border-primary-300 shadow-xs"
                                                : "bg-slate-50/70 text-slate-700 border-slate-200/70 hover:bg-slate-100"
                                        )}
                                    >
                                        <span className="truncate">{subject.name}</span>
                                        {isActive && (
                                            <Check size={16} className="text-primary-600 shrink-0 ml-2 stroke-[2.5]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
                            <button
                                type="button"
                                onClick={() => setIsMobileDrawerOpen(false)}
                                className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubjectHeader;
