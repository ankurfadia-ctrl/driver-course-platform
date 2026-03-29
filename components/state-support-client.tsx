"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  getSupportAssistantResponse,
  type SupportCategory,
} from "@/lib/support-assistant"
import { createSupportRequest } from "@/lib/support-requests"
import { getCourseAccessStatus } from "@/lib/course-access"
import type { SiteLanguage } from "@/lib/site-language"
import type { SupportRequestWithThread } from "@/lib/support-thread"
import {
  loadStudentSupportThreads,
  sendStudentSupportReply,
} from "@/lib/support-thread-client"

function getSupportCopy(language: SiteLanguage, stateName: string) {
  if (language === "es") {
    return {
      sectionLabel: `Soporte para estudiantes de ${stateName}`,
      title: "Ayuda y soporte",
      intro:
        "La mayoria de los problemas se resuelven al instante. Solo los casos mas complejos necesitan revision adicional.",
      commonQuestions: "Preguntas comunes",
      commonQuestionsBody:
        "Muchos problemas se resuelven con la guia instantanea que aparece mientras escribes.",
      commonItems: [
        [
          "Por que esta bloqueado mi examen final?",
          "El examen final permanece bloqueado hasta que todas las lecciones se completen y se cumpla el tiempo requerido del curso.",
        ],
        [
          "Por que esta bloqueado mi certificado?",
          "Tu certificado solo se habilita cuando completas el tiempo requerido del curso y apruebas el examen final.",
        ],
        [
          "Por que mi temporizador aun no termina?",
          "El tiempo del curso se registra segun tu actividad. Sigue avanzando por las lecciones y permanece activo en las paginas del curso hasta completar el tiempo requerido.",
        ],
      ] as const,
      quickLinks: "Enlaces rapidos",
      courseDashboard: "Panel del curso",
      finalExam: "Examen final",
      certificate: "Certificado",
      askQuestion: "Haz una pregunta",
      askQuestionBody:
        'Describe tu problema abajo. Incluso mensajes cortos como "examen bloqueado" funcionan.',
      bilingualNote:
        "La ayuda instantanea y el contenido del curso pueden seguir apareciendo en ingles mientras ampliamos el soporte bilingue.",
      category: "Categoria",
      subject: "Asunto",
      subjectPlaceholder: "Ejemplo: Examen bloqueado",
      message: "Mensaje",
      messagePlaceholder: "Describe tu problema",
      needMoreText:
        "Ingresa al menos 5 caracteres entre Asunto o Mensaje para recibir una respuesta instantanea.",
      instantAnswer: "Respuesta sugerida al instante",
      suggestedSteps: "Pasos sugeridos",
      tryTheseSteps: "Prueba estos pasos:",
      checkingSupport: "Verificando opciones de soporte...",
      priorityTitle: "Solicitud de soporte prioritario",
      priorityBody:
        "Tu plan incluye soporte prioritario. Marca esta solicitud si necesitas una revision mas rapida.",
      standardTitle: "Soporte estandar",
      standardBody:
        "Empieza aqui para recibir ayuda instantanea y revision estandar. La prioridad solo esta disponible con un plan de soporte prioritario.",
      upgradeTitle: "Necesitas una respuesta mas rapida?",
      upgradeBody:
        "Si ya compraste el plan estandar, puedes mejorar a soporte prioritario desde la pagina de pago.",
      upgradeCta: "Mejorar a soporte prioritario",
      submit: "Enviar solicitud de soporte",
      saving: "Guardando...",
      saveError:
        "No se pudo guardar tu solicitud. Intentalo de nuevo.",
      submitted: "Solicitud enviada",
      submittedTitle: "Tu solicitud ha sido guardada",
      submittedBody:
        "Muchos problemas se resuelven con los pasos instantaneos mostrados arriba. Los casos no resueltos pueden revisarse despues.",
      priorityRequested: "Se solicito soporte prioritario para este envio.",
      aiSummary: "Resumen sugerido por IA",
      categoryField: "Categoria",
      subjectField: "Asunto",
      messageField: "Mensaje",
      priorityField: "Prioridad solicitada",
      yes: "Si",
      no: "No",
      newRequest: "Nueva solicitud",
      myRequests: "Mis solicitudes de soporte",
      noRequests: "Aun no hay solicitudes de soporte.",
      conversation: "Conversacion",
      replyPlaceholder: "Responder a esta solicitud",
      sendReply: "Enviar respuesta",
      loadingRequests: "Cargando tus solicitudes de soporte...",
      categories: [
        { value: "course-access", label: "Acceso al curso / inicio de sesion" },
        { value: "seat-time", label: "Tiempo del curso / temporizador" },
        { value: "final-exam", label: "Problema con el examen final" },
        { value: "certificate", label: "Certificado / finalizacion" },
        { value: "technical", label: "Problema tecnico del sitio" },
        { value: "other", label: "Otra pregunta" },
      ] satisfies { value: SupportCategory; label: string }[],
    }
  }

  return {
    sectionLabel: `${stateName} Student Support`,
    title: "Help & Support",
    intro:
      "Most issues are resolved instantly. Only more complex issues need review by support.",
    commonQuestions: "Common questions",
    commonQuestionsBody:
      "Many issues are resolved with the instant guidance shown as students type.",
    commonItems: [
      [
        "Why is my final exam locked?",
        "The final exam stays locked until all lessons are completed and your required seat time is satisfied.",
      ],
      [
        "Why is my certificate locked?",
        "Your certificate is available only after required seat time is complete and you have passed the final exam.",
      ],
      [
        "Why is my timer not done yet?",
        "Seat time is tracked across your course activity. Keep progressing through lessons and remain active on the course pages until the required time is completed.",
      ],
    ] as const,
    quickLinks: "Quick links",
    courseDashboard: "Course Dashboard",
    finalExam: "Final Exam",
    certificate: "Certificate",
    askQuestion: "Ask a question",
    askQuestionBody:
      'Type your issue below. Even short messages like "exam locked" work.',
    bilingualNote:
      "Instant help and course content may still appear in English while bilingual support expands.",
    category: "Category",
    subject: "Subject",
    subjectPlaceholder: "Example: Exam locked",
    message: "Message",
    messagePlaceholder: "Describe your issue",
    needMoreText:
      "Enter at least 5 total characters in Subject or Message to get an instant answer.",
    instantAnswer: "Instant suggested answer",
    suggestedSteps: "Suggested next steps",
    tryTheseSteps: "Try these steps:",
    checkingSupport: "Checking support options...",
    priorityTitle: "Priority support request",
    priorityBody:
      "Your plan includes priority support. Mark this request for faster review when needed.",
    standardTitle: "Standard support",
    standardBody:
      "Start here for instant help and standard support review. Priority handling is only available with a priority support plan.",
    upgradeTitle: "Need a faster response?",
    upgradeBody:
      "If you already bought the standard plan, you can upgrade to priority support from the checkout page.",
    upgradeCta: "Upgrade to Priority Support",
    submit: "Send Support Request",
    saving: "Saving...",
    saveError:
      "Something went wrong saving your request. Please try again.",
    submitted: "Support request submitted",
    submittedTitle: "Your request has been saved",
    submittedBody:
      "Most issues are resolved with the instant steps above. Unresolved issues can be reviewed next.",
    priorityRequested: "Priority support was requested for this submission.",
    aiSummary: "AI suggested summary",
    categoryField: "Category",
    subjectField: "Subject",
    messageField: "Message",
    priorityField: "Priority requested",
    yes: "Yes",
    no: "No",
    newRequest: "New Request",
    myRequests: "My support requests",
    noRequests: "No support requests yet.",
    conversation: "Conversation",
    replyPlaceholder: "Reply to this support request",
    sendReply: "Send Reply",
    loadingRequests: "Loading your support requests...",
    categories: [
      { value: "course-access", label: "Course access / login" },
      { value: "seat-time", label: "Seat time / timer issue" },
      { value: "final-exam", label: "Final exam issue" },
      { value: "certificate", label: "Certificate / completion issue" },
      { value: "technical", label: "Technical website issue" },
      { value: "other", label: "Other question" },
    ] satisfies { value: SupportCategory; label: string }[],
  }
}

export default function StateSupportClient({
  state,
  stateName,
  language,
}: {
  state: string
  stateName: string
  language: SiteLanguage
}) {
  const copy = useMemo(() => getSupportCopy(language, stateName), [language, stateName])

  const [category, setCategory] = useState<SupportCategory>("other")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState(false)
  const [checkingSupportTier, setCheckingSupportTier] = useState(true)
  const [hasPrioritySupport, setHasPrioritySupport] = useState(false)
  const [hasPaidCourseAccess, setHasPaidCourseAccess] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requestThreads, setRequestThreads] = useState<SupportRequestWithThread[]>([])
  const [loadingThreads, setLoadingThreads] = useState(true)
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})
  const [replyingId, setReplyingId] = useState<string | null>(null)

  const trimmedSubject = subject.trim()
  const trimmedMessage = message.trim()
  const effectiveText = `${trimmedSubject} ${trimmedMessage}`.trim()
  const canPreview = effectiveText.length >= 5
  const canSubmit = effectiveText.length >= 5 && !saving

  useEffect(() => {
    let isMounted = true

    async function loadSupportTier() {
      try {
        setCheckingSupportTier(true)

        const access = await getCourseAccessStatus(state)

        if (!isMounted) return

        setHasPaidCourseAccess(access.hasPaidAccess)
        setHasPrioritySupport(access.supportTier === "priority")
      } catch (loadError) {
        console.error("Could not load support tier:", loadError)

        if (!isMounted) return
        setHasPaidCourseAccess(false)
        setHasPrioritySupport(false)
      } finally {
        if (isMounted) {
          setCheckingSupportTier(false)
        }
      }
    }

    void loadSupportTier()

    return () => {
      isMounted = false
    }
  }, [state])

  useEffect(() => {
    let isMounted = true

    async function loadThreads() {
      try {
        setLoadingThreads(true)
        const requests = await loadStudentSupportThreads(state)

        if (!isMounted) return
        setRequestThreads(requests)
      } catch (loadError) {
        console.error("Could not load student support threads:", loadError)
      } finally {
        if (isMounted) {
          setLoadingThreads(false)
        }
      }
    }

    void loadThreads()

    return () => {
      isMounted = false
    }
  }, [state, submitted])

  const aiResponse = useMemo(() => {
    if (!canPreview) return null

    return getSupportAssistantResponse({
      state,
      category,
      subject: trimmedSubject || effectiveText,
      message: trimmedMessage || effectiveText,
    })
  }, [state, category, trimmedSubject, trimmedMessage, effectiveText, canPreview])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) return

    try {
      setSaving(true)
      setError(null)

      await createSupportRequest({
        stateCode: state,
        category,
        subject: trimmedSubject || effectiveText,
        message: trimmedMessage || effectiveText,
        aiResponse,
        priorityRequested: hasPrioritySupport && priority,
      })

      setSubmitted(true)
      setRequestThreads(await loadStudentSupportThreads(state))
    } catch (submitError) {
      console.error(submitError)
      setError(copy.saveError)
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setSubmitted(false)
    setSaving(false)
    setError(null)
    setPriority(false)
  }

  async function handleReply(requestId: string) {
    const replyMessage = String(replyDrafts[requestId] ?? "").trim()

    if (replyMessage.length < 2) {
      setError(copy.saveError)
      return
    }

    try {
      setReplyingId(requestId)
      setError(null)
      const newMessage = await sendStudentSupportReply(requestId, replyMessage)

      setRequestThreads((prev) =>
        prev.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: "open",
                messages: [...request.messages, newMessage],
              }
            : request
        )
      )
      setReplyDrafts((prev) => ({ ...prev, [requestId]: "" }))
    } catch (replyError) {
      console.error(replyError)
      setError(copy.saveError)
    } finally {
      setReplyingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="section-label">{copy.sectionLabel}</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-600">
          {copy.intro}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-[2rem] bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {copy.commonQuestions}
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              {copy.commonQuestionsBody}
            </p>

            <div className="mt-5 space-y-4">
              {copy.commonItems.map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="font-semibold text-slate-900">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {copy.quickLinks}
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/${state}/course`}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.courseDashboard}
              </Link>

              <Link
                href={`/${state}/course/final-exam`}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.finalExam}
              </Link>

              <Link
                href={`/${state}/certificate`}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.certificate}
              </Link>
            </div>
          </div>

          {!checkingSupportTier && hasPaidCourseAccess && !hasPrioritySupport ? (
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                {copy.upgradeTitle}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {copy.upgradeBody}
              </p>
              <Link
                href={`/${state}/checkout`}
                className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                {copy.upgradeCta}
              </Link>
            </div>
          ) : null}
        </div>

        <div className="glass-panel rounded-[2rem] bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {copy.askQuestion}
          </h2>
          <p className="mt-2 leading-7 text-slate-600">
            {copy.askQuestionBody}
          </p>
          <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
            {copy.bilingualNote}
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="support-category"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {copy.category}
                </label>
                <select
                  id="support-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as SupportCategory)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500"
                >
                  {copy.categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="support-subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {copy.subject}
                </label>
                <input
                  id="support-subject"
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder={copy.subjectPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="support-message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {copy.message}
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={copy.messagePlaceholder}
                  rows={6}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              {!canPreview ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  {copy.needMoreText}
                </div>
              ) : null}

              {aiResponse ? (
                <div className="rounded-2xl border border-[#dbe7ff] bg-[#f8fbff] p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {copy.instantAnswer}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {copy.suggestedSteps}
                  </h3>

                  <p className="mt-2 text-slate-700">{aiResponse.summary}</p>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-slate-700">
                      {copy.tryTheseSteps}
                    </div>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                      {aiResponse.suggestedSteps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {checkingSupportTier ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  {copy.checkingSupport}
                </div>
              ) : hasPrioritySupport ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={priority}
                      onChange={(event) => setPriority(event.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {copy.priorityTitle}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {copy.priorityBody}
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-semibold text-slate-900">
                    {copy.standardTitle}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {copy.standardBody}
                  </div>
                </div>
              )}

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`inline-flex rounded-xl px-5 py-2.5 font-semibold text-white ${
                  canSubmit
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "cursor-not-allowed bg-slate-400"
                }`}
              >
                {saving ? copy.saving : copy.submit}
              </button>
            </form>
          ) : (
            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                {copy.submitted}
              </div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {copy.submittedTitle}
              </h3>
              <p className="mt-2 text-slate-600">{copy.submittedBody}</p>

              {hasPrioritySupport && priority ? (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
                  {copy.priorityRequested}
                </div>
              ) : null}

              {aiResponse ? (
                <div className="mt-5 rounded-xl bg-white p-4">
                  <div className="text-sm text-slate-500">{copy.aiSummary}</div>
                  <div className="mt-1 text-slate-900">{aiResponse.summary}</div>
                </div>
              ) : null}

              <div className="mt-5 space-y-3 rounded-xl bg-white p-4">
                <div>
                  <div className="text-sm text-slate-500">{copy.categoryField}</div>
                  <div className="font-medium text-slate-900">
                    {copy.categories.find((option) => option.value === category)?.label}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">{copy.subjectField}</div>
                  <div className="font-medium text-slate-900">
                    {trimmedSubject || "-"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">{copy.messageField}</div>
                  <div className="whitespace-pre-wrap text-slate-900">
                    {trimmedMessage || "-"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">{copy.priorityField}</div>
                  <div className="font-medium text-slate-900">
                    {hasPrioritySupport && priority ? copy.yes : copy.no}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="mt-4 inline-flex rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.newRequest}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {copy.myRequests}
        </h2>

        {loadingThreads ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            {copy.loadingRequests}
          </div>
        ) : requestThreads.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            {copy.noRequests}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {requestThreads.map((request) => (
              <div
                key={request.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {request.subject || copy.subjectPlaceholder}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {copy.categories.find((option) => option.value === request.category)?.label}{" "}
                      • {request.status}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-slate-700">
                    {copy.conversation}
                  </div>
                  <div className="mt-3 space-y-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Student
                      </div>
                      <div className="mt-2 whitespace-pre-wrap text-sm text-slate-900">
                        {request.message}
                      </div>
                    </div>

                    {request.messages.map((threadMessage) => (
                      <div
                        key={threadMessage.id}
                        className={`rounded-xl border p-4 ${
                          threadMessage.sender_role === "admin"
                            ? "border-blue-200 bg-blue-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {threadMessage.sender_role === "admin" ? "Support" : "Student"}
                        </div>
                        <div className="mt-2 whitespace-pre-wrap text-sm text-slate-900">
                          {threadMessage.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <textarea
                    value={replyDrafts[request.id] ?? ""}
                    onChange={(event) =>
                      setReplyDrafts((prev) => ({
                        ...prev,
                        [request.id]: event.target.value,
                      }))
                    }
                    rows={3}
                    placeholder={copy.replyPlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => void handleReply(request.id)}
                    disabled={replyingId === request.id}
                    className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {replyingId === request.id ? copy.saving : copy.sendReply}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
