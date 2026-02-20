"use client";
import React, { useEffect } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Minimize2, ChevronDown } from 'lucide-react';
import { ProceduralCover } from '@/components/ui/ProceduralCover';
import { artists } from '@/data/db';
import { cn } from '@/lib/utils';

export function FullscreenPlayer() {
    const { currentTrack, isPlaying, progress, duration, isFullscreen, isShuffle, isRepeat, toggleFullscreen, togglePlay, nextTrack, prevTrack, setProgress, toggleShuffle, toggleRepeat } = usePlayerStore();

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const currentPercent = duration ? (progress / duration) * 100 : 0;

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                toggleFullscreen();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isFullscreen, toggleFullscreen]);

    if (!isFullscreen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col"
            >
                {/* Immersive Background */}
                <div className="absolute inset-0 z-0">
                    {currentTrack?.cover ? (
                        <img src={currentTrack.cover} alt="Background" className="w-full h-full object-cover opacity-30 blur-2xl scale-110" />
                    ) : (
                        <ProceduralCover seed={currentTrack?.albumId || 'x'} className="w-full h-full opacity-30 blur-2xl scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    {/* Film grain specifically for fullscreen mode */}
                    <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.95\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
                </div>

                {/* Top Header */}
                <div className="relative z-10 w-full p-8 flex justify-between items-center">
                    <button onClick={toggleFullscreen} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md flex items-center justify-center text-white transition-colors group">
                        <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    </button>

                    <div className="text-center font-bold tracking-widest text-xs uppercase text-primary neon-text flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Playing from Playlist
                    </div>

                    <button onClick={toggleFullscreen} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                        <Minimize2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Main Content (Artwork + Details) */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 w-full max-w-5xl mx-auto gap-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="w-full max-w-md aspect-square rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden relative"
                    >
                        {currentTrack?.cover ? (
                            <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                            <ProceduralCover seed={currentTrack?.albumId || 'x'} className="w-full h-full" />
                        )}
                    </motion.div>

                    <div className="w-full flex-col flex items-center text-center gap-2">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">{currentTrack?.title || 'No Track Selected'}</h1>
                        <p className="text-xl md:text-2xl text-white/60 font-medium">
                            {currentTrack ? artists.find(a => a.id === currentTrack.artistId)?.name || 'Unknown Artist' : 'Artist'}
                        </p>
                    </div>
                </div>

                {/* Bottom Player Controls */}
                <div className="relative z-10 w-full max-w-4xl mx-auto p-8 pb-16 flex flex-col gap-8">
                    {/* Timeline */}
                    <div className="w-full flex items-center gap-6 text-sm text-text-muted font-bold font-mono">
                        <span>{formatTime(progress)}</span>
                        <div className="relative flex-1 h-2 bg-white/10 rounded-full group cursor-pointer flex items-center z-10">
                            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary transition-all rounded-full pointer-events-none" style={{ width: `${currentPercent}%` }} />
                            <input
                                type="range"
                                min={0}
                                max={duration || 100}
                                value={progress}
                                onChange={(e) => setProgress(parseFloat(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 z-20"
                            />
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-10">
                        <button onClick={toggleShuffle} className={cn("transition-colors", isShuffle ? "text-primary neon-text" : "text-white/50 hover:text-white")}><Shuffle className="w-6 h-6" /></button>
                        <button onClick={prevTrack} className="text-white hover:text-primary transition-colors"><SkipBack className="w-10 h-10 fill-current" /></button>

                        <button onClick={() => togglePlay()} className="w-24 h-24 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                            {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current pl-1" />}
                        </button>

                        <button onClick={nextTrack} className="text-white hover:text-primary transition-colors"><SkipForward className="w-10 h-10 fill-current" /></button>
                        <button onClick={toggleRepeat} className={cn("transition-colors", isRepeat ? "text-primary neon-text" : "text-white/50 hover:text-white")}><Repeat className="w-6 h-6" /></button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
