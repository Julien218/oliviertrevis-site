import { useState, useEffect } from "react";
import { Video } from "@/api/entities";
import { motion } from "framer-motion";
import { Play, Search, ExternalLink, Filter } from "lucide-react";

const CATEGORIES = ["Tous", "ASBL", "Tour de Dour", "Miss & Mister Dour", "Fashionist'ART", "Interviews", "Concours", "Coulisses", "Archives"];

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cat, setCat] = useState("Tous");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Video.filter({ actif: true }).then(d => {
      setVideos(d.sort((a, b) => new Date(b.date_publication || 0) - new Date(a.date_publication || 0)));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let f = videos;
    if (cat !== "Tous") f = f.filter(v => v.categorie === cat);
    if (search) f = f.filter(v => v.titre?.toLowerCase().includes(search.toLowerCase()) || v.description?.toLowerCase().includes(search.toLowerCase()));
    setFiltered(f);
  }, [videos, cat, search]);

  const getYoutubeThumbnail = (v) => {
    if (v.miniature_url) return v.miniature_url;
    if (v.youtube_id) return `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`;
    return null;
  };

  const getYoutubeLink = (v) => {
    if (v.youtube_url) return v.youtube_url;
    if (v.youtube_id) return `https://youtube.com/watch?v=${v.youtube_id}`;
    return "#";
  };

  const catColors = {
    "Tour de Dour": "text-red-400",
    "Miss & Mister Dour": "text-yellow-400",
    "Fashionist'ART": "text-purple-400",
    "ASBL": "text-blue-400",
    "Interviews": "text-green-400",
    "Concours": "text-orange-400",
    "Coulisses": "text-pink-400",
    "Archives": "text-gray-400",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-red-400 tracking-[0.3em] text-sm uppercase mb-4">Médias</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white">Vidéos & Médias</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Toutes les vidéos YouTube des projets d'Olivier Trevis en un seul endroit.</p>
          </motion.div>
        </div>
      </section>

      {/* FILTRES */}
      <section className="sticky top-0 z-10 py-4 px-4 bg-gray-950/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" placeholder="Rechercher une vidéo..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50" />
            </div>
            {/* Catégories */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${cat === c ? "bg-yellow-500 text-black" : "border border-white/15 text-gray-400 hover:text-white"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDÉOS */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-500 text-sm mb-8">
            {filtered.length} vidéo{filtered.length !== 1 ? "s" : ""} {cat !== "Tous" ? `· ${cat}` : ""}
          </p>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl bg-gray-900 animate-pulse">
                  <div className="aspect-video bg-gray-800 rounded-t-xl" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-800 rounded w-1/3" />
                    <div className="h-4 bg-gray-800 rounded" />
                    <div className="h-3 bg-gray-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aucune vidéo trouvée</h3>
              <p className="text-gray-400">
                {videos.length === 0 ? "Les vidéos seront ajoutées prochainement." : "Essayez d'autres filtres ou termes de recherche."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((v, i) => {
                const thumb = getYoutubeThumbnail(v);
                const link = getYoutubeLink(v);
                return (
                  <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3) }} viewport={{ once: true }}
                    className="group rounded-xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 overflow-hidden transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gray-800 relative overflow-hidden">
                      {thumb ? (
                        <img src={thumb} alt={v.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-10 h-10 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium uppercase tracking-wider ${catColors[v.categorie] || "text-gray-400"}`}>{v.categorie}</span>
                        {v.date_publication && <span className="text-xs text-gray-500">{new Date(v.date_publication).toLocaleDateString("fr-BE")}</span>}
                      </div>
                      <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">{v.titre}</h3>
                      {v.description && <p className="text-gray-500 text-xs line-clamp-2 mb-3">{v.description}</p>}
                      <a href={link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors">
                        <ExternalLink className="w-3 h-3" /> Voir sur YouTube
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
