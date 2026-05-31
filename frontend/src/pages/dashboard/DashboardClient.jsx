import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import palette from '../../theme/palette'

export default function DashboardClient(){
  const colors = palette.colors
  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.primary.main }}>Espace client</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Demandes d'animaux et services</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>Demandes récentes</div>
        <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>Historique des contacts</div>
      </div>
    </DashboardLayout>
  )
}
