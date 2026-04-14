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
        title: "Verifica un certificado de finalizacion",
        intro:
          "Ingresa el ID del certificado tal como aparece en el certificado del estudiante para confirmar los detalles de finalizacion.",
        label: "ID de certificado",
        placeholder: "Ejemplo: VA-2026-ABC1234",
        submit: "Verificar certificado",
        back: "Volver al inicio",
        detailsTitle: "Lo que confirma la verificacion",
        detailOne: "El ID del certificado existe en el sistema.",
        detailTwo: "El estudiante aprobo el examen final asociado al certificado.",
        detailThree:
          "El registro del certificado coincide con los detalles de finalizacion.",
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
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_45%,#f8fafc_100%)] px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              {copy.eyebrow}
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">
              {copy.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {copy.intro}
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
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
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {copy.detailsTitle}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>{copy.detailOne}</li>
            <li>{copy.detailTwo}</li>
            <li>{copy.detailThree}</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
