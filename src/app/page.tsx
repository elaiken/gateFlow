"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  DEMO_COMMUNITIES,
  getCommunityDisplayLocation,
  type Community,
} from "@/lib/demo/communities";

export default function GateFlowHomepage() {
  const router = useRouter();
  const [selectedCommunitySlug, setSelectedCommunitySlug] =
    useState("");

  const selectedCommunity = useMemo(
    () =>
      DEMO_COMMUNITIES.find(
        (community) =>
          community.slug === selectedCommunitySlug,
      ),
    [selectedCommunitySlug],
  );

  function handleContinue() {
    if (!selectedCommunity) {
      return;
    }

    localStorage.setItem(
      "gateflow-selected-community",
      selectedCommunity.slug,
    );

    localStorage.setItem(
      "gateflow-selected-community-id",
      selectedCommunity.id,
    );

    router.push(
      `/login?community=${encodeURIComponent(
        selectedCommunity.slug,
      )}`,
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-6 sm:max-w-xl sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
              GF
            </div>

            <div className="min-w-0">
              <p className="truncate text-lg font-semibold tracking-tight">
                GateFlow
              </p>

              <p className="truncate text-xs text-slate-400">
                Community access simplified
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
            Secure Access
          </span>
        </header>

        <section className="pt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            GateFlow Community Portal
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
            Welcome to your
            <span className="block text-emerald-400">
              connected community.
            </span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Select your community to manage visitors, verify
            access, monitor gate activity, or administer
            community operations.
          </p>
        </section>

        <section className="mt-10">
          <label
            htmlFor="community"
            className="text-sm font-semibold text-white"
          >
            Select your community
          </label>

          <p className="mt-1 text-xs text-slate-400">
            Your account and dashboard will be connected to
            this location.
          </p>

          <div className="relative mt-4">
            <select
              id="community"
              value={selectedCommunitySlug}
              onChange={(event) =>
                setSelectedCommunitySlug(event.target.value)
              }
              className="w-full appearance-none rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 pr-12 text-sm font-medium text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
            >
              <option value="">
                Choose a community
              </option>

              {DEMO_COMMUNITIES.map((community) => (
                <option
                  key={community.id}
                  value={community.slug}
                >
                  {community.name} —{" "}
                  {getCommunityDisplayLocation(community)}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              <ChevronDownIcon />
            </div>
          </div>

          {selectedCommunity && (
            <CommunityPreview
              community={selectedCommunity}
            />
          )}
        </section>

        <div className="mt-auto pt-10">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedCommunity}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
          >
            Continue
            <ArrowRightIcon />
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            GateFlow helps residents and community teams
            manage secure access from one connected platform.
          </p>

          <div className="mt-5 flex items-center justify-center gap-5 text-[11px] text-slate-600">
            <span>Privacy</span>
            <span>Support</span>
            <span>© 2026 GateFlow</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function CommunityPreview({
  community,
}: {
  community: Community;
}) {
  const occupancyRate = Math.round(
    (community.property.occupiedUnits /
      community.property.totalUnits) *
      100,
  );

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
      <div className="flex items-start gap-4 p-4">
        <CommunityLogo community={community} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-white">
              {community.name}
            </h2>

            <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              {getCategoryLabel(community)}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            {community.location.displayLocation}
          </p>

          <p className="mt-3 text-sm leading-5 text-slate-300">
            {community.tagline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-slate-800 bg-slate-950/40">
        <PreviewMetric
          label="Homes"
          value={community.property.totalUnits.toString()}
        />

        <PreviewMetric
          label="Occupied"
          value={`${occupancyRate}%`}
        />

        <PreviewMetric
          label="Entrances"
          value={community.property.entrances.toString()}
        />
      </div>
    </div>
  );
}

function CommunityLogo({
  community,
}: {
  community: Community;
}) {
  const shapeClasses: Record<
    Community["branding"]["logoShape"],
    string
  > = {
    rounded: "rounded-2xl",
    circle: "rounded-full",
    shield: "rounded-t-2xl rounded-b-[45%]",
    arch: "rounded-t-full rounded-b-xl",
  };

  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center border text-sm font-bold text-white shadow-sm ${
        shapeClasses[community.branding.logoShape]
      }`}
      style={{
        backgroundColor:
          community.branding.primaryColor,
        borderColor:
          community.branding.secondaryColor,
      }}
      aria-label={`${community.name} logo`}
    >
      {community.branding.logoText}
    </div>
  );
}

function PreviewMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-3 py-3 text-center">
      <p className="text-sm font-semibold text-white">
        {value}
      </p>

      <p className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

function getCategoryLabel(
  community: Community,
): string {
  switch (community.category) {
    case "apartment":
      return "Apartments";

    case "townhome":
      return "Townhomes";

    case "active_adult":
      return "55+ Community";

    default:
      return "Community";
  }
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7 10 5 5 5-5"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14m-5-5 5 5-5 5"
      />
    </svg>
  );
}