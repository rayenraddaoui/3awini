import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import palette from "../../theme/palette";
import { getMyWorkRequests } from "../../api/workRequest"; // ◄◄ Appel à ton API mis à jour

export default function MyRequests() {
  const colors = palette.colors;
  const navigate = useNavigate();
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charger les demandes au montage du composant
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await getMyWorkRequests();
        if (response.success) {
          setRequests(response.requests || []);
        } else {
          setError("Impossible de récupérer vos demandes.");
        }
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Une erreur est survenue lors du chargement."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Fonction utilitaire pour gérer la couleur des badges d'état
  const getStatusStyle = (status) => {
    switch (status) {
      case "en_attente":
        return { bg: "bg-amber-100 text-amber-700", label: "En attente" };
      case "accepte":
        return { bg: "bg-green-100 text-green-700", label: "Acceptée" };
      case "refuse":
        return { bg: "bg-red-100 text-red-700", label: "Refusée" };
      default:
        return { bg: "bg-gray-100 text-gray-700", label: status };
    }
  };

  return (
    <DashboardLayout>
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text.primary }}>
            Mes Demandes de Recrutement
          </h2>
          <p className="mt-2 text-sm" style={{ color: colors.text.secondary }}>
            Suivez l'état d'avancement de vos candidatures pour rejoindre l'équipe.
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl border text-sm font-medium transition-colors self-start sm:self-center"
          style={{ borderColor: colors.borders.border, color: colors.text.primary }}
        >
          ⬅ Retour
        </button>
      </div>

      {/* Messages d'erreur */}
      {error && (
        <div className="mb-5 p-4 rounded-xl bg-red-100 text-red-700 font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* État de chargement (Skeleton ou Spinner simple) */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div 
            className="animate-spin rounded-full h-10 w-10 border-b-2"
            style={{ borderColor: colors.primary.main }}
          ></div>
        </div>
      ) : requests.length === 0 ? (
        /* État vide si aucune demande */
        <div 
          className="text-center py-16 rounded-2xl border border-dashed p-8"
          style={{ borderColor: colors.borders.border, background: colors.surface }}
        >
          <p className="text-xl font-medium" style={{ color: colors.text.secondary }}>
            Vous n'avez soumis aucune demande pour le moment.
          </p>
          <button
            onClick={() => navigate("/dashboard/client/request-work")} // Redirige vers ton formulaire
            className="mt-4 px-5 py-2 rounded-xl text-white font-medium text-sm transition-transform active:scale-95"
            style={{ background: colors.primary.main }}
          >
            Créer une demande
          </button>
        </div>
      ) : (
        /* Liste des demandes sous forme de grille */
        <div className="grid gap-6 md:grid-cols-2">
          {requests.map((req) => {
            const status = getStatusStyle(req.etat);
            return (
              <div
                key={req.id}
                className="rounded-2xl border p-6 flex flex-col justify-between transition-shadow hover:shadow-md"
                style={{
                  background: colors.surface,
                  borderColor: colors.borders.border,
                }}
              >
                <div>
                  {/* Badge Type & Badge Statut */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span 
                      className="text-xs font-bold uppercase px-2.5 py-1 rounded-md tracking-wider"
                      style={{ background: `${colors.primary.main}15`, color: colors.primary.main }}
                    >
                      {req.type_demande === "animal" ? "🐾 Animalier" : "🛠 Métier"}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.bg}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Titre & Spécialité */}
                  <h3 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                    {req.titre}
                  </h3>
                  <p className="text-sm font-medium mt-1" style={{ color: colors.primary.main }}>
                    Spécialité : {req.specialite}
                  </p>

                  {/* Description */}
                  <p className="text-sm mt-3 line-clamp-3" style={{ color: colors.text.secondary }}>
                    {req.description}
                  </p>
                </div>

                {/* Métadonnées en bas de carte */}
                <div className="mt-6 pt-4 border-t grid grid-cols-2 gap-2 text-xs" style={{ borderColor: colors.borders.border }}>
                  <div style={{ color: colors.text.secondary }}>
                    📍 <span className="font-medium" style={{ color: colors.text.primary }}>{req.localisation || "Non spécifiée"}</span>
                  </div>
                  <div className="text-right" style={{ color: colors.text.secondary }}>
                    📅 Souhaitée : <span className="font-medium" style={{ color: colors.text.primary }}>
                      {req.date_souhaitee ? new Date(req.date_souhaitee).toLocaleDateString("fr-FR") : "Dès que possible"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}