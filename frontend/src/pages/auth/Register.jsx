import React, { useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import palette from '../../theme/palette'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function Register(){
  const colors = palette.colors
  const navigate = useNavigate()
  const { register, loading } = useAuth()

  // Déclaration des états synchronisés avec le backend
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [photo, setPhoto] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Envoi des données structurées selon le même principe
    const result = await register({ 
      nom, 
      prenom, 
      email, 
      telephone, 
      photo, 
      password, 
      role 
    })

    // Si le hook useAuth retourne une erreur (ok: false)
    if (!result.ok) {
      setError(result.message || 'Inscription impossible.')
      return
    }

    // Redirection vers le login en transmettant le message de succès dans l'état
    navigate('/login', { state: { message: 'Compte créé avec succès ! Connectez-vous.' } })
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-md rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h2 className="text-2xl font-black" style={{ color: colors.text.primary }}>Créer un compte</h2>
        <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>
          Choisis ton rôle pour rejoindre la plateforme comme client, technicien ou pet-sitter.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          
          {/* Saisie du Nom de famille */}
          <Input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
          
          {/* Saisie du Prénom */}
          <Input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          
          {/* Saisie de l'adresse Email */}
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          
          {/* Saisie du numéro de Téléphone */}
          <Input placeholder="Téléphone (ex: +216...)" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          
          {/* Saisie du lien de l'image de profil */}
          <Input placeholder="URL de votre photo de profil" value={photo} onChange={(e) => setPhoto(e.target.value)} />
          
          {/* Sélection de la nature du compte (Rôle) */}
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition" 
            style={{ borderColor: colors.borders.input, backgroundColor: colors.surface, color: colors.text.primary }}
          >
            <option value="client">Client</option>
            <option value="technician">Technicien</option>
            <option value="admin">Admin</option>
          </select>
          
          {/* Saisie du Mot de passe */}
          <Input placeholder="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          
          {/* Affichage dynamique de l'erreur du backend s'il y en a une */}
          {error && (
            <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: colors.status.errorLight, color: colors.text.primary, backgroundColor: colors.status.errorLight }}>
              {error}
            </div>
          )}
          
          {/* Bouton de validation gérant l'état de chargement */}
          <Button type="submit" className="w-full py-3" disabled={loading}>
            {loading ? 'Inscription en cours...' : 'Créer un compte'}
          </Button>
        </form>

        <p className="mt-4 text-sm" style={{ color: colors.text.secondary }}>
          Déjà un compte ? <Link to="/login" className="text-primary font-bold">Se connecter</Link>
        </p>
      </div>
    </AppLayout>
  )
}