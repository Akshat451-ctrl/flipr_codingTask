import { useMemo, useState } from 'react'

import PropTypes from 'prop-types'
import { apiClient } from '../hooks/apiClient.js'

function resolveAssetUrl(rawUrl) {
  const url = String(rawUrl || '').trim()
  if (!url) return ''

  // Already absolute (http/https), data uri, or blob url
  if (/^(https?:)?\/\//i.test(url) || /^data:/i.test(url) || /^blob:/i.test(url)) return url

  const baseURL = String(apiClient?.defaults?.baseURL || '').replace(/\/$/, '')
  if (!baseURL) return url

  // Backend returns paths like /uploads/...
  if (url.startsWith('/')) return `${baseURL}${url}`
  return `${baseURL}/${url}`
}

function ProjectCard({ project }) {
  const title = project.title || project.name || 'Untitled project'
  const summary = project.summary || project.description || ''
  const location = project.location || project.city || ''
  const type = project.type || project.category || ''
  const budget = project.budget || ''
  const timeline = project.timeline || ''
  const imageUrl = resolveAssetUrl(project.imageUrl || project.imagePath || '')

  const [isExpanded, setIsExpanded] = useState(false)

  const metaRows = useMemo(
    () =>
      [
        { label: 'Type', value: type },
        { label: 'Location', value: location },
        { label: 'Budget', value: budget },
        { label: 'Timeline', value: timeline },
      ].filter((row) => Boolean(row.value)),
    [type, location, budget, timeline],
  )

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isExpanded ? '-translate-y-0.5 shadow-md' : ''
      }`}
    >
      <div className="aspect-[16/11] w-full bg-gradient-to-br from-slate-100 to-slate-50">
        {imageUrl ? (
          <img
            alt={title}
            src={imageUrl}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm font-medium text-slate-400">Project preview</p>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-sky-700">{title}</h3>
        {(type || location) ? (
          <p className="mt-2 text-sm text-slate-600">
            {type ? <span className="font-semibold text-slate-700">{type}</span> : null}
            {type && location ? <span className="px-2 text-slate-400">•</span> : null}
            {location}
          </p>
        ) : null}

        {summary ? (
          <p
            className={`mt-3 text-sm leading-relaxed text-slate-600 ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
          >
            {summary}
          </p>
        ) : null}

        {isExpanded && metaRows.length ? (
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-slate-50 p-4">
            {metaRows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{row.label}</dt>
                <dd className="mt-1 text-sm font-medium text-slate-800">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-4 flex items-center justify-between">
          {(budget || timeline) ? (
            <p className="text-xs font-medium text-slate-500">
              {budget ? <span>{budget}</span> : null}
              {budget && timeline ? <span className="px-2">•</span> : null}
              {timeline ? <span>{timeline}</span> : null}
            </p>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-orange-600"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </article>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    city: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    summary: PropTypes.string,
    description: PropTypes.string,
    budget: PropTypes.string,
    timeline: PropTypes.string,
    imageUrl: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
}

export default ProjectCard
