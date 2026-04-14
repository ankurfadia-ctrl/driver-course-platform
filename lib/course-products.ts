import { getCourseConfig } from "@/lib/course-config"
import { getBoatingProductRegistryFallback } from "@/lib/boating-product-registry"

export type CourseProductConfig = {
  stateCode: string
  stateName: string
  courseSlug: string
  courseName: string
  supportEmail: string
  certificateIssuerLine: string
  dashboardPath: string
  coursePath: string
  examPath: string
  certificatePath: string
  supportPath: string
}

function normalizeStateCode(stateCode: string) {
  return String(stateCode ?? "").trim().toLowerCase()
}

export function getCourseProductConfig(
  stateCode: string,
  courseSlug = "driver-improvement"
): CourseProductConfig {
  const normalizedState = normalizeStateCode(stateCode)

  if (courseSlug === "boating-safety") {
    const boatingProduct = getBoatingProductRegistryFallback(normalizedState)

    return {
      stateCode: normalizedState,
      stateName: boatingProduct.stateName,
      courseSlug,
      courseName: boatingProduct.productName,
      supportEmail: boatingProduct.supportEmail,
      certificateIssuerLine: boatingProduct.certificateIssuerLine,
      dashboardPath: `${boatingProduct.routeBase}/dashboard`,
      coursePath: `${boatingProduct.routeBase}/learn`,
      examPath: `${boatingProduct.routeBase}/exam`,
      certificatePath: `${boatingProduct.routeBase}/certificate`,
      supportPath: boatingProduct.routeBase,
    }
  }

  const config = getCourseConfig(normalizedState)

  return {
    stateCode: normalizedState,
    stateName: config.stateName,
    courseSlug,
    courseName: config.courseName,
    supportEmail: config.supportEmail,
    certificateIssuerLine: config.certificateIssuerLine,
    dashboardPath: `/${normalizedState}/dashboard`,
    coursePath: `/${normalizedState}/course`,
    examPath: `/${normalizedState}/course/final-exam`,
    certificatePath: `/${normalizedState}/certificate`,
    supportPath: `/${normalizedState}/support`,
  }
}
