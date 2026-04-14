import type { Metadata } from "next"
import Link from "next/link"
import { getCourseConfig } from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const config = getCourseConfig(state)
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}/${config.stateSlug}/disclosures`

  return {
    title: `${config.stateName} Course Information | ${config.brandName}`,
    description:
      `${config.stateName} driver improvement course information covering approval status, eligibility, seat-time rules, identity verification, final exam rules, and certificate details.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${config.stateName} Course Information`,
      description:
        `${config.stateName} driver improvement course information, disclosures, course rules, and certificate details.`,
      url: canonicalUrl,
      siteName: config.brandName,
      locale: "en_US",
      type: "website",
    },
  }
}

export default async function StateDisclosuresPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const secondarySupportPhoneDisplay = config.secondarySupportPhoneDisplay ?? null
  const secondarySupportPhone = config.secondarySupportPhone ?? null
  const enrollmentOpen = config.enrollmentOpen
  const language = await getPreferredSiteLanguage()
  const primarySupportPhoneLabel =
    language === "es"
      ? `Línea principal de ${config.stateName}`
      : `${config.stateName} primary line`
  const secondarySupportPhoneLabel =
    language === "es" ? "Línea gratuita alternativa" : "Toll-free alternate line"
  const secondarySupportPhoneSummary =
    language === "es"
      ? "Línea alternativa regulatoria (requerida)"
      : "Regulatory alternate line (required)"
  const quickFacts =
    config.stateSlug === "virginia"
      ? [
          {
            label: language === "es" ? "Detalles del curso" : "Course details",
            value:
              language === "es"
                ? "Los detalles del curso de Virginia están listos a continuación."
                : "Your Virginia course details are ready below.",
          },
          {
            label: language === "es" ? "Duración total" : "Total course length",
            value:
              language === "es"
                ? "8 horas en total, incluido el examen final."
                : "8 hours total, including the final exam.",
          },
          {
            label: language === "es" ? "Puntuación aprobatoria" : "Passing score",
            value:
              language === "es"
                ? `${config.passingScorePercent}% en el examen final.`
                : `${config.passingScorePercent}% on the final exam.`,
          },
          {
            label:
              language === "es"
                ? "Certificado e informe al DMV"
                : "Certificate and DMV reporting",
            value:
              language === "es"
                ? "La página del certificado se desbloquea después de completar el tiempo total y aprobar el examen final. El informe al DMV se maneja automáticamente."
                : "Your certificate page unlocks after full completion and a passing final exam. DMV reporting is handled automatically.",
          },
        ]
      : []
  const copy =
    language === "es"
      ? {
          approvalLabel: config.approvalStatusLabelEs ?? config.approvalStatusLabel,
          title: `${config.stateName} información del curso`,
          intro: config.disclosuresIntroEs ?? config.disclosuresIntro,
          disclosures: config.disclosuresEs ?? config.disclosures,
          quickFactsTitle:
            config.stateSlug === "virginia"
              ? "Datos rápidos del curso de Virginia"
              : null,
          nextSteps: "Próximos pasos para estudiantes",
          nextStepsBody:
            enrollmentOpen
              ? "Revisa esta información antes de inscribirte. Si el curso se ajusta a tu situación, puedes continuar al pago o volver a tu cuenta de estudiante."
              : "Revisa esta información para saber qué esperar. La inscripción se abrirá cuando el curso esté disponible.",
          viewPlans: enrollmentOpen ? "Ver planes del curso" : null,
          studentLogin: enrollmentOpen ? "Ingreso de estudiantes" : null,
          backToState: `Volver a ${config.stateName}`,
          phoneTitle: "Línea telefónica",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "Para obtener ayuda más rápida, usa primero la página de soporte. Si necesitas llamar, usa primero la línea principal. Los detalles de contacto alternativo requeridos por Virginia aparecen más abajo."
              : "La línea telefónica está disponible principalmente para problemas de acceso a la cuenta y asuntos urgentes del curso.",
          phoneLabel: "Teléfono",
        }
      : {
          approvalLabel: config.approvalStatusLabel,
          title: `${config.stateName} Course Information`,
          intro: config.disclosuresIntro,
          disclosures: config.disclosures,
          quickFactsTitle:
            config.stateSlug === "virginia"
              ? "Virginia course quick facts"
              : null,
          nextSteps: "Next steps for students",
          nextStepsBody:
            enrollmentOpen
              ? "Review this information before enrolling. If the course fits your situation, you can continue to checkout or return to your student account."
              : "Review this information to see what to expect. Enrollment will open when the course becomes available.",
          viewPlans: enrollmentOpen ? "View Course Plans" : null,
          studentLogin: enrollmentOpen ? "Student Login" : null,
          backToState: `Back to ${config.stateName}`,
          phoneTitle: "Phone line",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "For fastest help, use the support page first. If you need to call, use the primary line first. Virginia-required alternate contact details appear further below."
              : "The phone line is mainly for account-access problems and urgent course issues.",
          phoneLabel: "Phone",
        }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="space-y-4">
          <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            {copy.approvalLabel}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            {copy.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            {copy.intro}
          </p>
        </div>
      </section>

      {quickFacts.length > 0 && copy.quickFactsTitle ? (
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.quickFactsTitle}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {quickFacts.map((fact) => (
              <article
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  {fact.label}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {fact.value}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-5">
        {copy.disclosures.map((item) => (
          <article
            key={item.title}
            className="glass-panel rounded-[1.75rem] bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold text-slate-900">{copy.nextSteps}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          {copy.nextStepsBody}
        </p>
        {config.supportPhoneDisplay ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <div className="font-semibold text-slate-900">{copy.phoneTitle}</div>
            <p className="mt-2">{copy.phoneBody}</p>
            <p className="mt-2 font-semibold text-slate-900">
              {secondarySupportPhoneDisplay ? primarySupportPhoneLabel : copy.phoneLabel}:{" "}
              <a
                href={`tel:${config.supportPhone}`}
                className="underline decoration-slate-300 underline-offset-4"
              >
                {config.supportPhoneDisplay}
              </a>
            </p>
            {secondarySupportPhoneDisplay && secondarySupportPhone ? (
              <details className="mt-3 text-xs leading-6 text-slate-500">
                <summary className="cursor-pointer list-none text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
                  {secondarySupportPhoneSummary}
                </summary>
                <p className="mt-2 text-xs font-semibold text-slate-700">
                  {secondarySupportPhoneLabel}:{" "}
                  <a
                    href={`tel:${secondarySupportPhone}`}
                    className="underline decoration-slate-300 underline-offset-4"
                  >
                    {secondarySupportPhoneDisplay}
                  </a>
                </p>
              </details>
            ) : null}
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
          {copy.viewPlans ? (
            <Link
              href={`/${state}/checkout`}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {copy.viewPlans}
            </Link>
          ) : null}
          {copy.studentLogin ? (
            <Link
              href={`/${state}/login`}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {copy.studentLogin}
            </Link>
          ) : null}
          <Link
            href={`/${state}`}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {copy.backToState}
          </Link>
        </div>
      </section>
    </div>
  )
}
