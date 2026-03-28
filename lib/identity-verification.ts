// lib/identity-verification.ts

export type IdentityVerificationQuestion = {
  id: string
  prompt: string
  helpText: string
}

export type IdentityVerificationAnswerSet = {
  firstName: string
  lastName: string
  dateOfBirth: string
  driversLicenseNumber: string
  securityQuestion1: string
  securityAnswer1: string
  securityQuestion2: string
  securityAnswer2: string
}

export const IDENTITY_VERIFICATION_QUESTIONS: IdentityVerificationQuestion[] = [
  {
    id: "firstName",
    prompt: "First name",
    helpText: "Enter your legal first name exactly as you want it on your course record.",
  },
  {
    id: "lastName",
    prompt: "Last name",
    helpText: "Enter your legal last name exactly as you want it on your course record.",
  },
  {
    id: "dateOfBirth",
    prompt: "Date of birth",
    helpText: "Use the student’s date of birth.",
  },
  {
    id: "driversLicenseNumber",
    prompt: "Driver's license number",
    helpText: "Enter the student’s driver’s license number.",
  },
  {
    id: "securityQuestion1",
    prompt: "Security question 1",
    helpText: "Create a question only the student should know.",
  },
  {
    id: "securityAnswer1",
    prompt: "Answer to security question 1",
    helpText: "Store the exact answer for later identity verification.",
  },
  {
    id: "securityQuestion2",
    prompt: "Security question 2",
    helpText: "Create a second question only the student should know.",
  },
  {
    id: "securityAnswer2",
    prompt: "Answer to security question 2",
    helpText: "Store the exact answer for later identity verification.",
  },
]

export const EMPTY_IDENTITY_VERIFICATION_ANSWERS: IdentityVerificationAnswerSet =
  {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    driversLicenseNumber: "",
    securityQuestion1: "",
    securityAnswer1: "",
    securityQuestion2: "",
    securityAnswer2: "",
  }

export function getIdentityVerificationStorageKey(state: string) {
  return `identity-verification-${state.toLowerCase()}`
}