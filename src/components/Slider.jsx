export default function Slider({
  slides,
  currentIndex,
  onNext,
  onSetIndex,
  onTouchStart,
  onTouchEnd,
}) {
  const moodTags = ["Focus", "Night Drive", "Chill Beats", "Rainy Day", "Soft Glow"];
  const featuredTracks = [
    { title: "Neon Pulse", artist: "Kai Sato", duration: "3:12" },
    { title: "Velvet Skyline", artist: "Mira Lane", duration: "2:58" },
    { title: "Low Tide Lights", artist: "Arlo Blue", duration: "3:41" },
  ];
  const featureIcons = [
    {
      viewBox: "0 0 40 32",
      path: "M2 16c4-8 8-8 12 0s8 8 12 0 8-8 12 0",
      stroke: true,
    },
    {
      viewBox: "0 0 32 32",
      path: "M18 2L6 18h8l-2 12 12-16h-8l2-12z",
    },
    {
      viewBox: "0 0 32 32",
      path:
        "M16 2a14 14 0 1 0 0 28a14 14 0 0 0 0-28zm0 6a8 8 0 1 1 0 16a8 8 0 0 1 0-16zm0 5a3 3 0 1 0 0 6a3 3 0 0 0 0-6z",
    },
  ];

  const activeSlide = slides[currentIndex] ?? slides[0];
  const activeTrack = featuredTracks[currentIndex % featuredTracks.length];
  const progress = slides.length
    ? Math.round(((currentIndex + 1) / slides.length) * 100)
    : 0;

  return (
    <section
      className="slider slider--mood"
      id="index-s1"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="slider-card mood-card">
        <div className="mood-grid">
          <div className="mood-copy">
            <span className="mood-eyebrow">AI Mood Mix</span>
            <h2 className="mood-title">Your vibe, auto-scored</h2>
            <p id="index-Sub_line" className="mood-subtitle">
              {activeSlide?.text}
            </p>
            <div className="mood-actions">
              <button className="mood-primary" type="button" onClick={onNext}>
                Play next
              </button>
              <button className="mood-secondary" type="button">
                Save to library
              </button>
            </div>
            <div className="mood-chips" aria-label="Suggested moods">
              {moodTags.map((tag) => (
                <span key={tag} className="mood-chip">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mood-tracklist" aria-label="Suggested tracks">
              {featuredTracks.map((track, index) => (
                <div
                  key={`${track.title}-${track.artist}`}
                  className={`mood-track ${
                    index === currentIndex % featuredTracks.length ? "is-active" : ""
                  }`}
                >
                  <div className="mood-track-index">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mood-track-meta">
                    <p className="mood-track-title">{track.title}</p>
                    <p className="mood-track-artist">{track.artist}</p>
                  </div>
                  <div className="mood-track-time">{track.duration}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mood-media">
            <div className="mood-canvas">
              {slides.map((slide, index) => {
                const icon = featureIcons[index % featureIcons.length];
                return (
                <div
                  key={`${slide.text}-${index}`}
                  className={`slide-item ${index === currentIndex ? "disActive" : ""}`}
                >
                  <div className="slide-icon" aria-hidden="true">
                    <svg
                      className="slide-icon-svg"
                      viewBox={icon.viewBox}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d={icon.path}
                        fill={icon.stroke ? "none" : "currentColor"}
                        stroke={icon.stroke ? "currentColor" : "none"}
                        strokeWidth={icon.stroke ? "2.4" : "0"}
                        strokeLinecap={icon.stroke ? "round" : "butt"}
                        strokeLinejoin={icon.stroke ? "round" : "miter"}
                      />
                    </svg>
                  </div>
                </div>
                );
              })}
            </div>
            <div className="mood-now">
              <div className="mood-now-header">
                <span>Now playing</span>
                <span className="mood-badge">{progress}% synced</span>
              </div>
              <div className="mood-now-track">
                <span className="mood-now-title">{activeTrack.title}</span>
                <span className="mood-now-artist">{activeTrack.artist}</span>
              </div>
              <div className="mood-progress">
                <div className="mood-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="mood-times">
                <span>0:42</span>
                <span>3:40</span>
              </div>
            </div>
          </div>
        </div>

        <div className="slider-actions">
          <button id="slide_button" type="button" onClick={onNext}>
            <svg
              className="nav-arrow"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 12h12m0 0-4-4m4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="item-count-chaker">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`item-count ${
                  index === currentIndex ? "item_width_entence" : "item_width_none"
                }`}
                onClick={() => onSetIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    onSetIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

