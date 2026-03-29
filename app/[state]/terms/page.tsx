import Link from "next/link"
import { getCourseConfig, getRefundsRoute, getSupportRoute } from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateTermsPage({
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
          label: "Terminos",
          title: `Terminos del curso de ${config.stateName}`,
          intro:
            `Estos terminos describen responsabilidades generales del estudiante y expectativas de uso del curso para la experiencia en linea de ${config.brandName}.`,
          responsibilities: "Responsabilidades del estudiante",
          responsibilitiesBody1:
            "Los estudiantes son responsables de proporcionar informacion exacta de cuenta e identidad, mantener seguro su acceso y completar el curso personalmente.",
          responsibilitiesBody2:
            "Los estudiantes deben confirmar si el curso es aceptable para su tribunal, DMV, empleador, seguro u otro requisito antes de comprarlo o depender de la finalizacion.",
          controls: "Controles del curso",
          controlsBody1:
            "El curso puede usar seguimiento del tiempo, verificacion de identidad, monitoreo de actividad y controles del examen antes de conceder la finalizacion o el acceso al certificado.",
          controlsBody2:
            "No completar los pasos requeridos del curso, las verificaciones de identidad o los requisitos del examen puede impedir la finalizacion.",
          refunds: "Reembolsos",
          refundsBody:
            "Las solicitudes de reembolso pueden revisarse antes de un uso sustancial del curso. Revisa la ",
          refundsLink: "politica de reembolso",
          support: "Soporte",
          supportBody:
            "Para problemas de cuenta, curso o certificado, empieza con la ",
          supportLink: "pagina de soporte",
        }
      : {
          label: "Terms",
          title: `${config.stateName} course terms`,
          intro:
            `These terms describe general student responsibilities and course-use expectations for the ${config.brandName} online course experience.`,
          responsibilities: "Student responsibilities",
          responsibilitiesBody1:
            "Students are responsible for providing accurate account and identity information, keeping login access secure, and completing the course personally.",
          responsibilitiesBody2:
            "Students should confirm whether the course is acceptable for their court, DMV, employer, insurance, or other requirement before purchasing or relying on completion.",
          controls: "Course controls",
          controlsBody1:
            "The course may use seat-time tracking, identity verification, activity monitoring, and exam controls before completion or certificate access is granted.",
          controlsBody2:
            "Failure to complete required course steps, identity checks, or exam requirements may prevent completion.",
          refunds: "Refunds",
          refundsBody:
            "Refund requests may be reviewed before substantial use of the course. Review the ",
          refundsLink: "refund policy",
          support: "Support",
          supportBody:
            "For account, course, or certificate issues, start with the ",
          supportLink: "support page",
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
        <h2 className="text-xl font-semibold text-slate-900">
          {copy.responsibilities}
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.responsibilitiesBody1}</p>
          <p>{copy.responsibilitiesBody2}</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.controls}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.controlsBody1}</p>
          <p>{copy.controlsBody2}</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.refunds}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          {copy.refundsBody}
          <Link
            href={getRefundsRoute(state)}
            className="font-medium text-slate-900 underline"
          >
            {copy.refundsLink}
          </Link>
          .
        </p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.support}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          {copy.supportBody}
          <Link
            href={getSupportRoute(state)}
            className="font-medium text-slate-900 underline"
          >
            {copy.supportLink}
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
