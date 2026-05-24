import type { Application } from "@core/models/types";
import "./Heatmap.scss";

interface HeatmapProps {
  applications: Application[];
}

const WEEKS = 15;
const DAY_LABELS = ["", "Mo", "", "We", "", "Fr", ""];

const getIntensityClass = (count: number): string => {
  if (count === 0) return "heatmap__square--empty";
  if (count === 1) return "heatmap__square--low";
  if (count <= 3) return "heatmap__square--mid";
  return "heatmap__square--high";
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-DE", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export const Heatmap = ({ applications }: HeatmapProps) => {
  const countsByDate = new Map<string, number>();
  for (const app of applications) {
    countsByDate.set(app.date, (countsByDate.get(app.date) ?? 0) + 1);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay());

  const gridStart = new Date(startOfCurrentWeek);
  gridStart.setDate(startOfCurrentWeek.getDate() - (WEEKS - 1) * 7);

  type Cell = { date: Date; key: string; count: number; isFuture: boolean };

  const weeks: Cell[][] = Array.from({ length: WEEKS }, (_, weekIdx) =>
    Array.from({ length: 7 }, (_, dayIdx) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + weekIdx * 7 + dayIdx);
      date.setHours(0, 0, 0, 0);
      const isFuture = date > today;
      const key = date.toISOString().split("T")[0]!;
      return {
        date,
        key,
        count: isFuture ? 0 : (countsByDate.get(key) ?? 0),
        isFuture,
      };
    })
  );

  return (
    <div className="heatmap">
      <div className="heatmap__body">
        <div className="heatmap__day-labels" aria-hidden="true">
          {DAY_LABELS.map((label, i) => (
            <span key={i} className="heatmap__day-label">
              {label}
            </span>
          ))}
        </div>

        <div className="heatmap__weeks">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="heatmap__week">
              {week.map(({ date, key, count, isFuture }) => (
                <div
                  key={key}
                  className={`heatmap__square ${
                    isFuture
                      ? "heatmap__square--future"
                      : getIntensityClass(count)
                  }`}
                  title={
                    isFuture
                      ? ""
                      : `${formatDate(date)} — ${count} application${count !== 1 ? "s" : ""}`
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
