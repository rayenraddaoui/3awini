import React from 'react'
import AppLayout from '../layouts/AppLayout'
import palette from '../theme/palette'
export default function About() {
  const colors = palette.colors
  return (
    <AppLayout>
      <div className="mx-auto mt-8 max-w-3xl rounded-[2rem] border p-8 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
        <h2 className="mb-4 text-3xl font-black" style={{ color: colors.text.primary }}>À propos de 3awini</h2>
        <p className="mb-3 leading-7" style={{ color: colors.text.secondary }}>3awini relie les clients, les pet-sitters et les techniciens dans une application pilotée par un admin.</p>
        <p className="leading-7" style={{ color: colors.text.secondary }}>L'objectif est de simplifier les demandes d'animaux, la prise de contact avec les techniciens et la validation des comptes.</p>
      </div>
    </AppLayout>
  )
}
