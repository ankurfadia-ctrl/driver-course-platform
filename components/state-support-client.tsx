"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { getCourseAccessStatus } from "@/lib/course-access"
import {
  getSupportAssistantResponse,
  type SupportAssistantResponse,
} from "@/lib/support-assistant"
import { getSupportFaqEntries } from "@/lib/support-faq"
import {
  loadStudentSupportThreads,
  sendStudentSupportReply,
} from "@/lib/support-thread-client"
import type { SiteLanguage } from "@/lib/site-language"
import type { SupportRequestWithThread } from "@/lib/support-thread"

type Props = {
  state: string
  stateName: string
  language: SiteLanguage
}

type ChatMessage = {
  id: string
  role: "assistant" | "student"
  text: string
}

function buildCopy(language: SiteLanguage, stateName: string) {
  if (language === "es") {
    return {
      eyebrow: "Ayuda y soporte",
      title: `Ayuda para estudiantes de ${stateName}`,
      intro:
        "Empieza con las preguntas frecuentes o escribe tu pregunta abajo para recibir ayuda inmediata por IA.",
      faq: "Ver FAQ",
      aiChat: "Chat con IA",
      upgrade: "Actualizar a soporte prioritario",
      chatTitle: "Chat de ayuda por IA",
      chatIntro:
        "Haz tu pregunta como en un chat normal. La IA respondera primero con la mejor ayuda disponible.",
      placeholder: "Escribe tu pregunta aqui...",
      send: "Enviar",
      saving: "Enviando...",
      supportSave: "Enviar este chat a soporte",
      supportSent: "Este chat fue enviado a soporte.",
      supportError: "No se pudo guardar la solicitud de soporte.",
      loginNeeded: "Debes iniciar sesion para enviar una solicitud de soporte.",
      priorityNote:
        "Soporte prioritario: tus solicitudes se atienden primero y normalmente reciben una primera respuesta en menos de 1 dia habil.",
      standardNote:
        "Soporte estandar: revisa FAQ y chat IA primero. Las respuestas humanas pueden tardar hasta 3 dias habiles.",
      standardLocked:
        "Las respuestas humanas de ida y vuelta estan incluidas solo con soporte prioritario.",
      conversationTitle: "Solicitudes y respuestas",
      replyPlaceholder: "Escribe tu respuesta...",
      sendReply: "Responder",
      noThreads: "Aun no hay solicitudes guardadas.",
      aiWelcome:
        "Hola. Puedo ayudarte con acceso al curso, tiempo del curso, examen final, certificado y preguntas comunes.",
      aiNeedMore:
        "No tengo suficiente contexto todavia. Explica la pagina exacta y lo que paso para darte una respuesta mejor.",
    }
  }

  return {
    eyebrow: "Help and Support",
    title: `${stateName} student help`,
    intro:
      "Start with the FAQ, or ask your question below to get an immediate AI answer.",
    faq: "View FAQ",
    aiChat: "AI Chat",
    upgrade: "Upgrade to Priority Support",
    chatTitle: "AI help chat",
    chatIntro:
      "Ask your question like a normal chat. AI responds first with the best available guidance.",
    placeholder: "Type your question here...",
    send: "Send",
    saving: "Sending...",
    supportSave: "Send this chat to support",
    supportSent: "This chat has been sent to support.",
    supportError: "Could not save support request.",
    loginNeeded: "You need to sign in before sending a support request.",
    priorityNote:
      "Priority support: your questions are handled first and usually receive a first response in less than 1 business day.",
    standardNote:
      "Standard support: start with FAQ and AI chat first. Human responses may take up to 3 business days.",
    standardLocked:
      "Back-and-forth human replies are included only with priority support.",
    conversationTitle: "Requests and replies",
    replyPlaceholder: "Type your reply...",
    sendReply: "Reply",
    noThreads: "No saved support requests yet.",
    aiWelcome:
      "Hello. I can help with course access, seat time, final exam, certificate, and common course questions.",
    aiNeedMore:
      "I do not have enough detail yet. Tell me the exact page and what happened so I can help better.",
  }
}

function formatDateTime(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function deriveSubject(message: string, language: SiteLanguage) {
  const normalized = message.replace(/\s+/g, " ").trim()

  if (!normalized) {
    return language === "es" ? "Pregunta del estudiante" : "Student question"
  }

  return normalized.slice(0, 80)
}

async function createSupportRequest(args: {
  state: string
  message: string
  aiResponse: SupportAssistantResponse
  priorityRequested: boolean
  language: SiteLanguage
}) {
  const response = await fetch("/api/support", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stateCode: args.state,
      category: "other",
      subject: deriveSubject(args.message, args.language),
      message: args.message,
      aiResponse: args.aiResponse,
      priorityRequested: args.priorityRequested,
    }),
  })

  const data = (await response.json()) as
    | { ok: true; id: string }
    | { ok: false; error?: string }

  if (!response.ok || !data.ok) {
    throw new Error("error" in data ? data.error ?? "Support save failed." : "Support save failed.")
  }

  return data.id
}

export default function StateSupportClient({
  state,
  stateName,
  language,
}: Props) {
  const copy = useMemo(() => buildCopy(language, stateName), [language, stateName])
  const faqEntries = useMemo(() => getSupportFaqEntries(language), [language])

  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: copy.aiWelcome,
    },
  ])
  const [lastAiResponse, setLastAiResponse] =
    useState<SupportAssistantResponse | null>(null)
  const [lastStudentMessage, setLastStudentMessage] = useState("")
  const [sendingChat, setSendingChat] = useState(false)
  const [savingSupport, setSavingSupport] = useState(false)
  const [supportSaved, setSupportSaved] = useState(false)
  const [supportError, setSupportError] = useState("")

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [supportTier, setSupportTier] = useState<string | null>(null)
  const [threads, setThreads] = useState<SupportRequestWithThread[]>([])
  const [threadsError, setThreadsError] = useState("")
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})
  const [sendingReplyForId, setSendingReplyForId] = useState<string | null>(null)

  useEffect(() => {
    setChatMessages([
      {
        id: "welcome",
        role: "assistant",
        text: copy.aiWelcome,
      },
    ])
  }, [copy.aiWelcome])

  useEffect(() => {
    let cancelled = false

    async function loadContext() {
      const access = await getCourseAccessStatus(state)

      if (cancelled) {
        return
      }

      setIsAuthenticated(access.isAuthenticated)
      setSupportTier(access.supportTier)

      if (!access.isAuthenticated) {
        setThreads([])
        return
      }

      try {
        const requestThreads = await loadStudentSupportThreads(state)
        if (!cancelled) {
          setThreads(requestThreads)
          setThreadsError("")
        }
      } catch (error) {
        if (!cancelled) {
          setThreadsError(
            error instanceof Error ? error.message : "Could not load support history."
          )
        }
      }
    }

    void loadContext()

    return () => {
      cancelled = true
    }
  }, [state])

  async function handleSendChat() {
    const question = chatInput.trim()

    if (!question || sendingChat) {
      return
    }

    setSendingChat(true)
    setSupportSaved(false)
    setSupportError("")

    const userMessage: ChatMessage = {
      id: `student-${Date.now()}`,
      role: "student",
      text: question,
    }

    const aiResponse = getSupportAssistantResponse({
      state,
      category: "other",
      subject: deriveSubject(question, language),
      message: question,
      language,
    })

    const assistantText = aiResponse.summary || copy.aiNeedMore
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: "assistant",
      text: assistantText,
    }

    setChatMessages((prev) => [...prev, userMessage, assistantMessage])
    setLastStudentMessage(question)
    setLastAiResponse(aiResponse)
    setChatInput("")
    setSendingChat(false)
  }

  async function handleSaveToSupport() {
    if (!lastAiResponse || !lastStudentMessage || savingSupport) {
      return
    }

    if (!isAuthenticated) {
      setSupportError(copy.loginNeeded)
      return
    }

    setSavingSupport(true)
    setSupportError("")

    try {
      await createSupportRequest({
        state,
        message: lastStudentMessage,
        aiResponse: lastAiResponse,
        priorityRequested: supportTier === "priority",
        language,
      })

      const requestThreads = await loadStudentSupportThreads(state)
      setThreads(requestThreads)
      setSupportSaved(true)
    } catch (error) {
      setSupportError(
        error instanceof Error ? error.message : copy.supportError
      )
    } finally {
      setSavingSupport(false)
    }
  }

  async function handleSendReply(requestId: string) {
    const message = String(replyDrafts[requestId] ?? "").trim()

    if (!message || sendingReplyForId) {
      return
    }

    setSendingReplyForId(requestId)

    try {
      const inserted = await sendStudentSupportReply(requestId, message)
      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === requestId
            ? { ...thread, messages: [...thread.messages, inserted] }
            : thread
        )
      )
      setReplyDrafts((prev) => ({ ...prev, [requestId]: "" }))
    } catch (error) {
      setThreadsError(
        error instanceof Error ? error.message : "Could not send support reply."
      )
    } finally {
      setSendingReplyForId(null)
    }
  }

  const showUpgradeButton = supportTier !== "priority"

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {copy.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{copy.intro}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${state}/faq`}
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            {copy.faq}
          </Link>
          <a
            href="#ai-chat"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {copy.aiChat}
          </a>
          {showUpgradeButton ? (
            <Link
              href={`/${state}/checkout`}
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {copy.upgrade}
            </Link>
          ) : null}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{copy.faq}</h2>
          <div className="mt-4 space-y-3">
            {faqEntries.map((entry) => (
              <details
                key={entry.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <summary className="cursor-pointer list-none font-medium text-slate-900">
                  {entry.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {entry.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="ai-chat"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">{copy.chatTitle}</h2>
          <p className="mt-2 text-sm text-slate-600">{copy.chatIntro}</p>

          <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "student" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void handleSendChat()
                }
              }}
              placeholder={copy.placeholder}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => void handleSendChat()}
              disabled={!chatInput.trim() || sendingChat}
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sendingChat ? copy.saving : copy.send}
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">
              {supportTier === "priority" ? copy.priorityNote : copy.standardNote}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleSaveToSupport()}
                disabled={!lastAiResponse || savingSupport}
                className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingSupport ? copy.saving : copy.supportSave}
              </button>
              {showUpgradeButton ? (
                <Link
                  href={`/${state}/checkout`}
                  className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {copy.upgrade}
                </Link>
              ) : null}
            </div>
            {supportSaved ? (
              <div className="mt-3 text-sm text-green-700">{copy.supportSent}</div>
            ) : null}
            {supportError ? (
              <div className="mt-3 text-sm text-red-700">{supportError}</div>
            ) : null}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">
            {copy.conversationTitle}
          </h2>
          {showUpgradeButton ? (
            <div className="text-sm text-slate-500">{copy.standardLocked}</div>
          ) : null}
        </div>

        {threadsError ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {threadsError}
          </div>
        ) : null}

        {threads.length === 0 ? (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            {copy.noThreads}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {thread.subject}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatDateTime(thread.created_at)} • {thread.status}
                    </div>
                  </div>
                  {thread.priority_requested ? (
                    <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Priority
                    </div>
                  ) : (
                    <div className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                      Standard
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl bg-blue-600 px-4 py-3 text-sm text-white">
                      {thread.message}
                    </div>
                  </div>

                  {thread.ai_summary ? (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                        {thread.ai_summary}
                      </div>
                    </div>
                  ) : null}

                  {thread.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_role === "student"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                          message.sender_role === "student"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-700 shadow-sm"
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>

                {supportTier === "priority" ? (
                  <div className="mt-4 flex gap-3">
                    <input
                      value={replyDrafts[thread.id] ?? ""}
                      onChange={(event) =>
                        setReplyDrafts((prev) => ({
                          ...prev,
                          [thread.id]: event.target.value,
                        }))
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault()
                          void handleSendReply(thread.id)
                        }
                      }}
                      placeholder={copy.replyPlaceholder}
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => void handleSendReply(thread.id)}
                      disabled={
                        !String(replyDrafts[thread.id] ?? "").trim() ||
                        sendingReplyForId === thread.id
                      }
                      className="inline-flex rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {copy.sendReply}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
                    {copy.standardLocked}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
