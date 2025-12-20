import { useState } from 'react'

import Loader from '../components/Loader.jsx'
import { apiClient, normalizeApiError } from '../Frontend/src/hooks/apiClient.js'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim()) {
      setSubmitError('Please enter an email address.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')

    try {
      await apiClient.post('/api/subscribers', { email: email.trim() })
      setSubmitSuccess('Subscribed — you’ll get our next update.')
      setEmail('')
    } catch (error) {
      setSubmitError(normalizeApiError(error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-sky-700">
      <div className="container py-6 sm:py-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Subscribe Us</p>
            <p className="mt-1 text-xs text-white/80">Get updates on launches and market notes.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <input
              id="newsletterEmail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:w-80"
              placeholder="Email"
              type="email"
              autoComplete="email"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-sky-800 transition hover:bg-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700 disabled:cursor-not-allowed disabled:opacity-80"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader label="Saving" size="sm" /> : 'Subscribe'}
            </button>
          </form>
        </div>

        {submitError ? (
          <p className="mt-3 text-sm text-white/90">{submitError}</p>
        ) : null}

        {submitSuccess ? (
          <p className="mt-3 text-sm text-white/90">{submitSuccess}</p>
        ) : null}
      </div>
    </section>
  )
}

export default Newsletter
