export const DEV_CONFIG = {
  global: {
    BYPASS_FINAL_EXAM_SEAT_TIME: false,
  },

  states: {
    virginia: {
      BYPASS_FINAL_EXAM_SEAT_TIME: true,
    },
  },
} as const

export function isFinalExamSeatTimeBypassed(state?: string) {
  const normalizedState = String(state ?? "").trim().toLowerCase()

  if (!normalizedState) {
    return DEV_CONFIG.global.BYPASS_FINAL_EXAM_SEAT_TIME
  }

  const stateConfig = DEV_CONFIG.states[
    normalizedState as keyof typeof DEV_CONFIG.states
  ]

  if (
    stateConfig &&
    typeof stateConfig.BYPASS_FINAL_EXAM_SEAT_TIME === "boolean"
  ) {
    return stateConfig.BYPASS_FINAL_EXAM_SEAT_TIME
  }

  return DEV_CONFIG.global.BYPASS_FINAL_EXAM_SEAT_TIME
}