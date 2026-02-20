import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');
const COVERS_DIR = path.join(ASSETS_DIR, 'covers');
const HERO_DIR = path.join(ASSETS_DIR, 'hero');
const AUDIO_DIR = path.join(ASSETS_DIR, 'audio');

// Ensure directories exist
[ASSETS_DIR, COVERS_DIR, HERO_DIR, AUDIO_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// We are using specific aesthetic Unsplash IDs for cinematic feel, and some reliable open royalty-free music links or placeholder audio tones.
const downloads = [
    // High-Quality Atmospheric Covers
    { url: 'https://images.unsplash.com/photo-1614729939124-032f0b5689ce?w=800&q=80', dest: path.join(COVERS_DIR, 'synth.jpg') },
    { url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80', dest: path.join(COVERS_DIR, 'neon.jpg') },
    { url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&q=80', dest: path.join(COVERS_DIR, 'city.jpg') },
    { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80', dest: path.join(COVERS_DIR, 'cyber.jpg') },
    { url: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80', dest: path.join(COVERS_DIR, 'galaxy.jpg') },

    // Hero Images
    { url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600&q=85', dest: path.join(HERO_DIR, 'hero-1.jpg') },

    // Royalty Free Audio Contexts (Using Wikipedia commons public domain or reliable educational sources)
    // For the sake of the prototype functioning cleanly without fetching errors, we will download a couple of Kevin MacLeod tracks or similar that are universally CC0/CC-BY from a stable archive.
    { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Tetris_theme.ogg', dest: path.join(AUDIO_DIR, 'track1.ogg') },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Beethoven_Moonlight_Sonata_Mov_1.ogg', dest: path.join(AUDIO_DIR, 'track2.ogg') },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Grieg_Lyric_Pieces_Kobold.ogg', dest: path.join(AUDIO_DIR, 'track3.ogg') }
];

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        console.log(`Downloading ${path.basename(destPath)}...`);

        const requestOptions = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // Some servers block no-user-agent
            }
        };

        const file = fs.createWriteStream(destPath);
        https.get(url, requestOptions, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // Handle redirect
                https.get(response.headers.location, requestOptions, (redirectRes) => {
                    redirectRes.pipe(file);
                    file.on('finish', () => file.close(resolve));
                }).on('error', reject);
            } else {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            }
        }).on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}

async function run() {
    console.log('Fetching assets...');
    for (const item of downloads) {
        try {
            await downloadFile(item.url, item.dest);
        } catch (e) {
            console.error(`Failed to download ${item.dest}:`, e);
        }
    }
    console.log('✅ Done!');
}

run();
