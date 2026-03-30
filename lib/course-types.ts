import { getCourseConfig, type StateCourseTrack } from "@/lib/course-config"

export type CourseTypeCode =
  | "driver-improvement"
  | "basic-driver-improvement"
  | "advanced-driver-improvement"
  | "tlsae"
  | "mature-driver"

export type CourseTypeDefinition = {
  code: CourseTypeCode
  stateSlug: string
  stateCode: string
  name: string
  audience: string
  status: StateCourseTrack["status"]
  notes: string
  active: boolean
}

function slugifyTrackName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getCourseTypesForState(state: string): CourseTypeDefinition[] {
  const config = getCourseConfig(state)
  const tracks = config.courseTracks ?? []

  if (tracks.length === 0) {
    return [
      {
        code: "driver-improvement",
        stateSlug: config.stateSlug,
        stateCode: config.stateCode,
        name: config.courseName,
        audience: `${config.stateName} driver improvement students`,
        status: "planned",
        notes: "Default course-type scaffold.",
        active: true,
      },
    ]
  }

  return tracks.map((track, index) => ({
    code:
      track.code === "fl-bdi"
        ? "basic-driver-improvement"
        : track.code === "fl-adi"
          ? "advanced-driver-improvement"
          : track.code === "fl-tlsae"
            ? "tlsae"
            : track.code === "fl-mature-driver"
              ? "mature-driver"
              : index === 0
                ? "driver-improvement"
                : (slugifyTrackName(track.code) as CourseTypeCode),
    stateSlug: config.stateSlug,
    stateCode: config.stateCode,
    name: track.name,
    audience: track.audience,
    status: track.status,
    notes: track.notes,
    active: track.status === "approved" || track.status === "submitted",
  }))
}

export function getCourseTypeForState(
  state: string,
  courseTypeCode: string
): CourseTypeDefinition | null {
  return (
    getCourseTypesForState(state).find((courseType) => courseType.code === courseTypeCode) ??
    null
  )
}

export function getAllCourseTypes() {
  return ["virginia", "florida"].flatMap((state) => getCourseTypesForState(state))
}
