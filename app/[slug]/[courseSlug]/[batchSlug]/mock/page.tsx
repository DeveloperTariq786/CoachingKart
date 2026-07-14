'use client';

import React from 'react';

export default function MockPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">Mock</h2>
                <p className="text-slate-500">View and take your scheduled tests and assessments here.</p>
            </div>
        </div>
    );
}
