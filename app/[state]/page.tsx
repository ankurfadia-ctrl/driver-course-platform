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
  const enrollmentOpen = config.enrollmentOpen
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}/${config.stateSlug}`

  return {
    title: enrollmentOpen
      ? `${config.stateName} Online Driver Improvement Course | ${config.brandName}`
      : `${config.stateName} Driver Improvement Course Preparation | ${config.brandName}`,
    description:
      enrollmentOpen
        ? `${config.stateName} online driver improvement course with secure enrollment, required seat-time tracking, final exam completion, certificate access, and student support.`
        : `${config.stateName} driver improvement course preparation with state-specific rollout planning, disclosures, and approval-readiness updates.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: enrollmentOpen
        ? `${config.stateName} Online Driver Improvement Course`
        : `${config.stateName} Driver Improvement Course Preparation`,
      description: enrollmentOpen
        ? `${config.stateName} online driver improvement course with enrollment, course progress, final exam, and certificate delivery.`
        : `${config.stateName} driver improvement course preparation with state-specific rollout planning and approval-readiness updates.`,
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
      title: enrollmentOpen
        ? `${config.stateName} Online Driver Improvement Course`
        : `${config.stateName} Driver Improvement Course Preparation`,
      description: enrollmentOpen
        ? `${config.stateName} online driver improvement course with course access, final exam, and certificate delivery.`
        : `${config.stateName} driver improvement course preparation with state-specific rollout planning and approval-readiness updates.`,
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
          headline:
            config.stateSlug === "virginia"
              ? `Curso de mejoramiento para conductores de ${config.stateName} en linea.`
              : `Preparacion de cursos de mejoramiento para conductores de ${config.stateName}.`,
          intro:
            config.stateSlug === "virginia"
              ? "Precio simple, curso en ingles y espanol, y examen final incluido dentro del minimo total de 8 horas."
              : "Estamos preparando una experiencia multiestado con inscripcion segura, soporte y materiales regulatorios listos para aprobacion.",
          priceCallout: "Desde $19.99",
          priceSupport:
            config.stateSlug === "virginia"
              ? "Sin cargos ocultos del curso y con planes faciles de comparar."
              : "Las opciones finales de precio y curso se publicaran cuando se complete la aprobacion estatal.",
          approvalLabel: "Aprobacion pendiente",
          viewPlans:
            config.stateSlug === "virginia" ? "Ver planes" : "Ver informacion del estado",
          studentLogin:
            config.stateSlug === "virginia" ? "Ingreso de estudiantes" : "Ver divulgaciones",
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
          expectationsLabel:
            config.stateSlug === "virginia"
              ? "Expectativas del curso en Virginia"
              : `Preparacion del programa en ${config.stateName}`,
          expectations:
            config.stateSlug === "virginia"
              ? [
                  "Curso en linea de 8 horas; el examen final cuenta dentro del minimo total de 8 horas",
                  "La verificacion de identidad es obligatoria durante el curso y antes del examen final",
                  "El examen final solo puede tomarse una vez por dia habil",
                  "Los estudiantes deben completar el curso dentro de 90 dias desde la compra",
                ]
              : [
                  "Los requisitos oficiales del curso se alinearan con la orientacion del regulador estatal",
                  "Las divulgaciones, certificados y reglas de finalizacion seran especificos del estado",
                  "Las experiencias de soporte, inscripcion y progreso se estan haciendo reutilizables para varios estados",
                  "Las rutas del curso se publicaran cuando el contenido y los requisitos esten listos",
                ],
          steps: [
            [
              "Paso 1",
              config.stateSlug === "virginia" ? "Inscribete y crea tu cuenta" : "Solicita criterios oficiales",
              config.stateSlug === "virginia"
                ? "Compra el acceso al curso e inicia sesion con tu cuenta de estudiante antes de comenzar."
                : "El siguiente estado se configura solo despues de recibir los criterios oficiales y las reglas de aprobacion del regulador.",
            ],
            [
              "Paso 2",
              config.stateSlug === "virginia" ? "Completa el tiempo requerido del curso" : "Construye el paquete del curso",
              config.stateSlug === "virginia"
                ? "Avanza por las lecciones en linea, mantente activo y llega al punto de desbloqueo del examen final despues de al menos 7 horas de instruccion."
                : "El contenido, las divulgaciones, el soporte, el flujo de certificados y el paquete regulatorio se preparan de acuerdo con el estado.",
            ],
            [
              "Paso 3",
              config.stateSlug === "virginia" ? "Aprueba el examen final y recibe tu certificado" : "Lanzamiento despues de aprobacion",
              config.stateSlug === "virginia"
                ? "El examen final forma parte del minimo total de 8 horas. Despues de aprobarlo y completar el tiempo total requerido, tu certificado estara disponible en tu cuenta."
                : "El curso solo se abrira para estudiantes despues de que la aprobacion, el reporte y los requisitos operativos del estado esten listos.",
            ],
          ] as const,
          valueLabel: "Por que elegir este curso",
          valuePoints: [
            ...(config.stateSlug === "virginia"
              ? [
                  "Precio bajo y transparente",
                  "Examen final incluido dentro de las 8 horas",
                  "Funciona en telefono o computadora",
                  "Experiencia en ingles y espanol",
                  "FAQ, IA y opcion de soporte prioritario",
                ]
              : [
                  "Motor compartido para varios estados",
                  "Soporte, divulgaciones y configuracion reutilizables",
                  "Experiencia en ingles y espanol",
                  "Base de conocimiento integrada para preguntas frecuentes",
                  "Paquetes regulatorios y operativos listos para escalar",
                ]),
          ],
          approvalTitle:
            config.stateSlug === "virginia"
              ? "Revisa la informacion del curso antes de inscribirte"
              : `Preparacion de aprobacion para ${config.stateName}`,
          approvalBody:
            config.stateSlug === "virginia"
              ? "Los estudiantes son responsables de confirmar si un curso en linea de mejoramiento para conductores de Virginia es aceptable para su necesidad especifica ante tribunal, empleador, seguro o DMV antes de comprarlo. Pueden aplicarse verificaciones de identidad, controles de tiempo y reglas del examen final."
              : `${config.stateName} aun esta en preparacion. Las divulgaciones, el contenido, la emision de certificados y cualquier regla de reporte o aceptacion se finalizaran cuando el regulador estatal proporcione los criterios oficiales.`,
          infoCta: "Leer informacion del curso",
          englishNote:
            config.stateSlug === "virginia"
              ? "El curso ofrece experiencia en ingles y espanol, y el contenido principal del curso y del examen final esta disponible en ambos idiomas."
              : "La plataforma se esta configurando para ofrecer una experiencia en ingles y espanol donde el estado y el regulador lo permitan.",
          priceMatchHome:
            config.stateSlug === "virginia"
              ? "Si encuentras un precio publico mas bajo para un curso equivalente de Virginia en linea, preguntanos por una posible igualacion de precio antes de comprar."
              : "La estructura final de precios para este estado se publicara cuando el curso este listo para lanzamiento.",
          priceMatchHomeCta: "Solicitar igualacion",
        }
      : {
          sectionLabel: `${config.stateName} Online Course`,
          headline:
            config.stateSlug === "virginia"
              ? `${config.stateName} Driver Improvement Course Online`
              : `${config.stateName} Driver Improvement Course Preparation`,
          intro:
            config.stateSlug === "virginia"
              ? "Simple pricing, English and Spanish course flow, and the final exam is included in the full 8-hour minimum."
              : "State rollout planning is underway with shared enrollment, support, and approval-readiness infrastructure.",
          priceCallout: "From $19.99",
          priceSupport:
            config.stateSlug === "virginia"
              ? "No hidden course fees and easy plan choices."
              : "Final pricing and course-track launch details will be published after state approval planning is complete.",
          approvalLabel: config.approvalStatusLabel,
          viewPlans:
            config.stateSlug === "virginia" ? "View Plans" : "View State Information",
          studentLogin:
            config.stateSlug === "virginia" ? "Student Login" : "Read Disclosures",
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
          expectationsLabel:
            config.stateSlug === "virginia"
              ? "Virginia course expectations"
              : `${config.stateName} rollout readiness`,
          expectations:
            config.stateSlug === "virginia"
              ? [
                  "8-hour online course; the final exam is included in the overall 8-hour minimum",
                  "Identity verification is required during the course and before the final exam",
                  "The final exam can be taken only once per business day",
                  "Students should complete the course within 90 days of purchase",
                ]
              : [
                  "Official course requirements will follow state regulator guidance",
                  "Disclosures, certificate workflow, and reporting rules will be finalized before launch",
                  "Shared support, enrollment, and multilingual infrastructure is already being prepared",
                  "Course tracks will publish after content criteria and submission requirements are confirmed",
                ],
          steps: [
            [
              "Step 1",
              config.stateSlug === "virginia" ? "Enroll and create your account" : "Request official criteria",
              config.stateSlug === "virginia"
                ? "Purchase course access and log in with your student account before beginning coursework."
                : "Each new state starts with official regulator guidance before course content, certificates, and workflows are finalized.",
            ],
            [
              "Step 2",
              config.stateSlug === "virginia" ? "Complete the required course time" : "Build the state packet",
              config.stateSlug === "virginia"
                ? "Work through the online lessons, remain active in the course, and reach the final-exam unlock point after at least 7 hours of instruction."
                : "Curriculum, disclosures, support, certificate flow, and regulator-facing materials are prepared to fit that state.",
            ],
            [
              "Step 3",
              config.stateSlug === "virginia" ? "Pass the final exam and receive your certificate" : "Launch after approval readiness",
              config.stateSlug === "virginia"
                ? "The final exam is included in the overall 8-hour minimum. After you pass the exam and complete the full time requirement, your certificate will be available in your account."
                : "The course opens only after the state-specific approval, operations, and student-facing requirements are ready.",
            ],
          ] as const,
          valueLabel: "Why choose this course",
          valuePoints: [
            ...(config.stateSlug === "virginia"
              ? [
                  "Low transparent pricing",
                  "Final exam included in the full 8-hour minimum",
                  "Works on phone or computer",
                  "English and Spanish experience",
                  "FAQ, AI help, and optional priority support",
                ]
              : [
                  "Multi-state shared platform foundation",
                  "Reusable support, disclosure, and certificate tooling",
                  "English and Spanish experience",
                  "Built-in knowledge-base support chat",
                  "Approval-packet and operations workflow already in place",
                ]),
          ],
          approvalTitle:
            config.stateSlug === "virginia"
              ? "Review Virginia disclosures before enrolling"
              : `Approval preparation for ${config.stateName}`,
          approvalBody:
            config.stateSlug === "virginia"
              ? "Students are responsible for confirming whether an online Virginia driver improvement course is acceptable for their specific court, employer, insurance, or DMV requirement before purchasing. Identity verification, seat-time controls, and final exam rules may apply."
              : `${config.stateName} is still in preparation. Disclosures, content, certificate issuance, and any reporting or acceptance rules will be finalized after the state regulator returns official criteria.`,
          infoCta: "Read Course Information",
          englishNote:
            config.stateSlug === "virginia"
              ? "The course offers an English and Spanish experience, and the main course and final-exam content are available in both languages."
              : "The platform is being prepared to support English and Spanish experiences where the state and regulator permit them.",
          priceMatchHome:
            config.stateSlug === "virginia"
              ? "If you find a lower publicly advertised price for an equivalent Virginia online course, ask us about a possible price match before you buy."
              : "State-specific pricing will be published when the course track is ready for launch.",
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
                href={
                  config.stateSlug === "virginia"
                    ? `/${state}/checkout`
                    : getDisclosuresRoute(state)
                }
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {copy.viewPlans}
              </Link>
              <Link
                href={
                  config.stateSlug === "virginia"
                    ? `/${state}/login`
                    : getDisclosuresRoute(state)
                }
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.studentLogin}
              </Link>
            </div>
            {config.stateSlug === "virginia" ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
                <div>{copy.priceMatchHome}</div>
                <Link
                  href={`/${state}/price-match`}
                  className="mt-2 inline-flex font-semibold underline"
                >
                  {copy.priceMatchHomeCta}
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
                {copy.priceMatchHome}
              </div>
            )}
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
