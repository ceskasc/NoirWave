"use client";
import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { tracks } from '@/data/db';
import { TrackList } from '@/components/shared/TrackList';
import { motion } from 'framer-motion';

const genres = [
    { name: 'Synthwave', image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80' }, // Neon grid
    { name: 'Cinematic', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' }, // Film reels
    { name: 'Retrowave', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80' }, // Pink neon
    { name: 'Dark Ambient', image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80' }, // Dark foggy trees
    { name: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?w=800&q=80' }, // Cyber city
    { name: 'Soundtrack', image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80' }, // Orchestra
    { name: 'Lofi Chill', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80' }, // Night room
    { name: 'Jazz Lounge', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80' }, // Saxophone
];

export default function SearchPage() {
    const [query, setQuery] = useState('');

    const filteredTracks = query
        ? tracks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
        : [];

    return (
        <div className="space-y-10 min-h-full">
            {/* Huge Search Input */}
            <div className="relative group">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-white/40 group-focus-within:text-primary group-focus-within:neon-text transition-all" />
                <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-6 pl-20 pr-6 bg-black/40 border border-white/10 rounded-2xl text-2xl font-bold text-white placeholder-white/30 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all backdrop-blur-xl shadow-2xl"
                />
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary/0 via-secondary/0 to-primary/0 group-focus-within:from-primary/10 group-focus-within:via-secondary/10 group-focus-within:to-primary/10 blur-2xl transition-all duration-700" />
            </div>

            {query ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <h2 className="text-xl font-bold text-white">Top Results for &quot;{query}&quot;</h2>
                    {filteredTracks.length > 0 ? (
                        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/5 py-2">
                            <TrackList tracksList={filteredTracks} />
                        </div>
                    ) : (
                        <div className="text-center py-20 text-text-muted">
                            <p className="text-lg">No results found for &quot;{query}&quot;</p>
                            <p className="text-sm mt-2">Try searching for Nightcall or Sunset</p>
                        </div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <h2 className="text-xl font-bold text-white tracking-tight">Browse All</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {genres.map((genre) => (
                            <div
                                key={genre.name}
                                className="relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer group bg-black border border-white/10 hover:border-white/30 transition-all shadow-xl hover:shadow-primary/20"
                            >
                                <img src={genre.image} alt={genre.name} className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-colors" />
                                <h3 className="absolute bottom-4 left-4 font-black text-xl text-white drop-shadow-lg scale-100 group-hover:scale-105 origin-bottom-left transition-transform duration-300">
                                    {genre.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
