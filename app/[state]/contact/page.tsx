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
  const language = await getPreferredSiteLanguage()
  const copy =
    language === "es"
      ? {
          label: "Contacto",
          title: `Contacto ${config.brandName}`,
          intro:
            "Empieza con el proceso de soporte para preguntas del curso, problemas de cuenta, problemas del certificado y la mayoria de las solicitudes generales.",
          supportOptions: "Opciones de soporte",
          supportBody:
            "La pagina de soporte ofrece guia instantanea primero y registra los casos no resueltos para revision posterior.",
          supportLink: "pagina de soporte",
          supportLead:
            "Los estudiantes que hayan iniciado sesion pueden enviar un problema mediante la ",
        }
      : {
          label: "Contact",
          title: `Contact ${config.brandName}`,
          intro:
            "Start with the student support process for course-specific questions, account issues, certificate issues, and most general requests.",
          supportOptions: "Support options",
          supportBody:
            "The support page provides instant guidance first and captures unresolved issues for follow-up review.",
          supportLink: "support page",
          supportLead:
            "Logged-in students can submit an issue through the ",
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
        <p className="mt-4 leading-7 text-slate-700">{copy.intro}</p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.supportOptions}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.supportBody}</p>
          <p>
            {copy.supportLead}
            <Link
              href={getSupportRoute(state)}
              className="font-medium text-slate-900 underline"
            >
              {copy.supportLink}
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
