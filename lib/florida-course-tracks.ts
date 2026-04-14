import { getCourseConfig, type StateCourseTrack } from "@/lib/course-config"
import {
  FLORIDA_BDI_EXAM_CONTROLS,
  FLORIDA_BDI_MODULES,
  FLORIDA_BDI_TOPIC_MATRIX,
} from "@/lib/florida-bdi-course-content"
import { FLORIDA_TLSAE_MODULES } from "@/lib/florida-tlsae-course-content"

export type FloridaTrackCode =
  | "fl-bdi"
  | "fl-adi"
  | "fl-tlsae"
  | "fl-mature-driver"

export type FloridaTrackPreviewMetric = {
  label: string
  value: string
}

export type FloridaTrackPreview = {
  code: FloridaTrackCode
  route: string
  shortLabel: string
  name: string
  audience: string
  status: StateCourseTrack["status"]
  statusLabel: string
  summary: string
  buildFocus: string
  highlights: string[]
  metrics: FloridaTrackPreviewMetric[]
  ctaLabel: string
}

const TRACK_ROUTES: Record<FloridaTrackCode, string> = {
  "fl-bdi": "/florida-bdi",
  "fl-adi": "/florida-adi",
  "fl-tlsae": "/florida-tlsae",
  "fl-mature-driver": "/florida-mature-driver",
}

function formatStatusLabel(status: StateCourseTrack["status"]) {
  return status.replace(/-/g, " ")
}

function buildTrackPreview(track: StateCourseTrack): FloridaTrackPreview | null {
  const code = track.code as FloridaTrackCode

  if (code === "fl-bdi") {
    return {
      code,
      route: TRACK_ROUTES[code],
      shortLabel: "BDI",
      name: track.name,
      audience: track.audience,
      status: track.status,
      statusLabel: formatStatusLabel(track.status),
      summary:
        "Florida BDI is the main Florida driver-improvement course for many adult drivers and is expected to open first.",
      buildFocus:
        "Finish the BDI packet, preserve page-frozen script references, and keep BDI as the template for the other Florida tracks.",
      highlights: [
        "Forms confirmed current by FLHSMV on March 31, 2026.",
        "Miami-Dade County selected as the pilot jurisdiction.",
        "Reviewer packet and page-frozen topic matrix already exist for BDI.",
      ],
      metrics: [
        { label: "Modules", value: String(FLORIDA_BDI_MODULES.length) },
        { label: "Mapped topics", value: String(FLORIDA_BDI_TOPIC_MATRIX.length) },
        {
          label: "Question bank target",
          value: String(FLORIDA_BDI_EXAM_CONTROLS.questionBankSize),
        },
      ],
      ctaLabel: "View BDI details",
    }
  }

  if (code === "fl-adi") {
    return {
      code,
      route: TRACK_ROUTES[code],
      shortLabel: "ADI",
      name: track.name,
      audience: track.audience,
      status: track.status,
      statusLabel: formatStatusLabel(track.status),
      summary:
        "Florida ADI is for drivers who need the advanced course and is expected to follow after the first Florida course opens.",
      buildFocus:
        "Stabilize the shared Florida course-type plumbing, then map ADI content and packet materials into their own approval packet.",
      highlights: [
        "Separate Florida approval packet required for ADI.",
        "Best built on top of the BDI course-type and support scaffolding.",
        "Good fit for the next runtime build after the BDI packet is frozen.",
      ],
      metrics: [
        { label: "Build sequence", value: "Second" },
        { label: "Packet status", value: formatStatusLabel(track.status) },
        { label: "Shared runtime", value: "Planned after BDI" },
      ],
      ctaLabel: "View ADI details",
    }
  }

  if (code === "fl-tlsae") {
    return {
      code,
      route: TRACK_ROUTES[code],
      shortLabel: "TLSAE",
      name: track.name,
      audience: track.audience,
      status: track.status,
      statusLabel: formatStatusLabel(track.status),
      summary:
        "Florida TLSAE is the pre-licensing course for new drivers and will have its own information page and enrollment details.",
      buildFocus:
        "Turn the TLSAE outline into a page-frozen script and a separate Florida packet once BDI and ADI scaffolding are stable.",
      highlights: [
        "Different student journey from BDI and ADI because TLSAE is pre-licensing.",
        "Module outline exists in the Florida source set already.",
        "Needs its own packet, completion story, and launch disclosures.",
      ],
      metrics: [
        { label: "Outline modules", value: String(FLORIDA_TLSAE_MODULES.length) },
        { label: "Statutory basis", value: "s. 322.095, F.S." },
        { label: "Packet status", value: formatStatusLabel(track.status) },
      ],
      ctaLabel: "View TLSAE details",
    }
  }

  if (code === "fl-mature-driver") {
    return {
      code,
      route: TRACK_ROUTES[code],
      shortLabel: "Mature",
      name: track.name,
      audience: track.audience,
      status: track.status,
      statusLabel: formatStatusLabel(track.status),
      summary:
        "Florida Mature Driver is designed for insurance-discount students and will be offered separately from the other Florida courses.",
      buildFocus:
        "Define insurer-facing outcomes, mature-driver user flow, and packet materials after the BDI, ADI, and TLSAE lanes are organized.",
      highlights: [
        "Senior Driver technology-delivery forms are already in hand.",
        "Separate product language is needed because the student and buyer are different.",
        "Best treated as a fourth Florida line after the first three are stable.",
      ],
      metrics: [
        { label: "Build sequence", value: "Fourth" },
        { label: "Primary outcome", value: "Insurance discount" },
        { label: "Packet status", value: formatStatusLabel(track.status) },
      ],
      ctaLabel: "View Mature Driver details",
    }
  }

  return null
}

export function getFloridaTrackPreviews() {
  const tracks = getCourseConfig("florida").courseTracks ?? []

  return tracks
    .map((track) => buildTrackPreview(track))
    .filter((track): track is FloridaTrackPreview => track !== null)
}

export function getFloridaTrackPreview(trackCode: string) {
  return getFloridaTrackPreviews().find((track) => track.code === trackCode) ?? null
}

export function getFloridaTrackRoute(trackCode: string) {
  return TRACK_ROUTES[trackCode as FloridaTrackCode] ?? "/florida"
}
