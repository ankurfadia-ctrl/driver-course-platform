import type { Metadata } from "next"
import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import { BOATING_PRODUCT_CONFIG, getBoatingProductConfig } from "@/lib/boating-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import { getPublicBaseUrl } from "@/lib/runtime-config"

const baseUrl = getPublicBaseUrl()
const boatingUrl = `${baseUrl}/boating`

export const metadata: Metadata = {
  title: `${BOATING_PRODUCT_CONFIG.siteTitle} | Driver Course Platform`,
  description: BOATING_PRODUCT_CONFIG.marketingDescription,
  alternates: {
    canonical: "/boating",
  },
  openGraph: {
    title: BOATING_PRODUCT_CONFIG.siteTitle,
    description: BOATING_PRODUCT_CONFIG.marketingDescription,
    url: boatingUrl,
    siteName: "Driver Course Platform",
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: BOATING_PRODUCT_CONFIG.siteTitle,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: BOATING_PRODUCT_CONFIG.siteTitle,
    description: BOATING_PRODUCT_CONFIG.marketingDescription,
    images: [`${baseUrl}/logo.svg`],
  },
}

export default async function BoatingPage() {
  const language = await getPreferredSiteLanguage()
  const config = getBoatingProductConfig(language)
  const copy =
    language === "es"
      ? {
          sectionLabel: "Información del curso náutico",
          title: "Cursos de seguridad náutica, todo en un solo lugar.",
          body:
            "Consulta lo que cubre el curso náutico, qué estados esperamos abrir primero y qué puedes esperar cuando haya nuevas opciones disponibles.",
          standards: "Qué cubre el curso",
          standardsBody:
            "El curso empieza con los temas esenciales de seguridad náutica y después agrega reglas, certificados y requisitos específicos de cada estado.",
          primaryCta: "Volver al inicio",
          secondaryCta: "Ver temario",
          curriculumLabel: "Temas del curso",
          curriculumTitle: "Temas principales cubiertos en el curso náutico",
          roadmapLabel: "Estados planificados",
          roadmapTitle: "Estados que esperamos abrir primero",
          noteLabel: "Antes de inscribirte",
          noteTitle: "Qué debes esperar",
          priorityNow: "Primero",
          priorityNext: "Después",
          priorityLater: "Más adelante",
        }
      : {
          sectionLabel: "Boating Course Information",
          title: "Boating safety courses, all in one place.",
          body:
            "See what the boating course covers, which states are expected first, and what to expect as new boating options become available.",
          standards: "What the course covers",
          standardsBody:
            "The course starts with core boating-safety topics, then adds state rules, certificate details, and completion requirements where needed.",
          primaryCta: "Back to Home",
          secondaryCta: "View Curriculum",
          curriculumLabel: "Course Outline",
          curriculumTitle: "Main topics covered in the boating course",
          roadmapLabel: "Planned States",
          roadmapTitle: "States expected to open first",
          noteLabel: "Before You Enroll",
          noteTitle: "What to expect",
          priorityNow: "First",
          priorityNext: "Next",
          priorityLater: "Later",
        }

  const priorityLabels = {
    now: copy.priorityNow,
    next: copy.priorityNext,
    later: copy.priorityLater,
  } as const

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="section-label">{copy.sectionLabel}</div>
            </div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {copy.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {copy.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
              >
                {copy.primaryCta}
              </Link>
              <Link
                href="/boating/course"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border-[#d7eef7] bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {copy.standards}
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              {config.standardsLabel}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              {copy.standardsBody}
            </p>
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-4 text-sm leading-6 text-sky-950">
              {config.curriculumIntro}
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.curriculumLabel}
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            {copy.curriculumTitle}
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {config.curriculumModules.map((module) => (
              <article
                key={module.code}
                className="rounded-3xl border border-[#d7eef7] bg-[#f5fbfe] p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {module.code}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  {module.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{module.summary}</p>
                <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  {module.topics.map((topic) => (
                    <div key={topic}>- {topic}</div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.roadmapLabel}
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.roadmapTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {config.launchStates.map((state) => (
                <article
                  key={state.stateSlug}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">
                        {state.stateName}
                      </h3>
                      <div className="mt-1 text-sm text-slate-500">
                        {`${state.stateCode} | ${state.status.replace("-", " ")}`}
                      </div>
                      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                        {state.marketMotion.replace("-", " ")}
                      </div>
                    </div>
                    <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
                      {priorityLabels[state.priority]}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {state.requirementSummary}
                  </p>
                  {state.routeBase ? (
                    <Link
                      href={state.routeBase}
                      className="mt-4 inline-flex rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
                    >
                      {language === "es" ? "Ver detalles del estado" : "View state details"}
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              {copy.noteLabel}
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.noteTitle}
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              {config.notes.map((note) => (
                <div
                  key={note}
                  className="rounded-2xl border border-amber-200 bg-white px-4 py-4"
                >
                  {note}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8">
          <PriceMatchGuaranteePanel
            label={language === "es" ? "Garantía de igualación de precio" : "Price Match Guarantee"}
            title={
              language === "es"
                ? "Compara precios de cursos náuticos y solicita una revisión."
                : "Compare boating course prices and ask for a review."
            }
            description={
              language === "es"
                ? "Abre la página del estado que te interesa para ver la garantía y solicitar una revisión de precio."
                : "Open the state page you need to view the guarantee and request a price review."
            }
            href="/virginia-boating/price-match"
            ctaLabel={language === "es" ? "Abrir ejemplo de solicitud" : "Open a price-match example"}
            accent="sky"
            terms={[
              language === "es"
                ? "Cada estado tendrá su propia opción de igualación de precio en la página pública del curso o de precios."
                : "Each boating state will have its own price-match option on the public course or pricing page.",
              language === "es"
                ? "Revisamos cada solicitud manualmente para comparar el mismo tipo de curso y los mismos requisitos del certificado."
                : "We review each request manually so we can compare the same course type and certificate requirements.",
            ]}
          />
        </div>
      </section>
    </main>
  )
}
