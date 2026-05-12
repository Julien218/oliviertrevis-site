import { useState, useEffect } from "react";
import { Actualite } from "@/api/entities";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const CATEGORIES = ["Tous", "Annonce", "Concours", "Événement", "Résultat", "Communiqué", "Tour de Dour", "Candidature", "Partenaire"];

const catColors = {
  "Annonce": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Concours": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Événement": "bg-red-500/20 text-red-400 border-red-500/30",
  "Résultat": "bg-green-500/20 text-green-400 border-green-500/30",
  "Communiqué": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "Tour de Dour": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Candidature": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Partenaire": "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export default function ActualitesPage() {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cat, setCat] = useState("Tous");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Actualite.filter({ publie: true }).then(d => {
      const sorted = d.sort((a, b) => new Date(b.date_publication || b.created_date) - new Date(a.date_publication || a.created_date));
      setArticles(sorted);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(cat === "Tous" ? articles : articles.filter(a => a.categorie === cat));
  }, [articles, cat]);

  const alaune = articles.filter(a => a.a_la_une).slice(0, 1)[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-sm uppercase mb-4">Actualités</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white">Blog & Actualités</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Annonces, événements, résultats et nouvelles initiatives des projets d'Olivier Trevis.</p>
          </motion.div>
        </div>
      </section>

      {/* À LA UNE */}
      {alaune && (
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelected(alaune)}
              className="group cursor-pointer rounded-2xl bg-gray-900 border border-yellow-500/20 overflow-hidden hover:border-yellow-500/40 transition-all">
              <div className="grid md:grid-cols-2">
                {alaune.image_url && (
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img src={alaune.image_url} alt={alaune.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full border uppercase tracking-wider" style={{background:"#d4af3720", color:"#d4af37", borderColor:"#d4af3740"}}>
                      À la une
                    </span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border uppercase tracking-wider ${catColors[alaune.categorie] || ""}`}>{alaune.categorie}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{alaune.titre}</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">{alaune.extrait}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {alaune.date_publication ? new Date(alaune.date_publication).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" }) : ""}
                    </span>
                    <button className="flex items-center gap-1 text-yellow-400 font-medium ml-auto">
                      Lire la suite <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FILTRES */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === c ? "bg-yellow-500 text-black" : "border border-white/15 text-gray-400 hover:text-white"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LISTE */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-64 rounded-2xl bg-gray-900 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">Aucune actualité trouvée.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.filter(a => a.id !== alaune?.id).map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                  onClick={() => setSelected(a)}
                  className="group cursor-pointer rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 overflow-hidden transition-all">
                  {a.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={a.image_url} alt={a.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${catColors[a.categorie] || "border-gray-500/30 text-gray-400"}`}>{a.categorie}</span>
                      {a.date_publication && (
                        <span className="text-xs text-gray-500 ml-auto">{new Date(a.date_publication).toLocaleDateString("fr-BE")}</span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{a.titre}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{a.extrait}</p>
                    <button className="flex items-center gap-1 mt-4 text-yellow-400 text-sm font-medium">
                      Lire <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL article */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900 border border-white/10"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white">&times;</button>
            {selected.image_url && (
              <img src={selected.image_url} alt={selected.titre} className="w-full aspect-video object-cover rounded-t-2xl" />
            )}
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${catColors[selected.categorie] || ""}`}>{selected.categorie}</span>
                {selected.date_publication && (
                  <span className="text-xs text-gray-500">{new Date(selected.date_publication).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" })}</span>
                )}
              </div>
              <h2 className="text-2xl font-black text-white mb-4">{selected.titre}</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.contenu || selected.extrait}</div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
