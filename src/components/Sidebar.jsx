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
      <div className="sidebar-top">
        <button className="brand" type="button" onClick={() => setActiveView(views.HOME)}>
          <span className="brand-mark">S</span>
          <span>SpotiFy</span>
        </button>
        <div className="sidebar-categories" aria-label="Library categories">
          {[
            ["Playlists", views.LIBRARY],
            ["Podcasts", views.SEARCH],
            ["Albums", views.LIKED],
            ["Artists", views.ACCOUNT],
          ].map(([label, view]) => (
            <button
              key={label}
              type="button"
              className={`nav-pill ${activeView === view ? "is-active" : ""}`}
              onClick={() => setActiveView(view)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

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
          <button className="icon-button small" type="button" aria-label="Create playlist" onClick={createPlaylist}>
            <Icon name="plus" />
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
