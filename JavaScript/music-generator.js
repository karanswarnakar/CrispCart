const form = document.getElementById("musicGeneratorForm");
const trackList = document.getElementById("trackList");
const playlistTitle = document.getElementById("playlistTitle");
const outputHint = document.querySelector(".output-hint");

const moodProfile = {
    happy: { energy: "high", bpm: [110, 128], tones: ["uplifting", "bright", "groovy"] },
    focused: { energy: "medium", bpm: [88, 106], tones: ["minimal", "precise", "steady"] },
    calm: { energy: "low", bpm: [60, 84], tones: ["ambient", "soft", "warm"] },
    romantic: { energy: "medium-low", bpm: [70, 98], tones: ["silky", "intimate", "lush"] },
    energetic: { energy: "very high", bpm: [125, 148], tones: ["driving", "aggressive", "powerful"] },
    melancholic: { energy: "low", bpm: [62, 86], tones: ["emotional", "moody", "cinematic"] }
};

const activityProfile = {
    "deep-work": ["lofi", "neo-classical", "downtempo"],
    gym: ["edm", "hip-hop", "drum & bass"],
    commute: ["indie pop", "alt r&b", "synthwave"],
    study: ["instrumental", "piano", "chillhop"],
    creative: ["experimental", "future beats", "alt electronic"],
    sleep: ["ambient", "drone", "nature textures"]
};

const titleTokens = [
    "Pulse", "Echo", "Velvet", "Nova", "Skyline", "Orbit", "Prism", "Midnight", "Zenith", "Frame"
];

const composerNames = [
    "Luna Atelier", "North Static", "Arden Wave", "Mono Harbor", "Violet Signal", "Aero Bloom"
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function buildTrack(index, mood, activity) {
    const moodData = moodProfile[mood];
    const activityGenres = activityProfile[activity];
    const bpm = Math.floor(
        Math.random() * (moodData.bpm[1] - moodData.bpm[0] + 1) + moodData.bpm[0]
    );

    const title = `${randomFrom(titleTokens)} ${randomFrom(titleTokens)}`;
    const artist = randomFrom(composerNames);
    const tone = randomFrom(moodData.tones);
    const genre = randomFrom(activityGenres);

    return {
        index,
        title,
        artist,
        bpm,
        tone,
        genre,
        energy: moodData.energy
    };
}

function generatePlaylist(name, mood, activity, duration) {
    const totalTracks = Math.max(4, Math.round(Number(duration) / 5));
    const tracks = [];

    for (let i = 1; i <= totalTracks; i += 1) {
        tracks.push(buildTrack(i, mood, activity));
    }

    playlistTitle.textContent = `${name}'s AI Playlist • ${totalTracks} tracks`;
    outputHint.textContent = `Mood: ${mood} • Activity: ${activity} • Duration: ${duration} mins`;

    trackList.innerHTML = tracks
        .map((track) => `
            <li>
                <strong>${track.index}. ${track.title}</strong> — ${track.artist}
                <p class="track-meta">
                    ${track.genre} • ${track.tone} tone • ${track.bpm} BPM • ${track.energy} energy
                </p>
            </li>
        `)
        .join("");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const mood = document.getElementById("moodSelect").value;
    const activity = document.getElementById("activitySelect").value;
    const duration = document.getElementById("durationSelect").value;

    generatePlaylist(name || "Guest", mood, activity, duration);
});
