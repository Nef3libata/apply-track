import type { LucideIcon } from "lucide-react";
import type { NetworkStats } from "@core/models/types";
import { useAppStore } from "@core/store/useAppStore";
import "./NetworkCard.scss";

interface NetworkCardProps {
  label: string;
  count: number;
  icon: LucideIcon;
  networkKey: keyof NetworkStats;
}

export const NetworkCard = ({
  label,
  count,
  icon: Icon,
  networkKey,
}: NetworkCardProps) => {
  const incrementNetwork = useAppStore((s) => s.incrementNetwork);

  return (
    <button
      className="network-card"
      onClick={() => incrementNetwork(networkKey)}
      aria-label={`Increment ${label}`}
      title="Click to increment"
    >
      <Icon size={24} className="network-card__icon" />
      <span className="network-card__count">{count}</span>
      <span className="network-card__label">{label}</span>
    </button>
  );
};
