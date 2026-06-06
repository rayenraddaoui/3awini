import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import palette from '../../theme/palette'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function ProfileEdit() {
  const colors = palette.colors
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    const result = updateProfile({ name, email, phone, address })
    if (!result.ok) {
      setError(result.message || 'La modification du profil a échoué.')
      return
    }

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
            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Nom complet</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Nom complet"
              />
            </label>

            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Email"
              />
            </label>

            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Téléphone</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Téléphone"
              />
            </label>

            <label className="space-y-2 text-sm font-medium" style={{ color: colors.text.secondary }}>
              <span>Adresse</span>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none transition"
                style={{ backgroundColor: colors.surface, borderColor: colors.borders.input, color: colors.text.primary }}
                placeholder="Adresse"
              />
            </label>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: colors.status.errorLight, color: colors.text.primary, backgroundColor: colors.status.errorLight }}>
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="rounded-xl px-5 py-3 font-bold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>
              Enregistrer les modifications
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
