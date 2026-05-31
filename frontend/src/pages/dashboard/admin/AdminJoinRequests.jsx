import React, { useMemo, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import Modal from '../../../components/common/Modal'
// Local join requests (moved from src/api/mockData.js)
const mockJoinRequests = [
  { id: 1, company: 'Entreprise Azur', applicant: 'Khaled', email: 'khaled@azur.tn', phone: '22 333 444', meta: 'Demande: Employer • Tunis', details: ['Motif: Recrutement personnel', 'Taille: 12 employés'], status: 'En attente' },
  { id: 2, company: 'SARL Olive', applicant: 'Meriem', email: 'meriem@olive.tn', phone: '24 555 666', meta: 'Demande: Employer • Sfax', details: ['Motif: Service ponctuel', 'Taille: 4 employés'], status: 'En attente' },
]

export default function AdminJoinRequests() {
  const colors = palette.colors
  const [requests, setRequests] = useState(mockJoinRequests)
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
      `Entreprise: ${selectedRequest.company}`,
      `Demandeur: ${selectedRequest.applicant}`,
      ...selectedRequest.details,
    ]
  }, [selectedRequest])

  const updateStatus = (id, status) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) => (request.id === id ? { ...request, status } : request)),
    )
    setSelectedRequest((currentRequest) => (currentRequest && currentRequest.id === id ? { ...currentRequest, status } : currentRequest))
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Demandes d'inscription (Employeurs)</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Liste des entreprises qui demandent à rejoindre la plateforme pour publier des offres d'emploi ou employer du personnel.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au tableau
          </Link>
          <Link to="/dashboard/admin/profiles" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Profils
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <div key={request.id} className="rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold" style={{ color: colors.text.primary }}>{request.company}</div>
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
              <button type="button" onClick={() => updateStatus(request.id, 'Acceptée')} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.status.successLight, color: colors.text.primary }}>
                Accepter
              </button>
              <button type="button" onClick={() => updateStatus(request.id, 'Refusée')} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                Refuser
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={Boolean(selectedRequest)} onClose={() => setSelectedRequest(null)}>
        {selectedRequest && (
          <div>
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{selectedRequest.company}</h3>
            <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>{selectedRequest.meta}</p>
            <div className="mt-4 rounded-2xl border p-4" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <div className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: colors.text.muted }}>Données</div>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: colors.text.secondary }}>
                {selectedRequestDetails.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => updateStatus(selectedRequest.id, 'Acceptée')} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.status.successLight, color: colors.text.primary }}>
                  Accepter
                </button>
                <button type="button" onClick={() => updateStatus(selectedRequest.id, 'Refusée')} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                  Refuser
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
