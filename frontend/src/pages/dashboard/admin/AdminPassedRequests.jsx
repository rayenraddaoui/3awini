import React, { useMemo, useState, useEffect } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import Modal from '../../../components/common/Modal'
import { fetchAllRequests, patchRequestStatus } from '../../../api/admin'

export default function AdminPassedRequests() {
  const colors = palette.colors
  const [items, setItems] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Charger et filtrer l'historique des requêtes closes
  const loadPassedRequests = async () => {
    try {
      setLoading(true)
      const data = await fetchAllRequests()
      if (data.success) {
        // Filtrer pour l'historique : uniquement terminé (termine) ou annulé (annule)
        const closedMissions = data.requests.filter(req => 
          req.etat === 'termine' || req.etat === 'annule'
        )

        // Adaptation au format de l'UI
        const adapted = closedMissions.map((req) => ({
          id: req.id,
          title: req.service?.titre || `Intervention #${req.id}`,
          meta: `Client: ${req.client?.prenom || ''} ${req.client?.nom || 'Inconnu'} • N° #${req.id}`,
          status: req.etat === 'termine' ? 'Terminée' : 'Refusée',
          rawEtat: req.etat,
          details: [
            `Description: ${req.description || 'Aucune description fournie.'}`,
            `Téléphone client: ${req.client?.telephone || 'Non renseigné'}`,
            `Technicien assigné: ${req.technicien ? `${req.technicien.prenom} ${req.technicien.nom}` : 'Aucun'}`,
            `Date de la demande: ${req.date_demande ? new Date(req.date_demande).toLocaleDateString('fr-FR') : 'Non définie'}`
          ]
        }))
        setItems(adapted)
      }
    } catch (err) {
      setError("Impossible de charger l'historique des demandes.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPassedRequests()
  }, [])

  const getStatusStyle = (status) => {
    if (status === 'termine' || status === 'Terminée') {
      return { backgroundColor: colors.status.successLight, color: colors.text.primary }
    }
    if (status === 'annule' || status === 'Refusée') {
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

  // Permet de modifier le statut d'un dossier archivé si nécessaire
  const updateStatus = async (id, uiStatus) => {
    try {
      const backendEtat = uiStatus === 'Acceptée' ? 'termine' : 'annule'
      const response = await patchRequestStatus(id, backendEtat)
      
      if (response.success) {
        const nextStatusLabel = backendEtat === 'termine' ? 'Terminée' : 'Refusée'
        
        setItems(prev => prev.map(item => 
          item.id === id ? { ...item, status: nextStatusLabel, rawEtat: backendEtat } : item
        ))
        
        setSelectedRequest(curr => 
          curr && curr.id === id ? { ...curr, status: nextStatusLabel, rawEtat: backendEtat } : curr
        )
      }
    } catch (err) {
      alert("Erreur lors de la modification du statut de l'archive.")
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Demandes passées</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Historique complet des demandes déjà traitées sur la plateforme.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au tableau
          </Link>
          <Link to="/dashboard/admin/work-requests" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes de travail
          </Link>
          <Link to="/dashboard/admin/profiles" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Profils
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <div className="text-lg font-black" style={{ color: colors.text.primary }}>Contrôle des dossiers</div>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          Consultez les rapports, vérifiez les interventions terminées ou gérez les réclamations des dossiers archivés.
        </p>
      </div>

      {loading ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${colors.primary.main} transparent transparent transparent` }}></div>
          <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>Chargement de l'historique...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border p-4 text-sm" style={{ borderColor: colors.status.errorLight, backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
          {error}
        </div>
      ) : (
        <div className="grid gap-4">
          {items.length === 0 ? (
            <p className="text-center text-sm py-6" style={{ color: colors.text.secondary }}>Aucun historique disponible.</p>
          ) : (
            items.map((request) => (
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
                  {request.rawEtat === 'annule' && (
                    <button type="button" onClick={() => updateStatus(request.id, 'Acceptée')} className="rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90" style={{ backgroundColor: colors.status.successLight, color: colors.text.primary }}>
                      Réactiver / Marquer terminée
                    </button>
                  )}
                  {request.rawEtat === 'termine' && (
                    <button type="button" onClick={() => updateStatus(request.id, 'Refusée')} className="rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                      Classer comme Refusée / Annulée
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL DE DETAIL ARCHIVE */}
      <Modal open={Boolean(selectedRequest)} onClose={() => setSelectedRequest(null)}>
        {selectedRequest && (
          <div>
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{selectedRequest.title}</h3>
            <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>{selectedRequest.meta}</p>
            <div className="mt-4 rounded-2xl border p-4" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <div className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: colors.text.muted }}>Historique détaillé</div>
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