import { useCallback, useMemo } from 'react'

import ProjectCard from '../../components/ProjectCard.jsx'
import Loader from '../../components/Loader.jsx'
import { apiClient, normalizeApiError } from '../../hooks/apiClient.js'
import useAsync from '../../hooks/useAsync.js'

function OurProjects() {
  const fallbackProjects = useMemo(
    () => [
      {
        id: 'p-1',
        title: 'Emerald Residency',
        location: 'Pune, Maharashtra',
        type: 'Residential',
        summary: 'Unit mix and pricing strategy for a mid-market gated community.',
        budget: '₹75Cr',
        timeline: '18 months',
        imageUrl: 'https://media.easemytrip.com/media/Hotel/SHL-22081048842077/Common/CommonvcMWln.jpg',
      },
      {
        id: 'p-3',
        title: 'Lakeview Plots',
        location: 'Hyderabad, Telangana',
        type: 'Plotted',
        summary: 'Demand mapping and launch plan for a plotted development near the ORR.',
        budget: '₹45Cr',
        timeline: '12 months',
        imageUrl: 'https://images.unsplash.com/photo-1469820578517-4086c8a154df?q=80&w=1291&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    {
  id: 'p-4',
  title: 'Azure Heights',
  location: 'Mumbai, Maharashtra',
  type: 'Residential',
  summary: 'High-rise luxury apartments with sea-view units and premium amenities planning.',
  budget: '₹200Cr',
  timeline: '30 months',
  imageUrl: 'https://www.ayaanshinfra.com/images/blog/7-reasons-india-1.jpg',
},
     {
  id: 'p-5',
  title: 'Vertex Tech Hub',
  location: 'Bengaluru, Karnataka',
  type: 'Commercial',
  summary: 'Campus-style IT park development with sustainability focus and tenant attraction strategy.',
  budget: '₹180Cr',
  timeline: '28 months',
  imageUrl: 'https://www.savills.com/prospects/wp-content/uploads/Indias-Business-Park.jpg',
},
{
  id: 'p-6',
  title: 'Serenity Villas',
  location: 'Chennai, Tamil Nadu',
  type: 'Plotted',
  summary: 'Premium villa plots in a gated township with phased launch and marketing roadmap.',
  budget: '₹90Cr',
  timeline: '20 months',
  imageUrl: 'https://www.saketgroup.com/img/news/luxurious-integrated-township-villas-sale-hyderabad.jpg',
},
    ],
    [],
  )

  const fetchProjects = useCallback(async () => {
    const response = await apiClient.get('/api/projects')
    return response.data
  }, [])

  const { data, isLoading, error } = useAsync(fetchProjects)

  const hasApiData = Array.isArray(data) && data.length
  const projects = hasApiData ? data : fallbackProjects
  const isUsingFallback = !hasApiData
  const errorMessage = error ? normalizeApiError(error).message : null

  return (
    <section id="projects" className="bg-white">
      <div className="container py-14 sm:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Our Projects</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Our Projects</h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-sky-600" aria-hidden="true" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            Explore a few engagements across consultation, design, and marketing.
          </p>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <Loader label="Loading projects" />
          ) : isUsingFallback ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
              Showing a few sample projects
              {errorMessage ? <span className="text-slate-500">({errorMessage})</span> : null}
            </div>
          ) : null}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {projects.map((project) => (
              <ProjectCard key={project.id || project._id || project.title} project={project} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a href="#contact" className="secondary-button">
              Discuss your project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurProjects
