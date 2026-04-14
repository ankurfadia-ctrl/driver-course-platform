import type { Metadata } from "next"
import BoatingStateLaunchPage from "@/components/boating-state-launch-page"
import { buildBoatingStateOverlayMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata =
  buildBoatingStateOverlayMetadata("west-virginia")

export default function WestVirginiaBoatingPage() {
  return <BoatingStateLaunchPage stateSlug="west-virginia" />
}
