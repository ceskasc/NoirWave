"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { ProceduralCover } from '@/components/ui/ProceduralCover';
import { playlists, tracks, albums } from '@/data/db';
import { usePlayerStore } from '@/store/usePlayerStore';
import { TrackList } from '@/components/shared/TrackList';
import Link from 'next/link';

export default function HomePage() {
    const { playTrack } = usePlayerStore();

    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            {/* Redesigned Cinematic Hero */}
            <section className="relative h-[28rem] rounded-3xl overflow-hidden group shadow-2xl shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/80 to-transparent z-10" />
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-110"
                    style={{ backgroundImage: 'url("/assets/hero/hero-1.jpg")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

                <div className="relative h-full flex flex-col justify-center p-12 z-20 w-full md:w-2/3 lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary neon-text animate-pulse" />
                            <span className="text-primary font-bold tracking-widest uppercase text-xs">Featured Experience</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-[1.1] drop-shadow-2xl">
                            Neon Noir <br className="hidden md:block" /> Nights
                        </h1>

                        <p className="text-white/80 text-lg mb-8 leading-relaxed font-medium">
                            Dive deep into the cinematic undercity. Synthwave meets orchestral swells in this curated, immersive audio experience.
                        </p>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => playTrack(tracks[0])}
                                className="flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                            >
                                <Play className="w-5 h-5 fill-current" /> Immerse Now
                            </button>
                            <Link href="/playlist/p3" className="px-8 py-4 rounded-full text-white font-bold border border-white/20 hover:bg-white/10 backdrop-blur-md transition-colors">
                                View Playlist
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Playlists - Grid Redesign */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
                        Mood Mixes
                        <div className="h-[2px] w-12 bg-primary hidden md:block" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlists.map((playlist, i) => (
                        <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative flex flex-col justify-end h-64 rounded-2xl overflow-hidden cursor-pointer"
                            >
                                {/* Background Image / Cover */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url("${playlist.cover}")` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                {/* Content */}
                                <div className="relative z-10 p-6">
                                    <h3 className="text-2xl font-bold text-white group-hover:neon-text transition-all">{playlist.title}</h3>
                                    <p className="text-sm text-white/70 mt-2 line-clamp-2">{playlist.description}</p>
                                </div>

                                {/* Hover Play Icon */}
                                <div className="absolute top-6 right-6 w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/50 text-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-[0_0_20px_rgba(0,240,255,0.4)] z-20">
                                    <Play className="w-5 h-5 fill-current ml-1" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Top Tracks Redesign */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-4">
                        Continue Listening
                        <div className="h-[2px] w-12 bg-secondary hidden md:block" />
                    </h2>
                </div>

                <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-2xl">
                    <TrackList tracksList={tracks} />
                </div>
            </section>

            {/* New Album Releases Redesign */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-white gap-4">
                        New Cinematic Releases
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {albums.map((album, i) => (
                        <Link key={album.id} href={`/album/${album.id}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex flex-col gap-3"
                            >
                                <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl border border-white/5">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${album.cover}")` }} />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-primary transition-colors text-sm truncate">{album.title}</h3>
                                    <p className="text-xs text-text-muted mt-0.5">{album.year}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
