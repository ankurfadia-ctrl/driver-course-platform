import type { Metadata } from "next"
import BoatingStatePriceMatchPage from "@/components/boating-state-price-match-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "south-carolina",
  "Boating Price Match",
  "/price-match",
  "South Carolina boating price-match request page for public competitor pricing review."
)

export default function SouthCarolinaBoatingPriceMatchRoute() {
  return <BoatingStatePriceMatchPage stateSlug="south-carolina" />
}
