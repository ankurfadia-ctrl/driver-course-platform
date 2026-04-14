import type { Metadata } from "next"
import Link from "next/link"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export const metadata: Metadata = {
  title: "Copyright Notice | National Course Portal",
  description:
    "Copyright and permissions information for National Course Portal website content and course materials.",
  alternates: {
    canonical: "/copyright",
  },
}

const protectedItemsEn = [
  "Website Text and Page Layouts",
  "Course Descriptions and Public Course Pages",
  "Pricing, Certificate, and Support Content",
  "Downloadable Packet Materials and Supporting Documents",
  "Logos, Branding Elements, and Custom Graphics Where Applicable",
]

const protectedItemsEs = [
  "Texto del sitio web y diseños de páginas",
  "Descripciones de cursos y páginas públicas del curso",
  "Contenido de precios, certificados y soporte",
  "Materiales de paquetes descargables y documentos de apoyo",
  "Logotipos, elementos de marca y gráficos personalizados cuando correspondan",
]

export default async function CopyrightPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const protectedItems = isSpanish ? protectedItemsEs : protectedItemsEn

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_18%,#ffffff_100%)]">
      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              {isSpanish ? "Copyright" : "Copyright"}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {isSpanish ? "Aviso de copyright" : "Copyright Notice"}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {isSpanish
                ? "El contenido del sitio web del Portal Nacional de Cursos y los materiales relacionados están protegidos por copyright a menos que una página indique lo contrario."
                : "National Course Portal website content and related course materials are protected by copyright unless a page states otherwise."}
            </p>
          </div>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            {isSpanish ? "Materiales cubiertos por este aviso" : "Materials covered by this notice"}
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
            {protectedItems.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            {isSpanish
              ? "Uso personal solamente a menos que se otorgue permiso"
              : "Personal use only unless permission is granted"}
          </h2>
          <div className="mt-3 space-y-3 text-base leading-7 text-slate-600">
            <p>
              {isSpanish
                ? "Puedes ver, imprimir o descargar materiales públicos para tus necesidades personales de curso, certificado o soporte."
                : "You may view, print, or download public materials for your own personal course, certificate, or support needs."}
            </p>
            <p>
              {isSpanish
                ? "No puedes republicar, redistribuir, revender, extraer o copiar el contenido del sitio o materiales del curso con fines comerciales o de uso masivo sin permiso previo por escrito."
                : "You may not republish, redistribute, resell, scrape, or copy site content or course materials for commercial or mass-use purposes without prior written permission."}
            </p>
          </div>
        </article>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
          <p>
            {isSpanish
              ? "Las solicitudes de permiso o reutilizacion pueden enviarse a "
              : "Permissions or reuse requests can be sent to "}
            <a
              href="mailto:admin@nationaldriverimprovement.com"
              className="font-semibold text-slate-900 hover:text-blue-700"
            >
              admin@nationaldriverimprovement.com
            </a>
            .
          </p>
          <p className="mt-3">
            {isSpanish ? "Para reglas generales del sitio, consulta los " : "For general site rules, see the "}
            <Link
              href="/terms"
              className="font-semibold text-slate-900 hover:text-blue-700"
            >
              {isSpanish ? "Términos de uso" : "Terms of Use"}
            </Link>
            .{" "}
            {isSpanish ? "Para privacidad, consulta la " : "For privacy details, see the "}
            <Link
              href="/privacy"
              className="font-semibold text-slate-900 hover:text-blue-700"
            >
              {isSpanish ? "Política de privacidad" : "Privacy Policy"}
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
