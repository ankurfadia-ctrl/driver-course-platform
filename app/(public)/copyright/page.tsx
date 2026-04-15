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
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {isSpanish ? "Copyright" : "Copyright"}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {isSpanish ? "Aviso de copyright" : "Copyright Notice"}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          {isSpanish
            ? "El contenido del sitio web del Portal Nacional de Cursos y los materiales relacionados están protegidos por copyright a menos que una página indique lo contrario."
            : "National Course Portal website content and related course materials are protected by copyright unless a page states otherwise."}
        </p>
      </section>

      <article className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">
          {isSpanish ? "Materiales cubiertos por este aviso" : "Materials covered by this notice"}
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          {protectedItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-slate-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">
          {isSpanish
            ? "Uso personal solamente a menos que se otorgue permiso"
            : "Personal use only unless permission is granted"}
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
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

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <p className="text-sm leading-7 text-slate-700">
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
        <p className="mt-3 text-sm leading-7 text-slate-700">
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
      </section>
    </div>
  )
}
