import React from 'react'
import palette from '../../theme/palette'
export default function Card({children, className=''}){
  return (
    <div
      style={{ backgroundColor: colors.surface, borderColor: colors.borders.border, color: colors.text.primary }}
      className={`rounded-2xl p-6 shadow-lg border ${className}`}
    >
      {children}
    </div>
  )
}
