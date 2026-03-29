"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  getSupportAssistantResponse,
  inferSupportCategoryFromText,
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
      actionsTitle: "Opciones rapidas",
      faqCta: "Ver preguntas frecuentes",
      aiChatCta: "Abrir chat con IA",
      upgradeAlwaysCta: "Mejorar a soporte prioritario",
      commonQuestions: "Preguntas comunes",
      commonQuestionsBody:
        "Muchos problemas se resuelven con la guia instantanea que aparece mientras escribes.",
      commonItems: [
        [
          "Por que esta bloqueado mi examen final?",
          "El examen final permanece bloqueado hasta que completes todas las lecciones requeridas y al menos 7 horas de instruccion del curso.",
        ],
        [
          "Por que esta bloqueado mi certificado?",
          "Tu certificado solo se habilita cuando completas el minimo total de 8 horas y apruebas el examen final.",
        ],
        [
          "Por que mi temporizador aun no termina?",
          "El tiempo del curso se registra segun tu actividad. Sigue avanzando por las lecciones y permanece activo en las paginas del curso hasta completar el tiempo requerido.",
        ],
      ] as const,
      askQuestion: "Chat de ayuda con IA",
      askQuestionBody:
        'Escribe tu pregunta abajo como si fuera un chat. Presiona Enter para enviar. Incluso mensajes cortos como "examen bloqueado" funcionan.',
      bilingualNote:
        "La ayuda instantanea y el contenido del curso pueden seguir apareciendo en ingles mientras ampliamos el soporte bilingue.",
      message: "Escribe tu pregunta",
      messagePlaceholder: "Escribe tu pregunta aqui y presiona Enter",
      needMoreText:
        "Escribe al menos 5 caracteres para recibir una respuesta instantanea.",
      instantAnswer: "Respuesta sugerida al instante",
      suggestedSteps: "Pasos sugeridos",
      tryTheseSteps: "Prueba estos pasos:",
      checkingSupport: "Verificando opciones de soporte...",
      priorityTitle: "Solicitud de soporte prioritario",
      priorityBody:
        "Tu plan incluye seguimiento humano asincrono despues de que la ayuda con IA haya intentado resolver tu problema. Las respuestas prioritarias suelen llegar dentro de 1 dia habil.",
      standardTitle: "Soporte estandar",
      standardBody:
        "Empieza aqui con la ayuda por IA. Las respuestas humanas estandar pueden tardar hasta 3 dias habiles. Las respuestas humanas dentro del sitio solo estan disponibles con soporte prioritario.",
      upgradeTitle: "Necesitas una respuesta mas rapida?",
      upgradeBody:
        "Si ya compraste el plan estandar, puedes mejorar a soporte prioritario para obtener seguimiento humano dentro del sitio y una respuesta objetivo dentro de 1 dia habil.",
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
      threadReplyLockedTitle: "Respuestas directas disponibles con soporte prioritario",
      threadReplyLockedBody:
        "Puedes ver el estado de tu solicitud aqui. La ayuda por IA esta disponible para todos. La revision humana estandar puede tardar hasta 3 dias habiles, mientras que las respuestas directas dentro del sitio y la meta de 1 dia habil estan disponibles con el plan prioritario.",
      threadReplyLockedCta: "Mejorar a soporte prioritario",
      priorityThreadTitle: "Seguimiento con soporte",
      priorityThreadBody:
        "La ayuda por IA ya fue iniciada para esta solicitud. Como tu plan incluye soporte prioritario, puedes continuar con un seguimiento asincrono aqui.",
      aiFirstRequiredTitle: "La ayuda por IA viene primero",
      aiFirstRequiredBody:
        "Para desbloquear el seguimiento humano dentro del sitio, primero envia una solicitud usando la ayuda por IA de arriba.",
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
    actionsTitle: "Quick actions",
    faqCta: "View FAQ",
    aiChatCta: "Open AI Chat",
    upgradeAlwaysCta: "Upgrade to Priority Support",
    commonQuestions: "Common questions",
    commonQuestionsBody:
      "Many issues are resolved with the instant guidance shown as students type.",
    commonItems: [
      [
        "Why is my final exam locked?",
        "The final exam stays locked until all required lessons are completed and at least 7 hours of course instruction have been recorded.",
      ],
      [
        "Why is my certificate locked?",
        "Your certificate is available only after the full 8-hour minimum is complete and you have passed the final exam.",
      ],
      [
        "Why is my timer not done yet?",
        "Seat time is tracked across your course activity. Keep progressing through lessons and remain active on the course pages until the required time is completed.",
      ],
    ] as const,
    askQuestion: "AI help chat",
      askQuestionBody:
      'Type your question below like a chat message. Press Enter to send. Even short messages like "exam locked" work.',
    bilingualNote:
      "Instant help and course content may still appear in English while bilingual support expands.",
    message: "Type your question",
    messagePlaceholder: "Type your question here and press Enter",
    needMoreText:
      "Enter at least 5 characters to get an instant answer.",
    instantAnswer: "Instant suggested answer",
    suggestedSteps: "Suggested next steps",
    tryTheseSteps: "Try these steps:",
    checkingSupport: "Checking support options...",
    priorityTitle: "Priority support request",
    priorityBody:
      "Your plan includes asynchronous human follow-up after AI help has tried first. Priority responses are typically handled within 1 business day.",
    standardTitle: "Standard support",
    standardBody:
      "Start here with AI help. Standard human review may take up to 3 business days. Direct back-and-forth human replies inside the site are available only with a priority support plan.",
    upgradeTitle: "Need a faster response?",
    upgradeBody:
      "If you already bought the standard plan, you can upgrade to priority support for on-site human follow-up and a 1-business-day response target.",
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
    threadReplyLockedTitle: "Direct replies are available with priority support",
    threadReplyLockedBody:
      "You can still view your request status here. AI help is available to everyone. Standard human review may take up to 3 business days, while direct on-site replies and the 1-business-day response target are available with the priority support plan.",
    threadReplyLockedCta: "Upgrade to Priority Support",
    priorityThreadTitle: "Support follow-up",
    priorityThreadBody:
      "AI help has already been used for this request. Because your plan includes priority support, you can continue with an asynchronous human follow-up here.",
    aiFirstRequiredTitle: "AI help comes first",
    aiFirstRequiredBody:
      "To unlock the human follow-up thread inside the site, first send a request using the AI help above.",
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

  const trimmedMessage = message.trim()
  const effectiveText = trimmedMessage
  const inferredCategory = inferSupportCategoryFromText(effectiveText)
  const derivedSubject = effectiveText.slice(0, 80)
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
      category: inferredCategory,
      subject: derivedSubject,
      message: effectiveText,
    })
  }, [state, inferredCategory, derivedSubject, effectiveText, canPreview])

  const submitSupportRequest = async () => {
    if (!canSubmit) return

    try {
      setSaving(true)
      setError(null)

      await createSupportRequest({
        stateCode: state,
        category: inferredCategory,
        subject: derivedSubject,
        message: effectiveText,
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submitSupportRequest()
  }

  function handleChatKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()

      if (!canSubmit) {
        return
      }

      void submitSupportRequest()
    }
  }

  function resetForm() {
    setSubmitted(false)
    setSaving(false)
    setError(null)
    setMessage("")
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

      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
        <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          {copy.actionsTitle}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/${state}/faq`}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            {copy.faqCta}
          </Link>
          <a
            href="#ai-help-chat"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {copy.aiChatCta}
          </a>
          {!hasPrioritySupport ? (
            <Link
              href={`/${state}/checkout`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              {copy.upgradeAlwaysCta}
            </Link>
          ) : null}
        </div>
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

        <div id="ai-help-chat" className="glass-panel rounded-[2rem] bg-white p-6">
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
                  htmlFor="support-message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {copy.message}
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={handleChatKeyDown}
                  placeholder={copy.messagePlaceholder}
                  rows={4}
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
                  <div className="text-sm text-slate-500">{copy.messageField}</div>
                  <div className="whitespace-pre-wrap text-slate-900">
                    {effectiveText || "-"}
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
                      {request.subject || request.message.slice(0, 80)}
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
                  {hasPrioritySupport && request.ai_summary ? (
                    <>
                      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                        <div className="font-semibold text-slate-900">
                          {copy.priorityThreadTitle}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">
                          {copy.priorityThreadBody}
                        </div>
                      </div>
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
                    </>
                  ) : hasPrioritySupport ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="font-semibold text-slate-900">
                        {copy.aiFirstRequiredTitle}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">
                        {copy.aiFirstRequiredBody}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="font-semibold text-slate-900">
                        {copy.threadReplyLockedTitle}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">
                        {copy.threadReplyLockedBody}
                      </div>
                      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">
                        {copy.replyPlaceholder}
                      </div>
                      <Link
                        href={`/${state}/checkout`}
                        className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                      >
                        {copy.threadReplyLockedCta}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
