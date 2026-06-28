import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';
import Button from '../../components/common/Button';
import palette from '../../theme/palette';

export default function Home() {
  const { colors } = palette;

  return (
    <AppLayout>
      <section 
        className="relative overflow-hidden rounded-[2.5rem] border px-6 py-10 shadow-sm md:px-10 md:py-14" 
        style={{ 
          borderColor: colors.borders.border, 
          backgroundColor: colors.surface 
        }}
      >
        {/* Fond décoratif */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            background: `radial-gradient(circle at top left, ${colors.primary.main}1F, transparent 35%), radial-gradient(circle at top right, ${colors.secondary.main}1F, transparent 30%)` 
          }} 
        />

        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Colonne de gauche : Texte */}
          <div>
            <div 
              className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur" 
              style={{ 
                borderColor: colors.borders.border, 
                backgroundColor: 'rgba(255,255,255,0.80)', 
                color: colors.text.secondary 
              }}
            >
              Deux parcours, en une seule app
            </div>
            
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl" style={{ color: colors.text.primary }}>
              Promenades, pet-sitting et techniciens validés
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg leading-8 md:text-xl" style={{ color: colors.text.secondary }}>
              Le client publie une demande avec description. Le pet-sitter ou le technicien y répond.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/animals">
                <Button className="px-6 py-4 text-base">Demander un service animal</Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" className="px-6 py-4 text-base text-primary">
                  Voir les techniciens disponibles
                </Button>
              </Link>
            </div>

            {/* Grille des rôles */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Client', text: 'Crée une demande détaillée' },
                { title: 'Pet-sitter', text: 'Prend en charge la garde ou la promenade' },
                { title: 'Technicien', text: 'Répond aux demandes de service' },
              ].map((item) => (
                <div 
                  key={item.title} 
                  className="rounded-2xl border p-4 shadow-sm backdrop-blur" 
                  style={{ borderColor: colors.borders.border, backgroundColor: 'rgba(255,255,255,0.80)' }}
                >
                  <div className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-6" style={{ color: colors.text.secondary }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne de droite : Cartes de services */}
          <div className="grid gap-4">
            <ServiceCard 
              title="Animaux" 
              description="Demande de promenade ou de garde avec description de l'animal, attente d'acceptation, puis suivi par le pet-sitter." 
              emoji="🐕" 
              color={colors.primary.light}
              colors={colors}
            />
            <ServiceCard 
              title="Techniciens" 
              description="Le client consulte les techniciens présents et les contacte dans l'application, puis l'admin contrôle les demandes de rejoindre la plateforme." 
              emoji="🛠️" 
              color={colors.secondary.light}
              colors={colors}
            />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

// Composant enfant pour éviter la répétition
function ServiceCard({ title, description, emoji, color, colors }) {
  return (
    <div 
      className="rounded-[2rem] border p-6 shadow-lg" 
      style={{ borderColor: colors.borders.border, backgroundColor: colors.surface }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: colors.text.muted }}>Parcours</p>
          <h2 className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>{title}</h2>
        </div>
        <div className="rounded-2xl px-4 py-3 text-3xl" style={{ backgroundColor: color }}>{emoji}</div>
      </div>
      <p className="mt-4 text-sm leading-7" style={{ color: colors.text.secondary }}>{description}</p>
    </div>
  );
}