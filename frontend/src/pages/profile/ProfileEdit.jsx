import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import palette from '../../theme/palette'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function ProfileEdit() {
  const colors = palette.colors
  const navigate = useNavigate()
  
  // 1. On récupère aussi 'loading' depuis useAuth pour éviter le doublon local
  const { user, updateProfile, loading } = useAuth()
  
  // 2. CORRECTION : On utilise 'name' comme nom de variable d'état pour s'aligner avec l'API
  const [name, setName] = useState(user?.name || '') 
  const [prenom, setPrenom] = useState(user?.prenom || '')
  const [email, setEmail] = useState(user?.email || '')
  const [telephone, setTelephone] = useState(user?.telephone || '')
  const [photo, setPhoto] = useState(user?.photo || '')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    // 3. CORRECTION : On envoie bien 'name' et non 'nom'
    const result = await updateProfile({ name, prenom, email, telephone, photo })
    
    if (!result.ok) {
      setError(result.message || 'La modification du profil a échoué.')
      return
    }

    // Retour à la page profil une fois la base mise à jour avec succès
    navigate('/profile')
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black" style={{ color: colors.text.primary }}>Modifier le profil</h2>
            <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>
              Mets à jour tes informations de compte visibles dans ton espace.
            </p>
          </div>
          <Link to="/profile" className="rounded-xl px-4 py-2 text-sm font-semibold" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>
            Retour au profil
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[1.5rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <div className="grid gap-4 md:grid-cols-2">
            
            {/* Champ Nom (Relié à l'état 'name') */}
            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Nom</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Nom"
                required
              />
            </label>

            {/* Champ Prénom */}
            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Prénom</span>
              <input
                value={prenom}
                onChange={(event) => setPrenom(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Prénom"
              />
            </label>

            {/* Champ Email */}
            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Email</span>
              <input
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Email"
                required
              />
            </label>

            {/* Champ Téléphone */}
            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Téléphone</span>
              <input
                value={telephone}
                onChange={(event) => setTelephone(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Téléphone"
              />
            </label>

            {/* Champ URL Photo */}
            <label className="space-y-2 text-sm font-medium md:col-span-2" style={{ color: colors.text.secondary }}>
              <span>URL de la photo de profil</span>
              <input
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="https://example.com/mon-avatar.png"
              />
            </label>
          </div>

          {/* Affichage des erreurs renvoyées par l'API */}
          {error && (
            <div className="mt-5 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: colors.status.errorLight, color: colors.text.primary, backgroundColor: colors.status.errorLight }}>
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              type="submit" 
              className="rounded-xl px-5 py-3 font-bold transition-all hover:opacity-90 disabled:opacity-50" 
              style={{ backgroundColor: colors.primary.main, color: colors.text.white }}
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
            <Link to="/profile" className="rounded-xl px-5 py-3 font-bold" style={{ backgroundColor: colors.surface, color: colors.text.primary, border: `1px solid ${colors.borders.border}` }}>
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}