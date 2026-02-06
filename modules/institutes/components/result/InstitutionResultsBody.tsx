'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/core/components/ui/card';

interface Student {
    id: string;
    name: string;
    rank: string;
    marks?: string;
    imageUrl: string;
}

interface ResultSection {
    title: string;
    stats: {
        label: string;
        value: string;
    }[];
    students: Student[];
}

const SECTIONS: ResultSection[] = [
    {
        title: 'NEET-UG 2025',
        stats: [
            { label: 'in TOP 10 AIR', value: '5' },
            { label: 'State/UT Toppers', value: '11' },
            { label: 'in TOP 100 AIR', value: '35' },
        ],
        students: [
            { id: '1', name: 'Utkarsh Awadhiya', rank: '2', marks: '682', imageUrl: 'https://picsum.photos/id/101/400/500' },
            { id: '2', name: 'Krishang Joshi', rank: '3', marks: '681', imageUrl: 'https://picsum.photos/id/102/400/500' },
            { id: '3', name: 'Avika Aggarwal', rank: '5', marks: '680', imageUrl: 'https://picsum.photos/id/103/400/500' },
            { id: '4', name: 'Harsh Kedawat', rank: '9', marks: '675', imageUrl: 'https://picsum.photos/id/104/400/500' },
        ]
    }
];

const FilterDropdown: React.FC<{ label: string }> = ({ label }) => (
    <div className="w-full mb-4">
        <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors">
            {label}
            <ChevronDown size={18} className="text-slate-400" />
        </button>
    </div>
);

const InstitutionResultsBody: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm sticky top-32">
                        <h4 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Filters</h4>

                        <FilterDropdown label="Exams" />
                        <FilterDropdown label="Years" />
                    </div>
                </aside>

                {/* Main Content Areas */}
                <main className="flex-1 space-y-20">
                    {SECTIONS.map((section, sIdx) => (
                        <div key={sIdx} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center">
                            <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-8 md:mb-12 tracking-tight uppercase text-center">
                                {section.title}
                            </h3>

                            {/* Student Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                                {section.students.map((student) => (
                                    <Card key={student.id} className="group overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col rounded-xl">
                                        <CardContent className="p-0 flex flex-col h-full bg-white">
                                            {/* Image Section */}
                                            <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
                                                <Image
                                                    src={student.imageUrl}
                                                    alt={student.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                                {/* AIR Rank Badge - Clean & Professional */}
                                                <div className="absolute top-0 left-0 bg-primary-600 text-white px-3 py-1.5 font-bold text-xs md:text-sm rounded-br-2xl shadow-sm z-10 uppercase tracking-wider">
                                                    AIR: {student.rank}
                                                </div>
                                            </div>

                                            {/* Info Section - Clean Typography */}
                                            <div className="p-3 md:p-4 flex flex-col justify-center text-center">
                                                <h4 className="text-sm md:text-md font-bold text-slate-900 mb-1 line-clamp-1">{student.name}</h4>
                                                <div className="flex items-center justify-center gap-2 mt-1">
                                                    <div className="text-[10px] md:text-[11px] font-medium text-slate-500 flex items-center gap-1">
                                                        Score: <span className="text-primary-600 font-bold">{student.marks}</span>
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <div className="text-[10px] md:text-[11px] font-medium text-slate-500">
                                                        Rank: <span className="text-primary-600 font-bold">{student.rank}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default InstitutionResultsBody;
