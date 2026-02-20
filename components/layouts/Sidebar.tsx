"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Library, Search, PlusCircle, Heart, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playlists } from '@/data/db'; // Mock playlists

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Search', href: '/search', icon: Search },
        { name: 'Library', href: '/library', icon: Library },
    ];

    return (
        <aside className="w-64 glass-panel border-r shrink-0 flex flex-col z-20">
            {/* Logo */}
            <div className="h-20 flex items-center px-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <img src="/NoirWave/noir.png" alt="NoirWave Logo" className="w-8 h-8 object-contain group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300" />
                    <span className="font-bold text-xl tracking-tighter text-white">NoirWave</span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                {/* Main Nav */}
                <div className="space-y-1">
                    <p className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Menu</p>
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-4 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "text-primary bg-primary/10 neon-text"
                                        : "text-text-secondary hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Library Nav */}
                <div className="space-y-1 mt-8">
                    <p className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Your Collection</p>
                    <button className="w-full flex items-center gap-4 px-2 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                        <PlusCircle className="w-5 h-5" />
                        Create Playlist
                    </button>
                    <Link href="/library/liked" className="flex items-center gap-4 px-2 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
                        <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                            <Heart className="w-3 h-3 text-white fill-white" />
                        </div>
                        Liked Songs
                    </Link>
                </div>

                <div className="h-[1px] bg-border my-4 mx-2" />

                {/* Playlists */}
                <div className="space-y-1">
                    {playlists.map((playlist) => (
                        <Link
                            key={playlist.id}
                            href={`/playlist/${playlist.id}`}
                            className="block px-2 py-1.5 text-sm font-medium text-text-secondary hover:text-white truncate transition-colors"
                        >
                            {playlist.title}
                        </Link>
                    ))}
                </div>
            </nav>
        </aside>
    );
}
