import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Film, Newspaper, Users, Handshake, Trophy, Mail, Calendar, Crown, Trash2, Check, Sparkles, ChevronDown, ChevronUp, LogOut, ShieldCheck, Shield } from "lucide-react";
import LoginPage from "./LoginPage";

const API = "https://site-olivier-6b051d5a.base44.app/functions/adminData";

const fetchEntity = async (entity) => {
  const res = await fetch(`${API}?entity=${entity}`);
  if (!res.ok) throw new Error("Erreur API");
  return res.json();
};

const deleteEntity = async (entity, id) => {
  await fetch(`${API}?entity=${entity}&id=${id}`, { method: "DELETE" });
};

const updateEntity = async (entity, id, data) => {
  await fetch(`${API}?entity=${entity}&id=${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const SECTIONS = [
  { id: "MascotteReponse", label: "Mascotte — Réponses", icon: <Sparkles className="w-4 h-4" />, color: "text-orange-400" },
  { id: "MessageContact",  label: "Messages",            icon: <Mail className="w-4 h-4" />,     color: "text-blue-400" },
  { id: "Candidature",     label: "Candidatures",        icon: <Trophy className="w-4 h-4" />,   color: "text-yellow-400" },
  { id: "Actualite",       label: "Actualités",          icon: <Newspaper className="w-4 h-4" />,color: "text-green-400" },
  { id: "Video",           label: "Vidéos",              icon: <Film className="w-4 h-4" />,     color: "text-red-400" },
  { id: "Asbl",            label: "ASBL",                icon: <Users className="w-4 h-4" />,    color: "text-purple-400" },
  { id: "Partenaire",      label: "Partenaires",         icon: <Handshake className="w-4 h-4" />,color: "text-orange-400" },
  { id: "Laureat",         label: "Lauréats",            icon: <Crown className="w-4 h-4" />,    color: "text-yellow-400" },
  { id: "Evenement",       label: "Événements",          icon: <Calendar className="w-4 h-4" />, color: "text-pink-400" },
];

// Sections réservées au superadmin
const SUPERADMIN_ONLY = ["Actualite", "Video", "Asbl", "Partenaire", "Laureat", "Evenement"];

const profilColor = (profil = "") => {
  if (profil.includes("Minier")) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
  if (profil.includes("Nature")) return "bg-green-500/20 text-green-400 border-green-500/30";
  if (profil.includes("Festif")) return "bg-pink-500/20 text-pink-400 border-pink-500/30";
  if (profil.includes("Moderne")) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  return "bg-gray-700/50 text-gray-300 border-gray-600";
};

export default function AdminPage() {
  const [user, setUser]           = useState(null);
  const [section, setSection]     = useState("MascotteReponse");
  const [data, setData]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  // Vérifier session au démarrage
  useEffect(() => {
    const raw = sessionStorage.getItem("ot_admin_session");
    if (raw) {
      try {
        const session = JSON.parse(raw);
        // Session valide 8h
        if (Date.now() - session.ts < 8 * 60 * 60 * 1000) {
          setUser(session);
        } else {
          sessionStorage.removeItem("ot_admin_session");
        }
      } catch {}
    }
    setLoading(false);
  }, []);

  const handleLogin = (account) => setUser(account);

  const handleLogout = () => {
    sessionStorage.removeItem("ot_admin_session");
    setUser(null);
  };

  // Charger les données
  const load = async () => {
    setLoading(true);
    setData([]);
    try {
      const records = await fetchEntity(section);
      const sorted = [...records].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      setData(sorted);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { if (user) load(); }, [section, user]);

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet élément ?")) return;
    await deleteEntity(section, id);
    load();
  };

  const handleMarkRead = async (id) => {
    await updateEntity("MessageContact", id, { lu: true });
    load();
  };

  const handleStatus = async (id, statut) => {
    await updateEntity("Candidature", id, { statut });
    load();
  };

  // Sections visibles selon le rôle
  const visibleSections = user?.role === "superadmin"
    ? SECTIONS
    : SECTIONS.filter(s => !SUPERADMIN_ONLY.includes(s.id));

  // Afficher login si pas connecté
  if (!user && !loading) return <LoginPage onLogin={handleLogin} />;
  if (!user) return null;

  /* ── MASCOTTE ── */
  const renderMascotte = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total réponses", value: data.length,                                                 color: "text-white",     bg: "bg-white/5" },
          { label: "Esprit Minier",  value: data.filter(r => (r.profil||"").includes("Minier")).length,  color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Cœur Festif",   value: data.filter(r => (r.profil||"").includes("Festif")).length,   color: "text-pink-400",  bg: "bg-pink-500/10" },
          { label: "Vision Moderne", value: data.filter(r => (r.profil||"").includes("Moderne")).length, color: "text-blue-400",  bg: "bg-blue-500/10" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-white/5 text-center`}>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {data.length === 0 && !loading && (
        <div className="text-center py-16 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Aucune réponse reçue pour le moment.</p>
        </div>
      )}

      {/* Liste des réponses */}
      <div className="space-y-3">
        {data.map(r => (
          <div key={r.id} className="rounded-xl bg-gray-900/80 border border-white/5 overflow-hidden">
            {/* En-tête — toujours visible */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
              onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D47A2C] to-[#F0C982] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                  {(r.prenom || "?")[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white text-sm">
                      {r.prenom || "—"} {r.nom || ""}
                    </span>
                    {r.email && (
                      <a href={`mailto:${r.email}`} onClick={e => e.stopPropagation()}
                        className="text-[#1E6FA5] text-xs hover:underline truncate max-w-[180px]">
                        {r.email}
                      </a>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    🕐 {r.created_date ? new Date(r.created_date).toLocaleString("fr-BE", {
                      day: "2-digit", month: "2-digit", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    }) : "—"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {expandedId === r.id
                  ? <ChevronUp className="w-4 h-4 text-gray-500" />
                  : <ChevronDown className="w-4 h-4 text-gray-500" />}
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(r.id); }}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Détail dépliable */}
            {expandedId === r.id && (
              <div className="border-t border-white/5 p-4 space-y-3">
                {/* Identité complète */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">👤 Prénom</div>
                    <div className="text-sm text-white font-medium">{r.prenom || "—"}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">👤 Nom</div>
                    <div className="text-sm text-white font-medium">{r.nom || "—"}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">✉️ Email</div>
                    <a href={`mailto:${r.email}`} className="text-sm text-[#1E6FA5] hover:underline">{r.email || "—"}</a>
                  </div>
                </div>

                {/* Date/heure */}
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">🕐 Date & heure de soumission</div>
                  <div className="text-sm text-gray-200">
                    {r.created_date ? new Date(r.created_date).toLocaleString("fr-BE", {
                      weekday: "long", day: "2-digit", month: "long", year: "numeric",
                      hour: "2-digit", minute: "2-digit", second: "2-digit"
                    }) : "—"}
                  </div>
                </div>

                {/* 4 réponses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { q: "Q1 — Mots qui décrivent Dour",   v: r.reponse_mots,     emoji: "💬" },
                    { q: "Q2 — Lieux incontournables",      v: r.reponse_lieux,    emoji: "📍" },
                    { q: "Q3 — Créature symbolique",        v: r.reponse_creature, emoji: "🦅" },
                    { q: "Q4 — Vision de la mascotte",      v: r.reponse_mascotte, emoji: "🎭" },
                  ].map(f => (
                    <div key={f.q} className="bg-black/40 border border-white/5 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">{f.emoji} {f.q}</div>
                      <div className="text-sm text-gray-100 leading-relaxed">{f.v || <span className="italic text-gray-600">Sans réponse</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  /* ── MESSAGES ── */
  const renderMessages = () => (
    <div className="space-y-4">
      {data.length === 0 && !loading && <p className="text-center text-gray-500 py-12">Aucun message.</p>}
      {data.map(m => (
        <div key={m.id} className={`p-5 rounded-xl border transition-all ${m.lu ? "bg-gray-900 border-white/5" : "bg-blue-500/5 border-blue-500/20"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-white">{m.prenom} {m.nom}</span>
                {!m.lu && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Nouveau</span>}
                {m.objet && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">{m.objet}</span>}
              </div>
              <p className="text-gray-400 text-sm">{m.email}{m.telephone ? ` · ${m.telephone}` : ""}</p>
              <p className="text-gray-300 text-sm mt-2">{m.message}</p>
              <p className="text-gray-600 text-xs mt-2">{m.created_date ? new Date(m.created_date).toLocaleString("fr-BE") : ""}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {!m.lu && (
                <button onClick={() => handleMarkRead(m.id)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"><Check className="w-4 h-4" /></button>
              )}
              <a href={`mailto:${m.email}`} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20"><Mail className="w-4 h-4" /></a>
              <button onClick={() => handleDelete(m.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  /* ── CANDIDATURES ── */
  const renderCandidatures = () => (
    <div className="space-y-4">
      {data.length === 0 && !loading && <p className="text-center text-gray-500 py-12">Aucune candidature.</p>}
      {data.map(c => (
        <div key={c.id} className="p-5 rounded-xl bg-gray-900 border border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-white">{c.prenom} {c.nom}</span>
                {c.concours && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">{c.concours}</span>}
                <span className={`text-xs px-2 py-0.5 rounded-full ${c.statut === "Acceptée" ? "bg-green-500/20 text-green-400" : c.statut === "Refusée" ? "bg-red-500/20 text-red-400" : "bg-gray-700 text-gray-300"}`}>{c.statut || "En attente"}</span>
              </div>
              <p className="text-gray-400 text-sm">{c.email}{c.ville ? ` · ${c.ville}` : ""}{c.annee ? ` · ${c.annee}` : ""}</p>
              {c.motivation && <p className="text-gray-300 text-sm mt-2 line-clamp-2">{c.motivation}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleStatus(c.id, "Acceptée")} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-medium">Accepter</button>
              <button onClick={() => handleStatus(c.id, "Refusée")} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium">Refuser</button>
              <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  /* ── GÉNÉRIQUE ── */
  const renderGeneric = () => (
    <div className="space-y-3">
      {data.length === 0 && !loading && <p className="text-center text-gray-500 py-12">Aucune entrée.</p>}
      {data.map(item => (
        <div key={item.id} className="p-4 rounded-xl bg-gray-900 border border-white/5 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{item.titre || item.nom || item.prenom_nom || item.id}</p>
            <p className="text-gray-500 text-xs mt-0.5">{item.created_date ? new Date(item.created_date).toLocaleString("fr-BE") : ""}</p>
          </div>
          <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#D47A2C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
    if (section === "MascotteReponse") return renderMascotte();
    if (section === "MessageContact")  return renderMessages();
    if (section === "Candidature")     return renderCandidatures();
    return renderGeneric();
  };

  const currentSection = SECTIONS.find(s => s.id === section);

  return (
    <div className="min-h-screen bg-[#070d14] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-black/40 border-r border-white/5 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <h1 className="text-lg font-bold text-white">Admin</h1>
          <p className="text-xs text-gray-500 mt-0.5">oliviertrevis.be</p>
        </div>

        {/* Profil connecté */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${user.role === "superadmin" ? "bg-[#c9a84c]/20" : "bg-blue-500/20"}`}>
              {user.role === "superadmin"
                ? <ShieldCheck className="w-3.5 h-3.5 text-[#c9a84c]" />
                : <Shield className="w-3.5 h-3.5 text-blue-400" />}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.nom}</p>
              <p className={`text-xs ${user.role === "superadmin" ? "text-[#c9a84c]" : "text-blue-400"}`}>
                {user.role === "superadmin" ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visibleSections.map(s => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                section === s.id ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={section === s.id ? s.color : ""}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
          <p className="text-xs text-gray-700 text-center mt-2">JS-Innov.IA © 2026</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className={currentSection?.color}>{currentSection?.icon}</span>
              <h2 className="text-xl font-bold">{currentSection?.label}</h2>
              {!loading && <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{data.length}</span>}
            </div>
            <button onClick={load} className="text-xs text-gray-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
              ↻ Rafraîchir
            </button>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
