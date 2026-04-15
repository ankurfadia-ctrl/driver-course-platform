"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

function normalizeCertificateId(value: string) {
  return String(value ?? "").trim().toUpperCase()
}

export default function VerifyCertificateEntryPage() {
  const router = useRouter()
  const [certificateId, setCertificateId] = useState("")
  const language = usePreferredSiteLanguageClient()
  const isSpanish = language === "es"

  const copy = isSpanish
    ? {
        eyebrow: "Verificacion de certificados",
        title: "Verifica un certificado de finalización",
        intro:
          "Ingresa el ID del certificado tal como aparece en el certificado del estudiante para confirmar los detalles de finalización.",
        label: "ID de certificado",
        placeholder: "Ejemplo: VA-2026-ABC1234",
        submit: "Verificar certificado",
        back: "Volver al inicio",
        detailsTitle: "Lo que confirma la verificación",
        detailOne: "El ID del certificado existe en el sistema.",
        detailTwo: "El estudiante aprobo el examen final asociado al certificado.",
        detailThree:
          "El registro del certificado coincide con los detalles de finalización.",
      }
    : {
        eyebrow: "Certificate Verification",
        title: "Verify a course completion certificate",
        intro:
          "Enter the certificate ID exactly as shown on the student's certificate to confirm completion details.",
        label: "Certificate ID",
        placeholder: "Example: VA-2026-ABC1234",
        submit: "Verify Certificate",
        back: "Back to Home",
        detailsTitle: "What verification confirms",
        detailOne: "The certificate ID exists in the system.",
        detailTwo: "The student passed the final exam tied to that certificate.",
        detailThree:
          "The certificate record matches the stored completion details.",
      }

  const normalizedCertificateId = normalizeCertificateId(certificateId)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!normalizedCertificateId) {
      return
    }

    router.push(`/verify/${encodeURIComponent(normalizedCertificateId)}`)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.eyebrow}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {copy.title}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">{copy.intro}</p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="certificate-id"
              className="block text-sm font-semibold text-slate-900"
            >
              {copy.label}
            </label>
            <input
              id="certificate-id"
              type="text"
              value={certificateId}
              onChange={(event) => setCertificateId(event.target.value)}
              placeholder={copy.placeholder}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-blue-500"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!normalizedCertificateId}
              className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {copy.submit}
            </button>

            <Link
              href="/"
              className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {copy.back}
            </Link>
          </div>
        </form>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">
          {copy.detailsTitle}
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
            <span>{copy.detailOne}</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
            <span>{copy.detailTwo}</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
            <span>{copy.detailThree}</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
