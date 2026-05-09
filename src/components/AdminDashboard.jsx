import { useMemo } from "react";
import { useMusic } from "../context/MusicContext";
import { formatTime } from "../utils/music";

export default function AdminDashboard() {
  const {
    createPlaylist,
    currentTrack,
    isPlaying,
    likedIds,
    openPlaylist,
    playPlaylist,
    playlists,
    queue,
    setActiveView,
    setIsPlaying,
    setQuery,
    tracks,
    views,
    volume,
  } = useMusic();

  const totalDuration = useMemo(
    () => tracks.reduce((total, track) => total + track.duration, 0),
    [tracks],
  );

  const topMoods = useMemo(() => {
    const moodCounts = tracks.reduce((counts, track) => {
      counts[track.mood] = (counts[track.mood] ?? 0) + 1;
      return counts;
    }, {});

    return Object.entries(moodCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [tracks]);

  const playlistHealth = playlists.map((playlist) => ({
    ...playlist,
    completion: Math.min(100, Math.round((playlist.trackIds.length / 6) * 100)),
  }));

  const openSearchFor = (term) => {
    setQuery(term);
    setActiveView(views.SEARCH);
  };

  return (
    <section className="admin-dashboard page-section" aria-label="Admin dashboard">
      <div className="admin-hero">
        <div>
          <p className="view-kicker">Admin Control</p>
          <h2>Dashboard</h2>
          <span>Monitor catalog content, playlist activity, queue state, and playback.</span>
        </div>
        <div className="admin-actions">
          <button type="button" onClick={createPlaylist}>
            Create playlist
          </button>
          <button type="button" onClick={() => setIsPlaying((value) => !value)}>
            {isPlaying ? "Pause app" : "Resume app"}
          </button>
        </div>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat">
          <span>Total tracks</span>
          <strong>{tracks.length}</strong>
          <small>{formatTime(totalDuration)} catalog time</small>
        </article>
        <article className="admin-stat">
          <span>Playlists</span>
          <strong>{playlists.length}</strong>
          <small>{playlists.reduce((total, playlist) => total + playlist.trackIds.length, 0)} saved slots</small>
        </article>
        <article className="admin-stat">
          <span>Liked songs</span>
          <strong>{likedIds.length}</strong>
          <small>{Math.round((likedIds.length / tracks.length) * 100)}% of catalog</small>
        </article>
        <article className="admin-stat">
          <span>Queue</span>
          <strong>{queue.length}</strong>
          <small>Volume {volume}%</small>
        </article>
      </div>

      <div className="admin-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h3>Playlist Management</h3>
            <button type="button" onClick={() => setActiveView(views.LIBRARY)}>
              Library
            </button>
          </div>
          <div className="admin-list">
            {playlistHealth.map((playlist) => (
              <article className="admin-list-row" key={playlist.id}>
                <div className="admin-color" style={{ "--cover": playlist.color }} />
                <div>
                  <strong>{playlist.title}</strong>
                  <span>{playlist.trackIds.length} tracks</span>
                  <div className="admin-meter" aria-label={`${playlist.title} completion`}>
                    <div style={{ width: `${playlist.completion}%` }} />
                  </div>
                </div>
                <div className="admin-row-actions">
                  <button type="button" onClick={() => openPlaylist(playlist.id)}>
                    Open
                  </button>
                  <button type="button" onClick={() => playPlaylist(playlist)}>
                    Play
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h3>Catalog Moods</h3>
            <button type="button" onClick={() => openSearchFor("")}>
              Search
            </button>
          </div>
          <div className="admin-mood-list">
            {topMoods.map(([mood, count]) => (
              <button type="button" key={mood} onClick={() => openSearchFor(mood)}>
                <span>{mood}</span>
                <strong>{count}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <h3>Current Playback</h3>
            <button type="button" onClick={() => setActiveView(views.QUEUE)}>
              Queue
            </button>
          </div>
          <div className="admin-now">
            <div className="mini-cover" style={{ "--track": currentTrack.color }} aria-hidden="true" />
            <div>
              <strong>{currentTrack.title}</strong>
              <span>{currentTrack.artist}</span>
              <small>{isPlaying ? "Playing" : "Paused"}</small>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
