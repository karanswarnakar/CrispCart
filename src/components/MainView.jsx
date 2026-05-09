import { useMusic } from "../context/MusicContext";
import AccountPage from "./AccountPage";
import AdminDashboard from "./AdminDashboard";
import HomeView from "./HomeView";
import LibraryView from "./LibraryView";
import Topbar from "./Topbar";
import TrackPage from "./TrackPage";

export default function MainView() {
  const { activeView, views } = useMusic();

  return (
    <main className="main-view">
      <Topbar />
      {activeView === views.HOME && <HomeView />}
      {activeView === views.LIBRARY && <LibraryView />}
      {activeView === views.ADMIN && <AdminDashboard />}
      {activeView === views.ACCOUNT && <AccountPage />}
      {activeView !== views.HOME &&
        activeView !== views.LIBRARY &&
        activeView !== views.ADMIN &&
        activeView !== views.ACCOUNT && <TrackPage />}
    </main>
  );
}
