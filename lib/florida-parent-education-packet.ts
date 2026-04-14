export type FloridaParentEducationPacketReference = {
  label: string
  href: string
}

export type FloridaParentEducationPacketSection = {
  title: string
  items: string[]
}

export const FLORIDA_PARENT_EDUCATION_PACKET = {
  title: "Florida Parent Education Provider Packet",
  summary:
    "Working packet outline for the Florida Parent Education and Family Stabilization approval lane, built from Rule 65C-32, the DCF provider page, and the Florida provider readiness checklist.",
  providerProfile: [
    "Course administrator: Florida Co-Parenting Foundations",
    "Primary contact: Ankur Fadia",
    "Business address: 775 Red Hill Rd, Fairfield, VA 24435",
    "Primary phone: (703) 574-0146",
    "Primary email: admin@vadriverimprovementcourse.com",
    "Florida parent-education submission email: parentstabilizationcourse@myflfamilies.com",
    "DCF coordinator mailing address: 1400 West Commercial Blvd, Suite 260-S, Fort Lauderdale, FL 33309",
  ],
  recommendedLaunchProfile: [
    "Delivery: virtual self-paced internet course first, with correspondence capability planned separately if needed.",
    "Duration: minimum 4 hours, with time controls preventing early completion.",
    "Languages: English first; Spanish and closed captions should be the next accessibility layer.",
    "Working standard fee: $24.99, with documented-hardship review rather than blanket free enrollment.",
    "Support model: participant questions answered within 1 business day.",
    "Certificate controls: issue only after identity verification and a passing final test score of at least 70 percent.",
  ],
  packetSections: [
    {
      title: "Provider introduction and registration profile",
      items: [
        "Signed introduction letter on company letterhead.",
        "Provider name, contact person, company name, address, phone, and email.",
        "Course webpage information: course name, provider name, email, and website.",
        "Course registration information including amount charged to participants.",
        "Indigent-parent completion option such as scholarships, court waivers, or fee waivers.",
      ],
    },
    {
      title: "Formal course guidebook",
      items: [
        "Course timeline showing at least 4 hours of instruction, exercises, and final test.",
        "Course learning objectives.",
        "All course materials, including instructor manual, slides, scripts, and videos.",
        "Definitions of key legal and mental-health terms introduced in the course.",
        "References and resource list given to participants.",
        "Evaluation form if one will be used.",
      ],
    },
    {
      title: "Instructor and provider evidence",
      items: [
        "Evidence-based or research-informed documentation for the curriculum.",
        "Resumes and degree information for all instructors.",
        "Instructor qualifications showing either a related bachelor's degree plus 2 years of experience, or 4 years of related experience.",
        "Operating note for future instructor additions within 7 business days of hire.",
      ],
    },
    {
      title: "Online-course control evidence",
      items: [
        "Identity-verification method before certificate issuance.",
        "Participant communication method for online questions and instructor response.",
        "Instructional techniques used in the course, such as lectures, discussion prompts, scenario review, and exercises.",
        "Language availability and accessibility features such as captions.",
        "End-of-course test design, retake logic, and no-extra-fee remediation workflow.",
      ],
    },
    {
      title: "Certificate and legal language",
      items: [
        "Sample certificate of completion.",
        "Certificate fields: course name, curriculum name if used, provider name/contact information, start date, and finish date.",
        "Certificate authenticity verification method.",
        "Record-retention workflow for participant lists and certificates for 5 years.",
        "Educational-only and no-legal-advice disclaimers using the exact Florida-required wording before submission.",
      ],
    },
  ] as FloridaParentEducationPacketSection[],
  requiredComponents: [
    "Divorce as loss",
    "Permanency of parental role and shared parenting",
    "Developmental stages of childhood",
    "Communicating with children in a divorce situation",
    "Communicating with the other parent",
    "Abuse, domestic violence, child abuse reporting, and hotline information",
    "Legal concepts under general Florida family law",
    "Parenting time and parenting-plan communication",
  ],
  immediateNextActions: [
    "Finalize the course name and any optional unique curriculum name.",
    "Confirm the standard course fee and then finalize the narrow indigent-access policy wording with DCF feedback.",
    "Expand the drafted 4-hour module outline into script, slides, and participant exercises.",
    "Name the designated instructor/support responder for the 1-business-day response rule.",
    "Package instructor qualifications and research-informed support with the drafted guidebook and controls packet.",
  ],
  references: [
    {
      label: "DCF provider page",
      href: "https://prod.myflfamilies.com/services/child-family/child-and-family-well-being/pefs/course-providers",
    },
    {
      label: "Florida Statute 61.21",
      href: "https://www.flsenate.gov/Laws/Statutes/2024/0061.21",
    },
    {
      label: "Florida Rule 65C-32",
      href: "https://www.myflfamilies.com/sites/default/files/2022-12/Administrative-Rule%2065C-32.pdf",
    },
  ] as FloridaParentEducationPacketReference[],
} as const
