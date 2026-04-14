export type VirginiaBoatingPlan = {
  code: string
  name: string
  audience: string
  priceLabel: string
  status: "planned" | "coming-soon"
  bullets: string[]
  ctaLabel: string
}

export const VIRGINIA_BOATING_PLANS: VirginiaBoatingPlan[] = [
  {
    code: "va-boat-standard",
    name: "Virginia Boating Safety Course",
    audience:
      "Best for Virginia motorboat operators and PWC students who need boating safety education proof.",
    priceLabel: "$29.99",
    status: "planned",
    bullets: [
      "Virginia boating course aligned to the national core plus powerboat structure",
      "Virginia-specific disclosures, proof language, and requirement reminders",
      "Digital proof-of-completion workflow once the launch build is activated",
    ],
    ctaLabel: "Choose standard",
  },
  {
    code: "va-boat-plus",
    name: "Virginia Boating Safety Course + Priority Help",
    audience:
      "Best for students who want faster help on proof, eligibility questions, or course-access issues.",
    priceLabel: "$39.99",
    status: "planned",
    bullets: [
      "Everything in the standard course tier",
      "Priority support positioning for faster human follow-up once student support is active",
      "Designed for first-launch students who want extra help navigating Virginia requirements",
    ],
    ctaLabel: "Choose priority",
  },
]
