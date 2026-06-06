import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Animals from '../pages/animals/Animals'
import AnimalDetails from '../pages/animals/AnimalDetails'
import Services from '../pages/services/Services'
import DashboardClient from '../pages/dashboard/DashboardClient'
import DashboardTechnician from '../pages/dashboard/DashboardTechnician'
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard'
import AdminPassedRequests from '../pages/dashboard/admin/AdminPassedRequests'
import AdminWorkRequests from '../pages/dashboard/admin/AdminWorkRequests'
import AdminProfiles from '../pages/dashboard/admin/AdminProfiles'
import AdminJoinRequests from '../pages/dashboard/admin/AdminJoinRequests'
import Profile from '../pages/profile/Profile'
import ProfileEdit from '../pages/profile/ProfileEdit'
import NotFound from '../pages/NotFound'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Legal from '../pages/Legal'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../hooks/useAuth.jsx'
import RequestWork from '../pages/requests/RequestWork'

export default function AppRoutes(){
  const { user } = useAuth()

  const resolveDashboardRoute = () => {
    if (!user) {
      return <Navigate to="/login" replace />
    }

    if (user.role === 'admin') return <Navigate to="/dashboard/admin" replace />
    if (user.role === 'client') return <Navigate to="/dashboard/client" replace />
    if (user.role === 'technician') return <Navigate to="/dashboard/technician" replace />

    return <Navigate to="/login" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/animals"
        element={
          <ProtectedRoute>
            <Animals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/animals/:id"
        element={
          <ProtectedRoute>
            <AnimalDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard" element={resolveDashboardRoute()} />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/passed-requests"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPassedRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/work-requests"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminWorkRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/profiles"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminProfiles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/join-requests"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminJoinRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute roles={["client"]}>
            <DashboardClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/technician"
        element={
          <ProtectedRoute roles={["technician"]}>
            <DashboardTechnician />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-work"
        element={
          <ProtectedRoute>
            <RequestWork />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/legal"
        element={
          <ProtectedRoute>
            <Legal />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
