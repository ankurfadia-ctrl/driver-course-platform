export type PriceMatchAccent = "blue" | "emerald" | "amber" | "sky"

export const DEFAULT_PUBLIC_SUPPORT_EMAIL = "admin@nationaldriverimprovement.com"

export function getPriceMatchAccentStyles(accent: PriceMatchAccent) {
  switch (accent) {
    case "emerald":
      return {
        shell: "border-[#d9efe7] bg-white",
        label:
          "text-emerald-700",
        button: "bg-emerald-600 hover:bg-emerald-700 text-white",
        softPanel: "border-emerald-200 bg-emerald-50 text-emerald-950",
      }
    case "amber":
      return {
        shell: "border-[#f0e2c6] bg-white",
        label: "text-amber-700",
        button: "bg-amber-600 hover:bg-amber-700 text-white",
        softPanel: "border-amber-200 bg-amber-50 text-amber-950",
      }
    case "sky":
      return {
        shell: "border-[#d7eef7] bg-white",
        label: "text-sky-700",
        button: "bg-sky-700 hover:bg-sky-800 text-white",
        softPanel: "border-sky-200 bg-sky-50 text-sky-950",
      }
    default:
      return {
        shell: "border-[#dbe7ff] bg-white",
        label: "text-blue-700",
        button: "bg-blue-600 hover:bg-blue-700 text-white",
        softPanel: "border-blue-200 bg-blue-50 text-blue-950",
      }
  }
}

export function buildDriverPriceMatchTerms(
  stateName: string,
  enrollmentOpen: boolean,
  language: "en" | "es" = "en"
) {
  if (language === "es") {
    return [
      `El precio mas bajo debe ser un precio público vigente para un curso equivalente de mejoramiento para conductores de ${stateName} en linea.`,
      "No se incluyen codigos de cupon privados, promociones vencidas, paquetes, ofertas con cargos ocultos ni formatos de curso no equivalentes.",
      enrollmentOpen
        ? "Las solicitudes calificadas se revisan manualmente y, si se aprueban, se igualan o mejoran por $1 antes de la compra."
        : "Las solicitudes calificadas se revisan manualmente y pueden respetarse cuando se abra el pago público para este estado.",
      "Usa un enlace público activo de la competencia y suficientes detalles para que el equipo de precios verifique la oferta rapidamente.",
    ]
  }

  return [
    `The lower price should be a current public price for a comparable ${stateName} online driver-improvement course.`,
    "Private coupon codes, expired promotions, bundles, hidden-fee offers, and nonequivalent course formats are not included.",
    enrollmentOpen
      ? "Qualified requests are reviewed manually and, if approved, matched or beaten by $1 before purchase."
      : "Qualified requests are reviewed manually and can be honored when the public checkout for this state opens.",
    "Use one active public competitor link and enough detail for the pricing team to verify the offer quickly.",
  ]
}

export function buildBoatingPriceMatchTerms(
  stateName: string,
  language: "en" | "es" = "en"
) {
  if (language === "es") {
    return [
      `El precio mas bajo debe ser un precio público vigente para un curso de seguridad náutica de ${stateName} con un certificado o comprobante similar.`,
      "No se incluyen codigos de cupon privados, promociones vencidas, tarifas estatales, tarifas gubernamentales, solo alquileres ni estructuras no equivalentes.",
      "Las solicitudes calificadas se revisan manualmente y se igualan o mejoran por $1 cuando la ruta pública de pago náutico para ese estado este activa.",
      "Usa un enlace público activo de la competencia e indica cualquier detalle relevante sobre edad, reciprocidad o lo que incluye el precio.",
    ]
  }

  return [
    `The lower price should be a current public price for a comparable ${stateName} boating-safety course with a similar certificate or proof path.`,
    "Private coupon codes, expired promotions, state-card fees, government fees, rental-only training, and nonequivalent offer structures are not included.",
    "Qualified requests are reviewed manually and matched or beaten by $1 when the public boating tuition path for that state is active.",
    "Use one active public competitor link and note anything important about age scope, reciprocity, or what the lower price includes.",
  ]
}
