export type VirginiaBoatingRequirement = {
  title: string
  body: string
}

export type VirginiaBoatingExemption = {
  title: string
  body: string
}

export const VIRGINIA_BOATING_CONFIG = {
  stateSlug: "virginia",
  productSlug: "virginia-boating",
  siteTitle: "Virginia Boating Safety Course",
  brandName: "Virginia Boating Safety Course",
  productName: "Virginia Boating Safety Course",
  marketingHeadline:
    "Build the Virginia boating safety product first with state-accurate rules and proof language.",
  marketingDescription:
    "Virginia boating safety course planning page with Virginia Department of Wildlife Resources rule mapping, proof-of-completion language, exemptions, and launch notes for a future state-specific boating product.",
  supportEmail: "admin@nationaldriverimprovement.com",
  supportPhoneDisplay: "(703) 574-0146",
  dwrSummary:
    "Virginia DWR requires boating education for all personal watercraft operators age 14 and older and all operators of Virginia-registered motorboats with engines of 10 horsepower or greater. The public product should be sold as boating safety education and proof of completion, not as a guaranteed boating license.",
  requirements: [
    {
      title: "Who must complete boating education",
      body:
        "Virginia requires boating education for all operators of personal watercraft age 14 and older and all operators, regardless of age, of Virginia-registered motorboats with engines of 10 horsepower or greater. Sailboats are included only when the sailboat has a motor of 10 horsepower or greater.",
    },
    {
      title: "What proof the operator must carry",
      body:
        "The operator should be able to show a card or certificate proving completion of a NASBLA-approved course or passage of the Virginia equivalency or challenge exam. Virginia DWR also offers an optional Lifetime Virginia Boating Safety Education Card for a $10 fee.",
    },
    {
      title: "How Virginia treats personal watercraft",
      body:
        "A personal watercraft operator generally must be at least 16 years old. A 14- or 15-year-old may operate a PWC only if they completed an approved boating safety course and carry proof of completion while operating.",
    },
    {
      title: "Temporary owner and rental pathways",
      body:
        "Virginia recognizes a 90-day temporary operator certificate for owners of newly acquired boats and a separate rental or lease pathway tied to the rental business training and dockside checklist process.",
    },
  ] as VirginiaBoatingRequirement[],
  exemptions: [
    {
      title: "Military, merchant marine, and maritime credentials",
      body:
        "Virginia recognizes several exemptions for people with qualifying U.S. Coast Guard, Canadian marine, Navy surface warfare, Officer of the Deck Underway, coxswain, boat operator, watercraft operator, and related maritime credentials.",
    },
    {
      title: "Supervised operation and certain special-use cases",
      body:
        "The requirement can also be satisfied or bypassed in limited situations such as direct onboard supervision by a person who already meets the requirement, some commercial-fisherman operations, certain law-enforcement duties, and emergency return-to-shore situations.",
    },
    {
      title: "Nonresident rules",
      body:
        "If a boater is operating a Virginia-registered boat, Virginia’s requirement applies. If the boat is registered in another state and is used in Virginia for 90 days or less, the boater generally follows the applicable boating-education rules of their home state.",
    },
  ] as VirginiaBoatingExemption[],
  buildNotes: [
    "Use Virginia DWR language such as 'boating safety education requirement' and 'course completion certificate or card' instead of marketing this as a generic license product.",
    "Keep state-specific proof, exemptions, and age rules outside the national NASBLA lesson core so the Virginia variant can be maintained without rewriting the base curriculum.",
    "A future student flow should store whether the Virginia learner is pursuing general motorboat compliance, PWC eligibility, or a replacement-proof workflow.",
  ],
  sourceNotes: [
    "Virginia DWR boating safety page says the completion certificate or card provided by the course provider is what the operator needs to carry.",
    "Virginia DWR FAQ says the motorboat rule phased in to all operators regardless of age on July 1, 2016, for Virginia-registered motorboats with 10 horsepower or greater.",
    "Virginia DWR PWC page says operators generally must be at least 16, with a 14- or 15-year-old exception only if the student completed an approved course and carries proof.",
  ],
} as const
