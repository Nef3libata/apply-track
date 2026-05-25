import { useAppStore } from "@core/store/useAppStore";
import { computeCurrentStreak } from "@core/utils/streak";
import "./HeroCard.scss";

const SIZE = 88;
const STROKE = 7;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;
const CX = SIZE / 2;
const CY = SIZE / 2;

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

interface TodayRingProps {
  tech: number;
  general: number;
}

const TodayRing = ({ tech, general }: TodayRingProps) => {
  const total = tech + general;
  const hasTwo = tech > 0 && general > 0;
  const GAP = hasTwo ? 5 : 0;

  const techLen = total > 0 ? (tech / total) * CIRC - (hasTwo ? GAP / 2 : 0) : 0;
  const genLen = total > 0 ? (general / total) * CIRC - (hasTwo ? GAP / 2 : 0) : 0;

  return (
    <div className="hero-card__ring-wrap">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Track */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="rgba(15,118,110,0.10)"
          strokeWidth={STROKE}
        />

        {tech > 0 && (
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="#0f766e"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${techLen} ${CIRC}`}
            strokeDashoffset={0}
            transform={`rotate(-90 ${CX} ${CY})`}
          />
        )}

        {general > 0 && (
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke="#d97706"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${genLen} ${CIRC}`}
            strokeDashoffset={CIRC - (techLen + GAP)}
            transform={`rotate(-90 ${CX} ${CY})`}
          />
        )}

        <text
          x={CX} y={CY - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={total > 9 ? "18" : "20"}
          fontWeight="700"
          fill={total > 0 ? "#134e4a" : "rgba(15,118,110,0.25)"}
          fontFamily="Outfit, system-ui, sans-serif"
        >
          {total}
        </text>
        <text
          x={CX} y={CY + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8.5"
          fill="#0d9488"
          fontFamily="DM Mono, monospace"
          letterSpacing="0.08em"
        >
          TODAY
        </text>
      </svg>

      <div className="hero-card__ring-legend">
        <span className="hero-card__ring-dot hero-card__ring-dot--tech">{tech} tech</span>
        <span className="hero-card__ring-dot hero-card__ring-dot--gen">{general} gen</span>
      </div>
    </div>
  );
};

export const HeroCard = () => {
  const applications = useAppStore((s) => s.applications);
  const streak = computeCurrentStreak(applications);
  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "interview").length;
  const offers = applications.filter((a) => a.status === "offer").length;

  const todayStr = new Date().toISOString().split("T")[0]!;
  const todayApps = applications.filter((a) => a.date === todayStr);
  const techToday = todayApps.filter((a) => a.type === "tech").length;
  const genToday = todayApps.filter((a) => a.type === "general").length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hero-card">
      <div className="hero-card__content">
        <p className="hero-card__date">{today.toUpperCase()}</p>
        <h1 className="hero-card__message">
          {getMessage(total, interviews, offers, streak)}
        </h1>
        <p className="hero-card__summary">
          {getSummary(total, interviews, offers, streak)}
        </p>
      </div>
      <TodayRing tech={techToday} general={genToday} />
    </div>
  );
};
