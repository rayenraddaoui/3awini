import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../forms/SearchBar'
import { useAuth } from '../../hooks/useAuth.jsx'
import palette from '../../theme/palette'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const colors = palette.colors
  const role = user?.role || 'guest'

  const navItemsByRole = {
    guest: [
      { to: '/', label: 'Accueil' },
      { to: '/animals', label: 'Animaux' },
      { to: '/services', label: 'Services' },
      { to: '/about', label: 'À propos' },
      { to: '/contact', label: 'Contact' },
    ],
    client: [
      { to: '/', label: 'Accueil' },
      { to: '/animals', label: 'Animaux' },
      { to: '/services', label: 'Services' },
      { to: '/dashboard/client', label: 'Dashboard' },
    ],
    technician: [
      { to: '/', label: 'Accueil' },
      { to: '/dashboard/technician', label: 'Dashboard' },
      { to: '/request-work?type=metier', label: 'Demande métier' },
      { to: '/request-work?type=animal', label: 'Demande animalier' },
    ],
    admin: [
      { to: '/dashboard/admin', label: 'Admin' },
      { to: '/dashboard/admin/join-requests', label: 'Inscriptions' },
      { to: '/dashboard/admin/work-requests', label: 'Demandes' },
      { to: '/dashboard/admin/profiles', label: 'Profils' },
    ],
  }

  const navItems = navItemsByRole[role] || navItemsByRole.guest
  const showSearch = role === 'guest' || role === 'client'

  const closeMenu = () => setOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  // Utilisation de user?.prenom et user?.nom pour correspondre à Supabase
  const profileDisplayName = user ? `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Mon profil' : 'Profil'

  const profileLink = (
    <Link
      to="/profile"
      className="rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90"
      style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}
      onClick={closeMenu}
    >
      {profileDisplayName}
    </Link>
  )

  const authButton = user ? (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-md transition-all hover:opacity-90"
      style={{ backgroundColor: colors.text.primary, color: colors.text.white }}
    >
      Se déconnecter
    </button>
  ) : (
    <Link
      to="/login"
      className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-md transition-all hover:opacity-95"
      style={{ backgroundColor: colors.primary.main, color: colors.text.white, boxShadow: '0 6px 18px rgba(37,99,235,0.20)' }}
      onClick={closeMenu}
    >
      Se connecter
    </Link>
  )

  return (
    <nav className="sticky top-0 z-30 shadow-sm backdrop-blur-xl border-b" style={{ borderBottomColor: colors.borders.border, backgroundColor: 'rgba(255,255,255,0.90)' }}>
      <div className="container-max flex items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter" style={{ color: colors.primary.main }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg text-white" style={{ backgroundColor: colors.primary.main, boxShadow: '0 10px 20px rgba(37,99,235,0.20)' }}>3</span>
          <span>awini</span>
        </Link>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-xl p-2.5 border shadow-sm transition-all"
            style={{ borderColor: colors.borders.border, backgroundColor: colors.surface }}
          >
            <div className="space-y-1.5 flex flex-col justify-center items-center h-5 w-6">
              <span className={`block h-0.5 w-6 rounded transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} style={{ backgroundColor: colors.primary.main }}></span>
              <span className={`block h-0.5 w-6 rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} style={{ backgroundColor: colors.primary.main }}></span>
              <span className={`block h-0.5 w-6 rounded transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} style={{ backgroundColor: colors.primary.main }}></span>
            </div>
          </button>
        </div>

        <div className="hidden w-full items-center justify-end gap-6 md:flex">
          {showSearch && (
            <div className="mr-2 w-64"><SearchBar /></div>
          )}
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="font-semibold transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>
              {item.label}
            </Link>
          ))}
          {user && profileLink}
          {authButton}
        </div>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden animate-in slide-in-from-top border-t backdrop-blur duration-300" style={{ borderTopColor: colors.borders.border, backgroundColor: 'rgba(255,255,255,0.95)' }}>
          <div className="flex flex-col gap-4 px-4 py-6">
            {showSearch && (
              <div className="mb-2 w-full"><SearchBar /></div>
            )}
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={closeMenu} className="py-2 font-bold transition-colors hover:opacity-80" style={{ color: colors.text.primary }}>
                {item.label}
              </Link>
            ))}
            <div className="border-t pt-4" style={{ borderTopColor: colors.borders.border }}>
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link to="/profile" onClick={closeMenu} className="flex w-full items-center justify-center rounded-xl py-4 font-bold shadow-lg transition" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
                    {profileDisplayName}
                  </Link>
                  <button type="button" onClick={handleLogout} className="flex w-full items-center justify-center rounded-xl py-4 font-bold shadow-lg transition text-white" style={{ backgroundColor: colors.text.primary }}>
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={closeMenu} className="flex w-full items-center justify-center rounded-xl py-4 font-bold shadow-lg transition text-white" style={{ backgroundColor: colors.primary.main, boxShadow: '0 6px 18px rgba(37,99,235,0.20)' }}>
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}