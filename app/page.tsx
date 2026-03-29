import Link from "next/link"
import LanguageToggle from "@/components/language-toggle"
import { COURSE_CONFIGS } from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

const states = Object.values(COURSE_CONFIGS)

export default async function HomePage() {
  const language = await getPreferredSiteLanguage()
  const copy =
    language === "es"
      ? {
          sectionLabel: "Cursos de mejoramiento para conductores",
          title:
            "Cursos en linea para conductores con inscripcion y finalizacion claras.",
          body:
            "Los estudiantes pueden crear cuentas, inscribirse en linea, completar el curso, cumplir los requisitos, tomar un examen final cuando corresponda y recibir un certificado al terminar.",
          launchVirginia: "Abrir Virginia",
          studentLogin: "Ingreso de estudiantes",
          verifyCertificate: "Verificar certificado",
          lifecycle: "Todo el proceso del curso",
          lifecycleItems: [
            "Registro e inicio de sesion",
            "Pago seguro con Stripe",
            "Tiempo del curso y progreso por leccion",
            "Examen final con controles de intento",
            "Generacion y verificacion de certificados",
            "Soporte para estudiantes y administracion",
          ],
          availability: "Disponibilidad actual",
          cards: [
            ["Inscripcion", "Cuentas de estudiantes, pago seguro y acceso protegido al curso"],
            ["Progreso", "Tiempo del curso, avance por lecciones y registros de finalizacion"],
            ["Examen final", "Tiempo de examen, controles de intento y requisitos para aprobar"],
            ["Certificado", "Acceso al certificado, verificacion e informacion de soporte"],
          ] as const,
          stateSummary:
            "Inscripcion en linea, progreso del curso, examen final y acceso al certificado.",
        }
      : {
          sectionLabel: "Online Driver Improvement Courses",
          title:
            "Online driver improvement courses with clear enrollment and completion.",
          body:
            "Students can create accounts, enroll online, complete coursework, meet course requirements, take a final exam when required, and receive a certificate after completion.",
          launchVirginia: "Launch Virginia",
          studentLogin: "Student Login",
          verifyCertificate: "Verify Certificate",
          lifecycle: "Built for the full course lifecycle",
          lifecycleItems: [
            "Student signup and login",
            "Protected Stripe checkout",
            "Seat-time tracking and lesson progression",
            "Timed final exam and attempt controls",
            "Certificate generation and verification",
            "Student support and admin workflows",
          ],
          availability: "Current course availability",
          cards: [
            ["Enrollment", "Student accounts, secure payment, and protected course access"],
            ["Course progress", "Seat-time tracking, lesson progress, and completion records"],
            ["Final exam", "Exam timing, attempt controls, and passing requirements"],
            ["Certificate", "Certificate access, verification, and support information"],
          ] as const,
          stateSummary:
            "Online driver improvement course enrollment, progress tracking, final exam completion, and certificate access.",
        }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="section-label">{copy.sectionLabel}</div>
              <LanguageToggle language={language} />
            </div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {copy.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {copy.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/virginia"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {copy.launchVirginia}
              </Link>
              <Link
                href="/virginia/login"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.studentLogin}
              </Link>
              <Link
                href="/verify"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.verifyCertificate}
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white">
            <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
              {copy.cards.map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-[#e5edff] bg-[#f8fbff] p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {title}
                  </div>
                  <div className="mt-3 text-base font-semibold text-slate-950">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.lifecycle}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {copy.lifecycleItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.availability}
            </div>
            <div className="mt-6 space-y-4">
              {states.map((config) => (
                <Link
                  key={config.stateSlug}
                  href={`/${config.stateSlug}`}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white"
                >
                  <div className="text-xl font-semibold text-slate-950">
                    {config.stateName}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">
                    {config.stateCode === "VA"
                      ? language === "es"
                        ? "Curso de 8 horas en linea; el examen final cuenta dentro del minimo total de 8 horas."
                        : "8-hour online course; the final exam is included in the overall 8-hour minimum."
                      : copy.stateSummary}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
