import React from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'

const sections = [
  { title: 'Demandes passées', value: '24', detail: 'historique des demandes client déjà traitées', to: '/dashboard/admin/passed-requests' },
  { title: 'Demandes de travail', value: '12', detail: 'interventions et missions envoyées aux techniciens', to: '/dashboard/admin/work-requests' },
  { title: "Demandes d'inscription", value: '3', detail: "entreprises demandant à rejoindre la plateforme", to: '/dashboard/admin/join-requests' },
  { title: 'Profils supervisés', value: '18', detail: 'clients, techniciens et compte admin suivis', to: '/dashboard/admin/profiles' },
  { title: 'Vue globale', value: '6', detail: 'vérification et pilotage de la plateforme', to: '/dashboard/admin/profiles' },
]

const quickActions = [
  { label: 'Gérer les demandes passées', to: '/dashboard/admin/passed-requests' },
  { label: 'Gérer les demandes de travail', to: '/dashboard/admin/work-requests' },
  { label: "Gérer les demandes d'inscription", to: '/dashboard/admin/join-requests' },
  { label: 'Contrôler les profils', to: '/dashboard/admin/profiles' },
]

export default function AdminDashboard(){
  const colors = palette.colors
  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Superviser les clients et les techniciens</h2>
        <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
          L'admin valide les comptes, contrôle les demandes de promenade, de garde et de service, puis garde une vue d'ensemble sur les deux parcours de l'application.
        </p>
      </div>

      <div className="mb-8 rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h3 className="text-xl font-black" style={{ color: colors.text.primary }}>Actions rapides</h3>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          Accès direct aux zones que l’admin doit surveiller et piloter au quotidien.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <Link key={section.title} to={section.to} className="rounded-[2rem] border p-6 shadow-sm2 transition-transform hover:-translate-y-1" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.text.muted }}>{section.title}</p>
            <div className="mt-3 text-4xl font-black" style={{ color: colors.primary.main }}>{section.value}</div>
            <p className="mt-3 text-sm leading-6" style={{ color: colors.text.secondary }}>{section.detail}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h3 className="text-xl font-black" style={{ color: colors.text.primary }}>Navigation admin</h3>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          Chaque section du tableau ouvre maintenant sa propre page via la sidebar.
        </p>
      </div>
    </DashboardLayout>
  )
}