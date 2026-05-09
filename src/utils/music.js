import { tracks } from "../data/musicData";

export function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = String(safeSeconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export function getTracksByIds(trackIds) {
  return trackIds.map((id) => tracks.find((track) => track.id === id)).filter(Boolean);
}
