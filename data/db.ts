export const artists = [
    // Original 4
    { id: "a1", name: "Synthwave Voyager", genre: "Synthwave", image: "https://images.unsplash.com/photo-1629853922646-e918c5e6ebc2?w=800&q=80" }, // Retro wave neon sun
    { id: "a2", name: "Ludwig van Beethoven", genre: "Classical", image: "https://images.unsplash.com/photo-1625514695027-e4ab18c4847e?w=800&q=80" }, // Classical bust/piano
    { id: "a3", name: "Edvard Grieg", genre: "Classical", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" }, // Norwegian Fjord/Nature
    { id: "a4", name: "Neon Nights", genre: "Electronic", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80" }, // Cyberpunk city
    // New 6
    { id: "a5", name: "Lofi Study Girl", genre: "Lofi Hip Hop", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80" }, // Cozy room night
    { id: "a6", name: "Hans Zimmer Style", genre: "Cinematic", image: "https://images.unsplash.com/photo-1510681123285-bddd0e8b23c2?w=800&q=80" }, // Epic orchestra stage
    { id: "a7", name: "Midnight Blues", genre: "Jazz", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80" }, // Saxophone dark
    { id: "a8", name: "Cyberpunk 2077 Vibe", genre: "Industrial", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80" }, // Scifi corridor
    { id: "a9", name: "Ethereal Vocals", genre: "Ambient", image: "https://images.unsplash.com/photo-1493225245754-0eb75c3db325?w=800&q=80" }, // Foggy forest girl
    { id: "a10", name: "The Rockers", genre: "Rock", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80" }, // Electric guitar live
];

export const albums = [
    // Original 5
    { id: "al1", title: "Retro Future", artistId: "a1", year: 2021, cover: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80" }, // Grid/Retro synth
    { id: "al2", title: "Piano Sonatas", artistId: "a2", year: 1801, cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80" }, // Piano keys dark
    { id: "al3", title: "Lyric Pieces", artistId: "a3", year: 1871, cover: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80" }, // Forest atmospheric
    { id: "al4", title: "Neon Skyline", artistId: "a4", year: 2023, cover: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&q=80" }, // Neon signs
    { id: "al5", title: "Galactic Drift", artistId: "a1", year: 2024, cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80" }, // Space nebula
    // New 10
    { id: "al6", title: "Late Night Study", artistId: "a5", year: 2023, cover: "https://images.unsplash.com/photo-1516280440502-ba5bdcc9b3c4?w=800&q=80" }, // Coffee desk dark
    { id: "al7", title: "Rainy Days", artistId: "a5", year: 2022, cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&q=80" }, // Rain on window
    { id: "al8", title: "Interstellar Dream", artistId: "a6", year: 2014, cover: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80" }, // Galaxy stars
    { id: "al9", title: "Blue Note Sessions", artistId: "a7", year: 1959, cover: "https://images.unsplash.com/photo-1525926472839-81cb8bcbc01c?w=800&q=80" }, // Vintage trumpet
    { id: "al10", title: "Night City Runner", artistId: "a8", year: 2077, cover: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?w=800&q=80" }, // Cybergirl neon
    { id: "al11", title: "Drone Ambient", artistId: "a9", year: 2020, cover: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80" }, // Dark minimal gradient
    { id: "al12", title: "Live at Wembley", artistId: "a10", year: 1986, cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80" }, // Concert crowd silhouette
    { id: "al13", title: "Classical Masterpieces", artistId: "a2", year: 2005, cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80" }, // Sheet music
    { id: "al14", title: "Synthwave Collection", artistId: "a1", year: 2019, cover: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&q=80" }, // Minimal purple grid
    { id: "al15", title: "Jazz Club After Hours", artistId: "a7", year: 2021, cover: "https://images.unsplash.com/photo-1573514030799-d4c39ebc66fa?w=800&q=80" }, // Whiskey glass dark
];

// Reusing the 5 real audio mock MP3s in a round-robin
const audioLinks = [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
];

export const tracks = [
    // Original 5
    { id: "t1", title: "Midnight Cruise", artistId: "a1", albumId: "al1", duration: 372, audioUrl: audioLinks[0], cover: albums[0].cover },
    { id: "t2", title: "Neon Skyline", artistId: "a2", albumId: "al2", duration: 425, audioUrl: audioLinks[1], cover: albums[1].cover },
    { id: "t3", title: "Galactic Drift", artistId: "a3", albumId: "al3", duration: 344, audioUrl: audioLinks[2], cover: albums[2].cover },
    { id: "t4", title: "Cybernetic Heartbeat", artistId: "a4", albumId: "al4", duration: 342, audioUrl: audioLinks[3], cover: albums[3].cover },
    { id: "t5", title: "City Lights", artistId: "a4", albumId: "al4", duration: 326, audioUrl: audioLinks[4], cover: albums[3].cover },
    // 25 New tracks exploring the massive mock landscape
    { id: "t6", title: "Lofi Cafe Vibe", artistId: "a5", albumId: "al6", duration: 180, audioUrl: audioLinks[0], cover: albums[5].cover },
    { id: "t7", title: "Rainy Midnight Tokyo", artistId: "a5", albumId: "al7", duration: 215, audioUrl: audioLinks[1], cover: albums[6].cover },
    { id: "t8", title: "Epic Space Battle", artistId: "a6", albumId: "al8", duration: 450, audioUrl: audioLinks[2], cover: albums[7].cover },
    { id: "t9", title: "Hans's Dream", artistId: "a6", albumId: "al8", duration: 310, audioUrl: audioLinks[3], cover: albums[7].cover },
    { id: "t10", title: "Smooth Saxophone Solo", artistId: "a7", albumId: "al9", duration: 240, audioUrl: audioLinks[4], cover: albums[8].cover },
    { id: "t11", title: "Double Bass Groove", artistId: "a7", albumId: "al9", duration: 290, audioUrl: audioLinks[0], cover: albums[8].cover },
    { id: "t12", title: "Hacking the Mainframe", artistId: "a8", albumId: "al10", duration: 330, audioUrl: audioLinks[1], cover: albums[9].cover },
    { id: "t13", title: "V's Theme", artistId: "a8", albumId: "al10", duration: 410, audioUrl: audioLinks[2], cover: albums[9].cover },
    { id: "t14", title: "Ethereal Drone 1", artistId: "a9", albumId: "al11", duration: 520, audioUrl: audioLinks[3], cover: albums[10].cover },
    { id: "t15", title: "Guitar Solo 1986", artistId: "a10", albumId: "al12", duration: 395, audioUrl: audioLinks[4], cover: albums[11].cover },
    { id: "t16", title: "Symphony No. 5", artistId: "a2", albumId: "al13", duration: 480, audioUrl: audioLinks[0], cover: albums[12].cover },
    { id: "t17", title: "Moonlight Sonata", artistId: "a2", albumId: "al13", duration: 320, audioUrl: audioLinks[1], cover: albums[12].cover },
    { id: "t18", title: "Synthesizer Love", artistId: "a1", albumId: "al14", duration: 295, audioUrl: audioLinks[2], cover: albums[13].cover },
    { id: "t19", title: "Whiskey and Cigars", artistId: "a7", albumId: "al15", duration: 210, audioUrl: audioLinks[3], cover: albums[14].cover },
    { id: "t20", title: "Cyber Runner", artistId: "a8", albumId: "al10", duration: 345, audioUrl: audioLinks[4], cover: albums[9].cover },
    { id: "t21", title: "Deep Forest Magic", artistId: "a3", albumId: "al3", duration: 280, audioUrl: audioLinks[0], cover: albums[2].cover },
    { id: "t22", title: "Space Anomaly", artistId: "a6", albumId: "al8", duration: 390, audioUrl: audioLinks[1], cover: albums[7].cover },
    { id: "t23", title: "Piano Concerto", artistId: "a2", albumId: "al13", duration: 420, audioUrl: audioLinks[2], cover: albums[12].cover },
    { id: "t24", title: "Chill Beats to Study to", artistId: "a5", albumId: "al6", duration: 195, audioUrl: audioLinks[3], cover: albums[5].cover },
    { id: "t25", title: "Electric Night", artistId: "a10", albumId: "al12", duration: 260, audioUrl: audioLinks[4], cover: albums[11].cover },
    { id: "t26", title: "Dark Alloy", artistId: "a8", albumId: "al10", duration: 310, audioUrl: audioLinks[0], cover: albums[9].cover },
    { id: "t27", title: "Neon Tokyo", artistId: "a4", albumId: "al4", duration: 340, audioUrl: audioLinks[1], cover: albums[3].cover },
    { id: "t28", title: "Quiet Rain", artistId: "a5", albumId: "al7", duration: 210, audioUrl: audioLinks[2], cover: albums[6].cover },
    { id: "t29", title: "Jazz Lounge", artistId: "a7", albumId: "al15", duration: 285, audioUrl: audioLinks[3], cover: albums[14].cover },
    { id: "t30", title: "Final Boss Theme", artistId: "a6", albumId: "al8", duration: 360, audioUrl: audioLinks[4], cover: albums[7].cover }
];

export const playlists = [
    // Original 3
    { id: "p1", title: "Night Drive", description: "Cinematic synthwave for late night cruises.", trackIds: ["t1", "t4", "t5", "t18", "t27"], cover: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80" },
    { id: "p2", title: "Deep Focus", description: "Ambient and soundtracks for intense concentration.", trackIds: ["t2", "t3", "t8", "t14", "t22"], cover: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80" },
    { id: "p3", title: "Neon Noir", description: "Dark, gritty, electronic.", trackIds: ["t1", "t3", "t5", "t12", "t26", "t20"], cover: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&q=80" },
    // New 3
    { id: "p4", title: "Lofi Study Break", description: "Chill beats to relax/study to.", trackIds: ["t6", "t7", "t24", "t28"], cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80" }, // Cozy lofi room
    { id: "p5", title: "Midnight Jazz Club", description: "Smooth saxophone and relaxing jazz.", trackIds: ["t10", "t11", "t19", "t29"], cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80" }, // Saxophone
    { id: "p6", title: "Cyberpunk City", description: "Industrial and futuristic vibes.", trackIds: ["t12", "t13", "t20", "t26", "t4", "t27"], cover: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80" } // Sci-fi corridor
];

export const userProfile = {
    name: "NoirWave User",
    avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=800&q=80" // High quality random cinematic portrait (Neon man contour)
};
