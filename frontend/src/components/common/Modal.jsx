import React from 'react'
import palette from '../../theme/palette'
export default function Modal({open, onClose, children}){
  if(!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div style={{ backgroundColor: palette.colors.surface, borderColor: palette.colors.borders.border }} className="rounded-2xl p-6 max-w-lg w-full shadow-2xl border">
        <div className="flex justify-end"><button onClick={onClose} style={{ color: palette.colors.text.muted }} className="text-xl font-bold transition">✕</button></div>
        {children}
      </div>
    </div>
  )
}
