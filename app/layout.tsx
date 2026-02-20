import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Topbar } from '@/components/layouts/Topbar';
import { PlayerBar } from '@/components/player/PlayerBar';
import { FullscreenPlayer } from '@/components/player/FullscreenPlayer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'NoirWave | Cinematic listening, reimagined.',
    description: 'Experience music in a cinematic neon noir environment. Fully original streaming UI.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} font-sans antialiased overflow-hidden`}>
                {/* Film grain overlay for cinematic effect */}
                <div className="film-grain" aria-hidden="true" />

                {/* Dynamic ambient background gradients base */}
                <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-background to-background" />

                <div className="flex h-screen w-full">
                    {/* Main Sidebar */}
                    <Sidebar />

                    <main className="flex-1 flex flex-col min-w-0 relative">
                        <Topbar />

                        {/* Scrollable Main Content */}
                        <div className="flex-1 overflow-y-auto pb-28 custom-scrollbar">
                            <div className="container mx-auto px-6 py-6 max-w-7xl">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>

                {/* Global sticky player */}
                <PlayerBar />
                <FullscreenPlayer />
            </body>
        </html>
    );
}
