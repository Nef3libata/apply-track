import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Application,
  ApplicationStatus,
  FilterValue,
  NetworkStats,
  TabId,
} from "@core/models/types";

const SEED_NETWORK: NetworkStats = {
  coffeeChats: 0,
  referrals: 0,
  events: 0,
  connections: 0,
};

interface AppStore {
  applications: Application[];
  network: NetworkStats;
  activeTab: TabId;
  activeFilter: FilterValue;
  addApplication: (app: Omit<Application, "id">) => void;
  removeApplication: (id: string) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  setActiveTab: (tab: TabId) => void;
  setActiveFilter: (filter: FilterValue) => void;
  incrementNetwork: (key: keyof NetworkStats) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      applications: [],
      network: SEED_NETWORK,
      activeTab: "dashboard",
      activeFilter: "all",

      addApplication: (app) =>
        set((state) => ({
          applications: [
            { ...app, id: crypto.randomUUID() },
            ...state.applications,
          ],
        })),

      removeApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((a) => a.id !== id),
        })),

      updateApplicationStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        })),

      setActiveTab: (tab) => set({ activeTab: tab }),

      setActiveFilter: (filter) => set({ activeFilter: filter }),

      incrementNetwork: (key) =>
        set((state) => ({
          network: {
            ...state.network,
            [key]: state.network[key] + 1,
          },
        })),
    }),
    {
      name: "apply-track-store",
    }
  )
);
