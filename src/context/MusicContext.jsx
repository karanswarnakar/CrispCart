import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { starterPlaylists, tracks as initialTracks, views } from "../data/musicData";
import { getTracksByIds } from "../utils/music";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState(views.HOME);
  const [activePlaylistId, setActivePlaylistId] = useState(starterPlaylists[0].id);
  const [playlists, setPlaylists] = useState(starterPlaylists);
  const [tracks, setTracks] = useState(initialTracks);
  const [likedIds, setLikedIds] = useState(["t1", "t3", "t8"]);
  const [query, setQuery] = useState("");
  const [queue, setQueue] = useState(getTracksByIds(starterPlaylists[0].trackIds));
  const [currentTrackId, setCurrentTrackId] = useState("t1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(72);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [modal, setModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const TRACKS_PER_PAGE = 6;

  const [account, setAccount] = useState({
    displayName: "Alex Morgan",
    email: "alex@spotifly.local",
    plan: "Premium",
    region: "India",
  });

  const currentTrack = tracks.find((track) => track.id === currentTrackId) ?? tracks[0];
  const activePlaylist =
    playlists.find((playlist) => playlist.id === activePlaylistId) ?? playlists[0];

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return tracks;
    }

    return tracks.filter((track) =>
      [track.title, track.artist, track.album, track.mood].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query, tracks]);

  const visibleTracks = useMemo(() => {
    if (activeView === views.SEARCH) return searchResults;
    if (activeView === views.LIKED) return getTracksByIds(likedIds);
    if (activeView === views.QUEUE) return queue;
    if (activeView === views.PLAYLIST) return getTracksByIds(activePlaylist.trackIds);
    return tracks;
  }, [activePlaylist, activeView, likedIds, queue, searchResults, tracks]);

  const pageCount = Math.max(1, Math.ceil(visibleTracks.length / TRACKS_PER_PAGE));
  const paginatedTracks = visibleTracks.slice((currentPage - 1) * TRACKS_PER_PAGE, currentPage * TRACKS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeView, query, visibleTracks.length]);

  const viewTitle = {
    [views.HOME]: "Good afternoon",
    [views.SEARCH]: query ? `Search results for "${query}"` : "Search the catalog",
    [views.LIBRARY]: "Your Library",
    [views.LIKED]: "Liked Songs",
    [views.QUEUE]: "Playing Queue",
    [views.PLAYLIST]: activePlaylist.title,
    [views.ADMIN]: "Admin Dashboard",
    [views.ACCOUNT]: "Account",
  }[activeView];

  const openPlaylist = (playlistId) => {
    setActivePlaylistId(playlistId);
    setActiveView(views.PLAYLIST);
  };

  const playTrack = (track, list = visibleTracks) => {
    setCurrentTrackId(track.id);
    setQueue(list.length ? list : [track]);
    setProgress(0);
    setIsPlaying(true);
  };

  const playPlaylist = (playlist) => {
    const playlistTracks = getTracksByIds(playlist.trackIds);

    if (playlistTracks.length) {
      playTrack(playlistTracks[0], playlistTracks);
    }
  };

  const playNextTrack = () => {
    const activeQueue = queue.length ? queue : tracks;

    if (repeat) {
      setProgress(0);
      setIsPlaying(true);
      return;
    }

    if (shuffle) {
      const randomTrack = activeQueue[Math.floor(Math.random() * activeQueue.length)];
      setCurrentTrackId(randomTrack.id);
      setProgress(0);
      return;
    }

    const currentIndex = activeQueue.findIndex((track) => track.id === currentTrackId);
    const nextTrack = activeQueue[(currentIndex + 1 + activeQueue.length) % activeQueue.length];
    setCurrentTrackId(nextTrack.id);
    setProgress(0);
  };

  const playPreviousTrack = () => {
    const activeQueue = queue.length ? queue : tracks;
    const currentIndex = activeQueue.findIndex((track) => track.id === currentTrackId);
    const previousTrack = activeQueue[(currentIndex - 1 + activeQueue.length) % activeQueue.length];
    setCurrentTrackId(previousTrack.id);
    setProgress(0);
  };

  const toggleLike = (trackId) => {
    setLikedIds((ids) =>
      ids.includes(trackId) ? ids.filter((id) => id !== trackId) : [...ids, trackId],
    );
  };

  const addToQueue = (track) => {
    setQueue((queuedTracks) => [...queuedTracks, track]);
  };

  const createPlaylist = () => {
    setModal({ type: "playlist" });
  };

  const submitPlaylistModal = ({ title }) => {
    if (!title?.trim()) return;

    const newPlaylist = {
      id: `p${Date.now()}`,
      title: title.trim(),
      subtitle: "New playlist",
      color: "#1ed760",
      trackIds: [],
    };

    setPlaylists((items) => [...items, newPlaylist]);
    setActivePlaylistId(newPlaylist.id);
    setActiveView(views.PLAYLIST);
    setModal(null);
  };

  const openAccountEditor = () => {
    setModal({ type: "account" });
  };

  const submitAccountModal = (nextAccount) => {
    setAccount((currentAccount) => ({
      ...currentAccount,
      ...nextAccount,
      displayName: nextAccount.displayName?.trim() || currentAccount.displayName,
      email: nextAccount.email?.trim() || currentAccount.email,
      region: nextAccount.region?.trim() || currentAccount.region,
    }));
    setModal(null);
  };

  const openAddTrackModal = () => {
    setModal({ type: "track" });
  };

  const submitAddTrackModal = (trackData) => {
    const { title, artist, album, duration, color, mood } = trackData;
    
    if (!title?.trim() || !artist?.trim() || !album?.trim() || !mood?.trim()) {
      return;
    }

    const newTrack = {
      id: `t${Date.now()}`,
      title: title.trim(),
      artist: artist.trim(),
      album: album.trim(),
      duration: parseInt(duration) || 200,
      color: color || "#1db954",
      mood: mood.trim(),
    };

    setTracks((currentTracks) => [...currentTracks, newTrack]);
    setModal(null);
  };

  const closeModal = () => {
    setModal(null);
  };

  const addTrackToPlaylist = (playlistId, trackId) => {
    setPlaylists((items) =>
      items.map((playlist) => {
        if (playlist.id !== playlistId || playlist.trackIds.includes(trackId)) {
          return playlist;
        }

        return { ...playlist, trackIds: [...playlist.trackIds, trackId] };
      }),
    );
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress + 1 >= currentTrack.duration) {
          playNextTrack();
          return 0;
        }

        return currentProgress + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentTrack.duration, currentTrackId, isPlaying, queue, repeat, shuffle]);

  const value = {
    account,
    activePlaylist,
    activePlaylistId,
    activeView,
    addToQueue,
    addTrackToPlaylist,
    closeModal,
    createPlaylist,
    currentTrack,
    currentTrackId,
    isLoading,
    isPlaying,
    likedIds,
    modal,
    openAccountEditor,
    openAddTrackModal,
    openPlaylist,
    playNextTrack,
    playPlaylist,
    playPreviousTrack,
    playTrack,
    playlists,
    progress,
    query,
    queue,
    repeat,
    searchResults,
    setActiveView,
    setIsPlaying,
    setProgress,
    setQuery,
    setRepeat,
    setShuffle,
    setVolume,
    shuffle,
    submitAccountModal,
    submitAddTrackModal,
    submitPlaylistModal,
    toggleLike,
    tracks,
    viewTitle,
    views,
    visibleTracks,
    paginatedTracks,
    pageCount,
    currentPage,
    setCurrentPage,
    volume,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used inside MusicProvider");
  }

  return context;
}
