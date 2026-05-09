import { useMusic } from "../context/MusicContext";
import Icon from "./Icons";

export default function Sidebar() {
  const {
    activePlaylistId,
    activeView,
    createPlaylist,
    openPlaylist,
    playlists,
    setActiveView,
    views,
  } = useMusic();

  return (
    <aside className="sidebar" aria-label="Library">
      <button className="brand" type="button" onClick={() => setActiveView(views.HOME)}>
        <span className="brand-mark">S</span>
        <span>SpotiFy</span>
      </button>

      <nav className="nav-list" aria-label="Main navigation">
        {[
          [views.HOME, "Home", "home"],
          [views.SEARCH, "Search", "search"],
          [views.LIBRARY, "Your Library", "library"],
          [views.LIKED, "Liked Songs", "heart"],
          [views.QUEUE, "Queue", "queue"],
          [views.ADMIN, "Admin", "admin"],
          [views.ACCOUNT, "Account", "admin"],
        ].map(([view, label, icon]) => (
          <button
            className={`nav-item ${activeView === view ? "is-active" : ""}`}
            key={view}
            type="button"
            onClick={() => setActiveView(view)}
          >
            <Icon name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="library-block">
        <div className="library-title">
          <span>Playlists</span>
          <button type="button" aria-label="Create playlist" onClick={createPlaylist}>
            +
          </button>
        </div>
        {playlists.map((playlist) => (
          <button
            className={`library-item ${
              activeView === views.PLAYLIST && activePlaylistId === playlist.id ? "is-active" : ""
            }`}
            key={playlist.id}
            type="button"
            onClick={() => openPlaylist(playlist.id)}
          >
            {playlist.title}
          </button>
        ))}
      </div>
    </aside>
  );
}
