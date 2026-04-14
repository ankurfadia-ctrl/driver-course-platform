import type { Metadata } from "next"
import Link from "next/link"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export const metadata: Metadata = {
  title: "Terms of Use | National Course Portal",
  description:
    "Terms of use for National Course Portal and its public course, account, and certificate-support pages.",
  alternates: {
    canonical: "/terms",
  },
}

export const dynamic = "force-dynamic"

const sectionsEn = [
  {
    title: "Using the site",
    body: [
      "National Course Portal provides public course information, enrollment paths, certificate tools, and student-support resources for selected course types and states.",
      "By using the site, you agree to use it lawfully and only for your own course, support, or verification needs unless we give you separate written permission.",
    ],
  },
  {
    title: "Accounts and course access",
    body: [
      "When a course offers account access, each student must use truthful information and maintain control of their own login.",
      "Course rules, timing rules, exam rules, certificate rules, and refund rules may vary by course and state. State-specific pages and disclosures control when they apply.",
    ],
  },
  {
    title: "Payments and refunds",
    body: [
      "Pricing, payment options, fee-relief policies, and any available price-match process are described on the relevant course pages.",
      "Refund availability can depend on the course type, the state, whether access was granted, and whether any required progress or certificate activity has already occurred.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The site design, written content, course materials, pricing pages, public certificate pages, and related materials are protected by copyright and other intellectual-property laws unless otherwise stated.",
      "You may view or print materials for personal, non-commercial course use. You may not copy, republish, scrape, sell, redistribute, or create derivative materials from the site or course content without prior written permission.",
    ],
  },
  {
    title: "Availability and updates",
    body: [
      "Course availability can change by state, approval status, operational readiness, or regulatory requirements.",
      "We may update site content, pricing, and public pages from time to time. Continued use of the site after updates means you accept the revised terms.",
    ],
  },
] as const

const sectionsEs = [
  {
    title: "Uso del sitio",
    body: [
      "National Course Portal ofrece informacion publica del curso, rutas de inscripcion, herramientas de certificado y recursos de soporte para cursos y estados seleccionados.",
      "Al usar el sitio, aceptas utilizarlo legalmente y solo para tus necesidades de curso, soporte o verificacion, salvo autorizacion escrita adicional.",
    ],
  },
  {
    title: "Cuentas y acceso al curso",
    body: [
      "Cuando un curso ofrece acceso con cuenta, cada estudiante debe usar informacion veraz y mantener el control de su inicio de sesion.",
      "Las reglas de curso, tiempo, examen, certificado y reembolsos pueden variar por curso y estado. Las paginas y divulgaciones especificas del estado determinan las reglas aplicables.",
    ],
  },
  {
    title: "Pagos y reembolsos",
    body: [
      "Los precios, opciones de pago, politicas de ayuda y cualquier proceso de igualacion se describen en las paginas del curso correspondientes.",
      "La disponibilidad de reembolsos puede depender del tipo de curso, el estado, si se otorgo acceso y si ya ocurrio progreso o actividad de certificado.",
    ],
  },
  {
    title: "Propiedad intelectual",
    body: [
      "El diseno del sitio, contenido escrito, materiales del curso, paginas de precios, paginas publicas de certificado y materiales relacionados estan protegidos por derechos de autor y otras leyes, salvo que se indique lo contrario.",
      "Puedes ver o imprimir materiales para uso personal y no comercial. No puedes copiar, republicar, extraer, vender, redistribuir ni crear materiales derivados sin permiso escrito previo.",
    ],
  },
  {
    title: "Disponibilidad y actualizaciones",
    body: [
      "La disponibilidad del curso puede cambiar por estado, estatus de aprobacion, preparacion operativa o requisitos regulatorios.",
      "Podemos actualizar contenido, precios y paginas publicas con el tiempo. El uso continuo del sitio despues de cambios implica aceptacion de los terminos actualizados.",
    ],
  },
] as const

export default async function TermsPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const copy = isSpanish
    ? {
        eyebrow: "Términos",
        title: "Términos de uso",
        intro:
          "Estos términos describen las reglas básicas para usar National Course Portal y sus cursos públicos, soporte a estudiantes y herramientas de certificado.",
        contact:
          "Si necesitas permiso para reutilizar contenido del sitio o materiales del curso, escribe a",
        back: "pagina principal",
        sections: sectionsEs,
      }
    : {
        eyebrow: "Terms",
        title: "Terms of Use",
        intro:
          "These terms describe the basic rules for using National Course Portal and its public course, student-support, and certificate tools.",
        contact:
          "If you need permission to reuse site content or course materials, contact",
        back: "homepage",
        sections: sectionsEn,
      }
  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_18%,#ffffff_100%)]">
      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              {copy.eyebrow}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {copy.intro}
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {copy.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-7 text-slate-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
          <p>
            {copy.contact}{" "}
            <a
              href="mailto:admin@nationaldriverimprovement.com"
              className="font-semibold text-slate-900 hover:text-blue-700"
            >
              admin@nationaldriverimprovement.com
            </a>
            .
          </p>
          <p className="mt-3">
            {isSpanish ? "Puedes volver a la" : "You can return to the"}{" "}
            <Link
              href="/"
              className="font-semibold text-slate-900 hover:text-blue-700"
            >
              {copy.back}
            </Link>{" "}
            {isSpanish
              ? "para encontrar un curso o una herramienta de certificado."
              : "to find a course or certificate tool."}
          </p>
        </div>
      </section>
    </main>
  )
}
