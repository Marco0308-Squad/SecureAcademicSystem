import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from '../constants'

interface LocationState {
  from?: { pathname: string }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as LocationState)?.from?.pathname || ROUTES.DASHBOARD

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const result = await authService.login({ email, password })
      login(result.user, result.accessToken, result.refreshToken)
      navigate(from, { replace: true })
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border-4 border-slate-800 bg-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(34,211,238,0.3)]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">
            SAMS
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Secure Academic System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-xl border-2 border-red-500 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="mt-1.5 block w-full rounded-xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1.5 block w-full rounded-xl border-2 border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl border-2 border-cyan-500 bg-cyan-500 px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 shadow-[4px_4px_0px_0px_rgba(34,211,238,0.4)] transition hover:bg-cyan-400 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <Link
            to={ROUTES.REGISTER}
            className="block font-semibold text-slate-400 underline underline-offset-4 transition hover:text-cyan-400"
          >
            Create an account
          </Link>
          <Link
            to="/forgot-password"
            className="block text-slate-500 transition hover:text-slate-300"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}
