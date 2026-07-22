export type CommunityStatus =
  | "active"
  | "maintenance"
  | "inactive";

export type CommunityCategory =
  | "apartment"
  | "townhome"
  | "active_adult";

export type LogoShape =
  | "rounded"
  | "circle"
  | "shield"
  | "arch";

export type CommunityAmenity = {
  id: string;
  name: string;
  description: string;
};

export type CommunityGate = {
  id: string;
  name: string;
  gateType: "main" | "resident" | "service" | "emergency";
  status: "open" | "closed" | "maintenance";
  visitorAccess: boolean;
  guardAssigned: boolean;
};

export type Community = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  tagline: string;
  category: CommunityCategory;
  status: CommunityStatus;

  location: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    displayLocation: string;
  };

  branding: {
    logoText: string;
    logoShape: LogoShape;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    tagline: string;
  };

  contact: {
    officePhone: string;
    securityPhone: string;
    officeEmail: string;
    website: string;
  };

  property: {
    propertyType: string;
    totalUnits: number;
    occupiedUnits: number;
    entrances: number;
    visitorLanes: number;
    residentLanes: number;
    parkingSpaces: number;
    yearBuilt: number;
  };

  accessPolicy: {
    guestPassMaximumDays: number;
    contractorStartTime: string;
    contractorEndTime: string;
    overnightGuestApprovalRequired: boolean;
    photoIdentificationRequired: boolean;
    residentConfirmationRequired: boolean;
    deliveryDriverPassRequired: boolean;
    recurringGuestPassesAllowed: boolean;
    maximumRecurringPassDays: number;
  };

  demoMetrics: {
    activePasses: number;
    visitorsToday: number;
    entriesToday: number;
    deniedEntriesToday: number;
    deliveriesToday: number;
    contractorsOnProperty: number;
    residentsCurrentlyHome: number;
    averageWaitMinutes: number;
    approvalRate: number;
    openIncidents: number;
  };

  gates: CommunityGate[];
  amenities: CommunityAmenity[];
};

export const DEMO_COMMUNITIES: Community[] = [
  {
    id: "community-solara-bay",
    slug: "solara-bay-apartments",
    name: "Solara Bay Apartments",
    shortName: "Solara Bay",
    initials: "SB",
    tagline: "Coastal living, securely connected.",
    category: "apartment",
    status: "active",

    location: {
      address: "1800 Harbor Light Drive",
      city: "Fort Lauderdale",
      state: "FL",
      postalCode: "33301",
      displayLocation: "Fort Lauderdale, Florida",
    },

    branding: {
      logoText: "SB",
      logoShape: "circle",
      primaryColor: "#0F766E",
      secondaryColor: "#14B8A6",
      accentColor: "#F59E0B",
      backgroundColor: "#ECFEFF",
      tagline: "Coastal living, securely connected.",
    },

    contact: {
      officePhone: "(954) 555-0142",
      securityPhone: "(954) 555-0188",
      officeEmail: "office@solarabay.demo",
      website: "solarabay.demo",
    },

    property: {
      propertyType: "Luxury Apartment Community",
      totalUnits: 326,
      occupiedUnits: 301,
      entrances: 3,
      visitorLanes: 1,
      residentLanes: 2,
      parkingSpaces: 472,
      yearBuilt: 2022,
    },

    accessPolicy: {
      guestPassMaximumDays: 7,
      contractorStartTime: "07:00",
      contractorEndTime: "19:00",
      overnightGuestApprovalRequired: true,
      photoIdentificationRequired: true,
      residentConfirmationRequired: false,
      deliveryDriverPassRequired: false,
      recurringGuestPassesAllowed: true,
      maximumRecurringPassDays: 30,
    },

    demoMetrics: {
      activePasses: 47,
      visitorsToday: 86,
      entriesToday: 214,
      deniedEntriesToday: 5,
      deliveriesToday: 64,
      contractorsOnProperty: 12,
      residentsCurrentlyHome: 438,
      averageWaitMinutes: 2.1,
      approvalRate: 97.7,
      openIncidents: 2,
    },

    gates: [
      {
        id: "solara-main-gate",
        name: "Harbor Main Entrance",
        gateType: "main",
        status: "open",
        visitorAccess: true,
        guardAssigned: true,
      },
      {
        id: "solara-resident-gate",
        name: "East Resident Entrance",
        gateType: "resident",
        status: "open",
        visitorAccess: false,
        guardAssigned: false,
      },
      {
        id: "solara-service-gate",
        name: "Service and Delivery Entrance",
        gateType: "service",
        status: "open",
        visitorAccess: true,
        guardAssigned: false,
      },
    ],

    amenities: [
      {
        id: "solara-pool",
        name: "Resort Pool",
        description: "Pool deck with resident and approved guest access.",
      },
      {
        id: "solara-fitness",
        name: "Fitness Studio",
        description: "Twenty-four-hour resident fitness center.",
      },
      {
        id: "solara-marina",
        name: "Harbor Walk",
        description: "Private waterfront walking and relaxation area.",
      },
    ],
  },

  {
    id: "community-palm-haven",
    slug: "palm-haven-residences",
    name: "Palm Haven Residences",
    shortName: "Palm Haven",
    initials: "PH",
    tagline: "A welcoming place to call home.",
    category: "apartment",
    status: "active",

    location: {
      address: "4250 Palmetto Grove Boulevard",
      city: "Boca Raton",
      state: "FL",
      postalCode: "33431",
      displayLocation: "Boca Raton, Florida",
    },

    branding: {
      logoText: "PH",
      logoShape: "rounded",
      primaryColor: "#1D4ED8",
      secondaryColor: "#60A5FA",
      accentColor: "#F97316",
      backgroundColor: "#EFF6FF",
      tagline: "A welcoming place to call home.",
    },

    contact: {
      officePhone: "(561) 555-0116",
      securityPhone: "(561) 555-0194",
      officeEmail: "management@palmhaven.demo",
      website: "palmhaven.demo",
    },

    property: {
      propertyType: "Family Apartment Community",
      totalUnits: 484,
      occupiedUnits: 451,
      entrances: 4,
      visitorLanes: 2,
      residentLanes: 2,
      parkingSpaces: 708,
      yearBuilt: 2018,
    },

    accessPolicy: {
      guestPassMaximumDays: 14,
      contractorStartTime: "08:00",
      contractorEndTime: "18:00",
      overnightGuestApprovalRequired: false,
      photoIdentificationRequired: true,
      residentConfirmationRequired: true,
      deliveryDriverPassRequired: false,
      recurringGuestPassesAllowed: true,
      maximumRecurringPassDays: 60,
    },

    demoMetrics: {
      activePasses: 73,
      visitorsToday: 124,
      entriesToday: 318,
      deniedEntriesToday: 9,
      deliveriesToday: 91,
      contractorsOnProperty: 17,
      residentsCurrentlyHome: 692,
      averageWaitMinutes: 3.4,
      approvalRate: 96.1,
      openIncidents: 4,
    },

    gates: [
      {
        id: "palm-haven-north-gate",
        name: "North Main Entrance",
        gateType: "main",
        status: "open",
        visitorAccess: true,
        guardAssigned: true,
      },
      {
        id: "palm-haven-south-gate",
        name: "South Main Entrance",
        gateType: "main",
        status: "open",
        visitorAccess: true,
        guardAssigned: true,
      },
      {
        id: "palm-haven-resident-gate",
        name: "Resident Access Lane",
        gateType: "resident",
        status: "open",
        visitorAccess: false,
        guardAssigned: false,
      },
      {
        id: "palm-haven-service-gate",
        name: "Maintenance Entrance",
        gateType: "service",
        status: "maintenance",
        visitorAccess: false,
        guardAssigned: false,
      },
    ],

    amenities: [
      {
        id: "palm-haven-clubhouse",
        name: "Community Clubhouse",
        description: "Resident events, meetings, and private reservations.",
      },
      {
        id: "palm-haven-playground",
        name: "Family Recreation Park",
        description: "Playground and outdoor recreation space.",
      },
      {
        id: "palm-haven-courts",
        name: "Sports Courts",
        description: "Basketball and multipurpose recreation courts.",
      },
    ],
  },

  {
    id: "community-cypress-gate",
    slug: "cypress-gate-townhomes",
    name: "Cypress Gate Townhomes",
    shortName: "Cypress Gate",
    initials: "CG",
    tagline: "Private streets. Connected neighbors.",
    category: "townhome",
    status: "active",

    location: {
      address: "7600 Cypress Preserve Way",
      city: "Deerfield Beach",
      state: "FL",
      postalCode: "33442",
      displayLocation: "Deerfield Beach, Florida",
    },

    branding: {
      logoText: "CG",
      logoShape: "shield",
      primaryColor: "#166534",
      secondaryColor: "#4D7C0F",
      accentColor: "#D4A72C",
      backgroundColor: "#F0FDF4",
      tagline: "Private streets. Connected neighbors.",
    },

    contact: {
      officePhone: "(954) 555-0167",
      securityPhone: "(954) 555-0123",
      officeEmail: "hoa@cypressgate.demo",
      website: "cypressgate.demo",
    },

    property: {
      propertyType: "Townhome and Single-Family Community",
      totalUnits: 248,
      occupiedUnits: 235,
      entrances: 2,
      visitorLanes: 1,
      residentLanes: 2,
      parkingSpaces: 612,
      yearBuilt: 2012,
    },

    accessPolicy: {
      guestPassMaximumDays: 10,
      contractorStartTime: "07:30",
      contractorEndTime: "18:00",
      overnightGuestApprovalRequired: true,
      photoIdentificationRequired: true,
      residentConfirmationRequired: false,
      deliveryDriverPassRequired: false,
      recurringGuestPassesAllowed: true,
      maximumRecurringPassDays: 90,
    },

    demoMetrics: {
      activePasses: 34,
      visitorsToday: 67,
      entriesToday: 143,
      deniedEntriesToday: 4,
      deliveriesToday: 38,
      contractorsOnProperty: 9,
      residentsCurrentlyHome: 386,
      averageWaitMinutes: 2.4,
      approvalRate: 97.2,
      openIncidents: 1,
    },

    gates: [
      {
        id: "cypress-main-gate",
        name: "Cypress Preserve Main Gate",
        gateType: "main",
        status: "open",
        visitorAccess: true,
        guardAssigned: true,
      },
      {
        id: "cypress-resident-gate",
        name: "West Resident Gate",
        gateType: "resident",
        status: "open",
        visitorAccess: false,
        guardAssigned: false,
      },
    ],

    amenities: [
      {
        id: "cypress-clubhouse",
        name: "Cypress Clubhouse",
        description: "HOA meetings, resident events, and rentals.",
      },
      {
        id: "cypress-pool",
        name: "Community Pool",
        description: "Resident pool with controlled guest access.",
      },
      {
        id: "cypress-trail",
        name: "Nature Trail",
        description: "Private community walking and bicycle trail.",
      },
    ],
  },

  {
    id: "community-golden-palms",
    slug: "golden-palms-55-plus",
    name: "Golden Palms 55+ Community",
    shortName: "Golden Palms",
    initials: "GP",
    tagline: "Active living with peace of mind.",
    category: "active_adult",
    status: "active",

    location: {
      address: "2100 Golden Palms Circle",
      city: "Delray Beach",
      state: "FL",
      postalCode: "33445",
      displayLocation: "Delray Beach, Florida",
    },

    branding: {
      logoText: "GP",
      logoShape: "arch",
      primaryColor: "#7C3AED",
      secondaryColor: "#A78BFA",
      accentColor: "#EAB308",
      backgroundColor: "#FAF5FF",
      tagline: "Active living with peace of mind.",
    },

    contact: {
      officePhone: "(561) 555-0175",
      securityPhone: "(561) 555-0138",
      officeEmail: "welcome@goldenpalms55.demo",
      website: "goldenpalms55.demo",
    },

    property: {
      propertyType: "Active Adult 55+ Community",
      totalUnits: 612,
      occupiedUnits: 589,
      entrances: 3,
      visitorLanes: 2,
      residentLanes: 2,
      parkingSpaces: 884,
      yearBuilt: 2004,
    },

    accessPolicy: {
      guestPassMaximumDays: 30,
      contractorStartTime: "08:00",
      contractorEndTime: "17:00",
      overnightGuestApprovalRequired: true,
      photoIdentificationRequired: true,
      residentConfirmationRequired: true,
      deliveryDriverPassRequired: false,
      recurringGuestPassesAllowed: true,
      maximumRecurringPassDays: 180,
    },

    demoMetrics: {
      activePasses: 58,
      visitorsToday: 92,
      entriesToday: 201,
      deniedEntriesToday: 3,
      deliveriesToday: 56,
      contractorsOnProperty: 11,
      residentsCurrentlyHome: 724,
      averageWaitMinutes: 2.8,
      approvalRate: 98.5,
      openIncidents: 1,
    },

    gates: [
      {
        id: "golden-palms-main-gate",
        name: "Golden Palms Main Entrance",
        gateType: "main",
        status: "open",
        visitorAccess: true,
        guardAssigned: true,
      },
      {
        id: "golden-palms-east-gate",
        name: "East Resident Entrance",
        gateType: "resident",
        status: "open",
        visitorAccess: false,
        guardAssigned: false,
      },
      {
        id: "golden-palms-service-gate",
        name: "Healthcare and Service Entrance",
        gateType: "service",
        status: "open",
        visitorAccess: true,
        guardAssigned: true,
      },
    ],

    amenities: [
      {
        id: "golden-palms-wellness",
        name: "Wellness Center",
        description:
          "Fitness, rehabilitation, and wellness programming for residents.",
      },
      {
        id: "golden-palms-clubhouse",
        name: "Grand Clubhouse",
        description:
          "Community events, dining, entertainment, and social activities.",
      },
      {
        id: "golden-palms-pickleball",
        name: "Pickleball Center",
        description:
          "Resident and approved guest pickleball facilities.",
      },
      {
        id: "golden-palms-shuttle",
        name: "Community Shuttle",
        description:
          "Scheduled transportation for shopping and medical appointments.",
      },
    ],
  },
];

export function getCommunityBySlug(
  slug: string,
): Community | undefined {
  return DEMO_COMMUNITIES.find(
    (community) => community.slug === slug,
  );
}

export function getCommunityById(
  id: string,
): Community | undefined {
  return DEMO_COMMUNITIES.find(
    (community) => community.id === id,
  );
}

export function getActiveCommunities(): Community[] {
  return DEMO_COMMUNITIES.filter(
    (community) => community.status === "active",
  );
}

export function getCommunityDisplayLocation(
  community: Community,
): string {
  return community.location.displayLocation;
}

export function getCommunityOccupancyRate(
  community: Community,
): number {
  return Number(
    (
      (community.property.occupiedUnits /
        community.property.totalUnits) *
      100
    ).toFixed(1),
  );
}