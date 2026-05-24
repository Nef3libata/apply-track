import type { FilterValue } from "@core/models/types";
import { useAppStore } from "@core/store/useAppStore";
import "./FilterChips.scss";

interface FilterOption {
  value: FilterValue;
  label: string;
  dotColor?: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: "all",       label: "All" },
  { value: "applied",   label: "Applied",   dotColor: "var(--blue)" },
  { value: "interview", label: "Interview", dotColor: "var(--yellow)" },
  { value: "offer",     label: "Offer",     dotColor: "var(--green)" },
  { value: "rejected",  label: "Rejected",  dotColor: "var(--red)" },
  { value: "ghosted",   label: "Ghosted",   dotColor: "var(--text-muted)" },
];

export const FilterChips = () => {
  const activeFilter = useAppStore((s) => s.activeFilter);
  const setActiveFilter = useAppStore((s) => s.setActiveFilter);

  return (
    <div className="filter-chips" role="group" aria-label="Filter applications">
      {FILTER_OPTIONS.map(({ value, label, dotColor }) => (
        <button
          key={value}
          className={`filter-chips__chip${activeFilter === value ? " filter-chips__chip--active" : ""}`}
          onClick={() => setActiveFilter(value)}
          aria-pressed={activeFilter === value}
        >
          {dotColor && (
            <span
              className="filter-chips__dot"
              style={{ background: dotColor }}
            />
          )}
          {label}
        </button>
      ))}
    </div>
  );
};
