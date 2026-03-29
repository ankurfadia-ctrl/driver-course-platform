"use client"

import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"
import {
  getReasonForAttendingLabel,
  isCourtRelatedReason,
  REASON_FOR_ATTENDING_OPTIONS,
  type ReasonForAttendingCode,
} from "@/lib/student-attendance"

export default function LoginPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const language = usePreferredSiteLanguageClient()
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
          formTitleLogin: "Iniciar sesion",
          formTitleSignup: "Crear cuenta",
          formBodyLogin:
            "Accede a tu panel de estudiante y continua donde lo dejaste.",
          formBodySignup:
            "Crea una cuenta nueva de estudiante para este curso estatal.",
          approvalLabel: "Aprobacion pendiente",
          approvalBody:
            `La aceptacion y elegibilidad del curso pueden depender del requisito especifico del estudiante en ${config.stateName}. Revisa la informacion del curso antes de inscribirte o depender de la finalizacion.`,
          infoCta: "Leer informacion del curso",
          email: "Correo electronico",
          password: "Contrasena",
          loginLoading: "Iniciando sesion...",
          signupLoading: "Creando cuenta...",
          loginCta: "Iniciar sesion",
          signupCta: "Crear cuenta",
          newStudent: "Eres estudiante nuevo?",
          createAccount: "Crear una cuenta",
          existingStudent: "Ya tienes una cuenta?",
          loginLink: "Iniciar sesion",
          plansLink: "Ver planes del curso",
          loginSuccess: "Inicio de sesion correcto. Redirigiendo...",
          signupSuccess:
            "Cuenta creada. Revisa tu correo y confirma tu direccion antes de iniciar sesion.",
          signupSuccessNoConfirm:
            "Cuenta creada correctamente. Ya puedes iniciar sesion.",
          reasonLabel: "Motivo de asistencia",
          reasonPlaceholder: "Selecciona un motivo",
          courtName: "Nombre del tribunal",
          caseOrTicketNumber: "Numero de caso o multa",
          courtDocumentNotes: "Notas del documento judicial",
          courtDocumentHelp:
            "Si el tribunal te entrego una orden o documento, agrega aqui los detalles que te ayudaran a encontrarlo.",
          accuracyLabel:
            "Confirmo que la informacion de identidad e inscripcion es correcta y entiendo que los errores pueden impedir la finalizacion, el certificado o el credito informado.",
          reasonRequired: "Selecciona un motivo de asistencia antes de crear la cuenta.",
          courtFieldsRequired:
            "Completa la informacion del tribunal antes de crear la cuenta.",
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
          reasonLabel: "Reason for attending",
          reasonPlaceholder: "Select a reason",
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
        }

  const requestedMode = searchParams.get("mode") === "signup" ? "signup" : "login"
  const [mode, setMode] = useState<"login" | "signup">(requestedMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [reasonForAttending, setReasonForAttending] =
    useState<ReasonForAttendingCode | "">("")
  const [courtName, setCourtName] = useState("")
  const [caseOrTicketNumber, setCaseOrTicketNumber] = useState("")
  const [courtDocumentNotes, setCourtDocumentNotes] = useState("")
  const [accuracyConfirmed, setAccuracyConfirmed] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMode(requestedMode)
    setMessage("")
  }, [requestedMode])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

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
        router.push(`/${state}/dashboard`)
        router.refresh()
        return
      }

      if (!reasonForAttending) {
        setMessage(copy.reasonRequired)
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

      const origin =
        typeof window !== "undefined" ? window.location.origin : ""
      const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim()
      const redirectBaseUrl =
        configuredBaseUrl && /^https?:\/\//.test(configuredBaseUrl)
          ? configuredBaseUrl.replace(/\/$/, "")
          : origin

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            driverCourseProfile: {
              reasonForAttending,
              reasonForAttendingLabel: getReasonForAttendingLabel(reasonForAttending),
              courtName: isCourtRelatedReason(reasonForAttending) ? courtName.trim() : "",
              caseOrTicketNumber: isCourtRelatedReason(reasonForAttending)
                ? caseOrTicketNumber.trim()
                : "",
              courtDocumentNotes: isCourtRelatedReason(reasonForAttending)
                ? courtDocumentNotes.trim()
                : "",
              accuracyAcknowledged: accuracyConfirmed,
              accuracyAcknowledgedAt: new Date().toISOString(),
            },
          },
          emailRedirectTo: redirectBaseUrl
            ? `${redirectBaseUrl}/${state}/dashboard`
            : undefined,
        },
      })

      if (error) {
        setMessage(error.message)
        return
      }

      setPassword("")
      setMessage(
        data.session ? copy.signupSuccessNoConfirm : copy.signupSuccess
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
          <div className="section-label">{copy.sectionLabel}</div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            {mode === "login" ? copy.heroTitleLogin : copy.heroTitleSignup}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            {mode === "login" ? copy.heroBodyLogin : copy.heroBodySignup}
          </p>

          <div className="mt-8 grid gap-4">
            {copy.heroItems.map((item) => (
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
              {mode === "login" ? copy.formTitleLogin : copy.formTitleSignup}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {mode === "login" ? copy.formBodyLogin : copy.formBodySignup}
            </p>
          </div>

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
              <>
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
                        ? option.value === "court-required"
                          ? "Requerido por tribunal"
                          : option.value === "court-voluntary"
                          ? "Relacionado con tribunal / voluntario"
                          : option.value === "dmv"
                          ? "Relacionado con DMV"
                          : option.value === "insurance"
                          ? "Relacionado con seguro"
                          : option.value === "employer"
                          ? "Relacionado con empleador"
                          : "Mejora personal"
                        : option.label}
                    </option>
                  ))}
                </select>

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

          <div className="mt-6">
            <Link
              href={`/${state}/checkout`}
              className="text-sm font-medium text-slate-600 underline"
            >
              {copy.plansLink}
            </Link>
          </div>

          {message ? (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {message}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
