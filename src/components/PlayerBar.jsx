import { useMusic } from "../context/MusicContext";
import { formatTime } from "../utils/music";
import Icon from "./Icons";

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    likedIds,
    playNextTrack,
    playPreviousTrack,
    progress,
    repeat,
    setIsPlaying,
    setProgress,
    setRepeat,
    setShuffle,
    setVolume,
    shuffle,
    toggleLike,
    volume,
  } = useMusic();

  return (
    <footer className="player-bar" aria-label="Music player">
      <div className="player-left">
        <div className="now-playing">
          <div className="mini-cover" style={{ "--track": currentTrack.color }} aria-hidden="true" />
          <div className="track-meta">
            <strong>{currentTrack.title}</strong>
            <span>{currentTrack.artist}</span>
          </div>
        </div>
        <button
          className={`icon-button save-button ${likedIds.includes(currentTrack.id) ? "is-liked" : ""}`}
          type="button"
          aria-label="Like current song"
          onClick={() => toggleLike(currentTrack.id)}
        >
          <Icon name="heart" />
        </button>
      </div>

      <div className="player-center">
        <div className="control-buttons">
          <button
            className={shuffle ? "is-active" : ""}
            type="button"
            aria-label="Shuffle"
            onClick={() => setShuffle((value) => !value)}
          >
            <Icon name="shuffle" />
          </button>
          <button type="button" aria-label="Previous track" onClick={playPreviousTrack}>
            <Icon name="previous" />
          </button>
          <button
            className="control-play"
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={() => setIsPlaying((value) => !value)}
          >
            <Icon name={isPlaying ? "pause" : "play"} />
          </button>
          <button type="button" aria-label="Next track" onClick={playNextTrack}>
            <Icon name="next" />
          </button>
          <button
            className={repeat ? "is-active" : ""}
            type="button"
            aria-label="Repeat"
            onClick={() => setRepeat((value) => !value)}
          >
            <Icon name="repeat" />
          </button>
        </div>
        <div className="progress-line">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={currentTrack.duration}
            value={Math.min(progress, currentTrack.duration)}
            onChange={(event) => setProgress(Number(event.target.value))}
            aria-label="Song progress"
          />
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <label className="volume-control" aria-label="Volume">
          <Icon name="volume" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      </div>
    </footer>
  );
}
