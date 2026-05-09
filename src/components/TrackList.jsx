import { useMusic } from "../context/MusicContext";
import { formatTime } from "../utils/music";

export default function TrackList({ tracks }) {
  const {
    activePlaylistId,
    activeView,
    addToQueue,
    addTrackToPlaylist,
    currentTrackId,
    likedIds,
    playTrack,
    playlists,
    toggleLike,
    views,
  } = useMusic();

  return (
    <div className="track-list">
      {tracks.map((track, index) => (
        <div className={`track-row ${currentTrackId === track.id ? "is-playing" : ""}`} key={track.id}>
          <button className="track-index" type="button" onClick={() => playTrack(track, tracks)}>
            {currentTrackId === track.id ? ">" : index + 1}
          </button>
          <button className="track-title" type="button" onClick={() => playTrack(track, tracks)}>
            <strong>{track.title}</strong>
            <small>{track.artist}</small>
          </button>
          <span className="track-album">{track.album}</span>
          <span className="track-mood">{track.mood}</span>
          <button
            className={`track-action ${likedIds.includes(track.id) ? "is-liked" : ""}`}
            type="button"
            onClick={() => toggleLike(track.id)}
          >
            {likedIds.includes(track.id) ? "Saved" : "Like"}
          </button>
          <button className="track-action" type="button" onClick={() => addToQueue(track)}>
            Queue
          </button>
          {activeView === views.PLAYLIST ? (
            <button
              className="track-action"
              type="button"
              onClick={() => addTrackToPlaylist(activePlaylistId, track.id)}
            >
              Add
            </button>
          ) : (
            <select
              className="playlist-select"
              defaultValue=""
              aria-label={`Add ${track.title} to playlist`}
              onChange={(event) => {
                if (event.target.value) {
                  addTrackToPlaylist(event.target.value, track.id);
                  event.target.value = "";
                }
              }}
            >
              <option value="">Add to</option>
              {playlists.map((playlist) => (
                <option value={playlist.id} key={playlist.id}>
                  {playlist.title}
                </option>
              ))}
            </select>
          )}
          <span className="track-time">{formatTime(track.duration)}</span>
        </div>
      ))}
    </div>
  );
}
