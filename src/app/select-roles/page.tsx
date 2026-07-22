"use client";

import { useRouter } from "next/navigation";
import {
  ROLE_DESCRIPTIONS,
  ROLE_LABELS,
  ROLE_ROUTES,
  USER_ROLES,
  type UserRole,
} from "@/lib/auth/roles";

const demoRoles: UserRole[] = [
  USER_ROLES.RESIDENT,
  USER_ROLES.SECURITY_GUARD,
  USER_ROLES.COMMUNITY_MANAGER,
  USER_ROLES.GATEFLOW_ADMIN,
];

const roleIcons: Record<UserRole, string> = {
  resident: "🏠",
  security_guard: "🛡️",
  community_manager: "🏢",
  gateflow_admin: "⚙️",
};

export default function SelectRolesPage() {
  const router = useRouter();

  function handleRoleSelection(role: UserRole) {
    localStorage.setItem("gateflow-demo-role", role);
    router.push(ROLE_ROUTES[role]);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-950 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-white shadow-sm">
            GF
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            GateFlow Demo
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Choose your role
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Explore GateFlow from the perspective of a resident, security
            guard, community manager, or GateFlow administrator.
          </p>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {demoRoles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleSelection(role)}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl transition group-hover:bg-slate-200">
                  {roleIcons[role]}
                </span>

                <span className="text-lg text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950">
                  →
                </span>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-950">
                {ROLE_LABELS[role]}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {ROLE_DESCRIPTIONS[role]}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Continue as {ROLE_LABELS[role]}
              </p>
            </button>
          ))}
        </section>

        <footer className="mt-8 text-center">
          <p className="text-xs leading-5 text-slate-500">
            Demo role selection is for presentation purposes. Production users
            will receive access based on their verified GateFlow account.
          </p>
        </footer>
      </div>
    </main>
  );
}