import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import palette from '../../theme/palette'
import { createClientRequest, getAnimalServices } from '../../api/client'

export default function Animals() {
  const colors = palette.colors
  const navigate = useNavigate()

  const [serviceType, setServiceType] = useState(null)
  const [serviceOptions, setServiceOptions] = useState([])
  
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

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Chargement des services depuis le backend
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await getAnimalServices()
        if (response.success) {
          setServiceOptions(response.data)
          if (response.data.length > 0) setServiceType(response.data[0].id)
        }
      } catch (err) {
        console.error("Erreur chargement services:", err)
      }
    }
    fetchServices()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const dateDemande = formData.date && formData.time 
      ? `${formData.date}T${formData.time}:00` 
      : new Date().toISOString()

    try {
      const response = await createClientRequest({
        service_id: serviceType,
        etat: 'En attente',
        date_demande: dateDemande,
        ...formData
      })

      if (response.success) {
        setMessage({ type: 'success', text: 'Votre demande a été enregistrée avec succès ! Redirection...' })
        setTimeout(() => navigate('/dashboard/client'), 2000)
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.message || 'Une erreur est survenue lors de l’envoi de la demande.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        
        {/* Colonne Gauche : Sélection du type de service */}
        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.secondary.main }}>Parcours Animaux</p>
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
                    isActive ? 'shadow-md' : 'hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: isActive ? colors.primary.main : colors.borders.border,
                    backgroundColor: isActive ? `${colors.primary.main}10` : colors.surface,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-4 w-4 rounded-full border-2" style={{ borderColor: isActive ? colors.primary.main : colors.borders.border, backgroundColor: isActive ? colors.primary.main : 'transparent' }} />
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: colors.text.primary }}>{option.nom}</h3>
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
              {serviceOptions.find(s => s.id === serviceType)?.nom || 'Sélectionnez un service'}
            </p>
          </div>
        </section>

        {/* Colonne Droite : Formulaire */}
        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>Informations à saisir</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>
                Remplissez les données du client, de l’animal et la date de prise en charge.
              </p>
            </div>

            {message.text && (
              <div className={`p-4 rounded-xl font-semibold text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.type === 'success' ? '✅' : '⚠️'} {message.text}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Nom du client" required />
              <Input name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} placeholder="Téléphone" required />
              <Input name="animalName" value={formData.animalName} onChange={handleChange} placeholder="Nom de l'animal" required />
              <Input name="animalType" value={formData.animalType} onChange={handleChange} placeholder="Type / race" required />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input name="date" value={formData.date} onChange={handleChange} type="date" required />
              <Input name="time" value={formData.time} onChange={handleChange} type="time" required />
            </div>

            <Input name="address" value={formData.address} onChange={handleChange} placeholder="Adresse de départ ou lieu de prise en charge" required />

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Précisions utiles: comportement, consignes, vétérinaire, allergies, etc."
              rows="5"
              className="w-full rounded-xl border px-4 py-3 outline-none transition-all text-sm"
              style={{ borderColor: colors.borders.input, backgroundColor: colors.surface, color: colors.text.primary }}
            />

            <Button type="submit" className="w-full py-3 text-base font-bold" disabled={loading}>
              {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
            </Button>
          </form>
        </section>
        
      </div>
    </AppLayout>
  )
}