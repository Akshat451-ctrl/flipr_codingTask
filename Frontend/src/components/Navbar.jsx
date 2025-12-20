import { NavLink, useLocation } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

const navLinkBase =
  'rounded-full px-3.5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2'

const navLinkInactive =
  'text-slate-600 hover:bg-white hover:text-slate-900 hover:ring-1 hover:ring-slate-200/70'
const navLinkActive = 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-200'

function Navbar() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="group flex items-center gap-3">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-[11px] font-extrabold tracking-wide text-white shadow-sm ring-1 ring-emerald-600/25 transition group-hover:-translate-y-0.5 group-hover:shadow">
              FC
              <span
                className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white"
                aria-hidden="true"
              />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight text-slate-900">Flipr Consulting</p>
              <p className="text-xs text-slate-500">Real estate advisory</p>
            </div>
          </NavLink>

          <nav className="hidden items-center md:flex" aria-label="Primary">
            {!isAdminRoute && !isAuthRoute ? (
              <div className="flex items-center gap-1 rounded-full bg-slate-50/80 p-1 ring-1 ring-slate-200/70">
                <a className={`${navLinkBase} ${navLinkInactive}`} href="#projects">
                  Projects
                </a>
                <a className={`${navLinkBase} ${navLinkInactive}`} href="#clients">
                  Clients
                </a>
                <a className={`${navLinkBase} ${navLinkInactive}`} href="#contact">
                  Contact
                </a>
                <NavLink
                  to={isAuthenticated ? '/admin' : '/login'}
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                  }
                >
                  {isAuthenticated ? 'Admin' : 'Login'}
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-full bg-slate-50/80 p-1 ring-1 ring-slate-200/70">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/projects"
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                  }
                >
                  Projects
                </NavLink>
                <NavLink
                  to="/admin/clients"
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                  }
                >
                  Clients
                </NavLink>
                <NavLink
                  to="/admin/contacts"
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                  }
                >
                  Contacts
                </NavLink>
                <NavLink
                  to="/admin/subscribers"
                  className={({ isActive }) =>
                    `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
                  }
                >
                  Subscribers
                </NavLink>
              </div>
            )}
          </nav>

          <div className="hidden md:block">
            {isAdminRoute ? (
              <div className="flex items-center gap-2">
                <button type="button" onClick={logout} className="secondary-button">
                  Logout
                </button>
                <NavLink to="/" className="secondary-button">
                  View site
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="#contact"
                  className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  Book a consultation
                </a>
                {!isAuthenticated ? (
                  <NavLink to="/login" className="secondary-button">
                    Login
                  </NavLink>
                ) : (
                  <button type="button" onClick={logout} className="secondary-button">
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <NavLink
              to={isAdminRoute ? '/' : isAuthenticated ? '/admin' : '/login'}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              {isAdminRoute ? 'Site' : isAuthenticated ? 'Admin' : 'Login'}
            </NavLink>
          </div>
        </div>

        {!isAdminRoute && !isAuthRoute ? (
          <div className="-mx-4 border-t border-slate-100 bg-white/70 px-4 py-2 backdrop-blur md:hidden">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <a
                className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/70 transition hover:bg-white"
                href="#projects"
              >
                Projects
              </a>
              <a
                className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/70 transition hover:bg-white"
                href="#clients"
              >
                Clients
              </a>
              <a
                className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/70 transition hover:bg-white"
                href="#contact"
              >
                Contact
              </a>
              <a
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                href="#contact"
              >
                Book a call
              </a>
              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Login
                </NavLink>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Navbar
