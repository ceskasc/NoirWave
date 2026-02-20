import { create } from 'zustand';
import { tracks } from '@/data/db';

type Track = typeof tracks[0];

interface PlayerState {
    currentTrack: Track | null;
    isPlaying: boolean;
    progress: number;
    duration: number;
    volume: number;
    queue: Track[];
    isQueueOpen: boolean;
    isFullscreen: boolean;
    audio: HTMLAudioElement | null;

    initializeAudio: () => void;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
    setProgress: (progress: number) => void;
    setVolume: (volume: number) => void;
    toggleQueue: () => void;
    toggleFullscreen: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 80,
    queue: tracks,
    isQueueOpen: false,
    isFullscreen: false,
    audio: null,

    initializeAudio: () => {
        if (typeof window === 'undefined' || get().audio) return;

        // Create single global audio instance
        const audio = new Audio();
        audio.volume = get().volume / 100;

        // Attach native listeners to sync Zustand state
        audio.addEventListener('timeupdate', () => {
            set({ progress: audio.currentTime });
        });

        audio.addEventListener('loadedmetadata', () => {
            set({ duration: audio.duration });
        });

        audio.addEventListener('ended', () => {
            get().nextTrack();
        });

        audio.addEventListener('play', () => set({ isPlaying: true }));
        audio.addEventListener('pause', () => set({ isPlaying: false }));

        set({ audio });
    },

    playTrack: (track) => {
        const state = get();
        if (!state.audio) state.initializeAudio();
        const { audio } = get();

        if (audio) {
            if (state.currentTrack?.id === track.id) {
                // Toggle if same track
                state.togglePlay();
                return;
            }

            audio.src = track.audioUrl;
            audio.play().catch(e => console.error("Playback failed", e));
            set({ currentTrack: track, isPlaying: true });
        }
    },

    togglePlay: () => {
        const { audio, isPlaying, currentTrack } = get();
        if (!audio || !currentTrack) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(e => console.error("Playback failed", e));
        }
    },

    setProgress: (progress) => {
        const { audio } = get();
        if (audio) {
            audio.currentTime = progress;
            set({ progress });
        }
    },

    setVolume: (volume) => {
        const { audio } = get();
        if (audio) {
            audio.volume = volume / 100;
            set({ volume });
        }
    },

    toggleQueue: () => set((state) => ({ isQueueOpen: !state.isQueueOpen })),

    toggleFullscreen: () => {
        const state = get();
        const isFS = !state.isFullscreen;

        // Handle actual browser APIs
        if (typeof document !== 'undefined') {
            if (isFS) {
                document.documentElement.requestFullscreen().catch((err) => {
                    console.error("Error attempting to enable fullscreen:", err);
                });
            } else {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }
        }

        set({ isFullscreen: isFS });
    },

    nextTrack: () => {
        const { currentTrack, queue, playTrack } = get();
        if (!currentTrack) return;
        const idx = queue.findIndex(t => t.id === currentTrack.id);
        if (idx !== -1 && idx < queue.length - 1) {
            playTrack(queue[idx + 1]);
        }
    },

    prevTrack: () => {
        const { currentTrack, queue, playTrack } = get();
        if (!currentTrack) return;
        const idx = queue.findIndex(t => t.id === currentTrack.id);
        if (idx > 0) {
            playTrack(queue[idx - 1]);
        }
    }
}));

// Auto-sync fullscreen changes happening via Esc key
if (typeof document !== 'undefined') {
    document.addEventListener('fullscreenchange', () => {
        usePlayerStore.setState({ isFullscreen: !!document.fullscreenElement });
    });
}
