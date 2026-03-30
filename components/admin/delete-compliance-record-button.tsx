"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type Props = {
  userId: string
  state: string
  studentLabel: string
}

export default function DeleteComplianceRecordButton({
  userId,
  state,
  studentLabel,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete ${studentLabel}'s ${state} dashboard records? This is intended for test accounts and removes purchases, exam results, course progress, identity, seat time, and support records for that state.`
    )

    if (!confirmed) {
      return
    }

    setError("")

    try {
      const response = await fetch("/api/admin/compliance/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          state,
        }),
      })

      const data = (await response.json()) as
        | { ok: true }
        | { ok: false; error?: string }

      if (!response.ok || !data.ok) {
        throw new Error("error" in data ? data.error ?? "Delete failed." : "Delete failed.")
      }

      startTransition(() => {
        router.refresh()
      })
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Delete failed."
      )
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => void handleDelete()}
        disabled={isPending}
        className="inline-flex rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Deleting..." : "Delete test data"}
      </button>
      {error ? <div className="mt-2 text-xs text-red-700">{error}</div> : null}
    </div>
  )
}
