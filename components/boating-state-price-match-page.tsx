import StandardPriceMatchPage from "@/components/site/standard-price-match-page"
import { getBoatingStateOverlay } from "@/lib/boating-state-overlays"
import {
  buildBoatingPriceMatchTerms,
  DEFAULT_PUBLIC_SUPPORT_EMAIL,
} from "@/lib/price-match"

type Props = {
  stateSlug: string
}

export default function BoatingStatePriceMatchPage({ stateSlug }: Props) {
  const overlay = getBoatingStateOverlay(stateSlug)

  if (!overlay) {
    return null
  }

  return (
    <StandardPriceMatchPage
      label="Price Match Request"
      title={`Send us a lower public ${overlay.stateName} boating course price for review`}
      description={`If you find a lower current public price for a comparable ${overlay.stateName} boating-safety course, submit the details below. We review qualifying requests manually and match the verified price or beat it by $1 when the state launch path is live.`}
      requestTitle={`${overlay.stateName} boating price match request`}
      emailSubject={`${overlay.stateName} boating price match request`}
      terms={buildBoatingPriceMatchTerms(overlay.stateName)}
      supportName={`${overlay.stateName} boating support`}
      supportEmail={DEFAULT_PUBLIC_SUPPORT_EMAIL}
      supportPhone="(703) 574-0146"
      accent="sky"
    />
  )
}
