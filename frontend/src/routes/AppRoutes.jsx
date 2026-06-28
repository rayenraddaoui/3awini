import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Animals from '../pages/animals/Animals';
import AnimalDetails from '../pages/animals/AnimalDetails';
import Services from '../pages/services/Services';

import DashboardClient from '../pages/dashboard/DashboardClient';
import MyRequests from '../pages/requests/my-requests'; // ◄◄ NOUVEL IMPORT
import DashboardTechnician from '../pages/dashboard/DashboardTechnician';

import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import AdminPassedRequests from '../pages/dashboard/admin/AdminPassedRequests';
import AdminWorkRequests from '../pages/dashboard/admin/AdminWorkRequests';
import AdminProfiles from '../pages/dashboard/admin/AdminProfiles';
import AdminJoinRequests from '../pages/dashboard/admin/AdminJoinRequests';

import Profile from '../pages/profile/Profile';
import ProfileEdit from '../pages/profile/ProfileEdit';

import RequestWork from '../pages/requests/RequestWork';

import About from '../pages/About';
import Contact from '../pages/Contact';
import Legal from '../pages/Legal';
import NotFound from '../pages/NotFound';

import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

export default function AppRoutes() {
  const { user } = useAuth();

  const resolveDashboardRoute = () => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    switch (user.role) {
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;

      case 'client':
        return <Navigate to="/dashboard/client" replace />;

      case 'technicien':
        return <Navigate to="/dashboard/technicien" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard automatique */}
      <Route path="/dashboard" element={resolveDashboardRoute()} />

      {/* Animaux */}
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

      {/* Services */}
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Admin */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin/passed-requests"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminPassedRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin/work-requests"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminWorkRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin/profiles"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminProfiles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin/join-requests"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminJoinRequests />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Client */}
      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute roles={['client']}>
            <DashboardClient />
          </ProtectedRoute>
        }
      />

      {/* ◄◄ NOUVELLE ROUTE : Historique des demandes du client */}
      <Route
        path="/dashboard/client/my-requests"
        element={
          <ProtectedRoute roles={['client']}>
            <MyRequests />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Technicien */}
      <Route
        path="/dashboard/technicien"
        element={
          <ProtectedRoute roles={['technicien']}>
            <DashboardTechnician />
          </ProtectedRoute>
        }
      />

      {/* Profil */}
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

      {/* Demande de travail */}
      <Route
        path="/request-work"
        element={
          <ProtectedRoute>
            <RequestWork />
          </ProtectedRoute>
        }
      />

      {/* Pages */}
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

      {/* 404 */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}