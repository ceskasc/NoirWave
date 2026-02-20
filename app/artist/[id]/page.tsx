import React from 'react';
import { artists, albums, tracks } from '@/data/db';
import { ProceduralCover } from '@/components/ui/ProceduralCover';
import { TrackList } from '@/components/shared/TrackList';
import { Play } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
    return artists.map((artist) => ({
        id: artist.id,
    }));
}

export default function ArtistPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const artist = artists.find(a => a.id === id);

    if (!artist) return <div className="text-white">Artist not found</div>;

    const artistAlbums = albums.filter(a => a.artistId === artist.id);
    const artistTracks = tracks.filter(t => t.artistId === artist.id);

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            {/* Header Hero */}
            <div className="relative h-96 -mt-6 -mx-6 mb-8 overflow-hidden rounded-b-3xl">
                {/* Background elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-background z-0" />
                {artist?.image ? (
                    <img src={artist.image} alt={artist.name} className="absolute -top-1/2 -left-1/4 w-[200%] h-[200%] object-cover opacity-20 blur-3xl z-0" />
                ) : (
                    <ProceduralCover seed={artist.id} type="artist" className="absolute -top-1/2 -left-1/4 w-[200%] h-[200%] opacity-20 blur-3xl z-0" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                <div className="relative z-20 flex flex-col md:flex-row items-end gap-6 md:gap-10 pb-10">
                    <div className="w-48 h-48 rounded-full border-4 border-background shadow-[0_0_50px_rgba(0,0,0,0.8)] shrink-0 overflow-hidden relative bg-white/5">
                        {artist?.image ? (
                            <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                        ) : (
                            <ProceduralCover seed={artist.id} type="artist" className="w-full h-full" />
                        )}
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary neon-text animate-pulse"></span>
                            <span className="text-xs uppercase tracking-widest text-primary font-bold">Verified Artist</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                            {artist.name}
                        </h1>
                        <p className="text-white/70 text-lg font-medium tracking-wide">
                            {artist.genre} • 1,420,069 monthly listeners
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 px-4">
                <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                    <Play className="w-8 h-8 fill-current ml-1" />
                </button>
                <button className="border border-white/20 text-white font-bold tracking-widest uppercase text-xs px-6 py-2 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md">
                    Follow
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-white px-4">Popular</h2>
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 py-4">
                        <TrackList tracksList={artistTracks.slice(0, 5)} showCover={true} />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white px-4">Albums</h2>
                    <div className="flex flex-col gap-4 px-4">
                        {artistAlbums.map(album => (
                            <Link key={album.id} href={`/album/${album.id}`} className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-all">
                                <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden shadow-lg border border-white/5 bg-white/5">
                                    {album.cover ? (
                                        <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <ProceduralCover seed={album.id} type="album" className="w-full h-full" />
                                    )}
                                </div>
                                <div className="flex flex-col truncate">
                                    <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate">{album.title}</h3>
                                    <p className="text-xs text-text-muted mt-1">{album.year} • Album</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
