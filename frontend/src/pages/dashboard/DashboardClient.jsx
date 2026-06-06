import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import palette from '../../theme/palette'

export default function DashboardClient(){
  const colors = palette.colors
  const [expandedId, setExpandedId] = useState(null)
  const recentRequests = [
    {
      id: 1,
      title: 'Promenade chien',
      status: 'En attente',
      date: '04/06/2026',
      details: ['Lieu: Ariana', 'Durée: 45 min', 'Commentaire: chien calme'],
    },
    {
      id: 2,
      title: 'Garde week-end',
      status: 'Acceptée',
      date: '01/06/2026',
      details: ['Lieu: Sousse', 'Durée: 2 jours', 'Commentaire: besoin jardin'],
    },
    {
      id: 3,
      title: 'Service ménager',
      status: 'Refusée',
      date: '30/05/2026',
      details: ['Lieu: Tunis', 'Durée: 3h', 'Commentaire: appartement'],
    },
  ]

  const statusStyles = {
    'En attente': { backgroundColor: colors.status.warningLight, color: colors.text.primary },
    'Acceptée': { backgroundColor: colors.status.successLight, color: colors.text.primary },
    'Refusée': { backgroundColor: colors.status.errorLight, color: colors.text.primary },
  }

  const getStatusStyle = (status) => statusStyles[status] || statusStyles['En attente']
  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.primary.main }}>Espace client</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Vos demandes</h2>
        <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
          Suivez vos demandes en cours et lancez rapidement une nouvelle demande.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border p-4" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
              <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: colors.text.muted }}>En cours</div>
              <div className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>2</div>
            </div>
            <div className="rounded-[1.5rem] border p-4" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
              <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: colors.text.muted }}>Traitées</div>
              <div className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>5</div>
            </div>
          </div>

          <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>Actions rapides</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link to="/animals" className="rounded-2xl border px-4 py-3 text-sm font-semibold transition hover:opacity-90" style={{ borderColor: colors.borders.border, backgroundColor: colors.background, color: colors.text.primary }}>
                Demande animale
              </Link>
              <Link to="/services" className="rounded-2xl border px-4 py-3 text-sm font-semibold transition hover:opacity-90" style={{ borderColor: colors.borders.border, backgroundColor: colors.background, color: colors.text.primary }}>
                Demande service
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>Demandes et statut</p>
          <div className="mt-4 space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="rounded-2xl border px-4 py-3" style={{ borderColor: colors.borders.border, backgroundColor: colors.background }}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-base font-bold" style={{ color: colors.text.primary }}>{request.title}</div>
                    <div className="text-xs" style={{ color: colors.text.secondary }}>{request.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]" style={getStatusStyle(request.status)}>
                      {request.status}
                    </span>
                    <button
                      type="button"
                      className="text-xs font-bold uppercase tracking-[0.16em]"
                      style={{ color: colors.primary.main }}
                      onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                    >
                      {expandedId === request.id ? 'Masquer' : 'Détails'}
                    </button>
                  </div>
                </div>
                {expandedId === request.id && (
                  <div className="mt-3 rounded-xl border px-3 py-2 text-xs" style={{ borderColor: colors.borders.border, color: colors.text.secondary, backgroundColor: colors.surface }}>
                    <ul className="space-y-1">
                      {request.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
