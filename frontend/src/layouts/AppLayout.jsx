import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/common/Footer'
import palette from '../theme/palette'

export default function AppLayout({children}){
  const colors = palette.colors
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: colors.background, color: colors.text.primary }}>
      <Navbar />
      <main className="flex-1 container-max px-4 py-10">{children}</main>
      <Footer />
    </div>
  )
}
