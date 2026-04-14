import type { Metadata } from "next"
import BoatingStatePricingPage from "@/components/boating-state-pricing-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "south-carolina",
  "Boating Pricing",
  "/pricing",
  "South Carolina boating planned pricing and launch-plan structure before payment activation."
)

export default function SouthCarolinaBoatingPricingRoute() {
  return <BoatingStatePricingPage stateSlug="south-carolina" />
}
