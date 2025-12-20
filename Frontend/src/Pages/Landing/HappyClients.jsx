import { useCallback, useMemo } from 'react'

import ClientCard from '../Frontend/src/components/ClientCard.jsx'
import Loader from '../Frontend/src/components/Loader.jsx'
import { apiClient, normalizeApiError } from '../Frontend/src/hooks/apiClient.js'
import useAsync from '../Frontend/src/hooks/useAsync.js'

function getInitials(name) {
  return String(name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function avatarDataUri({ name, bg = '#0ea5e9' }) {
  const initials = getInitials(name) || 'C'
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}" stop-opacity="1" />
      <stop offset="1" stop-color="#10b981" stop-opacity="1" />
    </linearGradient>
  </defs>
  <circle cx="48" cy="48" r="48" fill="url(#g)" />
  <text x="48" y="54" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="34" font-weight="700" fill="#ffffff">${initials}</text>
</svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function HappyClients() {
  const fallbackClients = useMemo(
    () => [
      {
        id: 'c-1',
        name: 'Aarav Mehta',
        role: 'Founder',
        company: 'Mehta Developments',
        quote:
          'They helped us simplify the decision. Pricing and unit mix got sharper in one week, and the team knew exactly what to execute next.',
        tags: ['Pricing', 'Unit mix'],
        imageUrl: 'https://img.freepik.com/free-photo/businessman-with-jacket_23-2147996566.jpg?semt=ais_hybrid&w=740&q=80',
      },
      {
        id: 'c-2',
        name: 'Neha Kapoor',
        role: 'Investment Analyst',
        company: 'NorthStar Capital',
        quote:
          'Clear assumptions and clean analysis. The risk discussion was practical and easy to explain to stakeholders.',
        tags: ['Feasibility', 'Risk review'],
        imageUrl: 'https://img.freepik.com/premium-photo/photo-young-professional-diplomat-foreign-service-officer_1077802-127675.jpg?w=360',
      },
      {
        id: 'c-3',
        name: 'Rahul Iyer',
        role: 'Project Director',
        company: 'UrbanCraft',
        quote:
          'Great balance of market insight and execution planning. The recommendations were specific, not generic.',
        tags: ['Strategy', 'Execution'],
        imageUrl: 'https://thumbs.dreamstime.com/b/young-african-american-man-surprised-showing-his-hand-to-side-young-african-american-man-surprised-showing-his-hand-to-296226973.jpg',
      },
      {
        id: 'c-4',
        name: 'Riya Sharma',
        role: 'Sales Head',
        company: 'BlueStone Realty',
        quote:
          'The launch plan was simple and effective. The messaging improved walk-ins and helped our sales team stay consistent.',
        tags: ['Launch', 'Messaging'],
        imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=360&auto=format&fit=crop',
      },
      {
        id: 'c-5',
        name: 'Kunal Verma',
        role: 'Co-founder',
        company: 'Verma Infra',
        quote:
          'Feasibility insights were spot-on. We changed the unit mix early and avoided a costly redesign later.',
        tags: ['Feasibility', 'Unit mix'],
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-r0BDXr45BzF5vBGHw1HGYTrTpnfD04YBg&s',
      },
    ],
    [],
  )

  const fetchClients = useCallback(async () => {
    const response = await apiClient.get('/api/clients')
    return response.data?.data
  }, [])

  const { data, isLoading, error } = useAsync(fetchClients)

  const hasApiData = Array.isArray(data) && data.length
  const clients = hasApiData ? data : fallbackClients
  const isUsingFallback = !hasApiData
  const errorMessage = error ? normalizeApiError(error).message : null

  return (
    <section id="clients" className="bg-white">
      <div className="container py-14 sm:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Happy Clients</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Happy Clients</h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-sky-600" aria-hidden="true" />
        </div>

        <div className="mt-10">
          {isLoading ? (
            <Loader label="Loading client feedback" />
          ) : isUsingFallback ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
              Showing sample testimonials
              {errorMessage ? <span className="text-slate-500">({errorMessage})</span> : null}
            </div>
          ) : null}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {clients.map((client) => (
              <ClientCard key={client.id || client._id || client.name} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HappyClients
