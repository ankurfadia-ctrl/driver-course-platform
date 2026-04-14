import StandardPriceMatchPage from "@/components/site/standard-price-match-page"
import {
  MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS,
  MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES,
  MINNESOTA_PARENT_SITE_SUPPORT,
} from "@/lib/minnesota-parent-education-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function MinnesotaPriceMatchPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"

  return (
    <StandardPriceMatchPage
      label={isSpanish ? "Solicitud de igualación de precio" : "Price Match Request"}
      title={
        isSpanish
          ? "Envianos un precio público mas bajo de Minnesota para revision"
          : "Send us a lower public Minnesota course price for review"
      }
      description={
        isSpanish
          ? "Si encuentras un precio público mas bajo para un curso equivalente de educacion para padres de Minnesota en linea, envia los detalles abajo. Revisamos las solicitudes calificadas manualmente y, si se aprueban, igualamos el precio verificado o lo mejoramos por $1."
          : "If you find a lower current public price for a comparable Minnesota online parent-education course, submit the details below. We review qualifying requests manually and match the verified price or beat it by $1."
      }
      requestTitle={
        isSpanish ? "Solicitud de igualación de precio de Minnesota" : "Minnesota price match request"
      }
      emailSubject={
        isSpanish ? "Solicitud de igualación de precio de Minnesota" : "Minnesota price match request"
      }
      terms={isSpanish ? MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES : MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS}
      supportName={MINNESOTA_PARENT_SITE_SUPPORT.organization}
      supportEmail={MINNESOTA_PARENT_SITE_SUPPORT.email}
      supportPhone={MINNESOTA_PARENT_SITE_SUPPORT.phone}
      termsLabel={isSpanish ? "Terminos de la garantía" : "Guarantee terms"}
      contactLabel={isSpanish ? "Contacto" : "Contact"}
      responseGoal={
        isSpanish
          ? "Meta de respuesta inicial: dentro de 1 dia habil"
          : "Target initial response: within 1 business day"
      }
      language={language}
      accent="emerald"
    />
  )
}
