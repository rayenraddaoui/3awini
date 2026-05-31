import React from 'react'
import palette from '../../theme/palette'

export default function SearchBar({placeholder='Rechercher...'}){
  const colors = palette.colors
  return (
    <div
      className="flex items-center rounded-xl overflow-hidden shadow-sm transition-all"
      style={{ backgroundColor: colors.surface, borderColor: colors.borders.border, borderWidth: '1px' }}
    >
      <input
        className="px-4 py-2 outline-none bg-transparent focus:ring-0"
        placeholder={placeholder}
        type="text"
        style={{ color: colors.text.primary }}
      />
    </div>
  );
}
