import React from 'react'
import { Link } from 'react-router-dom'
import palette from '../../theme/palette'
export default function Footer(){
  const colors = palette.colors
  return (
    <footer className="mt-20 border-t" style={{ borderTopColor: colors.borders.border, backgroundColor: colors.surface }}>
      <div className="container-max grid gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-2xl font-black tracking-tighter" style={{ color: colors.primary.main }}>
            3awini
          </Link>
          <p className="max-w-sm text-sm leading-6" style={{ color: colors.text.muted }}>
            Une plateforme pensée pour les demandes de promenade, de garde et la mise en relation avec des techniciens         
             </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold" style={{ color: colors.text.secondary }}>
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: colors.primary.light }}>Client</span>
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: colors.secondary.light }}>Pet-sitter</span>
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: colors.status.infoLight }}>Technicien</span>
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: colors.status.warningLight }}>Admin</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.text.primary }}>Parcours</h4>
          <Link to="/animals" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Promenades et garde</Link>
          <Link to="/services" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Techniciens à contacter</Link>
          <Link to="/dashboard/admin" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Espace admin</Link>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <h4 className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.text.primary }}>Légal</h4>
          <Link to="/about" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>À propos</Link>
          <Link to="/contact" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Contact</Link>
          <Link to="/legal" className="text-sm transition-colors hover:opacity-80" style={{ color: colors.text.secondary }}>Mentions légales</Link>
          <p className="pt-4 text-xs" style={{ color: colors.text.muted }}>© 2026 3awini</p>
        </div>
      </div>
    </footer>
  )
}
