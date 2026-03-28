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
    marketingHeadline: "Complete your Virginia driver improvement course online in a structured 8-hour format.",
    marketingDescription:
      "An online Virginia driver improvement course with student login, secure checkout, progress tracking, final exam controls, certificate delivery, and support tools.",
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
        title: "Court and eligibility responsibility",
        body:
          "Students are responsible for confirming that an online Virginia driver improvement course is acceptable for their specific court, employer, insurance, or DMV requirement before enrolling.",
      },
      {
        title: "Course timing expectations",
        body:
          "Virginia online driver improvement programs are expected to include at least eight hours of instruction. Students should expect seat-time controls, activity monitoring, and completion tracking as part of the course workflow.",
      },
      {
        title: "Identity verification",
        body:
          "Identity verification may be required before course milestones, during the course, and before or during the final exam. A student who cannot complete identity validation may be prevented from finishing the course.",
      },
      {
        title: "Final exam attempts",
        body:
          "Virginia online final exam rules may limit the exam to one attempt per business day. Students should be prepared to complete the exam personally and remain on the exam page throughout the attempt.",
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
        "A multistate-ready driver improvement platform with checkout, lessons, seat-time tracking, final exam, certificate delivery, and support workflows.",
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

export function getFaqRoute(state: string) {
  return getStateRoute(state, "faq")
}

export function getLessonLinks(state: string, lessonCount = 8): LessonLink[] {
  return Array.from({ length: lessonCount }, (_, index) => ({
    id: index + 1,
    title: `Lesson ${index + 1}`,
    href: getLessonRoute(state, index + 1),
  }))
}
