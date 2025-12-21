import { useCallback, useMemo, useState } from 'react'

import Loader from '../Frontend/src/components/Loader.jsx'
import { apiClient, normalizeApiError } from '../Frontend/src/hooks/apiClient.js'
import useAsync from '../Frontend/src/hooks/useAsync.js'

function resolveAssetUrl(rawUrl) {
  const url = String(rawUrl || '').trim()
  if (!url) return ''

  if (/^(https?:)?\/\//i.test(url) || /^data:/i.test(url) || /^blob:/i.test(url)) return url

  const baseURL = String(apiClient?.defaults?.baseURL || '').replace(/\/$/, '')
  if (!baseURL) return url

  if (url.startsWith('/')) return `${baseURL}${url}`
  return `${baseURL}/${url}`
}

function AdminProjects() {
  const fallback = useMemo(
    () => [
      {
        id: 'p-1',
        name: 'Emerald Residency',
        description: 'Unit mix and pricing strategy for a mid-market gated community.',
      },
      {
        id: 'p-2',
        name: 'Cedar Business Park',
        description: 'Tenant-led positioning and launch plan for a commercial business park.',
      },
    ],
    [],
  )

  const fetchProjects = useCallback(async () => {
    const response = await apiClient.get('/api/projects')
    return response.data?.data
  }, [])

  const { data, isLoading, error, run } = useAsync(fetchProjects)

  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [submitState, setSubmitState] = useState({ isSubmitting: false, error: '', success: '' })

  const hasApiData = Array.isArray(data) && data.length
  const rows = hasApiData ? data : fallback
  const isUsingFallback = !hasApiData
  const errorMessage = error ? normalizeApiError(error).message : null

  async function handleSubmit(event) {
    event.preventDefault()

    setSubmitState({ isSubmitting: true, error: '', success: '' })

    try {
      const trimmedName = name.trim()
      const trimmedDescription = description.trim()

      if (!imageFile) {
        setSubmitState({ isSubmitting: false, error: 'Project image is required.', success: '' })
        return
      }
      if (!trimmedName) {
        setSubmitState({ isSubmitting: false, error: 'Project name is required.', success: '' })
        return
      }
      if (!trimmedDescription) {
        setSubmitState({ isSubmitting: false, error: 'Project description is required.', success: '' })
        return
      }

      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('name', trimmedName)
      formData.append('description', trimmedDescription)

      await apiClient.post('/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSubmitState({ isSubmitting: false, error: '', success: 'Project added.' })
      setName('')
      setDescription('')
      setImageFile(null)
      setIsAdding(false)
      await run()
    } catch (caught) {
      setSubmitState({
        isSubmitting: false,
        error: normalizeApiError(caught).message,
        success: '',
      })
    }
  }

  return (
    <section className="bg-slate-50">
      <div className="container py-10 sm:py-14">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Projects</h1>
            <p className="mt-2 text-sm text-slate-600">Add and review projects connected to your API.</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">Project list</p>
              <div className="flex items-center gap-3">
                {isLoading ? <Loader label="Loading" size="sm" /> : null}
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding((prev) => !prev)
                    setSubmitState({ isSubmitting: false, error: '', success: '' })
                  }}
                  className="primary-button"
                >
                  {isAdding ? 'Close' : 'Add Project'}
                </button>
              </div>
            </div>

            {isAdding ? (
              <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="projectImage">
                      Project’s Image
                    </label>
                    <input
                      id="projectImage"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="projectName">
                      Project’s Name
                    </label>
                    <input
                      id="projectName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="field-input"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="projectDescription">
                      Project’s Description
                    </label>
                    <textarea
                      id="projectDescription"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="field-input min-h-28"
                      placeholder="Write a short description"
                    />
                  </div>
                </div>

                {submitState.error ? <p className="mt-3 text-sm text-rose-600">{submitState.error}</p> : null}
                {submitState.success ? <p className="mt-3 text-sm text-emerald-700">{submitState.success}</p> : null}

                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitState.isSubmitting}
                    className="primary-button disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitState.isSubmitting ? 'Saving…' : 'Save Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false)
                      setName('')
                      setDescription('')
                      setImageFile(null)
                      setSubmitState({ isSubmitting: false, error: '', success: '' })
                    }}
                    className="secondary-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : null}

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
                    <th className="py-3 pr-6">Image</th>
                    <th className="py-3 pr-6">Name</th>
                    <th className="py-3 pr-6">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((row) => (
                    <tr key={row.id || row._id || row.name} className="text-slate-700 hover:bg-slate-50">
                      <td className="py-4 pr-6">
                        {row.imageUrl || row.imagePath ? (
                          <img
                            src={resolveAssetUrl(row.imageUrl || row.imagePath)}
                            alt={row.name || 'Project image'}
                            className="h-12 w-12 rounded-xl border border-slate-200 object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-xl border border-slate-200 bg-slate-100" aria-hidden="true" />
                        )}
                      </td>
                      <td className="py-4 pr-6 font-semibold text-slate-900">{row.name}</td>
                      <td className="py-4 pr-6">
                        <p className="max-w-xl text-sm text-slate-600 line-clamp-2">{row.description}</p>
                      </td>
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

export default AdminProjects
