import type { Metadata } from "next"
import BoatingStateDisclosuresPage from "@/components/boating-state-disclosures-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "west-virginia",
  "Boating Course Information",
  "/disclosures",
  "West Virginia boating course information covering scope rules, proof language, and launch-state disclosures."
)

export default function WestVirginiaBoatingDisclosuresRoute() {
  return <BoatingStateDisclosuresPage stateSlug="west-virginia" />
}
