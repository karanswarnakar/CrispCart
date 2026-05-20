import { useMusic } from "../context/MusicContext";
import TrackList from "./TrackList";
import Pagination from "./Pagination";

export default function TrackPage() {
  const {
    activeView,
    currentPage,
    pageCount,
    playTrack,
    setCurrentPage,
    viewTitle,
    views,
    visibleTracks,
    paginatedTracks,
  } = useMusic();

  return (
    <section className="track-section page-section" aria-label={viewTitle}>
      <div className="section-heading">
        <div>
          <p className="view-kicker">{activeView === views.PLAYLIST ? "Playlist" : "Collection"}</p>
          <h2>{viewTitle}</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            if (visibleTracks[0]) {
              playTrack(visibleTracks[0], visibleTracks);
            }
          }}
        >
          Play all
        </button>
      </div>

      {visibleTracks.length ? (
        <>
          <TrackList tracks={paginatedTracks} />
          <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} />
        </>
      ) : (
        <div className="empty-state">
          <h3>No songs here yet</h3>
          <p>Search tracks or open a playlist to start building this section.</p>
        </div>
      )}
    </section>
  );
}
