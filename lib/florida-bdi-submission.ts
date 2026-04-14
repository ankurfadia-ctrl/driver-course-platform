export type FloridaBDISubmissionStage = {
  step: string
  title: string
  status: "active" | "next" | "pending"
  outcome: string
  items: string[]
}

export const FLORIDA_BDI_SUBMISSION_WORKFLOW = {
  title: "Florida BDI Submission Workflow",
  summary:
    "Step-by-step filing sequence for getting Florida Basic Driver Improvement from packet-near-complete to submitted without losing any required business or packet dependencies.",
  currentFocus:
    "Florida foreign LLC packet is complete, check is prepared, and mailing is queued for April 2, 2026. Next focus is tracking the filing, then locking the final BDI application details around the filed Florida entity record.",
  doneAlready: [
    "Forms confirmed current by FLHSMV on March 31, 2026.",
    "Miami-Dade County selected as the pilot jurisdiction.",
    "BDI script v0.2 page-frozen across 18 pages and 10 modules.",
    "Topic matrix complete with page-frozen references.",
    "500-question bank complete with script-page references.",
    "Cover letter and supporting packet documents drafted.",
    "Florida foreign LLC filing packet assembled with Virginia certificate and registered-agent materials.",
    "Filing check prepared and mailing packet queued for April 2, 2026.",
  ],
  criticalRules: [
    "Do not open Florida enrollment before approval is granted.",
    "Do not assemble the final packet PDF until the application form, ownership attachment, and business filing details are final.",
    "Keep page-frozen script references unchanged during final packet assembly.",
  ],
  stages: [
    {
      step: "Step 1",
      title: "Mail and log the Florida foreign LLC filing",
      status: "next",
      outcome:
        "Get the Florida business filing into the state pipeline and preserve proof of what was mailed.",
      items: [
        "Mail the completed foreign LLC packet with check to the Florida Division of Corporations.",
        "Save proof of mailing and any follow-up confirmation in the Florida submission folder.",
        "Freeze the exact business name, registered-agent details, and contact information used in the filing packet.",
      ],
    },
    {
      step: "Step 2",
      title: "Finalize the application form itself",
      status: "active",
      outcome:
        "Bring the application form into alignment with the rest of the packet before final assembly.",
      items: [
        "Insert the Miami-Dade County (11th Judicial Circuit) pilot declaration into the completed application form.",
        "Verify the business/legal details in the form match the mailed LLC packet and update them again once the Florida filing is accepted.",
        "Confirm the BDI delivery type and packet references are the same everywhere in the packet set.",
      ],
    },
    {
      step: "Step 3",
      title: "Attach the final ownership and rights materials",
      status: "pending",
      outcome:
        "Make the packet complete on ownership, copyright, and supporting-provider documentation.",
      items: [
        "Attach copyright and ownership documentation.",
        "Verify the submission manifest and table of contents point to the correct final attachment set.",
        "Confirm reviewer packet, validation notes, exam controls, and instructor/support notes are all included in the final evidence set.",
      ],
    },
    {
      step: "Step 4",
      title: "Assemble and QA the final BDI PDF packet",
      status: "pending",
      outcome:
        "Produce one clean submission-ready BDI packet with page references preserved.",
      items: [
        "Assemble the packet in final submission order.",
        "Check that all script-page references still match the frozen script and topic matrix.",
        "Review the final PDF for ordering, naming, completeness, and readability.",
        "Keep the reviewer packet and demo environment aligned with the final submission version.",
      ],
    },
    {
      step: "Step 5",
      title: "Submit and log the filing",
      status: "pending",
      outcome:
        "Send the BDI packet and record the exact submission state for follow-up.",
      items: [
        "Submit the final BDI packet to FLHSMV.",
        "Save proof of submission and the exact packet version used.",
        "Log the submission date and move Florida BDI into regulator-review mode.",
      ],
    },
  ] as FloridaBDISubmissionStage[],
} as const
