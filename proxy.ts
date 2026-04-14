import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { isAdminEmail } from "@/lib/admin-access"
import { isHiddenPublicPreviewPath } from "@/lib/public-site-visibility"
import { isReviewerEmail } from "@/lib/reviewer-access"

const PRIMARY_PUBLIC_HOST = "www.nationaldriverimprovement.com"
const LEGACY_PUBLIC_HOSTS = new Set([
  "nationaldriverimprovement.com",
  "vadriverimprovementcourse.com",
  "www.vadriverimprovementcourse.com",
])

export async function proxy(request: NextRequest) {
  const requestHost = request.headers.get("host")?.toLowerCase().split(":")[0]

  if (requestHost && LEGACY_PUBLIC_HOSTS.has(requestHost)) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.protocol = "https:"
    redirectUrl.host = PRIMARY_PUBLIC_HOST
    return NextResponse.redirect(redirectUrl, 308)
  }

  const response = NextResponse.next({
    request,
  })

  const pathname = request.nextUrl.pathname
  const segments = pathname.split("/").filter(Boolean)
  const state = segments[0]
  const isAdminRoute = segments[0] === "admin"
  const isAdminLoginRoute = pathname === "/admin/login"

  const isAuthPage = segments.length >= 2 && segments[1] === "login"
  const isReviewerRoute =
    segments.length >= 2 && segments[1] === "reviewer-access"

  const isProtectedRoute =
    segments.length >= 2 &&
    (segments[1] === "dashboard" ||
      segments[1] === "course" ||
      segments[1] === "reviewer-access")

  const needsUserLookup =
    isHiddenPublicPreviewPath(pathname) ||
    isAdminRoute ||
    isProtectedRoute ||
    isReviewerRoute ||
    isAuthPage

  if (!needsUserLookup) {
    return response
  }

  if (isAdminRoute && isAdminLoginRoute) {
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isHiddenPublicPreviewPath(pathname)) {
    if (user?.email && isAdminEmail(user.email)) {
      return response
    }

    const url = request.nextUrl.clone()
    url.pathname = "/virginia"
    url.search = ""
    return NextResponse.redirect(url)
  }

  if (isAdminRoute) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("next", pathname)
      return NextResponse.redirect(url)
    }

    if (!isAdminEmail(user.email)) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("next", pathname)
      url.searchParams.set("reason", "admin")
      return NextResponse.redirect(url)
    }

    return response
  }

  // 🔒 Not logged in → redirect to state login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = `/${state}/login`
    return NextResponse.redirect(url)
  }

  if (user && isReviewerRoute) {
    if (!isReviewerEmail(user.email) && !isAdminEmail(user.email)) {
      const url = request.nextUrl.clone()
      url.pathname = `/${state}/login`
      url.searchParams.set("reason", "reviewer")
      return NextResponse.redirect(url)
    }

    return response
  }

  // 🔁 Logged in → block login page
  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = `/${state}/dashboard`
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:css|gif|ico|jpeg|jpg|js|map|png|svg|webp|woff|woff2)$).*)",
  ],
}
