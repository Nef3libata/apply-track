import type { LucideIcon } from "lucide-react";
import "./StatCard.scss";

interface StatCardProps {
  label: string;
  value: number | string;
  sub?: string;
  accent?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export const StatCard = ({
  label,
  value,
  sub,
  accent = false,
  icon: Icon,
  iconColor,
  iconBg,
}: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        {Icon && (
          <div
            className="stat-card__icon"
            style={iconColor ? { color: iconColor, background: iconBg } : undefined}
          >
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>
      <span className={`stat-card__value${accent ? " stat-card__value--accent" : ""}`}>
        {value}
      </span>
      {sub && <span className="stat-card__sub">{sub}</span>}
    </div>
  );
};
