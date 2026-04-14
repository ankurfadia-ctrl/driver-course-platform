import Link from "next/link"
import {
  MINNESOTA_PARENT_SITE_INCLUDED,
  MINNESOTA_PARENT_SITE_INCLUDED_ES,
  MINNESOTA_PARENT_SITE_JOURNEY,
  MINNESOTA_PARENT_SITE_JOURNEY_ES,
  MINNESOTA_PARENT_SITE_PRICING,
  MINNESOTA_PARENT_SITE_PRICING_ES,
  MINNESOTA_PARENT_SITE_SUPPORT,
} from "@/lib/minnesota-parent-education-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

const enrollmentFieldsEn = [
  "Participant full name and contact email",
  "Court case number and county or district information",
  "Reduced-fee or fee-waiver request details when applicable",
  "Secure account setup for course progress and certificate delivery",
  "Optional price-match request details when a lower public comparable offer is claimed",
] as const

const enrollmentFieldsEs = [
  "Nombre completo del participante y correo de contacto",
  "Numero de caso del tribunal y condado o distrito",
  "Detalles de solicitud de tarifa reducida o exencion cuando aplique",
  "Configuracion segura de cuenta para progreso y certificado",
  "Detalles opcionales de igualacion de precio si hay oferta comparable",
] as const

const paymentNotesEn = [
  "Tuition is posted publicly so families and courts can see the full course structure in one place.",
  "Reduced-fee and fee-waiver requests can be reviewed before any standard tuition is charged.",
  "Support questions about enrollment, case details, or certificate processing can be handled by email or phone.",
] as const

const paymentNotesEs = [
  "La matricula se publica para que familias y tribunales vean la estructura completa en un solo lugar.",
  "Las solicitudes de tarifa reducida y exencion pueden revisarse antes de cobrar la matricula estandar.",
  "Las preguntas sobre inscripcion, datos del caso o certificados pueden atenderse por correo o telefono.",
] as const

export default async function MinnesotaEnrollmentPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const pricing = isSpanish ? MINNESOTA_PARENT_SITE_PRICING_ES : MINNESOTA_PARENT_SITE_PRICING
  const journey = isSpanish ? MINNESOTA_PARENT_SITE_JOURNEY_ES : MINNESOTA_PARENT_SITE_JOURNEY
  const included = isSpanish ? MINNESOTA_PARENT_SITE_INCLUDED_ES : MINNESOTA_PARENT_SITE_INCLUDED
  const enrollmentFields = isSpanish ? enrollmentFieldsEs : enrollmentFieldsEn
  const paymentNotes = isSpanish ? paymentNotesEs : paymentNotesEn
  const copy = isSpanish
    ? {
        label: "Inscripcion y pago",
        title:
          "Una pagina de inscripcion simple con ayuda de pago y pasos claros",
        intro:
          "Esta pagina muestra lo que se pedira en la inscripcion, como se manejan las solicitudes de tarifa reducida o exencion y que esperar antes de iniciar.",
        timingTitle: "Horario de inscripcion",
        timingBody:
          "La inscripcion se abrira despues del trabajo final de lanzamiento. Mientras tanto, puedes revisar matricula, soporte y pasos de inscripcion.",
        enrollmentCollects: "Lo que se solicita",
        expectations: "Que esperar",
        stepLabel: "Paso",
        includedLabel: "Incluido despues de la inscripcion",
        supportLabel: "Notas de soporte y pago",
        contactLine: "Las preguntas de inscripcion pueden enviarse a",
        contactJoiner: "o",
        backTuition: "Volver a matricula",
        priceMatch: "Iniciar solicitud de igualacion",
        certificate: "Revisar certificado",
      }
    : {
        label: "Enrollment and Payment",
        title: "A simple enrollment page with tuition relief and clear next steps",
        intro:
          "This page shows what enrollment will ask for, how reduced-fee or fee-waiver requests are handled, and what to expect before the course begins.",
        timingTitle: "Enrollment timing",
        timingBody:
          "Enrollment will open after final launch work is complete. In the meantime, you can review the tuition, support details, and enrollment steps in advance.",
        enrollmentCollects: "What enrollment collects",
        expectations: "What to expect",
        stepLabel: "Step",
        includedLabel: "Included after enrollment",
        supportLabel: "Support and payment notes",
        contactLine: "Enrollment questions can be directed to",
        contactJoiner: "or",
        backTuition: "Back to tuition",
        priceMatch: "Start a price-match request",
        certificate: "Review certificate details",
      }
  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="section-label !bg-emerald-50 !text-emerald-800 before:!bg-emerald-600">
              {copy.label}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
              {copy.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {copy.intro}
            </p>
          </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-7 text-slate-700">
              <div className="font-semibold text-emerald-900">
                {copy.timingTitle}
              </div>
              <div className="mt-2">
                {copy.timingBody}
              </div>
            </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {pricing.map((tier) => (
          <article
            key={tier.name}
            className="glass-panel rounded-[2rem] bg-white p-8"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {tier.name}
            </div>
            <div className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
              {tier.price}
            </div>
            <p className="mt-4 leading-7 text-slate-600">{tier.description}</p>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-950">
              {tier.note}
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.enrollmentCollects}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {enrollmentFields.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.expectations}
          </div>
          <div className="mt-6 space-y-4">
            {journey.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {copy.stepLabel} {index + 1}
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-950">
                  {item.title}
                </div>
                <div className="mt-2 text-sm leading-7 text-slate-700">
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.includedLabel}
          </div>
          <div className="mt-6 space-y-4">
            {included.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {copy.supportLabel}
          </div>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
            {paymentNotes.map((item) => (
              <p key={item}>{item}</p>
            ))}
            <p>
              {copy.contactLine}{" "}
              <span className="font-semibold text-slate-900">
                {MINNESOTA_PARENT_SITE_SUPPORT.email}
              </span>{" "}
              {copy.contactJoiner}{" "}
              <span className="font-semibold text-slate-900">
                {MINNESOTA_PARENT_SITE_SUPPORT.phone}
              </span>
              .
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/minnesota-parent-education/pricing"
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              {copy.backTuition}
            </Link>
            <Link
              href="/minnesota-parent-education/price-match"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.priceMatch}
            </Link>
            <Link
              href="/minnesota-parent-education/certificate"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.certificate}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
