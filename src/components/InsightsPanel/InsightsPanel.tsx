import { Trophy, Flame, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAppStore } from "@core/store/useAppStore";
import { getInsights, type InsightType } from "@core/utils/insights";
import "./InsightsPanel.scss";

const INSIGHT_ICONS: Record<InsightType, LucideIcon> = {
  offer:   Trophy,
  streak:  Flame,
  warning: AlertTriangle,
  tip:     Lightbulb,
  info:    TrendingUp,
};

export const InsightsPanel = () => {
  const applications = useAppStore((s) => s.applications);
  const network = useAppStore((s) => s.network);

  const insights = getInsights(applications, network);

  return (
    <div className="insights-panel">
      {insights.map((insight, i) => {
        const Icon = INSIGHT_ICONS[insight.type];
        return (
          <div key={i} className={`insights-panel__card insights-panel__card--${insight.type}`}>
            <div className="insights-panel__icon">
              <Icon size={14} strokeWidth={2.5} />
            </div>
            <p className="insights-panel__text">{insight.text}</p>
          </div>
        );
      })}
    </div>
  );
};
