"use client";
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProceduralCoverProps {
    seed: string;
    type?: 'album' | 'playlist' | 'artist';
    className?: string;
    title?: string;
}

export function ProceduralCover({ seed, type = 'album', className, title }: ProceduralCoverProps) {
    // Simple deterministic hash function based on seed string
    const hash = useMemo(() => {
        let h = 0;
        for (let i = 0; i < seed.length; i++) {
            h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
        }
        return Math.abs(h);
    }, [seed]);

    const colors = [
        ['from-purple-900 to-black', 'from-teal-900 to-black'],
        ['from-indigo-900 to-black', 'from-rose-900 to-black'],
        ['from-emerald-900 to-black', 'from-cyan-900 to-black'],
        ['from-fuchsia-900 to-black', 'from-violet-900 to-black'],
    ];

    const colorPair = colors[hash % colors.length];

    // Decide shape based on hash and type
    const isCircle = type === 'artist';

    return (
        <div
            className={cn(
                "relative overflow-hidden group border border-white/5 bg-black/50 shadow-2xl backdrop-blur-md",
                isCircle ? "rounded-full aspect-square" : "rounded-xl aspect-square",
                className
            )}
        >
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80 mix-blend-screen", colorPair[0])} />
            <div className={cn("absolute inset-0 bg-gradient-to-tl opacity-60 mix-blend-overlay", colorPair[1])} />

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
            ></div>

            {/* Abstract Shape Overlay (optional decoration) */}
            {!isCircle && (
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    whileHover={{ opacity: 0.8, scale: 1.05 }}
                    className="absolute inset-0 flex items-center justify-center p-6 mix-blend-lighten"
                >
                    <div className="w-2/3 h-2/3 border border-white/10 rounded-full blur-2xl" />
                    <div className="absolute w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl" />
                </motion.div>
            )}

            {/* Title Fallback if no image */}
            {title && (
                <div className="absolute bottom-4 left-4 right-4 z-10 drop-shadow-lg">
                    <h3 className="text-white/90 font-bold text-lg tracking-tight truncate">{title}</h3>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-widest">{type}</p>
                </div>
            )}

            {/* Subtle Glow Hover Effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 ease-in-out pointer-events-none" />
        </div>
    );
}
