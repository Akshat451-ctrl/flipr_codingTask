import { useCallback, useMemo } from 'react'

import Loader from '../../components/Loader.jsx'
import { apiClient, normalizeApiError } from '../../hooks/apiClient.js'
import useAsync from '../../hooks/useAsync.js'

function AdminSubscribers() {
  const fallback = useMemo(
    () => [
      { id: 's-1', email: 'subscriber@example.com', source: 'Landing page' },
      { id: 's-2', email: 'investor@domain.com', source: 'Landing page' },
    ],
    [],
  )

  const fetchSubscribers = useCallback(async () => {
    const response = await apiClient.get('/api/subscribers')
    return response.data?.data
  }, [])

  const { data, isLoading, error } = useAsync(fetchSubscribers)

  const hasApiData = Array.isArray(data) && data.length
  const rows = hasApiData ? data : fallback
  const isUsingFallback = !hasApiData
  const errorMessage = error ? normalizeApiError(error).message : null

  return (
    <section className="bg-slate-50">
      <div className="container py-10 sm:py-14">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Subscribers</h1>
            <p className="mt-2 text-sm text-slate-600">Newsletter signups collected from the landing page.</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">List</p>
              {isLoading ? <Loader label="Loading" size="sm" /> : null}
            </div>

            {isUsingFallback ? (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
                Showing sample rows
                {errorMessage ? <span className="text-slate-500">({errorMessage})</span> : null}
              </div>
            ) : errorMessage ? (
              <p className="mt-4 text-sm text-slate-600">{errorMessage}</p>
            ) : null}

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-3 pr-6">Email</th>
                    <th className="py-3 pr-6">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((row) => (
                    <tr key={row.id || row._id || row.email} className="text-slate-700 hover:bg-slate-50">
                      <td className="py-4 pr-6 font-semibold text-slate-900">{row.email}</td>
                      <td className="py-4 pr-6">{row.source || 'Newsletter'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminSubscribers
