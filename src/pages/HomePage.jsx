import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Video, Actualite, Evenement } from "@/api/entities";
import { motion } from "framer-motion";
import { ArrowRight, Play, Trophy, MapPin, Star, ChevronDown } from "lucide-react";

export default function HomePage() {
  const [actualites, setActualites] = useState([]);
  const [evenements, setEvenements] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Actualite.filter({ a_la_une: true, publie: true }).then(d => setActualites(d.slice(0, 3))).catch(() => {});
    Evenement.filter({ a_la_une: true, actif: true }).then(d => setEvenements(d.slice(0, 3))).catch(() => {});
    Video.filter({ a_la_une: true, actif: true }).then(d => setVideos(d.slice(0, 4))).catch(() => {});
  }, []);

  const projects = [
    {
      title: "Miss & Mister Dour",
      subtitle: "Fashionist'ART",
      desc: "Élégance, créativité, inclusion et art local",
      icon: <Trophy className="w-8 h-8" />,
      href: "/miss-mister-dour",
      color: "from-yellow-900/80 to-black",
      accent: "#d4af37"
    },
    {
      title: "Le Tour de Dour",
      subtitle: "Vidéos & Découvertes",
      desc: "Visites, interviews, lieux et initiatives locales",
      icon: <MapPin className="w-8 h-8" />,
      href: "/tour-de-dour",
      color: "from-red-900/80 to-black",
      accent: "#dc2626"
    },
    {
      title: "ASBL & Projets",
      subtitle: "Associatif & Culturel",
      desc: "Projets associatifs au cœur de Dour",
      icon: <Star className="w-8 h-8" />,
      href: "/asbl",
      color: "from-blue-900/80 to-black",
      accent: "#1d4ed8"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <div className="absolute inset-0 opacity-20"
          style={{background: "radial-gradient(ellipse at 20% 50%, #d4af3730 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #dc262630 0%, transparent 60%)"}}
        />
        {/* Decorative lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute h-px opacity-10"
              style={{
                background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                top: `${20 + i * 15}%`, left: 0, right: 0,
                transform: `rotate(${-2 + i}deg)`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-yellow-400 tracking-[0.3em] text-sm font-light mb-4 uppercase">Acteur local · Associatif · Événementiel</p>
            <h1 className="text-6xl md:text-8xl font-black mb-2 tracking-tight">
              <span className="text-white">Olivier</span>
            </h1>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
              style={{background: "linear-gradient(135deg, #d4af37, #fff8e1, #d4af37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
              Trevis
            </h1>
            <div className="w-24 h-px mx-auto mb-6" style={{background: "linear-gradient(90deg, transparent, #d4af37, transparent)"}} />
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Acteur engagé au cœur de <strong className="text-white">Dour</strong>. 
              Porteur de projets culturels, associatifs et événementiels pour valoriser les talents et les initiatives locales.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/asbl" className="group flex items-center gap-2 px-8 py-3 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 rounded-full transition-all duration-300 font-medium">
                Découvrir les projets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tour-de-dour" className="group flex items-center gap-2 px-8 py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-300 font-medium">
                <Play className="w-4 h-4" /> Le Tour de Dour
              </Link>
              <Link to="/miss-mister-dour" className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-full hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300">
                <Trophy className="w-4 h-4" /> Miss & Mister Dour
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* PROJETS PRINCIPAUX */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-yellow-400 tracking-widest text-sm uppercase mb-3">Ses engagements</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Projets & Initiatives</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Link to={p.href} className={`block relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${p.color} p-8 hover:border-white/30 transition-all duration-300 group`}>
                  <div className="mb-4" style={{ color: p.accent }}>{p.icon}</div>
                  <h3 className="text-2xl font-black text-white mb-1">{p.title}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: p.accent }}>{p.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: p.accent }}>
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDÉOS RÉCENTES */}
      {videos.length > 0 && (
        <section className="py-20 px-4 bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-red-400 tracking-widest text-sm uppercase mb-2">Médias</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">Dernières vidéos</h2>
              </div>
              <Link to="/videos" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2 text-sm font-medium">
                Toutes les vidéos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {videos.map((v, i) => (
                <motion.a key={i} href={v.youtube_url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl bg-gray-900 border border-white/5 hover:border-yellow-500/30 transition-all duration-300">
                  <div className="aspect-video bg-gray-800 overflow-hidden relative">
                    {v.miniature_url ? (
                      <img src={v.miniature_url} alt={v.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : v.youtube_id ? (
                      <img src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`} alt={v.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">{v.categorie}</span>
                    <h4 className="text-white font-semibold text-sm mt-1 line-clamp-2">{v.titre}</h4>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ACTUALITÉS */}
      {actualites.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-blue-400 tracking-widest text-sm uppercase mb-2">Actualités</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">À la une</h2>
              </div>
              <Link to="/actualites" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2 text-sm font-medium">
                Toutes les actualités <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {actualites.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="group rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/20 overflow-hidden transition-all duration-300">
                  {a.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={a.image_url} alt={a.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">{a.categorie}</span>
                    <h3 className="text-white font-bold text-lg mt-2 mb-2 line-clamp-2">{a.titre}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{a.extrait}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA CONTACT */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{background: "radial-gradient(ellipse at center, #d4af3715 0%, transparent 70%)"}} />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Un projet ? Une initiative ?</h2>
          <p className="text-gray-400 text-lg mb-10">Vous souhaitez collaborer, rejoindre un projet ou devenir partenaire ? Prenons contact.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-black rounded-full text-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300">
            Nous contacter <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
