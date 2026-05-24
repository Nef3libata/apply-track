import { useAppStore } from "@core/store/useAppStore";
import { Header } from "@components/Header/Header";
import { TabNav } from "@components/TabNav/TabNav";
import { DashboardView } from "@components/views/DashboardView/DashboardView";
import { ApplicationsView } from "@components/views/ApplicationsView/ApplicationsView";
import { NetworkView } from "@components/views/NetworkView/NetworkView";
import { BottomBar } from "@components/BottomBar/BottomBar";
import "./App.scss";

function App() {
  const activeTab = useAppStore((s) => s.activeTab);

  return (
    <div className="app">
      <div className="app__container">
        <Header />
        <TabNav />
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "applications" && <ApplicationsView />}
        {activeTab === "network" && <NetworkView />}
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
