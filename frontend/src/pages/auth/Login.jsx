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
  const [email, setEmail] = useState('admin@3awini.local')
  const [password, setPassword] = useState('admin123')
  const [role, setRole] = useState('admin')

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextUser = {
      name: email.split('@')[0] || role,
      email,
      role,
    }

    if (email && password) {
      login(nextUser)
      if (role === 'admin') navigate('/dashboard/admin')
      else if (role === 'client') navigate('/dashboard/client')
      else navigate('/dashboard/technician')
    }
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-md rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h2 className="text-2xl font-black" style={{ color: colors.text.primary }}>Se connecter</h2>
        <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>Un seul espace de connexion pour le client, le technicien et l’admin.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
            style={{ borderColor: colors.borders.input, backgroundColor: colors.surface, color: colors.text.primary }}
          >
            <option value="client">Client</option>
            <option value="technician">Technicien</option>
            <option value="admin">Admin</option>
          </select>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
          <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mot de passe" type="password" />
          <Button type="submit" className="w-full py-3">Connexion</Button>
        </form>
        <p className="mt-4 text-sm" style={{ color: colors.text.secondary }}>Pas encore de compte ? <Link to="/register" className="text-primary font-bold">Créer un compte</Link></p>
      </div>
    </AppLayout>
  )
}
