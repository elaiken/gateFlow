export const USER_ROLES = {
    RESIDENT: "resident",
    SECURITY_GUARD: "security_guard",
    HEAD_OF_SECURITY: "head_of_security",
    COMMUNITY_MANAGER: "community_manager",
    SUPER_ADMIN: "super_admin",
  } as const;

  export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

  export const PERMISSIONS = {
    CREATE_PASS: "create_pass",
    VIEW_OWN_PASSES: "view_own_passes",
    REVOKE_OWN_PASS: "revoke_own_pass",
    MANAGE_TRUSTED_VISITORS: "manage_trusted_visitors",

    SCAN_PASS: "scan_pass",
    VIEW_ACTIVE_PASSES: "view_active_passes",
    RECORD_ENTRY: "record_entry",
    RECORD_EXIT: "record_exit",

    VIEW_ALL_PASSES: "view_all_passes",
    VIEW_AUDIT_LOGS: "view_audit_logs",
    MANAGE_INCIDENTS: "manage_incidents",
    REVOKE_ANY_PASS: "revoke_any_pass",
    VIEW_SECURITY_ANALYTICS: "view_security_analytics",

    MANAGE_RESIDENTS: "manage_residents",
    MANAGE_STAFF: "manage_staff",
    VIEW_COMMUNITY_REPORTS: "view_community_reports",
    MANAGE_COMMUNITY_SETTINGS: "manage_community_settings",
    MANAGE_COMMUNITY_BRANDING: "manage_community_branding",

    MANAGE_COMMUNITIES: "manage_communities",
    VIEW_PLATFORM_HEALTH: "view_platform_health",
    MANAGE_SUBSCRIPTIONS: "manage_subscriptions",
    MANAGE_PLATFORM_ADMINS: "manage_platform_admins",
  } as const;

  export type Permission =
    (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

  export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
    [USER_ROLES.RESIDENT]: [
      PERMISSIONS.CREATE_PASS,
      PERMISSIONS.VIEW_OWN_PASSES,
      PERMISSIONS.REVOKE_OWN_PASS,
      PERMISSIONS.MANAGE_TRUSTED_VISITORS,
    ],

    [USER_ROLES.SECURITY_GUARD]: [
      PERMISSIONS.SCAN_PASS,
      PERMISSIONS.VIEW_ACTIVE_PASSES,
      PERMISSIONS.RECORD_ENTRY,
      PERMISSIONS.RECORD_EXIT,
    ],

    [USER_ROLES.HEAD_OF_SECURITY]: [
      PERMISSIONS.SCAN_PASS,
      PERMISSIONS.VIEW_ACTIVE_PASSES,
      PERMISSIONS.RECORD_ENTRY,
      PERMISSIONS.RECORD_EXIT,
      PERMISSIONS.VIEW_ALL_PASSES,
      PERMISSIONS.VIEW_AUDIT_LOGS,
      PERMISSIONS.MANAGE_INCIDENTS,
      PERMISSIONS.REVOKE_ANY_PASS,
      PERMISSIONS.VIEW_SECURITY_ANALYTICS,
    ],

    [USER_ROLES.COMMUNITY_MANAGER]: [
      PERMISSIONS.VIEW_ALL_PASSES,
      PERMISSIONS.VIEW_AUDIT_LOGS,
      PERMISSIONS.MANAGE_INCIDENTS,
      PERMISSIONS.REVOKE_ANY_PASS,
      PERMISSIONS.VIEW_SECURITY_ANALYTICS,
      PERMISSIONS.MANAGE_RESIDENTS,
      PERMISSIONS.MANAGE_STAFF,
      PERMISSIONS.VIEW_COMMUNITY_REPORTS,
      PERMISSIONS.MANAGE_COMMUNITY_SETTINGS,
      PERMISSIONS.MANAGE_COMMUNITY_BRANDING,
    ],

    [USER_ROLES.SUPER_ADMIN]: [
      PERMISSIONS.MANAGE_COMMUNITIES,
      PERMISSIONS.VIEW_PLATFORM_HEALTH,
      PERMISSIONS.MANAGE_SUBSCRIPTIONS,
      PERMISSIONS.MANAGE_PLATFORM_ADMINS,
    ],
  };

  export const ROLE_LABELS: Record<UserRole, string> = {
    [USER_ROLES.RESIDENT]: "Resident",
    [USER_ROLES.SECURITY_GUARD]: "Security Guard",
    [USER_ROLES.HEAD_OF_SECURITY]: "Head of Security",
    [USER_ROLES.COMMUNITY_MANAGER]: "Community Manager",
    [USER_ROLES.SUPER_ADMIN]: "GateFlow Administrator",
  };

  export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
    [USER_ROLES.RESIDENT]:
      "Create and manage personal visitor access passes.",

    [USER_ROLES.SECURITY_GUARD]:
      "Verify visitors, scan passes, and record gate activity.",

    [USER_ROLES.HEAD_OF_SECURITY]:
      "Monitor security operations, incidents, and audit records.",

    [USER_ROLES.COMMUNITY_MANAGER]:
      "Manage residents, staff, reports, branding, and community settings.",

    [USER_ROLES.SUPER_ADMIN]:
      "Manage communities, subscriptions, platform access, and system health.",
  };

  export const ROLE_ROUTES: Record<UserRole, string> = {
    [USER_ROLES.RESIDENT]: "/",
    [USER_ROLES.SECURITY_GUARD]: "/guard/dashboard",
    [USER_ROLES.HEAD_OF_SECURITY]: "/security/dashboard",
    [USER_ROLES.COMMUNITY_MANAGER]: "/admin/dashboard",
    [USER_ROLES.SUPER_ADMIN]: "/super-admin/dashboard",
  };

  export function isUserRole(value: string): value is UserRole {
    return Object.values(USER_ROLES).includes(value as UserRole);
  }

  export function getRolePermissions(role: UserRole): readonly Permission[] {
    return ROLE_PERMISSIONS[role];
  }

  export function hasPermission(
    role: UserRole,
    permission: Permission,
  ): boolean {
    return ROLE_PERMISSIONS[role].includes(permission);
  }

  export function getRoleRoute(role: UserRole): string {
    return ROLE_ROUTES[role];
  }