import { Flame } from "lucide-react";
import { useAppStore } from "@core/store/useAppStore";
import { computeCurrentStreak } from "@core/utils/streak";
import "./Header.scss";

export const Header = () => {
  const applications = useAppStore((s) => s.applications);
  const streak = computeCurrentStreak(applications);

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__title">
          <span className="header__title-apply">Apply</span>
          <span className="header__title-track">Track</span>
        </span>
      </div>

      <div className={`header__streak${streak === 0 ? " header__streak--inactive" : ""}`}>
        <Flame size={16} strokeWidth={2.5} className="header__streak-flame" />
        <span className="header__streak-count">{streak}</span>
        <span className="header__streak-label">day streak</span>
      </div>
    </header>
  );
};
