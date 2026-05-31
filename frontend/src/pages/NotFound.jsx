import React from 'react'
import AppLayout from '../layouts/AppLayout'
import palette from '../theme/palette'
export default function NotFound(){
  const colors = palette.colors
  return (
    <AppLayout>
      <div className="py-20 text-center">
        <h2 className="text-3xl font-black" style={{ color: colors.text.primary }}>404 — Page introuvable</h2>
      </div>
    </AppLayout>
  )
}
