"use client";
import React from 'react';
import { tracks, artists } from '@/data/db';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Play, Pause } from 'lucide-react';
import { ProceduralCover } from '@/components/ui/ProceduralCover';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TrackListProps {
    tracksList: typeof tracks;
    showCover?: boolean;
}

export function TrackList({ tracksList, showCover = true }: TrackListProps) {
    const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();

    const handlePlay = (track: typeof tracks[0]) => {
        if (currentTrack?.id === track.id) {
            togglePlay();
        } else {
            playTrack(track);
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="w-full text-sm">
            {/* Header */}
            <div className="grid grid-cols-[auto_1fr_120px_60px] gap-4 px-4 py-2 text-text-muted border-b border-white/5 uppercase tracking-widest text-xs font-semibold mb-2">
                <div className="w-8 text-center">#</div>
                <div>Title</div>
                <div className="hidden md:block">Play Count</div>
                <div className="text-right">Time</div>
            </div>

            <div className="flex flex-col gap-1">
                {tracksList.map((track, i) => {
                    const isCurrent = currentTrack?.id === track.id;
                    const artist = artists.find(a => a.id === track.artistId);

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={track.id}
                            onClick={() => handlePlay(track)}
                            className={cn(
                                "group grid grid-cols-[auto_1fr_120px_60px] gap-4 px-4 py-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer items-center relative overflow-hidden",
                                isCurrent && "bg-white/5"
                            )}
                        >
                            {/* Highlight bar for active track */}
                            {isCurrent && (
                                <motion.div
                                    layoutId="activeTrack"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary neon-text"
                                />
                            )}

                            {/* Number / Play Button */}
                            <div className="w-8 flex justify-center text-text-muted">
                                {isCurrent && isPlaying ? (
                                    <div className="flex items-end gap-0.5 h-4 justify-center">
                                        <span className="w-1 h-3 bg-primary animate-pulse rounded-full" />
                                        <span className="w-1 h-4 bg-primary animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
                                        <span className="w-1 h-2 bg-primary animate-pulse rounded-full" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                ) : (
                                    <span className="group-hover:hidden">{i + 1}</span>
                                )}
                                <div className={cn("hidden group-hover:flex items-center justify-center text-white", isCurrent && !isPlaying && "!flex")}>
                                    {isCurrent && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                                </div>
                            </div>

                            {/* Title & Artist */}
                            <div className="flex items-center gap-3 overflow-hidden">
                                {showCover && (
                                    <div className="w-10 h-10 shrink-0 rounded-md overflow-hidden shadow-md relative bg-white/5 border border-white/5">
                                        {track.cover ? (
                                            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <ProceduralCover seed={track.albumId} className="w-full h-full" />
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col truncate">
                                    <span className={cn("truncate font-medium transition-colors", isCurrent ? "text-primary neon-text" : "text-white group-hover:text-primary")}>
                                        {track.title}
                                    </span>
                                    <span className="truncate text-text-muted text-xs group-hover:text-white/80 transition-colors">
                                        {artist?.name || 'Unknown Artist'}
                                    </span>
                                </div>
                            </div>

                            {/* Album */}
                            <div className="hidden md:flex items-center text-text-muted truncate group-hover:text-white/80 transition-colors">
                                Album Name
                            </div>

                            {/* Time */}
                            <div className="text-right text-text-muted flex items-center justify-end font-mono text-xs">
                                {formatTime(track.duration)}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
