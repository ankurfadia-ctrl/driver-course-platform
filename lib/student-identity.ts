// lib/student-identity.ts

import { createClient } from "@/lib/supabase/client"
import type { IdentityVerificationAnswerSet } from "@/lib/identity-verification"

export type StudentIdentityProfileRow = {
  id: string
  user_id: string
  state: string
  first_name: string
  last_name: string
  date_of_birth: string
  drivers_license_number: string
  security_question_1: string
  security_answer_1: string
  security_question_2: string
  security_answer_2: string
  created_at: string
  updated_at: string
}

export async function saveStudentIdentityProfile({
  state,
  answers,
}: {
  state: string
  answers: IdentityVerificationAnswerSet
}) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!user) throw new Error("User not authenticated")

  const payload = {
    user_id: user.id,
    state,
    first_name: answers.firstName,
    last_name: answers.lastName,
    date_of_birth: answers.dateOfBirth,
    drivers_license_number: answers.driversLicenseNumber,
    security_question_1: answers.securityQuestion1,
    security_answer_1: answers.securityAnswer1,
    security_question_2: answers.securityQuestion2,
    security_answer_2: answers.securityAnswer2,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from("student_identity_profiles")
    .upsert(payload, { onConflict: "user_id,state" })

  if (error) throw error
}

export async function getStudentIdentityProfile(state: string) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!user) return null

  const { data, error } = await supabase
    .from("student_identity_profiles")
    .select("*")
    .eq("user_id", user.id)
    .eq("state", state)
    .maybeSingle()

  if (error) throw error

  return data as StudentIdentityProfileRow | null
}

export async function hasStudentIdentityProfile(state: string) {
  const profile = await getStudentIdentityProfile(state)
  return Boolean(profile)
}
