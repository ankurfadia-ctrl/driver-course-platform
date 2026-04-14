export const PUBLIC_SITE_STATE_SLUGS = ["virginia"] as const

export const HIDDEN_PUBLIC_PREVIEW_ROOTS = [
  "/boating",
  "/virginia-boating",
  "/south-carolina-boating",
  "/ohio-boating",
  "/oklahoma-boating",
  "/kentucky-boating",
  "/west-virginia-boating",
  "/florida",
  "/california",
  "/florida-bdi",
  "/florida-adi",
  "/florida-tlsae",
  "/florida-mature-driver",
] as const

export function isPublicSiteStateVisible(stateSlug: string) {
  return PUBLIC_SITE_STATE_SLUGS.includes(
    stateSlug as (typeof PUBLIC_SITE_STATE_SLUGS)[number]
  )
}

export function isHiddenPublicPreviewPath(pathname: string) {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname

  return HIDDEN_PUBLIC_PREVIEW_ROOTS.some(
    (root) =>
      normalizedPath === root || normalizedPath.startsWith(`${root}/`)
  )
}

export function getPublicPreviewRobotsDisallowPaths() {
  return [...HIDDEN_PUBLIC_PREVIEW_ROOTS]
}
