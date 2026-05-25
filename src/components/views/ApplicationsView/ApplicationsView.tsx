import { useState } from "react";
import { Download, Pencil, Plus, Trash2 } from "lucide-react";
import { useAppStore } from "@core/store/useAppStore";
import type { Application } from "@core/models/types";
import { FilterChips } from "@components/FilterChips/FilterChips";
import { StatusBadge } from "@components/StatusBadge/StatusBadge";
import { AddApplicationModal } from "@components/AddApplicationModal/AddApplicationModal";
import { exportApplicationsToCSV } from "@core/utils/csv";
import "./ApplicationsView.scss";

const COMPANY_COLORS = [
  "#0d9488",
  "#2563eb",
  "#7c3aed",
  "#d97706",
  "#059669",
  "#ea580c",
  "#0891b2",
  "#6d28d9",
];

const getCompanyColor = (name: string): string =>
  COMPANY_COLORS[name.charCodeAt(0) % COMPANY_COLORS.length]!;

export const ApplicationsView = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  const applications = useAppStore((s) => s.applications);
  const activeFilter = useAppStore((s) => s.activeFilter);
  const removeApplication = useAppStore((s) => s.removeApplication);

  const filtered =
    activeFilter === "all"
      ? applications
      : applications.filter((a) => a.status === activeFilter);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="applications">
      <div className="applications__toolbar">
        <FilterChips />
        <div className="applications__actions">
          <button
            className="applications__export-btn"
            onClick={() => exportApplicationsToCSV(applications)}
            disabled={applications.length === 0}
            aria-label="Export applications to CSV"
          >
            <Download size={14} strokeWidth={2.5} />
            Export CSV
          </button>
          <button
            className="applications__add-btn"
            onClick={() => setIsAddOpen(true)}
            aria-label="Add application"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Application
          </button>
        </div>
      </div>

      <p className="applications__count">
        {filtered.length}{" "}
        {filtered.length === 1 ? "application" : "applications"}
      </p>

      {filtered.length === 0 ? (
        <div className="applications__empty">
          <p>No applications match this filter.</p>
        </div>
      ) : (
        <ul className="applications__list" role="list">
          {filtered.map((app) => {
            const color = getCompanyColor(app.company);
            const initial = app.company[0]?.toUpperCase() ?? "?";
            return (
              <li key={app.id} className="app-row">
                <div
                  className="app-row__avatar"
                  style={{
                    background: `${color}18`,
                    color,
                    borderColor: `${color}28`,
                  }}
                >
                  {initial}
                </div>
                <div className="app-row__main">
                  <div className="app-row__top">
                    <span className="app-row__company">{app.company}</span>
                    <StatusBadge status={app.status} />
                  </div>
                  <span className="app-row__role">{app.role}</span>
                </div>
                <div className="app-row__right">
                  <span className="app-row__date">{formatDate(app.date)}</span>
                  <button
                    className="app-row__edit"
                    onClick={() => setEditingApp(app)}
                    aria-label={`Edit ${app.company} application`}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    className="app-row__delete"
                    onClick={() => removeApplication(app.id)}
                    aria-label={`Remove ${app.company} application`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AddApplicationModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      <AddApplicationModal
        isOpen={!!editingApp}
        onClose={() => setEditingApp(null)}
        application={editingApp ?? undefined}
      />
    </div>
  );
};
