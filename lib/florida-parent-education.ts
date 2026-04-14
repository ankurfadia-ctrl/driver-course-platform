export type FloridaParentEducationSection = {
  title: string
  items: string[]
}

export type FloridaParentEducationReference = {
  label: string
  href: string
}

export const FLORIDA_PARENT_EDUCATION_WORKSPACE = {
  productSlug: "florida-parent-education",
  siteTitle: "Florida Parent Education / Family Stabilization Readiness",
  brandName: "Florida Co-Parenting Foundations",
  productName: "Florida Parent Education and Family Stabilization",
  approvalLabel: "DCF approval readiness",
  summary:
    "Florida parent education and family stabilization is a strong online course opportunity because the state approval path is explicit, statewide, and built around a repeatable provider-review process.",
  approvalAuthority: "Florida Department of Children and Families",
  reviewWindow: "30 business days",
  approvalTerm: "3 years",
  onlineCourseNote:
    "Florida law requires at least one statewide internet course and one statewide correspondence course for the parent-education program.",
  onlineControls: [
    "Online courses must not allow completion in under 4 hours.",
    "Instructor questions must be answered within 1 business day.",
    "Identity must be verified before a completion certificate is issued.",
    "The final test must be passed with at least 70 percent.",
    "A certificate is issued only after the course and validation rules are satisfied.",
  ],
  buildNotes: [
    "This should be treated as a separate Florida approval lane from BDI.",
    "The strongest first version is a bilingual, file-ready, statewide course packet.",
    "The admin workspace should track provider approval, curriculum, instructor, and certificate obligations together.",
  ],
  nextActions: [
    "Draft the Florida parent education provider packet and route map.",
    "Add the course outline, instructor Q&A process, and identity-validation controls.",
    "Prepare the certificate workflow and student support SOP for the statewide internet course.",
    "Keep the parent education lane separate from the Florida driver-improvement packet work.",
  ],
  references: [
    {
      label: "Florida Statute 61.21",
      href: "https://www.flsenate.gov/Laws/Statutes/2024/0061.21",
    },
    {
      label: "DCF course provider page",
      href: "https://www.myflfamilies.com/services/child-family/child-and-family-well-being/pefs/course-providers",
    },
    {
      label: "Florida Rule 65C-32",
      href: "https://www.myflfamilies.com/sites/default/files/2022-12/Administrative-Rule%2065C-32.pdf",
    },
  ] as FloridaParentEducationReference[],
  sections: [
    {
      title: "Approval path",
      items: [
        "Florida DCF approves providers, instructors, and curriculum for the parent-education program.",
        "Approval packets are reviewed on a statewide basis, so one strong filing can support a repeatable launch model.",
        "Approvals are valid for 3 years, which makes this a better certification target than many court-course categories.",
      ],
    },
    {
      title: "Online course rules",
      items: [
        "The statute and rule require at least one statewide internet course and one statewide correspondence course.",
        "Online completion cannot happen in under 4 hours.",
        "Instructor Q&A must be available within 1 business day.",
        "Identity verification and a 70 percent final score are required before completion.",
      ],
    },
    {
      title: "Commercial implication",
      items: [
        "This is a strong first Florida court-course lane because the rules are explicit and the packet can be standardized.",
        "It fits a bilingual, fee-based, family-stabilization / co-parenting course model.",
        "The best launch motion is to build the approval packet once, then reuse the same operational system for future state and county variants.",
      ],
    },
  ] as FloridaParentEducationSection[],
} as const
