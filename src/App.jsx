import "./App.css";
import MainView from "./components/MainView";
import InputModal from "./components/InputModal";
import PlayerBar from "./components/PlayerBar";
import RightPanel from "./components/RightPanel";
import Sidebar from "./components/Sidebar";
import SkeletonApp from "./components/SkeletonApp";
import { MusicProvider, useMusic } from "./context/MusicContext";

function SpotifyShell() {
  const { isLoading } = useMusic();

  if (isLoading) {
    return <SkeletonApp />;
  }

  return (
    <div className="spotify-app">
      <Sidebar />
      <MainView />
      <RightPanel />
      <PlayerBar />
      <InputModal />
    </div>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <SpotifyShell />
    </MusicProvider>
  );
}
