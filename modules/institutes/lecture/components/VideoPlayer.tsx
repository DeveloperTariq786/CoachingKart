'use client';

import React from 'react';
import { cn } from '@/core/lib/utils/utils';
import {
    User,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

// Vidstack Imports
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
    MediaPlayer,
    MediaProvider,
    Poster,
} from '@vidstack/react';
import {
    DefaultVideoLayout,
    defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

interface VideoPlayerProps {
    lectureTitle: string;
    instructorName: string;
    instructorRole?: string;
    thumbnailUrl?: string;
    thumbnail?: string;
    videoUrl?: string;
    currentTime?: string;
    totalTime?: string;
    instructorProfileImage?: string;
    instructorTag?: string; // New prop for tag like "HOD"
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
    isNavigating?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    lectureTitle,
    instructorName,
    instructorRole,
    instructorTag, // New prop
    thumbnailUrl,
    thumbnail,
    videoUrl,
    instructorProfileImage,
    onNext,
    onPrev,
    hasNext = true,
    hasPrev = true,
    isNavigating = false
}) => {
    const displayThumbnail = thumbnail || thumbnailUrl || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200';

    return (
        <div className="flex flex-col">
            {/* Vidstack Player Container with Default YouTube-like Layout */}
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
                {videoUrl ? (
                    <MediaPlayer
                        title={lectureTitle}
                        src={videoUrl}
                        playsInline
                        className="w-full h-full"
                    >
                        <MediaProvider>
                            <Poster
                                className="absolute inset-0 block h-full w-full opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                                src={displayThumbnail}
                                alt={lectureTitle}
                            />
                        </MediaProvider>

                        {/* Vidstack Default Video Layout — YouTube-style controls */}
                        <DefaultVideoLayout
                            icons={defaultLayoutIcons}
                        />
                    </MediaPlayer>
                ) : (
                    <div className="relative w-full h-full">
                        <img
                            src={displayThumbnail}
                            alt={lectureTitle}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="flex items-start justify-between mt-3 gap-3">
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-foreground mb-1 leading-tight">
                        {lectureTitle}
                    </h1>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0 overflow-hidden">
                                {instructorProfileImage ? (
                                    <img
                                        src={instructorProfileImage}
                                        alt={instructorName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={18} className="text-primary-600" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm font-bold text-foreground leading-none mb-1">{instructorName}</p>
                                {instructorTag && (
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                                        {instructorTag}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={onPrev}
                                disabled={!hasPrev || isNavigating}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 bg-background border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-foreground transition-all duration-300 shadow-sm group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} className={cn("group-hover:-translate-x-0.5 transition-transform", isNavigating && "animate-pulse")} />
                                <span>Prev</span>
                            </button>
                            <button
                                onClick={onNext}
                                disabled={!hasNext || isNavigating}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-md shadow-primary-500/20 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Next</span>
                                <ChevronRight size={16} className={cn("group-hover:translate-x-0.5 transition-transform", isNavigating && "animate-pulse")} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
