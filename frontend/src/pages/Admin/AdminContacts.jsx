import { useCallback, useMemo } from 'react'

import Loader from '../Frontend/src/components/Loader.jsx'
import { apiClient, normalizeApiError } from '../Frontend/src/hooks/apiClient.js'
import useAsync from '../Frontend/src/hooks/useAsync.js'

function AdminContacts() {
  const fallback = useMemo(
    () => [
      {
        id: 'k-1',
        fullName: 'Sample contact',
        email: 'sample@example.com',
        mobile: '+91 00000 00000',
        city: 'Pune',
        message: 'This is where inbound messages will appear once your backend is connected.',
      },
    ],
    [],
  )

  const fetchContacts = useCallback(async () => {
    const response = await apiClient.get('/api/contacts')
    return response.data?.data
  }, [])

  const { data, isLoading, error } = useAsync(fetchContacts)

  const hasApiData = Array.isArray(data) && data.length
  const rows = hasApiData ? data : fallback
  const isUsingFallback = !hasApiData
  const errorMessage = error ? normalizeApiError(error).message : null

  return (
    <section className="bg-slate-50">
      <div className="container py-10 sm:py-14">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Contacts</h1>
            <p className="mt-2 text-sm text-slate-600">Incoming contact requests from the landing page.</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">Requests</p>
              {isLoading ? <Loader label="Loading" size="sm" /> : null}
            </div>

            {isUsingFallback ? (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
                Showing sample message
                {errorMessage ? <span className="text-slate-500">({errorMessage})</span> : null}
              </div>
            ) : errorMessage ? (
              <p className="mt-4 text-sm text-slate-600">{errorMessage}</p>
            ) : null}

            <div className="mt-6 space-y-4">
              {rows.map((row) => (
                <div key={row.id || row._id || row.email} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{row.fullName || row.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{row.email}</p>
                      {row.mobile || row.phone ? (
                        <p className="mt-1 text-sm text-slate-600">{row.mobile || row.phone}</p>
                      ) : null}
                      {row.city ? <p className="mt-1 text-sm text-slate-600">{row.city}</p> : null}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{row.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminContacts
