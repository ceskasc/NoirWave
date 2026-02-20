"use client";
import React, { useEffect, useState } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Maximize2, Minimize2 } from 'lucide-react';
import { ProceduralCover } from '@/components/ui/ProceduralCover';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { artists } from '@/data/db';

export function PlayerBar() {
    const { currentTrack, isPlaying, progress, duration, volume, isFullscreen, isShuffle, isRepeat, togglePlay, setProgress, setVolume, nextTrack, prevTrack, toggleFullscreen, toggleShuffle, toggleRepeat } = usePlayerStore();

    // Local state for dragging progress bar
    const [isDragging, setIsDragging] = useState(false);
    const [localProgress, setLocalProgress] = useState(0);

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const currentDisplayProgress = isDragging ? localProgress : progress;
    const progressPercent = duration ? (currentDisplayProgress / duration) * 100 : 0;

    const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        setProgress(percent * duration);
    };

    const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        setVolume(percent * 100);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 z-50 px-4 py-3 pb-safe border-t border-white/5 bg-black/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-center justify-between">
            <AnimatePresence>
                {isPlaying && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/30 to-transparent" />
                )}
            </AnimatePresence>

            {/* Left: Track Info */}
            <div className="w-1/3 flex flex-row items-center gap-4">
                {currentTrack ? (
                    <>
                        <div className="w-14 h-14 rounded-md shadow-lg shrink-0 overflow-hidden relative bg-white/5">
                            {currentTrack.cover ? (
                                <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                            ) : (
                                <ProceduralCover seed={currentTrack.albumId} className="w-full h-full" />
                            )}
                        </div>
                        <div className="flex flex-col truncate w-full">
                            <span className="text-white font-medium text-sm hover:underline cursor-pointer truncate neon-text group-hover:neon-text-secondary transition-all">
                                {currentTrack.title}
                            </span>
                            <span className="text-text-muted text-xs hover:underline cursor-pointer truncate hover:text-white transition-colors">
                                {artists.find(a => a.id === currentTrack.artistId)?.name || 'Unknown Artist'}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="text-text-muted text-sm font-medium">Select a track to play</div>
                )}
            </div>

            {/* Center: Controls */}
            <div className="w-1/3 flex flex-col items-center gap-2 max-w-2xl px-4">
                <div className="flex flex-row items-center gap-6">
                    <button onClick={toggleShuffle} className={cn("transition-colors", isShuffle ? "text-primary neon-text" : "text-text-muted hover:text-white")}><Shuffle className="w-4 h-4" /></button>
                    <button onClick={prevTrack} className="text-white/70 hover:text-white transition-colors"><SkipBack className="w-5 h-5 fill-current" /></button>
                    <button onClick={() => {
                        if (!currentTrack) return; // Do nothing if no track is selected
                        togglePlay();
                    }} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0">
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current pl-[2px]" />}
                    </button>
                    <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors"><SkipForward className="w-5 h-5 fill-current" /></button>
                    <button onClick={toggleRepeat} className={cn("transition-colors", isRepeat ? "text-primary neon-text" : "text-text-muted hover:text-white")}><Repeat className="w-4 h-4" /></button>
                </div>

                <div className="w-full flex items-center gap-3 text-xs text-text-muted font-medium">
                    <span className="w-10 text-right shrink-0">{formatTime(currentDisplayProgress)}</span>
                    <div className="relative flex-1 h-1.5 bg-white/10 rounded-full group cursor-pointer flex items-center z-10">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary to-primary group-hover:from-white group-hover:to-white transition-colors pointer-events-none rounded-full" style={{ width: `${progressPercent}%` }} />
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={currentDisplayProgress}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={(e) => {
                                setIsDragging(false);
                                setProgress(parseFloat((e.target as HTMLInputElement).value));
                            }}
                            onTouchStart={() => setIsDragging(true)}
                            onTouchEnd={(e) => {
                                setIsDragging(false);
                                setProgress(parseFloat((e.target as HTMLInputElement).value));
                            }}
                            onChange={(e) => {
                                setLocalProgress(parseFloat(e.target.value));
                                if (!isDragging) {
                                    setProgress(parseFloat(e.target.value));
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 z-20"
                        />
                    </div>
                    <span className="w-10 text-left shrink-0">{currentTrack ? formatTime(duration) : '0:00'}</span>
                </div>
            </div>

            {/* Right: Extra Controls */}
            <div className="w-1/3 flex items-center justify-end gap-4 shrink-0 pr-2">
                <div className="flex items-center gap-2 w-28 group relative z-10" onClick={(e) => e.stopPropagation()}>
                    <Volume2 className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                    <div className="relative flex-1 h-1.5 bg-white/10 rounded-full flex items-center">
                        <div className="absolute top-0 left-0 h-full bg-white transition-colors pointer-events-none rounded-full" style={{ width: `${volume}%` }} />
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 z-20"
                        />
                    </div>
                </div>
                <button onClick={toggleFullscreen} className="text-text-muted hover:text-white transition-colors ml-4 focus:outline-none">
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
}
