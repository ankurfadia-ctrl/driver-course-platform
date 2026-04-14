import StateSupportSimple from "@/components/state-support-simple"
import { getCourseConfig } from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateSupportPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()

  return (
    <StateSupportSimple
      state={state}
      stateName={config.stateName}
      language={language}
    />
  )
}
