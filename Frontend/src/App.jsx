import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'

import HeroSection from './Pages/Landing/HeroSection.jsx'
import OurProjects from './Pages/Landing/OurProjects.jsx'
import HappyClients from './Pages/Landing/HappyClients.jsx'
import ContactForm from './Pages/Landing/ContactForm.jsx'
import Newsletter from './Pages/Landing/Newsletter.jsx'

import ChatbotWidget from './components/ChatbotWidget.jsx'

import AdminDashboard from './Pages/Admin/AdminDashboard.jsx'
import AdminProjects from './Pages/Admin/AdminProjects.jsx'
import AdminClients from './Pages/Admin/AdminClients.jsx'
import AdminContacts from './Pages/Admin/AdminContacts.jsx'
import AdminSubscribers from './Pages/Admin/AdminSubscribers.jsx'

import Login from './Pages/Auth/Login.jsx'
import Signup from './Pages/Auth/Signup.jsx'

import { useAuth } from './context/AuthContext.jsx'

function RequireAuth({ children }) {
  const location = useLocation()
  const { token, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return (
      <div className="container py-12">
        <div className="rounded-2xl border border-slate-100 bg-white p-6">
          <Loader label="Checking session…" />
        </div>
      </div>
    )
  }

  if (!token) {
    const from = `${location.pathname}${location.search || ''}`
    return <Navigate to="/login" state={{ from }} replace />
  }

  return children
}


function Landing() {
  return (
    <>
      <HeroSection />
      <OurProjects />
      <HappyClients />
      <ContactForm />
      <Newsletter />
      <ChatbotWidget />
    </>
  )
}

function App() {
  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <RequireAuth>
                <AdminProjects />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/clients"
            element={
              <RequireAuth>
                <AdminClients />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <RequireAuth>
                <AdminContacts />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/subscribers"
            element={
              <RequireAuth>
                <AdminSubscribers />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
