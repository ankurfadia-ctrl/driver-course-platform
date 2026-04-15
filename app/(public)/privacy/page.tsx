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
      "Recopilamos la información necesaria para ayudarte a inscribirte, iniciar sesión, completar tu curso y verificar certificados cuando esas funciones estén disponibles para tu estado o tipo de curso.",
      "Eso puede incluir tu nombre, correo electrónico, número de teléfono, dirección postal, licencia o identificación estudiantil, progreso del curso, información del certificado y mensajes de soporte.",
    ],
  },
  {
    title: "Cómo la usamos",
    body: [
      "Usamos tu información para brindar acceso al curso, procesar pagos, responder preguntas de soporte, mantener registros del curso y emitir o verificar certificados cuando se permite.",
      "También podemos usar datos técnicos básicos como dispositivo, navegador y registros para mantener el sitio seguro y funcionando.",
    ],
  },
  {
    title: "Pagos y proveedores de servicio",
    body: [
      "Los pagos pueden ser procesados por terceros. Recibimos los registros necesarios para confirmar tu compra, pero no almacenamos los números completos de tarjetas en este sitio.",
      "También usamos proveedores para el alojamiento del sitio, el envío de correo y el soporte de certificados o cuentas.",
    ],
  },
  {
    title: "Registros de certificados y cursos",
    body: [
      "Algunos cursos requieren que conservemos registros de finalización o certificados para soporte, verificación, requisitos regulatorios o revisiones de proveedores.",
      "Los períodos de retención pueden variar según el tipo de curso, requisitos del estado y necesidades operativas.",
    ],
  },
  {
    title: "Tus opciones",
    body: [
      "Puedes contactarnos si necesitas ayuda para actualizar datos de cuenta, corregir información o entender qué registros se relacionan con tu actividad del curso.",
      "Si un curso tiene reglas específicas del estado, esas reglas pueden afectar qué cambios se pueden hacer después de la finalización o emisión del certificado.",
    ],
  },
]

export default async function PrivacyPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const sections = isSpanish ? sectionsEs : sectionsEn

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {isSpanish ? "Privacidad" : "Privacy"}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {isSpanish ? "Política de privacidad" : "Privacy Policy"}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          {isSpanish
            ? "Esta página explica las categorías básicas de información que el Portal Nacional de Cursos usa para operar el sitio, apoyar a los estudiantes y mantener los registros del curso y certificados."
            : "This page explains the basic categories of information National Course Portal uses to operate the site, support students, and maintain course and certificate records."}
        </p>
      </section>

      <div className="space-y-4">
        {sections.map((section) => (
          <article
            key={section.title}
            className="glass-panel rounded-[2rem] bg-white p-8"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {section.title}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <p className="text-sm leading-7 text-slate-700">
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
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {isSpanish ? "También puedes volver a la " : "You can also return to the "}
          <Link
            href="/"
            className="font-semibold text-slate-900 hover:text-blue-700"
          >
            {isSpanish ? "página principal" : "homepage"}
          </Link>{" "}
          {isSpanish
            ? "para encontrar tu curso o las herramientas de certificado."
            : "to find your course or certificate tools."}
        </p>
      </section>
    </div>
  )
}
