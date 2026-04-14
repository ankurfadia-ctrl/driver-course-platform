import type { Metadata } from "next"
import StandardPriceMatchPage from "@/components/site/standard-price-match-page"
import { buildBoatingPriceMatchTerms } from "@/lib/price-match"
import { VIRGINIA_BOATING_CONFIG } from "@/lib/virginia-boating-config"

export const metadata: Metadata = {
  title: `Virginia Boating Price Match | ${VIRGINIA_BOATING_CONFIG.brandName}`,
  description:
    "Virginia boating price-match request page for public competitor pricing review before purchase.",
  alternates: {
    canonical: "/virginia-boating/price-match",
  },
}

export default function VirginiaBoatingPriceMatchPage() {
  return (
    <StandardPriceMatchPage
      label="Price Match Request"
      title="Send us a lower public Virginia boating course price for review"
      description="If you find a lower current public price for a comparable Virginia boating-safety course, submit the details below. We review qualifying requests manually and match the verified price or beat it by $1."
      requestTitle="Virginia boating price match request"
      emailSubject="Virginia boating price match request"
      terms={buildBoatingPriceMatchTerms("Virginia")}
      supportName="Virginia boating support"
      supportEmail={VIRGINIA_BOATING_CONFIG.supportEmail}
      supportPhone={VIRGINIA_BOATING_CONFIG.supportPhoneDisplay}
      accent="sky"
    />
  )
}
