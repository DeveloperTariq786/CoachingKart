import React, { useState } from 'react';
import { useBatchResources } from '../hooks/useBatchResources';
import ResourcesList from './ResourcesList';
import { Search } from 'lucide-react';
import { Input } from "@/core/components/ui/input";

interface BatchResourcesProps {
    batchId: string;
    subjectId: string | null;
    activeSubjectName: string;
}

const BatchResources: React.FC<BatchResourcesProps> = ({ batchId, subjectId, activeSubjectName }) => {
    const { data: resources, isLoading, error } = useBatchResources(batchId, subjectId);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResources = resources.filter(res => {
        const title = res.fileUrl ? res.fileUrl.split('/').pop() || '' :
            res.externalUrl || res.textContent || '';
        return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.lecture?.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="space-y-4">
            {/* Header + Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1 sm:w-1.5 h-4 sm:h-6 bg-primary-600 rounded-full" />
                    <h2 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase">
                        {activeSubjectName ? `${activeSubjectName} Resources` : 'All Learning Resources'}
                    </h2>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <Input
                            placeholder="Search for resources..."
                            className="pl-9 sm:pl-10 h-9 sm:h-11 bg-white border-slate-200 text-xs sm:text-sm text-slate-900 rounded-xl focus:outline-none focus:ring-0 focus:border-primary-500 transition-all font-medium placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <ResourcesList
                resources={filteredResources}
                isLoading={isLoading}
                error={error}
                title=""
                emptyMessage={searchQuery ? "No resources match your search." : "No resources found for this subject in the batch."}
            />
        </div>
    );
};

export default BatchResources;
