import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
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

  // Example: /virginia/dashboard → state = virginia
  const segments = pathname.split("/").filter(Boolean)
  const state = segments[0]

  const isAuthPage =
    pathname.endsWith("/login")

  const isProtectedRoute =
    pathname.includes("/dashboard") ||
    pathname.includes("/course")

  // 🔒 Not logged in → redirect to state login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = `/${state}/login`
    return NextResponse.redirect(url)
  }

  // 🔁 Already logged in → block login page
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
    "/:state/login",
  ],
}
