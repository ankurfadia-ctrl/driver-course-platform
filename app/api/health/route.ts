import { NextResponse } from "next/server"
import { getRuntimeLaunchSummary } from "@/lib/runtime-config"

export async function GET() {
  const runtimeSummary = getRuntimeLaunchSummary()

  return NextResponse.json({
    ok: true,
    app: "driver-course-platform",
    timestamp: new Date().toISOString(),
    runtime: {
      readyCount: runtimeSummary.readyCount,
      totalCount: runtimeSummary.totalCount,
      launchConfigReady: runtimeSummary.launchConfigReady,
      checks: runtimeSummary.checks,
    },
  })
}
