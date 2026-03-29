import StateSupportClient from "@/components/state-support-client"
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
    <StateSupportClient
      state={state}
      stateName={config.stateName}
      language={language}
    />
  )
}
