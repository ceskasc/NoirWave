import React from 'react';
import { playlists, tracks } from '@/data/db';
import { ProceduralCover } from '@/components/ui/ProceduralCover';
import { TrackList } from '@/components/shared/TrackList';
import { Play, Heart, MoreHorizontal, Share } from 'lucide-react';

export function generateStaticParams() {
    return playlists.map((playlist) => ({
        id: playlist.id,
    }));
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const playlist = playlists.find(p => p.id === id);

    if (!playlist) return <div className="text-white">Playlist not found</div>;

    const playlistTracks = tracks.filter(t => playlist.trackIds.includes(t.id));

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row items-end gap-6 md:gap-10 pb-10">
                <div className="w-56 h-56 rounded-md shadow-2xl shadow-primary/20 shrink-0 overflow-hidden relative bg-white/5 border border-white/10">
                    {playlist?.cover ? (
                        <img src={playlist.cover} alt={playlist.title} className="w-full h-full object-cover" />
                    ) : (
                        <ProceduralCover seed={playlist?.id || 'x'} className="w-full h-full" />
                    )}
                </div>
                <div className="flex flex-col gap-3 flex-1 pb-2">
                    <p className="uppercase text-xs font-bold tracking-widest text-text-muted">Playlist</p>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg neon-text">
                        {playlist.title}
                    </h1>
                    <p className="text-white/70 max-w-xl text-lg mt-2">{playlist.description}</p>

                    <div className="flex items-center gap-2 text-sm text-text-muted font-medium mt-2">
                        <span className="text-white hover:underline cursor-pointer">NoirWave</span>
                        <span>•</span>
                        <span>{playlistTracks.length} songs</span>
                        <span>•</span>
                        <span>about 2 hr 15 min</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 py-4">
                <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <Play className="w-7 h-7 fill-current ml-1" />
                </button>
                <button className="text-text-muted w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md">
                    <Heart className="w-5 h-5" />
                </button>
                <button className="text-text-muted w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md">
                    <Share className="w-5 h-5" />
                </button>
                <button className="text-text-muted hover:text-white transition-colors ml-auto">
                    <MoreHorizontal className="w-6 h-6" />
                </button>
            </div>

            {/* Tracklist */}
            <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl p-2 py-4 shadow-2xl">
                <TrackList tracksList={playlistTracks} showCover={true} />
            </div>
        </div>
    );
}
