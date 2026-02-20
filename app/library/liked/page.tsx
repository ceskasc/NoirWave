"use client";
import React from 'react';
import { tracks } from '@/data/db';
import { TrackList } from '@/components/shared/TrackList';
import { Heart, Play } from 'lucide-react';

export default function LikedSongsPage() {
    // Mock liked songs (just take some tracks)
    const likedTracks = tracks.slice(2, 7);

    return (
        <div className="space-y-8 animate-in focus-in zoom-in-95 duration-700">
            <div className="flex flex-col md:flex-row items-end gap-6 md:gap-10">
                <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-secondary via-purple-700 to-primary flex items-center justify-center shadow-2xl shadow-secondary/30">
                    <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl" />
                </div>

                <div className="flex flex-col gap-3">
                    <p className="uppercase text-xs font-bold tracking-widest text-text-muted">Playlist</p>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl neon-text-secondary">
                        Liked Songs
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-text-muted font-medium mt-2">
                        <span className="text-white">NoirWave User</span>
                        <span>•</span>
                        <span>{likedTracks.length} songs</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 py-4">
                <button className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white hover:scale-105 transition-transform shadow-[0_0_20px_rgba(176,38,255,0.4)]">
                    <Play className="w-7 h-7 fill-current ml-1" />
                </button>
            </div>

            <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl p-2 py-4 shadow-2xl">
                <TrackList tracksList={likedTracks} showCover={true} />
            </div>
        </div>
    );
}
