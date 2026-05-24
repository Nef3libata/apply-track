import type { ApplicationStatus } from "@core/models/types";
import "./StatusBadge.scss";

interface StatusConfig {
  label: string;
  colorClass: string;
}

const STATUS_CONFIG: Record<ApplicationStatus, StatusConfig> = {
  applied:   { label: "Applied",   colorClass: "status-badge--applied" },
  interview: { label: "Interview", colorClass: "status-badge--interview" },
  offer:     { label: "Offer",     colorClass: "status-badge--offer" },
  rejected:  { label: "Rejected",  colorClass: "status-badge--rejected" },
  ghosted:   { label: "Ghosted",   colorClass: "status-badge--ghosted" },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`status-badge ${config.colorClass}`}>
      <span className="status-badge__dot" />
      {config.label}
    </span>
  );
};
