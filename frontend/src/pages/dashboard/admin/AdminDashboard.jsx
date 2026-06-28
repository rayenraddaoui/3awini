import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import { fetchAdminDashboardStats } from '../../../api/admin'

const quickActions = [
  { label: 'Gérer les demandes passées', to: '/dashboard/admin/passed-requests' },
  { label: 'Gérer les demandes de travail', to: '/dashboard/admin/work-requests' },
  { label: "Gérer les demandes d'inscription", to: '/dashboard/admin/join-requests' },
  { label: 'Contrôler les profils', to: '/dashboard/admin/profiles' },
]

export default function AdminDashboard(){
  const colors = palette.colors
  
  // États pour gérer les données, le chargement et les erreurs
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchAdminDashboardStats()
        if (data.success) {
          setStats(data.stats)
        }
      } catch (err) {
        setError("Erreur réseau lors de la récupération des statistiques.")
      } finally {
        setLoading(false)
      }
    }
    getStats()
  }, [])

  // Tableau dynamique reconstruit à partir de l'état "stats" du Backend
  const sections = stats ? [
    { title: 'Demandes passées', value: stats.passedRequestsCount, detail: 'Historique des demandes client déjà traitées.', to: '/dashboard/admin/passed-requests' },
    { title: 'Demandes de travail', value: stats.workRequestsCount, detail: 'Interventions et missions envoyées aux techniciens.', to: '/dashboard/admin/work-requests' },
    { title: "Demandes d'inscription", value: stats.joinRequestsCount, detail: 'Entreprises/profils demandant à rejoindre la plateforme.', to: '/dashboard/admin/join-requests' },
    { title: 'Profils supervisés', value: stats.profilesCount, detail: 'Clients, techniciens et comptes admins suivis.', to: '/dashboard/admin/profiles' },
    { title: 'Vue globale', value: stats.globalViewCount, detail: 'Vérification, statistiques et pilotage de la plateforme.', to: '/dashboard/admin/analytics' },
  ] : []

  return (
    <DashboardLayout>
      {/* En-tête */}
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Superviser les clients et les techniciens</h2>
        <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
          L'admin valide les comptes, contrôle les demandes de services, puis garde une vue d'ensemble sur l'application.
        </p>
      </div>

      {/* Mode Chargement */}
      {loading ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${colors.primary.main} transparent transparent transparent` }}></div>
          <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>Calcul des statistiques en cours...</p>
        </div>
      ) : error ? (
        /* Affichage de l'erreur */
        <div className="rounded-xl border p-4 text-sm mb-6" style={{ borderColor: colors.status.errorLight, color: '#721c24', backgroundColor: colors.status.errorLight }}>
          {error}
        </div>
      ) : (
        <>
          {/* Bloc Actions Rapides */}
          <div className="mb-8 rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <h3 className="text-xl font-black" style={{ color: colors.text.primary }}>Actions rapides</h3>
            <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
              Accès direct aux zones que l’admin doit surveiller et piloter au quotidien.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="inline-flex items-center justify-center text-center rounded-2xl px-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 shadow-sm"
                  style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Grille des Cartes Statistiques Connectées */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Link 
                key={section.title} 
                to={section.to} 
                className="rounded-[2rem] border p-6 shadow-sm2 transition-all hover:-translate-y-1 hover:shadow-md" 
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}
              >
                <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: colors.text.muted }}>{section.title}</p>
                <div className="mt-3 text-4xl font-black" style={{ color: colors.primary.main }}>{section.value}</div>
                <p className="mt-3 text-sm leading-6" style={{ color: colors.text.secondary }}>{section.detail}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  )
}