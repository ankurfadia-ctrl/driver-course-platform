import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage({
  params,
}: {
  params: { state: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${params.state}/login`)
  }

  async function logout() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect(`/${params.state}/login`)
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <p className="text-slate-600">
        Logged in as <span className="font-medium">{user.email}</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${params.state}/course`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Go to Course
        </Link>

        <Link
          href={`/${params.state}/checkout`}
          className="border border-slate-300 px-6 py-3 rounded-lg"
        >
          View Plans
        </Link>
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="mt-4 text-sm text-red-600 underline"
        >
          Log out
        </button>
      </form>
    </main>
  )
}