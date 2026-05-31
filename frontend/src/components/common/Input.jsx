import React from 'react'
import palette from '../../theme/palette'
export default function Input({className='', ...props}){
  const colors = palette.colors
  return (
    <input
      style={{ borderColor: colors.borders.input, color: colors.text.primary, backgroundColor: colors.surface }}
      className={`w-full px-4 py-2 border rounded-xl outline-none transition-all ${className}`}
      {...props}
    />
  )
}
