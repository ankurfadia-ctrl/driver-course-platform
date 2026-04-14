import type { Metadata } from "next"
import BoatingStateLaunchPage from "@/components/boating-state-launch-page"
import { buildBoatingStateOverlayMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata =
  buildBoatingStateOverlayMetadata("south-carolina")

export default function SouthCarolinaBoatingPage() {
  return <BoatingStateLaunchPage stateSlug="south-carolina" />
}
