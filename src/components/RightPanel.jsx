import { useMusic } from "../context/MusicContext";
import { formatTime } from "../utils/music";
import Icon from "./Icons";

export default function RightPanel() {
  const { currentTrack, queue, activeView, playTrack, setActiveView, views, likedIds, toggleLike } =
    useMusic();

  const queueItems = queue.length ? queue : [currentTrack];

  return (
    <aside className="right-panel" aria-label="Now playing panel">
      <div className="panel-head">
        <div>
          <p className="view-kicker">Now Playing</p>
          <h2>Queue</h2>
        </div>
        <button type="button" onClick={() => setActiveView(views.QUEUE)}>
          View all
        </button>
      </div>

      <div className="now-playing-card">
        <div className="hero-art" style={{ "--hero": currentTrack.color }} aria-hidden="true" />
        <div className="hero-copy">
          <span>AI Mix</span>
          <strong>{currentTrack.title}</strong>
          <p>{currentTrack.artist}</p>
        </div>
        <button
          type="button"
          className={`icon-button save-button ${likedIds.includes(currentTrack.id) ? "is-liked" : ""}`}
          aria-label="Like current song"
          onClick={() => toggleLike(currentTrack.id)}
        >
          <Icon name="heart" />
        </button>
      </div>

      <div className="queue-list">
        {queueItems.slice(0, 6).map((track, index) => (
          <button
            key={track.id}
            type="button"
            className={`queue-item ${currentTrack.id === track.id ? "is-active" : ""}`}
            onClick={() => playTrack(track, queueItems)}
          >
            <span className="queue-index">{index + 1}</span>
            <div className="queue-meta">
              <strong>{track.title}</strong>
              <span>{track.artist}</span>
            </div>
            <span>{formatTime(track.duration)}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
