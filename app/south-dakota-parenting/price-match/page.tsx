import StandardPriceMatchPage from "@/components/site/standard-price-match-page"
import {
  SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS,
  SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES,
  SOUTH_DAKOTA_PARENT_SITE_SUPPORT,
} from "@/lib/south-dakota-parenting-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function SouthDakotaPriceMatchPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const terms = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES
    : SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS

  return (
    <StandardPriceMatchPage
      label={isSpanish ? "Solicitud de igualacion de precio" : "Price Match Request"}
      title={
        isSpanish
          ? "Envianos un precio publico mas bajo de Dakota del Sur para revision"
          : "Send us a lower public South Dakota course price for review"
      }
      description={
        isSpanish
          ? "Si encuentras un precio publico mas bajo para un curso en linea comparable de Dakota del Sur, envia los detalles abajo. Revisamos las solicitudes calificadas de forma manual y igualamos el precio verificado o lo mejoramos por $1."
          : "If you find a lower current public price for a comparable South Dakota online parenting or co-parenting course, submit the details below. We review qualifying requests manually and match the verified price or beat it by $1."
      }
      requestTitle={
        isSpanish ? "Solicitud de igualacion de precio de Dakota del Sur" : "South Dakota price match request"
      }
      emailSubject={
        isSpanish ? "Solicitud de igualacion de precio de Dakota del Sur" : "South Dakota price match request"
      }
      terms={terms}
      supportName={SOUTH_DAKOTA_PARENT_SITE_SUPPORT.organization}
      supportEmail={SOUTH_DAKOTA_PARENT_SITE_SUPPORT.email}
      supportPhone={SOUTH_DAKOTA_PARENT_SITE_SUPPORT.phone}
      responseGoal={isSpanish ? "Meta de respuesta inicial: dentro de 1 dia habil" : "Target initial response: within 1 business day"}
      termsLabel={isSpanish ? "Terminos de la garantia" : "Guarantee terms"}
      contactLabel={isSpanish ? "Contacto" : "Contact"}
      accent="amber"
      language={language}
    />
  )
}
