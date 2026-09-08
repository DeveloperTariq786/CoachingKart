import React from 'react';
import { useLectureResources } from '../hooks/useLectureResources';
import ResourcesList from './ResourcesList';
import { cn } from '@/core/lib/utils/utils';

interface LectureResourcesProps {
    lectureId: string;
    isSidebar?: boolean;
}

const LectureResources: React.FC<LectureResourcesProps> = ({ lectureId, isSidebar }) => {
    const { data: resources, isLoading, error } = useLectureResources(lectureId);

    return (
        <div className={cn(
            "flex flex-col min-h-0 overflow-hidden",
            isSidebar ? "h-[calc(100vh-140px)]" : "h-[500px]"
        )}>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-6 mb-4 sm:mb-8 shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-1 sm:w-1.5 h-4 sm:h-6 bg-primary-600 rounded-full shrink-0" />
                    <h2 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase truncate">
                        Learning Resources
                    </h2>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ResourcesList
                    resources={resources}
                    isLoading={isLoading}
                    error={error}
                    title=""
                    //emptyMessage="No resources available for this lecture."
                    scrollable={true}
                />
            </div>
        </div>
    );
};

export default LectureResources;
