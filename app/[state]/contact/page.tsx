import Link from "next/link"
import { getCourseConfig, getSupportRoute } from "@/lib/course-config"
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
  const copy =
    language === "es"
      ? {
          label: "Contacto",
          title: `Ayuda para ${config.brandName}`,
          intro:
            "Para la mayoria de las preguntas sobre cuenta, curso, examen final o certificado, empieza con soporte en linea.",
          cardTitle: "Empieza con soporte en linea",
          stepOne: "Inicia sesion en tu cuenta de estudiante.",
          stepTwo:
            "Usa la pagina de soporte para recibir ayuda instantanea y registrar cualquier problema no resuelto.",
          phoneTitle: "Linea telefonica",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "Para obtener ayuda mas rapida, usa primero la pagina de soporte. Si necesitas llamar, usa primero la linea principal. La linea gratuita permanece visible como contacto alternativo."
              : "Para obtener ayuda mas rapida, usa primero la pagina de soporte. El telefono esta disponible principalmente para problemas de acceso a la cuenta y asuntos urgentes del curso.",
          phoneLabel: "Telefono",
          cta: "Abrir soporte",
        }
      : {
          label: "Contact",
          title: `Help for ${config.brandName}`,
          intro:
            "For most questions about your account, course, final exam, or certificate, start with online support.",
          cardTitle: "Start with online support",
          stepOne: "Log in to your student account.",
          stepTwo:
            "Use the support page to get instant help and save any unresolved issue for follow-up review.",
          phoneTitle: "Phone line",
          phoneBody:
            secondarySupportPhoneDisplay
              ? "For fastest help, use the support page first. If you need to call, use the primary line first. The toll-free line remains listed as an alternate contact."
              : "For fastest help, use the support page first. The phone line is mainly for account-access problems and urgent course issues.",
          phoneLabel: "Phone",
          cta: "Open Support",
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
          href={getSupportRoute(state)}
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
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {secondarySupportPhoneLabel}:{" "}
              <a
                href={`tel:${secondarySupportPhone}`}
                className="text-slate-900 underline decoration-slate-300 underline-offset-4"
              >
                {secondarySupportPhoneDisplay}
              </a>
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
