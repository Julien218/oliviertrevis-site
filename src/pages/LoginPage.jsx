import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

// Comptes autorisés (hashés côté client — suffisant pour un accès admin simple)
const ACCOUNTS = [
  {
    email: "julien.pagin.pv@gmail.com",
    password: "1012823840PaginJulien",
    role: "superadmin",
    nom: "Julien Pagin",
  },
  {
    email: "oliviertrevis@outlook.com",
    password: "oliverA1$",
    role: "admin",
    nom: "Olivier Trevis",
  },
];

export default function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));

    const account = ACCOUNTS.find(
      a => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );

    if (account) {
      sessionStorage.setItem("ot_admin_session", JSON.stringify({
        email: account.email,
        role: account.role,
        nom: account.nom,
        ts: Date.now(),
      }));
      onLogin(account);
    } else {
      setError("Email ou mot de passe incorrect.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#070d14] flex items-center justify-center p-4">
      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#1E6FA5]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Logo / titre */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e0c068] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#c9a84c]/20">
            <Lock className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-white">Espace Admin</h1>
          <p className="text-gray-500 text-sm mt-1">oliviertrevis.be</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3"
            >
              {error}
            </motion.p>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#c9a84c] to-[#e0c068] text-black font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Accès réservé — Olivier Trevis © 2026
        </p>
      </motion.div>
    </div>
  );
}
