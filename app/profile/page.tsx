"use client";
import React from 'react';
import { tracks, userProfile, listeningHistory, artists } from '@/data/db';
import { TrackList } from '@/components/shared/TrackList';
import { Play, Settings, Edit3, Share2, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    // Dynamic Stats Calculation
    const playedTracks = listeningHistory.map(history => tracks.find(t => t.id === history.trackId)).filter(Boolean) as typeof tracks;

    // 1. Total Minutes
    const totalSeconds = playedTracks.reduce((acc, t) => acc + t.duration, 0);
    const totalMinutes = Math.floor(totalSeconds / 60).toLocaleString();

    // 2. Top Genre
    const genreCounts: Record<string, number> = {};
    playedTracks.forEach(t => {
        const artist = artists.find(a => a.id === t.artistId);
        if (artist?.genre) {
            genreCounts[artist.genre] = (genreCounts[artist.genre] || 0) + 1;
        }
    });
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

    // Unique top tracks for the list (just taking the first 5 unique played ones for variety)
    const uniqueIds = Array.from(new Set(playedTracks.map(t => t.id))).slice(0, 5);
    const topTracks = uniqueIds.map(id => tracks.find(t => t.id === id)).filter(Boolean) as typeof tracks;

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            {/* Cinematic Profile Hero */}
            <div className="relative h-80 -mt-6 -mx-6 mb-8 overflow-hidden rounded-b-3xl group">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background z-0" />
                <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay blur-md grayscale group-hover:grayscale-0 transition-all duration-1000"
                    style={{ backgroundImage: 'url("/assets/hero/hero-1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/50 z-0" />

                <div className="absolute bottom-0 left-0 right-0 p-10 z-10 flex items-end justify-between">
                    <div className="flex items-end gap-8">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full border-4 border-background shadow-[0_0_50px_rgba(176,38,255,0.6)] overflow-hidden bg-white/10 flex items-center justify-center relative">
                                <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-primary text-black p-2 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                                <Crown className="w-5 h-5 fill-current" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <p className="text-xs uppercase tracking-widest text-primary font-bold neon-text">Premium Member</p>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                                NoirWave User
                            </h1>
                            <p className="text-white/70 font-medium tracking-wide flex items-center gap-4">
                                <span>12 Public Playlists</span>
                                <span>•</span>
                                <span>42 Followers</span>
                                <span>•</span>
                                <span>Following 18</span>
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-3 mb-4">
                        <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                            <Edit3 className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-2xl font-bold text-white">Top Tracks this Month</h2>
                        <button className="text-sm text-text-muted hover:text-white transition-colors">Show all</button>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 py-4">
                        <TrackList tracksList={topTracks} showCover={true} />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white px-4">Listening Stats</h2>
                    <div className="flex flex-col gap-4 px-4">
                        <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/40 transition-colors" />
                            <p className="text-text-muted font-medium mb-1">Total Minutes Played</p>
                            <h3 className="text-4xl font-black text-white">{totalMinutes}</h3>
                            <p className="text-primary text-sm mt-2 font-medium">+12% from last week</p>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-secondary/40 transition-colors" />
                            <p className="text-text-muted font-medium mb-1">Top Genre</p>
                            <h3 className="text-3xl font-black text-white">{topGenre}</h3>
                            <p className="text-secondary text-sm mt-2 font-medium">Your absolute favorite</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
