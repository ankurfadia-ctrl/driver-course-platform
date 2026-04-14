// lib/certificate-reference.ts

import type { SupabaseClient } from "@supabase/supabase-js"

export function normalizeCertificateState(state: string) {
  return String(state ?? "").trim().toUpperCase()
}

function sanitizeTokenPart(value: string) {
  return String(value ?? "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
}

function simpleHash(input: string) {
  let hash = 0

  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }

  return hash.toString(36).toUpperCase().padStart(7, "0").slice(0, 7)
}

/**
 * Build deterministic certificate ID (fallback only)
 */
export function buildCertificateReference({
  state,
  courseSlug,
  userId,
  examResultId,
  completedAt,
}: {
  state: string
  courseSlug?: string
  userId: string
  examResultId: string
  completedAt: string
}) {
  const normalizedState = normalizeCertificateState(state)
  const completedDate = new Date(completedAt)

  const year = Number.isNaN(completedDate.getTime())
    ? "0000"
    : String(completedDate.getUTCFullYear())

  const token = simpleHash(
    `${normalizedState}|${courseSlug ?? "driver-improvement"}|${userId}|${examResultId}|${completedAt}`
  )

  return `${normalizedState}-${year}-${token}`
}

/**
 * NEW: Get or create certificate_id in DB (source of truth)
 */
export async function getOrCreateCertificateId({
  supabase,
  examResultId,
  state,
  courseSlug,
  userId,
  completedAt,
}: {
  supabase: SupabaseClient
  examResultId: string
  state: string
  courseSlug?: string
  userId: string
  completedAt: string
}) {
  // 1. Check if already exists
  const { data: existing, error: fetchError } = await supabase
    .from("exam_results")
    .select("certificate_id")
    .eq("id", examResultId)
    .single()

  if (fetchError) {
    console.error("Error fetching certificate_id:", fetchError)
  }

  if (existing?.certificate_id) {
    return existing.certificate_id
  }

  // 2. Generate new one
  const newId = buildCertificateReference({
    state,
    courseSlug,
    userId,
    examResultId,
    completedAt,
  })

  // 3. Save it
  const { error: updateError } = await supabase
    .from("exam_results")
    .update({ certificate_id: newId })
    .eq("id", examResultId)

  if (updateError) {
    console.error("Error saving certificate_id:", updateError)
  }

  return newId
}

export function formatCertificateCompletionDate(value: string | null | undefined) {
  if (!value) {
    return ""
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getCertificateVerificationPath(reference: string) {
  const safeReference = sanitizeTokenPart(reference.replace(/-/g, ""))
  return `/verify/${safeReference}`
}
