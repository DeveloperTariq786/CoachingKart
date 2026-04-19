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
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-background/50 backdrop-blur-sm border border-foreground/5 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-12 h-12 rounded-xl bg-foreground/5" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-48 bg-slate-100" />
                                <Skeleton className="h-3 w-24 bg-slate-100" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-16 bg-slate-100" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="text-red-500" size={32} />
                </div>
                <p className="font-semibold text-foreground">Failed to load resources</p>
                <p className="text-sm">Please try again later</p>
            </div>
        );
    }

    if (!resources || resources.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-foreground/5 rounded-3xl bg-foreground/[0.02]">
                <div className="w-20 h-20 bg-background rounded-2xl shadow-sm flex items-center justify-center mb-6">
                    <FileText className="text-slate-200" size={40} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                    {emptyMessage || "No resources available"}
                </h3>

            </div>
        );
    }

    const getResourceIcon = (resource: Resource) => {
        if (resource.fileUrl) {
            const ext = resource.fileUrl.split('.').pop()?.toUpperCase();
            if (ext === 'PDF') return <div className="bg-rose-50 text-rose-500 p-3 rounded-xl"><FileText size={24} /></div>;
            return <div className="bg-blue-50 text-blue-500 p-3 rounded-xl"><FileText size={24} /></div>;
        }
        if (resource.externalUrl) {
            return <div className="bg-indigo-50 text-indigo-500 p-3 rounded-xl"><ExternalLink size={24} /></div>;
        }
        return <div className="bg-slate-50 text-slate-500 p-3 rounded-xl"><LinkIcon size={24} /></div>;
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
                <div className="flex items-center justify-between mb-4 shrink-0 px-2">
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {resources.length} {resources.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>
            )}

            <div className={cn(
                "space-y-3 pb-8",
                scrollable ? "flex-1 overflow-y-auto pr-2 -mr-2" : ""
            )}>
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        onClick={() => handleAction(resource)}
                        className="group flex items-center justify-between p-4 bg-background hover:bg-foreground/[0.02] border border-foreground/5 hover:border-primary-100 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            {getResourceIcon(resource)}
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-foreground truncate group-hover:text-primary-600 transition-colors">
                                    {getResourceTitle(resource)}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-[11px] text-slate-400 font-medium">
                                        {resource.fileUrl ? 'File' : resource.externalUrl ? 'Link' : 'Text Note'}
                                    </p>
                                    {resource.lecture && (
                                        <>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                            <p className="text-[11px] text-primary-500 font-semibold truncate">
                                                {resource.lecture.title}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            {resource.fileUrl ? (
                                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                    <Download size={18} />
                                </button>
                            ) : (
                                <button className="p-2 text-slate-400 group-hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                    <ExternalLink size={18} />
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
