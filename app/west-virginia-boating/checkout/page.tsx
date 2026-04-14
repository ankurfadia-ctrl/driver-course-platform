import type { Metadata } from "next"
import BoatingStateCheckoutPage from "@/components/boating-state-checkout-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "west-virginia",
  "Boating Checkout",
  "/checkout",
  "West Virginia boating checkout scaffold describing the planned launch sequence before payments go live."
)

export default function WestVirginiaBoatingCheckoutRoute() {
  return <BoatingStateCheckoutPage stateSlug="west-virginia" />
}
