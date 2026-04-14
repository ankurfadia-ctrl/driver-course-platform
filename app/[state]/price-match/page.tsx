import StandardPriceMatchPage from "@/components/site/standard-price-match-page"
import { getCourseConfig } from "@/lib/course-config"
import { buildDriverPriceMatchTerms } from "@/lib/price-match"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StatePriceMatchPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()
  const stateName = config.stateName
  const title =
    language === "es"
      ? `Envianos un precio público mas bajo de ${stateName} para revision`
      : `Send us a lower public ${stateName} course price for review`
  const description =
    language === "es"
      ? config.enrollmentOpen
        ? `Si encuentras un precio público mas bajo para un curso equivalente de mejoramiento para conductores de ${stateName} en linea, envia los detalles abajo. Revisamos las solicitudes calificadas manualmente y, si se aprueban, igualamos el precio verificado o lo mejoramos por $1.`
        : `Si encuentras un precio público mas bajo para un curso equivalente de mejoramiento para conductores de ${stateName} en linea, envianoslo abajo. Lo revisaremos y daremos seguimiento cuando se abra la inscripción.`
      : config.enrollmentOpen
        ? `If you find a lower current public price for a comparable ${stateName} online driver-improvement course, submit the details below. We review qualifying requests manually and match the verified price or beat it by $1.`
        : `If you find a lower current public price for a comparable ${stateName} online driver-improvement course, send it to us below. We will review it and follow up when enrollment opens.`
  const label = language === "es" ? "Solicitud de igualación de precio" : "Price Match Request"
  const requestTitle =
    language === "es"
      ? `Solicitud de igualación de precio de ${stateName}`
      : `${stateName} price match request`
  const supportName =
    language === "es"
      ? `Soporte del curso de ${stateName}`
      : `${stateName} course support`
  const termsLabel = language === "es" ? "Terminos de la garantía" : "Guarantee terms"
  const contactLabel = language === "es" ? "Contacto" : "Contact"
  const responseGoal =
    language === "es"
      ? "Meta de respuesta inicial: dentro de 1 dia habil"
      : "Target initial response: within 1 business day"

  return (
    <StandardPriceMatchPage
      label={label}
      title={title}
      description={description}
      requestTitle={requestTitle}
      emailSubject={requestTitle}
      terms={buildDriverPriceMatchTerms(stateName, config.enrollmentOpen, language)}
      supportName={supportName}
      supportEmail={config.supportEmail}
      supportPhone={config.supportPhoneDisplay}
      termsLabel={termsLabel}
      contactLabel={contactLabel}
      responseGoal={responseGoal}
      language={language}
      accent="blue"
    />
  )
}
