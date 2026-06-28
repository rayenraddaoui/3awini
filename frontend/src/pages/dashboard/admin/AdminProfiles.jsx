import React, { useMemo, useState, useEffect } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import Modal from '../../../components/common/Modal'
import { fetchAllProfiles, postProfile, putProfile, removeProfile } from '../../../api/admin'

export default function AdminProfiles() {
  const colors = palette.colors
  const [items, setItems] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [editProfile, setEditProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Charger les profils depuis Supabase via l'API
  const loadProfiles = async () => {
    try {
      setLoading(true)
      const data = await fetchAllProfiles()
      if (data.success) {
        // Adaptation des données de la base vers le format d'affichage de l'UI
        const adapted = data.profiles.map(p => ({
          id: p.id,
          title: `${p.prenom || ''} ${p.nom || ''}`.trim() || 'Utilisateur sans nom',
          meta: `Rôle : ${p.role} • Email : ${p.email}`,
          status: 'Actif', // Géré dynamiquement ou par défaut selon tes besoins backend
          raw: p // Garder une copie des données brutes pour l'édition
        }))
        setItems(adapted)
      }
    } catch (err) {
      setError('Impossible de charger les profils utilisateurs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfiles()
  }, [])

  const getStatusStyle = (status) => {
    if (status === 'Accepté' || status === 'Actif') {
      return { backgroundColor: colors.status.successLight, color: colors.text.primary }
    }
    if (status === 'Refusé') {
      return { backgroundColor: colors.status.errorLight, color: colors.text.primary }
    }
    return { backgroundColor: colors.status.infoLight, color: colors.text.primary }
  }

  const selectedProfileDetails = useMemo(() => {
    if (!selectedProfile) return []
    const p = selectedProfile.raw
    return [
      `ID système : # ${selectedProfile.id}`,
      `Rôle sur la plateforme : ${p.role}`,
      `Adresse Email : ${p.email}`,
      `Téléphone : ${p.telephone || 'Non renseigné'}`
    ]
  }, [selectedProfile])

  const openCreate = () => {
    setEditProfile({ nom: '', prenom: '', email: '', telephone: '', role: 'client' })
    setIsEditing(true)
  }

  const openEdit = (profile) => {
    setEditProfile({ ...profile.raw })
    setIsEditing(true)
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    try {
      if (editProfile.id) {
        // [PUT] Mise à jour sur l'API
        const response = await putProfile(editProfile.id, editProfile)
        if (response.success) {
          const updated = response.profile
          setItems(prev => prev.map(item => item.id === updated.id ? {
            id: updated.id,
            title: `${updated.prenom || ''} ${updated.nom || ''}`.trim(),
            meta: `Rôle : ${updated.role} • Email : ${updated.email}`,
            status: 'Actif',
            raw: updated
          } : item))
        }
      } else {
        // [POST] Création sur l'API
        const response = await postProfile(editProfile)
        if (response.success) {
          const created = response.profile
          const newItem = {
            id: created.id,
            title: `${created.prenom || ''} ${created.nom || ''}`.trim(),
            meta: `Rôle : ${created.role} • Email : ${created.email}`,
            status: 'Actif',
            raw: created
          }
          setItems(prev => [newItem, ...prev])
        }
      }
      setIsEditing(false)
      setEditProfile(null)
      setSelectedProfile(null)
    } catch (err) {
      alert("Erreur lors de l'enregistrement du profil.")
    }
  }

  const handleDeleteProfile = async (id) => {
    if (!window.confirm('Supprimer définitivement ce profil de la base de données ?')) return
    try {
      const response = await removeProfile(id)
      if (response.success) {
        setItems(prev => prev.filter(p => p.id !== id))
        if (selectedProfile && selectedProfile.id === id) setSelectedProfile(null)
      }
    } catch (err) {
      alert('Erreur lors de la suppression du profil.')
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Profils supervisés</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Tous les profils visibles pour l’admin: clients, techniciens et compte administrateur.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au tableau
          </Link>
          <Link to="/dashboard/admin/passed-requests" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes passées
          </Link>
          <Link to="/dashboard/admin/work-requests" className="rounded-xl px-4 py-2 font-semibold shadow-sm" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes de travail
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <div className="text-lg font-black" style={{ color: colors.text.primary }}>Contrôle des comptes</div>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          Modifiez les informations, attribuez de nouveaux rôles ou supprimez les comptes obsolètes de la plateforme.
        </p>
        <div className="mt-4">
          <button type="button" onClick={openCreate} className="rounded-xl px-4 py-2 font-semibold shadow-sm transition-all hover:opacity-90" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>
            Ajouter un nouveau profil
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${colors.primary.main} transparent transparent transparent` }}></div>
          <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>Chargement des profils...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border p-4 text-sm" style={{ borderColor: colors.status.errorLight, backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
          {error}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((profile) => (
            <div key={profile.id} className="rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold" style={{ color: colors.text.primary }}>{profile.title}</div>
                  <div className="mt-1 text-sm mb-2" style={{ color: colors.text.secondary }}>{profile.meta}</div>
                  <div className="text-xs font-black uppercase tracking-wider" style={{ color: colors.primary.main }}>Rôle : {profile.raw?.role}</div>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" style={getStatusStyle(profile.status)}>
                  {profile.status}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => setSelectedProfile(profile)} className="rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
                  Données
                </button>
                <button type="button" onClick={() => openEdit(profile)} className="rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm text-white" style={{ backgroundColor: colors.primary.main }}>
                  Modifier
                </button>
                <button type="button" onClick={() => handleDeleteProfile(profile.id)} className="rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL - VUE LOGISTIQUE DU COMPTE */}
      <Modal open={Boolean(selectedProfile)} onClose={() => setSelectedProfile(null)}>
        {selectedProfile && (
          <div>
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{selectedProfile.title}</h3>
            <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>{selectedProfile.meta}</p>
            <div className="mt-4 rounded-2xl border p-4" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <div className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: colors.text.muted }}>Fiche signalétique</div>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: colors.text.secondary }}>
                {selectedProfileDetails.map((item, idx) => (
                  <li key={idx} className="border-b last:border-0 pb-1" style={{ borderColor: colors.borders.border }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL - FORMULAIRE REEL CRUD */}
      <Modal open={isEditing} onClose={() => { setIsEditing(false); setEditProfile(null) }}>
        {editProfile && (
          <form onSubmit={saveProfile} className="space-y-4">
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>
              {editProfile.id ? 'Modifier le profil' : 'Ajouter un nouveau compte'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Prénom</label>
                <input required value={editProfile.prenom || ''} onChange={(e) => setEditProfile({ ...editProfile, prenom: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: colors.borders.border }} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Nom</label>
                <input required value={editProfile.nom || ''} onChange={(e) => setEditProfile({ ...editProfile, nom: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: colors.borders.border }} />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</label>
              <input required type="email" disabled={Boolean(editProfile.id)} value={editProfile.email || ''} onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2 text-sm disabled:opacity-60" style={{ borderColor: colors.borders.border }} />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Téléphone</label>
              <input value={editProfile.telephone || ''} onChange={(e) => setEditProfile({ ...editProfile, telephone: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: colors.borders.border }} />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Rôle applicatif</label>
              <select value={editProfile.role || 'client'} onChange={(e) => setEditProfile({ ...editProfile, role: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" style={{ borderColor: colors.borders.border, backgroundColor: colors.surface }}>
                <option value="client">Client</option>
                <option value="technicien">Technicien</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="rounded-xl px-4 py-2 font-semibold text-sm shadow-sm text-white" style={{ backgroundColor: colors.primary.main }}>
                Enregistrer sur Supabase
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setEditProfile(null) }} className="rounded-xl px-4 py-2 font-semibold text-sm shadow-sm" style={{ backgroundColor: colors.surface, color: colors.text.primary, border: `1px solid ${colors.borders.border}` }}>
                Annuler
              </button>
            </div>
          </form>
        )}
      </Modal>
    </DashboardLayout>
  )
}