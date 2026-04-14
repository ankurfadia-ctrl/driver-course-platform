export type MinnesotaParentEducationReference = {
  label: string
  href: string
}

export type MinnesotaParentEducationPacketDocument = {
  name: string
  purpose: string
}

export type MinnesotaParentEducationContactField = {
  label: string
  value: string
  note?: string
}

export const MINNESOTA_PARENT_EDUCATION_APPROVAL = {
  title: "Minnesota Parent Education Approval Packet",
  summary:
    "Minnesota is a more formal parenting-course lane than South Dakota. New courses are reviewed first through the State Court Administrator's Office and then approved for local acceptance in each judicial district or county.",
  currentMove:
    "Submission sent; hold the packet steady and watch for SCAO follow-up",
  courseName: "Minnesota Co-Parenting Foundations",
  programProfile: [
    "Format: online self-paced parent education course.",
    "Planned runtime: 360 minutes (6 hours).",
    "Planned fee: $22.95 standard fee with a Minnesota-specific sliding fee scale and indigency waiver path.",
    "Completion artifact: certificate with case number, participant name, attendance dates, and verification ID.",
    "Legal applicant entity: Driver Course Platform LLC.",
  ],
  officialRulePoints: [
    "New Parent Education Courses are reviewed and approved first through the State Court Administrator's Office and then approved for local acceptance in each judicial district or county.",
    "Both online and in-person parent education programs are acceptable.",
    "Programs should be 4 to 8 hours in length.",
    "Out-of-state programs must explain how they will cover Minnesota community resources, judicial process and proceedings, and legal issues specific to Minnesota.",
    "Certificates of completion must include the court case number, participant name, and date or dates of attendance.",
    "Providers must implement a sliding fee scale, and parties who qualify under Minn. Stat. Sec. 563.01 are exempt from paying the program fee.",
    "Instructors should use interactive teaching approaches, have relevant family-related training or experience, and receive training on domestic violence and sexual assault impacts on children.",
    "Approved programs should collect participant evaluations and, every two years, submit an abbreviated application plus usage data showing who used the program, what program was completed, and the county involved.",
  ],
  packetDocuments: [
    {
      name: "Minnesota application answer key",
      purpose:
        "Maps each application field to a proposed response so the official PDF can be completed quickly and consistently.",
    },
    {
      name: "Coordinator contact draft",
      purpose:
        "A copy-paste draft for the SCAO Parent Education Course Approval Coordinator contact path.",
    },
    {
      name: "Minnesota minimum standards crosswalk",
      purpose:
        "Maps the Minnesota Supreme Court standards to the proposed program design.",
    },
    {
      name: "Minnesota curriculum overlay",
      purpose:
        "Shows how the course covers Minnesota-specific judicial process, legal topics, community resources, and required parenting content.",
    },
    {
      name: "Sliding fee and indigency policy",
      purpose:
        "Documents compliance with the sliding-fee-scale and Minn. Stat. Sec. 563.01 fee-waiver expectations.",
    },
    {
      name: "Certificate and recordkeeping plan",
      purpose:
        "Shows the required certificate fields and completion-record handling.",
    },
    {
      name: "Instructor and provider qualifications",
      purpose:
        "Summarizes the proposed administrator/instructor qualifications and the Minnesota-specific training plan.",
    },
    {
      name: "Evaluation and biennial reporting plan",
      purpose:
        "Documents participant evaluations and the ongoing two-year compliance/reporting workflow.",
    },
    {
      name: "Sample course evaluation",
      purpose:
        "Provides the sample participant evaluation attachment explicitly requested by the Minnesota application.",
    },
    {
      name: "County/local acceptance follow-up plan",
      purpose:
        "Shows how the provider will handle the post-SCAO district or county acceptance layer.",
    },
  ] as MinnesotaParentEducationPacketDocument[],
  contactFields: [
    {
      label: "Full name",
      value: "Ankur Fadia",
    },
    {
      label: "Email",
      value: "admin@vadriverimprovementcourse.com",
    },
    {
      label: "Retype email",
      value: "admin@vadriverimprovementcourse.com",
    },
    {
      label: "County where you live",
      value: "Leave blank",
      note:
        "The contact form field is not marked required, and the provider is not Minnesota-based.",
    },
    {
      label: "Phone number",
      value: "(703) 574-0146",
    },
    {
      label: "Subject",
      value:
        "Request for Minnesota Parent Education Course Sponsor Approval Submission Instructions",
    },
  ] as MinnesotaParentEducationContactField[],
  contactMessage: [
    "Hello,",
    "I am preparing an online parent education course for Minnesota family-law matters and would like information on how to submit the course for sponsor approval through the State Court Administrator's Office.",
    "The proposed course is Minnesota Co-Parenting Foundations, an online self-paced parent education program intended to satisfy Minnesota's parent education minimum standards. I have prepared a Minnesota-specific standards crosswalk, curriculum overlay, sliding-fee and indigency policy, certificate plan, instructor qualifications summary, and evaluation/reporting plan.",
    "Because the provider is based outside Minnesota, the packet specifically addresses how the program will cover Minnesota community resources, judicial process and proceedings, and legal issues specific to Minnesota.",
    "Please let me know the preferred submission method, any required forms or attachments, whether PDF materials may be submitted electronically, and how the local district or county acceptance step is typically handled after SCAO review.",
    "Thank you.",
  ],
  nextExternalSteps: [
    "Watch the ParentEducationProgram@courts.state.mn.us thread for SCAO review follow-up or clarification questions.",
    "Keep the submission-ready PDF folder and the public Minnesota microsite stable unless SCAO asks for changes.",
    "If SCAO requests more detail, reply on the same thread with only the updated or requested materials.",
    "After SCAO review, follow any district or county acceptance steps they facilitate.",
  ],
  references: [
    {
      label: "Minnesota course sponsor approval process",
      href: "https://mncourts.gov/help-topics/parent-education/course-sponsor-approval-process",
    },
    {
      label: "Minnesota parent education minimum standards",
      href: "https://mncourts.gov/mncourtsgov/media/ECM-ENE/Order-Amending-Parent-Education-Minimum-Standards-03-21-12-sfs.pdf",
    },
    {
      label: "Minnesota parent education overview",
      href: "https://mncourts.gov/help-topics/parent-education",
    },
    {
      label: "Minnesota parent education contact form",
      href: "https://mncourts.gov/help-topics/parent-education/contact",
    },
    {
      label: "Minnesota State Law Library",
      href: "https://mn.gov/law-library/",
    },
    {
      label: "Minnesota Day One resource listing",
      href: "https://mn.gov/adresources/search/ee4c0dfa-9c1a-5296-9de4-14c7160b96e3/",
    },
  ] as MinnesotaParentEducationReference[],
} as const
