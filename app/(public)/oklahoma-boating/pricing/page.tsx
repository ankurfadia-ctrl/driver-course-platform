import type { Metadata } from "next"
import BoatingStatePricingPage from "@/components/boating-state-pricing-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "oklahoma",
  "Boating Pricing",
  "/pricing",
  "Oklahoma boating planned pricing and launch-plan structure before payment activation."
)

export default function OklahomaBoatingPricingRoute() {
  return <BoatingStatePricingPage stateSlug="oklahoma" />
}
