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
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Choisir votre parcours technicien</h2>
        <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
          Cette page propose deux parcours: demander à rejoindre l'équipe comme technicien métier, ou rejoindre l'équipe comme technicien animalier.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>Technicien métier</p>
          <h3 className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>Demande pour rejoindre l'équipe</h3>
          <p className="mt-3 text-sm leading-7" style={{ color: colors.text.secondary }}>
            Déposez une demande auprès de l'admin pour rejoindre l'équipe comme mécanicien, plombier, électricien ou autre technicien de service.
          </p>
          <Link to="/request-work?type=metier" className="mt-5 inline-flex rounded-xl px-4 py-3 font-semibold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>
            Faire une demande métier
          </Link>
        </div>

        <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.secondary.main }}>Technicien animalier</p>
          <h3 className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>Rejoindre l'équipe animale</h3>
          <p className="mt-3 text-sm leading-7" style={{ color: colors.text.secondary }}>
            Déposez une demande auprès de l'admin pour rejoindre l'équipe animale (promenade, garde, soins).
          </p>
          <Link to="/request-work?type=animal" className="mt-5 inline-flex rounded-xl px-4 py-3 font-semibold" style={{ backgroundColor: colors.secondary.main, color: colors.text.white }}>
            Faire une demande animale
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
