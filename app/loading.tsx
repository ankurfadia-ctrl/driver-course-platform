export default function RootLoadingPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_55%,#f8fafc_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="h-3 w-28 animate-pulse rounded-full bg-blue-100" />
        <div className="mt-6 h-12 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-4 h-6 w-full animate-pulse rounded-xl bg-slate-100" />
        <div className="mt-3 h-6 w-5/6 animate-pulse rounded-xl bg-slate-100" />
        <div className="mt-8 flex gap-3">
          <div className="h-12 w-40 animate-pulse rounded-2xl bg-blue-200" />
          <div className="h-12 w-40 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    </main>
  )
}
