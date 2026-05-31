import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'


export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles?.length && !roles.includes(user.role)) {
    if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />
    }

    if (user.role === 'client') {
      return <Navigate to="/dashboard/client" replace />
    }

    if (user.role === 'technician') {
      return <Navigate to="/dashboard/technician" replace />
    }

    return <Navigate to="/login" replace />
  }

  return children
}