import { useEffect, useState } from "react";
import { useMusic } from "../context/MusicContext";

export default function InputModal() {
  const {
    account,
    closeModal,
    modal,
    submitAccountModal,
    submitAddTrackModal,
    submitPlaylistModal,
  } = useMusic();
  const [fields, setFields] = useState({});

  useEffect(() => {
    if (modal?.type === "playlist") {
      setFields({ title: "" });
    }

    if (modal?.type === "account") {
      setFields(account);
    }

    if (modal?.type === "track") {
      setFields({ 
        title: "", 
        artist: "", 
        album: "", 
        duration: "200", 
        color: "#1db954", 
        mood: "" 
      });
    }
  }, [account, modal]);

  if (!modal) return null;

  const isAccount = modal.type === "account";
  const isTrack = modal.type === "track";

  const updateField = (key, value) => {
    setFields((currentFields) => ({ ...currentFields, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isAccount) {
      submitAccountModal(fields);
      return;
    }

    if (isTrack) {
      submitAddTrackModal(fields);
      return;
    }

    submitPlaylistModal(fields);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={closeModal}>
      <section
        className="input-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="input-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <p className="view-kicker">
              {isAccount ? "Account Settings" : isTrack ? "Add Music" : "Playlist"}
            </p>
            <h2 id="input-modal-title">
              {isAccount ? "Edit profile" : isTrack ? "Add new track" : "Create playlist"}
            </h2>
          </div>
          <button className="modal-close" type="button" onClick={closeModal} aria-label="Close modal">
            x
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {isAccount ? (
            <>
              <label>
                <span>Display name</span>
                <input
                  autoFocus
                  type="text"
                  value={fields.displayName ?? ""}
                  onChange={(event) => updateField("displayName", event.target.value)}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={fields.email ?? ""}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </label>
              <label>
                <span>Region</span>
                <input
                  type="text"
                  value={fields.region ?? ""}
                  onChange={(event) => updateField("region", event.target.value)}
                />
              </label>
              <label>
                <span>Plan</span>
                <select value={fields.plan ?? "Free"} onChange={(event) => updateField("plan", event.target.value)}>
                  <option>Free</option>
                  <option>Premium</option>
                  <option>Family</option>
                  <option>Student</option>
                </select>
              </label>
            </>
          ) : isTrack ? (
            <>
              <label>
                <span>Music Name (Title)</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g., Blinding Lights"
                  value={fields.title ?? ""}
                  onChange={(event) => updateField("title", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Artist</span>
                <input
                  type="text"
                  placeholder="e.g., The Weeknd"
                  value={fields.artist ?? ""}
                  onChange={(event) => updateField("artist", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Album</span>
                <input
                  type="text"
                  placeholder="e.g., After Hours"
                  value={fields.album ?? ""}
                  onChange={(event) => updateField("album", event.target.value)}
                  required
                />
              </label>
              <label>
                <span>Duration (seconds)</span>
                <input
                  type="number"
                  placeholder="200"
                  value={fields.duration ?? ""}
                  onChange={(event) => updateField("duration", event.target.value)}
                  min="1"
                />
              </label>
              <label>
                <span>Banner Color</span>
                <input
                  type="color"
                  value={fields.color ?? "#1db954"}
                  onChange={(event) => updateField("color", event.target.value)}
                />
              </label>
              <label>
                <span>Mood/Genre</span>
                <select 
                  value={fields.mood ?? ""} 
                  onChange={(event) => updateField("mood", event.target.value)}
                  required
                >
                  <option value="">Select a mood</option>
                  <option>Pop</option>
                  <option>Dance</option>
                  <option>Chill</option>
                  <option>Indie</option>
                  <option>Night</option>
                  <option>Alt</option>
                  <option>R&B</option>
                  <option>Easy</option>
                  <option>Hip-Hop</option>
                  <option>Rock</option>
                  <option>Jazz</option>
                  <option>Electronic</option>
                </select>
              </label>
            </>
          ) : (
            <label>
              <span>Playlist name</span>
              <input
                autoFocus
                type="text"
                placeholder="My new playlist"
                value={fields.title ?? ""}
                onChange={(event) => updateField("title", event.target.value)}
              />
            </label>
          )}

          <div className="modal-actions">
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button className="modal-primary" type="submit">
              {isAccount ? "Save changes" : isTrack ? "Add track" : "Create playlist"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
