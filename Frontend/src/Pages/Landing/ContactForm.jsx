import { useMemo, useState } from 'react'

import Loader from '../Frontend/src/components/Loader.jsx'
import { apiClient, normalizeApiError } from '../Frontend/src/hooks/apiClient.js'

const initialFormState = {
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  message: '',
}

function ContactForm() {
  const [formValues, setFormValues] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const isValidEmail = useMemo(() => {
    if (!formValues.email) return true
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
  }, [formValues.email])

  function updateField(fieldName) {
    return (event) => {
      setSubmitError('')
      setSubmitSuccess('')
      setFormValues((current) => ({ ...current, [fieldName]: event.target.value }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formValues.fullName.trim()) {
      setSubmitError('Please add your name.')
      return
    }

    if (!formValues.email.trim()) {
      setSubmitError('Please add an email address so we can reply.')
      return
    }

    if (!formValues.mobile.trim() || !formValues.city.trim()) {
      setSubmitError('Please add your mobile number and city.')
      return
    }

    if (!isValidEmail) {
      setSubmitError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')

    try {
      await apiClient.post('/api/contacts', {
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        mobile: formValues.mobile.trim(),
        city: formValues.city.trim(),
        message: formValues.message.trim(),
      })

      setSubmitSuccess('Thanks — we’ll reach out shortly.')
      setFormValues(initialFormState)
    } catch (error) {
      setSubmitError(normalizeApiError(error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-white">
      <div className="container py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-400 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-400 blur-3xl" />
          </div>

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90">
                Get Free Consultation
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Let’s talk about your project.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Share your details and we’ll call you back with a quick plan—pricing inputs, positioning,
                and next steps.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Consultation</p>
                  <p className="mt-1 text-xs text-white/70">Short call to understand your goals.</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Design</p>
                  <p className="mt-1 text-xs text-white/70">Product mix & layout guidance.</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Marketing</p>
                  <p className="mt-1 text-xs text-white/70">Launch plan and messaging.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white/10 p-6 shadow-sm ring-1 ring-white/15 backdrop-blur sm:p-8"
              >
                <h3 className="text-center text-2xl font-semibold tracking-tight text-white">
                  Get a Free Consultation
                </h3>

                <div className="mt-8 grid gap-5">
              <div>
                <label className="text-sm font-semibold text-white" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  value={formValues.fullName}
                  onChange={updateField('fullName')}
                  className="mt-2 w-full rounded-lg border border-white/35 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-white/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/40"
                  placeholder="Full Name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white" htmlFor="email">
                  Enter Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formValues.email}
                  onChange={updateField('email')}
                  className="mt-2 w-full rounded-lg border border-white/35 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-white/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/40"
                  placeholder="Enter Email Address"
                  autoComplete="email"
                  aria-invalid={!isValidEmail}
                  aria-describedby={!isValidEmail ? 'emailError' : undefined}
                />
                {!isValidEmail ? (
                  <p id="emailError" className="mt-2 text-xs font-medium text-rose-200">
                    Please enter a valid email.
                  </p>
                ) : null}
              </div>

              <div>
                <label className="text-sm font-semibold text-white" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  value={formValues.mobile}
                  onChange={updateField('mobile')}
                  className="mt-2 w-full rounded-lg border border-white/35 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-white/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/40"
                  placeholder="Mobile Number"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white" htmlFor="city">
                  Area, City
                </label>
                <input
                  id="city"
                  value={formValues.city}
                  onChange={updateField('city')}
                  className="mt-2 w-full rounded-lg border border-white/35 bg-white/10 px-3 py-3 text-sm text-white placeholder:text-white/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/40"
                  placeholder="Area, City"
                  autoComplete="address-level2"
                />
              </div>

              {submitError ? (
                <div className="rounded-lg border border-rose-200/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {submitError}
                </div>
              ) : null}

              {submitSuccess ? (
                <div className="rounded-lg border border-emerald-200/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  {submitSuccess}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Loader label="Sending" size="sm" tone="onPrimary" /> : 'Get Quick Quote'}
              </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
