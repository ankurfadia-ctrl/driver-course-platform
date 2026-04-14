import Link from "next/link"
import { getCourseConfig, getSupportRoute } from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StatePrivacyPage({
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
          label: "Privacidad",
          title: `Aviso de privacidad del curso de ${config.stateName}`,
          intro:
            `Esta página explica los tipos de información del estudiante usados por ${config.brandName} para administrar la inscripción, la verificación de identidad, el tiempo del curso, los controles del examen final, la entrega del certificado y los flujos de soporte.`,
          usedByPlatform: "Informacion utilizada por la plataforma",
          usedBody1:
            "La plataforma puede usar información de la cuenta, detalles de compra, información del perfil de identidad, progreso del curso, actividad del tiempo del curso, resultados del examen, registros del certificado y envios de soporte para operar el curso y responder a problemas del estudiante.",
          usedBody2:
            "La información relacionada con la identidad puede incluir nombre legal, fecha de nacimiento, numero de licencia de conducir y respuestas a preguntas de seguridad enviadas por el estudiante para los controles del curso.",
          whyUsed: "Por que se usa la información",
          whyBody1:
            "La información del estudiante se usa para autenticar el acceso, procesar compras, verificar identidad, aplicar controles del curso, emitir certificados, proporcionar soporte y mantener registros operativos.",
          whyBody2:
            "La información tambien puede revisarse internamente para cumplimiento, solucion de problemas, prevencion de fraude y administración del curso.",
          questions: "Preguntas sobre privacidad",
          questionsBody:
            "Si necesitas ayuda con la cuenta, los registros o preguntas de privacidad, empieza con la ",
          supportLink: "página de soporte",
        }
      : {
          label: "Privacy",
          title: `${config.stateName} course privacy notice`,
          intro:
            `This page explains the types of student information used by ${config.brandName} to operate course enrollment, identity verification, seat-time tracking, final exam controls, certificate delivery, and support workflows.`,
          usedByPlatform: "Information used by the platform",
          usedBody1:
            "The platform may use account information, purchase details, identity profile information, course progress, seat-time activity, exam results, certificate records, and support submissions to operate the course and respond to student issues.",
          usedBody2:
            "Identity-related information may include legal name, date of birth, driver license number, and security-question answers submitted by the student for course controls.",
          whyUsed: "Why information is used",
          whyBody1:
            "Student information is used to authenticate access, process purchases, verify identity, enforce course controls, issue certificates, provide support, and maintain operational records.",
          whyBody2:
            "Information may also be reviewed internally for compliance, troubleshooting, fraud prevention, and course administration.",
          questions: "Questions about privacy",
          questionsBody:
            "If you need help with account, record, or privacy questions, start with the ",
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
          {copy.usedByPlatform}
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.usedBody1}</p>
          <p>{copy.usedBody2}</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.whyUsed}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.whyBody1}</p>
          <p>{copy.whyBody2}</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.questions}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          {copy.questionsBody}
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
