import React from 'react'
import { Link } from 'react-router-dom'
import palette from '../../theme/palette'

export default function AnimalCard({ animal }) {
  const colors = palette.colors
  return (
    <div style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }} className="overflow-hidden rounded-[28px] border shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div style={{ background: `linear-gradient(135deg, ${colors.primary.light}, ${colors.secondary.light})` }} className="relative flex h-44 items-center justify-center">
        <div className="absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: colors.text.secondary }}>Demande active</div>
        <div className="flex h-28 w-28 items-center justify-center rounded-full text-5xl shadow-xl" style={{ backgroundColor: colors.surface }}>🐾</div>
      </div>
      <div className="p-5">
        <h3 className="mb-1 text-xl font-bold" style={{ color: colors.text.primary }}>{animal.name}</h3>
        <p className="mb-3 text-sm leading-6" style={{ color: colors.text.secondary }}>
          {animal.description}
        </p>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>
          {animal.breed}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/animals/${animal.id}`}
            className="text-sm font-medium transition-colors"
            style={{ color: colors.primary.main }}
          >
            Détails
          </Link>
          <button style={{ background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.secondary.main})`, color: colors.text.white }} className="rounded-xl px-4 py-2 font-semibold shadow transition-colors">
            Demander
          </button>
        </div>
      </div>
    </div>
  );
}
