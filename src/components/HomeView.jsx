import { useMusic } from "../context/MusicContext";
import Icon from "./Icons";
import TrackList from "./TrackList";

export default function HomeView() {
  const { isPlaying, playPlaylist, playlists, setActiveView, tracks, views, openPlaylist } =
    useMusic();

  return (
    <>
      <section className="hero-section" aria-label="Featured playlist">
        <div className="album-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-copy">
          <p>Playlist</p>
          <h1>AI Personalized Mix</h1>
          <span>Made for you with fresh mood-based tracks and familiar favorites.</span>
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
            <button className="follow-button" type="button" onClick={() => setActiveView(views.LIKED)}>
              Liked Songs
            </button>
          </div>
        </div>
      </section>

      <section className="playlist-section" aria-label="Made for you">
        <div className="section-heading">
          <h2>Made for you</h2>
          <button type="button" onClick={() => setActiveView(views.LIBRARY)}>
            Show all
          </button>
        </div>
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <article className="playlist-card" key={playlist.id}>
              <button
                className="playlist-cover"
                style={{ "--cover": playlist.color }}
                type="button"
                aria-label={`Open ${playlist.title}`}
                onClick={() => openPlaylist(playlist.id)}
              >
                <span />
              </button>
              <h3>{playlist.title}</h3>
              <p>{playlist.subtitle}</p>
              <button className="card-play" type="button" onClick={() => playPlaylist(playlist)}>
                <Icon name="play" />
                <span>Play</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="track-section" aria-label="Popular tracks">
        <div className="section-heading">
          <h2>Popular right now</h2>
          <button type="button" onClick={() => setActiveView(views.SEARCH)}>
            Search
          </button>
        </div>
        <TrackList tracks={tracks} />
      </section>
    </>
  );
}
