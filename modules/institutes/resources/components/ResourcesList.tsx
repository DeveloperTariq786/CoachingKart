'use client';

import React from 'react';
import { FileText, ExternalLink, Download, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Resource } from '../types/resource.types';
import { cn } from '@/core/lib/utils/utils';

interface ResourcesListProps {
    resources: Resource[];
    isLoading: boolean;
    error: any;
    title?: string;
    scrollable?: boolean;
    emptyMessage?: string;
}

const ResourcesList: React.FC<ResourcesListProps> = ({
    resources,
    isLoading,
    error,
    title,
    scrollable = false,
    emptyMessage
}) => {

    if (isLoading) {
        return (
            <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 sm:p-4 bg-white border border-slate-100 rounded-xl sm:rounded-2xl">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <Skeleton className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-100" />
                            <div className="space-y-1.5 sm:space-y-2">
                                <Skeleton className="h-3.5 sm:h-4 w-36 sm:w-48 bg-slate-100" />
                                <Skeleton className="h-2.5 sm:h-3 w-20 sm:w-24 bg-slate-100" />
                            </div>
                        </div>
                        <Skeleton className="h-3.5 sm:h-4 w-12 sm:w-16 bg-slate-100" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-slate-500">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <AlertCircle className="text-red-500" size={24} />
                </div>
                <p className="font-semibold text-xs sm:text-base text-slate-900">Failed to load resources</p>
                <p className="text-[10px] sm:text-sm text-slate-500">Please try again later</p>
            </div>
        );
    }

    if (!resources || resources.length === 0) {
        return (
            <div className="min-h-[200px] sm:min-h-[240px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl sm:rounded-[32px] bg-white/50 p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-xs flex items-center justify-center mb-2.5">
                    <FileText className="text-slate-300" size={20} />
                </div>
                <p className="font-bold uppercase tracking-widest text-[10px] sm:text-xs text-slate-400">
                    {emptyMessage || "No resources available"}
                </p>
            </div>
        );
    }

    const getResourceIcon = (resource: Resource) => {
        if (resource.fileUrl) {
            const ext = resource.fileUrl.split('.').pop()?.toUpperCase();
            if (ext === 'PDF') return <div className="bg-rose-50 text-rose-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shrink-0"><FileText size={18} className="sm:size-6" /></div>;
            return <div className="bg-blue-50 text-blue-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shrink-0"><FileText size={18} className="sm:size-6" /></div>;
        }
        if (resource.externalUrl) {
            return <div className="bg-indigo-50 text-indigo-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shrink-0"><ExternalLink size={18} className="sm:size-6" /></div>;
        }
        return <div className="bg-slate-50 text-slate-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shrink-0"><LinkIcon size={18} className="sm:size-6" /></div>;
    };

    const getResourceTitle = (resource: Resource) => {
        if (resource.fileUrl) {
            const filename = resource.fileUrl.split('/').pop();
            return decodeURIComponent(filename || 'Resource File');
        }
        if (resource.externalUrl) {
            return resource.externalUrl;
        }
        if (resource.textContent) {
            return 'Notes';
        }
        return 'Lecture Resource';
    };

    const handleAction = (resource: Resource) => {
        const url = resource.fileUrl || resource.externalUrl;
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <div className={cn("flex flex-col", scrollable && "h-full min-h-0")}>
            {title && (
                <div className="flex items-center justify-between mb-3 sm:mb-4 shrink-0 px-1 sm:px-2">
                    <h3 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-400 bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                        {resources.length} {resources.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>
            )}

            <div className={cn(
                "space-y-2.5 sm:space-y-3 pb-8",
                scrollable ? "flex-1 overflow-y-auto pr-2 -mr-2" : ""
            )}>
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        onClick={() => handleAction(resource)}
                        className="group flex items-center justify-between p-3 sm:p-4 bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-primary-100 rounded-xl sm:rounded-2xl transition-all cursor-pointer shadow-xs hover:shadow-md"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            {getResourceIcon(resource)}
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                                    {getResourceTitle(resource)}
                                </p>
                                <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                                    <p className="text-[9px] sm:text-[11px] text-slate-400 font-medium">
                                        {resource.fileUrl ? 'File' : resource.externalUrl ? 'Link' : 'Text Note'}
                                    </p>
                                    {resource.lecture && (
                                        <>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                            <p className="text-[9px] sm:text-[11px] text-primary-500 font-semibold truncate">
                                                {resource.lecture.title}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center ml-2">
                            {resource.fileUrl ? (
                                <button className="p-1.5 sm:p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                    <Download size={16} className="sm:size-[18px]" />
                                </button>
                            ) : (
                                <button className="p-1.5 sm:p-2 text-slate-400 group-hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                    <ExternalLink size={16} className="sm:size-[18px]" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesList;
