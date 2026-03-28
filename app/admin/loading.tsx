export default function AdminLoadingPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-3 w-24 animate-pulse rounded-full bg-blue-100" />
        <div className="mt-4 h-10 w-72 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-3 h-5 w-full animate-pulse rounded-xl bg-slate-100" />
        <div className="mt-2 h-5 w-2/3 animate-pulse rounded-xl bg-slate-100" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-4 h-8 w-20 animate-pulse rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
