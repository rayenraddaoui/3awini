import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Link } from 'react-router-dom'
import palette from '../../theme/palette'

export default function DashboardTechnician(){
  const colors = palette.colors
  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.secondary.main }}>Espace technicien</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Choisir le type de demande</h2>
        <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
          Le technicien peut soit travailler sur une demande liée aux animaux, soit remplir une demande de métier comme plombier, électricien ou autre service.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>Animaux</p>
          <h3 className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>Travail avec les animaux</h3>
          <p className="mt-3 text-sm leading-7" style={{ color: colors.text.secondary }}>
            Prendre une demande liée aux promenades, garde ou soins des animaux.
          </p>
          <Link to="/animals" className="mt-5 inline-flex rounded-xl px-4 py-3 font-semibold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>
            Aller vers les animaux
          </Link>
        </div>

        <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.secondary.main }}>Métier</p>
          <h3 className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>Travail de métier</h3>
          <p className="mt-3 text-sm leading-7" style={{ color: colors.text.secondary }}>
            Remplir une demande pour un métier comme plombier, électricien, réparation maison ou climatisation.
          </p>
          <Link to="/request-work" className="mt-5 inline-flex rounded-xl px-4 py-3 font-semibold" style={{ backgroundColor: colors.secondary.main, color: colors.text.white }}>
            Remplir une demande métier
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
