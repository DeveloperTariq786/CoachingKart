'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/core/components/ui/card";
import {
    Play,
    User,
    Search
} from 'lucide-react';
import { Input } from "@/core/components/ui/input";

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Lecture {
    id: string;
    title: string;
    description: string;
    duration: string;
    instructor: string;
    timeLabel: string;
    thumbnail: string;
    subject: string;
}

interface LecturesProps {
    activeSubject: string;
}

const Lectures: React.FC<LecturesProps> = ({ activeSubject }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const params = useParams();

    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;
    const batchSlug = params.batchSlug as string;

    const basePath = `/${slug}/${courseSlug}/${batchSlug}`;

    const lectures: Lecture[] = [
        // Physics Lectures
        {
            id: '1',
            title: 'Lecture 01: Basics of Motion',
            description: 'Introduction to displacement, speed, and velocity vectors. Understanding the difference between scalar and vector quantities.',
            duration: '45:20',
            instructor: 'Prof. Alan Grant',
            timeLabel: 'Posted 2 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
            subject: 'physics'
        },
        {
            id: '2',
            title: 'Lecture 02: Acceleration & Gravity',
            description: 'Defining acceleration. Constant acceleration formulas. Free fall and gravity as a special case of constant acceleration.',
            duration: '52:10',
            instructor: 'Prof. Alan Grant',
            timeLabel: 'Posted yesterday',
            thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400',
            subject: 'physics'
        },
        // Chemistry Lectures
        {
            id: '3',
            title: 'Lecture 01: Atomic Structure',
            description: 'Understanding the basic components of an atom: protons, neutrons, and electrons. Exploring atomic number and mass number.',
            duration: '48:30',
            instructor: 'Dr. Sarah Connor',
            timeLabel: 'Posted 3 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1532187875605-23170942521f?auto=format&fit=crop&q=80&w=400',
            subject: 'chemistry'
        },
        {
            id: '4',
            title: 'Lecture 02: Chemical Bonding',
            description: 'Introduction to ionic and covalent bonding. Understanding valence electrons and the octet rule.',
            duration: '55:15',
            instructor: 'Dr. Sarah Connor',
            timeLabel: 'Posted yesterday',
            thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=400',
            subject: 'chemistry'
        },
        // Biology Lectures
        {
            id: '5',
            title: 'Lecture 01: Cell Biology Basics',
            description: 'The fundamental unit of life: the cell. Difference between prokaryotic and eukaryotic cells and their organelles.',
            duration: '50:45',
            instructor: 'Dr. Ellie Sattler',
            timeLabel: 'Posted 4 days ago',
            thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400',
            subject: 'biology'
        }
    ];

    const generateSlug = (text: string) => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const filteredLectures = lectures.filter(lecture => {
        const matchesSubject = activeSubject === 'all' || lecture.subject === activeSubject;
        const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lecture.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSubject && matchesSearch;
    });

    return (
        <div className="space-y-8">
            {/* Header + Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary-600 rounded-full" />
                    <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                        {activeSubject} Lectures
                    </h2>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <Input
                            placeholder="Search for lectures..."
                            className="pl-10 h-11 bg-white border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-0 focus:border-primary-500 transition-all font-medium placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* List Layout */}
            <div className="flex flex-col gap-4">
                {filteredLectures.length > 0 ? (
                    filteredLectures.map((lecture) => (
                        <Link
                            key={lecture.id}
                            href={`${basePath}/${generateSlug(lecture.title)}`}
                            className="block"
                        >
                            <Card
                                className="group border-slate-100 shadow-none hover:border-primary-100 hover:shadow-lg transition-all duration-300 rounded-[24px] overflow-hidden bg-white cursor-pointer"
                            >
                                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row gap-6">
                                    {/* Thumbnail Part */}
                                    <div className="relative w-full sm:w-[240px] aspect-video rounded-xl overflow-hidden shrink-0">
                                        <img
                                            src={lecture.thumbnail}
                                            alt={lecture.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors" />

                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                                                <Play size={24} className="text-white fill-white ml-1" />
                                            </div>
                                        </div>

                                        {/* Duration Badge */}
                                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-widest">
                                            {lecture.duration}
                                        </div>
                                    </div>

                                    {/* Content Part */}
                                    <div className="flex-1 flex flex-col justify-center min-w-0">
                                        <h3 className="text-base font-black text-slate-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors line-clamp-1">
                                            {lecture.title}
                                        </h3>
                                        <p className="text-slate-500 text-[11px] leading-relaxed font-medium mb-4 line-clamp-2">
                                            {lecture.description}
                                        </p>

                                        <div className="flex items-center justify-start text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center">
                                                    <User size={10} className="text-slate-400" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">{lecture.instructor}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="min-h-[300px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-[32px] bg-white/50">
                        <p className="font-bold uppercase tracking-widest text-xs">No lectures found for {activeSubject}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lectures;
