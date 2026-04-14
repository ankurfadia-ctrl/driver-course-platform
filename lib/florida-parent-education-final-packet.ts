export type FloridaParentEducationFinalPacketSection = {
  order: number
  title: string
  sourceLabel: string
  sourceHref: string
  status: "drafted" | "pending-external"
  notes: string[]
}

export const FLORIDA_PARENT_EDUCATION_FINAL_PACKET = {
  title: "Florida Parent Education Final Packet",
  summary:
    "Printable submission-bundle spine for the Florida Parent Education and Family Stabilization internet-course filing. This assembles the drafted packet materials into one review/export page and clearly separates the external attachments that still need to be plugged in.",
  submissionLabel: "DCF digital packet",
  submissionEmail: "parentstabilizationcourse@myflfamilies.com",
  reviewWindow: "30 working days",
  packetSections: [
    {
      order: 1,
      title: "Provider introduction letter",
      sourceLabel: "Florida parent packet drafts",
      sourceHref: "/admin/florida-parent-education-packet",
      status: "drafted",
      notes: [
        "Signed introduction letter on provider letterhead.",
        "Uses Florida Co-Parenting Foundations, (703) 574-0146, and admin@vadriverimprovementcourse.com.",
      ],
    },
    {
      order: 2,
      title: "Provider profile and registration information",
      sourceLabel: "Florida parent packet",
      sourceHref: "/admin/florida-parent-education-packet",
      status: "drafted",
      notes: [
        "Provider contact, business address, website/email, and working fee assumptions.",
        "Indigent-access policy is narrow and remains paid by default.",
      ],
    },
    {
      order: 3,
      title: "Formal course guidebook",
      sourceLabel: "Guidebook skeleton",
      sourceHref: "/admin/florida-parent-education-packet",
      status: "drafted",
      notes: [
        "4-hour minimum, 8-module structure.",
        "Learning objectives, key terms, rule-mapped topics, and timing structure are drafted.",
      ],
    },
    {
      order: 4,
      title: "Required curriculum component map",
      sourceLabel: "Florida parent packet",
      sourceHref: "/admin/florida-parent-education-packet",
      status: "drafted",
      notes: [
        "All required Rule 65C-32 topic areas are mapped in the packet workspace.",
      ],
    },
    {
      order: 5,
      title: "Online-course control evidence",
      sourceLabel: "Florida parent controls",
      sourceHref: "/admin/florida-parent-education-controls",
      status: "drafted",
      notes: [
        "Seat-time, identity verification, certificate gating, and support-response workflow are documented.",
      ],
    },
    {
      order: 6,
      title: "Required disclaimers and final-test policy",
      sourceLabel: "Florida parent packet",
      sourceHref: "/admin/florida-parent-education-packet",
      status: "drafted",
      notes: [
        "Mental-health disclaimer and legal disclaimer are drafted using the Florida-required language.",
        "Passing score, retake, and remediation rules are drafted.",
      ],
    },
    {
      order: 7,
      title: "Sample certificate and authenticity workflow",
      sourceLabel: "Florida parent packet",
      sourceHref: "/admin/florida-parent-education-packet",
      status: "drafted",
      notes: [
        "Sample certificate fields, sample certificate text, authenticity workflow, and five-year retention note are drafted.",
      ],
    },
    {
      order: 8,
      title: "Instructor/support SOP and indigent-access policy",
      sourceLabel: "Florida parent packet drafts",
      sourceHref: "/admin/florida-parent-education-packet",
      status: "drafted",
      notes: [
        "Ankur Fadia is the designated initial responder in the current draft.",
        "The course remains fee-based by default with documented-hardship review only.",
      ],
    },
    {
      order: 9,
      title: "Instructor qualifications and resumes",
      sourceLabel: "External attachment",
      sourceHref: "/admin/florida-parent-education-submission",
      status: "pending-external",
      notes: [
        "DCF checklist requires degree/work-history support and resumes for instructors.",
        "Only include an instructor designation once qualification support is ready.",
      ],
    },
    {
      order: 10,
      title: "Evidence-based or research-informed support",
      sourceLabel: "External attachment",
      sourceHref: "/admin/florida-parent-education-submission",
      status: "pending-external",
      notes: [
        "DCF checklist calls for documentation that the curriculum is evidence-based or research-informed.",
      ],
    },
    {
      order: 11,
      title: "Final course materials and resource list",
      sourceLabel: "External attachment",
      sourceHref: "/admin/florida-parent-education-submission",
      status: "pending-external",
      notes: [
        "Guidebook skeleton exists, but the final script/slides/exercises/resources packet still needs to be exported as the final course materials.",
      ],
    },
  ] as FloridaParentEducationFinalPacketSection[],
  finalAssemblyChecklist: [
    "Export the introduction letter onto company letterhead and sign it.",
    "Freeze the standard fee and final optional curriculum name.",
    "Add instructor resume/qualification attachment if you want the named responder to also be the listed instructor.",
    "Attach research-informed or evidence-based support for the curriculum.",
    "Export the final course materials bundle: guidebook, exercises, test copy, and participant resource list.",
    "Merge the drafted sections and external attachments into one digital packet for DCF.",
  ],
} as const
