export default function Pagination({ currentPage, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pages">
      <button
        type="button"
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <span className="pagination-status">
        Page {currentPage} of {pageCount}
      </span>
      <button
        type="button"
        className="pagination-button"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
