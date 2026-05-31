import React from 'react'
import { Link } from 'react-router-dom'
import palette from '../../theme/palette'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function Sidebar(){
  const colors = palette.colors
  const { user } = useAuth()
  if (user?.role !== 'admin') {
    return null
  }

  const navSections = [
    {
      title: 'Admin',
      items: [
        { to: '/dashboard/admin', label: 'Tableau admin' },
        { to: '/dashboard/admin/passed-requests', label: 'Demandes passées' },
        { to: '/dashboard/admin/work-requests', label: 'Demandes de travail' },
        { to: '/dashboard/admin/profiles', label: 'Profils supervisés' },
      ],
    },
  ]

  const linkBaseClass = 'rounded-2xl px-4 py-3 font-semibold transition-colors hover:opacity-90'

  return (
    <aside className="hidden w-72 shadow-[12px_0_40px_rgba(2,6,23,0.05)] lg:block" style={{ backgroundColor: colors.surface, borderRightColor: colors.borders.border }}>
      <div className="border-b p-6" style={{ borderBottomColor: colors.borders.border }}>
        <div className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: colors.text.muted }}>Dashboard</div>
        <div className="mt-2 text-2xl font-black" style={{ color: colors.primary.main }}>3awini</div>
        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>
          admin
        </div>
      </div>
      <nav className="flex flex-col gap-6 p-4">
        {navSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <div className="px-4 text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>
              {section.title}
            </div>
            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={linkBaseClass}
                  style={{ color: colors.text.primary, backgroundColor: 'transparent' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
