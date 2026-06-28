import React, { useState, useEffect } from 'react'
import AppLayout from '../../layouts/AppLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import palette from '../../theme/palette'

// Importation des fonctions d'API mises à jour
import { createClientRequest, getAllTechnicians } from '../../api/client'

export default function Services() {
  const colors = palette.colors
  const [technicians, setTechnicians] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTechId, setSelectedTechId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  
  // État pour la notification UI (sans modifier le design)
  const [notification, setNotification] = useState(null) 
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    address: '',
    date: '',
    issue: '',
  })

  // Fonction pour afficher la notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    async function fetchTechs() {
      try {
        setLoading(true)
        const responseData = await getAllTechnicians()
        const fetchedTechs = responseData.data || responseData || []
        setTechnicians(fetchedTechs)
        
        if (fetchedTechs.length > 0) {
          setSelectedTechId(fetchedTechs[0].id)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des techniciens :", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTechs()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.clientName || !formData.clientPhone) {
      showNotification("Veuillez renseigner votre nom et votre numéro de téléphone.", "error")
      return
    }

    try {
      setSubmitting(true)
      const currentTech = technicians.find(t => t.id === selectedTechId)

      await createClientRequest({
        service_id: selectedTechId,
        etat: "En attente",
        date_demande: formData.date || new Date().toISOString(),
        ownerName: formData.clientName,
        ownerPhone: formData.clientPhone,
        animalName: null,
        animalType: currentTech ? currentTech.nom : 'Technicien',
        address: formData.address,
        notes: formData.issue
      })

      showNotification('Votre demande d\'intervention a été enregistrée avec succès !', 'success')
      setFormData({ clientName: '', clientPhone: '', address: '', date: '', issue: '' })

    } catch (error) {
      console.error("Erreur lors de la soumission de la demande :", error)
      showNotification("Une erreur est survenue lors de l'envoi.", "error")
    } finally {
      setSubmitting(false)
    }
  }

  const activeTech = technicians.find((t) => t.id === selectedTechId)

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-20 text-lg font-bold" style={{ color: colors.text.primary }}>
          Chargement des techniciens disponibles...
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      {/* Emplacement du message sans modifier votre layout */}
      {notification && (
        <div className={`mx-auto max-w-6xl mb-6 p-4 rounded-xl border ${
          notification.type === 'success' ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-100 border-red-400 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
        
        {/* SECTION GAUCHE : Liste des Artisans / Techniciens (Design Original) */}
        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.secondary.main }}>Artisans</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl" style={{ color: colors.text.primary }}>Choisir un Technicien</h2>
          <p className="mt-4 max-w-2xl leading-7" style={{ color: colors.text.secondary }}>
            Sélectionnez un professionnel qualifié disponible en base de données pour prendre en charge vos travaux.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {technicians.map((tech) => {
              const isActive = selectedTechId === tech.id
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setSelectedTechId(tech.id)}
                  className={`rounded-[1.6rem] border p-5 text-left transition-all duration-200 ${
                    isActive ? 'shadow-md' : 'hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: isActive ? colors.primary.main : colors.borders.border,
                    backgroundColor: isActive ? colors.primary.light : colors.surface,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>Spécialité</p>
                      <h3 className="mt-2 text-lg font-bold" style={{ color: colors.text.primary }}>{tech.nom}</h3>
                    </div>
                    <div className="h-4 w-4 rounded-full border-2" style={{ borderColor: isActive ? colors.primary.main : colors.borders.border, backgroundColor: isActive ? colors.primary.main : 'transparent' }} />
                  </div>
                  <p className="mt-3 text-sm leading-6" style={{ color: colors.text.secondary }}>{tech.description}</p>
                  {tech.prix && (
                    <div className="mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold" style={{ color: colors.secondary.main, backgroundColor: colors.secondary.light }}>
                      {tech.prix} TND
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {activeTech && (
            <div className="mt-8 rounded-2xl border p-5" style={{ backgroundColor: colors.background, borderColor: colors.borders.border }}>
              <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: colors.text.muted }}>Technicien sélectionné</p>
              <p className="mt-2 text-lg font-bold" style={{ color: colors.text.primary }}>{activeTech.nom}</p>
              <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>{activeTech.description}</p>
            </div>
          )}
        </section>

        {/* SECTION DROITE : Le Formulaire (Design Original) */}
        <section className="rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>Demande d'intervention</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>
                Renseignez vos coordonnées pour envoyer un ordre de mission à l'artisan choisi.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Votre Nom complet" required />
              <Input name="clientPhone" value={formData.clientPhone} onChange={handleChange} placeholder="Numéro de téléphone" required />
            </div>

            <Input name="address" value={formData.address} onChange={handleChange} placeholder="Adresse du domicile" />
            <Input name="date" value={formData.date} onChange={handleChange} type="date" />

            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Décrivez avec précision la panne, les réparations ou l'urgence constatée..."
              rows="5"
              className="w-full rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:border-opacity-100 resize-none text-sm"
              style={{ 
                backgroundColor: colors.background, 
                borderColor: colors.borders.border,
                color: colors.text.primary 
              }}
            />

            <Button 
              type="submit" 
              disabled={submitting || !selectedTechId} 
              className="w-full py-4 text-center font-bold rounded-xl transition-all"
            >
              {submitting ? 'Envoi en cours...' : "Confirmer la demande d'intervention"}
            </Button>
          </form>
        </section>
      </div>
    </AppLayout>
  )
}