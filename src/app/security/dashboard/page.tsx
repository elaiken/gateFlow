type MetricCardProps = {
    label: string;
    value: string;
    detail: string;
    icon: React.ReactNode;
    tone: "emerald" | "blue" | "violet" | "amber" | "slate";
  };

  type ActivityStatus = "approved" | "created" | "warning" | "denied";

  type ActivityItem = {
    id: number;
    title: string;
    description: string;
    time: string;
    location: string;
    status: ActivityStatus;
  };

  type AlertItem = {
    id: number;
    title: string;
    description: string;
    time: string;
    severity: "high" | "medium" | "low";
  };

  const activities: ActivityItem[] = [
    {
      id: 1,
      title: "Entry approved",
      description: "DoorDash delivery for Unit 305",
      time: "2:31 PM",
      location: "Main Gate",
      status: "approved",
    },
    {
      id: 2,
      title: "Guest pass created",
      description: "Visitor access created by Unit 214",
      time: "2:29 PM",
      location: "Resident Portal",
      status: "created",
    },
    {
      id: 3,
      title: "QR code shared",
      description: "Temporary guest pass for Unit 118",
      time: "2:28 PM",
      location: "Mobile",
      status: "warning",
    },
    {
      id: 4,
      title: "Expired pass presented",
      description: "Guest attempted access for Unit 411",
      time: "2:25 PM",
      location: "North Gate",
      status: "denied",
    },
    {
      id: 5,
      title: "Contractor checked in",
      description: "Palm Coast Plumbing for Unit 226",
      time: "2:21 PM",
      location: "Service Gate",
      status: "approved",
    },
  ];

  const alerts: AlertItem[] = [
    {
      id: 1,
      title: "Multiple failed scan attempts",
      description:
        "The same visitor pass was scanned five times within two minutes.",
      time: "2 minutes ago",
      severity: "high",
    },
    {
      id: 2,
      title: "Contractor remains on property",
      description:
        "The contractor pass for Unit 108 expired 27 minutes ago.",
      time: "8 minutes ago",
      severity: "medium",
    },
    {
      id: 3,
      title: "Active pass revoked",
      description:
        "A resident revoked a guest pass after the visitor entered.",
      time: "14 minutes ago",
      severity: "low",
    },
  ];

  const metricToneClasses: Record<MetricCardProps["tone"], string> = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    blue: "bg-blue-50 text-blue-700 ring-blue-600/10",
    violet: "bg-violet-50 text-violet-700 ring-violet-600/10",
    amber: "bg-amber-50 text-amber-700 ring-amber-600/10",
    slate: "bg-slate-100 text-slate-700 ring-slate-600/10",
  };

  const activityStatusClasses: Record<ActivityStatus, string> = {
    approved: "bg-emerald-500",
    created: "bg-blue-500",
    warning: "bg-amber-500",
    denied: "bg-rose-500",
  };

  const alertSeverityClasses: Record<AlertItem["severity"], string> = {
    high: "bg-rose-50 text-rose-700 ring-rose-600/20",
    medium: "bg-amber-50 text-amber-700 ring-amber-600/20",
    low: "bg-blue-50 text-blue-700 ring-blue-600/20",
  };

  function MetricCard({
    label,
    value,
    detail,
    icon,
    tone,
  }: MetricCardProps) {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{detail}</p>
          </div>

          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${metricToneClasses[tone]}`}
          >
            {icon}
          </div>
        </div>
      </article>
    );
  }

  function ShieldIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="M12 3 5 6v5c0 4.7 2.8 8.1 7 10 4.2-1.9 7-5.3 7-10V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m9 12 2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function UsersIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle
          cx="10"
          cy="8"
          r="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M17 11a3 3 0 1 0 0-6M18 15a3.5 3.5 0 0 1 3 3.5V20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  function CarIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="m5 11 1.5-4h11L19 11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M4 11h16v7H4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M7 18v2M17 18v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="7.5" cy="14.5" r="1" fill="currentColor" />
        <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  function PackageIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="m4 7 8-4 8 4-8 4-8-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M4 7v10l8 4 8-4V7M12 11v10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function ToolIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-3-3 2.5-2.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  function BellIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 20h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  function SearchIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m16 16 4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  export default function SecurityDashboardPage() {
    return (
      <main className="min-h-screen bg-slate-100 text-slate-950">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
                <ShieldIcon />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-lg font-semibold tracking-tight">
                    GateFlow
                  </p>
                  <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 sm:inline-flex">
                    Security
                  </span>
                </div>
                <p className="truncate text-sm text-slate-500">
                  Deerfield Townhomes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Search operations"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 sm:flex"
              >
                <SearchIcon />
              </button>

              <button
                type="button"
                aria-label="View notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <BellIcon />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              <div className="hidden items-center gap-3 border-l border-slate-200 pl-3 md:flex">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    Marcus Reed
                  </p>
                  <p className="text-xs text-slate-500">Head of Security</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  MR
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Live operations
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Operations Center
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Monitor visitor access, gate activity, security alerts, and active
                passes across Deerfield Townhomes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                View audit log
              </button>

              <button
                type="button"
                className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Create incident
              </button>
            </div>
          </section>

          <section
            aria-label="Operations overview"
            className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
          >
            <MetricCard
              label="Active visitors"
              value="18"
              detail="+4 within the last hour"
              tone="emerald"
              icon={<UsersIcon />}
            />

            <MetricCard
              label="Waiting at gate"
              value="3"
              detail="Longest wait: 1m 42s"
              tone="blue"
              icon={<CarIcon />}
            />

            <MetricCard
              label="Deliveries"
              value="8"
              detail="5 currently on property"
              tone="violet"
              icon={<PackageIcon />}
            />

            <MetricCard
              label="Contractors"
              value="4"
              detail="1 pass expires soon"
              tone="amber"
              icon={<ToolIcon />}
            />

            <MetricCard
              label="Approved today"
              value="126"
              detail="98.4% approval rate"
              tone="slate"
              icon={<ShieldIcon />}
            />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.85fr)]">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">
                    Live activity
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Real-time access events from all community gates.
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="group flex gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6"
                  >
                    <div className="relative mt-1 flex shrink-0 justify-center">
                      <span
                        className={`h-3 w-3 rounded-full ring-4 ring-white ${activityStatusClasses[activity.status]}`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-semibold text-slate-900">
                          {activity.title}
                        </p>
                        <time className="text-xs font-medium text-slate-500">
                          {activity.time}
                        </time>
                      </div>

                      <p className="mt-1 text-sm text-slate-600">
                        {activity.description}
                      </p>

                      <p className="mt-2 text-xs font-medium text-slate-400">
                        {activity.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
                >
                  View all activity →
                </button>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">
                    Security alerts
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Events requiring review.
                  </p>
                </div>

                <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-600/20">
                  3 open
                </span>
              </div>

              <div className="space-y-3 p-4">
                {alerts.map((alert) => (
                  <button
                    key={alert.id}
                    type="button"
                    className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${alertSeverityClasses[alert.severity]}`}
                      >
                        {alert.severity}
                      </span>

                      <span className="shrink-0 text-xs text-slate-400">
                        {alert.time}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-slate-900">
                      {alert.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      {alert.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-200 px-5 py-4">
                <button
                  type="button"
                  className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
                >
                  Review all alerts →
                </button>
              </div>
            </article>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm lg:col-span-2">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                    Community security health
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    Operations are running smoothly
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                    Entry approval remains above target, with no critical
                    incidents reported during the current shift.
                  </p>
                </div>

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-8 border-emerald-400/20 bg-slate-900">
                  <div className="text-center">
                    <p className="text-2xl font-semibold">98%</p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Healthy
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Current shift
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  JW
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Jordan Williams</p>
                  <p className="text-sm text-slate-500">Main Gate Officer</p>
                </div>
              </div>

              <dl className="mt-5 space-y-3 border-t border-slate-200 pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Shift</dt>
                  <dd className="font-medium text-slate-900">2:00 PM–10:00 PM</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Entries processed</dt>
                  <dd className="font-medium text-slate-900">37</dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Average wait</dt>
                  <dd className="font-medium text-slate-900">11 seconds</dd>
                </div>
              </dl>
            </article>
          </section>
        </div>
      </main>
    );
  }