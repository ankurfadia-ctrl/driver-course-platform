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
  const canonicalUrl = `${baseUrl}/${config.stateSlug}`

  return {
    title: `${config.stateName} Online Driver Improvement Course | ${config.brandName}`,
    description:
      `${config.stateName} online driver improvement course with secure enrollment, required seat-time tracking, final exam completion, certificate access, and student support.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${config.stateName} Online Driver Improvement Course`,
      description:
        `${config.stateName} online driver improvement course with enrollment, course progress, final exam, and certificate delivery.`,
      url: canonicalUrl,
      siteName: config.brandName,
      images: [
        {
          url: `${baseUrl}${config.logoSrc}`,
          width: 256,
          height: 256,
          alt: config.brandName,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${config.stateName} Online Driver Improvement Course`,
      description:
        `${config.stateName} online driver improvement course with course access, final exam, and certificate delivery.`,
      images: [`${baseUrl}${config.logoSrc}`],
    },
  }
}

export default async function StateHomePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}/${config.stateSlug}`
  const copy =
    language === "es"
      ? {
          sectionLabel: `${config.stateName} curso en linea`,
          headline: `Curso de mejoramiento para conductores de ${config.stateName} en linea.`,
          intro:
            "Precio simple, curso en ingles y espanol, y examen final incluido dentro del minimo total de 8 horas.",
          priceCallout: "Desde $19.99",
          priceSupport: "Sin cargos ocultos del curso y con planes faciles de comparar.",
          approvalLabel: "Aprobacion pendiente",
          viewPlans: "Ver planes",
          studentLogin: "Ingreso de estudiantes",
          compareTitle: "Compara opciones rapidamente",
          comparePlans: [
            {
              name: "Estandar",
              price: "$19.99",
              detail: "Curso completo con FAQ y chat con IA.",
            },
            {
              name: "Prioritario",
              price: "$24.99",
              detail: "Curso completo con soporte humano prioritario.",
            },
            {
              name: "Premium",
              price: "$34.99",
              detail: "Curso, soporte prioritario, revision judicial y copia por correo.",
            },
          ] as const,
          expectationsLabel: "Expectativas del curso en Virginia",
          expectations: [
            "Curso en linea de 8 horas; el examen final cuenta dentro del minimo total de 8 horas",
            "La verificacion de identidad es obligatoria durante el curso y antes del examen final",
            "El examen final solo puede tomarse una vez por dia habil",
            "Los estudiantes deben completar el curso dentro de 90 dias desde la compra",
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
              "Avanza por las lecciones en linea, mantente activo y llega al punto de desbloqueo del examen final despues de al menos 7 horas de instruccion.",
            ],
            [
              "Paso 3",
              "Aprueba el examen final y recibe tu certificado",
              "El examen final forma parte del minimo total de 8 horas. Despues de aprobarlo y completar el tiempo total requerido, tu certificado estara disponible en tu cuenta.",
            ],
          ] as const,
          valueLabel: "Por que elegir este curso",
          valuePoints: [
            "Precio bajo y transparente",
            "Examen final incluido dentro de las 8 horas",
            "Funciona en telefono o computadora",
            "Experiencia en ingles y espanol",
            "FAQ, IA y opcion de soporte prioritario",
          ],
          approvalTitle: "Revisa la informacion del curso antes de inscribirte",
          approvalBody:
            "Los estudiantes son responsables de confirmar si un curso en linea de mejoramiento para conductores de Virginia es aceptable para su necesidad especifica ante tribunal, empleador, seguro o DMV antes de comprarlo. Pueden aplicarse verificaciones de identidad, controles de tiempo y reglas del examen final.",
          infoCta: "Leer informacion del curso",
          englishNote:
            "El curso ofrece experiencia en ingles y espanol, y el contenido principal del curso y del examen final esta disponible en ambos idiomas.",
          priceMatchHome:
            "Si encuentras un precio publico mas bajo para un curso equivalente de Virginia en linea, preguntanos por una posible igualacion de precio antes de comprar.",
          priceMatchHomeCta: "Solicitar igualacion",
        }
      : {
          sectionLabel: `${config.stateName} Online Course`,
          headline: `${config.stateName} Driver Improvement Course Online`,
          intro:
            "Simple pricing, English and Spanish course flow, and the final exam is included in the full 8-hour minimum.",
          priceCallout: "From $19.99",
          priceSupport: "No hidden course fees and easy plan choices.",
          approvalLabel: config.approvalStatusLabel,
          viewPlans: "View Plans",
          studentLogin: "Student Login",
          compareTitle: "Compare plans quickly",
          comparePlans: [
            {
              name: "Standard",
              price: "$19.99",
              detail: "Full course with FAQ and AI chat.",
            },
            {
              name: "Priority",
              price: "$24.99",
              detail: "Full course with priority human support.",
            },
            {
              name: "Premium",
              price: "$34.99",
              detail: "Course, priority support, court review, and mailed certificate.",
            },
          ] as const,
          expectationsLabel: "Virginia course expectations",
          expectations: [
            "8-hour online course; the final exam is included in the overall 8-hour minimum",
            "Identity verification is required during the course and before the final exam",
            "The final exam can be taken only once per business day",
            "Students should complete the course within 90 days of purchase",
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
              "Work through the online lessons, remain active in the course, and reach the final-exam unlock point after at least 7 hours of instruction.",
            ],
            [
              "Step 3",
              "Pass the final exam and receive your certificate",
              "The final exam is included in the overall 8-hour minimum. After you pass the exam and complete the full time requirement, your certificate will be available in your account.",
            ],
          ] as const,
          valueLabel: "Why choose this course",
          valuePoints: [
            "Low transparent pricing",
            "Final exam included in the full 8-hour minimum",
            "Works on phone or computer",
            "English and Spanish experience",
            "FAQ, AI help, and optional priority support",
          ],
          approvalTitle: "Review Virginia disclosures before enrolling",
          approvalBody:
            "Students are responsible for confirming whether an online Virginia driver improvement course is acceptable for their specific court, employer, insurance, or DMV requirement before purchasing. Identity verification, seat-time controls, and final exam rules may apply.",
          infoCta: "Read Course Information",
          englishNote:
            "The course offers an English and Spanish experience, and the main course and final-exam content are available in both languages.",
          priceMatchHome:
            "If you find a lower publicly advertised price for an equivalent Virginia online course, ask us about a possible price match before you buy.",
          priceMatchHomeCta: "Request a match",
        }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.brandName,
    url: canonicalUrl,
    telephone: config.supportPhoneDisplay,
    email: config.supportEmail,
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: config.courseName,
    description: config.marketingDescription,
    provider: {
      "@type": "Organization",
      name: config.brandName,
      url: canonicalUrl,
    },
  }

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, courseSchema]),
        }}
      />
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
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
              <div>{copy.priceMatchHome}</div>
              <Link
                href={`/${state}/price-match`}
                className="mt-2 inline-flex font-semibold underline"
              >
                {copy.priceMatchHomeCta}
              </Link>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
              {copy.englishNote}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
              <div className="font-semibold uppercase tracking-[0.16em] text-slate-900">
                {copy.valueLabel}
              </div>
              <div className="mt-3 space-y-2">
                {copy.valuePoints.map((item) => (
                  <div key={item}>-  {item}</div>
                ))}
              </div>
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
