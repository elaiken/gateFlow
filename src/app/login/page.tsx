"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEMO_COMMUNITIES,
  type Community,
} from "@/lib/demo/communities";

import {
  ROLE_LABELS,
  ROLE_ROUTES,
  USER_ROLES,
  type UserRole,
} from "@/lib/auth/roles";

type DemoCredential = {
  role: UserRole;
  username: string;
  password: string;
  displayName: string;
};

const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    role: USER_ROLES.RESIDENT,
    username: "resident",
    password: "2026",
    displayName: "Jordan Williams",
  },
  {
    role: USER_ROLES.SECURITY_GUARD,
    username: "employee",
    password: "2026",
    displayName: "Marcus Reed",
  },
  {
    role: USER_ROLES.COMMUNITY_MANAGER,
    username: "manager",
    password: "2026",
    displayName: "Dana Brooks",
  },
  {
    role: USER_ROLES.GATEFLOW_ADMIN,
    username: "gateflow",
    password: "2026",
    displayName: "GateFlow Administrator",
  },
];

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const communitySlug = searchParams.get("community") ?? "";

  const community = useMemo(
    () =>
      DEMO_COMMUNITIES.find(
        (item) => item.slug === communitySlug,
      ),
    [communitySlug],
  );

  const [role, setRole] = useState<UserRole>(
    USER_ROLES.RESIDENT,
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (communitySlug) {
      return;
    }

    const storedCommunity = localStorage.getItem(
      "gateflow-selected-community",
    );

    if (storedCommunity) {
      router.replace(
        `/login?community=${encodeURIComponent(
          storedCommunity,
        )}`,
      );
    }
  }, [communitySlug, router]);

  function fillDemoCredentials(selectedRole: UserRole) {
    const credential = DEMO_CREDENTIALS.find(
      (item) => item.role === selectedRole,
    );

    setRole(selectedRole);
    setUsername(credential?.username ?? "");
    setPassword(credential?.password ?? "");
    setError("");
  }

  function handleRoleChange(selectedRole: UserRole) {
    setRole(selectedRole);
    setUsername("");
    setPassword("");
    setError("");
  }

  function handleLogin() {
    setError("");

    if (!community) {
      setError("Please select a valid community first.");
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError("Enter your username and password.");
      return;
    }

    const matchingCredential = DEMO_CREDENTIALS.find(
      (credential) =>
        credential.role === role &&
        credential.username.toLowerCase() ===
          username.trim().toLowerCase() &&
        credential.password === password,
    );

    if (!matchingCredential) {
      setError(
        "Those demo credentials do not match the selected role.",
      );
      return;
    }

    const demoSession = {
      role,
      username: matchingCredential.username,
      displayName: matchingCredential.displayName,
      communityId: community.id,
      communitySlug: community.slug,
      communityName: community.name,
      signedInAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "gateflow-selected-community",
      community.slug,
    );

    localStorage.setItem(
      "gateflow-selected-community-id",
      community.id,
    );

    localStorage.setItem(
      "gateflow-demo-session",
      JSON.stringify(demoSession),
    );

    localStorage.setItem(
      "gateflow-demo-role",
      role,
    );

    if (rememberMe) {
      localStorage.setItem(
        "gateflow-remember-user",
        "true",
      );
    } else {
      localStorage.removeItem(
        "gateflow-remember-user",
      );
    }

    router.push(ROLE_ROUTES[role]);
  }

  if (!community) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 font-bold text-slate-950">
            GF
          </div>

          <h1 className="mt-5 text-2xl font-semibold">
            Community not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            The selected community could not be loaded. Return
            to the homepage and choose one of the demo
            communities.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 w-full rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Select a community
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-6 text-white">
      <div className="mx-auto w-full max-w-md">
        <header className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <BackIcon />
            Communities
          </button>

          <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
            Demo Access
          </span>
        </header>

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <CommunityLogo community={community} />

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  Selected community
                </p>

                <h1 className="mt-2 text-xl font-semibold">
                  {community.name}
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  {community.location.displayLocation}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {community.tagline}
                </p>
              </div>
            </div>
          </div>

          <div
            className="h-1.5 w-full"
            style={{
              backgroundColor:
                community.branding.primaryColor,
            }}
          />
        </section>

        <section className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
            GateFlow login
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Welcome back
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Choose a demo role, then sign in using the
            credentials provided below.
          </p>
        </section>

        <section className="mt-7">
          <label
            htmlFor="role"
            className="text-sm font-semibold"
          >
            Account role
          </label>

          <div className="relative mt-2">
            <select
              id="role"
              value={role}
              onChange={(event) =>
                handleRoleChange(
                  event.target.value as UserRole,
                )
              }
              className="w-full appearance-none rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 pr-12 text-sm font-medium text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
            >
              {DEMO_CREDENTIALS.map((credential) => (
                <option
                  key={credential.role}
                  value={credential.role}
                >
                  {ROLE_LABELS[credential.role]}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              <ChevronDownIcon />
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-semibold"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              autoComplete="username"
              placeholder="Enter username"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              placeholder="Enter password"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
            />
          </div>
        </section>

        <div className="mt-4 flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
              className="h-4 w-4 rounded border-slate-600 bg-slate-900"
            />
            Remember me
          </label>

          <button
            type="button"
            onClick={() => fillDemoCredentials(role)}
            className="text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
          >
            Use demo login
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleLogin}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
        >
          Sign in to GateFlow
          <ArrowRightIcon />
        </button>

        <section className="mt-7 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Demo credentials
          </p>

          <div className="mt-3 space-y-3">
            {DEMO_CREDENTIALS.map((credential) => (
              <button
                key={credential.role}
                type="button"
                onClick={() =>
                  fillDemoCredentials(credential.role)
                }
                className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-3 text-left transition hover:border-slate-700"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {ROLE_LABELS[credential.role]}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {credential.username} /{" "}
                    {credential.password}
                  </p>
                </div>

                <span className="text-xs font-semibold text-emerald-300">
                  Fill
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function LoginPageLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 font-bold text-slate-950">
          GF
        </div>

        <p className="mt-5 text-sm font-semibold text-white">
          Loading your community…
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Preparing your secure GateFlow access.
        </p>
      </div>
    </main>
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
      className={`flex h-16 w-16 shrink-0 items-center justify-center border text-base font-bold text-white ${
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

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
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