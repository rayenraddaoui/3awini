import React, { useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import palette from '../../theme/palette'

export default function Login(){
  const navigate = useNavigate()
  const { login } = useAuth()
  const colors = palette.colors
  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('admin@3awini.local')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    const result = login({ email, password })
    if (!result.ok) {
      setError(result.message || 'Connexion impossible.')
      return
    }

    const nextRole = result.user?.role || role
    if (nextRole === 'admin') navigate('/dashboard/admin')
    else if (nextRole === 'client') navigate('/dashboard/client')
    else navigate('/dashboard/technician')
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-md rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h2 className="text-2xl font-black" style={{ color: colors.text.primary }}>Se connecter</h2>
        <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>Un seul espace de connexion pour le client, le technicien et l’admin.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={(event) => {
              const newRole = event.target.value
              setRole(newRole)
              if (newRole === 'admin') {
                setEmail('admin@3awini.local')
                setPassword('admin123')
              } else if (newRole === 'technician') {
                setEmail('tech@3awini.local')
                setPassword('tech123')
              } else {
                setEmail('client@3awini.local')
                setPassword('client123')
              }
            }}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
            style={{ borderColor: colors.borders.input, backgroundColor: colors.surface, color: colors.text.primary }}
          >
            <option value="client">Client</option>
            <option value="technician">Technicien</option>
            <option value="admin">Admin</option>
          </select>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
          <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mot de passe" type="password" />
          {error && (
            <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: colors.status.errorLight, color: colors.text.primary, backgroundColor: colors.status.errorLight }}>
              {error}
            </div>
          )}
          <Button type="submit" className="w-full py-3">Connexion</Button>
        </form>
        <p className="mt-4 text-sm" style={{ color: colors.text.secondary }}>Pas encore de compte ? <Link to="/register" className="text-primary font-bold">Créer un compte</Link></p>
      </div>
    </AppLayout>
  )
}

