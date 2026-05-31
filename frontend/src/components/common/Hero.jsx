import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import palette from '../../theme/palette';
export default function Hero() {
  const colors = palette.colors
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 py-10">
      <div className="flex flex-col items-start text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ backgroundColor: colors.secondary.light, color: colors.secondary.main }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: colors.secondary.main }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: colors.secondary.main }}></span>
          </span>
          Nouveau : Services de garde à domicile
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight" style={{ color: colors.text.primary }}>
          Trouvez un <span style={{ color: colors.primary.main }}>compagnon</span> ou un <span style={{ color: colors.secondary.main }}>service</span> de confiance
        </h1>
        <p className="text-xl leading-relaxed max-w-lg mb-10" style={{ color: colors.text.secondary }}>
          Réservez des services et gérez vos demandes facilement avec <span className="font-extrabold" style={{ color: colors.primary.main }}>3awini</span>, la plateforme pensée pour les parcours animaliers et techniques.
        </p>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <Link to="/animals">
            <Button className="px-8 py-4 text-lg">Voir les animaux</Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary" className="px-8 py-4 text-lg border" style={{ color: colors.primary.main, borderColor: colors.primary.light }}>Nos services</Button>
          </Link>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full blur-3xl -z-10 animate-pulse" style={{ background: `linear-gradient(135deg, ${colors.primary.main}1A, ${colors.secondary.main}1A)` }}></div>
        <div className="relative group">
          <div className="absolute -inset-4 rounded-full opacity-20 group-hover:opacity-30 blur transition duration-1000 group-hover:duration-200" style={{ background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.secondary.main})` }}></div>
          <div className="rounded-full w-72 h-72 md:w-96 md:h-96 flex items-center justify-center shadow-2xl relative border-8" style={{ backgroundColor: colors.surface, borderColor: colors.surface }}>
            <span className="text-8xl md:text-[10rem] animate-bounce-slow">🐾</span>
          </div>
          <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl shadow-xl border animate-float" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs" style={{ backgroundColor: colors.primary.light, borderColor: colors.surface }}>🐶</div>
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs" style={{ backgroundColor: colors.secondary.light, borderColor: colors.surface }}>🐱</div>
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs" style={{ backgroundColor: colors.status.warningLight, borderColor: colors.surface }}>🐰</div>
              </div>
              <div className="text-sm">
                <p className="font-bold" style={{ color: colors.text.primary }}>+500</p>
                <p className="text-xs" style={{ color: colors.text.muted }}>Animaux heureux</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
