'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { ArrowRight, Filter } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/core/components/ui/select";

interface Batch {
    id: string;
    title: string;
    description: string;
    fee: number;
    year: string;
    classLevel: string;
    slug: string;
}

interface CourseProgramsProps {
    activeTab: string;
}

const CoursePrograms: React.FC<CourseProgramsProps> = ({ activeTab }) => {
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const courseSlug = params.courseSlug as string;

    const batches: Batch[] = [
        {
            id: '1',
            title: 'Power Step Classroom Course for NEET (UG)',
            description: 'Comprehensive year-long program for NEET concept building.',
            fee: 30000,
            year: '2025',
            classLevel: 'Class 12+/Droppers',
            slug: 'power-step-neet-2025'
        },
        {
            id: '2',
            title: 'JEE Main & Advanced Intensive Booster',
            description: 'Intensive module focused on JEE problem solving and speed.',
            fee: 35000,
            year: '2025',
            classLevel: 'Class 12',
            slug: 'jee-intensive-booster-2025'
        },
        {
            id: '3',
            title: 'Repeater Batch Phase II - Advanced Problem Solving',
            description: 'Focused batch for repeaters to master high-yield topics.',
            fee: 28000,
            year: '2026',
            classLevel: 'Class 12+/Droppers',
            slug: 'repeater-advanced-neet-2026'
        },
        {
            id: '4',
            title: 'Foundation Program for JEE/NEET 2026',
            description: 'Strengthen core concepts for Class 11 students with structured pedagogy.',
            fee: 25000,
            year: '2026',
            classLevel: 'Class 11',
            slug: 'foundation-program-2026'
        }
    ];

    // Double Filter: Component Year Filter + Lifted Tab (Class level) Filter
    const filteredBatches = batches.filter(batch => {
        const matchesTab = batch.classLevel === activeTab;
        const matchesYear = selectedYear === "all" || batch.year === selectedYear;
        return matchesTab && matchesYear;
    });

    const handleExploreBatch = (batchSlug: string) => {
        router.push(`/${slug}/${courseSlug}/${batchSlug}`);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Dropdown Filter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Batches</h2>
                        <p className="text-slate-500 text-sm mt-1">Showing for <span className="text-primary-600 font-bold">{activeTab}</span></p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Filter by batches:</span>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-full sm:w-[180px] h-10 bg-white border-slate-300 rounded-lg focus:ring-0 focus:outline-none transition-all shadow-none text-slate-800 font-bold outline-none">
                                <div className="flex items-center gap-2">
                                    <Filter size={14} className="text-slate-600" />
                                    <SelectValue placeholder="Select Year" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white border-slate-200 rounded-lg shadow-xl py-1">
                                <SelectItem value="all" className="font-bold text-slate-900 focus:bg-slate-100 focus:text-slate-900 rounded-md mx-1 cursor-pointer py-2">All Batches</SelectItem>
                                <SelectItem value="2023" className="font-bold text-slate-900 focus:bg-slate-100 focus:text-slate-900 rounded-md mx-1 cursor-pointer py-2">Batch 2023</SelectItem>
                                <SelectItem value="2024" className="font-bold text-slate-900 focus:bg-slate-100 focus:text-slate-900 rounded-md mx-1 cursor-pointer py-2">Batch 2024</SelectItem>
                                <SelectItem value="2025" className="font-bold text-slate-900 focus:bg-slate-100 focus:text-slate-900 rounded-md mx-1 cursor-pointer py-2">Batch 2025</SelectItem>
                                <SelectItem value="2026" className="font-bold text-slate-900 focus:bg-slate-100 focus:text-slate-900 rounded-md mx-1 cursor-pointer py-2">Batch 2026</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBatches.length > 0 ? (
                        filteredBatches.map((batch) => (
                            <Card
                                key={batch.id}
                                className="relative bg-white border-slate-200 shadow-none hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col rounded-2xl overflow-hidden group cursor-pointer"
                                onClick={() => handleExploreBatch(batch.slug)}
                            >
                                <CardContent className="p-8 flex-1 flex flex-col">
                                    {/* Metadata Row */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider">
                                            {batch.classLevel}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 border border-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                                            Session {batch.year}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                                        {batch.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                                        {batch.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-0.5">Academic Fee</span>
                                            <span className="text-xl font-bold text-slate-900">₹{batch.fee.toLocaleString()}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-primary-600 font-bold text-xs group/btn">
                                            EXPLORE
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover/btn:bg-primary-600 group-hover/btn:text-white transition-all">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-600 font-bold">No programs found for {activeTab} in {selectedYear === "all" ? "any session" : selectedYear}</p>
                            <Button variant="link" onClick={() => setSelectedYear('all')} className="text-primary-600 mt-2 font-bold">Clear year filter</Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CoursePrograms;
