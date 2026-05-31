import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import palette from '../../theme/palette'
import { useAuth } from '../../hooks/useAuth'

export default function RequestWork(){
  const colors = palette.colors
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ title: '', description: '', location: '', phone: user?.phone || '', date: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRequest = {
      id: Date.now(),
      title: form.title || `Demande de ${user?.name || 'utilisateur'}`,
      meta: `${form.description || 'Demande'} • ${form.location || 'Non spécifiée'} • En attente`,
      details: [`Proposé par: ${user?.name || 'Anonyme'}`, `Téléphone: ${form.phone || '—'}`, `Date désirée: ${form.date || '—'}`, `Description: ${form.description || '—'}`],
      status: 'En attente'
    }

    // Persistence removed: submit is handled in-memory / sent to backend in future
    console.log('Submitted work request (no localStorage):', newRequest)
    // navigate back to dashboard (or show confirmation)
    navigate('/dashboard')
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.status.warning }}>Demande</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Passer une demande de travail</h2>
        <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>Remplissez le formulaire ci-dessous pour soumettre une demande d'intervention.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[1.5rem] border p-6" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-gray-500">Titre</label>
            <input name="title" value={form.title} onChange={handleChange} className="mt-2 w-full rounded-md border px-3 py-2" placeholder="Ex: Fuite plomberie cuisine" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Localisation</label>
            <input name="location" value={form.location} onChange={handleChange} className="mt-2 w-full rounded-md border px-3 py-2" placeholder="Ville, quartier" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Téléphone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="mt-2 w-full rounded-md border px-3 py-2" placeholder="Téléphone" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Date désirée</label>
            <input name="date" value={form.date} onChange={handleChange} type="date" className="mt-2 w-full rounded-md border px-3 py-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-500">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="mt-2 w-full rounded-md border px-3 py-2" rows={6} placeholder="Décrivez le travail requis..."></textarea>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button type="submit" className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.primary.main, color: colors.text.white }}>Soumettre la demande</button>
          <button type="button" onClick={() => window.history.back()} className="rounded-xl px-4 py-2 font-semibold" style={{ backgroundColor: colors.surface, color: colors.text.primary, border: `1px solid ${colors.borders.border}` }}>Annuler</button>
        </div>
      </form>
    </DashboardLayout>
  )
}
