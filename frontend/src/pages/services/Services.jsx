import React, { useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
// Local services data (moved from src/api/mockData.js)
const services = [
  { id:1, title: 'Plombier Sami', description: 'Dépannage fuite, installation sanitaire et urgence maison', price: 45 },
  { id:2, title: 'Électricien Amine', description: 'Panne électrique, tableau, prises et éclairage', price: 55 },
  { id:3, title: 'Réparation maison Yassine', description: 'Petits travaux, fixation, maintenance et montage', price: 40 },
  { id:4, title: 'Technicien clim Nader', description: 'Entretien, diagnostic et réparation climatisation', price: 65 },
]
import palette from '../../theme/palette'

export default function Services(){
  const colors = palette.colors
  const [selectedTechnician, setSelectedTechnician] = useState(services[0]?.id ?? null)
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    address: '',
    date: '',
    issue: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const activeTechnician = services.find((service) => service.id === selectedTechnician) ?? services[0]

  return (
    <AppLayout>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.secondary.main }}>Parcours 2</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl" style={{ color: colors.text.primary }}>Choisir un technicien</h2>
          <p className="mt-4 max-w-2xl leading-7" style={{ color: colors.text.secondary }}>
            Le client peut parcourir les techniciens disponibles, par exemple un plombier, puis sélectionner celui qu’il veut contacter.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const isActive = selectedTechnician === service.id

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedTechnician(service.id)}
                  className={`rounded-[1.6rem] border p-5 text-left transition-all duration-200 ${
                    isActive
                      ? 'shadow-md'
                      : 'hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: isActive ? colors.primary.main : colors.borders.border,
                    backgroundColor: isActive ? colors.primary.light : colors.surface,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>Technicien</p>
                      <h3 className="mt-2 text-lg font-bold" style={{ color: colors.text.primary }}>{service.title}</h3>
                    </div>
                    <div className="h-4 w-4 rounded-full border-2" style={{ borderColor: isActive ? colors.primary.main : colors.borders.border, backgroundColor: isActive ? colors.primary.main : 'transparent' }} />
                  </div>
                  <p className="mt-3 text-sm leading-6" style={{ color: colors.text.secondary }}>{service.description}</p>
                  <div className="mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold" style={{ color: colors.secondary.main, backgroundColor: colors.secondary.light }}>
                    {service.price} TND
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 rounded-2xl border p-5" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
            <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>Technicien choisi</p>
            <p className="mt-2 text-lg font-bold" style={{ color: colors.text.primary }}>{activeTechnician?.title}</p>
            <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>{activeTechnician?.description}</p>
          </div>
        </section>

        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>Faire une demande de contact</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>
                Renseignez vos informations et le besoin pour envoyer la demande au technicien choisi.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Nom du client" />
              <Input name="clientPhone" value={formData.clientPhone} onChange={handleChange} placeholder="Téléphone" />
            </div>

            <Input name="address" value={formData.address} onChange={handleChange} placeholder="Adresse d'intervention" />
            <Input name="date" value={formData.date} onChange={handleChange} type="date" />

            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Décrivez le problème ou la demande: fuite, panne, réparation, urgence..."
              rows="5"
              className="w-full rounded-xl border px-4 py-3 outline-none transition-all"
              style={{ borderColor: colors.borders.input, backgroundColor: colors.surface, color: colors.text.primary }}
            />

            <div className="rounded-2xl border p-4" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>Demande liée à</p>
              <p className="mt-2 text-base font-bold" style={{ color: colors.text.primary }}>{activeTechnician?.title}</p>
            </div>

            <Button type="submit" className="w-full py-3 text-base">
              Envoyer la demande de contact
            </Button>
          </form>
        </section>
      </div>
    </AppLayout>
  )
}
