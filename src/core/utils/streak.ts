import type { Application } from "@core/models/types";

// Application dates are stored as UTC ISO date strings (via toISOString().split("T")[0]).
// All comparisons must stay in UTC — never mix in setHours() which shifts to local time.

const utcDateKey = (date: Date): string => date.toISOString().split("T")[0]!;

const subtractUTCDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - days);
  return d;
};

export const computeCurrentStreak = (applications: Application[]): number => {
  if (applications.length === 0) return 0;

  const dates = new Set(applications.map((a) => a.date));
  let cursor = new Date();

  // If nothing logged today, allow yesterday to keep the streak alive
  if (!dates.has(utcDateKey(cursor))) {
    cursor = subtractUTCDays(cursor, 1);
    if (!dates.has(utcDateKey(cursor))) return 0;
  }

  let streak = 0;
  while (dates.has(utcDateKey(cursor))) {
    streak++;
    cursor = subtractUTCDays(cursor, 1);
  }

  return streak;
};

export const computeLongestStreak = (applications: Application[]): number => {
  if (applications.length === 0) return 0;

  const sorted = [...new Set(applications.map((a) => a.date))].sort();
  if (sorted.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]!);
    const curr = new Date(sorted[i]!);
    const diffDays = Math.round(
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }

  return longest;
};
