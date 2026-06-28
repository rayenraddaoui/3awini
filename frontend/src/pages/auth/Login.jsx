import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";
import palette from "../../theme/palette";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loading } = useAuth();

  const colors = palette.colors;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const result = await login({
      email,
      password,
    });

    if (!result.ok) {
      setError(result.message || "Email ou mot de passe incorrect.");
      return;
    }

    switch (result.user.role) {
      case "admin":
        navigate("/dashboard/admin");
        break;

      case "client":
        navigate("/dashboard/client");
        break;

      case "technicien":
        navigate("/dashboard/technicien");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <AppLayout>
      <div
        className="mx-auto max-w-md rounded-[2rem] border p-8 shadow-sm2"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.borders.border,
        }}
      >
        <h2
          className="text-2xl font-black"
          style={{ color: colors.text.primary }}
        >
          Connexion
        </h2>

        <p
          className="mt-2 text-sm"
          style={{ color: colors.text.secondary }}
        >
          Connectez-vous à votre compte 3awini.
        </p>

        <form
          className="mt-6 space-y-5"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {successMessage && (
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                backgroundColor: colors.status.successLight,
                color: colors.status.successDark,
              }}
            >
              {successMessage}
            </div>
          )}

          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                backgroundColor: colors.status.errorLight,
                color: colors.status.errorDark,
              }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-3"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p
            className="text-sm"
            style={{ color: colors.text.secondary }}
          >
            Vous n'avez pas encore de compte ?
          </p>

          <Link
            to="/register"
            className="mt-2 inline-block font-bold"
            style={{ color: colors.primary.main }}
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}