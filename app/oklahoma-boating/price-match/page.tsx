import type { Metadata } from "next"
import BoatingStatePriceMatchPage from "@/components/boating-state-price-match-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "oklahoma",
  "Boating Price Match",
  "/price-match",
  "Oklahoma boating price-match request page for public competitor pricing review."
)

export default function OklahomaBoatingPriceMatchRoute() {
  return <BoatingStatePriceMatchPage stateSlug="oklahoma" />
}
