'use client';

import React, { useState } from 'react';
import { cn } from '@/core/lib/utils/utils';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Maximize,
    Settings,
    PictureInPicture2,
    User,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface VideoPlayerProps {
    lectureTitle: string;
    instructorName: string;
    instructorRole?: string;
    thumbnailUrl?: string;
    currentTime?: string;
    totalTime?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    lectureTitle,
    instructorName,
    instructorRole,
    thumbnailUrl = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    currentTime = '12:45',
    totalTime = '45:30'
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress] = useState(28); // percentage

    return (
        <div className="flex flex-col">
            {/* Video Container */}
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden group">
                {/* Video Thumbnail/Placeholder */}
                <img
                    src={thumbnailUrl}
                    alt={lectureTitle}
                    className="w-full h-full object-cover"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
                    >
                        {isPlaying ? (
                            <Pause size={28} className="text-white fill-white" />
                        ) : (
                            <Play size={28} className="text-white fill-white ml-1" />
                        )}
                    </button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer group/progress">
                        <div
                            className="h-full bg-primary-500 rounded-full relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="text-white hover:text-primary-400 transition-colors"
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            {/* Previous */}
                            <button className="text-white hover:text-primary-400 transition-colors">
                                <SkipBack size={18} />
                            </button>

                            {/* Next */}
                            <button className="text-white hover:text-primary-400 transition-colors">
                                <SkipForward size={18} />
                            </button>

                            {/* Volume */}
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-white hover:text-primary-400 transition-colors"
                            >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>

                            {/* Time */}
                            <span className="text-white text-xs font-medium">
                                {currentTime} / {totalTime}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Settings */}
                            <button className="text-white hover:text-primary-400 transition-colors">
                                <Settings size={18} />
                            </button>

                            {/* PiP */}
                            <button className="text-white hover:text-primary-400 transition-colors">
                                <PictureInPicture2 size={18} />
                            </button>

                            {/* Fullscreen */}
                            <button className="text-white hover:text-primary-400 transition-colors">
                                <Maximize size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Info */}
            <div className="flex items-start justify-between mt-3 gap-3">
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-slate-900 mb-1 leading-tight">
                        {lectureTitle}
                    </h1>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                                <User size={16} className="text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">{instructorName}</p>
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 shadow-sm group">
                                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                                <span>Prev</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-md shadow-primary-500/20 group">
                                <span>Next</span>
                                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
