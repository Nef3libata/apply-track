import { Flame, TrendingUp } from "lucide-react";
import { useAppStore } from "@core/store/useAppStore";
import {
  computeCurrentStreak,
  computeLongestStreak,
} from "@core/utils/streak";
import "./StreakCard.scss";

const getStreakMessage = (streak: number): string => {
  if (streak === 0) return "Apply today to start your streak.";
  if (streak === 1) return "First day — the hardest step is done.";
  if (streak <= 3) return "Building momentum. Keep it going.";
  if (streak <= 7) return "You're on a roll. Consistency compounds.";
  if (streak <= 14) return "Two weeks of daily effort. Exceptional.";
  return "Elite-level discipline. Nothing can stop you.";
};

export const StreakCard = () => {
  const applications = useAppStore((s) => s.applications);
  const current = computeCurrentStreak(applications);
  const longest = computeLongestStreak(applications);

  return (
    <div className={`streak-card${current > 0 ? " streak-card--active" : ""}`}>
      <div className="streak-card__icon">
        <Flame size={26} strokeWidth={2.5} />
      </div>

      <div className="streak-card__body">
        <div className="streak-card__count">
          <span className="streak-card__number">{current}</span>
          <span className="streak-card__unit">
            {current === 1 ? "day" : "days"} streak
          </span>
        </div>
        <p className="streak-card__message">{getStreakMessage(current)}</p>
      </div>

      <div className="streak-card__best">
        <TrendingUp size={11} />
        <span>Best: {longest}d</span>
      </div>
    </div>
  );
};
