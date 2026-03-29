import Link from "next/link"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateHomePage({
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
          sectionLabel: `${config.stateName} curso en linea`,
          headline: `Completa tu curso de mejoramiento para conductores de ${config.stateName} en linea.`,
          intro:
            "Completa las lecciones en linea, cumple el tiempo requerido, toma el examen final y accede a tu certificado despues de completar los requisitos del curso.",
          approvalLabel: "Aprobacion pendiente",
          viewPlans: "Ver planes",
          studentLogin: "Ingreso de estudiantes",
          expectationsLabel: "Expectativas del curso en Virginia",
          expectations: [
            "Curso en linea de 8 horas con control del tiempo requerido",
            "Puede requerirse verificacion de identidad durante hitos del curso y antes o durante el examen final",
            "Los intentos del examen final pueden limitarse a un intento por dia habil",
          ],
          steps: [
            [
              "Paso 1",
              "Inscribete y crea tu cuenta",
              "Compra el acceso al curso e inicia sesion con tu cuenta de estudiante antes de comenzar.",
            ],
            [
              "Paso 2",
              "Completa el tiempo requerido del curso",
              "Avanza por las lecciones en linea, mantente activo y cumple el tiempo total requerido.",
            ],
            [
              "Paso 3",
              "Aprueba el examen final y recibe tu certificado",
              "Despues de cumplir los requisitos y aprobar el examen, tu certificado estara disponible en tu cuenta.",
            ],
          ] as const,
          approvalTitle: "Revisa la informacion del curso antes de inscribirte",
          approvalBody:
            "Los estudiantes son responsables de confirmar si un curso en linea de mejoramiento para conductores de Virginia es aceptable para su necesidad especifica ante tribunal, empleador, seguro o DMV antes de comprarlo. Pueden aplicarse verificaciones de identidad, controles de tiempo y reglas del examen final.",
          infoCta: "Leer informacion del curso",
          englishNote:
            "Las lecciones del curso y el examen final actualmente se ofrecen en ingles.",
        }
      : {
          sectionLabel: `${config.stateName} Online Course`,
          headline: config.marketingHeadline,
          intro:
            "Complete lessons online, satisfy the required seat time, take the final exam, and access your certificate after completing the course requirements.",
          approvalLabel: config.approvalStatusLabel,
          viewPlans: "View Plans",
          studentLogin: "Student Login",
          expectationsLabel: "Virginia course expectations",
          expectations: [
            "8-hour online course with required seat-time tracking",
            "Identity verification may be required during course milestones and before or during the final exam",
            "Final exam attempts may be limited to one attempt per business day",
          ],
          steps: [
            [
              "Step 1",
              "Enroll and create your account",
              "Purchase course access and log in with your student account before beginning coursework.",
            ],
            [
              "Step 2",
              "Complete the required course time",
              "Work through the online lessons, remain active in the course, and satisfy the full time requirement.",
            ],
            [
              "Step 3",
              "Pass the final exam and receive your certificate",
              "After you meet the course requirements and pass the exam, your certificate will be available in your account.",
            ],
          ] as const,
          approvalTitle: "Review Virginia disclosures before enrolling",
          approvalBody:
            "Students are responsible for confirming whether an online Virginia driver improvement course is acceptable for their specific court, employer, insurance, or DMV requirement before purchasing. Identity verification, seat-time controls, and final exam rules may apply.",
          infoCta: "Read Course Information",
          englishNote:
            "Course lessons and the final exam are currently available in English.",
        }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="max-w-4xl space-y-5">
            <div className="section-label">{copy.sectionLabel}</div>
            <h1 className="display-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {copy.headline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {copy.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${state}/checkout`}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {copy.viewPlans}
              </Link>
              <Link
                href={`/${state}/login`}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.studentLogin}
              </Link>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
              {copy.englishNote}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#e5edff] bg-[#f8fbff] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              {copy.expectationsLabel}
            </div>
            <div className="mt-5 space-y-3">
              {copy.expectations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#dbe7ff] bg-white p-4 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {copy.steps.map(([step, title, body]) => (
          <div key={step} className="glass-panel rounded-[1.75rem] bg-white p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {step}
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              {copy.approvalLabel}
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.approvalTitle}
            </h2>
            <p className="mt-4 leading-7 text-slate-700">
              {copy.approvalBody}
            </p>
          </div>
          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            {copy.infoCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
