import { useEffect, useState } from "react";
import { useMusic } from "../context/MusicContext";

export default function InputModal() {
  const {
    account,
    closeModal,
    modal,
    submitAccountModal,
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
  }, [account, modal]);

  if (!modal) return null;

  const isAccount = modal.type === "account";

  const updateField = (key, value) => {
    setFields((currentFields) => ({ ...currentFields, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isAccount) {
      submitAccountModal(fields);
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
            <p className="view-kicker">{isAccount ? "Account Settings" : "Playlist"}</p>
            <h2 id="input-modal-title">{isAccount ? "Edit profile" : "Create playlist"}</h2>
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
              {isAccount ? "Save changes" : "Create playlist"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
