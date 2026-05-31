import React from 'react'
import palette from '../../theme/palette';
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60'
  const variantClass = variant === 'outline'
    ? 'border border-border bg-transparent hover:bg-background'
    : variant === 'secondary'
      ? 'border hover:opacity-95'
      : 'shadow-md hover:opacity-95'

  const colors = palette.colors
  const variantStyle = variant === 'outline'
    ? { borderColor: colors.borders.border, color: colors.text.primary }
    : variant === 'secondary'
      ? { backgroundColor: colors.secondary.light, color: colors.primary.main, borderColor: colors.primary.light }
    : { backgroundColor: colors.primary.main, color: colors.text.white, boxShadow: '0 6px 18px rgba(37,99,235,0.20)' }

  return (
    <button className={`${base} ${variantClass} ${className}`} style={variantStyle} {...props}>
      {children}
    </button>
  );
}
