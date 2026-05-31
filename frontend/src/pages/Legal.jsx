import React from 'react'
import AppLayout from '../layouts/AppLayout'
import palette from '../theme/palette'

export default function Legal() {
  const colors = palette.colors
  return (
    <AppLayout>
      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h2 className="mb-4 text-3xl font-bold" style={{ color: colors.text.primary }}>Mentions légales</h2>
        <p className="mb-2" style={{ color: colors.text.secondary }}>Ce site est édité par 3awini. Tous droits réservés.</p>
        <p style={{ color: colors.text.secondary }}>Pour toute demande légale, veuillez nous contacter à l’adresse : <span className="font-semibold" style={{ color: colors.secondary.main }}>legal@3awini.example</span></p>
      </div>
    </AppLayout>
  )
}
