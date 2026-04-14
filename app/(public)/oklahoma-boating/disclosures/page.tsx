import type { Metadata } from "next"
import BoatingStateDisclosuresPage from "@/components/boating-state-disclosures-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "oklahoma",
  "Boating Course Information",
  "/disclosures",
  "Oklahoma boating course information covering scope rules, proof language, and launch-state disclosures."
)

export default function OklahomaBoatingDisclosuresRoute() {
  return <BoatingStateDisclosuresPage stateSlug="oklahoma" />
}
