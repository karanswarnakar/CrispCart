import { useMusic } from "../context/MusicContext";

export default function Topbar() {
  const { account, query, setActiveView, setQuery, views } = useMusic();

  return (
    <header className="topbar">
      <div className="history-buttons" aria-label="History controls">
        <button type="button" aria-label="Go home" onClick={() => setActiveView(views.HOME)}>
          &lt;
        </button>
        <button type="button" aria-label="Open queue" onClick={() => setActiveView(views.QUEUE)}>
          &gt;
        </button>
      </div>
      <label className="search-pill">
        <span aria-hidden="true">Search</span>
        <input
          type="search"
          placeholder="What do you want to play?"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveView(views.SEARCH);
          }}
          onFocus={() => setActiveView(views.SEARCH)}
        />
      </label>
      <button
        className="profile-button"
        type="button"
        aria-label="Open account page"
        onClick={() => setActiveView(views.ACCOUNT)}
      >
        {account.displayName.slice(0, 1)}
      </button>
    </header>
  );
}
