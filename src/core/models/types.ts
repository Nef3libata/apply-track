export type ApplicationStatus =
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "ghosted";

export type ApplicationType = "tech" | "general";

export type TabId = "dashboard" | "applications" | "network";

export type FilterValue = ApplicationStatus | "all";

export interface Application {
  id: string;
  company: string;
  role: string;
  city: string;
  type: ApplicationType;
  status: ApplicationStatus;
  date: string;
  notes?: string;
}

export interface NetworkStats {
  coffeeChats: number;
  referrals: number;
  events: number;
  connections: number;
}
