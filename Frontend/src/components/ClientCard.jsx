import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { apiClient } from '../hooks/apiClient.js'

function resolveAssetUrl(rawUrl) {
  const url = String(rawUrl || '').trim()
  if (!url) return ''

  if (/^(https?:)?\/\//i.test(url) || /^data:/i.test(url) || /^blob:/i.test(url)) return url

  const baseURL = String(apiClient?.defaults?.baseURL || '').replace(/\/$/, '')
  if (!baseURL) return url

  if (url.startsWith('/')) return `${baseURL}${url}`
  return `${baseURL}/${url}`
}

function ClientCard({ client }) {
  const name = client.name || 'Client'
  const role = client.role || client.designation || ''
  const company = client.company || ''
  const quote = client.quote || client.description || ''
  const tags = Array.isArray(client.tags) ? client.tags : []
  const avatarUrl = resolveAssetUrl(client.imageUrl || client.imagePath || '')

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    if (!isPreviewOpen) return

    function onKeyDown(event) {
      if (event.key === 'Escape') setIsPreviewOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isPreviewOpen])

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white px-6 pb-6 pt-12 shadow-sm">
      <div className="absolute -top-8 left-6">
        <button
          type="button"
          className="h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm"
          onClick={avatarUrl ? () => setIsPreviewOpen(true) : undefined}
          aria-label={avatarUrl ? `Preview ${name}` : name}
        >
          {avatarUrl ? (
            <img
              alt={name}
              src={avatarUrl}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
              {initials || 'C'}
            </div>
          )}
        </button>
      </div>

      {isPreviewOpen && avatarUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsPreviewOpen(false)} />
          <div className="relative" onClick={(event) => event.stopPropagation()}>
            <div className="h-72 w-72 overflow-hidden rounded-full bg-slate-100 ring-4 ring-white sm:h-80 sm:w-80">
              <img
                alt={name}
                src={avatarUrl}
                className="h-full w-full object-contain object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ) : null}

      {quote ? <p className="flex-1 text-sm leading-relaxed text-slate-600">{quote}</p> : null}

      <div className="mt-5">
        <p className="text-sm font-semibold text-sky-700">{name}</p>
        <p className="mt-1 text-xs text-slate-500">
          {role ? role : null}
          {role && company ? <span>, </span> : null}
          {company ? company : null}
        </p>
      </div>

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  )
}

ClientCard.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    designation: PropTypes.string,
    company: PropTypes.string,
    quote: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    imagePath: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default ClientCard
