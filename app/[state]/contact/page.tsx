import Link from "next/link"
import { getCourseConfig, getFaqRoute } from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateContactPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const secondarySupportPhoneDisplay = config.secondarySupportPhoneDisplay ?? null
  const secondarySupportPhone = config.secondarySupportPhone ?? null
  const language = await getPreferredSiteLanguage()
  const primarySupportPhoneLabel =
    language === "es"
      ? `Linea principal de ${config.stateName}`
      : `${config.stateName} primary line`
  const secondarySupportPhoneLabel =
    language === "es" ? "Linea gratuita alternativa" : "Toll-free alternate line"
  const secondarySupportPhoneSummary =
    language === "es"
      ? "Linea alternativa regulatoria (requerida)"
      : "Regulatory alternate line (required)"
  const copy =
    language === "es"
      ? {
          label: "Contacto",
          title: `Ayuda para ${config.brandName}`,
          intro:
            "Para la mayoria de las preguntas sobre cuenta, curso, examen final o certificado, empieza con las preguntas frecuentes.",
          cardTitle: "Empieza con las preguntas frecuentes",
          stepOne: "Inicia sesion en tu cuenta de estudiante.",
          stepTwo:
            "Revisa las respuestas mas comunes y vuelve aqui si aun necesitas ayuda.",
          phoneTitle: "Linea telefonica",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "La linea principal es la mejor opcion para asuntos urgentes. Los detalles del contacto alternativo requerido por Virginia aparecen mas abajo si se necesitan."
              : "La linea telefonica esta disponible principalmente para problemas de acceso a la cuenta y asuntos urgentes del curso.",
          phoneLabel: "Telefono",
          emailTitle: "Correo electronico",
          emailBody:
            "Si necesitas seguimiento por escrito sobre acceso, certificado o documentacion del curso, escribe al correo de soporte del curso.",
          emailLabel: "Email de soporte",
          cta: "Ver preguntas frecuentes",
        }
      : {
          label: "Contact",
          title: `Help for ${config.brandName}`,
          intro:
            "For most questions about your account, course, final exam, or certificate, start with the FAQ.",
          cardTitle: "Start with the FAQ",
          stepOne: "Log in to your student account.",
          stepTwo:
            "Review the most common answers and come back here if you still need help.",
          phoneTitle: "Phone line",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "The primary line is best for urgent course issues. Virginia-required alternate contact details appear below if needed."
              : "The phone line is mainly for account-access problems and urgent course issues.",
          phoneLabel: "Phone",
          emailTitle: "Email",
          emailBody:
            "If you need written follow-up about access, certificate, or course documentation, use the course support email.",
          emailLabel: "Support email",
          cta: "View FAQ",
        }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.label}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">{copy.intro}</p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.cardTitle}</h2>
        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
          <p>{copy.stepOne}</p>
          <p>{copy.stepTwo}</p>
        </div>
        <Link
          href={getFaqRoute(state)}
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {copy.cta}
        </Link>
      </section>

      {config.supportPhoneDisplay ? (
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-900">{copy.phoneTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
            {copy.phoneBody}
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-900">
            {secondarySupportPhoneDisplay ? primarySupportPhoneLabel : copy.phoneLabel}:{" "}
            <a
              href={`tel:${config.supportPhone}`}
              className="text-slate-900 underline decoration-slate-300 underline-offset-4"
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
        </section>
      ) : null}

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.emailTitle}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
          {copy.emailBody}
        </p>
        <p className="mt-4 text-sm font-semibold text-slate-900">
          {copy.emailLabel}:{" "}
          <a
            href={`mailto:${config.supportEmail}`}
            className="text-slate-900 underline decoration-slate-300 underline-offset-4"
          >
            {config.supportEmail}
          </a>
        </p>
      </section>
    </div>
  )
}
