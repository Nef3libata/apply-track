import { Crosshair, CalendarDays, Trophy, TrendingUp } from "lucide-react";
import { useAppStore } from "@core/store/useAppStore";
import { StatCard } from "@components/StatCard/StatCard";
import { Heatmap } from "@components/Heatmap/Heatmap";
import { CityBars } from "@components/CityBars/CityBars";
import { InsightsPanel } from "@components/InsightsPanel/InsightsPanel";
import { HeroCard } from "@components/HeroCard/HeroCard";
import "./DashboardView.scss";

export const DashboardView = () => {
  const applications = useAppStore((s) => s.applications);

  const total = applications.length;
  const interviews = applications.filter((a) => a.status === "interview").length;
  const offers = applications.filter((a) => a.status === "offer").length;
  const responseRate =
    total > 0 ? Math.round(((interviews + offers) / total) * 100) : 0;

  const thisWeek = (() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split("T")[0]!;
    return applications.filter((a) => a.date >= weekAgoStr).length;
  })();

  return (
    <div className="dashboard">
      <section className="dashboard__section">
        <HeroCard />
      </section>

      <section className="dashboard__section">
        <div className="dashboard__stats">
          <StatCard
            label="Total Applied"
            value={total}
            sub={thisWeek > 0 ? `+${thisWeek} this week` : "Start applying"}
            icon={Crosshair}
            iconColor="#2563eb"
            iconBg="rgba(37,99,235,0.09)"
          />
          <StatCard
            label="Interviews"
            value={interviews}
            sub={interviews > 0 ? `${interviews} upcoming` : "Keep pushing"}
            accent={interviews > 0}
            icon={CalendarDays}
            iconColor="#7c3aed"
            iconBg="rgba(124,58,237,0.09)"
          />
          <StatCard
            label="Offers"
            value={offers}
            sub={offers > 0 ? `${offers} pending` : "It's coming"}
            accent={offers > 0}
            icon={Trophy}
            iconColor="#059669"
            iconBg="rgba(5,150,105,0.09)"
          />
          <StatCard
            label="Response Rate"
            value={`${responseRate}%`}
            sub={responseRate >= 20 ? "Above avg." : "Keep applying"}
            icon={TrendingUp}
            iconColor="#0f766e"
            iconBg="rgba(15,118,110,0.09)"
          />
        </div>
      </section>

      <section className="dashboard__section">
        <div className="dashboard__card">
          <div className="dashboard__card-header">
            <div>
              <h2 className="dashboard__card-title">Activity</h2>
              <p className="dashboard__card-sub">
                15 weeks of job search activity
              </p>
            </div>
            <div className="dashboard__heatmap-legend">
              <span className="dashboard__legend-label">Less</span>
              <div className="heatmap-swatch heatmap-swatch--empty" />
              <div className="heatmap-swatch heatmap-swatch--low" />
              <div className="heatmap-swatch heatmap-swatch--mid" />
              <div className="heatmap-swatch heatmap-swatch--high" />
              <span className="dashboard__legend-label">More</span>
            </div>
          </div>
          <Heatmap applications={applications} />
        </div>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__heading">By city</h2>
        <CityBars />
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__heading">Insights</h2>
        <InsightsPanel />
      </section>
    </div>
  );
};
