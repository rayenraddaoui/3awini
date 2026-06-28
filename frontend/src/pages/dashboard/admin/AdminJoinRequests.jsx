import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import { fetchJoinRequests, putJoinStatus } from '../../../api/admin'

// Ajoute bien "export default" ici au début de ta fonction
export default function AdminJoinRequests() {
  const colors = palette.colors
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadJoinRequests = async () => {
    try {
      setLoading(true)
      const data = await fetchJoinRequests()
      if (data.success) {
        setRequests(data.requests)
      }
    } catch (err) {
      setError("Impossible de charger les demandes d'inscription.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJoinRequests()
  }, [])

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await putJoinStatus(id, status)
      if (response.success) {
        // Rafraîchir la liste ou filtrer localement l'utilisateur traité
        setRequests(prev => prev.filter(req => req.id !== id))
      }
    } catch (err) {
      alert("Erreur lors du traitement de l'inscription.")
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Demandes d'adhésion</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Validez ou refusez les demandes d'inscription des nouveaux prestataires et techniciens.
          </p>
        </div>
        <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
          Retour au tableau
        </Link>
      </div>

      {loading ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${colors.primary.main} transparent transparent transparent` }}></div>
          <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>Chargement des requêtes...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border p-4 text-sm" style={{ borderColor: colors.status.errorLight, backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
          {error}
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.length === 0 ? (
            <p className="text-sm" style={{ color: colors.text.secondary }}>Aucune demande d'inscription en attente.</p>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold" style={{ color: colors.text.primary }}>
                      {request.prenom} {request.nom}
                    </div>
                    <div className="mt-1 text-sm space-y-1" style={{ color: colors.text.secondary }}>
                      <div>Email : {request.email}</div>
                      <div>Téléphone : {request.telephone || 'Non renseigné'}</div>
                      <div className="font-semibold" style={{ color: colors.primary.main }}>Rôle demandé : {request.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => handleStatusUpdate(request.id, 'accepte')} className="rounded-xl px-4 py-2 text-sm font-semibold shadow-sm" style={{ backgroundColor: colors.status.successLight, color: colors.text.primary }}>
                      Accepter
                    </button>
                    <button type="button" onClick={() => handleStatusUpdate(request.id, 'refuse')} className="rounded-xl px-4 py-2 text-sm font-semibold shadow-sm" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                      Refuser
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </DashboardLayout>
  )
}