import Link from "next/link"
import {
  getCourseConfig,
  getSupportRoute,
} from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateRefundsPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()
  const copy =
    language === "es"
      ? {
          label: "Reembolsos",
          title: `Politica de reembolso del curso de ${config.stateName}`,
          intro:
            "Esta pagina explica cuando puede estar disponible un reembolso y cuando una compra normalmente deja de ser reembolsable.",
          sectionOne: "Regla general",
          sectionOneBody1:
            "Las solicitudes de reembolso pueden revisarse si el estudiante no ha usado el curso de forma significativa despues de la compra.",
          sectionOneBody2:
            "Una vez que el curso se ha usado de forma sustancial, el acceso ya no se considera una compra sin usar.",
          sectionTwo: "Cuando una compra normalmente no es reembolsable",
          sectionTwoBody1:
            "Las compras normalmente no son reembolsables despues de progreso sustancial en el curso, acceso al examen final, emision del certificado o uso material del acceso comprado.",
          sectionTwoBody2:
            "Las copias de certificado enviadas por correo normalmente no son reembolsables una vez que el pedido ha sido enviado al proveedor de correo para su cumplimiento.",
          sectionThree: "Cargos duplicados y mejoras",
          sectionThreeBody1:
            "Los cargos duplicados accidentales pueden revisarse para reembolso.",
          sectionThreeBody2:
            "Las mejoras a soporte prioritario pueden revisarse para reembolso si el beneficio mejorado no ha sido usado de forma significativa.",
          supportTitle: "Solicitar una revision",
          supportBody:
            "Para preguntas sobre reembolsos o para solicitar una revision, empieza con la ",
          supportLink: "pagina de soporte",
        }
      : {
          label: "Refunds",
          title: `${config.stateName} course refund policy`,
          intro:
            "This page explains when a refund may be available and when a purchase normally becomes nonrefundable.",
          sectionOne: "General rule",
          sectionOneBody1:
            "Refund requests may be reviewed if the student has not made meaningful use of the course after purchase.",
          sectionOneBody2:
            "Once the course has been used in a substantial way, the access is no longer treated as an unused purchase.",
          sectionTwo: "When a purchase is normally nonrefundable",
          sectionTwoBody1:
            "Purchases are generally nonrefundable after substantial course progress, final exam access, certificate issuance, or other material use of the purchased access.",
          sectionTwoBody2:
            "Mailed certificate copies are generally nonrefundable once the order has been submitted to the mail provider for fulfillment.",
          sectionThree: "Duplicate charges and upgrades",
          sectionThreeBody1:
            "Accidental duplicate charges may be reviewed for refund.",
          sectionThreeBody2:
            "Priority-support upgrades may be reviewed for refund if the upgraded benefit has not been used in a meaningful way.",
          supportTitle: "Request a review",
          supportBody:
            "For refund questions or to request a review, start with the ",
          supportLink: "support page",
        }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.label}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {copy.title}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">{copy.intro}</p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.sectionOne}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.sectionOneBody1}</p>
          <p>{copy.sectionOneBody2}</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.sectionTwo}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.sectionTwoBody1}</p>
          <p>{copy.sectionTwoBody2}</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.sectionThree}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>{copy.sectionThreeBody1}</p>
          <p>{copy.sectionThreeBody2}</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">{copy.supportTitle}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          {copy.supportBody}
          <Link
            href={getSupportRoute(state)}
            className="font-medium text-slate-900 underline"
          >
            {copy.supportLink}
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
