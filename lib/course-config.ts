// lib/course-config.ts

export type LessonLink = {
  id: number
  title: string
  href: string
}

export type StateDisclosureItem = {
  title: string
  body: string
}

export type StateCourseTrack = {
  code: string
  name: string
  audience: string
  status: "planned" | "criteria-requested" | "criteria-received" | "in-build" | "submitted" | "approved"
  notes: string
}

export type StateCourseConfig = {
  stateCode: string
  stateSlug: string
  stateName: string
  courseSlug: string
  siteTitle: string
  brandName: string
  courseName: string
  marketingHeadline: string
  marketingDescription: string
  certificateIssuerLine: string
  approvalStatusLabel: string
  disclosuresIntro: string
  disclosures: StateDisclosureItem[]
  dashboardLabel: string
  courseLabel: string
  certificateLabel: string
  finalExamLabel: string
  passingScorePercent: number
  finalExamQuestionCount: number
  logoSrc: string
  supportEmail: string
  supportPhone: string
  supportPhoneDisplay: string
  courseTracks?: StateCourseTrack[]
}

export const COURSE_CONFIGS: Record<string, StateCourseConfig> = {
  virginia: {
    stateCode: "VA",
    stateSlug: "virginia",
    stateName: "Virginia",
    courseSlug: "driver-improvement",
    siteTitle: "Virginia Driver Improvement Course",
    brandName: "Virginia Driver Improvement Course",
    courseName: "Virginia Driver Improvement Course",
    marketingHeadline: "Complete your Virginia driver improvement course online.",
    marketingDescription:
      "Online Virginia driver improvement course with secure enrollment, course progress, final exam completion, and certificate delivery.",
    certificateIssuerLine: "Virginia Driver Improvement Course Platform",
    approvalStatusLabel: "Approval pending",
    disclosuresIntro:
      "Review this Virginia course information before purchasing, enrolling, or relying on completion for court, employer, insurance, or DMV purposes.",
    disclosures: [
      {
        title: "Approval status",
        body:
          "Virginia DMV approval has not yet been granted. Students should review course information carefully and confirm acceptance for their specific requirement before enrolling or relying on completion.",
      },
      {
        title: "Provider contact information",
        body:
          "Online registration displays the provider name Virginia Driver Improvement Course and the provider toll-free telephone number (877) 798-0235.",
      },
      {
        title: "Court and eligibility responsibility",
        body:
          "Students are responsible for confirming that an online Virginia driver improvement course is acceptable for their specific court, employer, insurance, or DMV requirement before enrolling.",
      },
      {
        title: "Technology and independent use",
        body:
          "To benefit from the course, students must be able to work independently and be comfortable using a computer.",
      },
      {
        title: "Online-only administration",
        body:
          "The online driver improvement course and final test must be completed online through the provider portal. No paper test is permitted.",
      },
      {
        title: "Course timing expectations",
        body:
          "The online driver improvement clinic course is an eight-hour course, including the final test, and it must be completed in its entirety before a certificate of completion is issued. In this course, the final exam unlocks after at least seven hours of instruction and the certificate stays locked until the full eight-hour minimum is complete.",
      },
      {
        title: "Course completion window",
        body:
          "Students should plan to complete the course within 90 days of purchase. A court order or other outside requirement may impose an earlier deadline, and students remain responsible for meeting that deadline.",
      },
      {
        title: "Identity verification",
        body:
          "Identity verification is required throughout the course and before the final exam. A student who cannot complete identity validation may be prevented from finishing the course.",
      },
      {
        title: "Final exam attempts",
        body:
          "The final exam can be taken only once per business day. Students should be prepared to complete the exam personally and remain on the exam page throughout the attempt.",
      },
      {
        title: "Safe driving points",
        body:
          "Voluntary clinic completion may earn five safe driving points only once every 24 months. If attendance is court required, the court determines whether safe driving points are awarded, and the required court documentation must be provided before DMV can award those points.",
      },
      {
        title: "Certificate delivery timing",
        body:
          "The certificate of completion is electronically transmitted to successful students within 24 hours of course completion.",
      },
      {
        title: "Accepted proof of completion",
        body:
          "The DMV standardized Online Driver Improvement Clinic Certificate of Completion (DIC 552B) is the only document accepted by Virginia DMV and the courts as proof of completion of an online driver improvement clinic.",
      },
      {
        title: "Printed certificate requirements",
        body:
          "If the certificate is presented to DMV, it must be printed on 8 1/2 by 11 plain white bonded paper. DMV does not accept certificates printed on color or special designed paper, paper with advertising, or certificates altered in any way.",
      },
      {
        title: "DMV comments or concerns",
        body:
          "DMV is committed to promoting transportation safety through the certification of quality driver training programs. If students have comments or concerns about this course, they may call DMV at (1-877-885-5790).",
      },
      {
        title: "DMV operating certificate display",
        body:
          "Once DMV issues an online clinic operating certificate, a facsimile of that DMV certificate will be displayed as part of the validation and sign-in sequence as required.",
      },
      {
        title: "Support and record review",
        body:
          "Students should keep account details accurate and contact support promptly if they experience purchase, access, identity, exam, or certificate issues.",
      },
    ],
    dashboardLabel: "Dashboard",
    courseLabel: "Course",
    certificateLabel: "Certificate",
    finalExamLabel: "Final Exam",
    passingScorePercent: 80,
    finalExamQuestionCount: 50,
    logoSrc: "/logo.svg",
    supportEmail: "support@vadriverimprovementcourse.com",
    supportPhone: "8777980235",
    supportPhoneDisplay: "(877) 798-0235",
    courseTracks: [
      {
        code: "va-driver-improvement",
        name: "Virginia Driver Improvement Course",
        audience: "General Virginia driver improvement students",
        status: "submitted",
        notes: "Virginia packet has been submitted and is awaiting DMV review.",
      },
    ],
  },
  florida: {
    stateCode: "FL",
    stateSlug: "florida",
    stateName: "Florida",
    courseSlug: "driver-improvement",
    siteTitle: "Florida Driver Improvement Courses",
    brandName: "Florida Driver Improvement Courses",
    courseName: "Florida Driver Improvement Courses",
    marketingHeadline: "Prepare Florida driver improvement courses online.",
    marketingDescription:
      "Florida driver improvement platform scaffolding for BDI, ADI, TLSAE, and Mature Driver courses with secure enrollment, support, and approval-readiness planning.",
    certificateIssuerLine: "Florida Driver Improvement Course Platform",
    approvalStatusLabel: "Florida course criteria requested",
    disclosuresIntro:
      "Florida-specific course disclosures and official acceptance details will be finalized after FLHSMV returns the minimum course content criteria for each course type.",
    disclosures: [
      {
        title: "Florida development status",
        body:
          "Florida courses are not open for enrollment yet. FLHSMV minimum content criteria have been requested for BDI, ADI, TLSAE, and Mature Driver course types.",
      },
      {
        title: "Official course criteria",
        body:
          "Florida course content and provider submission materials will be finalized only after FLHSMV returns the official minimum course content criteria for each requested course type.",
      },
      {
        title: "State-specific acceptance",
        body:
          "Florida acceptance, reporting, certificate, and completion rules are state-specific and will be implemented according to FLHSMV guidance before launch.",
      },
    ],
    dashboardLabel: "Dashboard",
    courseLabel: "Course",
    certificateLabel: "Certificate",
    finalExamLabel: "Final Exam",
    passingScorePercent: 80,
    finalExamQuestionCount: 50,
    logoSrc: "/logo.svg",
    supportEmail: "support@vadriverimprovementcourse.com",
    supportPhone: "8777980235",
    supportPhoneDisplay: "(877) 798-0235",
    courseTracks: [
      {
        code: "fl-bdi",
        name: "Basic Driver Improvement (BDI)",
        audience: "General Florida driver improvement students",
        status: "criteria-requested",
        notes: "Best first Florida build because it is closest to the current Virginia-style product.",
      },
      {
        code: "fl-adi",
        name: "Advanced Driver Improvement (ADI)",
        audience: "Florida advanced/remedial driver improvement students",
        status: "criteria-requested",
        notes: "Planned second after BDI once FLHSMV criteria are received.",
      },
      {
        code: "fl-tlsae",
        name: "Traffic Law and Substance Abuse Education (TLSAE)",
        audience: "First-time Florida licensing and certain hardship reinstatement students",
        status: "criteria-requested",
        notes: "Florida-specific 4-hour course type with a different student story from BDI and ADI.",
      },
      {
        code: "fl-mature-driver",
        name: "Mature Driver Discount Insurance Course",
        audience: "Florida mature-driver insurance discount students",
        status: "criteria-requested",
        notes: "Useful future add-on product line after BDI, ADI, and TLSAE are mapped.",
      },
    ],
  },
}

export function getCourseConfig(state: string): StateCourseConfig {
  const normalizedState = state.toLowerCase()

  return (
    COURSE_CONFIGS[normalizedState] ?? {
      stateCode: normalizedState.slice(0, 2).toUpperCase(),
      stateSlug: normalizedState,
      stateName:
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1),
      courseSlug: "driver-improvement",
      siteTitle: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course`,
      brandName: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course`,
      courseName: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course`,
      marketingHeadline: `Complete your ${normalizedState} driver improvement course online.`,
      marketingDescription:
        "Online driver improvement course with secure enrollment, course progress, final exam completion, and certificate delivery.",
      certificateIssuerLine: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course Platform`,
      approvalStatusLabel: "Approval status varies by state",
      disclosuresIntro:
        "Review the course disclosures for this state before purchasing or enrolling.",
      disclosures: [
        {
          title: "State approval and eligibility",
          body:
            "Course approval, court acceptance, and reporting requirements vary by state. Students are responsible for confirming eligibility and acceptance before enrolling.",
        },
        {
          title: "Identity and completion controls",
          body:
            "Online driver improvement courses may require identity verification, seat-time tracking, and exam controls before a certificate can be issued.",
        },
      ],
      dashboardLabel: "Dashboard",
      courseLabel: "Course",
      certificateLabel: "Certificate",
      finalExamLabel: "Final Exam",
      passingScorePercent: 80,
      finalExamQuestionCount: 50,
      logoSrc: "/logo.svg",
      supportEmail: "support@vadriverimprovementcourse.com",
      supportPhone: "",
      supportPhoneDisplay: "",
    }
  )
}

export function getStateBasePath(state: string) {
  return `/${state.toLowerCase()}`
}

export function getStateRoute(state: string, path = "") {
  const cleanState = state.toLowerCase()
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return path ? `/${cleanState}${cleanPath}` : `/${cleanState}`
}

export function getLessonSlug(lessonNumber: number) {
  return `lesson-${lessonNumber}`
}

export function getLessonRoute(state: string, lessonNumber: number) {
  return getStateRoute(state, `course/${getLessonSlug(lessonNumber)}`)
}

export function getFinalExamRoute(state: string) {
  return getStateRoute(state, "course/final-exam")
}

export function getCertificateRoute(state: string) {
  return getStateRoute(state, "certificate")
}

export function getDashboardRoute(state: string) {
  return getStateRoute(state, "dashboard")
}

export function getCourseRoute(state: string) {
  return getStateRoute(state, "course")
}

export function getDisclosuresRoute(state: string) {
  return getStateRoute(state, "disclosures")
}

export function getPrivacyRoute(state: string) {
  return getStateRoute(state, "privacy")
}

export function getTermsRoute(state: string) {
  return getStateRoute(state, "terms")
}

export function getContactRoute(state: string) {
  return getStateRoute(state, "contact")
}

export function getRefundsRoute(state: string) {
  return getStateRoute(state, "refunds")
}

export function getFaqRoute(state: string) {
  return getStateRoute(state, "faq")
}

export function getSupportRoute(state: string) {
  return getStateRoute(state, "support")
}

export function getLessonLinks(state: string, lessonCount = 8): LessonLink[] {
  return Array.from({ length: lessonCount }, (_, index) => ({
    id: index + 1,
    title: `Lesson ${index + 1}`,
    href: getLessonRoute(state, index + 1),
  }))
}
