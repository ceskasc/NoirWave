"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { albums, artists } from '@/data/db';
import Link from 'next/link';
import { ProceduralCover } from '@/components/ui/ProceduralCover';

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState<'albums' | 'artists'>('albums');

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg neon-text">Your Library</h1>
                    <p className="text-text-muted mt-2">Music you've saved to your collection.</p>
                </div>

                <div className="flex items-center gap-2 bg-black/40 p-1 rounded-full border border-white/10 backdrop-blur-md w-fit">
                    <button
                        onClick={() => setActiveTab('albums')}
                        className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'albums' ? 'text-black' : 'text-white hover:text-primary'}`}
                    >
                        {activeTab === 'albums' && (
                            <motion.div layoutId="libraryTab" className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)]" />
                        )}
                        <span className="relative z-10">Albums</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('artists')}
                        className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'artists' ? 'text-black' : 'text-white hover:text-secondary'}`}
                    >
                        {activeTab === 'artists' && (
                            <motion.div layoutId="libraryTab" className="absolute inset-0 bg-secondary rounded-full shadow-[0_0_15px_rgba(176,38,255,0.4)]" />
                        )}
                        <span className="relative z-10">Artists</span>
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'albums' ? (
                    <motion.div
                        key="albums"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Saved Albums</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {albums.map((album, i) => (
                                <Link key={album.id} href={`/album/${album.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group cursor-pointer flex flex-col gap-3"
                                    >
                                        <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20 bg-white/5 border border-white/10">
                                            {album.cover ? (
                                                <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <ProceduralCover seed={album.id} type="album" title={album.title} className="w-full h-full" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">{album.title}</h3>
                                            <p className="text-xs text-text-muted mt-0.5">{album.year}</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="artists"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Saved Artists</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                            {artists.map((artist, i) => (
                                <Link key={artist.id} href={`/artist/${artist.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group flex flex-col items-center text-center gap-4 cursor-pointer"
                                    >
                                        <div className="w-full max-w-[160px] aspect-square rounded-full overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(176,38,255,0.3)] border-2 border-transparent group-hover:border-secondary/50 bg-white/5">
                                            {artist.image ? (
                                                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ProceduralCover seed={artist.id} type="artist" className="w-full h-full" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-secondary group-hover:neon-text-secondary transition-colors truncate">{artist.name}</h3>
                                            <p className="text-xs text-text-muted mt-0.5">{artist.genre}</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
