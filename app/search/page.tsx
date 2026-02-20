"use client";
import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { tracks, artists } from '@/data/db';
import { TrackList } from '@/components/shared/TrackList';
import { motion } from 'framer-motion';

const genres = [
    // Electronic & Futuristic
    { name: 'Synthwave', image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80' },
    { name: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?w=800&q=80' },
    { name: 'Retrowave', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80' },
    { name: 'Industrial', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&q=80' },
    { name: 'Neon Nights', image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&q=80' },
    { name: 'Vaporwave', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80' },

    // Chill & Ambient
    { name: 'Lofi Chill', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80' },
    { name: 'Dark Ambient', image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80' },
    { name: 'Space Drift', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80' },
    { name: 'Rainy Cafe', image: 'https://images.unsplash.com/photo-1495474472201-4b6abcc34629?w=800&q=80' },
    { name: 'Ethereal', image: 'https://images.unsplash.com/photo-1493225245754-0eb75c3db325?w=800&q=80' },
    { name: 'Meditation', image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80' },

    // Instrumental & Classic
    { name: 'Cinematic', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
    { name: 'Soundtrack', image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80' },
    { name: 'Jazz Lounge', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80' },
    { name: 'Classical', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80' },
    { name: 'Piano', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80' },
    { name: 'Orchestra', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80' },

    // Upbeat & Groove
    { name: 'Rock Classics', image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80' },
    { name: 'Deep Bass', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
    { name: 'Night Drive', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80' },
    { name: 'Concert Live', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80' },
    { name: 'Funk & Soul', image: 'https://images.unsplash.com/photo-1516280440502-628d05206373?w=800&q=80' },
    { name: 'DJ Sets', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80' },
];

export default function SearchPage() {
    const [query, setQuery] = useState('');

    const filteredTracks = query
        ? tracks.filter(t => {
            const artist = artists.find(a => a.id === t.artistId);
            const searchStr = `${t.title} ${artist?.genre || ''} ${artist?.name || ''}`.toLowerCase();
            return searchStr.includes(query.toLowerCase());
        })
        : [];

    const handleGenreClick = (genreName: string) => {
        setQuery(genreName);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                                onClick={() => handleGenreClick(genre.name)}
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
