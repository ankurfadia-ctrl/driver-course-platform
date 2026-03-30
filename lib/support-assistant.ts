import { findSupportFaqMatch } from "@/lib/support-faq"
import type { SiteLanguage } from "@/lib/site-language"

export type SupportCategory =
  | "course-access"
  | "seat-time"
  | "final-exam"
  | "certificate"
  | "technical"
  | "other"

export type SupportAssistantInput = {
  state: string
  category: SupportCategory
  subject: string
  message: string
  language?: SiteLanguage
}

export type SupportAssistantResponse = {
  summary: string
  suggestedSteps: string[]
  escalationRecommended: boolean
  escalationReason: string | null
}

function normalizeText(value: string) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword))
}

function buildDirectQuestionResponse(
  state: string,
  text: string,
  language: SiteLanguage = "en"
): SupportAssistantResponse | null {
  const stateName = titleCaseState(state)
  const faqMatch = findSupportFaqMatch(text, language)

  if (faqMatch) {
    return {
      summary: faqMatch.answer,
      suggestedSteps: [],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "refund",
      "money back",
      "want my money back",
      "get a refund",
      "refund policy",
    ])
  ) {
    return {
      summary:
        "Refund requests are reviewed under the course refund policy. Refunds may be reviewed before meaningful course use, but purchases are generally not refundable after substantial course progress, final exam access, certificate issuance, or mailed-certificate fulfillment has begun.",
      suggestedSteps: [
        "Review the refunds page for the full policy.",
        "If you have not meaningfully used the course yet, send the request to support so it can be reviewed.",
        "If the request involves a mailed certificate or support upgrade, those add-ons are generally not refundable after purchase or fulfillment begins.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "price match",
      "match a price",
      "lower price",
      "cheaper price",
      "better price",
      "igualacion de precio",
    ])
  ) {
    return {
      summary:
        "Yes. If you find a lower publicly advertised price for an equivalent online driver improvement course for the same state, contact support before purchase and we will review it for a possible price match.",
      suggestedSteps: [
        "Send the competitor link before purchasing.",
        "Make sure the competing offer is for an equivalent online driver improvement course for the same state.",
        "Private coupon codes, expired promotions, bundles, hidden-fee offers, and nonequivalent courses are not included in price-match reviews.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "real person",
      "talk to a person",
      "human support",
      "talk to someone",
      "speak to someone",
      "real human",
    ])
  ) {
    return {
      summary:
        "Yes, with priority support. Standard plans use FAQ and AI chat only. Priority support includes human replies after AI help is tried first and is usually handled in less than 1 business day.",
      suggestedSteps: [
        "Use the AI chat first so the site can answer common questions immediately.",
        "If you want human help, upgrade to priority support.",
        "After upgrading, send the AI chat to support to open the human support thread.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "do i need to take the final",
      "do i have to take the final",
      "is the final required",
      "do i need the final exam",
      "do i have to take the final exam",
    ])
  ) {
    return {
      summary:
        `Yes. ${stateName} students must complete the lessons and pass the final exam before a certificate can be issued.`,
      suggestedSteps: [
        "Finish all required lessons first.",
        "Reach at least 7 hours of recorded course instruction so the final exam can unlock.",
        "Pass the final exam.",
        "Stay in the course until the full 8-hour minimum is complete before expecting your certificate.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "what score do i need",
      "what score do i have to get",
      "passing score",
      "what do i need to pass",
      "what score to pass the final",
    ])
  ) {
    return {
      summary:
        "You need a passing score on the final exam before your certificate can be issued.",
      suggestedSteps: [
        "Review your lessons before starting the final exam.",
        "If you do not pass, review the suggested lesson areas and return on the next business day.",
        "After passing, stay in the course until the full 8-hour minimum is complete.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "what happens if i fail",
      "if i fail the final",
      "failed the final",
      "fail the exam",
      "did not pass",
      "i failed",
      "failed exam",
    ])
  ) {
    return {
      summary:
        "If you do not pass the final exam, you need to review the course and wait until the next business day before beginning another attempt.",
      suggestedSteps: [
        "Use the failed-exam review guidance to revisit the suggested lessons.",
        "Wait until the retake time shown on the exam results page.",
        "Return on the next business day to try again.",
        "A certificate is not issued until the final exam is passed and the full 8-hour minimum is complete.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "do the quizzes count",
      "do quiz scores count",
      "does the quiz count",
      "are quizzes graded",
      "do quizzes affect my grade",
    ])
  ) {
    return {
      summary:
        "Lesson quizzes are for review and progress. Your certificate depends on completing the course requirements and passing the final exam.",
      suggestedSteps: [
        "Use quizzes to check your understanding as you move through the lessons.",
        "Complete all required lesson content.",
        "Pass the final exam before expecting a certificate.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "do i have to read all the pages",
      "do i need to read all the pages",
      "can i skip pages",
      "can i skip lessons",
      "do i have to complete all lessons",
    ])
  ) {
    return {
      summary:
        "Yes. You need to complete the course lessons and required seat time before the final exam and certificate can be completed.",
      suggestedSteps: [
        "Move through each lesson from the course page.",
        "Make sure every required lesson shows completed.",
        "Reach at least 7 hours before the final exam unlocks.",
        "Remain in the course until the full 8-hour minimum is complete.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  if (
    includesAny(text, [
      "will my certificate be sent automatically to dmv",
      "sent to dmv automatically",
      "does dmv get my certificate",
      "do you send to dmv",
      "is my completion sent to dmv",
      "will dmv get it",
    ])
  ) {
    return {
      summary:
        "Course completion reporting is handled after successful completion, but students should still confirm any court, DMV, or insurance requirements that apply to their situation.",
      suggestedSteps: [
        "Make sure your enrollment reason and any required court information are accurate.",
        "Complete the course, pass the final exam, and wait for your certificate to unlock.",
        "Keep a copy of your certificate for your records.",
      ],
      escalationRecommended: true,
      escalationReason:
        "DMV or court reporting questions may need case-specific review.",
    }
  }

  if (
    includesAny(text, [
      "what do i do after i finish",
      "after i finish the class",
      "what happens after i finish",
      "what next after i finish",
    ])
  ) {
    return {
      summary:
        "After finishing the class, pass the final exam, complete the full 8-hour minimum, and then open your certificate page.",
      suggestedSteps: [
        "Check that your final exam shows passed.",
        "If you passed before reaching 8 hours total, remain in the course until the remaining time is complete.",
        "Open the certificate page to view, download, or email your certificate.",
        "Keep your certificate for your records and confirm any outside submission requirements that apply to you.",
      ],
      escalationRecommended: false,
      escalationReason: null,
    }
  }

  return null
}

export function inferSupportCategoryFromText(text: string): SupportCategory {
  const combinedText = normalizeText(text)

  const mentionsTimerIssue = includesAny(combinedText, [
    "seat time",
    "timer",
    "time not moving",
    "time not updating",
    "clock",
    "hours",
  ])

  const mentionsLockedExam = includesAny(combinedText, [
    "exam locked",
    "final exam locked",
    "cannot start exam",
    "can't start exam",
    "locked out of exam",
    "final exam",
  ])

  const mentionsCertificateIssue = includesAny(combinedText, [
    "certificate",
    "download pdf",
    "download certificate",
    "completion certificate",
    "verify certificate",
  ])

  const mentionsLoginIssue = includesAny(combinedText, [
    "login",
    "log in",
    "sign in",
    "account",
    "access",
    "cannot enter",
    "can't enter",
    "password",
  ])

  const mentionsTechnicalIssue = includesAny(combinedText, [
    "error",
    "blank",
    "white screen",
    "not loading",
    "won't load",
    "broken",
    "bug",
    "issue",
    "problem",
  ])

  if (mentionsTimerIssue) return "seat-time"
  if (mentionsLockedExam) return "final-exam"
  if (mentionsCertificateIssue) return "certificate"
  if (mentionsLoginIssue) return "course-access"
  if (mentionsTechnicalIssue) return "technical"
  return "other"
}

function titleCaseState(state: string) {
  const value = String(state ?? "").trim()
  if (!value) return "Virginia"
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

function buildSeatTimeResponse(state: string): SupportAssistantResponse {
  const stateName = titleCaseState(state)

  return {
    summary:
      `${stateName} seat time is tracked across your course activity. The final exam unlocks after at least 7 hours of course instruction, and the certificate stays locked until the full 8-hour minimum is complete.`,
    suggestedSteps: [
      "Return to the course dashboard and confirm your seat time is still increasing.",
      "Continue moving through lesson pages while staying active on the course.",
      "The final exam can open before the full 8 hours, but the certificate will stay locked until the full minimum is reached.",
      "If the timer seems stuck, refresh once and sign back into the same account before checking again.",
      "If your dashboard still does not update, include the exact lesson/page where it stopped."
    ],
    escalationRecommended: false,
    escalationReason: null,
  }
}

function buildFinalExamResponse(): SupportAssistantResponse {
  return {
    summary:
      "The final exam is available only after all lessons are completed and at least 7 hours of course instruction have been recorded.",
    suggestedSteps: [
      "Check the course dashboard to confirm every lesson shows completed.",
      "Check that at least 7 hours of course instruction have been recorded.",
      "After passing the exam, remain in the course until the full 8-hour minimum is complete before expecting the certificate.",
      "Re-open the final exam from the dashboard after both requirements are satisfied.",
      "If the exam still appears locked, include a screenshot of the dashboard status."
    ],
    escalationRecommended: false,
    escalationReason: null,
  }
}

function buildCertificateResponse(): SupportAssistantResponse {
  return {
    summary:
      "Certificates unlock only after the full 8-hour minimum is complete and the final exam has been passed.",
    suggestedSteps: [
      "Confirm your final exam shows passed on the dashboard.",
      "If you passed early, remain in the course until the full 8-hour minimum is complete.",
      "Open the Certificate section on the dashboard and check whether it now shows available.",
      "Use View Certificate first, then Download PDF if needed.",
      "If the certificate is still locked after passing, include the score shown on your dashboard."
    ],
    escalationRecommended: false,
    escalationReason: null,
  }
}

function buildCourseAccessResponse(): SupportAssistantResponse {
  return {
    summary:
      "Most course access issues are caused by signing into a different account, stale browser state, or opening an old link.",
    suggestedSteps: [
      "Return to the main course dashboard and confirm you are signed into the correct account.",
      "Refresh the page once and reopen the course from the dashboard instead of an old browser tab.",
      "If login still fails, try a private/incognito window to rule out a browser session issue.",
      "Include the exact page you were trying to open and any error message shown."
    ],
    escalationRecommended: false,
    escalationReason: null,
  }
}

function buildTechnicalResponse(): SupportAssistantResponse {
  return {
    summary:
      "Technical issues can usually be resolved faster when the exact page, device, browser, and visible error are included.",
    suggestedSteps: [
      "Refresh the page once and retry the action.",
      "Try the same step in another browser or private/incognito window.",
      "Include your device type, browser, and the exact page where the issue happened.",
      "Include the exact text of any visible error message."
    ],
    escalationRecommended: true,
    escalationReason:
      "Technical issues may need manual review if the problem continues after basic troubleshooting.",
  }
}

function buildOtherResponse(): SupportAssistantResponse {
  return {
    summary:
      "Your question may need a closer review. Start by providing the exact page, what you expected to happen, and what happened instead.",
    suggestedSteps: [
      "Describe the exact page or step where the issue happened.",
      "Explain what you expected to happen.",
      "Explain what happened instead.",
      "Include any visible message, score, or certificate ID if relevant."
    ],
    escalationRecommended: true,
    escalationReason:
      "General questions often need manual review unless they clearly match a known issue.",
  }
}

export function getSupportAssistantResponse(
  input: SupportAssistantInput
): SupportAssistantResponse {
  const state = input.state
  const combinedText = normalizeText(`${input.subject} ${input.message}`)
  const directQuestionResponse = buildDirectQuestionResponse(
    state,
    combinedText,
    input.language ?? "en"
  )

  if (directQuestionResponse) {
    return directQuestionResponse
  }

  const category =
    input.category === "other"
      ? inferSupportCategoryFromText(combinedText)
      : input.category

  if (category === "seat-time") {
    return buildSeatTimeResponse(state)
  }

  if (category === "final-exam") {
    return buildFinalExamResponse()
  }

  if (category === "certificate") {
    return buildCertificateResponse()
  }

  if (category === "course-access") {
    return buildCourseAccessResponse()
  }

  if (category === "technical") {
    return buildTechnicalResponse()
  }

  return buildOtherResponse()
}
