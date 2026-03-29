import { NextResponse } from "next/server"
import {
  normalizeSiteLanguage,
  SITE_LANGUAGE_COOKIE,
} from "@/lib/site-language"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const value = normalizeSiteLanguage(searchParams.get("value"))
  const redirectPath = searchParams.get("redirect") || "/"
  const redirectUrl = new URL(redirectPath, request.url)

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(SITE_LANGUAGE_COOKIE, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })

  return response
}
