import type { Metadata } from "next"
import BoatingStatePricingPage from "@/components/boating-state-pricing-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "west-virginia",
  "Boating Pricing",
  "/pricing",
  "West Virginia boating planned pricing and launch-plan structure before payment activation."
)

export default function WestVirginiaBoatingPricingRoute() {
  return <BoatingStatePricingPage stateSlug="west-virginia" />
}
