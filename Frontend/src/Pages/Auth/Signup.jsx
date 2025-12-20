import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../../components/Loader.jsx'
import { normalizeApiError } from '../../hooks/apiClient.js'
import { useAuth } from '../../context/AuthContext.jsx'

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !password) {
      setFormError('Please fill all required fields.')
      return
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      await signup({ fullName: name.trim(), email: email.trim(), password })
      navigate('/admin', { replace: true })
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
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create your account</h1>
              <p className="mt-2 text-sm text-slate-600">Sign up to access the admin portal.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div>
                <label className="field-label" htmlFor="signupName">
                  Full name
                </label>
                <input
                  id="signupName"
                  type="text"
                  autoComplete="name"
                  className="field-input"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="signupEmail">
                  Email
                </label>
                <input
                  id="signupEmail"
                  type="email"
                  autoComplete="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="signupPassword">
                  Password
                </label>
                <input
                  id="signupPassword"
                  type="password"
                  autoComplete="new-password"
                  className="field-input"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="signupConfirmPassword">
                  Confirm password
                </label>
                <input
                  id="signupConfirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="field-input"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
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
                {isSubmitting ? <Loader label="Creating account" size="sm" tone="onPrimary" /> : 'Sign up'}
              </button>

              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                  Log in
                </Link>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            By signing up, you agree to access admin features responsibly.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Signup
