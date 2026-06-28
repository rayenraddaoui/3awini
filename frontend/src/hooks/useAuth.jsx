/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'

// Les fonctions d'authentification viennent du fichier auth
import { loginUser, registerUser, logoutUser } from '../api/auth'

// La fonction de mise à jour du profil vient du fichier profile
import { updateUserProfile } from '../api/profile' 

const AUTH_USER_KEY = '3awini.auth.user'

// Création du contexte avec des valeurs par défaut pour l'auto-complétion
const AuthContext = createContext({
  user: null,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  updateProfile: async () => ({ ok: false }),
  logout: async () => {},
  loading: false
})

// Helpers pour interagir sainement avec le localStorage pour l'UI
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
    if (value === null) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  } catch {
    // Ignore les échecs d'écriture (ex: mode incognito)
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(AUTH_USER_KEY, null))
  const [loading, setLoading] = useState(false)

  // ==========================================
  // 1. CONNEXION (LOGIN)
  // ==========================================
  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const data = await loginUser({ email, password })
      const loggedUser = data.user

      // Persistance locale de l'UI utilisateur (sans token !)
      setUser(loggedUser)
      writeStorage(AUTH_USER_KEY, loggedUser)

      return { ok: true, user: loggedUser }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        ok: false, 
        message: error.response?.data?.message || 'Identifiants incorrects ou erreur serveur.' 
      }
    } finally {
      setLoading(false)
    }
  }

  // ==========================================
  // 2. INSCRIPTION (REGISTER)
  // ==========================================
  const register = async (userData) => {
    setLoading(true)
    try {
      const data = await registerUser(userData)
      const createdUser = data.user
      
      return { ok: true, user: createdUser }
    } catch (error) {
      console.error('Register error:', error)
      return { 
        ok: false, 
        message: error.response?.data?.message || 'Erreur lors de l’inscription.' 
      }
    } finally {
      setLoading(false)
    }
  }

  // ==========================================
  // 3. MISE À JOUR DU PROFIL
  // ==========================================
  const updateProfile = async (updatedData) => {
    setLoading(true)
    try {
      const data = await updateUserProfile(updatedData)
      const updatedUser = data.user

      // Met à jour l'état et le stockage local immédiatement pour l'interface
      setUser(updatedUser)
      writeStorage(AUTH_USER_KEY, updatedUser)

      return { ok: true, user: updatedUser }
    } catch (error) {
      console.error('Update profile error:', error)
      return {
        ok: false,
        message: error.response?.data?.message || 'Impossible de sauvegarder les modifications.'
      }
    } finally {
      setLoading(false)
    }
  }

  // ==========================================
  // 4. DÉCONNEXION (LOGOUT)
  // ==========================================
  const logout = async () => {
    setLoading(true)
    try {
      // Appelle le backend pour invalider et supprimer le cookie HTTP-only
      await logoutUser()
    } catch (error) {
      console.error('Logout backend error:', error)
    } finally {
      // Nettoyage complet du frontend, quoi qu'il arrive
      setUser(null)
      writeStorage(AUTH_USER_KEY, null)
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom Hook pour consommer le contexte facilement dans tes composants
export function useAuth() {
  return useContext(AuthContext)
}