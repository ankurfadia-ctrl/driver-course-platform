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
  const language = await getPreferredSiteLanguage()
  const copy =
    language === "es"
      ? {
          approvalLabel: "Aprobacion pendiente",
          title: `${config.stateName} informacion del curso`,
          intro:
            "Revisa esta informacion del curso de Virginia antes de comprar, inscribirte o depender de la finalizacion para requisitos judiciales, laborales, de seguro o del DMV.",
          disclosures: [
            {
              title: "Estado de aprobacion",
              body:
                "La aprobacion del DMV de Virginia aun no ha sido otorgada. Los estudiantes deben revisar la informacion del curso cuidadosamente y confirmar la aceptacion para su requisito especifico antes de inscribirse o depender de la finalizacion.",
            },
            {
              title: "Responsabilidad sobre elegibilidad y aceptacion",
              body:
                "Los estudiantes son responsables de confirmar que un curso en linea de mejoramiento para conductores de Virginia sea aceptable para su tribunal, empleador, seguro o requisito del DMV antes de inscribirse.",
            },
            {
              title: "Expectativas de tiempo del curso",
              body:
                "Se espera que los programas en linea de mejoramiento para conductores de Virginia incluyan al menos ocho horas de instruccion. Los estudiantes deben esperar controles de tiempo, monitoreo de actividad y seguimiento de finalizacion como parte del flujo del curso.",
            },
            {
              title: "Verificacion de identidad",
              body:
                "La verificacion de identidad puede requerirse antes de hitos del curso, durante el curso y antes o durante el examen final. Un estudiante que no pueda completar la validacion de identidad puede verse impedido de terminar el curso.",
            },
            {
              title: "Intentos del examen final",
              body:
                "Las reglas de los examenes finales en linea de Virginia pueden limitar el examen a un intento por dia habil. Los estudiantes deben estar preparados para completar el examen personalmente y permanecer en la pagina del examen durante todo el intento.",
            },
            {
              title: "Soporte y revision de registros",
              body:
                "Los estudiantes deben mantener exactos los datos de su cuenta y usar soporte de inmediato si tienen problemas con compras, acceso, identidad, examen o certificado.",
            },
          ],
          nextSteps: "Proximos pasos para estudiantes",
          nextStepsBody:
            "Revisa esta informacion antes de inscribirte. Si el curso se ajusta a tu situacion, puedes continuar al pago o volver a tu cuenta de estudiante.",
          viewPlans: "Ver planes del curso",
          studentLogin: "Ingreso de estudiantes",
          backToState: `Volver a ${config.stateName}`,
          directPage: "Pagina directa",
          englishNote:
            "El curso ofrece experiencia en ingles y espanol, y el contenido principal del curso y del examen final esta disponible en ambos idiomas.",
          phoneTitle: "Linea telefonica",
          phoneBody:
            "Para obtener ayuda mas rapida, usa primero la pagina de soporte. La linea telefonica esta disponible principalmente para problemas de acceso a la cuenta y asuntos urgentes del curso.",
          phoneLabel: "Telefono",
        }
      : {
          approvalLabel: config.approvalStatusLabel,
          title: `${config.stateName} Course Information`,
          intro: config.disclosuresIntro,
          disclosures: config.disclosures,
          nextSteps: "Next steps for students",
          nextStepsBody:
            "Review this information before enrolling. If the course fits your situation, you can continue to checkout or return to your student account.",
          viewPlans: "View Course Plans",
          studentLogin: "Student Login",
          backToState: `Back to ${config.stateName}`,
          directPage: "Direct page",
          englishNote:
            "The course offers an English and Spanish experience, and the main course and final-exam content are available in both languages.",
          phoneTitle: "Phone line",
          phoneBody:
            "For fastest help, use the support page first. The phone line is mainly for account-access problems and urgent course issues.",
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
              {copy.phoneLabel}:{" "}
              <a
                href={`tel:${config.supportPhone}`}
                className="underline decoration-slate-300 underline-offset-4"
              >
                {config.supportPhoneDisplay}
              </a>
            </p>
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/${state}/checkout`}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {copy.viewPlans}
          </Link>
          <Link
            href={`/${state}/login`}
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
