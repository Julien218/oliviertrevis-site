import { useState, useEffect } from "react";
import { Photo } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const CATEGORIES = ["Tous", "Événements", "Concours", "ASBL", "Coulisses", "Archives", "Tour de Dour"];

export default function GaleriePage() {
  const [photos, setPhotos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cat, setCat] = useState("Tous");
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Photo.filter({ actif: true }).then(d => {
      setPhotos(d.sort((a, b) => new Date(b.date || b.created_date) - new Date(a.date || a.created_date)));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(cat === "Tous" ? photos : photos.filter(p => p.categorie === cat));
  }, [photos, cat]);

  const navigate = (dir) => {
    const idx = filtered.findIndex(p => p.id === lightbox.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return;
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, filtered]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-sm uppercase mb-4">Photos</p>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white">Galerie</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Les meilleurs moments des événements, concours et projets d'Olivier Trevis.</p>
          </motion.div>
        </div>
      </section>

      {/* FILTRES */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${cat === c ? "bg-yellow-500 text-black" : "border border-white/15 text-gray-400 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* GRILLE MASONRY */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="rounded-xl bg-gray-900 animate-pulse" style={{height: `${150 + (i % 3) * 80}px`}} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Galerie en cours de construction</h3>
              <p className="text-gray-400">Les photos des événements seront ajoutées prochainement.</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  onClick={() => setLightbox(p)}
                  className="group break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-all">
                  <div className="relative overflow-hidden">
                    <img src={p.url} alt={p.titre || ""} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      {p.titre && <p className="text-white text-sm font-medium">{p.titre}</p>}
                      {p.categorie && <p className="text-yellow-400 text-xs">{p.categorie}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10">
              <X className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10">
              <ChevronRight className="w-5 h-5" />
            </button>
            <motion.img key={lightbox.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={lightbox.url} alt={lightbox.titre || ""}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={e => e.stopPropagation()} />
            {(lightbox.titre || lightbox.categorie) && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center bg-black/60 rounded-xl px-6 py-3 backdrop-blur-sm">
                {lightbox.titre && <p className="text-white font-medium">{lightbox.titre}</p>}
                {lightbox.categorie && <p className="text-yellow-400 text-sm">{lightbox.categorie}</p>}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
