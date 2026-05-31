import React, { useMemo, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import Modal from '../../../components/common/Modal'

const workRequests = [
  { id: 1, title: 'Plombier Sami', meta: 'Fuite cuisine • Tunis • En attente', details: ['Client: Sara', 'Téléphone: 26 111 222', 'Service: Dépannage plomberie', 'Date: 24 mai 2026'], status: 'En attente' },
  { id: 2, title: 'Électricien Amine', meta: 'Panne totale • Ariana • Validée', details: ['Client: Yassine', 'Téléphone: 24 333 444', 'Service: Réparation électrique', 'Date: 25 mai 2026'], status: 'Validée' },
  { id: 3, title: 'Technicien clim Nader', meta: 'Maintenance • Sousse • En attente', details: ['Client: Ines', 'Téléphone: 21 555 666', 'Service: Maintenance climatisation', 'Date: 26 mai 2026'], status: 'En attente' },
]

export default function AdminWorkRequests() {
  const colors = palette.colors
  const [requests, setRequests] = useState(workRequests)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const getStatusStyle = (status) => {
    if (status === 'Acceptée' || status === 'Validée') {
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
    const newRequests = requests.map((request) => (request.title === title ? { ...request, status } : request))
    setRequests(newRequests)
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
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Demandes de travail</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Liste des demandes d’intervention envoyées aux techniciens et prestataires.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au tableau
          </Link>
          <Link to="/dashboard/admin/passed-requests" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes passées
          </Link>
          <Link to="/dashboard/admin/profiles" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Profils
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <div className="text-lg font-black" style={{ color: colors.text.primary }}>Contrôle des interventions</div>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          L’admin peut passer d’une vue à l’autre pour valider ou suivre les missions rapidement.
        </p>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
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
