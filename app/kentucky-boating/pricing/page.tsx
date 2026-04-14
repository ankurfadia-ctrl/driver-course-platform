import type { Metadata } from "next"
import BoatingStatePricingPage from "@/components/boating-state-pricing-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "kentucky",
  "Boating Pricing",
  "/pricing",
  "Kentucky boating planned pricing and launch-plan structure before payment activation."
)

export default function KentuckyBoatingPricingRoute() {
  return <BoatingStatePricingPage stateSlug="kentucky" />
}
