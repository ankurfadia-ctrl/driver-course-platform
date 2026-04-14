export type FloridaParentEducationSubmissionStage = {
  step: string
  title: string
  status: "complete" | "submitted" | "monitor"
  outcome: string
  items: string[]
}

export const FLORIDA_PARENT_EDUCATION_SUBMISSION_WORKFLOW = {
  title: "Florida Parent Education Submission Workflow",
  summary:
    "Step-by-step filing sequence for taking the Florida Parent Education and Family Stabilization lane from research through packet submission and regulator follow-up.",
  currentMoveTitle: "DCF acknowledgment received; hold the packet steady",
  currentFocus:
    "DCF confirmed receipt on April 3, 2026 and asked for up to 30 business days for review. The practical next move is to watch the DCF thread, reply quickly if they ask for clarification or reviewer access, and keep the packet frozen unless the Department asks for revisions. If nothing substantive arrives by Monday, May 18, 2026, send a polite follow-up on the same thread.",
  doneAlready: [
    "Florida parent education has a dedicated admin readiness workspace.",
    "The statewide approval authority, review window, and approval term are mapped from official sources.",
    "Online delivery rules are identified for course duration, instructor responsiveness, identity validation, and final test score.",
    "A full written packet, instructor credential set, research-informed support memo, and reviewer-access package are now assembled.",
    "The protected parent-education reviewer route is built and ready if DCF asks for online review access.",
    "The final PDF bundle was cleaned of tacky driver-course branding and submitted to DCF.",
    "DCF acknowledged receipt on April 3, 2026 and asked for up to 30 business days for review.",
    "The lane is now in regulator-review mode rather than packet-assembly mode.",
  ],
  criticalRules: [
    "Keep Florida parent education separate from the BDI approval packet and public product copy.",
    "Do not market the course as court-accepted until provider approval is actually granted.",
    "Do not send the reviewer-access package unless DCF specifically asks for protected online access.",
    "If DCF asks for the legal applicant name, answer with Driver Course Platform LLC even though the packet itself uses cleaner course-facing branding.",
    "If no substantive DCF response arrives by Monday, May 18, 2026, send a short follow-up on the same email thread rather than changing the packet on your own.",
  ],
  stages: [
    {
      step: "Step 1",
      title: "Lock provider and support details",
      status: "complete",
      outcome:
        "Provider details, support contacts, and reviewer-facing course identity are locked for this filing.",
      items: [
        "Support phone and email are fixed in the packet and reviewer materials.",
        "The 1-business-day response workflow and certificate-verification ownership are documented.",
        "Course-facing branding was cleaned so the packet reads like a parenting-course filing, not a driver-course packet.",
      ],
    },
    {
      step: "Step 2",
      title: "Package the course curriculum",
      status: "complete",
      outcome:
        "The rule-mapped curriculum, guidebook, and instructional sequence are assembled.",
      items: [
        "The four-hour course structure and module map are finalized in the packet bundle.",
        "Required topics, disclaimers, and final-test threshold are documented.",
        "The formal course guidebook and instructor-facing materials are included in the submission set.",
      ],
    },
    {
      step: "Step 3",
      title: "Build the online control evidence",
      status: "complete",
      outcome:
        "The operational-control packet shows how the internet course satisfies Florida's online rules.",
      items: [
        "Seat-time controls, identity verification, and certificate locks are documented.",
        "Participant support, troubleshooting, and certificate-verification workflow are documented.",
        "The protected reviewer-access environment is built and aligned to the written packet.",
      ],
    },
    {
      step: "Step 4",
      title: "Prepare the certificate and disclaimer package",
      status: "complete",
      outcome:
        "The certificate, disclaimer, and instructor-qualification materials are assembled and approval-safe.",
      items: [
        "Certificate fields, authenticity workflow, and disclaimer language are included.",
        "The introduction letter, research memo, and instructor qualification packet are complete.",
        "The current Virginia licensure proof was refreshed using the official DHP lookup.",
        "The packet is frozen pending DCF feedback rather than still being drafted.",
      ],
    },
    {
      step: "Step 5",
      title: "Assemble and submit the provider packet",
      status: "submitted",
      outcome:
        "The clean packet has been submitted, DCF has acknowledged receipt, and the lane is now in regulator-review mode.",
      items: [
        "The final PDF bundle and individual packet documents were staged and emailed to DCF.",
        "DCF replied on April 3, 2026 confirming receipt and asking for up to 30 business days for review.",
        "The reviewer-access response package is prepared for use only if DCF asks.",
        "The next real task is fast regulator response, not more speculative packet editing.",
        "If no substantive reply arrives by Monday, May 18, 2026, send a polite follow-up on the same thread.",
      ],
    },
  ] as FloridaParentEducationSubmissionStage[],
} as const
