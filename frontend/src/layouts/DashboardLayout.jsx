import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import palette from '../theme/palette'

export default function DashboardLayout({children}){
  const colors = palette.colors
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.background, color: colors.text.primary }}>
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="container-max p-6 md:p-8">{children}</div>
      </div>
    </div>
  )
}
