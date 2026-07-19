import type { HTMLAttributes } from "react";

export type StatusBadgeStatus =
  | "active"
  | "scheduled"
  | "approved"
  | "created"
  | "expired"
  | "revoked"
  | "denied"
  | "used";

export interface StatusBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  status: StatusBadgeStatus;
  label?: string;
}

const statusStyles: Record<StatusBadgeStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  scheduled: "bg-amber-50 text-amber-700 ring-amber-600/20",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  created: "bg-sky-50 text-sky-700 ring-sky-600/20",
  expired: "bg-slate-100 text-slate-600 ring-slate-500/20",
  revoked: "bg-red-50 text-red-700 ring-red-600/20",
  denied: "bg-red-50 text-red-700 ring-red-600/20",
  used: "bg-violet-50 text-violet-700 ring-violet-600/20",
};

const defaultLabels: Record<StatusBadgeStatus, string> = {
  active: "Active",
  scheduled: "Scheduled",
  approved: "Approved",
  created: "Created",
  expired: "Expired",
  revoked: "Revoked",
  denied: "Denied",
  used: "Used",
};

function joinClassNames(
  ...classNames: Array<string | false | null | undefined>
) {
  return classNames.filter(Boolean).join(" ");
}

export function StatusBadge({
  status,
  label,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={joinClassNames(
        "inline-flex items-center rounded-full px-2.5 py-1",
        "text-xs font-semibold ring-1 ring-inset",
        statusStyles[status],
        className,
      )}
      {...props}
    >
      {label ?? defaultLabels[status]}
    </span>
  );
}