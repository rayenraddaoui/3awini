import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import palette from '../../theme/palette'
import { useAuth } from '../../hooks/useAuth'
import { getProfile } from '../../api/profile' // Import de la fonction API

export default function Profile() {
  const colors = palette.colors
  const { user, updateProfile } = useAuth()
  const [localLoading, setLocalLoading] = useState(!user) // Load si pas de cache initial

  // Synchroniser et rafraîchir les données du profil depuis le serveur à l'ouverture
  useEffect(() => {
    const fetchFreshProfile = async () => {
      try {
        const data = await getProfile()
        if (data && data.user) {
          // On met à jour le contexte global pour rafraîchir partout dans l'application
          updateProfile(data.user) 
        }
      } catch (err) {
        console.error("Impossible de rafraîchir le profil depuis le serveur", err)
      } finally {
        setLocalLoading(false)
      }
    }

    fetchFreshProfile()
  }, [])

  // 1. Gestion du Chargement (Local ou global)
  if (localLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 flex-col items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: `${colors.primary.main} transparent transparent transparent` }}></div>
          <p className="text-sm font-medium" style={{ color: colors.text.secondary }}>Chargement du profil...</p>
        </div>
      </DashboardLayout>
    )
  }

  // 2. Sécurité si aucun utilisateur n'est récupéré
  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center p-6 border rounded-[1.5rem]" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p style={{ color: colors.text.secondary }}>Aucun utilisateur connecté.</p>
          <Link to="/login" className="mt-4 inline-block rounded-xl px-4 py-2 font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: colors.primary.main }}>
            Se connecter
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  // Calcul rapide des initiales de secours
  const initials = `${user.prenom?.[0] || ''}${user.name?.[0] || ''}`.toUpperCase() || 'U'

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-black" style={{ color: colors.text.primary }}>Mon profil</h2>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* CARTE DE GAUCHE : Avatar & Actions */}
        <aside className="rounded-[1.5rem] border p-6 text-center" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <div className="flex flex-col items-center gap-4">
            {user.photo ? (
              <img src={user.photo} alt="Profil" className="h-24 w-24 rounded-full object-cover border-2" style={{ borderColor: colors.primary.main }} />
            ) : (
              <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-black text-white" style={{ backgroundColor: colors.primary.main }}>
                {initials}
              </div>
            )}
            <h3 className="text-lg font-bold capitalize" style={{ color: colors.text.primary }}>
              {user.prenom} {user.name}
            </h3>
            <span className="text-xs px-3 py-1 rounded-full border font-medium capitalize" style={{ color: colors.text.secondary, backgroundColor: colors.surface, borderColor: colors.borders.border }}>
              {user.role || 'Client'}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 text-sm font-semibold">
            <Link to="/profile/edit" className="rounded-xl px-4 py-2 text-center transition-all hover:opacity-90" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>Modifier le profil</Link>
            <Link to="/request-work" className="rounded-xl px-4 py-2 text-center text-white transition-all hover:opacity-90" style={{ backgroundColor: colors.primary.main }}>Passer une demande</Link>
            <Link to="/" className="rounded-xl px-4 py-2 text-center border" style={{ backgroundColor: colors.surface, color: colors.text.primary, borderColor: colors.borders.border }}>Retour</Link>
          </div>
        </aside>

        {/* BLOC DE DROITE : Informations dynamiques */}
        <section className="md:col-span-2 rounded-[1.5rem] border p-6 grid grid-cols-1 gap-4 sm:grid-cols-2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          {[
            { label: 'Nom', value: user.name },
            { label: 'Prénom', value: user.prenom },
            { label: 'Email', value: user.email, fullWidth: true },
            { label: 'Téléphone', value: user.telephone },
            { label: "Rôle de l'espace", value: user.role }
          ].map((field, index) => (
            <div key={index} className={field.fullWidth ? 'sm:col-span-2' : ''}>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">{field.label}</div>
              <div className="text-base font-bold mt-1 capitalize" style={{ color: colors.text.primary }}>
                {field.value || '—'}
              </div>
            </div>
          ))}
        </section>

      </div>
    </DashboardLayout>
  )
}