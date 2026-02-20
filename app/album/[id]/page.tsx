"use client";
import React from 'react';
import { albums, tracks, artists } from '@/data/db';
import { useParams } from 'next/navigation';
import { ProceduralCover } from '@/components/ui/ProceduralCover';
import { TrackList } from '@/components/shared/TrackList';
import { Play, Heart, MoreHorizontal } from 'lucide-react';

export default function AlbumPage() {
    const { id } = useParams();
    const album = albums.find(a => a.id === id);

    if (!album) return <div className="text-white">Album not found</div>;

    const artist = artists.find(a => a.id === album.artistId);
    const albumTracks = tracks.filter(t => t.albumId === album.id);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end gap-6 md:gap-10 pb-10">
                <div className="w-56 h-56 rounded-md shadow-2xl shadow-secondary/20 shrink-0 overflow-hidden relative bg-white/5 border border-white/10">
                    {album?.cover ? (
                        <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                        <ProceduralCover seed={album?.id || 'x'} className="w-full h-full" />
                    )}
                </div>
                <div className="flex flex-col gap-3 flex-1 pb-2">
                    <p className="uppercase text-xs font-bold tracking-widest text-text-muted">Album</p>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg group-hover:neon-text-secondary transition-all">
                        {album.title}
                    </h1>

                    <div className="flex items-center gap-3 text-sm font-medium mt-4">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/20 bg-white/5">
                                {artist?.image ? (
                                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                                ) : (
                                    <ProceduralCover seed={artist?.id || 'x'} type="artist" className="w-full h-full" />
                                )}
                            </div>
                            <span className="text-white group-hover:underline">{artist?.name}</span>
                        </div>
                        <span className="text-text-muted">•</span>
                        <span className="text-text-muted">{album.year}</span>
                        <span className="text-text-muted">•</span>
                        <span className="text-text-muted">{albumTracks.length} songs</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 py-4">
                <button className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white hover:scale-105 transition-transform shadow-[0_0_20px_rgba(176,38,255,0.4)]">
                    <Play className="w-7 h-7 fill-current ml-1" />
                </button>
                <button className="text-text-muted w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md">
                    <Heart className="w-5 h-5" />
                </button>
                <button className="text-text-muted hover:text-white transition-colors ml-auto">
                    <MoreHorizontal className="w-6 h-6" />
                </button>
            </div>

            {/* Tracklist */}
            <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl p-2 py-4 shadow-2xl text-white">
                {/* Do not show cover in Album tracklist since all tracks have the same album cover */}
                <TrackList tracksList={albumTracks} showCover={false} />
            </div>
        </div>
    );
}
