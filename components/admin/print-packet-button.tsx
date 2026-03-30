"use client"

export default function PrintPacketButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
    >
      Print / Save as PDF
    </button>
  )
}
