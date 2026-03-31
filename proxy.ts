import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { isAdminEmail } from "@/lib/admin-access"
import { isReviewerEmail } from "@/lib/reviewer-access"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request,
  })

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

  if (!state) {
    return response
  }

  if (isAdminRoute) {
    if (isAdminLoginRoute) {
      return response
    }

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
    "/:state/dashboard/:path*",
    "/:state/course/:path*",
    "/:state/reviewer-access",
    "/:state/login",
    "/admin/login",
    "/admin/:path*",
  ],
}
