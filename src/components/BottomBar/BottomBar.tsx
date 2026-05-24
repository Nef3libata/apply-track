import { TrendingUp } from "lucide-react";
import { useAppStore } from "@core/store/useAppStore";
import "./BottomBar.scss";

export const BottomBar = () => {
  const applications = useAppStore((s) => s.applications);

  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "interview").length;
  const offers = applications.filter((a) => a.status === "offer").length;
  const responseRate =
    total > 0 ? Math.round(((interviews + offers) / total) * 100) : 0;

  if (total === 0) return null;

  return (
    <div className="bottom-bar">
      <div className="bottom-bar__left">
        <span className="bottom-bar__dot" />
        <span>
          You've applied to <strong>{total}</strong>{" "}
          {total === 1 ? "role" : "roles"}. Every application moves you closer.
        </span>
      </div>
      <div className="bottom-bar__right">
        <TrendingUp size={12} strokeWidth={2.5} />
        <span>{responseRate}% response rate</span>
      </div>
    </div>
  );
};
