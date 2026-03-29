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
}

export type SupportAssistantResponse = {
  summary: string
  suggestedSteps: string[]
  escalationRecommended: boolean
  escalationReason: string | null
}

function normalizeText(value: string) {
  return String(value ?? "").trim().toLowerCase()
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword))
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
  const category =
    input.category === "other"
      ? inferSupportCategoryFromText(`${input.subject} ${input.message}`)
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
