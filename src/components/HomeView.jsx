import { useMemo } from "react";
import { useMusic } from "../context/MusicContext";
import Icon from "./Icons";
import Pagination from "./Pagination";
import TrackList from "./TrackList";

export default function HomeView() {
  const {
    isPlaying,
    paginatedTracks,
    pageCount,
    playPlaylist,
    playlists,
    setActiveView,
    views,
    openPlaylist,
    currentPage,
    setCurrentPage,
    tracks,
  } = useMusic();

  const featuredPlaylists = useMemo(() => playlists.slice(0, 4), [playlists]);
  const recentTracks = useMemo(() => tracks.slice(0, 6), [tracks]);

  return (
    <>
      <section className="hero-grid" aria-label="Featured home banner">
        <article className="hero-panel">
          <div className="hero-top">
            <span className="hero-badge">Your Library</span>
            <button className="secondary-button" type="button" onClick={() => setActiveView(views.LIKED)}>
              Liked Songs
            </button>
          </div>

          <div className="hero-large">
            <p>Made for you</p>
            <h1>AI Personalized Mix</h1>
            <p className="hero-description">
              Discover a selection of moods, mixes, and daily favorites curated to match your listening habits.
            </p>
          </div>

          <div className="hero-actions">
            <button
              className="play-button"
              type="button"
              aria-label="Play AI Personalized Mix"
              onClick={() => playPlaylist(playlists[0])}
            >
              <Icon name={isPlaying ? "pause" : "play"} />
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>
            <button className="secondary-button" type="button" onClick={() => setActiveView(views.SEARCH)}>
              Discover
            </button>
          </div>

          <div className="hero-footer">
            <div className="hero-stat">
              <strong>{recentTracks.length}+</strong>
              <span>fresh tracks</span>
            </div>
            <div className="hero-stat">
              <strong>{playlists.length}</strong>
              <span>playlists</span>
            </div>
          </div>
        </article>

        <div className="hero-tile-grid">
          {featuredPlaylists.map((playlist) => (
            <article className="feature-card" key={playlist.id}>
              <button
                type="button"
                className="feature-cover"
                style={{ "--cover": playlist.color }}
                onClick={() => openPlaylist(playlist.id)}
              >
                <span />
              </button>
              <div className="feature-copy">
                <p className="view-kicker">Playlist</p>
                <strong>{playlist.title}</strong>
                <span>{playlist.subtitle}</span>
              </div>
              <button className="card-play" type="button" onClick={() => playPlaylist(playlist)}>
                <Icon name="play" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-label="Recents and quick play">
        <div className="section-heading">
          <div>
            <p className="view-kicker">Keep listening</p>
            <h2>Recent tracks</h2>
          </div>
          <button type="button" onClick={() => setActiveView(views.SEARCH)}>
            Show all
          </button>
        </div>
        <div className="recent-grid">
          {recentTracks.map((track) => (
            <article className="recent-card" key={track.id}>
              <div className="recent-cover" style={{ background: track.color }} />
              <div className="recent-copy">
                <strong>{track.title}</strong>
                <span>{track.artist}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-label="Popular right now">
        <div className="section-heading">
          <div>
            <p className="view-kicker">Trending</p>
            <h2>Popular right now</h2>
          </div>
          <button type="button" onClick={() => setActiveView(views.SEARCH)}>
            Search
          </button>
        </div>
        <TrackList tracks={paginatedTracks} />
        <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} />
      </section>
    </>
  );
}
