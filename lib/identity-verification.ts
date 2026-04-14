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
    helpText:
      "Enter your legal first name exactly as you want it on your course record.",
  },
  {
    id: "lastName",
    prompt: "Last name",
    helpText:
      "Enter your legal last name exactly as you want it on your course record.",
  },
  {
    id: "dateOfBirth",
    prompt: "Date of birth",
    helpText: "Use the student's date of birth.",
  },
  {
    id: "driversLicenseNumber",
    prompt: "Virginia DMV customer number or out-of-state license number",
    helpText:
      "Enter the student's Virginia DMV-issued customer number or, for an out-of-state student, the driver's license number.",
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

export const IDENTITY_VERIFICATION_QUESTIONS_ES: IdentityVerificationQuestion[] =
  [
    {
      id: "firstName",
      prompt: "Nombre",
      helpText:
        "Ingresa tu nombre legal exactamente como quieres que aparezca en tu registro del curso.",
    },
    {
      id: "lastName",
      prompt: "Apellido",
      helpText:
        "Ingresa tu apellido legal exactamente como quieres que aparezca en tu registro del curso.",
    },
    {
      id: "dateOfBirth",
      prompt: "Fecha de nacimiento",
      helpText: "Usa la fecha de nacimiento del estudiante.",
    },
    {
      id: "driversLicenseNumber",
      prompt: "Numero de cliente del DMV de Virginia o licencia de otro estado",
      helpText:
        "Ingresa el numero de cliente emitido por el DMV de Virginia o, si es de otro estado, el numero de licencia de conducir.",
    },
    {
      id: "securityQuestion1",
      prompt: "Pregunta de seguridad 1",
      helpText: "Crea una pregunta que solo el estudiante deba saber.",
    },
    {
      id: "securityAnswer1",
      prompt: "Respuesta a la pregunta de seguridad 1",
      helpText: "Guarda la respuesta exacta para la verificación futura.",
    },
    {
      id: "securityQuestion2",
      prompt: "Pregunta de seguridad 2",
      helpText: "Crea una segunda pregunta que solo el estudiante deba saber.",
    },
    {
      id: "securityAnswer2",
      prompt: "Respuesta a la pregunta de seguridad 2",
      helpText: "Guarda la respuesta exacta para la verificación futura.",
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

export function getIdentityVerificationStorageKey(
  state: string,
  userId?: string | null
) {
  const normalizedUserId =
    typeof userId === "string" && userId.trim().length > 0
      ? userId.trim().toLowerCase()
      : "anonymous"

  return `identity-verification-${state.toLowerCase()}-${normalizedUserId}`
}
