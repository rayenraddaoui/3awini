import React from 'react'
import AppLayout from '../layouts/AppLayout'
import palette from '../theme/palette'

export default function Contact() {
  const colors = palette.colors
  return (
    <AppLayout>
      <div className="mx-auto mt-8 max-w-3xl rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h2 className="mb-4 text-3xl font-black" style={{ color: colors.text.primary }}>Contact</h2>
        <p className="mb-4 leading-7" style={{ color: colors.text.secondary }}>Pour toute question ou demande de collaboration, contacte l'équipe 3awini ici.</p>
        <div className="font-semibold" style={{ color: colors.primary.main }}>contact@3awini.example</div>
      </div>
    </AppLayout>
  )
}
