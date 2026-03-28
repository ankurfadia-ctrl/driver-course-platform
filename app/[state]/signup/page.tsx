'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('Creating account...')

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Account created. Check your email for confirmation if required.')
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