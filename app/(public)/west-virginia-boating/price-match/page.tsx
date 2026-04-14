import type { Metadata } from "next"
import BoatingStatePriceMatchPage from "@/components/boating-state-price-match-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "west-virginia",
  "Boating Price Match",
  "/price-match",
  "West Virginia boating price-match request page for public competitor pricing review."
)

export default function WestVirginiaBoatingPriceMatchRoute() {
  return <BoatingStatePriceMatchPage stateSlug="west-virginia" />
}
