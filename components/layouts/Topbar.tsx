"use client";
import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { userProfile } from '@/data/db';

export function Topbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            // We are listening to scroll on the main element, but it might be easier to just listen on the scrolling div
        };

        const mainArea = document.querySelector('.custom-scrollbar');
        if (mainArea) {
            mainArea.addEventListener('scroll', () => {
                setScrolled(mainArea.scrollTop > 50);
            });
            return () => mainArea.removeEventListener('scroll', () => { });
        }
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-30 flex items-center justify-between px-6 py-4 transition-all duration-300",
                scrolled ? "bg-black/60 backdrop-blur-3xl border-b border-white/5 py-3 shadow-2xl" : "bg-transparent"
            )}
        >
            <div className="flex items-center gap-4">
                <div className="flex gap-2">
                    <button onClick={() => router.back()} className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-white/70 hover:text-white backdrop-blur-md transition-colors border border-white/5">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-white/70 hover:text-white backdrop-blur-md transition-colors border border-white/5 cursor-not-allowed opacity-50">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Search Input (conditionally expanded if on search page, but let's keep it ambient) */}
                <div className="relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search artists, albums..."
                        className="w-64 pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all backdrop-blur-md"
                    />
                    {/* Subtle glow underneath */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-primary/0 group-focus-within:bg-primary/20 blur-xl transition-all" />
                </div>
            </div>

            {/* Right: User actions */}
            <div className="flex items-center gap-4 relative notification-dropdown-container">
                <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={cn("relative p-2 text-text-muted hover:text-white transition-colors rounded-full hover:bg-white/10 notification-button", isNotificationsOpen && "bg-white/10 text-white")}
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary neon-text-secondary"></span>
                </button>

                <AnimatePresence>
                    {isNotificationsOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-12 right-16 w-80 bg-black/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden z-50 origin-top-right"
                        >
                            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                <h3 className="font-bold text-white tracking-tight">Notifications</h3>
                                <button className="text-xs text-primary hover:neon-text transition-colors">Mark all read</button>
                            </div>
                            <div className="max-h-96 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1">
                                <div className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-white font-medium">Neon Nights released a new album!</p>
                                        <p className="text-xs text-text-muted mt-1">Check out "Neon Skyline"</p>
                                    </div>
                                </div>
                                <div className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                                    <div className="w-2 h-2 rounded-full bg-transparent mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-white/80 font-medium">Your playlist is trending</p>
                                        <p className="text-xs text-text-muted mt-1">"Night Drive" gained 12 followers today.</p>
                                    </div>
                                </div>
                                <div className="p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer flex gap-3 items-start">
                                    <div className="w-2 h-2 rounded-full bg-transparent mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-white/80 font-medium">Offline Download Complete</p>
                                        <p className="text-xs text-text-muted mt-1">Saved 42 tracks to device.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Link href="/profile" className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center overflow-hidden">
                        <img src={userProfile?.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-medium text-white/90 group-hover:text-white">Profile</span>
                </Link>
            </div>
        </header>
    );
}
