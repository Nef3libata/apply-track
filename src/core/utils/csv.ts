import type { Application } from "@core/models/types";

const STATUS_LABELS: Record<string, string> = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
};

const TERMINAL_STATUSES = new Set(["rejected", "offer", "ghosted"]);

const HEADERS = [
  "Position",
  "Company",
  "Location",
  "Status",
  "Result",
  "Final",
  "date applied",
  "Type",
  "Notes",
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function buildRow(app: Application): string[] {
  const statusLabel = STATUS_LABELS[app.status] ?? app.status;
  const result = TERMINAL_STATUSES.has(app.status) ? statusLabel : "";
  return [
    app.role,
    app.company,
    app.city,
    statusLabel,
    result,
    result,
    formatDate(app.date),
    app.type === "tech" ? "Tech" : "General",
    app.notes ?? "",
  ];
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportApplicationsToCSV(applications: Application[]): void {
  const rows = applications.map((app) =>
    buildRow(app).map(escapeCSV).join(",")
  );
  const content = [HEADERS.join(","), ...rows].join("\n");
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const encoded = new TextEncoder().encode(content);
  const blob = new Blob([bom, encoded], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `applications-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
