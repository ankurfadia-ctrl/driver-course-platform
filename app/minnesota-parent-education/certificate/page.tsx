import Link from "next/link"
import {
  MINNESOTA_PARENT_SITE_AUTHENTICITY,
  MINNESOTA_PARENT_SITE_AUTHENTICITY_ES,
  MINNESOTA_PARENT_SITE_CERTIFICATE_FIELDS,
  MINNESOTA_PARENT_SITE_CERTIFICATE_FIELDS_ES,
  MINNESOTA_PARENT_SITE_SUPPORT,
} from "@/lib/minnesota-parent-education-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function MinnesotaCertificatePage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"

  const copy = isSpanish
    ? {
        label: "Certificado",
        title: "Los certificados se preparan para uso en tribunales de Minnesota",
        intro:
          "La estructura del certificado mantiene los campos requeridos al frente y utiliza un ID de verificación para autenticidad.",
        sampleLabel: "Estructura de certificado de muestra",
        certificateHeading: "Fundamentos de Coparentalidad de Minnesota",
        certificateTitle: "Certificado de finalización",
        certificateLine:
          "Se certifica que [Nombre del participante] completo Fundamentos de Coparentalidad de Minnesota el [Fecha de finalización] para el numero de caso [Numero de caso].",
        attendanceLabel: "Fechas de asistencia",
        verificationLabel: "ID de verificación",
        contactLabel: "Contacto del curso",
        fieldsLabel: "Campos incluidos",
        verificationTitle: "Controles de verificación",
        nextLabel: "Siguientes pasos",
        nextTitle: "Revisa la matrícula o abre la página de inscripción",
        nextBody:
          "Si ya tienes los detalles del certificado, las siguientes páginas utiles son matrícula e inscripción.",
        pricingCta: "Ver matrícula",
        enrollCta: "Abrir página de inscripción",
      }
    : {
        label: "Certificate",
        title: "Completion certificates are built for Minnesota court use",
        intro:
          "The certificate structure keeps the required course-completion fields front and center while using a verification ID for authenticity review.",
        sampleLabel: "Sample certificate structure",
        certificateHeading: "Minnesota Co-Parenting Foundations",
        certificateTitle: "Certificate of Completion",
        certificateLine:
          "This certifies that [Participant Name] completed Minnesota Co-Parenting Foundations on [Completion Date] for case number [Case Number].",
        attendanceLabel: "Attendance dates",
        verificationLabel: "Verification ID",
        contactLabel: "Course contact",
        fieldsLabel: "Included fields",
        verificationTitle: "Verification controls",
        nextLabel: "Next steps",
        nextTitle: "Review tuition or open the enrollment page",
        nextBody:
          "If you have the certificate details you need, the next helpful pages are tuition and enrollment.",
        pricingCta: "View tuition",
        enrollCta: "Open enrollment page",
      }

  const certificateFields = isSpanish
    ? MINNESOTA_PARENT_SITE_CERTIFICATE_FIELDS_ES
    : MINNESOTA_PARENT_SITE_CERTIFICATE_FIELDS
  const authenticity = isSpanish
    ? MINNESOTA_PARENT_SITE_AUTHENTICITY_ES
    : MINNESOTA_PARENT_SITE_AUTHENTICITY

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
        <div className="section-label !bg-emerald-50 !text-emerald-800 before:!bg-emerald-600">
          {copy.label}
        </div>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {copy.intro}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.sampleLabel}
          </div>
          <div className="mt-6 rounded-[1.75rem] border border-emerald-200 bg-[linear-gradient(180deg,#f5fbf7_0%,#ffffff_100%)] p-8">
            <div className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              {copy.certificateHeading}
            </div>
            <div className="mt-4 text-center text-3xl font-semibold text-slate-950">
              {copy.certificateTitle}
            </div>
            <p className="mt-5 text-center text-sm leading-7 text-slate-700">
              {copy.certificateLine}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/80 bg-white/90 p-4 text-sm leading-7 text-slate-700">
                {copy.attendanceLabel}: <span className="font-semibold">[Dates]</span>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/90 p-4 text-sm leading-7 text-slate-700">
                {copy.verificationLabel}:{" "}
                <span className="font-semibold">[MN-CPF-YYYY-####]</span>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-white/80 bg-white/90 p-5 text-sm leading-7 text-slate-700">
              <div className="font-semibold text-slate-950">{copy.contactLabel}</div>
              <div>{MINNESOTA_PARENT_SITE_SUPPORT.organization}</div>
              <div>{MINNESOTA_PARENT_SITE_SUPPORT.phone}</div>
              <div>{MINNESOTA_PARENT_SITE_SUPPORT.email}</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.fieldsLabel}
            </div>
            <div className="mt-6 grid gap-4">
              {certificateFields.map((field) => (
                <div
                  key={field}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
                >
                  {field}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.verificationTitle}
            </div>
            <div className="mt-6 grid gap-4">
              {authenticity.map((field) => (
                <div
                  key={field}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
                >
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {copy.nextLabel}
            </div>
            <h3 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.nextTitle}
            </h3>
            <p className="mt-4 leading-8 text-slate-600">{copy.nextBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/minnesota-parent-education/pricing"
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              {copy.pricingCta}
            </Link>
            <Link
              href="/minnesota-parent-education/enroll"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.enrollCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
