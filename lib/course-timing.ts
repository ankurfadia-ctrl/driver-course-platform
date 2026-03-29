export const COURSE_TOTAL_REQUIRED_SECONDS = 8 * 60 * 60
export const FINAL_EXAM_UNLOCK_SECONDS = 7 * 60 * 60

export function formatCourseDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const remainingSeconds = safeSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${remainingSeconds}s`
}

export function getRemainingToFinalExam(totalSeconds: number) {
  return Math.max(0, FINAL_EXAM_UNLOCK_SECONDS - Math.max(0, totalSeconds))
}

export function getRemainingToCertificate(totalSeconds: number) {
  return Math.max(0, COURSE_TOTAL_REQUIRED_SECONDS - Math.max(0, totalSeconds))
}

export function isFinalExamUnlockedBySeatTime(totalSeconds: number) {
  return totalSeconds >= FINAL_EXAM_UNLOCK_SECONDS
}

export function isCertificateUnlockedBySeatTime(totalSeconds: number) {
  return totalSeconds >= COURSE_TOTAL_REQUIRED_SECONDS
}
