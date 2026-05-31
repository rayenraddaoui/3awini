import React, { useMemo, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import Modal from '../../../components/common/Modal'

const passedRequests = [
  { title: 'Promenade de Milo', meta: 'Client: Sara • 24 mai • Acceptée', details: ['Type: Promenade', 'Client: Sara', 'Téléphone: 26 111 222', 'Ville: Tunis'], status: 'Acceptée' },
  { title: 'Garde de Luna', meta: 'Client: Yassine • 25 mai • En cours', details: ['Type: Garde', 'Client: Yassine', 'Téléphone: 24 333 444', 'Ville: Ariana'], status: 'En cours' },
  { title: 'Transport vétérinaire', meta: 'Client: Ines • 26 mai • Terminée', details: ['Type: Transport', 'Client: Ines', 'Téléphone: 21 555 666', 'Ville: Sousse'], status: 'Terminée' },
]

export default function AdminPassedRequests() {
  const colors = palette.colors
  const [items, setItems] = useState(passedRequests)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const getStatusStyle = (status) => {
    if (status === 'Acceptée' || status === 'Terminée') {
      return { backgroundColor: colors.status.successLight, color: colors.text.primary }
    }

    if (status === 'Refusée') {
      return { backgroundColor: colors.status.errorLight, color: colors.text.primary }
    }

    return { backgroundColor: colors.status.warningLight, color: colors.text.primary }
  }

  const selectedRequestDetails = useMemo(() => {
    if (!selectedRequest) return []
    return [
      `Statut actuel: ${selectedRequest.status}`,
      ...selectedRequest.details,
    ]
  }, [selectedRequest])

  const updateStatus = (title, status) => {
    setItems((currentItems) =>
      currentItems.map((request) =>
        request.title === title ? { ...request, status } : request,
      ),
    )
    setSelectedRequest((currentRequest) =>
      currentRequest && currentRequest.title === title
        ? { ...currentRequest, status }
        : currentRequest,
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Demandes passées</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Historique complet des demandes déjà traitées sur la plateforme.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au tableau
          </Link>
          <Link to="/dashboard/admin/work-requests" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes de travail
          </Link>
          <Link to="/dashboard/admin/profiles" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Profils
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <div className="text-lg font-black" style={{ color: colors.text.primary }}>Contrôle des dossiers</div>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          Utilisez les boutons pour aller rapidement vers les autres zones de pilotage admin.
        </p>
      </div>

      <div className="grid gap-4">
        {items.map((request) => (
          <div key={request.title} className="rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold" style={{ color: colors.text.primary }}>{request.title}</div>
                <div className="mt-1 text-sm" style={{ color: colors.text.secondary }}>{request.meta}</div>
                <div className="mt-2 text-sm font-semibold" style={{ color: colors.primary.main }}>Statut actuel: {request.status}</div>
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" style={getStatusStyle(request.status)}>
                {request.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => setSelectedRequest(request)} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
                Afficher les données
              </button>
              <button type="button" onClick={() => updateStatus(request.title, 'Acceptée')} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.status.successLight, color: colors.text.primary }}>
                Accepter
              </button>
              <button type="button" onClick={() => updateStatus(request.title, 'Refusée')} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={Boolean(selectedRequest)} onClose={() => setSelectedRequest(null)}>
        {selectedRequest && (
          <div>
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{selectedRequest.title}</h3>
            <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>{selectedRequest.meta}</p>
            <div className="mt-4 rounded-2xl border p-4" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <div className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: colors.text.muted }}>Données</div>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: colors.text.secondary }}>
                {selectedRequestDetails.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
