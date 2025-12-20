import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Loader from '../Frontend/src/components/Loader.jsx'
import { normalizeApiError } from '../Frontend/src/hooks/apiClient.js'
import { useAuth } from '../Frontend/src/context/AuthContext.jsx'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const redirectTo = useMemo(() => {
    const from = location.state?.from
    if (typeof from === 'string' && from.startsWith('/')) return from
    return '/admin'
  }, [location.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password) {
      setFormError('Please enter your email and password.')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      await login({ email: email.trim(), password })
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setFormError(normalizeApiError(error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-slate-50">
      <div className="container py-12 sm:py-16">
        <div className="mx-auto w-full max-w-lg">
          <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-600">Log in to access the admin portal.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div>
                <label className="field-label" htmlFor="loginEmail">
                  Email
                </label>
                <input
                  id="loginEmail"
                  type="email"
                  autoComplete="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="loginPassword">
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  autoComplete="current-password"
                  className="field-input"
                  placeholder="Your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              {formError ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {formError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Loader label="Signing in" size="sm" tone="onPrimary" /> : 'Log in'}
              </button>

              <p className="text-sm text-slate-600">
                New here?{' '}
                <Link to="/signup" className="font-semibold text-emerald-700 hover:text-emerald-800">
                  Create an account
                </Link>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            If you don’t have an account yet, sign up first.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
