import { useAppStore } from "@core/store/useAppStore";
import { computeCurrentStreak } from "@core/utils/streak";
import "./HeroCard.scss";

const getMessage = (
  total: number,
  interviews: number,
  offers: number,
  streak: number,
): string => {
  if (offers > 0) return "You have an offer on the table.";
  if (streak >= 7) return `${streak} days straight. You're unstoppable.`;
  if (streak >= 3) return `${streak} days in a row. That's real momentum.`;
  if (interviews >= 2) return "Multiple interviews. You're making it happen.";
  if (interviews === 1) return "An interview! Keep that energy going.";
  if (total >= 20) return "Consistency is everything. You've got it.";
  if (total >= 10) return "Double digits. You're in the game.";
  if (total >= 5) return "You're showing up. That matters more than you know.";
  if (total >= 1) return "Every application is a door you knocked on.";
  return "Ready to find your next role? Let's go.";
};

const getSummary = (
  total: number,
  interviews: number,
  offers: number,
  streak: number,
): string => {
  const parts: string[] = [];
  if (total > 0) parts.push(`${total} application${total !== 1 ? "s" : ""} sent`);
  if (interviews > 0) parts.push(`${interviews} interview${interviews !== 1 ? "s" : ""}`);
  if (offers > 0) parts.push(`${offers} offer${offers !== 1 ? "s" : ""}`);
  if (streak > 0) parts.push(`${streak}-day streak`);
  if (parts.length === 0) return "Your job search starts here.";
  return parts.join(" · ");
};

export const HeroCard = () => {
  const applications = useAppStore((s) => s.applications);
  const streak = computeCurrentStreak(applications);
  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "interview").length;
  const offers = applications.filter((a) => a.status === "offer").length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hero-card">
      <p className="hero-card__date">{today.toUpperCase()}</p>
      <h1 className="hero-card__message">
        {getMessage(total, interviews, offers, streak)}
      </h1>
      <p className="hero-card__summary">
        {getSummary(total, interviews, offers, streak)}
      </p>
    </div>
  );
};
