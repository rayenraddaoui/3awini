import React, { useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import palette from '../../theme/palette'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function Register(){
  const colors = palette.colors
  const navigate = useNavigate()
  const { login } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password || !name) {
      alert('Veuillez remplir le nom, l\'email et le mot de passe.')
      return
    }

    const newUser = { name, email, role }
    login(newUser)
    if (role === 'admin') navigate('/dashboard/admin')
    else if (role === 'client') navigate('/dashboard/client')
    else navigate('/dashboard/technician')
  }
  return (
    <AppLayout>
      <div className="mx-auto max-w-md rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h2 className="text-2xl font-black" style={{ color: colors.text.primary }}>Créer un compte</h2>
        <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>Choisis ton rôle pour rejoindre la plateforme comme client, technicien ou pet-sitter.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input placeholder="Nom complet" value={name} onChange={(e)=>setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition" style={{ borderColor: colors.borders.input, backgroundColor: colors.surface, color: colors.text.primary }}>
            <option value="client">Client</option>
            <option value="technician">Technicien</option>
            <option value="admin">Admin</option>
          </select>
          <Input placeholder="Mot de passe" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <Button type="submit" className="w-full py-3">Créer un compte</Button>
        </form>
      </div>
    </AppLayout>
  )
}
