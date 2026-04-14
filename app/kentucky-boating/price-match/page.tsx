import type { Metadata } from "next"
import BoatingStatePriceMatchPage from "@/components/boating-state-price-match-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "kentucky",
  "Boating Price Match",
  "/price-match",
  "Kentucky boating price-match request page for public competitor pricing review."
)

export default function KentuckyBoatingPriceMatchRoute() {
  return <BoatingStatePriceMatchPage stateSlug="kentucky" />
}
