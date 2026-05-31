import React from 'react'
import palette from '../../theme/palette'

export default function ServiceCard({ service }) {
  const colors = palette.colors
  return (
    <div style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }} className="overflow-hidden rounded-[28px] border shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div style={{ background: `linear-gradient(135deg, ${colors.secondary.light}, ${colors.primary.light})` }} className="px-5 py-6">
        <div className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: colors.text.secondary }}>Technicien</div>
        <h4 className="mt-4 text-xl font-bold" style={{ color: colors.text.primary }}>{service.title}</h4>
      </div>
      <div className="p-5">
        <p className="mb-4 text-sm leading-6" style={{ color: colors.text.secondary }}>{service.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-base font-semibold px-3 py-1 rounded-full" style={{ color: colors.secondary.main, backgroundColor: colors.secondary.light }}>{service.price} TND</span>
          <button style={{ background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.secondary.main})`, color: colors.text.white }} className="rounded-xl px-4 py-2 font-semibold shadow transition-colors">Contacter</button>
        </div>
      </div>
    </div>
  );
}
