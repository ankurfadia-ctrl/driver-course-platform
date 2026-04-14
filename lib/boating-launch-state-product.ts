export type BoatingLaunchPlan = {
  code: string
  name: string
  audience: string
  priceLabel: string
  status: "planned" | "coming-soon"
  bullets: string[]
  ctaLabel: string
}

export const BOATING_LAUNCH_STATE_PLANS: BoatingLaunchPlan[] = [
  {
    code: "boat-launch-standard",
    name: "Boating Safety Course",
    audience:
      "Best for students who want the standard boating education path with the state-specific overlay and proof guidance.",
    priceLabel: "$29.99 planned",
    status: "coming-soon",
    bullets: [
      "Shared NASBLA-aligned boating curriculum with state-specific compliance overlay",
      "State-focused proof-of-completion and disclosure language",
      "Built for early launch states where the certificate path is the main product",
    ],
    ctaLabel: "Review launch path",
  },
  {
    code: "boat-launch-priority",
    name: "Boating Safety Course + Priority Help",
    audience:
      "Best for students who want extra help with eligibility, proof questions, and first-launch support.",
    priceLabel: "$39.99 planned",
    status: "coming-soon",
    bullets: [
      "Everything in the standard boating launch tier",
      "Priority support positioning for proof and eligibility questions",
      "Useful for launch states where students may need extra guidance on scope rules",
    ],
    ctaLabel: "Review support path",
  },
]

export const BOATING_LAUNCH_CHECKOUT_STEPS = [
  [
    "1. Review state disclosures",
    "Students should confirm who is actually in scope, whether reciprocity helps, and whether the product is a certificate path or only a compliance-information path before paying.",
  ],
  [
    "2. Create account",
    "When a launch state goes live, payment and course access should stay tied to a student account so proof records, support, and certificate delivery stay attached to the right person.",
  ],
  [
    "3. Activate the state overlay",
    "After launch, payment will unlock the national boating core plus the state-specific rules, disclosures, and proof workflow for that market.",
  ],
] as const
