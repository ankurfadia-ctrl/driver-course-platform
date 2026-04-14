import type { Metadata } from "next"
import BoatingStateCheckoutPage from "@/components/boating-state-checkout-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "south-carolina",
  "Boating Checkout",
  "/checkout",
  "South Carolina boating checkout scaffold describing the planned launch sequence before payments go live."
)

export default function SouthCarolinaBoatingCheckoutRoute() {
  return <BoatingStateCheckoutPage stateSlug="south-carolina" />
}
