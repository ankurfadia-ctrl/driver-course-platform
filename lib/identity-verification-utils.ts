// lib/identity-verification-utils.ts

import type { IdentityVerificationAnswerSet } from "@/lib/identity-verification"

export function normalizeVerificationValue(value: string) {
  return value.trim().toLowerCase()
}

export function normalizeLicenseValue(value: string) {
  return value.replace(/\s+/g, "").trim().toLowerCase()
}

export function isIdentityVerificationComplete(
  answers: IdentityVerificationAnswerSet | null | undefined
) {
  if (!answers) return false

  return Object.values(answers).every((value) => value.trim() !== "")
}

export function verifyIdentityAnswer(
  expected: string,
  actual: string,
  options?: { stripSpaces?: boolean }
) {
  if (options?.stripSpaces) {
    return normalizeLicenseValue(expected) === normalizeLicenseValue(actual)
  }

  return normalizeVerificationValue(expected) === normalizeVerificationValue(actual)
}

export function getMaskedLicenseNumber(value: string) {
  const cleaned = value.replace(/\s+/g, "").trim()

  if (cleaned.length <= 4) {
    return cleaned
  }

  return `${"*".repeat(cleaned.length - 4)}${cleaned.slice(-4)}`
}