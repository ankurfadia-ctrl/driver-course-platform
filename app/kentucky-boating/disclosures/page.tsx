import type { Metadata } from "next"
import BoatingStateDisclosuresPage from "@/components/boating-state-disclosures-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "kentucky",
  "Boating Course Information",
  "/disclosures",
  "Kentucky boating course information covering scope rules, proof language, and launch-state disclosures."
)

export default function KentuckyBoatingDisclosuresRoute() {
  return <BoatingStateDisclosuresPage stateSlug="kentucky" />
}
