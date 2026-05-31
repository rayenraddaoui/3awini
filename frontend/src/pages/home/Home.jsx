import React from 'react'
import AppLayout from '../../layouts/AppLayout'
import Button from '../../components/common/Button'
import { Link } from 'react-router-dom'
import palette from '../../theme/palette'

export default function Home() {
  const colors = palette.colors
  return (
    <AppLayout>
      <section className="relative overflow-hidden rounded-[2.5rem] border px-6 py-10 shadow-sm2 md:px-10 md:py-14" style={{ borderColor: colors.borders.border, backgroundColor: colors.surface }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle_at_top_left, ${colors.primary.main}1F, transparent 35%), radial-gradient(circle_at_top_right, ${colors.secondary.main}1F, transparent 30%)` }} />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur" style={{ borderColor: colors.borders.border, backgroundColor: 'rgba(255,255,255,0.80)', color: colors.text.secondary }}>
              Deux parcours, en une seul app
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl" style={{ color: colors.text.primary }}>
              Promenades, pet-sitting et techniciens validés
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 md:text-xl" style={{ color: colors.text.secondary }}>
              Le client publie une demande avec description. Le pet-sitter ou le technicien répond
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/animals"><Button className="px-6 py-4 text-base">demande un service animal</Button></Link>
              <Link to="/services"><Button variant="secondary" className="px-6 py-4 text-base text-primary">Voir les techniciens disponible</Button></Link>
              <Link to="/dashboard/admin"><Button variant="outline" className="px-6 py-4 text-base">Espace admin</Button></Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['Client', 'Crée une demande détaillée'],
                ['Pet-sitter', 'Prend en charge la garde ou la promenade'],
                ['Technicien', 'Répond aux demandes de service'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border p-4 shadow-sm backdrop-blur" style={{ borderColor: colors.borders.border, backgroundColor: 'rgba(255,255,255,0.80)' }}>
                  <div className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>{title}</div>
                  <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border p-6 shadow-lg" style={{ borderColor: colors.borders.border, backgroundColor: colors.surface }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: colors.text.muted }}>Parcours 1</p>
                  <h2 className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>Animaux</h2>
                </div>
                <div className="rounded-2xl px-4 py-3 text-3xl" style={{ backgroundColor: colors.primary.light }}>🐕</div>
              </div>
              <p className="mt-4 text-sm leading-7" style={{ color: colors.text.secondary }}>
                Demande de promenade ou de garde avec description de l'animal, attente d'acceptation, puis suivi par le pet-sitter.
              </p>
            </div>

            <div className="rounded-[2rem] border p-6 shadow-lg" style={{ borderColor: colors.borders.border, backgroundColor: colors.surface }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: colors.text.muted }}>Parcours 2</p>
                  <h2 className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>Techniciens</h2>
                </div>
                <div className="rounded-2xl px-4 py-3 text-3xl" style={{ backgroundColor: colors.secondary.light }}>🛠️</div>
              </div>
              <p className="mt-4 text-sm leading-7" style={{ color: colors.text.secondary }}>
                Le client consulte les techniciens présents, les contacte dans l'application, puis l'admin contrôle les demandes de rejoindre la plateforme.
              </p>
            </div>

            <div className="rounded-[2rem] border p-6 text-white shadow-xl" style={{ borderColor: colors.borders.border, background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})` }}>
              <p className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: 'rgba(255,255,255,0.80)' }}>Centre de contrôle</p>
              <h2 className="mt-2 text-2xl font-black">L'admin supervise tout</h2>
              <p className="mt-4 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.90)' }}>
                Validation des comptes, suivi des clients, validation des techniciens et contrôle des demandes de contact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
