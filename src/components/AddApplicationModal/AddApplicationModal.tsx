import { useEffect, useRef, type FormEvent } from "react";
import { X } from "lucide-react";
import type { ApplicationStatus, ApplicationType } from "@core/models/types";
import { useAppStore } from "@core/store/useAppStore";
import "./AddApplicationModal.scss";

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS: ApplicationStatus[] = [
  "applied",
  "interview",
  "offer",
  "rejected",
  "ghosted",
];

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  ghosted: "Ghosted",
};

export const AddApplicationModal = ({
  isOpen,
  onClose,
}: AddApplicationModalProps) => {
  const addApplication = useAppStore((s) => s.addApplication);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const firstInput = dialogRef.current?.querySelector<HTMLElement>("input");
      firstInput?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    addApplication({
      company: (data.get("company") as string).trim(),
      role: (data.get("role") as string).trim(),
      city: (data.get("city") as string).trim(),
      type: data.get("type") as ApplicationType,
      status: data.get("status") as ApplicationStatus,
      date: new Date().toISOString().split("T")[0]!,
      notes: ((data.get("notes") as string) ?? "").trim() || undefined,
    });

    form.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="modal" ref={dialogRef}>
        <div className="modal__header">
          <h2 className="modal__title" id="modal-title">
            Add Application
          </h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          <div className="modal__row">
            <div className="modal__field">
              <label className="modal__label" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                name="company"
                className="modal__input"
                type="text"
                placeholder="e.g. Zalando"
                required
                autoComplete="off"
              />
            </div>

            <div className="modal__field">
              <label className="modal__label" htmlFor="role">
                Role
              </label>
              <input
                id="role"
                name="role"
                className="modal__input"
                type="text"
                placeholder="e.g. Frontend Developer"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="modal__row">
            <div className="modal__field">
              <label className="modal__label" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                className="modal__input"
                type="text"
                placeholder="e.g. Berlin"
                required
                autoComplete="off"
              />
            </div>

            <div className="modal__field">
              <label className="modal__label" htmlFor="type">
                Type
              </label>
              <select id="type" name="type" className="modal__select" required>
                <option value="tech">Tech</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="modal__select"
              required
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="notes">
              Notes{" "}
              <span className="modal__label-hint">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              className="modal__textarea"
              placeholder="Any notes about the role or process..."
              rows={3}
            />
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="modal__btn modal__btn--cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="modal__btn modal__btn--submit">
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
