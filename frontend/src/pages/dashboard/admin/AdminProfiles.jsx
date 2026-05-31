import React, { useMemo, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import palette from '../../../theme/palette'
import { Link } from 'react-router-dom'
import Modal from '../../../components/common/Modal'

const profiles = [
  { title: 'Client Sara', meta: 'Profil complet • Vérifié • 8 demandes', details: ['Rôle: Client', 'Email: sara@mail.tn', 'Téléphone: 26 111 222', 'Ville: Tunis'], status: 'Actif' },
  { title: 'Technicien Sami', meta: 'Profil métier • Vérifié • 12 interventions', details: ['Rôle: Technicien', 'Email: sami@mail.tn', 'Téléphone: 24 333 444', 'Spécialité: Plomberie'], status: 'Actif' },
  { title: 'Admin principal', meta: 'Accès global • Actif • Toutes permissions', details: ['Rôle: Administrateur', 'Email: admin@mail.tn', 'Niveau: global', 'Permissions: complètes'], status: 'Actif' },
]

export default function AdminProfiles() {
  const colors = palette.colors
  const [items, setItems] = useState(profiles)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [editProfile, setEditProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

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
    return [
      `Statut actuel: ${selectedProfile.status}`,
      ...selectedProfile.details,
    ]
  }, [selectedProfile])

  const updateStatus = (title, status) => {
    const newItems = items.map((profile) => (profile.title === title ? { ...profile, status } : profile))
    setItems(newItems)
    try { window.localStorage.setItem('profiles', JSON.stringify(newItems)) } catch {}
    setSelectedProfile((currentProfile) =>
      currentProfile && currentProfile.title === title
        ? { ...currentProfile, status }
        : currentProfile,
    )
  }

  // profiles are kept in-memory; persistence removed per project policy

  const openCreate = () => {
    setEditProfile({ title: '', meta: '', details: [], status: 'Actif' })
    setIsEditing(true)
  }

  const openEdit = (profile) => {
    setEditProfile({ ...profile, detailsText: (profile.details || []).join('\n') })
    setIsEditing(true)
  }

  const saveProfile = (e) => {
    e.preventDefault()
    const details = (editProfile.detailsText || '').split('\n').map(s => s.trim()).filter(Boolean)
    if (editProfile.id) {
      // preserve original title when editing existing profile
        const newItems = items.map((p) => (p.id === editProfile.id ? { ...p, meta: editProfile.meta, details, status: editProfile.status } : p))
        setItems(newItems)
        setSelectedProfile(newItems.find(p => p.id === editProfile.id))
    } else {
      const newItem = { ...editProfile, id: Date.now(), details }
      setItems([newItem, ...items])
    }
    setIsEditing(false)
    setEditProfile(null)
  }

  const deleteProfile = (id) => {
    if (!window.confirm('Supprimer ce profil ?')) return
    const newItems = items.filter(p => p.id !== id)
    setItems(newItems)
    if (selectedProfile && selectedProfile.id === id) setSelectedProfile(null)
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Centre admin</p>
          <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Profils supervisés</h2>
          <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
            Tous les profils visibles pour l’admin: clients, techniciens et compte administrateur.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/admin" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au tableau
          </Link>
          <Link to="/dashboard/admin/passed-requests" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes passées
          </Link>
          <Link to="/dashboard/admin/work-requests" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.hover }}>
            Demandes de travail
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <div className="text-lg font-black" style={{ color: colors.text.primary }}>Contrôle des comptes</div>
        <p className="mt-2 text-sm leading-7" style={{ color: colors.text.secondary }}>
          Les boutons ci-dessous facilitent la surveillance des comptes clients, techniciens et administrateurs.
        </p>
        <div className="mt-4">
          <button onClick={openCreate} className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>Ajouter un nouveau profil</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((profile) => (
          <div key={profile.title} className="rounded-[2rem] border p-5 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold" style={{ color: colors.text.primary }}>{profile.title}</div>
                <div className="mt-1 text-sm" style={{ color: colors.text.secondary }}>{profile.meta}</div>
                <div className="mt-2 text-sm font-semibold" style={{ color: colors.primary.main }}>Statut actuel: {profile.status}</div>
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" style={getStatusStyle(profile.status)}>
                {profile.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => setSelectedProfile(profile)} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
                Afficher les données
              </button>
              <button type="button" onClick={() => openEdit(profile)} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>
                Modifier
              </button>
              <button type="button" onClick={() => deleteProfile(profile.id)} className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.status.errorLight, color: colors.text.primary }}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={Boolean(selectedProfile)} onClose={() => setSelectedProfile(null)}>
        {selectedProfile && (
          <div>
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{selectedProfile.title}</h3>
            <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>{selectedProfile.meta}</p>
            <div className="mt-4 rounded-2xl border p-4" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <div className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: colors.text.muted }}>Données</div>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: colors.text.secondary }}>
                {selectedProfileDetails.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={isEditing} onClose={() => { setIsEditing(false); setEditProfile(null) }}>
        {editProfile && (
          <form onSubmit={saveProfile}>
            <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{editProfile.id ? 'Modifier le profil' : 'Ajouter un profil'}</h3>
            <div className="mt-4">
              <label className="text-sm text-gray-500">Titre</label>
              {editProfile.id ? (
                <div className="mt-2 w-full rounded-md border px-3 py-2" style={{ backgroundColor: colors.surface }}>{editProfile.title}</div>
              ) : (
                <input value={editProfile.title} onChange={(e) => setEditProfile({ ...editProfile, title: e.target.value })} className="mt-2 w-full rounded-md border px-3 py-2" />
              )}
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-500">Meta</label>
              <input value={editProfile.meta} onChange={(e) => setEditProfile({ ...editProfile, meta: e.target.value })} className="mt-2 w-full rounded-md border px-3 py-2" />
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-500">Détails (une ligne par élément)</label>
              <textarea value={editProfile.detailsText || (editProfile.details || []).join('\n')} onChange={(e) => setEditProfile({ ...editProfile, detailsText: e.target.value })} className="mt-2 w-full rounded-md border px-3 py-2" rows={6} />
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-500">Statut</label>
              <select value={editProfile.status} onChange={(e) => setEditProfile({ ...editProfile, status: e.target.value })} className="mt-2 w-full rounded-md border px-3 py-2">
                <option>Actif</option>
                <option>Inactif</option>
                <option>Suspension</option>
              </select>
            </div>
            <div className="mt-4 flex gap-3">
              <button type="submit" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>Enregistrer</button>
              <button type="button" onClick={() => { setIsEditing(false); setEditProfile(null) }} className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.surface, color: colors.text.primary, border: `1px solid ${colors.borders.border}` }}>Annuler</button>
            </div>
          </form>
        )}
      </Modal>
    </DashboardLayout>
  )
}
