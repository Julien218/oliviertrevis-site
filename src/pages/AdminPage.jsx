import { useState, useEffect } from "react";
import { Video, Actualite, Asbl, Partenaire, Candidature, MessageContact, Evenement, Photo, Laureat, MascotteReponse } from "@/api/entities";
import { motion } from "framer-motion";
import { Film, Newspaper, Users, Handshake, Trophy, Mail, Calendar, Camera, Crown, Plus, Trash2, Edit3, Eye, Check, X, Sparkles } from "lucide-react";

const SECTIONS = [
  { id: "messages", label: "Messages", icon: <Mail className="w-4 h-4" />, color: "text-blue-400" },
  { id: "candidatures", label: "Candidatures", icon: <Trophy className="w-4 h-4" />, color: "text-yellow-400" },
  { id: "mascotte", label: "Mascotte — Réponses", icon: <Sparkles className="w-4 h-4" />, color: "text-orange-400" },
  { id: "actualites", label: "Actualités", icon: <Newspaper className="w-4 h-4" />, color: "text-green-400" },
  { id: "videos", label: "Vidéos", icon: <Film className="w-4 h-4" />, color: "text-red-400" },
  { id: "asbls", label: "ASBL", icon: <Users className="w-4 h-4" />, color: "text-purple-400" },
  { id: "partenaires", label: "Partenaires", icon: <Handshake className="w-4 h-4" />, color: "text-orange-400" },
  { id: "laureats", label: "Lauréats", icon: <Crown className="w-4 h-4" />, color: "text-yellow-400" },
  { id: "evenements", label: "Événements", icon: <Calendar className="w-4 h-4" />, color: "text-pink-400" },
];

export default function AdminPage() {
  const [section, setSection] = useState("messages");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const map = {
        messages: () => MessageContact.list(),
        candidatures: () => Candidature.list(),
        mascotte: () => MascotteReponse.list(),
        actualites: () => Actualite.list(),
        videos: () => Video.list(),
        asbls: () => Asbl.list(),
        partenaires: () => Partenaire.list(),
        laureats: () => Laureat.list(),
        evenements: () => Evenement.list(),
      };
      const d = await map[section]();
      setData(d.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [section]);

  const deleteItem = async (id) => {
    if (!confirm("Supprimer cet élément ?")) return;
    const map = {
      messages: MessageContact,
      candidatures: Candidature,
      mascotte: MascotteReponse,
      actualites: Actualite,
      videos: Video,
      asbls: Asbl,
      partenaires: Partenaire,
      laureats: Laureat,
      evenements: Evenement,
    };
    await map[section].delete(id);
    loadData();
  };

  const markRead = async (id) => {
    await MessageContact.update(id, { lu: true });
    loadData();
  };

  const updateStatus = async (id, statut) => {
    await Candidature.update(id, { statut });
    loadData();
  };

  const renderMessages = () => (
    <div className="space-y-4">
      {data.map(m => (
        <div key={m.id} className={`p-5 rounded-xl border transition-all ${m.lu ? "bg-gray-900 border-white/5" : "bg-blue-500/5 border-blue-500/20"}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white">{m.prenom} {m.nom}</span>
                {!m.lu && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Nouveau</span>}
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">{m.objet}</span>
              </div>
              <p className="text-gray-400 text-sm">{m.email} {m.telephone ? `· ${m.telephone}` : ""}</p>
              <p className="text-gray-300 text-sm mt-2">{m.message}</p>
              <p className="text-gray-600 text-xs mt-2">{new Date(m.created_date).toLocaleString("fr-BE")}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {!m.lu && (
                <button onClick={() => markRead(m.id)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all" title="Marquer lu">
                  <Check className="w-4 h-4" />
                </button>
              )}
              <a href={`mailto:${m.email}`} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all" title="Répondre">
                <Mail className="w-4 h-4" />
              </a>
              <button onClick={() => deleteItem(m.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCandidatures = () => (
    <div className="space-y-4">
      {data.map(c => (
        <div key={c.id} className="p-5 rounded-xl bg-gray-900 border border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white">{c.prenom} {c.nom}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">{c.concours}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  c.statut === "Acceptée" ? "bg-green-500/20 text-green-400" :
                  c.statut === "Refusée" ? "bg-red-500/20 text-red-400" :
                  "bg-gray-700 text-gray-300"}`}>{c.statut}</span>
              </div>
              <p className="text-gray-400 text-sm">{c.email} · {c.ville} · {c.annee}</p>
              {c.motivation && <p className="text-gray-300 text-sm mt-2 line-clamp-2">{c.motivation}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => updateStatus(c.id, "Acceptée")} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-medium transition-all">Accepter</button>
              <button onClick={() => updateStatus(c.id, "Refusée")} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-all">Refuser</button>
              <button onClick={() => deleteItem(c.id)} className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 transition-all">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const profilColor = (profil = "") => {
    if (profil.includes("Minier")) return "bg-amber-500/20 text-amber-400";
    if (profil.includes("Nature")) return "bg-green-500/20 text-green-400";
    if (profil.includes("Festif")) return "bg-pink-500/20 text-pink-400";
    if (profil.includes("Moderne")) return "bg-blue-500/20 text-blue-400";
    return "bg-gray-700 text-gray-300";
  };

  const renderMascotte = () => {
    // Stats globales
    const profilCounts = {};
    data.forEach(r => {
      const p = r.profil || "Inconnu";
      profilCounts[p] = (profilCounts[p] || 0) + 1;
    });

    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total réponses", value: data.length, color: "text-white", bg: "bg-gray-900" },
            { label: "Esprit Minier", value: data.filter(r => (r.profil||"").includes("Minier")).length, color: "text-amber-400", bg: "bg-amber-500/10" },
            { label: "Coeur Festif", value: data.filter(r => (r.profil||"").includes("Festif")).length, color: "text-pink-400", bg: "bg-pink-500/10" },
            { label: "Vision Moderne", value: data.filter(r => (r.profil||"").includes("Moderne")).length, color: "text-blue-400", bg: "bg-blue-500/10" },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-white/5 text-center`}>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Liste des réponses */}
        <div className="space-y-3">
          {data.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Aucune réponse reçue pour le moment.</p>
            </div>
          )}
          {data.map(r => (
            <div key={r.id} className="rounded-xl bg-gray-900 border border-white/5 overflow-hidden">
              {/* Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/3 transition-colors"
                onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-black font-bold text-sm">
                    {(r.prenom || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{r.prenom || "Anonyme"}</span>
                      {r.email && <span className="text-gray-500 text-xs">{r.email}</span>}
                    </div>
                    <div className="text-gray-600 text-xs">{new Date(r.created_date).toLocaleString("fr-BE")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${profilColor(r.profil)}`}>
                    {r.profil || "—"}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); deleteItem(r.id); }} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <span className="text-gray-500 text-xs">{expandedId === r.id ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Détail dépliable */}
              {expandedId === r.id && (
                <div className="border-t border-white/5 p-4 space-y-3 bg-black/20">
                  {[
                    { label: "🗺️ Mots qui évoquent Dour", value: r.reponse_mots },
                    { label: "📍 Lieux emblématiques", value: r.reponse_lieux },
                    { label: "🐾 Créature / animal", value: r.reponse_creature },
                    { label: "🎭 Idée de mascotte", value: r.reponse_mascotte },
                    { label: "💬 Message libre", value: r.reponse_libre },
                  ].map(({ label, value }) => value ? (
                    <div key={label}>
                      <div className="text-xs text-gray-500 mb-1">{label}</div>
                      <div className="text-sm text-gray-200 bg-white/5 rounded-lg px-3 py-2">{value}</div>
                    </div>
                  ) : null)}
                  <div className="flex gap-4 pt-1 text-xs text-gray-600">
                    <span>RGPD : {r.consentement_rgpd ? "✅ Accepté" : "❌ Non"}</span>
                    <span>Session : {r.session_id?.slice(0, 12)}…</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGeneric = () => {
    const fields = {
      actualites: ["titre", "extrait", "categorie", "publie", "a_la_une"],
      videos: ["titre", "youtube_id", "categorie", "a_la_une", "actif"],
      asbls: ["nom", "mission", "actif"],
      partenaires: ["nom", "categorie", "site_web", "actif"],
      laureats: ["prenom_nom", "titre", "concours", "annee"],
      evenements: ["titre", "date_debut", "lieu", "categorie", "actif"],
    };
    const cols = fields[section] || ["id"];
    return (
      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              {cols.map(c => (
                <th key={c} className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">{c}</th>
              ))}
              <th className="px-4 py-3 text-right text-xs text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map(item => (
              <tr key={item.id} className="hover:bg-gray-900/50 transition-colors">
                {cols.map(c => (
                  <td key={c} className="px-4 py-3 text-sm text-gray-300">
                    {typeof item[c] === "boolean" ? (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item[c] ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {item[c] ? "Oui" : "Non"}
                      </span>
                    ) : (
                      <span className="line-clamp-1">{String(item[c] || "-")}</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-950 border-b border-white/5 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black text-white">Dashboard Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Gestion du site Olivier Trevis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${section === s.id ? "bg-yellow-500/10 text-yellow-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                <span className={section === s.id ? "text-yellow-400" : s.color}>{s.icon}</span>
                {s.label}
                <span className="ml-auto text-xs text-gray-600">{section === s.id && !loading ? data.length : ""}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">
              {SECTIONS.find(s => s.id === section)?.label}
              {!loading && <span className="ml-2 text-sm font-normal text-gray-500">({data.length})</span>}
            </h2>
            <button onClick={loadData} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 text-xs transition-all">
              ↻ Actualiser
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
            </div>
          ) : data.length === 0 && section !== "mascotte" ? (
            <div className="text-center py-20 text-gray-600">
              <p>Aucun élément pour le moment.</p>
            </div>
          ) : (
            <>
              {section === "messages" && renderMessages()}
              {section === "candidatures" && renderCandidatures()}
              {section === "mascotte" && renderMascotte()}
              {!["messages", "candidatures", "mascotte"].includes(section) && renderGeneric()}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
