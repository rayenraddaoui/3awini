import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import palette from "../../theme/palette";
import { useAuth } from "../../hooks/useAuth";
import { postWorkRequest } from "../../api/workRequest"; // ◄◄ Import mis à jour

export default function RequestWork() {
  const colors = palette.colors;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const type = searchParams.get("type") === "animal" ? "animal" : "metier";

  const [form, setForm] = useState({
    title: "",
    specialty: "",
    description: "",
    location: "",
    phone: "", // Initialisé vide pour éviter les conflits avant le chargement de l'auth
    date: "",
  });

  // 1. Remplir le téléphone automatiquement dès que l'utilisateur est chargé/disponible
  useEffect(() => {
    if (user?.telephone) {
      setForm((prev) => ({ ...prev, phone: user.telephone }));
    }
  }, [user]);

  // 2. Réinitialiser le formulaire si l'utilisateur change de type dans l'URL (ex: animal -> metier)
  useEffect(() => {
    setForm({
      title: "",
      specialty: "",
      description: "",
      location: "",
      phone: user?.telephone || "",
      date: "",
    });
    setError("");
    setSuccess("");
  }, [type, user]);

  const labels = {
    metier: {
      badge: "Demande métier",
      title: "Rejoindre l'équipe comme technicien métier",
      subtitle: "Soumettez votre candidature afin de rejoindre l'équipe des techniciens.",
      titlePlaceholder: "Ex : Plombier professionnel",
      specialtyLabel: "Métier",
      options: ["Plombier", "Electricien", "Climatisation", "Mécanicien", "Peintre", "Autre"],
      description: "Décrivez votre expérience, vos compétences et vos disponibilités.",
    },
    animal: {
      badge: "Demande animalier",
      title: "Rejoindre l'équipe animale",
      subtitle: "Soumettez votre candidature afin de rejoindre l'équipe animalière.",
      titlePlaceholder: "Ex : Pet sitter",
      specialtyLabel: "Spécialité",
      options: ["Promenade", "Garde", "Soins", "Dressage", "Transport", "Autre"],
      description: "Décrivez votre expérience avec les animaux ainsi que vos disponibilités.",
    },
  };

  const content = labels[type];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.specialty || !form.description) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        type_demande: type,
        titre: form.title,
        specialite: form.specialty,
        description: form.description,
        localisation: form.location,
        telephone_contact: form.phone,
        date_souhaitee: form.date || null,
      };

      const response = await postWorkRequest(payload);

      if (response.success) {
        setSuccess("Votre demande a été envoyée avec succès.");
        setTimeout(() => {
          navigate("/dashboard/client");
        }, 1500);
      } else {
        setError(response.message || "Erreur lors de l'envoi.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Impossible d'envoyer votre demande."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* En-tête avec Flexbox pour aligner le titre et le nouveau bouton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <p className="text-sm font-bold uppercase" style={{ color: colors.primary.main }}>
            {content.badge}
          </p>
          <h2 className="text-3xl font-bold mt-2" style={{ color: colors.text.primary }}>
            {content.title}
          </h2>
          <p className="mt-3" style={{ color: colors.text.secondary }}>
            {content.subtitle}
          </p>
        </div>

        {/* ◄◄ NOUVEAU BOUTON : Voir mes demandes */}
        <div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/client/my-requests")} // Ajustez l'URL selon votre routeur
            className="px-4 py-2 rounded-xl border font-medium transition-all flex items-center gap-2 text-sm"
            style={{ 
              borderColor: colors.primary.main, 
              color: colors.primary.main,
              background: "transparent"
            }}
          >
            📋 Voir mes demandes
          </button>
        </div>
      </div>

      {error && <div className="mb-5 p-3 rounded bg-red-100 text-red-700">{error}</div>}
      {success && <div className="mb-5 p-3 rounded bg-green-100 text-green-700">{success}</div>}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border p-6"
        style={{
          background: colors.surface,
          borderColor: colors.borders.border,
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label style={{ color: colors.text.primary }}>Titre *</label>
            <input
              className="w-full border rounded p-2 mt-2 bg-transparent"
              style={{ borderColor: colors.borders.border, color: colors.text.primary }}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder={content.titlePlaceholder}
            />
          </div>

          <div>
            <label style={{ color: colors.text.primary }}>{content.specialtyLabel} *</label>
            <select
              className="w-full border rounded p-2 mt-2 bg-transparent"
              style={{ borderColor: colors.borders.border, color: colors.text.primary }}
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
            >
              <option value="" style={{ background: colors.surface }}>Choisir...</option>
              {content.options.map((item) => (
                <option key={item} value={item} style={{ background: colors.surface }}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: colors.text.primary }}>Localisation</label>
            <input
              className="w-full border rounded p-2 mt-2 bg-transparent"
              style={{ borderColor: colors.borders.border, color: colors.text.primary }}
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={{ color: colors.text.primary }}>Téléphone</label>
            <input
              className="w-full border rounded p-2 mt-2 bg-transparent"
              style={{ borderColor: colors.borders.border, color: colors.text.primary }}
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={{ color: colors.text.primary }}>Date souhaitée</label>
            <input
              type="date"
              className="w-full border rounded p-2 mt-2 bg-transparent"
              style={{ borderColor: colors.borders.border, color: colors.text.primary }}
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label style={{ color: colors.text.primary }}>Description *</label>
            <textarea
              rows={6}
              className="w-full border rounded p-2 mt-2 bg-transparent"
              style={{ borderColor: colors.borders.border, color: colors.text.primary }}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder={content.description}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading || !!success}
            className="px-5 py-2 rounded text-white font-medium"
            style={{
              background: colors.primary.main,
              opacity: loading || success ? 0.6 : 1,
              cursor: loading || success ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Envoi..." : success ? "Redirection..." : "Soumettre"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded border transition-colors"
            style={{ borderColor: colors.borders.border, color: colors.text.primary }}
          >
            Annuler
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}