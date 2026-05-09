import { useMusic } from "../context/MusicContext";

export default function LibraryView() {
  const { createPlaylist, likedIds, openPlaylist, playlists, setActiveView, viewTitle, views } =
    useMusic();

  return (
    <section className="playlist-section page-section" aria-label="Your library">
      <div className="section-heading">
        <h2>{viewTitle}</h2>
        <button type="button" onClick={createPlaylist}>
          Create playlist
        </button>
      </div>
      <div className="playlist-grid">
        <article className="playlist-card liked-card">
          <button className="playlist-cover" type="button" onClick={() => setActiveView(views.LIKED)}>
            <span />
          </button>
          <h3>Liked Songs</h3>
          <p>{likedIds.length} saved tracks</p>
        </article>
        {playlists.map((playlist) => (
          <article className="playlist-card" key={playlist.id}>
            <button
              className="playlist-cover"
              style={{ "--cover": playlist.color }}
              type="button"
              onClick={() => openPlaylist(playlist.id)}
            >
              <span />
            </button>
            <h3>{playlist.title}</h3>
            <p>{playlist.trackIds.length} tracks</p>
          </article>
        ))}
      </div>
    </section>
  );
}
