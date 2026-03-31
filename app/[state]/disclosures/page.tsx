import type { Metadata } from "next"
import Link from "next/link"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"
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
        `${config.stateName} driver improvement course information, disclosures, timing rules, and certificate details.`,
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
      ? `Linea principal de ${config.stateName}`
      : `${config.stateName} primary line`
  const secondarySupportPhoneLabel =
    language === "es" ? "Linea gratuita alternativa" : "Toll-free alternate line"
  const copy =
    language === "es"
      ? {
          approvalLabel: config.approvalStatusLabel,
          title: `${config.stateName} informacion del curso`,
          intro: config.disclosuresIntro,
          disclosures: config.disclosures,
          nextSteps: "Proximos pasos para estudiantes",
          nextStepsBody:
            enrollmentOpen
              ? "Revisa esta informacion antes de inscribirte. Si el curso se ajusta a tu situacion, puedes continuar al pago o volver a tu cuenta de estudiante."
              : "Revisa esta informacion para seguir el estado de preparacion de este curso. La inscripcion se abrira solo despues de que los requisitos y la aprobacion estatal esten listos.",
          viewPlans:
            enrollmentOpen
              ? "Ver planes del curso"
              : "Ver pagina del estado",
          studentLogin:
            enrollmentOpen
              ? "Ingreso de estudiantes"
              : "Volver al estado",
          backToState: `Volver a ${config.stateName}`,
          directPage: "Pagina directa",
          englishNote:
            config.stateSlug === "virginia"
              ? "El curso ofrece experiencia en ingles y espanol, y el contenido principal del curso y del examen final esta disponible en ambos idiomas."
              : "La plataforma se esta preparando para ofrecer experiencias en ingles y espanol donde el estado y el regulador lo permitan.",
          phoneTitle: "Linea telefonica",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "Para obtener ayuda mas rapida, usa primero la pagina de soporte. Si necesitas llamar, usa primero la linea principal. La linea gratuita permanece visible como contacto alternativo."
              : "La linea telefonica esta disponible principalmente para problemas de acceso a la cuenta y asuntos urgentes del curso.",
          phoneLabel: "Telefono",
        }
      : {
          approvalLabel: config.approvalStatusLabel,
          title: `${config.stateName} Course Information`,
          intro: config.disclosuresIntro,
          disclosures: config.disclosures,
          nextSteps: "Next steps for students",
          nextStepsBody:
            enrollmentOpen
              ? "Review this information before enrolling. If the course fits your situation, you can continue to checkout or return to your student account."
              : "Review this information to follow the preparation status for this state. Enrollment will open only after the state-specific requirements and approval steps are ready.",
          viewPlans: enrollmentOpen ? "View Course Plans" : "View State Page",
          studentLogin: enrollmentOpen ? "Student Login" : "Back to State",
          backToState: `Back to ${config.stateName}`,
          directPage: "Direct page",
          englishNote:
            "The course offers an English and Spanish experience, and the main course and final-exam content are available in both languages.",
          phoneTitle: "Phone line",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "For fastest help, use the support page first. If you need to call, use the primary line first. The toll-free line remains listed as an alternate contact."
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
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
            {copy.englishNote}
          </div>
        </div>
      </section>

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
              <p className="mt-1 font-semibold text-slate-900">
                {secondarySupportPhoneLabel}:{" "}
                <a
                  href={`tel:${secondarySupportPhone}`}
                  className="underline decoration-slate-300 underline-offset-4"
                >
                  {secondarySupportPhoneDisplay}
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={
              enrollmentOpen
                ? `/${state}/checkout`
                : `/${state}`
            }
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {copy.viewPlans}
          </Link>
          <Link
            href={enrollmentOpen ? `/${state}/login` : `/${state}`}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {copy.studentLogin}
          </Link>
          <Link
            href={`/${state}`}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {copy.backToState}
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          {copy.directPage}: {getDisclosuresRoute(state)}
        </p>
      </section>
    </div>
  )
}
