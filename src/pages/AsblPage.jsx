import { useState, useEffect } from "react";
import { Asbl } from "@/api/entities";
import { motion } from "framer-motion";
import { Mail, Phone, Globe, Images, Play, ArrowRight, Plus } from "lucide-react";

export default function AsblPage() {
  const [asbls, setAsbls] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Asbl.filter({ actif: true }).then(d => {
      setAsbls(d.sort((a, b) => (a.ordre || 99) - (b.ordre || 99)));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="absolute inset-0 opacity-10"
          style={{background: "radial-gradient(ellipse at 70% 50%, #1d4ed8 0%, transparent 60%)"}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-400 tracking-[0.3em] text-sm uppercase mb-4">Associatif & Culturel</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span style={{background: "linear-gradient(135deg, #60a5fa, #fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>ASBL</span>{" "}
              <span className="text-white">& Projets</span>
            </h1>
            <div className="w-24 h-px mx-auto mb-8" style={{background: "linear-gradient(90deg, transparent, #3b82f6, transparent)"}} />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Les associations et projets portés par Olivier Trevis au cœur de Dour, pour et avec les habitants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LISTE ASBL */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-gray-900 animate-pulse" />
              ))}
            </div>
          ) : asbls.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Projets à venir</h3>
              <p className="text-gray-400 max-w-md mx-auto">Les ASBL et projets associatifs seront présentés ici très prochainement. Revenez bientôt !</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {asbls.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="group rounded-2xl bg-gray-900 border border-white/5 hover:border-blue-500/30 overflow-hidden transition-all duration-300">
                  {/* Header */}
                  <div className="p-8 pb-4">
                    <div className="flex items-start gap-4 mb-4">
                      {a.logo_url ? (
                        <img src={a.logo_url} alt={a.nom} className="w-16 h-16 rounded-xl object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xl">
                          {a.nom?.charAt(0) || "A"}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-black text-white">{a.nom}</h3>
                        {a.mission && <p className="text-blue-400 text-sm mt-1">{a.mission}</p>}
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed line-clamp-3">{a.description}</p>
                  </div>

                  {/* Activités */}
                  {a.activites && (
                    <div className="px-8 pb-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Activités</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{a.activites}</p>
                    </div>
                  )}

                  {/* Photos preview */}
                  {a.photos?.length > 0 && (
                    <div className="px-8 pb-4">
                      <div className="flex gap-2">
                        {a.photos.slice(0, 3).map((p, pi) => (
                          <img key={pi} src={p} alt="" className="w-16 h-16 rounded-lg object-cover" />
                        ))}
                        {a.photos.length > 3 && (
                          <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 text-sm font-bold">
                            +{a.photos.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="px-8 py-4 border-t border-white/5 flex flex-wrap items-center gap-4">
                    {a.email_contact && (
                      <a href={`mailto:${a.email_contact}`} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors">
                        <Mail className="w-3 h-3" /> {a.email_contact}
                      </a>
                    )}
                    {a.telephone && (
                      <a href={`tel:${a.telephone}`} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors">
                        <Phone className="w-3 h-3" /> {a.telephone}
                      </a>
                    )}
                    {a.site_web && (
                      <a href={a.site_web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                        <Globe className="w-3 h-3" /> Site web
                      </a>
                    )}
                    <button onClick={() => setSelected(a)}
                      className="ml-auto flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900 border border-white/10 p-8"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
            <h2 className="text-2xl font-black text-white mb-2">{selected.nom}</h2>
            {selected.mission && <p className="text-blue-400 text-sm mb-4">{selected.mission}</p>}
            <div className="space-y-4 text-gray-300">
              {selected.description && <p>{selected.description}</p>}
              {selected.activites && (
                <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Activités</p><p>{selected.activites}</p></div>
              )}
            </div>
            {selected.videos?.length > 0 && (
              <div className="mt-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Vidéos</p>
                <div className="space-y-2">
                  {selected.videos.map((v, i) => (
                    <a key={i} href={v} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm">
                      <Play className="w-4 h-4" /> Voir la vidéo {i + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-6">
              {selected.email_contact && (
                <a href={`mailto:${selected.email_contact}`} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-all">
                  <Mail className="w-4 h-4" /> Contacter
                </a>
              )}
              {selected.site_web && (
                <a href={selected.site_web} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm hover:bg-white/10 transition-all">
                  <Globe className="w-4 h-4" /> Visiter le site
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
