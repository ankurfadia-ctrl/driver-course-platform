import type { ReactNode } from "react"
import PublicHeader from "@/components/site/public-header"
import PublicFooter from "@/components/site/public-footer"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const language = await getPreferredSiteLanguage()
  return (
    <>
      <PublicHeader language={language} />
      {children}
      <PublicFooter language={language} />
    </>
  )
}
