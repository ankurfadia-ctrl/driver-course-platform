import type { Metadata } from "next"
import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"
import { getFloridaTrackPreviews } from "@/lib/florida-course-tracks"
import { buildDriverPriceMatchTerms } from "@/lib/price-match"
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
      : `${config.stateName} Driver Improvement Course Information | ${config.brandName}`,
    description:
      enrollmentOpen
        ? `${config.stateName} online driver improvement course with secure enrollment, required seat-time tracking, final exam completion, certificate access, and student support.`
        : `${config.stateName} driver improvement course information with pricing, course details, and enrollment updates as they become available.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: enrollmentOpen
        ? `${config.stateName} Online Driver Improvement Course`
        : `${config.stateName} Driver Improvement Course Information`,
      description: enrollmentOpen
        ? `${config.stateName} online driver improvement course with enrollment, course progress, final exam, and certificate delivery.`
        : `${config.stateName} driver improvement course information with pricing, course details, and enrollment updates as they become available.`,
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
        : `${config.stateName} Driver Improvement Course Information`,
      description: enrollmentOpen
        ? `${config.stateName} online driver improvement course with course access, final exam, and certificate delivery.`
        : `${config.stateName} driver improvement course information with pricing, course details, and enrollment updates as they become available.`,
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
  const secondarySupportPhoneDisplay = config.secondarySupportPhoneDisplay ?? null
  const secondarySupportPhone = config.secondarySupportPhone ?? null
  const language = await getPreferredSiteLanguage()
  const floridaTrackPreviews =
    config.stateSlug === "florida" ? getFloridaTrackPreviews() : []
  const primarySupportPhoneLabel =
    language === "es"
      ? `Línea principal de ${config.stateName}`
      : `${config.stateName} primary line`
  const secondarySupportPhoneLabel =
    language === "es" ? "Línea gratuita alternativa" : "Toll-free alternate line"
  const secondarySupportPhoneSummary =
    language === "es"
      ? "Línea alternativa regulatoria (requerida)"
      : "Regulatory alternate line (required)"
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}/${config.stateSlug}`
  const copy =
    language === "es"
      ? {
          sectionLabel: `${config.stateName} curso en línea`,
          headline:
            config.stateSlug === "virginia"
              ? `Curso de mejoramiento para conductores de ${config.stateName} en línea.`
              : `Información del curso de mejoramiento para conductores de ${config.stateName}.`,
          intro:
            config.stateSlug === "virginia"
              ? "Toma tu curso de mejoramiento para conductores de Virginia en línea con envío automático al DMV y el examen final incluido dentro del total de 8 horas."
              : "Consulta qué esperar, cómo funcionará la inscripción y dónde ver las actualizaciones cuando este curso estatal esté disponible.",
          priceCallout: "Desde $19.99",
          priceSupport:
            config.stateSlug === "virginia"
              ? "Sin cargos ocultos del curso y con planes fáciles de comparar."
              : "El precio y los detalles de inscripción se publicarán aquí cuando el curso abra.",
          approvalLabel:
            config.stateSlug === "virginia"
              ? config.approvalStatusLabelEs ?? "Revisión del DMV de Virginia en curso"
              : "Aprobación pendiente",
          viewPlans:
            config.stateSlug === "virginia"
              ? "Ver planes"
              : config.stateSlug === "florida"
                ? "Explorar cursos de Florida"
                : "Ver información del estado",
          studentLogin:
            config.stateSlug === "virginia"
              ? "Ingreso de estudiantes"
              : config.stateSlug === "florida"
                ? "Abrir vista previa BDI"
                : "Ver divulgaciones",
          compareTitle: "Compara opciones rápidamente",
          comparePlans: [
            {
              name: "Estándar",
              price: "$19.99",
              detail: "Curso completo con ayuda automatizada y preguntas frecuentes.",
            },
            {
              name: "Prioritario",
              price: "$24.99",
              detail: "Curso completo con soporte humano prioritario.",
            },
            {
              name: "Premium",
              price: "$34.99",
              detail: "Curso, soporte prioritario, revisión judicial y copia por correo.",
            },
          ] as const,
          expectationsLabel:
            config.stateSlug === "virginia"
              ? "Expectativas del curso en Virginia"
              : `Información del curso en ${config.stateName}`,
          expectations:
            config.stateSlug === "virginia"
              ? [
                  "Curso en línea de 8 horas; el examen final cuenta dentro del mínimo total de 8 horas",
                  "La verificación de identidad es obligatoria durante el curso y antes del examen final",
                  "El examen final solo puede tomarse una vez por día hábil",
                  "Los estudiantes deben completar el curso dentro de 90 días desde la compra",
                ]
              : [
                  "Los requisitos específicos del estado se publicarán aquí antes de abrir la inscripción",
                  "Las reglas del certificado, finalización y soporte aparecerán en un solo lugar",
                  "Vuelve a esta página para ver precios, fechas y actualizaciones de inscripción",
                ],
          steps: [
            [
              "Paso 1",
              config.stateSlug === "virginia" ? "Inscríbete y crea tu cuenta" : "Revisa la información del estado",
              config.stateSlug === "virginia"
                ? "Compra el acceso al curso e inicia sesión con tu cuenta de estudiante antes de comenzar."
                : "Lee los detalles del curso y las notas de aceptación antes de hacer planes para este requisito.",
            ],
            [
              "Paso 2",
              config.stateSlug === "virginia" ? "Completa el tiempo requerido del curso" : "Consulta precios y actualizaciones",
              config.stateSlug === "virginia"
                ? "Avanza por las lecciones en línea, mantente activo y llega al punto de desbloqueo del examen final después de al menos 7 horas de instrucción."
                : "Cuando este curso abra, esta página mostrará precios, acceso al curso y detalles del certificado.",
            ],
            [
              "Paso 3",
              config.stateSlug === "virginia" ? "Aprueba el examen final y recibe tu certificado" : "Crea tu cuenta cuando abra",
              config.stateSlug === "virginia"
                ? "El examen final forma parte del mínimo total de 8 horas. Después de aprobarlo y completar el tiempo total requerido, tu certificado estará disponible en tu cuenta."
                : "Cuando la inscripción esté disponible, podrás crear tu cuenta, comprar el curso y comenzar en línea.",
            ],
          ] as const,
          valueLabel: "Por qué elegir este curso",
          valuePoints: [
            ...(config.stateSlug === "virginia"
              ? [
                  "Divulgaciones claras específicas de Virginia",
                  "Examen final incluido dentro de las 8 horas",
                  "Envío automático del certificado al DMV",
                  "Funciona en teléfono o computadora",
                  "Garantía de igualación de precio",
                  "Líneas de soporte principal y alternativa",
                ]
              : [
                  "Información clara específica para cada estado",
                  "Páginas de soporte y divulgaciones fáciles de revisar",
                  "Ayuda integrada para preguntas frecuentes",
                  "Precios y fechas agregados aquí cuando el curso abra",
                ]),
          ],
          approvalTitle:
            config.stateSlug === "virginia"
              ? "Revisa la información del curso antes de inscribirte"
              : config.stateSlug === "florida"
                ? "Florida se está organizando en cuatro cursos"
              : `Lo que debes saber antes de que abra ${config.stateName}`,
          approvalBody:
            config.stateSlug === "virginia"
              ? "La presentación de Virginia está bajo revisión del DMV. Los estudiantes siguen siendo responsables de confirmar si un curso en línea de mejoramiento para conductores de Virginia es aceptable para su necesidad específica ante tribunal, empleador, seguro o DMV antes de comprarlo. Pueden aplicarse verificaciones de identidad, controles de tiempo y reglas del examen final."
              : config.stateSlug === "florida"
                ? "Florida ya no se presenta como un solo curso genérico. Cada tipo de curso tendrá su propia información, detalles y calendario de apertura."
              : `${config.stateName} aún no está abierto. Los precios, certificados y reglas específicas del estado se publicarán aquí cuando los requisitos oficiales queden confirmados.`,
          infoCta: "Leer información del curso",
          summaryHome:
            config.stateSlug === "virginia"
              ? "Revisa la información del curso, las reglas de tiempo, la verificación de identidad y los detalles del certificado antes de inscribirte."
              : "Los precios y los detalles de inscripción para este estado se publicarán aquí cuando el curso esté disponible.",
          summaryHomeCta:
            config.stateSlug === "virginia"
              ? "Leer información del curso"
              : "Volver al estado",
          summaryHomeSecondaryCta:
            config.stateSlug === "virginia"
              ? "Ver preguntas frecuentes"
              : null,
        }
      : {
          sectionLabel: `${config.stateName} Online Course`,
          headline:
            config.stateSlug === "virginia"
              ? `${config.stateName} Driver Improvement Course Online`
              : `${config.stateName} Driver Improvement Course Information`,
          intro:
            config.stateSlug === "virginia"
        ? "Take your Virginia driver improvement course online with automatic DMV reporting and the final exam included in the full 8-hour course."
              : "See what to expect, how enrollment will work, and where to check for updates as this state course becomes available.",
          priceCallout: "From $19.99",
          priceSupport:
            config.stateSlug === "virginia"
              ? "No hidden course fees and easy plan choices."
              : "Pricing and enrollment details will be posted here when this course opens.",
          approvalLabel: config.approvalStatusLabel,
          viewPlans:
            config.stateSlug === "virginia"
              ? "View Plans"
              : config.stateSlug === "florida"
                ? "Explore Florida Tracks"
                : "View State Information",
          studentLogin:
            config.stateSlug === "virginia"
              ? "Student Login"
              : config.stateSlug === "florida"
                ? "Open BDI Preview"
                : "Read Disclosures",
          compareTitle: "Compare plans quickly",
          comparePlans: [
            {
              name: "Standard",
              price: "$19.99",
              detail: "Full course with self-service help and FAQ support.",
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
              : `${config.stateName} course information`,
          expectations:
            config.stateSlug === "virginia"
              ? [
                  "8-hour online course; the final exam is included in the overall 8-hour minimum",
                  "Identity verification is required during the course and before the final exam",
                  "The final exam can be taken only once per business day",
                  "Students should complete the course within 90 days of purchase",
                ]
              : [
                  "State-specific requirements will be posted here before enrollment opens",
                  "Certificate details, completion rules, and support information will be listed in one place",
                  "Check this page for pricing and enrollment updates",
                ],
          steps: [
            [
              "Step 1",
              config.stateSlug === "virginia" ? "Enroll and create your account" : "Review state information",
              config.stateSlug === "virginia"
                ? "Purchase course access and log in with your student account before beginning coursework."
                : "Read the course details and acceptance notes for your state before making plans.",
            ],
            [
              "Step 2",
              config.stateSlug === "virginia" ? "Complete the required course time" : "Watch for enrollment updates",
              config.stateSlug === "virginia"
                ? "Work through the online lessons, remain active in the course, and reach the final-exam unlock point after at least 7 hours of instruction."
                : "Pricing, course access, and certificate details will appear here when the course opens.",
            ],
            [
              "Step 3",
              config.stateSlug === "virginia" ? "Pass the final exam and receive your certificate" : "Create your account when it opens",
              config.stateSlug === "virginia"
                ? "The final exam is included in the overall 8-hour minimum. After you pass the exam and complete the full time requirement, your certificate will be available in your account."
                : "Once enrollment is available, you will be able to create a student account, purchase the course, and begin online.",
            ],
          ] as const,
          valueLabel: "Why choose this course",
          valuePoints: [
            ...(config.stateSlug === "virginia"
              ? [
                  "Clear Virginia-specific disclosures",
                  "Final exam included in the full 8-hour minimum",
                  "Automatic DMV certificate delivery",
                  "Works on phone or computer",
                  "Price match guaranteed",
                  "Help center and phone support",
                ]
              : [
                  "Clear state-specific course information",
                  "Support and disclosure pages that are easy to review",
                  "Built-in help for common questions",
                  "Pricing and enrollment updates posted here as they are available",
                ]),
          ],
          approvalTitle:
            config.stateSlug === "virginia"
              ? "Review Virginia disclosures before enrolling"
              : config.stateSlug === "florida"
                ? "Florida is being organized into four course tracks"
              : `What to know before ${config.stateName} opens`,
          approvalBody:
            config.stateSlug === "virginia"
              ? "The Virginia submission is under DMV review. Students are still responsible for confirming whether an online Virginia driver improvement course is acceptable for their specific court, employer, insurance, or DMV requirement before purchasing. Identity verification, seat-time controls, and final exam rules may apply."
              : config.stateSlug === "florida"
                ? "Florida is no longer presented as one generic course. Each course type will have its own course information, pricing details, and opening updates."
              : `${config.stateName} is not open yet. Pricing, certificates, and state-specific rules will be posted here as soon as the official requirements are confirmed.`,
          infoCta: "Read Course Information",
          summaryHome:
            config.stateSlug === "virginia"
        ? "Review Virginia course information, identity checks, automatic DMV reporting, and certificate details before you enroll."
              : "State pricing and enrollment details will be posted here when the course becomes available.",
          summaryHomeCta:
            config.stateSlug === "virginia"
              ? "Read course information"
              : "Back to state",
          summaryHomeSecondaryCta:
            config.stateSlug === "virginia"
              ? "View FAQ"
              : null,
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
                    : config.stateSlug === "florida"
                      ? "#florida-course-tracks"
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
                    : config.stateSlug === "florida"
                      ? "/florida-bdi"
                    : getDisclosuresRoute(state)
                }
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.studentLogin}
              </Link>
            </div>
            {secondarySupportPhoneDisplay && secondarySupportPhone ? (
              <div className="text-xs leading-6 text-slate-500">
                {primarySupportPhoneLabel}:{" "}
                <a
                  href={`tel:${config.supportPhone}`}
                  className="underline decoration-slate-300 underline-offset-4"
                >
                  {config.supportPhoneDisplay}
                </a>
                <details className="mt-2">
                  <summary className="cursor-pointer list-none text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
                    {secondarySupportPhoneSummary}
                  </summary>
                  <div className="mt-2">
                    {secondarySupportPhoneLabel}:{" "}
                    <a
                      href={`tel:${secondarySupportPhone}`}
                      className="underline decoration-slate-300 underline-offset-4"
                    >
                      {secondarySupportPhoneDisplay}
                    </a>
                  </div>
                </details>
              </div>
            ) : null}
            {config.stateSlug === "virginia" ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
                <div>{copy.summaryHome}</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    href={getDisclosuresRoute(state)}
                    className="inline-flex font-semibold underline"
                  >
                    {copy.summaryHomeCta}
                  </Link>
                  {copy.summaryHomeSecondaryCta ? (
                    <Link
                      href={`/${state}/faq`}
                      className="inline-flex font-semibold underline"
                    >
                      {copy.summaryHomeSecondaryCta}
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
                {copy.summaryHome}
              </div>
            )}
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

      <PriceMatchGuaranteePanel
        label={language === "es" ? "Garantía de igualación de precio" : "Price Match Guarantee"}
        title={
          language === "es"
            ? config.enrollmentOpen
              ? `Si encuentras un precio público más bajo para un curso equivalente de ${config.stateName}, lo igualamos o lo mejoramos por $1.`
              : `Si encuentras un precio público más bajo para un curso equivalente de ${config.stateName}, revisamos la solicitud ahora y la respetamos cuando abra la inscripción.`
            : config.enrollmentOpen
              ? `If you find a lower public ${config.stateName} course price, we will match it or beat it by $1.`
              : `If you find a lower public ${config.stateName} course price, we will review it now and honor qualified requests when enrollment opens.`
        }
        description={
          language === "es"
            ? "Si encuentras un precio público más bajo para un curso equivalente, envíanoslo aquí y lo revisaremos."
            : "If you find a lower public price for a comparable course, send it here and we will review it."
        }
        href={`/${state}/price-match`}
        ctaLabel={language === "es" ? "Solicitar igualación" : "Request a price match"}
        accent="blue"
        terms={buildDriverPriceMatchTerms(
          config.stateName,
          config.enrollmentOpen,
          language
        )}
      />

      {config.stateSlug === "florida" ? (
        <section
          id="florida-course-tracks"
          className="rounded-[2rem] border border-sky-200 bg-sky-50 p-7 shadow-sm"
        >
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Florida Course Options
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Choose the Florida course type you need
            </h2>
            <p className="mt-4 leading-7 text-slate-700">
              Florida courses are listed separately so you can open the course
              type that matches your situation and see the right details in one
              place.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {floridaTrackPreviews.map((track) => (
              <article
                key={track.code}
                className="rounded-2xl border border-sky-100 bg-white p-5"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                  {track.shortLabel}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">
                  {track.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {track.audience}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {track.summary}
                </p>
                <Link
                  href={track.route}
                  className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {track.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

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
