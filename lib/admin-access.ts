function normalizeEmail(value: string) {
  return String(value ?? "").trim().toLowerCase()
}

export function getAdminEmails() {
  return String(process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false
  }

  return getAdminEmails().includes(normalizeEmail(email))
}
