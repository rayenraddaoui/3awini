import React from 'react'
import palette from '../../theme/palette'
export default function Loader(){
  return (
    <div className="flex items-center justify-center py-12">
      <div style={{ borderColor: colors.primary.main, borderTopColor: 'transparent' }} className="w-12 h-12 border-4 rounded-full animate-spin shadow-lg"></div>
    </div>
  )
}
