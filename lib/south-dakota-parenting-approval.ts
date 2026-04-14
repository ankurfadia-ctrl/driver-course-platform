export type SouthDakotaParentingReference = {
  label: string
  href: string
}

export type SouthDakotaParentingPacketDocument = {
  name: string
  purpose: string
}

export const SOUTH_DAKOTA_PARENTING_APPROVAL = {
  title: "South Dakota Parenting Course Approval Packet",
  summary:
    "South Dakota's public court instructions say providers may request approval by submitting a letter outlining the program and its cost. The packet for that request is now assembled and ready for printing, signature, and mailing.",
  currentMove: "Print, sign, and mail the request packet",
  courseName: "South Dakota Co-Parenting Foundations",
  programProfile: [
    "Format: online self-paced parenting education course.",
    "Planned runtime: 240 minutes.",
    "Planned fee: $20 per participant.",
    "Completion artifact: certificate of completion with verification ID.",
    "Primary support: (703) 574-0146 and admin@vadriverimprovementcourse.com.",
  ],
  officialRulePoints: [
    "South Dakota law requires a court-approved parenting course in covered child-custody or parenting-time matters.",
    "The State Court Administrator's Office certifies approved courses.",
    "Approved courses may be provided by a public or private entity.",
    "The course must address the effects of separation or divorce on children, co-parenting skills and responsibilities, children's needs and coping techniques, conflict-resolution options, and financial responsibilities of parents.",
  ],
  contactBlock: [
    "South Dakota State Court Administrator's Office",
    "500 East Capitol Avenue",
    "Pierre, SD 57501",
    "Phone: 605-773-3474",
  ],
  draftAssumptions: [
    "Course-facing name: South Dakota Co-Parenting Foundations.",
    "Legal applicant entity: Driver Course Platform LLC.",
    "Mailing packet includes both the required request letter and concise support documents.",
    "Fee-waiver policy: no participant denied because of inability to pay; fee waiver or scholarship available on request for indigent parents.",
    "The request letter is intentionally sign-ready for physical mailing rather than electronically signed.",
  ],
  packetDocuments: [
    {
      name: "Request letter",
      purpose:
        "The official South Dakota ask to add the course to the approved parenting class list.",
    },
    {
      name: "Course summary and topic crosswalk",
      purpose:
        "Shows how the planned course covers the South Dakota topic categories listed on the court site.",
    },
    {
      name: "Pricing, fee waiver, and participant support policy",
      purpose:
        "Explains the $20 fee, hardship process, and participant support boundaries.",
    },
    {
      name: "Sample certificate of completion",
      purpose:
        "Shows what courts and participants would receive after course completion.",
    },
    {
      name: "Instructor and provider qualifications",
      purpose:
        "Gives a concise applicant background summary and identifies the legal entity only where needed.",
    },
    {
      name: "Mailing checklist",
      purpose:
        "Internal print-and-mail instructions so the packet can go out quickly.",
    },
  ] as SouthDakotaParentingPacketDocument[],
  mailingSteps: [
    "Print the request letter PDF and sign it by hand.",
    "Print the supporting packet PDFs or print the full packet PDF as a single bundle.",
    "Mail the packet to the State Court Administrator's Office in Pierre.",
    "Save a digital copy and record the mailing date and tracking number.",
    "Optionally call 605-773-3474 first to ask whether a scanned PDF packet can also be accepted by email.",
  ],
  letterParagraphs: [
    "Dear South Dakota State Court Administrator's Office,",
    "Ankur Fadia respectfully requests that the proposed online parenting education course, South Dakota Co-Parenting Foundations, be considered for addition to South Dakota's approved parenting class list for matters requiring a court-approved parenting course under SDCL 25-4A-32.",
    "The proposed program is a self-paced online parenting education course intended for parents involved in child-custody or parenting-time matters. The curriculum is designed to address the effects of separation or divorce on children, co-parenting skills and responsibilities, children's developmental and coping needs, communication and conflict-reduction strategies, options for resolving parenting disputes, and the continuing financial responsibilities of parents.",
    "The planned participant fee is $20 per person. A hardship-review and fee-waiver process is planned so that indigent parents are not denied access because of inability to pay.",
    "Participants who complete the course requirements will receive a certificate of completion for filing with the court. Completion records will be retained, and certificate authenticity can be verified upon request.",
    "Applicant contact information is as follows: Ankur Fadia, 775 Red Hill Rd, Fairfield, VA 24435, phone (703) 574-0146, email admin@vadriverimprovementcourse.com. The legal applicant entity is Driver Course Platform LLC.",
    "If there are additional submission requirements, preferred supporting materials, or a specific review process beyond this letter, please let us know and we will provide them promptly.",
    "Sincerely,",
    "Ankur Fadia",
    "Applicant contact",
  ],
  references: [
    {
      label: "South Dakota parenting classes",
      href: "https://ujs.sd.gov/programs-services/parenting-coordinators-and-classes/parenting-classes/",
    },
    {
      label: "State Court Administrator's Office",
      href: "https://ujs.sd.gov/about-us/state-court-administrators-office/",
    },
    {
      label: "SDCL 25-4A-32",
      href: "https://sdlegislature.gov/Statutes/25-4A-32",
    },
  ] as SouthDakotaParentingReference[],
} as const
