import React from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import palette from '../../theme/palette'
import { useAuth } from '../../hooks/useAuth'

function Avatar({ name, size = 64, colors }) {
  const initials = (name || '').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase() || 'U'
  return (
    <div style={{ width: size, height: size }} className="rounded-full flex items-center justify-center text-xl font-bold" aria-hidden>
      <div className="rounded-full flex items-center justify-center" style={{ width: size, height: size, backgroundColor: colors.primary.main, color: colors.text.white }}>{initials}</div>
    </div>
  )
}

export default function Profile(){
  const colors = palette.colors
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-black" style={{ color: colors.text.primary }}>Mon profil</h2>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <aside className="md:col-span-1">
          <div className="rounded-[1.5rem] border p-6 text-center" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            {user ? (
              <>
                <div className="flex flex-col items-center gap-4">
                  <Avatar name={user.name} size={96} colors={colors} />
                  <div className="text-lg font-bold" style={{ color: colors.text.primary }}>{user.name}</div>
                  <div className="text-sm" style={{ color: colors.text.secondary }}>{user.role || 'Utilisateur'}</div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/profile/edit" className="rounded-xl px-4 py-2 font-semibold text-center" style={{ backgroundColor: colors.primary.light, color: colors.primary.main }}>Modifier le profil</Link>
                  <Link to="/request-work" className="rounded-xl px-4 py-2 font-semibold text-center" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>Passer une demande</Link>
                  <Link to="/" className="rounded-xl px-4 py-2 font-semibold text-center" style={{ backgroundColor: colors.surface, color: colors.text.primary, border: `1px solid ${colors.borders.border}` }}>Retour</Link>
                </div>
              </>
            ) : (
              <div>
                <p style={{ color: colors.text.secondary }}>Aucun utilisateur connecté.</p>
                <Link to="/login" className="mt-4 inline-block rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>Se connecter</Link>
              </div>
            )}
          </div>
        </aside>

        <section className="md:col-span-2">
          <div className="rounded-[1.5rem] border p-6" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            {user ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-gray-500">Nom complet</div>
                  <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>{user.name || '—'}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>{user.email || '—'}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Téléphone</div>
                  <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>{user.phone || '—'}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Rôle</div>
                  <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>{user.role || '—'}</div>
                </div>

                <div className="sm:col-span-2">
                  <div className="text-sm text-gray-500">Adresse (si fournie)</div>
                  <div className="text-lg font-semibold" style={{ color: colors.text.primary }}>{user.address || '—'}</div>
                </div>

               
              </div>
            ) : (
              <p style={{ color: colors.text.secondary }}>Connectez-vous pour voir vos informations.</p>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
