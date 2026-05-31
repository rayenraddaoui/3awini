import React, { useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import palette from '../../theme/palette'

export default function Animals() {
  const colors = palette.colors
  const [serviceType, setServiceType] = useState('promenade')
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    animalName: '',
    animalType: '',
    date: '',
    time: '',
    address: '',
    notes: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const serviceOptions = [
    {
      id: 'promenade',
      title: 'Promener un animal',
      description: 'Le client demande une promenade encadrée pour son compagnon.',
    },
    {
      id: 'garde',
      title: 'Garder à la maison',
      description: 'L’animal est gardé à domicile ou chez le pet-sitter pendant la période choisie.',
    },
    {
      id: 'veterinaire',
      title: 'Prendre au vétérinaire',
      description: 'Le client planifie un transport et un accompagnement vers le vétérinaire.',
    },
  ]

  return (
    <AppLayout>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.secondary.main }}>Parcours 1</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl" style={{ color: colors.text.primary }}>
            Demande de service pour animal
          </h2>
          <p className="mt-4 max-w-xl leading-7" style={{ color: colors.text.secondary }}>
            Choisissez le type de prise en charge, puis renseignez les informations de votre animal et la date souhaitée.
          </p>

          <div className="mt-8 space-y-4">
            {serviceOptions.map((option) => {
              const isActive = serviceType === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setServiceType(option.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isActive
                      ? 'shadow-md'
                      : 'hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: isActive ? colors.primary.main : colors.borders.border,
                    backgroundColor: isActive ? colors.primary.light : colors.surface,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-4 w-4 rounded-full border-2" style={{ borderColor: isActive ? colors.primary.main : colors.borders.border, backgroundColor: isActive ? colors.primary.main : 'transparent' }} />
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: colors.text.primary }}>{option.title}</h3>
                      <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>{option.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 rounded-2xl border p-5" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
            <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>Résumé du service</p>
            <p className="mt-2 text-lg font-bold" style={{ color: colors.text.primary }}>
              {serviceType === 'promenade' && 'Promener un animal'}
              {serviceType === 'garde' && 'Garder à la maison'}
              {serviceType === 'veterinaire' && 'Prendre au vétérinaire'}
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>Informations à saisir</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>
                Remplissez les données du client, de l’animal et la date de prise en charge.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Nom du client" />
              <Input name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} placeholder="Téléphone" />
              <Input name="animalName" value={formData.animalName} onChange={handleChange} placeholder="Nom de l'animal" />
              <Input name="animalType" value={formData.animalType} onChange={handleChange} placeholder="Type / race" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input name="date" value={formData.date} onChange={handleChange} type="date" />
              <Input name="time" value={formData.time} onChange={handleChange} type="time" />
            </div>

            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse de départ ou lieu de prise en charge"
            />

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Précisions utiles: comportement, consignes, vétérinaire, allergies, etc."
              rows="5"
              className="w-full rounded-xl border px-4 py-3 outline-none transition-all"
              style={{ borderColor: colors.borders.input, backgroundColor: colors.surface, color: colors.text.primary }}
            />

            <Button type="submit" className="w-full py-3 text-base">
              Envoyer la demande
            </Button>
          </form>
        </section>
      </div>
    </AppLayout>
  )
}

