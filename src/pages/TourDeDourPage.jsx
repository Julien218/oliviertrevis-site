import { useState, useEffect } from "react";
import { Video, Actualite } from "@/api/entities";
import { motion } from "framer-motion";
import { Play, MapPin, Camera, Mic, ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function TourDeDourPage() {
  const [videos, setVideos] = useState([]);
  const [actualites, setActualites] = useState([]);
  const [proposition, setProposition] = useState({ nom: "", email: "", lieu: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Video.filter({ categorie: "Tour de Dour", actif: true }).then(setVideos).catch(() => {});
    Actualite.filter({ categorie: "Tour de Dour", publie: true }).then(d => setActualites(d.slice(0, 3))).catch(() => {});
  }, []);

  const types = [
    { icon: <Camera className="w-6 h-6" />, titre: "Visites de lieux", desc: "Découverte des endroits remarquables de Dour et ses alentours" },
    { icon: <Mic className="w-6 h-6" />, titre: "Interviews", desc: "Rencontres avec des habitants, artisans, artistes et acteurs locaux" },
    { icon: <Play className="w-6 h-6" />, titre: "Événements", desc: "Couverture des événements culturels et associatifs de Dour" },
    { icon: <MapPin className="w-6 h-6" />, titre: "Initiatives locales", desc: "Mise en lumière des projets citoyens et innovations locales" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        <div className="absolute inset-0 opacity-10"
          style={{background: "radial-gradient(ellipse at 30% 50%, #dc2626 0%, transparent 60%)"}} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-red-400 tracking-[0.3em] text-sm uppercase mb-4">Vidéos & Découvertes</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="text-white">Le Tour</span>{" "}
              <span style={{background: "linear-gradient(135deg, #dc2626, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>de Dour</span>
            </h1>
            <div className="w-24 h-px mx-auto mb-8" style={{background: "linear-gradient(90deg, transparent, #dc2626, transparent)"}} />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Une série de vidéos, visites, interviews et reportages pour découvrir 
              <strong className="text-white"> Dour</strong> autrement — ses lieux, ses gens, ses histoires et ses initiatives.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#videos" className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-700 to-red-600 text-white font-bold rounded-full hover:from-red-600 hover:to-red-500 transition-all">
                <Play className="w-4 h-4" /> Voir les vidéos
              </a>
              <a href="#proposer" className="flex items-center gap-2 px-8 py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-full transition-all">
                <MapPin className="w-4 h-4" /> Proposer un lieu
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-yellow-400 tracking-widest text-sm uppercase mb-3">Le concept</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Découvrir Dour autrement</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {types.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gray-900 border border-white/5">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400">{t.icon}</div>
                <h3 className="text-white font-bold mb-2">{t.titre}</h3>
                <p className="text-gray-400 text-sm">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDÉOS */}
      <section id="videos" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-red-400 tracking-widest text-sm uppercase mb-2">Épisodes</p>
              <h2 className="text-3xl font-black text-white">Les vidéos</h2>
            </div>
            <Link to="/videos" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2 text-sm">
              Toutes les vidéos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-gray-900 border border-white/5">
              <Play className="w-16 h-16 text-red-400/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Épisodes à venir</h3>
              <p className="text-gray-400">Les prochains épisodes du Tour de Dour seront ajoutés ici. Restez connecté !</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v, i) => (
                <motion.a key={i} href={v.youtube_url || `https://youtube.com/watch?v=${v.youtube_id}`} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="group rounded-2xl bg-gray-900 border border-white/5 hover:border-red-500/30 overflow-hidden transition-all">
                  <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    <img src={v.miniature_url || `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`} alt={v.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-red-400 font-medium uppercase tracking-wider mb-1">
                      {v.date_publication ? new Date(v.date_publication).toLocaleDateString("fr-BE") : ""}
                    </p>
                    <h3 className="text-white font-bold line-clamp-2">{v.titre}</h3>
                    {v.description && <p className="text-gray-400 text-sm mt-2 line-clamp-2">{v.description}</p>}
                    <div className="flex items-center gap-1 mt-3 text-red-400 text-sm font-medium">
                      Voir sur YouTube <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ACTUALITÉS */}
      {actualites.length > 0 && (
        <section className="py-16 px-4 bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-8">Dernières actualités Tour de Dour</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {actualites.map((a, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gray-900 border border-white/5">
                  <span className="text-xs text-red-400 font-medium uppercase tracking-wider">{a.categorie}</span>
                  <h3 className="text-white font-bold mt-2 mb-2">{a.titre}</h3>
                  <p className="text-gray-400 text-sm">{a.extrait}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROPOSER UN LIEU */}
      <section id="proposer" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-yellow-400 tracking-widest text-sm uppercase mb-3">Participez</p>
            <h2 className="text-3xl font-black text-white">Proposer un lieu ou une initiative</h2>
            <p className="text-gray-400 mt-4">Vous connaissez un endroit, une personne ou une initiative qui mérite d'être mis en avant ? Dites-le nous !</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 rounded-2xl bg-gray-900 border border-green-500/20">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Proposition envoyée !</h3>
              <p className="text-gray-400">Merci ! Nous étudierons votre proposition avec plaisir.</p>
            </div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              // Enregistrer comme message contact
              try {
                const { MessageContact } = await import("@/api/entities");
                await MessageContact.create({
                  prenom: proposition.nom, nom: "", email: proposition.email,
                  objet: "Autre", message: `Proposition Tour de Dour - Lieu: ${proposition.lieu}\n\n${proposition.description}`,
                  consentement_rgpd: true, lu: false, repondu: false
                });
                setSubmitted(true);
              } catch {}
            }} className="space-y-4 p-8 rounded-2xl bg-gray-900 border border-red-500/20">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Votre nom</label>
                <input type="text" value={proposition.nom} onChange={e => setProposition(p => ({...p, nom: e.target.value}))}
                  required className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <input type="email" value={proposition.email} onChange={e => setProposition(p => ({...p, email: e.target.value}))}
                  required className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Lieu ou initiative</label>
                <input type="text" value={proposition.lieu} onChange={e => setProposition(p => ({...p, lieu: e.target.value}))}
                  required placeholder="Nom du lieu, de la personne ou de l'initiative..."
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Description</label>
                <textarea value={proposition.description} onChange={e => setProposition(p => ({...p, description: e.target.value}))}
                  rows={4} required placeholder="Décrivez pourquoi cela mérite d'être mis en avant..."
                  className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 resize-none" />
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-red-700 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-500 transition-all">
                Envoyer ma proposition
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
