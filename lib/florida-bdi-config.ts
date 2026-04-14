export type FloridaBDIRequirement = {
  title: string
  body: string
}

export const FLORIDA_BDI_CONFIG = {
  stateSlug: "florida",
  productSlug: "florida-bdi",
  siteTitle: "Florida Basic Driver Improvement Course",
  brandName: "Florida Driver Improvement Courses",
  productName: "Florida Basic Driver Improvement Course",
  marketingHeadline:
    "Separate Florida BDI from the generic state scaffold before launch.",
  marketingDescription:
    "Florida BDI product preview with packet status, curriculum structure, and launch-readiness notes for the first Florida course track.",
  supportEmail: "admin@vadriverimprovementcourse.com",
  supportPhoneDisplay: "(703) 574-0146",
  packetStatus: "Packet assembly in progress",
  packetSummary:
    "Florida BDI is the first Florida track being separated into its own product surface while packet assembly stays in progress.",
  packetHighlights: [
    "Forms confirmed current by FLHSMV on March 31, 2026.",
    "Pilot jurisdiction selected: Miami-Dade County (11th Judicial Circuit).",
    "Script v0.2 is page-frozen across 18 pages and 10 modules.",
    "The 500-question bank is maintained in the Florida packet source set.",
  ],
  requirements: [
    {
      title: "Course length and exam",
      body:
        "Florida BDI is being prepared as an 8-hour technology-delivered course with a randomized 40-question final exam and an 80 percent passing threshold.",
    },
    {
      title: "Pilot jurisdiction",
      body:
        "After approval, the first operating footprint is planned for Miami-Dade County while the pilot-study conditions are satisfied.",
    },
    {
      title: "Traceability",
      body:
        "The script, topic map, and question-bank references are being kept page-frozen together so packet review and later implementation stay aligned.",
    },
  ] as FloridaBDIRequirement[],
  launchConstraints: [
    "Florida foreign LLC registration and registered agent details still need to be completed.",
    "The pilot-jurisdiction declaration still needs to be inserted into the completed application form.",
    "Copyright and ownership documentation still needs to be attached to the final packet.",
    "Public enrollment stays closed until packet assembly, review, and approval are complete.",
  ],
  buildNotes: [
    "Keep BDI on its own product path instead of hiding it behind the generic Florida state scaffold.",
    "Treat the reviewer portal and printable packet as approval assets, not as the eventual student-facing course.",
    "Use the page-frozen module map as the source of truth for any future lesson runtime work.",
  ],
} as const
