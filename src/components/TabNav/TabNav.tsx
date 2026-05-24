import { TrendingUp, List, Users } from "lucide-react";
import type { TabId } from "@core/models/types";
import { useAppStore } from "@core/store/useAppStore";
import "./TabNav.scss";

interface TabOption {
  id: TabId;
  label: string;
  icon: typeof TrendingUp; }

const TABS: TabOption[] = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "applications", label: "Applications", icon: List },
  { id: "network", label: "Network", icon: Users },
];

export const TabNav = () => {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  return (
    <nav className="tab-nav" role="tablist" aria-label="Main navigation">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          role="tab"
          aria-selected={activeTab === id}
          className={`tab-nav__tab${activeTab === id ? " tab-nav__tab--active" : ""}`}
          onClick={() => setActiveTab(id)}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </nav>
  );
};
