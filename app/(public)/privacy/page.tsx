import type { Metadata } from "next"
import Link from "next/link"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export const metadata: Metadata = {
  title: "Privacy Policy | National Course Portal",
  description:
    "Privacy information for National Course Portal, including how course, contact, and certificate-support information is handled.",
  alternates: {
    canonical: "/privacy",
  },
}

const sectionsEn = [
  {
    title: "What we collect",
    body: [
      "We collect the information needed to help you enroll, sign in, complete your course, and verify certificates when those features are available for your state or course type.",
      "That may include your name, email address, phone number, mailing address, license or student-identification details, course progress, certificate information, and support messages.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use your information to provide course access, process payments, respond to support questions, maintain course records, and issue or verify certificates where permitted.",
      "We may also use basic technical data such as device, browser, and log information to keep the site secure and working properly.",
    ],
  },
  {
    title: "Payments and service providers",
    body: [
      "Payments may be handled by third-party processors. We receive the records we need to confirm your purchase, but we do not store full payment-card numbers on this site.",
      "We also use service providers for website hosting, email delivery, and certificate or account support.",
    ],
  },
  {
    title: "Certificate and course records",
    body: [
      "Some courses require us to keep course-completion or certificate records for support, verification, regulatory, or provider-review purposes.",
      "Retention periods can vary by course type, state requirements, and operational needs.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can contact us if you need help updating account details, correcting information, or understanding what records relate to your course activity.",
      "If a course has state-specific rules, those rules may affect what changes can be made after completion or certificate issuance.",
    ],
  },
]

const sectionsEs = [
  {
    title: "Lo que recopilamos",
    body: [
      "Recopilamos la informacion necesaria para ayudarte a inscribirte, iniciar sesion, completar tu curso y verificar certificados cuando esas funciones esten disponibles para tu estado o tipo de curso.",
      "Eso puede incluir tu nombre, correo electronico, numero de telefono, direccion postal, licencia o identificacion estudiantil, progreso del curso, informacion del certificado y mensajes de soporte.",
    ],
  },
  {
    title: "Como la usamos",
    body: [
      "Usamos tu informacion para brindar acceso al curso, procesar pagos, responder preguntas de soporte, mantener registros del curso y emitir o verificar certificados cuando se permite.",
      "Tambien podemos usar datos tecnicos basicos como dispositivo, navegador y registros para mantener el sitio seguro y funcionando.",
    ],
  },
  {
    title: "Pagos y proveedores de servicio",
    body: [
      "Los pagos pueden ser procesados por terceros. Recibimos los registros necesarios para confirmar tu compra, pero no almacenamos los numeros completos de tarjetas en este sitio.",
      "Tambien usamos proveedores para el alojamiento del sitio, el envio de correo y el soporte de certificados o cuentas.",
    ],
  },
  {
    title: "Registros de certificados y cursos",
    body: [
      "Algunos cursos requieren que conservemos registros de finalizacion o certificados para soporte, verificacion, requisitos regulatorios o revisiones de proveedores.",
      "Los periodos de retencion pueden variar segun el tipo de curso, requisitos del estado y necesidades operativas.",
    ],
  },
  {
    title: "Tus opciones",
    body: [
      "Puedes contactarnos si necesitas ayuda para actualizar datos de cuenta, corregir informacion o entender que registros se relacionan con tu actividad del curso.",
      "Si un curso tiene reglas especificas del estado, esas reglas pueden afectar que cambios se pueden hacer despues de la finalizacion o emision del certificado.",
    ],
  },
]

export default async function PrivacyPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const sections = isSpanish ? sectionsEs : sectionsEn

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_18%,#ffffff_100%)]">
      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              {isSpanish ? "Privacidad" : "Privacy"}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {isSpanish ? "Politica de privacidad" : "Privacy Policy"}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {isSpanish
                ? "Esta pagina explica las categorias basicas de informacion que el Portal Nacional de Cursos usa para operar el sitio, apoyar a los estudiantes y mantener los registros del curso y certificados."
                : "This page explains the basic categories of information National Course Portal uses to operate the site, support students, and maintain course and certificate records."}
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {sections.map((section) => (
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
            {isSpanish
              ? "Las preguntas sobre privacidad o soporte de cuenta pueden enviarse a "
              : "Questions about privacy or account support can be sent to "}
            <a
              href="mailto:admin@nationaldriverimprovement.com"
              className="font-semibold text-slate-900 hover:text-blue-700"
            >
              admin@nationaldriverimprovement.com
            </a>
            .
          </p>
          <p className="mt-3">
            {isSpanish ? "Tambien puedes volver a la " : "You can also return to the "}
            <Link
              href="/"
              className="font-semibold text-slate-900 hover:text-blue-700"
            >
              {isSpanish ? "pagina principal" : "homepage"}
            </Link>{" "}
            {isSpanish
              ? "para encontrar tu curso o las herramientas de certificado."
              : "to find your course or certificate tools."}
          </p>
        </div>
      </section>
    </main>
  )
}
