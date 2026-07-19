"use client";

import {
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";

export type PassType = "delivery" | "rideshare" | "guest" | "contractor";

export interface PassDraft {
  passType: PassType;
  visitorName: string;
  vehicle: string | null;
  startsAt: string;
  expiresAt: string;
}

interface CreatePassSheetProps {
  open: boolean;
  onClose: () => void;
}

interface PassTypeOption {
  value: PassType;
  label: string;
  description: string;
  icon: ReactNode;
}

type SheetStep = "details" | "review";

const passTypeOptions: PassTypeOption[] = [
  {
    value: "delivery",
    label: "Delivery",
    description: "DoorDash, Uber Eats, Amazon, or another delivery service",
    icon: <DeliveryIcon />,
  },
  {
    value: "rideshare",
    label: "Rideshare",
    description: "Uber, Lyft, taxi, or private transportation",
    icon: <CarIcon />,
  },
  {
    value: "guest",
    label: "Guest",
    description: "Friend, family member, or personal visitor",
    icon: <GuestIcon />,
  },
  {
    value: "contractor",
    label: "Contractor",
    description: "Maintenance, cleaning, repair, or another service provider",
    icon: <ToolIcon />,
  },
];

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15 18-6-6 6-6"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 5 6v5c0 4.8 2.8 8.3 7 10 4.2-1.7 7-5.2 7-10V6l-7-3Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 12 2 2 4-4"
      />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"
      />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 11 2-5h10l2 5M4 11h16v7H4z"
      />
      <circle cx="7" cy="18" r="1" />
      <circle cx="17" cy="18" r="1" />
    </svg>
  );
}

function GuestIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="8" r="4" />
      <path strokeLinecap="round" d="M2 21a7 7 0 0 1 14 0" />
      <path strokeLinecap="round" d="M17 8h5M19.5 5.5v5" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 6a4 4 0 0 0 4.7 5.9L11 19.6a2.1 2.1 0 0 1-3-3l7.7-7.7A4 4 0 0 0 14 4v2Z"
      />
    </svg>
  );
}

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-900"
    >
      <span>{children}</span>

      {optional ? (
        <span className="text-xs font-medium text-slate-400">Optional</span>
      ) : null}
    </label>
  );
}

function getDefaultTimes() {
  const now = new Date();
  const roundedStart = new Date(now);

  roundedStart.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);

  const expiration = new Date(roundedStart);
  expiration.setMinutes(expiration.getMinutes() + 45);

  function toLocalInputValue(date: Date) {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60_000);

    return localDate.toISOString().slice(0, 16);
  }

  return {
    startsAt: toLocalInputValue(roundedStart),
    expiresAt: toLocalInputValue(expiration),
  };
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-slate-200 py-4 last:border-b-0">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>

      <dd className="max-w-[65%] text-right text-sm font-semibold text-slate-950">
        {value}
      </dd>
    </div>
  );
}

export function CreatePassSheet({
  open,
  onClose,
}: CreatePassSheetProps) {
  const titleId = useId();
  const descriptionId = useId();
  const visitorNameId = useId();
  const vehicleId = useId();
  const startsAtId = useId();
  const expiresAtId = useId();

  const [step, setStep] = useState<SheetStep>("details");
  const [passType, setPassType] = useState<PassType>("delivery");
  const [visitorName, setVisitorName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [startsAt, setStartsAt] = useState(
    () => getDefaultTimes().startsAt,
  );
  const [expiresAt, setExpiresAt] = useState(
    () => getDefaultTimes().expiresAt,
  );
  const [formError, setFormError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedPassType =
    passTypeOptions.find((option) => option.value === passType) ??
    passTypeOptions[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  function validateForm() {
    setFormError("");

    if (!visitorName.trim()) {
      setFormError("Enter the visitor, driver, or company name.");
      return false;
    }

    if (!startsAt || !expiresAt) {
      setFormError("Choose both a start time and expiration time.");
      return false;
    }

    const startDate = new Date(startsAt);
    const expirationDate = new Date(expiresAt);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(expirationDate.getTime())
    ) {
      setFormError("Enter valid start and expiration times.");
      return false;
    }

    if (expirationDate <= startDate) {
      setFormError("The expiration time must be later than the start time.");
      return false;
    }

    return true;
  }

  function handleDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStep("review");
  }

  function handleBack() {
    setStep("details");
  }

  function handleClose() {
    setStep("details");
    setFormError("");
    onClose();
  }

  async function handleGeneratePass() {
    setIsGenerating(true);

    const passDraft: PassDraft = {
      passType,
      visitorName: visitorName.trim(),
      vehicle: vehicle.trim() || null,
      startsAt,
      expiresAt,
    };

    console.log("GateFlow pass draft:", passDraft);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    setIsGenerating(false);
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close create pass form"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-3xl"
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-slate-300 sm:hidden" />

        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-start gap-3">
            {step === "review" ? (
              <Button
                variant="ghost"
                size="sm"
                aria-label="Return to pass details"
                className="mt-1 size-10 min-h-0 shrink-0 px-0"
                onClick={handleBack}
              >
                <ArrowLeftIcon />
              </Button>
            ) : null}

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Resident access
              </p>

              <h2
                id={titleId}
                className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
              >
                {step === "details"
                  ? "Create temporary pass"
                  : "Review pass details"}
              </h2>

              <p
                id={descriptionId}
                className="mt-2 max-w-lg text-sm leading-6 text-slate-500"
              >
                {step === "details"
                  ? "Choose who needs access and how long their pass should remain valid."
                  : "Confirm the information before generating secure temporary access."}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            aria-label="Close create pass form"
            className="size-10 min-h-0 shrink-0 px-0"
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </header>

        {step === "details" ? (
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={handleDetailsSubmit}
          >
            <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6 sm:px-7">
              <fieldset>
                <legend className="text-sm font-semibold text-slate-900">
                  Pass type
                </legend>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {passTypeOptions.map((option) => {
                    const selected = passType === option.value;

                    return (
                      <label
                        key={option.value}
                        className={[
                          "relative flex cursor-pointer gap-3 rounded-2xl border p-4 transition",
                          "focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2",
                          selected
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="pass-type"
                          value={option.value}
                          checked={selected}
                          onChange={() => setPassType(option.value)}
                          className="sr-only"
                        />

                        <span
                          className={[
                            "grid size-10 shrink-0 place-items-center rounded-xl",
                            selected
                              ? "bg-emerald-500 text-slate-950"
                              : "bg-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          {option.icon}
                        </span>

                        <span className="min-w-0">
                          <span className="block font-bold text-slate-950">
                            {option.label}
                          </span>

                          <span className="mt-1 block text-sm leading-5 text-slate-500">
                            {option.description}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={[
                            "absolute right-3 top-3 size-3 rounded-full",
                            selected
                              ? "bg-emerald-500 ring-4 ring-emerald-100"
                              : "bg-slate-200",
                          ].join(" ")}
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <FieldLabel htmlFor={visitorNameId}>
                  Visitor or company name
                </FieldLabel>

                <input
                  id={visitorNameId}
                  type="text"
                  value={visitorName}
                  onChange={(event) => setVisitorName(event.target.value)}
                  placeholder="Example: DoorDash or Jordan Smith"
                  autoComplete="name"
                  className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <FieldLabel htmlFor={vehicleId} optional>
                  Vehicle details
                </FieldLabel>

                <input
                  id={vehicleId}
                  type="text"
                  value={vehicle}
                  onChange={(event) => setVehicle(event.target.value)}
                  placeholder="Example: White Honda Accord"
                  className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor={startsAtId}>Starts</FieldLabel>

                  <input
                    id={startsAtId}
                    type="datetime-local"
                    value={startsAt}
                    onChange={(event) => setStartsAt(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor={expiresAtId}>Expires</FieldLabel>

                  <input
                    id={expiresAtId}
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(event) => setExpiresAt(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {formError ? (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {formError}
                </div>
              ) : null}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Temporary access only
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  The final QR code will expire automatically and will not
                  reveal permanent resident gate credentials.
                </p>
              </div>
            </div>

            <footer className="border-t border-slate-200 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-7 sm:pb-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                  fullWidth
                  className="sm:w-auto"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  className="sm:w-auto sm:min-w-40"
                >
                  Continue
                </Button>
              </div>
            </footer>
          </form>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500 text-slate-950">
                    <ShieldIcon />
                  </span>

                  <div>
                    <p className="font-bold text-emerald-950">
                      Secure temporary access
                    </p>

                    <p className="mt-1 text-sm leading-6 text-emerald-900">
                      This pass will only be valid during the selected access
                      window and can be revoked by the resident.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
                <dl>
                  <ReviewRow
                    label="Pass type"
                    value={selectedPassType.label}
                  />

                  <ReviewRow
                    label="Visitor"
                    value={visitorName.trim()}
                  />

                  <ReviewRow
                    label="Vehicle"
                    value={vehicle.trim() || "Not provided"}
                  />

                  <ReviewRow
                    label="Starts"
                    value={formatDateTime(startsAt)}
                  />

                  <ReviewRow
                    label="Expires"
                    value={formatDateTime(expiresAt)}
                  />
                </dl>
              </div>

              <p className="mt-5 text-center text-sm leading-6 text-slate-500">
                After generation, GateFlow will create a temporary QR code and
                backup entry PIN.
              </p>
            </div>

            <footer className="border-t border-slate-200 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-7 sm:pb-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  fullWidth
                  className="sm:w-auto"
                >
                  Edit details
                </Button>

                <Button
                  type="button"
                  loading={isGenerating}
                  onClick={handleGeneratePass}
                  fullWidth
                  className="sm:w-auto sm:min-w-44"
                >
                  Generate QR pass
                </Button>
              </div>
            </footer>
          </div>
        )}
      </section>
    </div>
  );
}