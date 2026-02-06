'use client';

import React from 'react';
import InstitutionResultsHeader from './InstitutionResultsHeader';
import InstitutionResultsBody from './InstitutionResultsBody';

const InstitutionResults: React.FC = () => {
    return (
        <div className="w-full bg-slate-50 min-h-screen">
            <InstitutionResultsHeader />
            <InstitutionResultsBody />
        </div>
    );
};

export default InstitutionResults;
