import { useMusic } from "../context/MusicContext";

export default function AccountPage() {
  const {
    account,
    likedIds,
    openAccountEditor,
    playlists,
    queue,
    setActiveView,
    tracks,
    views,
  } = useMusic();

  return (
    <section className="account-page page-section" aria-label="Account page">
      <div className="account-hero">
        <div className="account-avatar" aria-hidden="true">
          {account.displayName.slice(0, 1)}
        </div>
        <div>
          <p className="view-kicker">Profile</p>
          <h2>{account.displayName}</h2>
          <span>{account.email}</span>
        </div>
        <button type="button" onClick={openAccountEditor}>
          Edit profile
        </button>
      </div>

      <div className="account-grid">
        <article className="account-card">
          <span>Plan</span>
          <strong>{account.plan}</strong>
          <small>Region: {account.region}</small>
        </article>
        <article className="account-card">
          <span>Your library</span>
          <strong>{playlists.length}</strong>
          <small>Created playlists</small>
        </article>
        <article className="account-card">
          <span>Liked songs</span>
          <strong>{likedIds.length}</strong>
          <small>{tracks.length} tracks available</small>
        </article>
        <article className="account-card">
          <span>Queue</span>
          <strong>{queue.length}</strong>
          <small>Tracks ready to play</small>
        </article>
      </div>

      <div className="account-panel">
        <div>
          <h3>Quick actions</h3>
          <p>Jump into the areas you use most.</p>
        </div>
        <div className="account-actions">
          <button type="button" onClick={() => setActiveView(views.LIBRARY)}>
            Open library
          </button>
          <button type="button" onClick={() => setActiveView(views.LIKED)}>
            Liked songs
          </button>
          <button type="button" onClick={() => setActiveView(views.ADMIN)}>
            Admin dashboard
          </button>
        </div>
      </div>
    </section>
  );
}
