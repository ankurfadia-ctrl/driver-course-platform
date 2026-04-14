import { BOATING_PRODUCT_CONFIG } from "@/lib/boating-config"
import {
  getBoatingStateOverlay,
  normalizeBoatingStateKey,
} from "@/lib/boating-state-overlays"
import { VIRGINIA_BOATING_CONFIG } from "@/lib/virginia-boating-config"

export type BoatingProductRegistryEntry = {
  stateCode: string
  stateSlug: string
  stateName: string
  productSlug: string
  productName: string
  siteTitle: string
  supportEmail: string
  certificateIssuerLine: string
  routeBase: string
  status: "planned" | "coming-soon" | "launch-ready"
  notes: string[]
}

function titleCaseState(stateSlug: string) {
  const trimmed = normalizeBoatingStateKey(stateSlug)

  if (!trimmed) {
    return "Boating"
  }

  return trimmed
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

function buildGenericBoatingEntry(stateSlug: string): BoatingProductRegistryEntry {
  const stateName = titleCaseState(stateSlug)
  const routeBase = `/${stateSlug}-boating`

  return {
    stateCode: stateSlug.slice(0, 2).toUpperCase(),
    stateSlug,
    stateName,
    productSlug: `${stateSlug}-boating`,
    productName: `${stateName} Boating Safety Course`,
    siteTitle: `${stateName} Boating Safety Course`,
    supportEmail: BOATING_PRODUCT_CONFIG.supportEmail,
    certificateIssuerLine: `${stateName} Boating Safety Course | Completion record issued through vadriverimprovementcourse.com`,
    routeBase,
    status: "planned",
    notes: [
      "This is a registry placeholder until the state-specific boating product is fully built.",
      "Route base, checkout handoff, and completion pages can be filled in without changing the shared plumbing.",
    ],
  }
}

function buildOverlayRegistryEntry(state: string): BoatingProductRegistryEntry | null {
  const overlay = getBoatingStateOverlay(state)

  if (!overlay?.routeBase) {
    return null
  }

  return {
    stateCode: overlay.stateCode,
    stateSlug: overlay.stateSlug,
    stateName: overlay.stateName,
    productSlug: overlay.productSlug,
    productName: overlay.siteTitle,
    siteTitle: overlay.siteTitle,
    supportEmail: BOATING_PRODUCT_CONFIG.supportEmail,
    certificateIssuerLine: `${overlay.siteTitle} | Completion record issued through vadriverimprovementcourse.com`,
    routeBase: overlay.routeBase,
    status: "coming-soon",
    notes: overlay.nextBuildSteps,
  }
}

const SOUTH_CAROLINA_BOATING_REGISTRY_ENTRY =
  buildOverlayRegistryEntry("south-carolina")
const OHIO_BOATING_REGISTRY_ENTRY = buildOverlayRegistryEntry("ohio")
const OKLAHOMA_BOATING_REGISTRY_ENTRY = buildOverlayRegistryEntry("oklahoma")
const KENTUCKY_BOATING_REGISTRY_ENTRY = buildOverlayRegistryEntry("kentucky")
const WEST_VIRGINIA_BOATING_REGISTRY_ENTRY =
  buildOverlayRegistryEntry("west-virginia")

const BOATING_PRODUCT_REGISTRY: Record<string, BoatingProductRegistryEntry> = {
  virginia: {
    stateCode: "VA",
    stateSlug: VIRGINIA_BOATING_CONFIG.stateSlug,
    stateName: "Virginia",
    productSlug: VIRGINIA_BOATING_CONFIG.productSlug,
    productName: VIRGINIA_BOATING_CONFIG.productName,
    siteTitle: VIRGINIA_BOATING_CONFIG.siteTitle,
    supportEmail: VIRGINIA_BOATING_CONFIG.supportEmail,
    certificateIssuerLine:
      "Virginia Boating Safety Course | Completion record issued through vadriverimprovementcourse.com",
    routeBase: "/virginia-boating",
    status: "launch-ready",
    notes: [
      "Virginia is the first live boating product surface.",
      "Checkout, dashboard, learn, exam, and certificate pages already exist under the Virginia boating route.",
    ],
  },
  ...(SOUTH_CAROLINA_BOATING_REGISTRY_ENTRY
    ? { "south-carolina": SOUTH_CAROLINA_BOATING_REGISTRY_ENTRY }
    : {}),
  ...(OHIO_BOATING_REGISTRY_ENTRY ? { ohio: OHIO_BOATING_REGISTRY_ENTRY } : {}),
  ...(OKLAHOMA_BOATING_REGISTRY_ENTRY
    ? { oklahoma: OKLAHOMA_BOATING_REGISTRY_ENTRY }
    : {}),
  ...(KENTUCKY_BOATING_REGISTRY_ENTRY
    ? { kentucky: KENTUCKY_BOATING_REGISTRY_ENTRY }
    : {}),
  ...(WEST_VIRGINIA_BOATING_REGISTRY_ENTRY
    ? { "west-virginia": WEST_VIRGINIA_BOATING_REGISTRY_ENTRY }
    : {}),
  florida: {
    stateCode: "FL",
    stateSlug: "florida",
    stateName: "Florida",
    productSlug: "florida-boating",
    productName: "Florida Boating Safety Course",
    siteTitle: "Florida Boating Safety Course",
    supportEmail: BOATING_PRODUCT_CONFIG.supportEmail,
    certificateIssuerLine:
      "Florida Boating Safety Course | Completion record issued through vadriverimprovementcourse.com",
    routeBase: "/florida-boating",
    status: "planned",
    notes: [
      "Placeholder registry entry for the next boating market after Virginia.",
      "Use this route base when Florida boating pages and checkout flow are ready.",
    ],
  },
  texas: {
    stateCode: "TX",
    stateSlug: "texas",
    stateName: "Texas",
    productSlug: "texas-boating",
    productName: "Texas Boating Safety Course",
    siteTitle: "Texas Boating Safety Course",
    supportEmail: BOATING_PRODUCT_CONFIG.supportEmail,
    certificateIssuerLine:
      "Texas Boating Safety Course | Completion record issued through vadriverimprovementcourse.com",
    routeBase: "/texas-boating",
    status: "planned",
    notes: [
      "Placeholder registry entry for the next boating market after Florida.",
      "Use this route base when Texas boating pages and checkout flow are ready.",
    ],
  },
  "north-carolina": {
    stateCode: "NC",
    stateSlug: "north-carolina",
    stateName: "North Carolina",
    productSlug: "north-carolina-boating",
    productName: "North Carolina Boating Safety Course",
    siteTitle: "North Carolina Boating Safety Course",
    supportEmail: BOATING_PRODUCT_CONFIG.supportEmail,
    certificateIssuerLine:
      "North Carolina Boating Safety Course | Completion record issued through vadriverimprovementcourse.com",
    routeBase: "/north-carolina-boating",
    status: "coming-soon",
    notes: [
      "Placeholder registry entry for a later boating market.",
      "Keep the route base ready so the shared checkout plumbing does not need another special case.",
    ],
  },
}

export function getBoatingProductRegistryEntry(
  stateCode: string
): BoatingProductRegistryEntry | null {
  const normalizedState = normalizeBoatingStateKey(stateCode)

  return BOATING_PRODUCT_REGISTRY[normalizedState] ?? null
}

export function getBoatingProductRegistryFallback(
  stateCode: string
): BoatingProductRegistryEntry {
  const normalizedState = normalizeBoatingStateKey(stateCode)
  const knownEntry = getBoatingProductRegistryEntry(normalizedState)

  if (knownEntry) {
    return knownEntry
  }

  return buildGenericBoatingEntry(normalizedState)
}

export function getBoatingProductRouteBase(stateCode: string) {
  return getBoatingProductRegistryFallback(stateCode).routeBase
}
