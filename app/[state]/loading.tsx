export default function StateLoadingPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="h-3 w-28 animate-pulse rounded-full bg-blue-100" />
        <div className="mt-5 h-12 w-4/5 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-4 h-6 w-full animate-pulse rounded-xl bg-slate-100" />
        <div className="mt-3 h-6 w-5/6 animate-pulse rounded-xl bg-slate-100" />
        <div className="mt-8 flex gap-3">
          <div className="h-12 w-36 animate-pulse rounded-2xl bg-blue-200" />
          <div className="h-12 w-36 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="h-3 w-16 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-4 h-8 w-40 animate-pulse rounded-xl bg-slate-100" />
            <div className="mt-3 h-5 w-full animate-pulse rounded-xl bg-slate-100" />
            <div className="mt-2 h-5 w-3/4 animate-pulse rounded-xl bg-slate-100" />
          </div>
        ))}
      </section>
    </div>
  )
}
