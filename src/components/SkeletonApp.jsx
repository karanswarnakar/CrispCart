export default function SkeletonApp() {
  return (
    <div className="spotify-app spotify-loading" aria-label="Loading Spotify clone">
      <aside className="sidebar skeleton-sidebar">
        <div className="skeleton-brand-row">
          <div className="skeleton skeleton-logo-dot" />
          <div className="skeleton skeleton-brand-text" />
        </div>
        <div className="skeleton-nav">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="skeleton-nav-row" key={index}>
              <div className="skeleton skeleton-nav-icon" />
              <div className={`skeleton skeleton-line ${index === 2 ? "short" : ""}`} />
            </div>
          ))}
        </div>
        <div className="skeleton-library">
          <div className="skeleton skeleton-line wide" />
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="skeleton-playlist-row" key={index}>
              <div className="skeleton skeleton-playlist-cover" />
              <div className="skeleton-stack">
                <div className="skeleton skeleton-line wide" />
                <div className="skeleton skeleton-line short" />
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="main-view skeleton-main">
        <header className="topbar">
          <div className="history-buttons">
            <div className="skeleton skeleton-circle" />
            <div className="skeleton skeleton-circle" />
          </div>
          <div className="skeleton skeleton-search" />
          <div className="skeleton skeleton-circle profile-skeleton" />
        </header>

        <section className="hero-section">
          <div className="skeleton skeleton-album" />
          <div className="skeleton-copy">
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-title narrow" />
            <div className="skeleton skeleton-line wide" />
            <div className="skeleton skeleton-button" />
          </div>
        </section>

        <section className="playlist-section">
          <div className="skeleton skeleton-heading" />
          <div className="playlist-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <article className="playlist-card skeleton-card" key={index}>
                <div className="skeleton skeleton-cover" />
                <div className="skeleton skeleton-line wide" />
                <div className="skeleton skeleton-line" />
              </article>
            ))}
          </div>
        </section>

        <section className="track-section skeleton-track-section">
          <div className="skeleton skeleton-heading small" />
          <div className="skeleton-track-list">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="skeleton-track-row" key={index}>
                <div className="skeleton skeleton-track-number" />
                <div className="skeleton-stack">
                  <div className="skeleton skeleton-line wide" />
                  <div className="skeleton skeleton-line short" />
                </div>
                <div className="skeleton skeleton-line" />
                <div className="skeleton skeleton-line short" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="player-bar skeleton-player">
        <div className="now-playing">
          <div className="skeleton skeleton-mini" />
          <div className="skeleton-stack">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        </div>
        <div className="player-controls">
          <div className="skeleton skeleton-controls" />
          <div className="skeleton skeleton-progress" />
        </div>
        <div className="skeleton skeleton-volume" />
      </footer>
    </div>
  );
}
