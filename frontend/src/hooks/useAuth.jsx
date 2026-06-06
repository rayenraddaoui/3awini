/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'

const AUTH_USER_KEY = '3awini.auth.user'
const AUTH_USERS_KEY = '3awini.auth.users'

const DEFAULT_USERS = [
  { id: 'admin-demo', name: 'Admin', email: 'admin@3awini.local', password: 'admin123', role: 'admin' },
  { id: 'client-demo', name: 'Client', email: 'client@3awini.local', password: 'client123', role: 'client' },
  { id: 'technician-demo', name: 'Technicien', email: 'tech@3awini.local', password: 'tech123', role: 'technician' },
]

const AuthContext = createContext({
  user: null,
  users: DEFAULT_USERS,
  login: () => ({ ok: false }),
  register: () => ({ ok: false }),
  logout: () => {},
})

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage failures so auth still works in memory.
  }
}

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage(AUTH_USERS_KEY, DEFAULT_USERS))
  const [user, setUser] = useState(() => sanitizeUser(readStorage(AUTH_USER_KEY, null)))

  useEffect(() => {
    writeStorage(AUTH_USERS_KEY, users)
  }, [users])

  useEffect(() => {
    writeStorage(AUTH_USER_KEY, user)
  }, [user])

  const login = ({ email, password }) => {
    const normalizedEmail = String(email || '').trim().toLowerCase()
    const matchedUser = users.find((entry) => entry.email.trim().toLowerCase() === normalizedEmail && entry.password === password)

    if (!matchedUser) {
      return { ok: false, message: 'Identifiants invalides. Vérifiez votre email et votre mot de passe.' }
    }

    setUser(sanitizeUser(matchedUser))
    return { ok: true, user: sanitizeUser(matchedUser) }
  }

  const register = ({ name, email, password, role }) => {
    const trimmedName = String(name || '').trim()
    const normalizedEmail = String(email || '').trim().toLowerCase()
    const normalizedRole = ['admin', 'client', 'technician'].includes(role) ? role : 'client'

    if (!trimmedName || !normalizedEmail || !password) {
      return { ok: false, message: 'Veuillez remplir le nom, l’email et le mot de passe.' }
    }

    if (users.some((entry) => entry.email.trim().toLowerCase() === normalizedEmail)) {
      return { ok: false, message: 'Cet email est déjà utilisé.' }
    }

    const createdUser = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      name: trimmedName,
      email: normalizedEmail,
      password,
      role: normalizedRole,
    }

    setUsers((currentUsers) => [...currentUsers, createdUser])
    setUser(sanitizeUser(createdUser))

    return { ok: true, user: sanitizeUser(createdUser) }
  }

  const updateProfile = (updates) => {
    if (!user) {
      return { ok: false, message: 'Aucun utilisateur connecté.' }
    }

    const nextName = String(updates?.name ?? user.name ?? '').trim()
    const nextEmail = String(updates?.email ?? user.email ?? '').trim().toLowerCase()
    const nextPhone = String(updates?.phone ?? user.phone ?? '').trim()
    const nextAddress = String(updates?.address ?? user.address ?? '').trim()

    if (!nextName || !nextEmail) {
      return { ok: false, message: 'Le nom et l’email sont obligatoires.' }
    }

    const emailTakenByAnotherUser = users.some(
      (entry) => entry.email.trim().toLowerCase() === nextEmail && entry.id !== user.id,
    )

    if (emailTakenByAnotherUser) {
      return { ok: false, message: 'Cet email est déjà utilisé.' }
    }

    const nextUser = sanitizeUser({
      ...user,
      name: nextName,
      email: nextEmail,
      phone: nextPhone,
      address: nextAddress,
    })

    setUsers((currentUsers) =>
      currentUsers.map((entry) =>
        entry.id === user.id
          ? {
              ...entry,
              name: nextName,
              email: nextEmail,
              phone: nextPhone,
              address: nextAddress,
            }
          : entry,
      ),
    )
    setUser(nextUser)

    return { ok: true, user: nextUser }
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, users, login, register, updateProfile, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}