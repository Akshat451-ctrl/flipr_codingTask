import { NavLink } from 'react-router-dom'

function AdminDashboard() {
  return (
    <section className="bg-slate-50">
      <div className="container py-10 sm:py-14">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Admin dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage projects, clients, contact requests, and newsletter subscribers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <NavLink
              to="/admin/projects"
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-900">Projects</p>
              <p className="mt-2 text-sm text-slate-600">Review or add new work.</p>
            </NavLink>
            <NavLink
              to="/admin/clients"
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-900">Clients</p>
              <p className="mt-2 text-sm text-slate-600">Testimonials and logos.</p>
            </NavLink>
            <NavLink
              to="/admin/contacts"
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-900">Contacts</p>
              <p className="mt-2 text-sm text-slate-600">Inbound consultation requests.</p>
            </NavLink>
            <NavLink
              to="/admin/subscribers"
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-900">Subscribers</p>
              <p className="mt-2 text-sm text-slate-600">Newsletter signups.</p>
            </NavLink>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Status</h2>
            <p className="mt-2 text-sm text-slate-600">
              API base URL: <span className="font-semibold">{import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}</span>
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Connect your backend routes to <span className="font-semibold">/api</span> endpoints to power this panel.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
