import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../forms/SearchBar'
import { useAuth } from '../../hooks/useAuth.jsx'
import palette from '../../theme/palette'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const colors = palette.colors
  const isAdmin = user?.role === 'admin'

  const closeMenu = () => setOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  const profileLink = (
    <Link
      to="/profile"
      className="rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:opacity-90"
      style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}
      onClick={closeMenu}
    >
      {user?.name || 'Profil'}
    </Link>
  )

  const authButton = user ? (
    <button
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
    <nav className="sticky top-0 z-30 shadow-sm backdrop-blur-xl" style={{ borderBottomColor: colors.borders.border, backgroundColor: 'rgba(255,255,255,0.90)' }}>
      <div className="container-max flex items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter" style={{ color: colors.primary.main }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg" style={{ backgroundColor: colors.primary.main, color: colors.text.white, boxShadow: '0 10px 20px rgba(37,99,235,0.20)' }}>3</span>
          <span>awini</span>
        </Link>

        {isAdmin ? (
          <div className="flex items-center gap-3">
            {user && profileLink}
            {authButton}
          </div>
        ) : (
          <>
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label="menu"
                className="rounded-xl p-2 shadow-sm transition"
                style={{ borderColor: colors.borders.border, backgroundColor: colors.surface }}
              >
                <div className="space-y-1.5">
                  <span className={`block h-0.5 w-6 rounded transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} style={{ backgroundColor: colors.primary.main }}></span>
                  <span className={`block h-0.5 w-6 rounded transition-all ${open ? 'opacity-0' : ''}`} style={{ backgroundColor: colors.primary.main }}></span>
                  <span className={`block h-0.5 w-6 rounded transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} style={{ backgroundColor: colors.primary.main }}></span>
                </div>
              </button>
            </div>

            <div className="hidden w-full items-center justify-end gap-6 md:flex">
              <div className="mr-2 w-64"><SearchBar /></div>
              <Link to="/" className="font-semibold transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Accueil</Link>
              <Link to="/animals" className="font-semibold transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Animaux</Link>
              <Link to="/services" className="font-semibold transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Services</Link>
              <Link to="/about" className="font-semibold transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>À propos</Link>
              <Link to="/contact" className="font-semibold transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Contact</Link>
              {user && profileLink}
              {authButton}
            </div>
          </>
        )}
      </div>

      {!isAdmin && open && (
        <div className="md:hidden animate-in slide-in-from-top backdrop-blur duration-300" style={{ borderTopColor: colors.borders.border, backgroundColor: 'rgba(255,255,255,0.95)' }}>
          <div className="flex flex-col gap-4 px-4 py-6">
            <Link to="/" onClick={closeMenu} className="py-2 font-bold transition-colors hover:opacity-80" style={{ color: colors.text.primary }}>Accueil</Link>
            <Link to="/animals" onClick={closeMenu} className="py-2 font-bold transition-colors hover:opacity-80" style={{ color: colors.text.primary }}>Animaux</Link>
            <Link to="/services" onClick={closeMenu} className="py-2 font-bold transition-colors hover:opacity-80" style={{ color: colors.text.primary }}>Services</Link>
            <Link to="/about" onClick={closeMenu} className="py-2 font-bold transition-colors hover:opacity-80" style={{ color: colors.text.primary }}>À propos</Link>
            <Link to="/contact" onClick={closeMenu} className="py-2 font-bold transition-colors hover:opacity-80" style={{ color: colors.text.primary }}>Contact</Link>
            <Link to="/dashboard/admin" onClick={closeMenu} className="py-2 font-bold transition-colors hover:opacity-80" style={{ color: colors.text.primary }}>Admin</Link>
            <div className="border-t pt-4" style={{ borderTopColor: colors.borders.border }}>
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link to="/profile" onClick={closeMenu} className="flex w-full items-center justify-center rounded-xl py-4 font-bold shadow-lg transition" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
                    Mon profil
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center justify-center rounded-xl py-4 font-bold shadow-lg transition" style={{ backgroundColor: colors.text.primary, color: colors.text.white }}>
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={closeMenu} className="flex w-full items-center justify-center rounded-xl py-4 font-bold shadow-lg transition" style={{ backgroundColor: colors.primary.main, color: colors.text.white, boxShadow: '0 6px 18px rgba(37,99,235,0.20)' }}>
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
