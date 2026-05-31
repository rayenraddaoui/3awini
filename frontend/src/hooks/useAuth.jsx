import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export function AuthProvider({ children }) {
  // Minimal in-memory auth context
  const [user, setUser] = useState(null)

  const login = (nextUser) => setUser(nextUser)
  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}