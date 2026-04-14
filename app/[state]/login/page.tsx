"use client"

import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"
import { formatPriceFromCents, getCoursePlans } from "@/lib/payment/plans"
import {
  getReasonForAttendingDescription,
  isCourtRelatedReason,
  REASON_FOR_ATTENDING_OPTIONS,
  type ReasonForAttendingCode,
} from "@/lib/student-attendance"

function isBelowVirginiaLearnersPermitAge(dateOfBirth: string) {
  if (!dateOfBirth) return false

  const dob = new Date(dateOfBirth)

  if (Number.isNaN(dob.getTime())) {
    return false
  }

  const today = new Date()
  const minimumDate = new Date(today)
  minimumDate.setFullYear(minimumDate.getFullYear() - 15)
  minimumDate.setMonth(minimumDate.getMonth() - 6)

  return dob > minimumDate
}

function getSafeNextPath(state: string, nextPath: string | null) {
  const defaultPath = `/${state}/dashboard`

  if (!nextPath || !nextPath.startsWith("/")) {
    return defaultPath
  }

  if (nextPath === `/${state}` || nextPath.startsWith(`/${state}/`)) {
    return nextPath
  }

  return defaultPath
}

export default function LoginPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const rawNextPath = searchParams.get("next")
  const reason = searchParams.get("reason")
  const isReviewerAccess = reason === "reviewer"
  const safeNextPath = getSafeNextPath(state, rawNextPath)
  const allowRestrictedLogin = isReviewerAccess || Boolean(rawNextPath)
  const secondarySupportPhoneDisplay = config.secondarySupportPhoneDisplay ?? null
  const enrollmentOpen = config.enrollmentOpen
  const language = usePreferredSiteLanguageClient()
  const secondarySupportPhoneLabel =
    language === "es" ? "Linea gratuita alternativa" : "Toll-free alternate line"
  const secondarySupportPhoneSummary =
    language === "es"
      ? "Contacto alternativo requerido por Virginia"
      : "Virginia-required alternate contact"
  const copy =
    language === "es"
      ? {
          sectionLabel: `${config.stateName} acceso para estudiantes`,
          heroTitleLogin: "Vuelve a tu curso.",
          heroTitleSignup: "Crea tu cuenta de estudiante.",
          heroBodyLogin:
            "Accede a tu panel, progreso del curso, examen final y certificado desde una sola cuenta.",
          heroBodySignup:
            "Crea una cuenta de estudiante para comprar acceso y completar el curso.",
          heroItems: [
            "Ingreso de estudiantes y acceso al panel",
            "Progreso del curso, examen y certificado vinculados a una sola cuenta",
            "Acceso a soporte durante el curso",
          ],
          formTitleLogin: "Iniciar sesión",
          formTitleSignup: "Crear cuenta",
          formBodyLogin:
            "Accede a tu panel de estudiante y continua donde lo dejaste.",
          formBodySignup:
            "Crea una cuenta nueva de estudiante para este curso estatal.",
          approvalLabel: "Aprobacion pendiente",
          approvalBody:
            `La aceptación y elegibilidad del curso pueden depender del requisito especifico del estudiante en ${config.stateName}. Revisa la información del curso antes de inscribirte o depender de la finalización.`,
          infoCta: "Leer información del curso",
          email: "Correo electronico",
          password: "Contrasena",
          confirmPassword: "Confirmar contrasena",
          forgotPassword: "Olvide mi contrasena",
          recoverTitle: "Recuperar acceso",
          recoverBody:
            "Ingresa tu correo electronico y te enviaremos un enlace para restablecer tu contrasena.",
          recoverCta: "Enviar enlace de restablecimiento",
          recoverLoading: "Enviando enlace...",
          recoverSuccess:
            "Si existe una cuenta para ese correo, te enviamos un enlace para restablecer la contrasena.",
          recoverCancel: "Volver al inicio de sesión",
          recoverNeedEmail:
            "Ingresa tu correo electronico primero para enviarte un enlace de restablecimiento.",
          loginLoading: "Iniciando sesión...",
          signupLoading: "Creando cuenta...",
          loginCta: "Iniciar sesión",
          signupCta: "Crear cuenta",
          newStudent: "Eres estudiante nuevo?",
          createAccount: "Crear una cuenta",
          existingStudent: "Ya tienes una cuenta?",
          loginLink: "Iniciar sesión",
          plansLink: "Ver planes del curso",
          loginSuccess: "Inicio de sesión correcto. Redirigiendo...",
          signupSuccess:
            "Cuenta creada. Revisa tu correo y confirma tu direccion antes de iniciar sesión.",
          signupSuccessNoConfirm:
            "Cuenta creada correctamente. Ya puedes iniciar sesión.",
          signupNextStepsTitle: "Siguiente paso",
          signupNextStepsConfirm:
            "Revisa tu correo electronico y haz clic en el enlace de confirmacion para activar tu cuenta.",
          signupNextStepsLogin:
            "Después de confirmar tu correo, vuelve aqui e inicia sesión para comenzar el curso.",
          signupNextStepsNoConfirm:
            "Tu cuenta ya esta lista. Inicia sesión para continuar al panel del curso.",
          reasonLabel: "Motivo de asistencia",
          reasonPlaceholder: "Selecciona un motivo",
          reasonHelp:
            "Elige la opción que mejor coincida con el motivo oficial por el que tomas el curso.",
          firstName: "Nombre legal",
          middleName: "Segundo nombre legal",
          lastName: "Apellido legal",
          dateOfBirth: "Fecha de nacimiento",
          dateOfBirthHelp:
            "Los cursos de mejoramiento pueden tomarse en linea a cualquier edad, pero los estudiantes deben confirmar que son elegibles para su requisito especifico en Virginia.",
          underageNotice:
            "Esta fecha de nacimiento parece estar por debajo de la edad minima de permiso de aprendizaje de Virginia (15 anos y 6 meses). Verifica la elegibilidad antes de inscribirte.",
          driversLicenseNumber:
            "Numero de cliente del DMV de Virginia o numero de licencia de otro estado",
          driversLicenseHelp:
            "Los estudiantes de Virginia deben ingresar su numero de cliente emitido por el DMV. Los estudiantes de otros estados deben ingresar su numero de licencia.",
          courtName: "Nombre del tribunal",
          caseOrTicketNumber: "Numero de caso o multa",
          courtDocumentNotes: "Notas del documento judicial",
          courtDocumentHelp:
            "Si el tribunal te entrego una orden o documento, agrega aqui los detalles que te ayudaran a encontrarlo.",
          accuracyLabel:
            "Confirmo que mi información de identidad e inscripción es correcta y entiendo que los errores pueden impedir la finalización, el certificado o el credito informado.",
          reasonRequired: "Selecciona un motivo de asistencia antes de crear la cuenta.",
          courtFieldsRequired:
            "Completa la información del tribunal antes de crear la cuenta.",
          identityFieldsRequired:
            "Completa tu nombre legal, fecha de nacimiento y numero de cliente del DMV o numero de licencia antes de crear la cuenta.",
          passwordMismatch:
            "La confirmacion de la contrasena no coincide. Escribe la misma contrasena en ambos campos antes de crear la cuenta.",
          registrationTitle: "Antes de inscribirte",
          registrationBody:
            secondarySupportPhoneDisplay
              ? "Antes de crear tu cuenta, puedes revisar el nombre del curso, la linea principal, la tarifa actual y la información necesaria para inscribirte. Los detalles de contacto alternativo requeridos por Virginia aparecen mas abajo."
              : "Antes de crear tu cuenta, puedes revisar el nombre del curso, el telefono de contacto, la tarifa actual y la información necesaria para inscribirte.",
          providerNameLabel: "Proveedor",
          providerPhoneLabel: `Linea principal de ${config.stateName}`,
          feeLabel: "Tarifa del curso",
          vendorLinkLabel: "Informacion del proveedor del plan de estudios",
          vendorLinkCta: "Leer información del curso",
          onlineOnlyNotice:
            "El curso y el examen final deben completarse en linea a traves de este portal. No se permite examen en papel.",
        }
      : {
          sectionLabel: `${config.stateName} Student Access`,
          heroTitleLogin: "Return to your course.",
          heroTitleSignup: "Create your student account.",
          heroBodyLogin:
            "Access your dashboard, course progress, final exam, and certificate from one student account.",
          heroBodySignup:
            "Create a student account to purchase access and complete the course.",
          heroItems: [
            "Student login and dashboard access",
            "Course progress, exam, and certificate tied to one account",
            "Support access during the course",
          ],
          formTitleLogin: "Log in",
          formTitleSignup: "Create account",
          formBodyLogin:
            "Access your student dashboard and continue where you left off.",
          formBodySignup:
            "Create a new student account for this state course.",
          approvalLabel: config.approvalStatusLabel,
          approvalBody:
            `Course acceptance and eligibility may depend on the student's specific ${config.stateName} requirement. Review the course disclosures before enrolling or relying on completion.`,
          infoCta: "Read course information",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm password",
          forgotPassword: "Forgot password?",
          recoverTitle: "Recover account access",
          recoverBody:
            "Enter your email and we will send you a password reset link.",
          recoverCta: "Send reset link",
          recoverLoading: "Sending reset link...",
          recoverSuccess:
            "If an account exists for that email, a password reset link has been sent.",
          recoverCancel: "Back to login",
          recoverNeedEmail:
            "Enter your email first so we can send you a password reset link.",
          loginLoading: "Logging in...",
          signupLoading: "Creating account...",
          loginCta: "Log in",
          signupCta: "Create account",
          newStudent: "New student?",
          createAccount: "Create an account",
          existingStudent: "Already have an account?",
          loginLink: "Log in",
          plansLink: "View course plans",
          loginSuccess: "Login successful. Redirecting...",
          signupSuccess:
            "Account created. Check your email and confirm your address before logging in.",
          signupSuccessNoConfirm:
            "Account created successfully. You can log in now.",
          signupNextStepsTitle: "Next step",
          signupNextStepsConfirm:
            "Check your email and click the confirmation link to activate your account.",
          signupNextStepsLogin:
            "After confirming your email, return here and log in to begin your course.",
          signupNextStepsNoConfirm:
            "Your account is already ready. Log in to continue to your course dashboard.",
          reasonLabel: "Reason for attending",
          reasonPlaceholder: "Select a reason",
          reasonHelp:
            "Choose the option that best matches your official reason for taking the course.",
          firstName: "Legal first name",
          middleName: "Legal middle name",
          lastName: "Legal last name",
          dateOfBirth: "Date of birth",
          dateOfBirthHelp:
            "Driver improvement courses may be completed online regardless of age, but students must confirm eligibility for their specific Virginia requirement before enrolling.",
          underageNotice:
            "This birth date appears to be below Virginia's learner's permit minimum age of 15 years and 6 months. Confirm eligibility before enrolling.",
          driversLicenseNumber:
            "Virginia DMV customer number or out-of-state license number",
          driversLicenseHelp:
            "Virginia students should enter their DMV-issued customer number. Out-of-state students should enter their driver's license number.",
          courtName: "Court name",
          caseOrTicketNumber: "Case or ticket number",
          courtDocumentNotes: "Court document notes",
          courtDocumentHelp:
            "If the court gave you an order or document, add the details here so the provider can match your record later.",
          accuracyLabel:
            "I confirm that my identity and enrollment information is accurate and understand that incorrect, incomplete, or misleading information may prevent course completion, certificate use, or reporting credit.",
          reasonRequired: "Select a reason for attending before creating the account.",
          courtFieldsRequired:
            "Complete the court information before creating the account.",
          identityFieldsRequired:
            "Complete your legal name, date of birth, and DMV customer number or out-of-state license number before creating the account.",
          passwordMismatch:
            "Your password confirmation does not match. Enter the same password in both fields before creating your account.",
          registrationTitle: "Before you enroll",
          registrationBody:
            secondarySupportPhoneDisplay
              ? "Before creating your account, you can review the course name, the primary line, the current course fee, and the information you need to enroll. Virginia-required alternate contact details appear further below."
              : "Before creating your account, you can review the course name, the contact phone number, the current course fee, and the information needed to enroll.",
          providerNameLabel: "Provider",
          providerPhoneLabel: `${config.stateName} primary line`,
          feeLabel: "Course fee",
          vendorLinkLabel: "Curriculum vendor information",
          vendorLinkCta: "Read course information",
          onlineOnlyNotice:
            "The course and final test must be completed online through this portal. No paper test is permitted.",
        }

  const requestedMode =
    isReviewerAccess || searchParams.get("mode") !== "signup"
      ? "login"
      : "signup"
  const [mode, setMode] = useState<"login" | "signup">(requestedMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [reasonForAttending, setReasonForAttending] =
    useState<ReasonForAttendingCode | "">("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [driversLicenseNumber, setDriversLicenseNumber] = useState("")
  const [courtName, setCourtName] = useState("")
  const [caseOrTicketNumber, setCaseOrTicketNumber] = useState("")
  const [courtDocumentNotes, setCourtDocumentNotes] = useState("")
  const [accuracyConfirmed, setAccuracyConfirmed] = useState(false)
  const [message, setMessage] = useState("")
  const [signupCreated, setSignupCreated] = useState(false)
  const [signupNeedsEmailConfirm, setSignupNeedsEmailConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sendingRecovery, setSendingRecovery] = useState(false)
  const [showRecoveryForm, setShowRecoveryForm] = useState(false)
  const heroTitle = isReviewerAccess
    ? language === "es"
      ? "Abrir el portal de revision."
      : "Open the reviewer portal."
    : mode === "login"
      ? copy.heroTitleLogin
      : copy.heroTitleSignup
  const heroBody = isReviewerAccess
    ? language === "es"
      ? "Inicia sesión con el correo autorizado del revisor para abrir el acceso protegido y revisar los materiales del curso sin exponer herramientas administrativas ni datos de estudiantes."
      : "Sign in with the authorized reviewer email to open the protected review environment and inspect the course materials without exposing admin tools or student data."
    : mode === "login"
      ? copy.heroBodyLogin
      : copy.heroBodySignup
  const heroItems = isReviewerAccess
    ? [
        "Protected reviewer-only access path",
        "No purchase requirement and no live student data exposure",
        "Direct return to the requested reviewer page after sign-in",
      ]
    : copy.heroItems
  const formTitle = isReviewerAccess
    ? language === "es"
      ? "Ingreso de revisor"
      : "Reviewer sign in"
    : mode === "login"
      ? copy.formTitleLogin
      : copy.formTitleSignup
  const formBody = isReviewerAccess
    ? language === "es"
      ? "Usa las credenciales del revisor aprovisionado para abrir la ruta protegida de revision."
      : "Use the provisioned reviewer credentials to open the protected review route."
    : mode === "login"
      ? copy.formBodyLogin
      : copy.formBodySignup
  const showUnderageWarning = mode === "signup" && isBelowVirginiaLearnersPermitAge(dateOfBirth)
  const courseFeeSummary = useMemo(() => {
    const fullCoursePlans = getCoursePlans(state).filter(
      (plan) => plan.planKind === "full-course"
    )

    if (fullCoursePlans.length === 0) {
      return ""
    }

    return fullCoursePlans
      .map((plan) => `${plan.displayName}: ${formatPriceFromCents(plan.priceCents)}`)
      .join(" | ")
  }, [state])

  useEffect(() => {
    setMode(requestedMode)
    setMessage("")
    setSignupCreated(false)
    setSignupNeedsEmailConfirm(false)
    setConfirmPassword("")
  }, [requestedMode])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setSignupCreated(false)
    setSignupNeedsEmailConfirm(false)

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setMessage(error.message)
          return
        }

        setMessage(copy.loginSuccess)
        router.push(safeNextPath)
        router.refresh()
        return
      }

      if (!reasonForAttending) {
        setMessage(copy.reasonRequired)
        return
      }

      if (password !== confirmPassword) {
        setMessage(copy.passwordMismatch)
        return
      }

      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !dateOfBirth.trim() ||
        !driversLicenseNumber.trim()
      ) {
        setMessage(copy.identityFieldsRequired)
        return
      }

      if (
        isCourtRelatedReason(reasonForAttending) &&
        (!courtName.trim() || !caseOrTicketNumber.trim())
      ) {
        setMessage(copy.courtFieldsRequired)
        return
      }

      if (!accuracyConfirmed) {
        setMessage(copy.accuracyLabel)
        return
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state,
          email,
          password,
          reasonForAttending,
          firstName,
          middleName,
          lastName,
          dateOfBirth,
          driversLicenseNumber,
          courtName,
          caseOrTicketNumber,
          courtDocumentNotes,
          accuracyConfirmed,
        }),
      })

      const result = (await response.json()) as {
        ok?: boolean
        error?: string
        message?: string
        requiresEmailConfirmation?: boolean
      }

      if (!response.ok || !result.ok) {
        setMessage(result.error ?? "Could not create your account.")
        return
      }

      setPassword("")
      setConfirmPassword("")
      setSignupCreated(true)
      setSignupNeedsEmailConfirm(Boolean(result.requiresEmailConfirmation))
      setMessage(
        result.message ??
          (result.requiresEmailConfirmation
            ? copy.signupSuccess
            : copy.signupSuccessNoConfirm)
      )
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordRecovery() {
    if (!email.trim()) {
      setMessage(copy.recoverNeedEmail)
      return
    }

    setSendingRecovery(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state,
          email: email.trim(),
        }),
      })
      const result = (await response.json()) as {
        ok?: boolean
        error?: string
        message?: string
      }

      if (!response.ok || !result.ok) {
        setMessage(result.error ?? "Could not send the reset email.")
        return
      }

      setMessage(result.message ?? copy.recoverSuccess)
      setShowRecoveryForm(false)
    } finally {
      setSendingRecovery(false)
    }
  }

  if (!enrollmentOpen && !allowRestrictedLogin) {
    return (
      <main className="min-h-screen px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl space-y-6">
          <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
            <div className="section-label">{copy.sectionLabel}</div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              {language === "es"
                ? `La inscripción para ${config.stateName} aun no esta abierta.`
                : `${config.stateName} enrollment is not open yet.`}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {language === "es"
                ? `La creacion de cuentas para ${config.stateName} se abrira cuando la inscripción este disponible.`
                : `${config.stateName} student account creation will open when enrollment becomes available.`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={getDisclosuresRoute(state)}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {copy.infoCta}
              </Link>
              <Link
                href={`/${state}`}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {language === "es" ? `Volver a ${config.stateName}` : `Back to ${config.stateName}`}
              </Link>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
          <div className="section-label">{copy.sectionLabel}</div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            {heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            {heroBody}
          </p>

          <div className="mt-8 grid gap-4">
            {heroItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] bg-white p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-slate-950">
              {formTitle}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {formBody}
            </p>
          </div>

          {isReviewerAccess ? (
            <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-slate-700">
              <div className="font-semibold uppercase tracking-[0.16em] text-blue-700">
                Restricted reviewer access
              </div>
              <p className="mt-3">
                This sign-in flow is reserved for authorized reviewer and admin
                email addresses. Public enrollment may remain closed while
                reviewer access stays available for regulator review.
              </p>
            </div>
          ) : null}

          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-slate-700">
            <div className="font-semibold uppercase tracking-[0.16em] text-amber-700">
              {copy.approvalLabel}
            </div>
            <p className="mt-3 leading-7">{copy.approvalBody}</p>
            <Link
              href={getDisclosuresRoute(state)}
              className="mt-4 inline-flex rounded-xl border border-amber-300 bg-white px-4 py-2 font-semibold text-amber-900 hover:bg-amber-100"
            >
              {copy.infoCta}
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={copy.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              required
              autoComplete="email"
            />

            <input
              type="password"
              placeholder={copy.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />

            {mode === "signup" ? (
              <input
                type="password"
                placeholder={copy.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                required
                autoComplete="new-password"
              />
            ) : null}

            {mode === "login" ? (
              <div className="-mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowRecoveryForm((current) => !current)
                    setMessage("")
                  }}
                  className="text-sm font-semibold text-blue-600 underline"
                >
                  {copy.forgotPassword}
                </button>
              </div>
            ) : null}

            {mode === "login" && showRecoveryForm ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-semibold text-slate-900">
                  {copy.recoverTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {copy.recoverBody}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => void handlePasswordRecovery()}
                    disabled={sendingRecovery}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {sendingRecovery ? copy.recoverLoading : copy.recoverCta}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRecoveryForm(false)
                      setMessage("")
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {copy.recoverCancel}
                  </button>
                </div>
              </div>
            ) : null}

            {mode === "signup" ? (
              <>
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-900">
                  <div className="font-semibold text-slate-900">
                    {copy.registrationTitle}
                  </div>
                  <p className="mt-2">{copy.registrationBody}</p>
                  <p className="mt-2">
                    <span className="font-semibold">{copy.providerNameLabel}:</span>{" "}
                    {config.brandName}
                  </p>
                  <p>
                    <span className="font-semibold">{copy.providerPhoneLabel}:</span>{" "}
                    {config.supportPhoneDisplay}
                  </p>
                  {secondarySupportPhoneDisplay ? (
                    <details className="mt-2 text-xs leading-6 text-slate-500">
                      <summary className="cursor-pointer list-none font-medium uppercase tracking-[0.14em] text-slate-400">
                        {secondarySupportPhoneSummary}
                      </summary>
                      <p className="mt-2">
                        <span className="font-semibold">{secondarySupportPhoneLabel}:</span>{" "}
                        {secondarySupportPhoneDisplay}
                      </p>
                    </details>
                  ) : null}
                  <p>
                    <span className="font-semibold">{copy.feeLabel}:</span>{" "}
                    {courseFeeSummary}
                  </p>
                  <p className="mt-2">{copy.onlineOnlyNotice}</p>
                  <p className="mt-2">
                    <span className="font-semibold">{copy.vendorLinkLabel}:</span>{" "}
                    <Link
                      href={getDisclosuresRoute(state)}
                      className="font-semibold underline decoration-blue-300 underline-offset-4"
                    >
                      {copy.vendorLinkCta}
                    </Link>
                  </p>
                </div>

                <select
                  value={reasonForAttending}
                  onChange={(e) =>
                    setReasonForAttending(e.target.value as ReasonForAttendingCode | "")
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  required
                >
                  <option value="">{copy.reasonPlaceholder}</option>
                  {REASON_FOR_ATTENDING_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {language === "es"
                        ? option.value === "COU"
                          ? "Requerido por tribunal (COU)"
                          : option.value === "DMV"
                          ? "Requerido por DMV (DMV)"
                          : option.value === "INS"
                          ? "Seguro (INS)"
                          : option.value === "VOL"
                          ? "Voluntario / personal (VOL)"
                          : option.value === "CMC"
                          ? "Conductor comercial requerido por tribunal (CMC)"
                          : option.value === "CMD"
                          ? "Conductor comercial requerido por DMV (CMD)"
                          : "Conductor comercial voluntario (CMV)"
                        : option.label}
                    </option>
                  ))}
                </select>
                <p className="-mt-2 text-xs leading-6 text-slate-500">
                  {copy.reasonHelp}
                </p>

                {reasonForAttending ? (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
                    {getReasonForAttendingDescription(reasonForAttending)}
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder={copy.firstName}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                    required
                  />

                  <input
                    type="text"
                    placeholder={copy.middleName}
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                  />

                  <input
                    type="text"
                    placeholder={copy.lastName}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">{copy.dateOfBirth}</span>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                      required
                    />
                    <span className="mt-2 block text-xs leading-6 text-slate-500">
                      {copy.dateOfBirthHelp}
                    </span>
                    {showUnderageWarning ? (
                      <span className="mt-2 block rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-6 text-amber-800">
                        {copy.underageNotice}
                      </span>
                    ) : null}
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">{copy.driversLicenseNumber}</span>
                    <input
                      type="text"
                      placeholder={copy.driversLicenseNumber}
                      value={driversLicenseNumber}
                      onChange={(e) => setDriversLicenseNumber(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                      required
                    />
                    <span className="mt-2 block text-xs leading-6 text-slate-500">
                      {copy.driversLicenseHelp}
                    </span>
                  </label>
                </div>

                {isCourtRelatedReason(reasonForAttending) ? (
                  <>
                    <input
                      type="text"
                      placeholder={copy.courtName}
                      value={courtName}
                      onChange={(e) => setCourtName(e.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                      required
                    />

                    <input
                      type="text"
                      placeholder={copy.caseOrTicketNumber}
                      value={caseOrTicketNumber}
                      onChange={(e) => setCaseOrTicketNumber(e.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                      required
                    />

                    <textarea
                      placeholder={copy.courtDocumentNotes}
                      value={courtDocumentNotes}
                      onChange={(e) => setCourtDocumentNotes(e.target.value)}
                      className="min-h-28 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                    />
                    <p className="-mt-2 text-xs leading-6 text-slate-500">
                      {copy.courtDocumentHelp}
                    </p>
                  </>
                ) : null}

                <label className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                  <input
                    type="checkbox"
                    checked={accuracyConfirmed}
                    onChange={(e) => setAccuracyConfirmed(e.target.checked)}
                    className="mr-3 mt-1 align-top"
                  />
                  <span>{copy.accuracyLabel}</span>
                </label>
              </>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading
                ? mode === "login"
                  ? copy.loginLoading
                  : copy.signupLoading
                : mode === "login"
                ? copy.loginCta
                : copy.signupCta}
            </button>
          </form>

          {mode === "signup" && signupCreated ? (
            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm leading-7 text-green-900">
              <div className="font-semibold uppercase tracking-[0.16em] text-green-700">
                {copy.signupNextStepsTitle}
              </div>
              <p className="mt-3">{message}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>
                  {signupNeedsEmailConfirm
                    ? copy.signupNextStepsConfirm
                    : copy.signupNextStepsNoConfirm}
                </li>
                {signupNeedsEmailConfirm ? (
                  <li>{copy.signupNextStepsLogin}</li>
                ) : null}
              </ul>
            </div>
          ) : null}

          {!isReviewerAccess ? (
            <div className="mt-5 text-sm text-slate-600">
              {mode === "login" ? (
                <p>
                  {copy.newStudent}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup")
                      setMessage("")
                      router.replace(`/${state}/login?mode=signup`)
                    }}
                    className="font-semibold text-blue-600 underline"
                  >
                    {copy.createAccount}
                  </button>
                </p>
              ) : (
                <p>
                  {copy.existingStudent}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login")
                      setMessage("")
                      router.replace(`/${state}/login`)
                    }}
                    className="font-semibold text-blue-600 underline"
                  >
                    {copy.loginLink}
                  </button>
                </p>
              )}
            </div>
          ) : null}

          {!isReviewerAccess ? (
            <div className="mt-6">
              <Link
                href={`/${state}/checkout`}
                className="text-sm font-medium text-slate-600 underline"
              >
                {copy.plansLink}
              </Link>
            </div>
          ) : null}

          {message && !(mode === "signup" && signupCreated) ? (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {message}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
