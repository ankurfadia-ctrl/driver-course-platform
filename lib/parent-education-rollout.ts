export type ParentEducationReference = {
  label: string
  href: string
}

export type ParentEducationState = {
  state: string
  recommendation: string
  status: "best" | "good" | "medium" | "poor"
  summary: string
  approvalPath: string
  onlineRules: string[]
  whyItMatters: string
  references: ParentEducationReference[]
}

export const PARENT_EDUCATION_ROLLOUT = {
  title: "Parent Education / Co-Parenting Rollout",
  summary:
    "Court-required parent education is a better near-term regulatory course than generic compliance content because the customer already has a court reason to buy and the approval paths are often explicit.",
  recommendedOrder: [
    "Florida parent education / family stabilization first.",
    "South Dakota parenting class second.",
    "Minnesota parent education third.",
    "New York only after the first two lanes are assembled.",
  ],
  strategyNotes: [
    "Keep this as a separate court-course lane from Florida BDI so approval packets, curriculum, certificate logic, and support SOPs do not get mixed together.",
    "Build one bilingual co-parenting curriculum core, then add state overlays for duration, certificate fields, domestic-violence safety language, and filing/reporting workflow.",
    "Treat Utah and similar single-provider or highly centralized systems as poor targets for now.",
  ],
  nextActions: [
    "Wait for Florida DCF review and keep the reviewer-access package ready if they ask for protected online access.",
    "Print, sign, and mail the South Dakota request packet outlining the program and cost, then save proof of mailing.",
    "Watch the Minnesota Parent Education Program inbox, keep the submitted packet and public Minnesota microsite stable, and respond quickly if SCAO asks for clarifications or additional materials.",
    "Hold New York until the first two filings are packaged because it has a heavier certification and review process.",
  ],
  states: [
    {
      state: "Florida",
      recommendation: "Best first filing",
      status: "best",
      summary:
        "Florida has the clearest statewide approval lane. DCF approves providers and curriculum, the review window is stated, the approval term is long enough to matter commercially, and the online rules are explicit.",
      approvalPath:
        "Provider approval runs through the Florida Department of Children and Families under the Parent Education and Family Stabilization framework.",
      onlineRules: [
        "Course must be at least 4 hours.",
        "Internet and correspondence delivery are explicitly contemplated statewide.",
        "Instructor questions must be answered within 1 business day.",
        "Identity verification and a passing final test are required before certificate issuance.",
      ],
      whyItMatters:
        "This is the strongest first court-course lane because the packet can be standardized and reused.",
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
      ],
    },
    {
      state: "South Dakota",
      recommendation: "Best second filing",
      status: "good",
      summary:
        "South Dakota is appealing because the state court system openly lists approved parenting classes, the approval request looks lightweight compared with larger states, and the initial mailing packet can stay concise.",
      approvalPath:
        "The State Court Administrator's Office certifies approved parenting courses, and the court website says providers can request to be added by submitting a letter outlining the program and its cost.",
      onlineRules: [
        "The course is mandatory in child-custody or parenting-time actions.",
        "Each party must complete it within 60 days unless waived for good cause.",
        "Only providers on the court-approved list are accepted.",
        "Approved courses must cover the impact of proceedings on children, co-parenting skills, conflict resolution, and financial responsibilities.",
      ],
      whyItMatters:
        "This is the cleanest second approval lane after Florida because the route to approval appears direct, the court website is explicit, and the packet can be mailed now without building another large regulator bundle first.",
      references: [
        {
          label: "South Dakota parenting classes",
          href: "https://ujs.sd.gov/programs-services/parenting-coordinators-and-classes/parenting-classes/",
        },
        {
          label: "South Dakota parenting coordinators and classes",
          href: "https://ujs.sd.gov/programs-services/parenting-coordinators-and-classes/",
        },
      ],
    },
    {
      state: "Minnesota",
      recommendation: "Promising third lane",
      status: "good",
      summary:
        "Minnesota accepts online programs, allows for-profit providers, and has public minimum standards, but approval happens through the State Court Administrator's Office and then local acceptance by district or county. The lane now has a submitted packet and a public Minnesota-facing microsite instead of a placeholder note.",
      approvalPath:
        "New courses are reviewed first through the State Court Administrator's Office and then approved for local acceptance in each judicial district or county.",
      onlineRules: [
        "Online and in-person programs are both acceptable.",
        "Programs should be 4 to 8 hours.",
        "Sliding fee scale is required, and some participants are fee-exempt.",
        "Out-of-state providers must explain how Minnesota-specific legal and community-resource content will be covered.",
      ],
      whyItMatters:
        "Minnesota is viable and commercially interesting, but it is more operationally layered than Florida or South Dakota because it adds Minnesota-specific curriculum requirements plus a local-acceptance layer after SCAO review.",
      references: [
        {
          label: "Minnesota course sponsor approval process",
          href: "https://mncourts.gov/help-topics/parent-education/course-sponsor-approval-process",
        },
        {
          label: "Minnesota parent education minimum standards",
          href: "https://mncourts.gov/mncourtsgov/media/ECM-ENE/Order-Amending-Parent-Education-Minimum-Standards-03-21-12-sfs.pdf",
        },
      ],
    },
    {
      state: "New York",
      recommendation: "Later, heavier certification",
      status: "medium",
      summary:
        "New York has a real statewide court-referred parent education system and certified provider list, but provider certification is more formal and includes a stronger review structure than Florida or South Dakota.",
      approvalPath:
        "Programs must be certified by the Office of Court Administration under Part 144, and certified providers are placed on the statewide provider list used for court referrals.",
      onlineRules: [
        "The program is child-centered and sensitive to domestic-violence concerns.",
        "Providers are certified by the Office of Court Administration.",
        "Approved providers may receive court referrals and may advertise that they are certified by OCA.",
      ],
      whyItMatters:
        "New York is a serious market, but it is not the easiest place to start if the goal is speed to first approval.",
      references: [
        {
          label: "NY Parent Education and Awareness Program overview",
          href: "https://ww2.nycourts.gov/ip/parent-ed/index.shtml",
        },
        {
          label: "22 NYCRR Part 144",
          href: "https://ww2.nycourts.gov/rules/chiefadmin/144.shtml",
        },
        {
          label: "PEAP procedures and updates form",
          href: "https://www.nycourts.gov/LegacyPDFS/IP/parent-ed/ProceduresforAdministrationofPEAP.2024.pdf",
        },
      ],
    },
    {
      state: "Utah",
      recommendation: "Avoid for now",
      status: "poor",
      summary:
        "Utah requires parenting classes in family cases, but the Utah courts state that Utah State University is the only court-approved online provider.",
      approvalPath:
        "The court system points parents to court-approved providers and specifically states that Utah State University is the only court-approved online provider.",
      onlineRules: [
        "The court requires approved classes before final orders in covered cases.",
        "The online provider path is already occupied by a named court-approved provider.",
      ],
      whyItMatters:
        "This is not a good target for a new online entrant right now.",
      references: [
        {
          label: "Utah required classes for parents",
          href: "https://www.utcourts.gov/en/self-help/case-categories/family/dived.html",
        },
      ],
    },
  ] as ParentEducationState[],
} as const
