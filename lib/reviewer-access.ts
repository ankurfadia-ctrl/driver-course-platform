function normalizeEmail(value: string) {
  return String(value ?? "").trim().toLowerCase()
}

export function getReviewerEmails() {
  return String(process.env.REVIEWER_EMAILS ?? "")
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean)
}

export function isReviewerEmail(email: string | null | undefined) {
  if (!email) {
    return false
  }

  return getReviewerEmails().includes(normalizeEmail(email))
}
