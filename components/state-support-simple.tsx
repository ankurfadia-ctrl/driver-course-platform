"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { getCourseAccessStatus } from "@/lib/course-access"
import { getSupportFaqEntries } from "@/lib/support-faq"
import type { SiteLanguage } from "@/lib/site-language"

type Props = {
  state: string
  stateName: string
  language: SiteLanguage
}

type FaqEntry = {
  question: string
  answer: string
}

function buildCopy(language: SiteLanguage, stateName: string) {
  if (language === "es") {
    return {
      eyebrow: "Ayuda y FAQ",
      title: `Ayuda para estudiantes de ${stateName}`,
      intro:
        "Empieza con las preguntas frecuentes. Si tienes soporte prioritario, puedes enviar un mensaje directo aqui.",
      faqLabel: "Preguntas frecuentes",
      priorityLabel: "Mensajes de soporte prioritario",
      priorityIntro: "Envianos tu pregunta y te responderemos directamente.",
      priorityNote:
        "Las respuestas de soporte prioritario se envian por correo electronico.",
      messagePlaceholder: "Escribe tu pregunta...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      sent: "Tu mensaje fue enviado.",
      loginNeeded: "Debes iniciar sesión para enviar un mensaje.",
      upgradeNote:
        "Los mensajes directos estan disponibles solo con soporte prioritario.",
      upgradeCta: "Mejorar a soporte prioritario",
      error: "No se pudo enviar el mensaje.",
    }
  }

  return {
    eyebrow: "Help and FAQ",
    title: `${stateName} student help`,
    intro:
      "Start with the FAQ. If you have priority support, you can send a direct message here.",
    faqLabel: "Frequently asked questions",
    priorityLabel: "Priority support messages",
    priorityIntro: "Send your question and we will reply directly.",
    priorityNote: "Priority support replies are sent by email.",
    messagePlaceholder: "Type your question...",
    send: "Send message",
    sending: "Sending...",
    sent: "Your message has been sent.",
    loginNeeded: "You need to sign in before sending a message.",
    upgradeNote:
      "Direct messaging is included only with priority support.",
    upgradeCta: "Upgrade to priority support",
    error: "Could not send the message.",
  }
}

async function createSupportRequest(args: {
  state: string
  message: string
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
      subject: args.message.slice(0, 80),
      message: args.message,
      priorityRequested: true,
    }),
  })

  const data = (await response.json()) as
    | { ok: true; id: string }
    | { ok: false; error?: string }

  if (!response.ok || !data.ok) {
    throw new Error(
      "error" in data ? data.error ?? "Support save failed." : "Support save failed."
    )
  }

  return data.id
}

export default function StateSupportSimple({
  state,
  stateName,
  language,
}: Props) {
  const copy = useMemo(() => buildCopy(language, stateName), [language, stateName])
  const faqEntries = useMemo<FaqEntry[]>(
    () => getSupportFaqEntries(language, state),
    [language, state]
  )
  const [supportTier, setSupportTier] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadAccess() {
      try {
        const access = await getCourseAccessStatus(state)
        if (cancelled) return
        setIsAuthenticated(access.isAuthenticated)
        setSupportTier(access.supportTier)
      } catch {
        if (!cancelled) return
      }
    }

    void loadAccess()

    return () => {
      cancelled = true
    }
  }, [state])

  async function handleSendMessage() {
    if (sending) return
    const trimmed = message.trim()
    setSent(false)
    setError("")

    if (!trimmed) {
      return
    }

    if (!isAuthenticated) {
      setError(copy.loginNeeded)
      return
    }

    if (supportTier !== "priority") {
      setError(copy.upgradeNote)
      return
    }

    setSending(true)

    try {
      await createSupportRequest({
        state,
        message: trimmed,
        language,
      })
      setMessage("")
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.error)
    } finally {
      setSending(false)
    }
  }

  const isPriority = supportTier === "priority"

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.eyebrow}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{copy.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">{copy.intro}</p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.faqLabel}</h2>
        <div className="mt-6 space-y-4">
          {faqEntries.map((entry, index) => (
            <details
              key={`${entry.question}-${index}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                {entry.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {entry.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-sm text-slate-600">
          <Link href={`/${state}/faq`} className="font-semibold underline">
            {copy.faqLabel}
          </Link>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.priorityLabel}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">{copy.priorityIntro}</p>

        {!isPriority ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {copy.upgradeNote}
            <div className="mt-2">
              <Link href={`/${state}/checkout`} className="font-semibold underline">
                {copy.upgradeCta}
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
              placeholder={copy.messagePlaceholder}
            />
            <button
              type="button"
              onClick={() => void handleSendMessage()}
              disabled={sending}
              className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? copy.sending : copy.send}
            </button>
            {sent ? <div className="text-sm text-emerald-700">{copy.sent}</div> : null}
            <div className="text-xs text-slate-500">{copy.priorityNote}</div>
            {error ? <div className="text-sm text-red-700">{error}</div> : null}
          </div>
        )}
      </section>
    </div>
  )
}
