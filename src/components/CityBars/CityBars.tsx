import { useAppStore } from "@core/store/useAppStore";
import "./CityBars.scss";

export const CityBars = () => {
  const applications = useAppStore((s) => s.applications);

  const cityCounts = applications.reduce<Record<string, number>>((acc, app) => {
    acc[app.city] = (acc[app.city] ?? 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(cityCounts).sort(([, a], [, b]) => b - a);

  if (sorted.length === 0) {
    return <p className="city-bars__empty">No applications yet.</p>;
  }

  const max = sorted[0]![1];

  return (
    <div className="city-bars">
      {sorted.map(([city, count]) => (
        <div key={city} className="city-bars__row">
          <span className="city-bars__city">{city}</span>
          <div className="city-bars__track">
            <div
              className="city-bars__bar"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="city-bars__count">{count}</span>
        </div>
      ))}
    </div>
  );
};
