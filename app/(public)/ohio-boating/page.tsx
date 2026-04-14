import type { Metadata } from "next"
import BoatingStateLaunchPage from "@/components/boating-state-launch-page"
import { buildBoatingStateOverlayMetadata } from "@/lib/boating-state-overlays"

export const metadata: Metadata = buildBoatingStateOverlayMetadata("ohio")

export default function OhioBoatingPage() {
  return <BoatingStateLaunchPage stateSlug="ohio" />
}
