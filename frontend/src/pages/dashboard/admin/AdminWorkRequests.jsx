import React, { useMemo, useState, useEffect } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import Modal from '../../../components/common/Modal'
import { fetchAllRequests, patchRequestStatus } from '../../../api/admin'

export default function AdminWorkRequests() {
  const colors = palette.colors
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Charger et filtrer les requêtes actives
  const loadActiveRequests = async () => {
    try {
      setLoading(true)
      const data = await fetchAllRequests()
      if (data.success) {
        // Filtrer pour ne garder que les états actifs : en_attente ou en_cours
        const activeMissions = data.requests.filter(req => 
          req.etat === 'en_attente' || req.etat === 'en_cours'
        )

        // Adaptation au format de l'UI
        const adapted = activeMissions.map((req) => ({
          id: req.id,
          title: req.technicien 
            ? `${req.technicien.prenom} ${req.technicien.nom}` 
            : `Technicien à assigner`,
          meta: `${req.description || 'Sans description'} • N° #${req.id}`,
          status: req.etat === 'en_attente' ? 'En attente' : 'Validée',
          rawEtat: req.etat,
          details: [
            `Client: ${req.client?.prenom || ''} ${req.client?.nom || 'Inconnu'}`,
            `Téléphone client: ${req.client?.telephone || 'Non renseigné'}`,
            `Service demandé: ${req.service?.titre || 'Intervention'}`,
            `Date de création: ${req.date_demande ? new Date(req.date_demande).toLocaleDateString('fr-FR') : 'Non définie'}`
          ]
        }))
        setRequests(adapted)
      }
    } catch (err) {
      setError('Impossible de charger les demandes de travail actives.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadActiveRequests()
  }, [])

  const getStatusStyle = (status) => {
    if (status === 'Acceptée' || status === 'Validée' || status === 'en_cours') {
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

  // Mettre à jour l'état directement dans Supabase
  const updateStatus = async (id, uiStatus) => {
    try {
      // Conversion vers les énumérations réelles de ta colonne 'etat'
      const backendEtat = uiStatus === 'Validée' ? 'en_cours' : 'annule'
      
      const response = await patchRequestStatus(id, backendEtat)
      if (response.success) {
        // Optionnel : Retirer la demande de la liste si elle change radicalement de flux
        if (backendEtat === 'annule') {
          setRequests(prev => prev.filter(r => r.id !== id))
          if (selectedRequest && selectedRequest.id === id) setSelectedRequest(null)
        } else {
          // Sinon, rafraîchir ou mettre à jour localement l'état
          setRequests(prev => prev.map(r => r.id === id ? { ...r, status: uiStatus } : r))
          setSelectedRequest(curr => curr && curr.id === id ? { ...curr, status: uiStatus } : curr)
        }
      }
    } catch (err) {
      alert("Erreur lors de la mise à jour de l'intervention.")
    }
  }

  return (
    <DashboardLayout>
      {/* En-tête de navigation */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Demandes de travail</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Liste des demandes d’intervention envoyées aux techniciens et prestataires.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au tableau
          </Link>
          <Link to="/dashboard/admin/passed-requests" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes passées
          </Link>
          <Link to="/dashboard/admin/profiles" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Profils
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <div className="text-lg font-black" style={{ color: colors.text.primary }}>Contrôle des interventions</div>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          L’admin peut valider, planifier ou suivre le déroulement des missions actives reçues sur le réseau.
        </p>
      </div>

      {loading ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${colors.primary.main} transparent transparent transparent` }}></div>
          <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>Récupération des missions actives...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border p-4 text-sm" style={{ borderColor: colors.status.errorLight, backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
          {error}
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.length === 0 ? (
            <p className="text-center text-sm py-6" style={{ color: colors.text.secondary }}>Aucune intervention en cours ou en attente.</p>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold" style={{ color: colors.text.primary }}>{request.title}</div>
                    <div className="mt-1 text-sm" style={{ color: colors.text.secondary }}>{request.meta}</div>
                    <div className="mt-2 text-sm font-semibold" style={{ color: colors.primary.main }}>Statut actuel: {request.status}</div>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" style={getStatusStyle(request.rawEtat)}>
                    {request.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setSelectedRequest(request)} className="rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
                    Afficher les données
                  </button>
                  {request.rawEtat === 'en_attente' && (
                    <button type="button" onClick={() => updateStatus(request.id, 'Validée')} className="rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90" style={{ backgroundColor: colors.status.successLight, color: colors.text.primary }}>
                      Valider la mission
                    </button>
                  )}
                  <button type="button" onClick={() => updateStatus(request.id, 'Refusée')} className="rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                    Annuler / Refuser
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL DETAIL */}
      <Modal open={Boolean(selectedRequest)} onClose={() => setSelectedRequest(null)}>
        {selectedRequest && (
          <div>
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{selectedRequest.title}</h3>
            <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>{selectedRequest.meta}</p>
            <div className="mt-4 rounded-2xl border p-4" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <div className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: colors.text.muted }}>Détails de l'intervention</div>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: colors.text.secondary }}>
                {selectedRequestDetails.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}