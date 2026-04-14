export type FloridaParentEducationModule = {
  id: number
  title: string
  durationMinutes: number
  primaryRuleTopic: string
  summary: string
  activities: string[]
}

export type FloridaParentEducationLearningObjective = {
  objective: string
  mappedTopic: string
  modules: string[]
}

export type FloridaParentEducationCertificateField = {
  label: string
  sample: string
}

export const FLORIDA_PARENT_EDUCATION_GUIDEBOOK = {
  officialCourseName: "Parent Education and Family Stabilization Course",
  sampleCurriculumName: "Florida Co-Parenting Foundations",
  totalMinutes: 240,
  instructionMinutes: 210,
  finalAssessmentMinutes: 30,
  passingScorePercent: 70,
  instructorResponseWindow: "1 business day",
  identityControl:
    "Identity must be verified before the completion certificate is issued.",
  modules: [
    {
      id: 1,
      title: "Module 1 - Course orientation and divorce as loss",
      durationMinutes: 40,
      primaryRuleTopic: "Divorce as loss",
      summary:
        "Introduces the course, explains the disclaimer and support boundaries, and frames divorce as a family-structure loss that affects both adults and children while preserving the continuing parental role.",
      activities: [
        "Orientation checkpoint and course expectations",
        "Reflection exercise on family transition and loss responses",
        "Short scenario identifying healthy versus unhealthy adjustment patterns",
      ],
    },
    {
      id: 2,
      title: "Module 2 - Permanency of parental role and shared parenting",
      durationMinutes: 30,
      primaryRuleTopic: "Permanency of parental role / shared parenting",
      summary:
        "Explains how children benefit from continuing relationships with both parents and how parents can support stability, consistency, and child-focused decision-making after separation.",
      activities: [
        "Shared-parenting expectations worksheet",
        "Child-needs planning exercise",
      ],
    },
    {
      id: 3,
      title: "Module 3 - Developmental stages of childhood",
      durationMinutes: 30,
      primaryRuleTopic: "Developmental stages of childhood",
      summary:
        "Shows how children at different developmental stages process conflict and separation differently, what parents can do to reduce harm, and when outside help may be needed.",
      activities: [
        "Age-based developmental needs comparison",
        "Warning-sign review for when a child needs added support",
      ],
    },
    {
      id: 4,
      title: "Module 4 - Communicating with children",
      durationMinutes: 25,
      primaryRuleTopic: "Communicating with the children in a divorce situation",
      summary:
        "Covers how to discuss divorce and parenting changes with children in an age-appropriate way while reducing guilt, confusion, and loyalty conflicts.",
      activities: [
        "Conversation planning prompt for explaining family changes",
        "Child-centered language exercise",
      ],
    },
    {
      id: 5,
      title: "Module 5 - Communicating with the other parent",
      durationMinutes: 30,
      primaryRuleTopic: "Communicating with the other parent",
      summary:
        "Focuses on reducing children's exposure to adult conflict, keeping children out of the middle, and building lower-conflict communication habits with the other parent.",
      activities: [
        "Conflict-escalation versus conflict-reduction examples",
        "Message-rewrite exercise for co-parent communication",
      ],
    },
    {
      id: 6,
      title: "Module 6 - Abuse, safety, and reporting responsibilities",
      durationMinutes: 25,
      primaryRuleTopic: "Abuse",
      summary:
        "Explains domestic-violence power and control dynamics, child abuse and neglect reporting responsibilities, the Florida Abuse Hotline, and the statewide domestic-violence hotline.",
      activities: [
        "Safety-planning review",
        "Resource identification exercise",
      ],
    },
    {
      id: 7,
      title: "Module 7 - Legal concepts, parenting time, and financial responsibilities",
      durationMinutes: 30,
      primaryRuleTopic: "Legal concepts and parenting time",
      summary:
        "Provides general Florida family-law concepts, child-focused parenting-time planning, and an overview of parents' financial responsibilities without giving individual legal advice.",
      activities: [
        "Parenting-plan discussion prompts",
        "Financial responsibility review checklist",
      ],
    },
    {
      id: 8,
      title: "Module 8 - Course review and final assessment",
      durationMinutes: 30,
      primaryRuleTopic: "End-of-course review and test",
      summary:
        "Reviews the course, checks understanding of the major family-stabilization concepts, and administers the end-of-course assessment.",
      activities: [
        "Knowledge review checkpoint",
        "Final assessment with remediation links for missed questions",
      ],
    },
  ] as FloridaParentEducationModule[],
  learningObjectives: [
    {
      objective:
        "Explain how divorce and separation affect adults, children, and the family structure, while reinforcing that the parental role continues after the legal relationship changes.",
      mappedTopic: "Divorce as loss",
      modules: ["Module 1"],
    },
    {
      objective:
        "Describe how children benefit from ongoing support from both parents and identify shared-parenting habits that improve stability and reduce child stress.",
      mappedTopic: "Permanency of parental role / shared parenting",
      modules: ["Module 2"],
    },
    {
      objective:
        "Recognize major developmental differences among children and adapt parenting responses to a child's developmental stage and support needs.",
      mappedTopic: "Developmental stages of childhood",
      modules: ["Module 3", "Module 4"],
    },
    {
      objective:
        "Use age-appropriate communication strategies to discuss divorce, parenting-time changes, and household transitions with children.",
      mappedTopic: "Communicating with children in a divorce situation",
      modules: ["Module 4"],
    },
    {
      objective:
        "Reduce children's exposure to parental conflict by using lower-conflict communication practices with the other parent and by keeping children out of the middle.",
      mappedTopic: "Communicating with the other parent",
      modules: ["Module 5"],
    },
    {
      objective:
        "Identify domestic-violence and child-abuse safety concerns, know where to find Florida hotline resources, and understand when mandatory reporting concepts arise.",
      mappedTopic: "Abuse",
      modules: ["Module 6"],
    },
    {
      objective:
        "Summarize general Florida family-law concepts, parenting-time planning principles, and the financial responsibilities parents continue to owe their children.",
      mappedTopic: "Legal concepts and parenting time",
      modules: ["Module 7"],
    },
    {
      objective:
        "Demonstrate comprehension of the course material by completing the final assessment at a passing level and reviewing missed material when needed.",
      mappedTopic: "End-of-course review and test",
      modules: ["Module 8"],
    },
  ] as FloridaParentEducationLearningObjective[],
  requiredDisclaimers: {
    mentalHealth:
      "The components of the parenting course are intended for educational purposes only. The presentation of this material is not intended to constitute mental health therapy, give information on specific mental health disorders nor medications to treat mental health disorders. Participants are encouraged to discuss specific mental health questions with a licensed health therapist of their choice.",
    legal:
      "The legal components of the parenting course shall provide general Florida family law principles. The presentation of this material is not intended to constitute legal advice and the course material must direct the participant to consult with a licensed attorney for answers to specific legal questions.",
  },
  finalTestPolicy: [
    "The end-of-course test is designed to measure comprehension of the learning objectives.",
    "Passing score: at least 70 percent.",
    "Participants have an unlimited number of attempts to pass the end-of-course test.",
    "If a participant scores below 70 percent, the missed material must be reviewed before the participant retakes the test.",
    "No additional fee should be charged for additional time or instruction needed to pass the end-of-course test.",
  ],
  certificateFields: [
    {
      label: "Course name",
      sample: "Parent Education and Family Stabilization Course",
    },
    {
      label: "Unique curriculum name",
      sample: "Florida Co-Parenting Foundations",
    },
    {
      label: "Course administrator and contact information",
      sample:
        "Florida Co-Parenting Foundations | (703) 574-0146 | admin@vadriverimprovementcourse.com",
    },
    {
      label: "Participant name",
      sample: "Sample Participant",
    },
    {
      label: "Date course began",
      sample: "April 7, 2026",
    },
    {
      label: "Date course finished",
      sample: "April 8, 2026",
    },
    {
      label: "Certificate verification id",
      sample: "FL-PEFS-2026-0001",
    },
  ] as FloridaParentEducationCertificateField[],
  authenticityWorkflow: [
    "Assign a unique certificate verification ID to each completion record.",
    "Retain participant completion records and copies of issued certificates for at least 5 years.",
    "Maintain a verification workflow through admin support so courts or participants can confirm authenticity.",
    "Do not issue the certificate until seat-time, identity, and passing-score requirements are satisfied.",
  ],
  keyTerms: [
    "Shared parenting",
    "Parental responsibility",
    "Parenting time",
    "Domestic violence",
    "Child abuse",
    "Neglect",
    "Developmental stage",
    "Conflict resolution",
  ],
} as const
