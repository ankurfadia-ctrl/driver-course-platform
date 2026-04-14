"use client"

import { useMemo, useState } from "react"
import {
  DEFAULT_PUBLIC_SUPPORT_EMAIL,
  getPriceMatchAccentStyles,
  type PriceMatchAccent,
} from "@/lib/price-match"
import type { SiteLanguage } from "@/lib/site-language"

type CoursePriceMatchFormProps = {
  requestTitle: string
  emailSubject: string
  accent?: PriceMatchAccent
  supportEmail?: string
  language?: SiteLanguage
}

export default function CoursePriceMatchForm({
  requestTitle,
  emailSubject,
  accent = "emerald",
  supportEmail = DEFAULT_PUBLIC_SUPPORT_EMAIL,
  language = "en",
}: CoursePriceMatchFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [competitorUrl, setCompetitorUrl] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const accentClasses = getPriceMatchAccentStyles(accent)
  const isSpanish = language === "es"
  const copy = useMemo(
    () =>
      isSpanish
        ? {
            nameLabel: "Tu nombre",
            emailLabel: "Correo electronico",
            competitorLabel: "Enlace del curso del competidor",
            notesLabel: "Notas sobre el precio mas bajo",
            notesPlaceholder:
              "Agrega cualquier detalle sobre el precio publico mas bajo, si incluye cargos o si la duracion del curso es similar.",
            submit: "Abrir solicitud por correo",
            copy: "Copiar detalles de la solicitud",
            error: "Incluye tu nombre, correo electronico y el enlace del competidor.",
            copied: "Solicitud de igualacion copiada al portapapeles.",
            helper:
              "Al abrir la solicitud se crea un correo prellenado para el equipo de precios. Copiar la solicitud te da una version de texto que puedes pegar en cualquier correo o nota de soporte.",
            bodyName: "Nombre",
            bodyEmail: "Correo",
            bodyUrl: "URL del competidor",
            bodyNotes: "Notas",
            emptyNotes: "(ninguna)",
          }
        : {
            nameLabel: "Your name",
            emailLabel: "Email address",
            competitorLabel: "Competitor course link",
            notesLabel: "Notes about the lower price",
            notesPlaceholder:
              "Add anything useful about the lower public price, whether it includes fees, or whether the course length is similar.",
            submit: "Open email request",
            copy: "Copy request details",
            error: "Include your name, email, and the competitor link.",
            copied: "Price-match request copied to your clipboard.",
            helper:
              "Opening the request creates a prefilled email to the pricing team. Copying the request gives you a plain-text version you can paste into any email or support note if preferred.",
            bodyName: "Name",
            bodyEmail: "Email",
            bodyUrl: "Competitor URL",
            bodyNotes: "Notes",
            emptyNotes: "(none)",
          },
    [isSpanish]
  )

  const body = useMemo(() => {
    return [
      requestTitle,
      "",
      `${copy.bodyName}: ${name}`,
      `${copy.bodyEmail}: ${email}`,
      `${copy.bodyUrl}: ${competitorUrl}`,
      "",
      `${copy.bodyNotes}:`,
      notes || copy.emptyNotes,
    ].join("\n")
  }, [competitorUrl, copy, email, name, notes, requestTitle])

  function validate() {
    if (!name.trim() || !email.trim() || !competitorUrl.trim()) {
      setError(copy.error)
      return false
    }

    setError("")
    return true
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(body)}`
  }

  async function handleCopyRequest() {
    if (!validate()) {
      return
    }

    await navigator.clipboard.writeText(body)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            {copy.nameLabel}
          </div>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
          />
        </label>

        <label className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            {copy.emailLabel}
          </div>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
          />
        </label>
      </div>

      <label className="space-y-2">
        <div className="text-sm font-semibold text-slate-900">
          {copy.competitorLabel}
        </div>
        <input
          type="url"
          placeholder="https://..."
          value={competitorUrl}
          onChange={(event) => setCompetitorUrl(event.target.value)}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
        />
      </label>

      <label className="space-y-2">
        <div className="text-sm font-semibold text-slate-900">
          {copy.notesLabel}
        </div>
        <textarea
          rows={5}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        placeholder={copy.notesPlaceholder}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className={`rounded-2xl px-5 py-3 font-semibold ${accentClasses.button}`}
        >
          {copy.submit}
        </button>
        <button
          type="button"
          onClick={handleCopyRequest}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          {copy.copy}
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {copied ? (
        <div
          className={`rounded-2xl border p-4 text-sm ${accentClasses.softPanel}`}
        >
          {copy.copied}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        {copy.helper}
      </div>
    </form>
  )
}
