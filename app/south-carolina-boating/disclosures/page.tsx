import type { Metadata } from "next"
import BoatingStateDisclosuresPage from "@/components/boating-state-disclosures-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "south-carolina",
  "Boating Course Information",
  "/disclosures",
  "South Carolina boating course information covering scope rules, proof language, and launch-state disclosures."
)

export default function SouthCarolinaBoatingDisclosuresRoute() {
  return <BoatingStateDisclosuresPage stateSlug="south-carolina" />
}
