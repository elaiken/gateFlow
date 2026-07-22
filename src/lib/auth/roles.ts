export const USER_ROLES = {
    RESIDENT: "resident",
    SECURITY_GUARD: "security_guard",
    COMMUNITY_MANAGER: "community_manager",
    GATEFLOW_ADMIN: "gateflow_admin",
  } as const;

  export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

  export const PERMISSIONS = {
    CREATE_PASS: "create_pass",
    VIEW_OWN_PASSES: "view_own_passes",
    REVOKE_OWN_PASS: "revoke_own_pass",
    MANAGE_TRUSTED_VISITORS: "manage_trusted_visitors",

    SCAN_PASS: "scan_pass",
    VIEW_ACTIVE_PASSES: "view_active_passes",
    VIEW_ALL_PASSES: "view_all_passes",
    RECORD_ENTRY: "record_entry",
    RECORD_EXIT: "record_exit",
    VIEW_AUDIT_LOGS: "view_audit_logs",
    MANAGE_INCIDENTS: "manage_incidents",
    REVOKE_ANY_PASS: "revoke_any_pass",
    VIEW_SECURITY_ANALYTICS: "view_security_analytics",

    MANAGE_RESIDENTS: "manage_residents",
    MANAGE_EMPLOYEES: "manage_employees",
    CREATE_EMPLOYEE_CREDENTIALS: "create_employee_credentials",
    VIEW_COMMUNITY_REPORTS: "view_community_reports",
    MANAGE_COMMUNITY_SETTINGS: "manage_community_settings",
    MANAGE_COMMUNITY_BRANDING: "manage_community_branding",

    MANAGE_COMMUNITIES: "manage_communities",
    VIEW_PLATFORM_HEALTH: "view_platform_health",
    MANAGE_PLATFORM_CONFIGURATION: "manage_platform_configuration",
    MANAGE_DEPLOYMENTS: "manage_deployments",
    ACCESS_DEVELOPER_TOOLS: "access_developer_tools",
    MANAGE_GATEFLOW_ADMINS: "manage_gateflow_admins",
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
      PERMISSIONS.VIEW_ALL_PASSES,
      PERMISSIONS.RECORD_ENTRY,
      PERMISSIONS.RECORD_EXIT,
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
      PERMISSIONS.MANAGE_EMPLOYEES,
      PERMISSIONS.CREATE_EMPLOYEE_CREDENTIALS,
      PERMISSIONS.VIEW_COMMUNITY_REPORTS,
      PERMISSIONS.MANAGE_COMMUNITY_SETTINGS,
      PERMISSIONS.MANAGE_COMMUNITY_BRANDING,
    ],

    [USER_ROLES.GATEFLOW_ADMIN]: [
      PERMISSIONS.MANAGE_COMMUNITIES,
      PERMISSIONS.VIEW_PLATFORM_HEALTH,
      PERMISSIONS.MANAGE_PLATFORM_CONFIGURATION,
      PERMISSIONS.MANAGE_DEPLOYMENTS,
      PERMISSIONS.ACCESS_DEVELOPER_TOOLS,
      PERMISSIONS.MANAGE_GATEFLOW_ADMINS,
    ],
  };

  export const ROLE_LABELS: Record<UserRole, string> = {
    [USER_ROLES.RESIDENT]: "Resident",
    [USER_ROLES.SECURITY_GUARD]: "Security Guard",
    [USER_ROLES.COMMUNITY_MANAGER]: "Community Manager",
    [USER_ROLES.GATEFLOW_ADMIN]: "GateFlow Admin",
  };

  export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
    [USER_ROLES.RESIDENT]:
      "Create visitor passes and manage personal community access.",

    [USER_ROLES.SECURITY_GUARD]:
      "Validate passes, monitor security activity, and manage gate access.",

    [USER_ROLES.COMMUNITY_MANAGER]:
      "Manage residents, employees, reports, branding, and community settings.",

    [USER_ROLES.GATEFLOW_ADMIN]:
      "Maintain the GateFlow platform, communities, deployments, and developer tools.",
  };

  export const ROLE_ROUTES: Record<UserRole, string> = {
    [USER_ROLES.RESIDENT]: "/resident/dashboard",
    [USER_ROLES.SECURITY_GUARD]: "/security/dashboard",
    [USER_ROLES.COMMUNITY_MANAGER]: "/admin/dashboard",
    [USER_ROLES.GATEFLOW_ADMIN]: "/gateflow-admin/dashboard",
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