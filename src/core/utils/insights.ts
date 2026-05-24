import type { Application, NetworkStats } from "@core/models/types";
import { computeCurrentStreak } from "./streak";

export type InsightType = "offer" | "streak" | "warning" | "tip" | "info";

export interface Insight {
  text: string;
  type: InsightType;
}

export const getInsights = (
  applications: Application[],
  network: NetworkStats
): Insight[] => {
  const insights: Insight[] = [];

  if (applications.length === 0) {
    insights.push({
      text: "Add your first application to start tracking your job search journey.",
      type: "tip",
    });
    return insights;
  }

  const offerCount = applications.filter((a) => a.status === "offer").length;
  if (offerCount > 0) {
    insights.push({
      text: `You have ${offerCount} offer${offerCount > 1 ? "s" : ""} — that's huge. Time to negotiate hard.`,
      type: "offer",
    });
  }

  const streak = computeCurrentStreak(applications);
  if (streak >= 3) {
    insights.push({
      text: `${streak}-day application streak — consistency is your superpower. Keep it going.`,
      type: "streak",
    });
  }

  const ghostedCount = applications.filter((a) => a.status === "ghosted").length;
  if (ghostedCount >= 3) {
    insights.push({
      text: `${ghostedCount} companies ghosted you — that's them, not you. 63% of hiring managers never send rejections.`,
      type: "info",
    });
  }

  const interviewCount = applications.filter(
    (a) => a.status === "interview"
  ).length;
  if (applications.length >= 10 && interviewCount === 0) {
    insights.push({
      text: "10+ applications with no interviews yet — try reaching out directly. A warm intro beats a cold apply.",
      type: "warning",
    });
  }

  const techCount = applications.filter((a) => a.type === "tech").length;
  const generalCount = applications.filter((a) => a.type === "general").length;
  if (techCount > 0 && generalCount > 0) {
    const techPct = Math.round((techCount / applications.length) * 100);
    insights.push({
      text: `Your pipeline is ${techPct}% tech roles, ${100 - techPct}% general — double down on whichever converts better.`,
      type: "tip",
    });
  }

  if (applications.length >= 5 && network.events === 0) {
    insights.push({
      text: "You've sent out 5+ apps but haven't logged any events. Tech meetups in Berlin and Munich are active — try one this week.",
      type: "tip",
    });
  }

  if (insights.length === 0) {
    insights.push({
      text: "You're building momentum. Keep applying — consistency compounds.",
      type: "info",
    });
  }

  return insights.slice(0, 4);
};
