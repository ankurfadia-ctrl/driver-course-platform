import type { Metadata } from "next"
import BoatingStateCheckoutPage from "@/components/boating-state-checkout-page"
import { buildBoatingStateOverlaySubpageMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlaySubpageMetadata(
  "ohio",
  "Boating Checkout",
  "/checkout",
  "Ohio boating checkout scaffold describing the planned launch sequence before payments go live."
)

export default function OhioBoatingCheckoutRoute() {
  return <BoatingStateCheckoutPage stateSlug="ohio" />
}
