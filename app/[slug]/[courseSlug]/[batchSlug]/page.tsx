'use client';

import React, { useState } from 'react';
import SubjectHeader from '@/modules/institutes/components/lectures/Header';
import Lectures from '@/modules/institutes/components/lectures/Lectures';

export default function CourseDashboardPage() {
    const [activeSubject, setActiveSubject] = useState('physics');

    return (
        <>
            {/* Subject Header (Tabs) */}
            <SubjectHeader
                activeSubject={activeSubject}
                onSubjectChange={setActiveSubject}
            />

            {/* Dashboard Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Lectures activeSubject={activeSubject} />
            </div>
        </>
    );
}
