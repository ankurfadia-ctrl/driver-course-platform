'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const params = useParams()
  const state =
    typeof params?.state === 'string' ? params.state : 'virginia'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('Creating account...')

    const supabase = createClient()
    const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim()
    const redirectBaseUrl =
      configuredBaseUrl && /^https?:\/\//.test(configuredBaseUrl)
        ? configuredBaseUrl.replace(/\/$/, '')
        : typeof window !== 'undefined'
        ? window.location.origin
        : ''

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectBaseUrl
          ? `${redirectBaseUrl}/${state}/dashboard`
          : undefined,
      },
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setPassword('')
    setMessage(
      data.session
        ? 'Account created. You can log in now.'
        : 'Account created. Check your email and confirm your address before logging in.'
    )
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="mb-6 text-3xl font-bold">Signup page</h1>

      <form onSubmit={handleSignup} className="flex max-w-md flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border px-3 py-2"
          required
        />

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Create account
        </button>
      </form>

      {message ? <p className="mt-4">{message}</p> : null}
    </main>
  )
}
