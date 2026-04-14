export type AdminWorkspaceLink = {
  href: string
  label: string
  summary: string
}

export type AdminWorkspaceGroup = {
  title: string
  description: string
  links: AdminWorkspaceLink[]
}

export type AdminWorkspacePriority = {
  title: string
  detail: string
}

export const ADMIN_WORKSPACE_GROUPS: AdminWorkspaceGroup[] = [
  {
    title: "Workspace Overview",
    description: "Top-level rollout tracking, launch posture, and the main dashboard.",
    links: [
      {
        href: "/admin",
        label: "Admin Home",
        summary: "Grouped workspace home with the main lanes and quick links.",
      },
      {
        href: "/admin/state-tracker",
        label: "State Tracker",
        summary: "Cross-state filing status, blockers, and next actions.",
      },
      {
        href: "/admin/launch-readiness",
        label: "Launch Readiness",
        summary: "Production readiness checks for the hosted platform.",
      },
      {
        href: "/admin/qa-checklist",
        label: "Hosted QA",
        summary: "Final smoke-test checklist before public launch changes.",
      },
    ],
  },
  {
    title: "Core Operations",
    description: "Internal tools that support every course family and regulator lane.",
    links: [
      {
        href: "/admin/compliance",
        label: "Compliance",
        summary: "Orders, purchases, completion records, and admin review tools.",
      },
      {
        href: "/admin/support",
        label: "Support",
        summary: "Student support threads and response workflows.",
      },
      {
        href: "/admin/pricing",
        label: "Pricing",
        summary: "Plan structure and pricing operations.",
      },
      {
        href: "/admin/curriculum",
        label: "Curriculum",
        summary: "Shared curriculum workspace across course types.",
      },
      {
        href: "/admin/operations",
        label: "Operations",
        summary: "Operational notes, readiness tracking, and process management.",
      },
      {
        href: "/admin/reporting",
        label: "DMV Reporting",
        summary: "Reporting workflows and regulator-facing record handling.",
      },
      {
        href: "/admin/outreach",
        label: "Regulatory Outreach",
        summary: "Outbound regulator and approval-path communications.",
      },
      {
        href: "/admin/course-types",
        label: "Course Types",
        summary: "Catalog-level view of the product and approval families.",
      },
    ],
  },
  {
    title: "DMV / Traffic Courses",
    description: "Driver-improvement, traffic-school, and motor-vehicle approval lanes.",
    links: [
      {
        href: "/admin/virginia-readiness",
        label: "Virginia Readiness",
        summary: "Virginia DMV approval lane and post-submission tracking.",
      },
      {
        href: "/admin/approval-packet",
        label: "Virginia Packet",
        summary: "Virginia approval packet and reviewer materials.",
      },
      {
        href: "/admin/florida-readiness",
        label: "Florida Readiness",
        summary: "Florida driver-course readiness across BDI and related tracks.",
      },
      {
        href: "/admin/florida-approval-packet",
        label: "Florida Packet",
        summary: "FLHSMV-facing Florida packet workspace.",
      },
      {
        href: "/admin/florida-bdi-submission",
        label: "BDI Submission Steps",
        summary: "Concrete submission workflow for Florida BDI.",
      },
      {
        href: "/admin/california-readiness",
        label: "California Readiness",
        summary: "California TVS hold-state workspace with market and cost notes.",
      },
      {
        href: "/admin/california-approval-packet",
        label: "California Packet",
        summary: "California packet scaffold and filing workspace.",
      },
    ],
  },
  {
    title: "Parenting / Co-Parenting Courses",
    description: "Court-required parenting education approvals and packet work.",
    links: [
      {
        href: "/admin/parent-education-readiness",
        label: "Parent Education Readiness",
        summary: "Multi-state rollout view for parenting-course expansion.",
      },
      {
        href: "/admin/florida-parent-education",
        label: "Florida Parent Workspace",
        summary: "Florida parenting-course lane with packet and status links.",
      },
      {
        href: "/admin/florida-parent-education-packet",
        label: "Florida Parent Packet",
        summary: "Packet outline and Florida parenting-course source materials.",
      },
      {
        href: "/admin/florida-parent-education-controls",
        label: "Florida Parent Controls",
        summary: "Seat-time, identity, and support-control evidence for Florida.",
      },
      {
        href: "/admin/florida-parent-education-final-packet",
        label: "Florida Parent Final Packet",
        summary: "Final bundle and submission-ready Florida packet view.",
      },
      {
        href: "/admin/florida-parent-education-submission",
        label: "Florida Parent Steps",
        summary: "Live DCF submission workflow and regulator follow-up status.",
      },
      {
        href: "/admin/south-dakota-parenting-readiness",
        label: "South Dakota Parenting",
        summary: "South Dakota request packet and mailing workflow.",
      },
      {
        href: "/admin/minnesota-parent-education-readiness",
        label: "Minnesota Parenting",
        summary: "Minnesota packet, standards crosswalk, and SCAO coordinator outreach lane.",
      },
    ],
  },
  {
    title: "Boating Courses",
    description: "Boating-education approval prep and hold-state strategy.",
    links: [
      {
        href: "/admin/boating-readiness",
        label: "Boating Readiness",
        summary: "NASBLA-dependent boating-course strategy and hold posture.",
      },
    ],
  },
] as const

export const ADMIN_WORKSPACE_PRIORITIES: AdminWorkspacePriority[] = [
  {
    title: "South Dakota parenting packet",
    detail:
      "Mail the signed packet as soon as possible and save proof of mailing in the South Dakota submission folder.",
  },
  {
    title: "Florida parent education",
    detail:
      "Packet is already submitted to DCF, so the real task is staying ready for clarification requests or reviewer access.",
  },
  {
    title: "Florida BDI",
    detail:
      "This remains the highest-value unsubmitted DMV lane and the main build-side push once South Dakota is mailed.",
  },
  {
    title: "Minnesota parenting packet",
    detail:
      "The Minnesota packet has already been submitted, so the real task is watching for SCAO follow-up while keeping the public microsite and written packet stable.",
  },
] as const
