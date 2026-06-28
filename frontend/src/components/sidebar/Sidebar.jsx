import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import palette from '../../theme/palette'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function Sidebar() {
  const colors = palette.colors
  const { user } = useAuth()
  const location = useLocation() // Permet de détecter la page active

  if (user?.role !== 'admin') {
    return null
  }

  const navSections = [
    {
      title: 'Admin',
      items: [
        { to: '/dashboard/admin', label: 'Tableau de bord' },
        { to: '/dashboard/admin/join-requests', label: 'Inscriptions en attente' },
        { to: '/dashboard/admin/work-requests', label: 'Demandes de travail' },
        { to: '/dashboard/admin/passed-requests', label: 'Demandes passées' },
        { to: '/dashboard/admin/profiles', label: 'Profils supervisés' },
      ],
    },
  ]

  const linkBaseClass = 'rounded-2xl px-4 py-3 font-semibold transition-all duration-200 shadow-sm'

  return (
    <aside className="hidden h-screen sticky top-0 w-72 border-r lg:block" style={{ backgroundColor: colors.surface, borderRightColor: colors.borders.border }}>
      <div className="border-b p-6" style={{ borderBottomColor: colors.borders.border }}>
        <div className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: colors.text.muted }}>Dashboard</div>
        <div className="mt-2 text-2xl font-black" style={{ color: colors.primary.main }}>3awini</div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>
          Administrateur
        </div>
      </div>
      
      <nav className="flex flex-col gap-6 p-4">
        {navSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <div className="px-4 text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>
              {section.title}
            </div>
            <div className="flex flex-col gap-1.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.to

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={linkBaseClass}
                    style={{ 
                      color: isActive ? colors.primary.main : colors.text.secondary, 
                      backgroundColor: isActive ? colors.primary.light : 'transparent',
                      fontWeight: isActive ? '700' : '600'
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}