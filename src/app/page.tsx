"use client";

import { useState } from "react";

import { CreatePassSheet } from "@/components/resident/create-pass-sheet";
import { Button } from "@/components/ui/button";
import { StatusBadge,type StatusBadgeStatus,}
from "@/components/ui/status-badge";

interface ActivePass {
  id: string;
  type: string;
  provider: string;
  status: StatusBadgeStatus;
  expires: string;
}

interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  status: StatusBadgeStatus;
}

const activePasses: ActivePass[] = [
  {
    id: "pass-1",
    type: "Delivery",
    provider: "DoorDash",
    status: "active",
    expires: "Expires in 24 min",
  },
  {
    id: "pass-2",
    type: "Guest",
    provider: "Personal visitor",
    status: "scheduled",
    expires: "Starts at 6:30 PM",
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Delivery pass created",
    detail: "DoorDash · Today at 4:18 PM",
    status: "created",
  },
  {
    id: "activity-2",
    title: "Guest pass redeemed",
    detail: "Visitor entry · Yesterday at 7:42 PM",
    status: "approved",
  },
  {
    id: "activity-3",
    title: "Rideshare pass expired",
    detail: "Lyft · Monday at 9:16 AM",
    status: "expired",
  },
];

function getFormattedDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function GateFlowMark() {
  return (
    <div
      aria-hidden="true"
      className="grid size-10 place-items-center rounded-xl bg-emerald-400 text-lg font-black text-slate-950"
    >
      G
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ChevronRightIcon() {
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
        d="m9 18 6-6-6-6"
      />
    </svg>
  );
}

function BellIcon() {
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
        d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0h6Z"
      />
    </svg>
  );
}

function HomeIcon() {
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
        d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z"
      />
    </svg>
  );
}

function PassIcon() {
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
        d="M4 6h16v12H4zM8 10h4M8 14h7"
      />
    </svg>
  );
}

function HistoryIcon() {
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
        d="M3 12a9 9 0 1 0 3-6.7M3 4v6h6M12 7v5l3 2"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export default function Home() {
  const [isCreatePassOpen, setIsCreatePassOpen] = useState(false);

  function openCreatePassSheet() {
    setIsCreatePassOpen(true);
  }

  function closeCreatePassSheet() {
    setIsCreatePassOpen(false);
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <header className="bg-slate-950 text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <GateFlowMark />

              <div>
                <p className="text-lg font-bold leading-none">gateFlow</p>
                <p className="mt-1 text-xs text-slate-400">
                  Resident portal
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              aria-label="View notifications"
              className="relative size-11 min-h-0 px-0 text-slate-200 hover:bg-slate-900 hover:text-white"
            >
              <BellIcon />

              <span
                aria-hidden="true"
                className="absolute right-2 top-2 size-2 rounded-full bg-emerald-400"
              />
            </Button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pb-10">
          <section aria-labelledby="resident-welcome">
            <p className="text-sm font-semibold text-emerald-700">
              {getFormattedDate()}
            </p>

            <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1
                  id="resident-welcome"
                  className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                >
                  Good afternoon, Elliott
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Create and manage temporary access without sharing permanent
                  gate credentials.
                </p>
              </div>

              <Button
                size="md"
                fullWidth
                className="sm:w-auto"
                onClick={openCreatePassSheet}
              >
                <PlusIcon />
                Create access pass
              </Button>
            </div>
          </section>

          <section
            aria-label="Resident access summary"
            className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Active passes
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">2</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Entries this week
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">8</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Pending</p>

              <p className="mt-2 text-3xl font-bold text-slate-950">1</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Denied attempts
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">0</p>
            </article>
          </section>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <section aria-labelledby="active-passes-heading">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2
                    id="active-passes-heading"
                    className="text-xl font-bold text-slate-950"
                  >
                    Active passes
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current and scheduled community access
                  </p>
                </div>

                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                {activePasses.map((pass) => (
                  <article
                    key={pass.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-950 text-white">
                          <PassIcon />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-slate-950">
                              {pass.type}
                            </h3>

                            <StatusBadge status={pass.status} />
                          </div>

                          <p className="mt-1 truncate text-sm text-slate-600">
                            {pass.provider}
                          </p>

                          <p className="mt-2 text-sm font-medium text-slate-950">
                            {pass.expires}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`View ${pass.type} pass`}
                        className="size-10 min-h-0 shrink-0 px-0"
                      >
                        <ChevronRightIcon />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="recent-activity-heading">
              <div>
                <h2
                  id="recent-activity-heading"
                  className="text-xl font-bold text-slate-950"
                >
                  Recent activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest pass and entry events
                </p>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {recentActivity.map((activity, index) => (
                  <article
                    key={activity.id}
                    className={[
                      "flex items-start justify-between gap-3 p-4",
                      index !== recentActivity.length - 1
                        ? "border-b border-slate-200"
                        : "",
                    ].join(" ")}
                  >
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-950">
                        {activity.title}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {activity.detail}
                      </p>
                    </div>

                    <StatusBadge status={activity.status} />
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section
            aria-labelledby="security-note-heading"
            className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
          >
            <h2
              id="security-note-heading"
              className="font-bold text-emerald-950"
            >
              Security reminder
            </h2>

            <p className="mt-2 text-sm leading-6 text-emerald-900">
              Temporary passes should only be created for expected visitors.
              Never share permanent gate credentials through text messages or
              delivery instructions.
            </p>
          </section>
        </main>

        <nav
          aria-label="Resident navigation"
          className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
        >
          <div className="mx-auto grid max-w-md grid-cols-4">
            <a
              href="#"
              aria-current="page"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-emerald-700"
            >
              <HomeIcon />
              Home
            </a>

            <a
              href="#"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            >
              <PassIcon />
              Passes
            </a>

            <a
              href="#"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            >
              <HistoryIcon />
              History
            </a>

            <a
              href="#"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            >
              <ProfileIcon />
              Profile
            </a>
          </div>
        </nav>
      </div>

      <CreatePassSheet
        open={isCreatePassOpen}
        onClose={closeCreatePassSheet}
      />
    </>
  );
}