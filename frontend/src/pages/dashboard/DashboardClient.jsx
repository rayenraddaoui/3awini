import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import palette from '../../theme/palette';
import { getClientDashboard } from '../../api/client'; // ◄◄ Utilisation de ton service d'API dédié

export default function DashboardClient() {
  const colors = palette.colors;
  const [expandedId, setExpandedId] = useState(null);
  
  // États pour stocker les données dynamiques du backend
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ enCours: 0, traitees: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupération des données au chargement de la page
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Appel via ta fonction d'API centralisée
        const data = await getClientDashboard();
        
        if (data.success) {
          setRequests(data.recentRequests || []);
          setStats(data.stats || { enCours: 0, traitees: 0 });
        } else {
          setError('Erreur lors de la récupération des données.');
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Une erreur est survenue.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statusStyles = {
    'En attente': { backgroundColor: colors.status.warningLight, color: colors.text.primary },
    'Acceptée': { backgroundColor: colors.status.successLight, color: colors.text.primary },
    'Refusée': { backgroundColor: colors.status.errorLight, color: colors.text.primary },
  };

  const getStatusStyle = (status) => statusStyles[status] || statusStyles['En attente'];

  return (
    <DashboardLayout>
      {/* En-tête */}
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em]" style={{ color: colors.primary.main }}>Espace client</p>
        <h2 className="mt-2 text-3xl font-black" style={{ color: colors.text.primary }}>Vos demandes</h2>
        <p className="mt-3 max-w-3xl" style={{ color: colors.text.secondary }}>
          Suivez vos demandes en cours et lancez rapidement une nouvelle demande.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-100 text-red-700 font-medium">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        /* Spinner pendant le chargement */
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: colors.primary.main }}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          
          {/* Colonne de Gauche : Statistiques et Actions */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border p-4" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
                <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: colors.text.muted }}>En cours</div>
                <div className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>{stats.enCours}</div>
              </div>
              <div className="rounded-[1.5rem] border p-4" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
                <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: colors.text.muted }}>Traitées</div>
                <div className="mt-2 text-2xl font-black" style={{ color: colors.text.primary }}>{stats.traitees}</div>
              </div>
            </div>

            <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
              <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>Actions rapides</p>
              <div className="mt-4 flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link to="/animals" className="rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition hover:opacity-90" style={{ borderColor: colors.borders.border, backgroundColor: colors.background, color: colors.text.primary }}>
                    🐾 Demande animale
                  </Link>
                  <Link to="/services" className="rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition hover:opacity-90" style={{ borderColor: colors.borders.border, backgroundColor: colors.background, color: colors.text.primary }}>
                    🛠 Demande service
                  </Link>
                </div>

                <Link 
                  to="/dashboard/client/my-requests" 
                  className="rounded-2xl border px-4 py-3 text-center text-sm font-bold transition hover:opacity-90" 
                  style={{ 
                    borderColor: colors.primary.main, 
                    backgroundColor: `${colors.primary.main}10`, 
                    color: colors.primary.main 
                  }}
                >
                  📋 Voir mes demandes de recrutement
                </Link>
              </div>
            </div>
          </div>

          {/* Colonne de Droite : Liste Dynamique des Demandes */}
          <div className="rounded-[2rem] border p-6 shadow-sm2" style={{ backgroundColor: colors.surface, borderColor: colors.borders.border }}>
            <p className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: colors.primary.main }}>Demandes et statut</p>
            <div className="mt-4 space-y-4">
              {requests.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: colors.text.secondary }}>
                  Aucune demande classique enregistrée.
                </p>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="rounded-2xl border px-4 py-3" style={{ borderColor: colors.borders.border, backgroundColor: colors.background }}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        {/* Affiche la description ou un titre par défaut si absent */}
                        <div className="text-base font-bold" style={{ color: colors.text.primary }}>
                          {request.description ? request.description.substring(0, 25) + '...' : 'Demande de service'}
                        </div>
                        <div className="text-xs" style={{ color: colors.text.secondary }}>
                          {request.date_demande ? new Date(request.date_demande).toLocaleDateString('fr-FR') : 'Date inconnue'}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]" style={getStatusStyle(request.etat)}>
                          {request.etat}
                        </span>
                        <button
                          type="button"
                          className="text-xs font-bold uppercase tracking-[0.16em]"
                          style={{ color: colors.primary.main }}
                          onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                        >
                          {expandedId === request.id ? 'Masquer' : 'Détails'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Contenu rétractable */}
                    {expandedId === request.id && (
                      <div className="mt-3 rounded-xl border px-3 py-2 text-xs space-y-1" style={{ borderColor: colors.borders.border, color: colors.text.secondary, backgroundColor: colors.surface }}>
                        <p><strong>📍 Description complète :</strong> {request.description || "Aucun détail supplémentaire"}</p>
                        {request.service_id && <p><strong>🛠 Code Service (ID) :</strong> {request.service_id}</p>}
                        {request.technicien_id && <p><strong>🧑‍🔧 Technicien assigné (ID) :</strong> {request.technicien_id}</p>}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </DashboardLayout>
  );
}