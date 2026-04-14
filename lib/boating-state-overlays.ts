import type { Metadata } from "next"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export type BoatingComplianceMotion =
  | "info-only"
  | "nasbla-friendly"
  | "state-approved"
  | "state-issued"

export type BoatingLaunchStateStatus =
  | "research"
  | "content-mapping"
  | "launch-ready"

export type BoatingOperationalFlags = {
  requiresStateApproval: boolean
  requiresStateCard: boolean
  requiresProctoredExam: boolean
  acceptsNasblaReciprocity: boolean
  residentVsNonresidentSplit: boolean
}

export type BoatingStateRoadmapEntry = {
  stateCode: string
  stateSlug: string
  stateName: string
  requirementSummary: string
  status: BoatingLaunchStateStatus
  priority: "now" | "next" | "later"
  marketMotion: BoatingComplianceMotion
  routeBase?: string
}

export type BoatingStateOverlay = BoatingStateRoadmapEntry & {
  productSlug: string
  siteTitle: string
  marketingDescription: string
  sectionLabel: string
  audience: string
  proofSummary: string
  officialSourceLabel: string
  officialSourceUrl: string
  launchHighlights: string[]
  nextBuildSteps: string[]
  flags: BoatingOperationalFlags
}

const BOATING_STATE_KEY_ALIASES: Record<string, string> = {
  florida: "florida",
  fl: "florida",
  virginia: "virginia",
  va: "virginia",
  texas: "texas",
  tx: "texas",
  "north-carolina": "north-carolina",
  nc: "north-carolina",
  "south-carolina": "south-carolina",
  sc: "south-carolina",
  ohio: "ohio",
  oh: "ohio",
  oklahoma: "oklahoma",
  ok: "oklahoma",
  kentucky: "kentucky",
  ky: "kentucky",
  "west-virginia": "west-virginia",
  wv: "west-virginia",
}

export function normalizeBoatingStateKey(state: string) {
  const normalized = String(state ?? "").trim().toLowerCase()

  return BOATING_STATE_KEY_ALIASES[normalized] ?? normalized
}

const BOATING_STATE_OVERLAYS: Record<string, BoatingStateOverlay> = {
  "south-carolina": {
    stateCode: "SC",
    stateSlug: "south-carolina",
    stateName: "South Carolina",
    requirementSummary:
      "South Carolina accepts a NASBLA-approved course for the standard boater certificate, which makes it one of the cleaner early launch states.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/south-carolina-boating",
    productSlug: "south-carolina-boating",
    siteTitle: "South Carolina Boating Safety Course",
    marketingDescription:
      "South Carolina boating safety launch overlay with NASBLA-friendly requirement notes, checkout guardrails, and state-specific build steps.",
    sectionLabel: "South Carolina Boating Launch",
    audience:
      "Best for operators who need a straightforward boating education certificate path without a separate state-issued exam workflow for the standard certificate.",
    proofSummary:
      "Primary compliance path: a NASBLA-approved boating safety course certificate for the standard South Carolina boater education requirement.",
    officialSourceLabel: "South Carolina DNR boater education",
    officialSourceUrl: "https://www.dnr.sc.gov/education/boated.html",
    launchHighlights: [
      "Good early market because the standard certificate path is NASBLA-friendly.",
      "Rental certification is a separate SCDNR-approved workflow and should stay out of the first launch.",
      "State overlay should focus on age and rule wording, proof language, and South Carolina disclosures rather than a custom exam workflow.",
    ],
    nextBuildSteps: [
      "Map South Carolina eligibility and operator-scope language into the shared boating disclosures.",
      "Set South Carolina certificate wording and post-purchase instructions.",
      "Keep rental-certificate claims off the checkout and marketing flow.",
    ],
    flags: {
      requiresStateApproval: false,
      requiresStateCard: false,
      requiresProctoredExam: false,
      acceptsNasblaReciprocity: true,
      residentVsNonresidentSplit: false,
    },
  },
  ohio: {
    stateCode: "OH",
    stateSlug: "ohio",
    stateName: "Ohio",
    requirementSummary:
      "Ohio accepts a NASBLA-approved course as the practical path for many powercraft operators, making it a strong early launch market.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/ohio-boating",
    productSlug: "ohio-boating",
    siteTitle: "Ohio Boating Safety Course",
    marketingDescription:
      "Ohio boating safety launch overlay with NASBLA-friendly proof rules, audience scope, and certificate build notes.",
    sectionLabel: "Ohio Boating Launch",
    audience:
      "Best for Ohio operators who need an accepted boating education certificate path without a separate proctored exam or state-issued card workflow.",
    proofSummary:
      "Primary compliance path: a NASBLA-approved boating education certificate for operators in scope under Ohio law.",
    officialSourceLabel: "Ohio Revised Code 1547.05",
    officialSourceUrl:
      "https://codes.ohio.gov/ohio-revised-code/section-section-1547.05",
    launchHighlights: [
      "Ohio is one of the cleaner mandatory powercraft states for an early NASBLA-aligned launch.",
      "The product can stay certificate-driven without a separate state exam or card handoff.",
      "Marketing should explain who is actually in scope so the course is not sold too broadly.",
    ],
    nextBuildSteps: [
      "Map Ohio operator-scope rules into the public disclosures and FAQ.",
      "Set Ohio completion-proof language and certificate labels.",
      "Build an Ohio-specific checkout page that avoids overclaiming a state-issued license.",
    ],
    flags: {
      requiresStateApproval: false,
      requiresStateCard: false,
      requiresProctoredExam: false,
      acceptsNasblaReciprocity: true,
      residentVsNonresidentSplit: false,
    },
  },
  oklahoma: {
    stateCode: "OK",
    stateSlug: "oklahoma",
    stateName: "Oklahoma",
    requirementSummary:
      "Oklahoma is mainly a younger-operator boating education market, and a NASBLA-approved course is the normal public path.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/oklahoma-boating",
    productSlug: "oklahoma-boating",
    siteTitle: "Oklahoma Boating Safety Course",
    marketingDescription:
      "Oklahoma boating safety launch overlay focused on youth-operator scope, certificate proof, and NASBLA-friendly compliance messaging.",
    sectionLabel: "Oklahoma Boating Launch",
    audience:
      "Best for Oklahoma families and younger operators who need a boating education certificate in one of the simplest early-launch states.",
    proofSummary:
      "Primary compliance path: a NASBLA-approved boating safety certificate for the Oklahoma operators who fall within the education rule.",
    officialSourceLabel: "Oklahoma DPS boating education",
    officialSourceUrl: "https://oklahoma.gov/dps/programs-services/boated.html",
    launchHighlights: [
      "Oklahoma keeps the approval path light enough to fit an early overlay launch.",
      "The real product risk is over-marketing to adults who are outside the mandatory scope.",
      "Certificate language and age-threshold explanation matter more than custom state workflow plumbing.",
    ],
    nextBuildSteps: [
      "Write Oklahoma-specific age and operator-scope disclosures.",
      "Keep marketing tightly focused on who actually needs the course.",
      "Set Oklahoma certificate wording and support scripts for eligibility questions.",
    ],
    flags: {
      requiresStateApproval: false,
      requiresStateCard: false,
      requiresProctoredExam: false,
      acceptsNasblaReciprocity: true,
      residentVsNonresidentSplit: false,
    },
  },
  kentucky: {
    stateCode: "KY",
    stateSlug: "kentucky",
    stateName: "Kentucky",
    requirementSummary:
      "Kentucky is a NASBLA-friendly youth-operator market where a certificate can satisfy the education rule without a heavy state-issued workflow.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/kentucky-boating",
    productSlug: "kentucky-boating",
    siteTitle: "Kentucky Boating Safety Course",
    marketingDescription:
      "Kentucky boating safety launch overlay focused on youth-operator rules, certificate proof, and early launch positioning.",
    sectionLabel: "Kentucky Boating Launch",
    audience:
      "Best for Kentucky teens and families who need an accepted boating education certificate without a separate proctored state exam flow.",
    proofSummary:
      "Primary compliance path: a Kentucky Safe Boating Certificate Card equivalent or a NASBLA-approved course certificate for operators ages 12-17 in scope.",
    officialSourceLabel: "Kentucky boating guide",
    officialSourceUrl: "https://fw.ky.gov/FishBoatGuide/pages/boating.aspx",
    launchHighlights: [
      "Kentucky is narrower than the all-ages states, but it is still a clean early-market overlay.",
      "The course should be marketed around youth operator compliance rather than a general boating license claim.",
      "Checkout and support copy should call out the age-based rule clearly.",
    ],
    nextBuildSteps: [
      "Build Kentucky age-scope disclosures into the product and support FAQ.",
      "Set Kentucky-specific certificate proof wording for youth operators.",
      "Keep the marketing narrowly aligned to the in-scope audience.",
    ],
    flags: {
      requiresStateApproval: false,
      requiresStateCard: false,
      requiresProctoredExam: false,
      acceptsNasblaReciprocity: true,
      residentVsNonresidentSplit: false,
    },
  },
  "west-virginia": {
    stateCode: "WV",
    stateSlug: "west-virginia",
    stateName: "West Virginia",
    requirementSummary:
      "West Virginia expressly accepts NASBLA-authorized instruction from this or any other state, making it one of the cleanest early launch targets.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/west-virginia-boating",
    productSlug: "west-virginia-boating",
    siteTitle: "West Virginia Boating Safety Course",
    marketingDescription:
      "West Virginia boating safety launch overlay with reciprocity-friendly proof rules, public disclosures, and state-specific build steps.",
    sectionLabel: "West Virginia Boating Launch",
    audience:
      "Best for West Virginia operators who need a certificate path in a state that expressly recognizes NASBLA-authorized instruction.",
    proofSummary:
      "Primary compliance path: NASBLA-authorized boating instruction accepted by West Virginia for operators in scope.",
    officialSourceLabel: "West Virginia boater education",
    officialSourceUrl: "https://wvdnr.gov/boater-education/",
    launchHighlights: [
      "West Virginia is a strong early state because the reciprocity language is unusually friendly.",
      "The state overlay can stay lean: scope rules, certificate proof wording, and clear support answers.",
      "This is a better early launch candidate than many larger states with state-issued card workflows.",
    ],
    nextBuildSteps: [
      "Map West Virginia operator-scope language into disclosures and FAQ.",
      "Set West Virginia certificate wording and student proof instructions.",
      "Use this state as a test case for reciprocity-friendly marketing language.",
    ],
    flags: {
      requiresStateApproval: false,
      requiresStateCard: false,
      requiresProctoredExam: false,
      acceptsNasblaReciprocity: true,
      residentVsNonresidentSplit: false,
    },
  },
}

export const BOATING_LAUNCH_ROADMAP: BoatingStateRoadmapEntry[] = [
  {
    stateCode: "SC",
    stateSlug: "south-carolina",
    stateName: "South Carolina",
    requirementSummary: BOATING_STATE_OVERLAYS["south-carolina"].requirementSummary,
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/south-carolina-boating",
  },
  {
    stateCode: "OH",
    stateSlug: "ohio",
    stateName: "Ohio",
    requirementSummary: BOATING_STATE_OVERLAYS.ohio.requirementSummary,
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/ohio-boating",
  },
  {
    stateCode: "OK",
    stateSlug: "oklahoma",
    stateName: "Oklahoma",
    requirementSummary: BOATING_STATE_OVERLAYS.oklahoma.requirementSummary,
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/oklahoma-boating",
  },
  {
    stateCode: "KY",
    stateSlug: "kentucky",
    stateName: "Kentucky",
    requirementSummary: BOATING_STATE_OVERLAYS.kentucky.requirementSummary,
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/kentucky-boating",
  },
  {
    stateCode: "WV",
    stateSlug: "west-virginia",
    stateName: "West Virginia",
    requirementSummary: BOATING_STATE_OVERLAYS["west-virginia"].requirementSummary,
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/west-virginia-boating",
  },
  {
    stateCode: "VA",
    stateSlug: "virginia",
    stateName: "Virginia",
    requirementSummary:
      "Brand overlap and existing product plumbing make Virginia the live reference build once the first overlay states validate the broader model.",
    status: "launch-ready",
    priority: "next",
    marketMotion: "state-approved",
    routeBase: "/virginia-boating",
  },
  {
    stateCode: "TX",
    stateSlug: "texas",
    stateName: "Texas",
    requirementSummary:
      "Large boating population and strong demand, but Texas should follow after the lower-friction launch states prove the funnel and certificate flow.",
    status: "research",
    priority: "next",
    marketMotion: "state-approved",
  },
  {
    stateCode: "FL",
    stateSlug: "florida",
    stateName: "Florida",
    requirementSummary:
      "Florida is a high-volume market, but the state-issued card workflow makes it better as a second-wave boating state.",
    status: "research",
    priority: "next",
    marketMotion: "state-issued",
  },
  {
    stateCode: "NC",
    stateSlug: "north-carolina",
    stateName: "North Carolina",
    requirementSummary:
      "North Carolina remains attractive, but it is better positioned after the lower-friction launch states and the Virginia reference build.",
    status: "research",
    priority: "later",
    marketMotion: "state-approved",
  },
]

export function getBoatingStateOverlay(state: string) {
  const normalized = normalizeBoatingStateKey(state)

  return BOATING_STATE_OVERLAYS[normalized] ?? null
}

export function getBoatingStateOverlays() {
  return Object.values(BOATING_STATE_OVERLAYS)
}

export function buildBoatingStateOverlayMetadata(
  state: string
): Metadata {
  const overlay = getBoatingStateOverlay(state)

  if (!overlay) {
    return {}
  }

  const baseUrl = getPublicBaseUrl()
  const pageUrl = `${baseUrl}${overlay.routeBase}`

  return {
    title: overlay.siteTitle,
    description: overlay.marketingDescription,
    alternates: {
      canonical: overlay.routeBase,
    },
    openGraph: {
      title: overlay.siteTitle,
      description: overlay.marketingDescription,
      url: pageUrl,
      siteName: "Boating Safety Course",
      images: [
        {
          url: `${baseUrl}/logo.svg`,
          width: 256,
          height: 256,
          alt: overlay.siteTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: overlay.siteTitle,
      description: overlay.marketingDescription,
      images: [`${baseUrl}/logo.svg`],
    },
  }
}

export function buildBoatingStateOverlaySubpageMetadata(
  state: string,
  titleSuffix: string,
  pathSuffix: string,
  description: string
): Metadata {
  const overlay = getBoatingStateOverlay(state)

  if (!overlay?.routeBase) {
    return {}
  }

  const baseUrl = getPublicBaseUrl()
  const pagePath = `${overlay.routeBase}${pathSuffix}`
  const pageUrl = `${baseUrl}${pagePath}`
  const title = `${overlay.stateName} ${titleSuffix}`

  return {
    title,
    description,
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Boating Safety Course",
      images: [
        {
          url: `${baseUrl}/logo.svg`,
          width: 256,
          height: 256,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${baseUrl}/logo.svg`],
    },
  }
}
