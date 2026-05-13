import { useState, useEffect } from "react";
import { Video } from "@/api/entities";
import { motion } from "framer-motion";
import { Play, ExternalLink, Search, Youtube, MapPin, Mic, Camera, ArrowRight, Send } from "lucide-react";
import { BRAND } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";
import { MessageContact } from "@/api/entities";
import { Link } from "react-router-dom";

const CHANNEL_URL = "https://www.youtube.com/@OlivierTrevis";
const CHANNEL_ID  = "UCsvdy3QcUvoPaho9pFSKIHg";

function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }

const CONCEPT_ITEMS = [
  { icon: <Camera className="w-5 h-5" />,  titre: "Visites de lieux",      desc: "Les endroits remarquables de Dour et ses alentours mis en lumière." },
  { icon: <Mic className="w-5 h-5" />,     titre: "Interviews",            desc: "Rencontres avec habitants, artisans, artistes et acteurs locaux." },
  { icon: <Play className="w-5 h-5" />,    titre: "Événements",            desc: "Couverture des événements culturels et associatifs de Dour." },
  { icon: <MapPin className="w-5 h-5" />,  titre: "Initiatives locales",   desc: "Mise en lumière des projets citoyens et innovations locales." },
];

// Extrait le numéro d'épisode du titre
function getEpisodeNum(titre) {
  const m = titre.match(/[ÉEé]pisode\s+(\d+)/i) || titre.match(/Episode\s+(\d+)/i);
  return m ? parseInt(m[1]) : null;
}

export default function TourDeDourPage() {
  const [videos, setVideos]     = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null); // vidéo ouverte en modal
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ prenom: "", nom: "", email: "", lieu: "", description: "", objet: "Tour de Dour", message: "", consentement_rgpd: false });
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);

  useEffect(() => {
    Video.filter({ categorie: "Tour de Dour", actif: true })
      .then(d => {
        // Trier par numéro d'épisode décroissant
        const sorted = d.sort((a, b) => {
          const na = getEpisodeNum(a.titre) || 0;
          const nb = getEpisodeNum(b.titre) || 0;
          if (nb !== na) return nb - na;
          return new Date(b.date_publication || 0) - new Date(a.date_publication || 0);
        });
        setVideos(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) { setFiltered(videos); return; }
    const q = search.toLowerCase();
    setFiltered(videos.filter(v =>
      v.titre?.toLowerCase().includes(q) || v.description?.toLowerCase().includes(q)
    ));
  }, [videos, search]);

  const handleProposer = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await MessageContact.create({
        prenom: form.prenom, nom: form.nom, email: form.email,
        objet: "Tour de Dour",
        message: `Lieu : ${form.lieu}\n\n${form.description}`,
        lu: false, repondu: false, consentement_rgpd: form.consentement_rgpd
      });
      setSent(true);
    } catch {}
    setSending(false);
  };

  const derniers = videos.slice(0, 3);

  return (
    <div className="min-h-screen text-white" style={{ background: BRAND.black }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${BRAND.navy} 0%, ${BRAND.black} 100%)` }} />
        <div className="absolute inset-0 opacity-12"
          style={{ background: "radial-gradient(ellipse at 40% 50%, #dc2626 0%, transparent 60%)" }} />
        {/* Pattern lignes subtiles */}
        <div className="absolute inset-0 opacity-4"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, ${BRAND.gold}30 40px, ${BRAND.gold}30 41px)` }} />

        <div className="relative max-w-4xl mx-auto text-center py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge YouTube */}
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 transition-all hover:opacity-80"
              style={{ background: "#ff000020", color: "#ff4444", border: "1px solid #ff444430" }}>
              <Youtube className="w-3.5 h-3.5" /> @OlivierTrevis · Chaîne YouTube officielle
            </a>

            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="text-white">Le Tour</span><br />
              <span style={{ background: "linear-gradient(135deg, #dc2626, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                de Dour
              </span>
            </h1>
            <div className="w-20 h-0.5 mx-auto mb-6"
              style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />
            <p className="text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: BRAND.silver }}>
              Une série de reportages, visites et interviews pour découvrir <strong className="text-white">Dour</strong> autrement —
              ses lieux, ses gens, ses histoires et ses initiatives. <strong className="text-white">{videos.length > 0 ? `${videos.length}+ épisodes` : "Des dizaines d'épisodes"}</strong> disponibles.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#episodes"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)", color: "#fff" }}>
                <Play className="w-4 h-4" /> Voir les épisodes
              </a>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
                style={{ border: "1px solid #dc262640", color: "#f87171", background: "#dc262608" }}
                onMouseEnter={e => e.currentTarget.style.background = "#dc262618"}
                onMouseLeave={e => e.currentTarget.style.background = "#dc262608"}>
                <Youtube className="w-4 h-4" /> Chaîne YouTube
              </a>
              <a href="#proposer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
                style={{ border: `1px solid ${BRAND.gold}30`, color: BRAND.gold, background: `${BRAND.gold}08` }}
                onMouseEnter={e => e.currentTarget.style.background = BRAND.gold + "15"}
                onMouseLeave={e => e.currentTarget.style.background = BRAND.gold + "08"}>
                <MapPin className="w-4 h-4" /> Proposer un lieu
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONCEPT ── */}
      <section className="py-16 px-4" style={{ background: BRAND.navy }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-3" style={{ color: BRAND.gold }}>Le concept</p>
            <h2 className="text-3xl font-black text-white">Découvrir Dour autrement</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {CONCEPT_ITEMS.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="text-center p-6 rounded-2xl"
                style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400"
                  style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.2)" }}>
                  {c.icon}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{c.titre}</h3>
                <p className="text-xs leading-relaxed" style={{ color: BRAND.silver, opacity: 0.7 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉPISODES ── */}
      <section id="episodes" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header + recherche + lien chaîne */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-2" style={{ color: "#f87171" }}>Tous les épisodes</p>
              <h2 className="text-3xl font-black text-white">
                {videos.length > 0 ? `${videos.length} épisodes disponibles` : "Épisodes du Tour de Dour"}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Rechercher un épisode..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-gray-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500/50 transition-colors w-64"
                  style={{ background: BRAND.navyLight }} />
              </div>
              {/* Lien chaîne YouTube */}
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "#ff0000", color: "#fff" }}
                onMouseEnter={e => e.currentTarget.style.background = "#cc0000"}
                onMouseLeave={e => e.currentTarget.style.background = "#ff0000"}>
                <Youtube className="w-4 h-4" /> Voir la chaîne
              </a>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl animate-pulse" style={{ background: BRAND.navyLight }}>
                  <div className="aspect-video rounded-t-2xl" style={{ background: BRAND.navy }} />
                  <div className="p-4 space-y-2">
                    <div className="h-3 rounded w-1/4" style={{ background: BRAND.navy }} />
                    <div className="h-4 rounded" style={{ background: BRAND.navy }} />
                    <div className="h-3 rounded w-2/3" style={{ background: BRAND.navy }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 rounded-2xl" style={{ background: BRAND.navyLight, border: "1px solid rgba(220,38,38,0.15)" }}>
              <Youtube className="w-12 h-12 mx-auto mb-4" style={{ color: "#f87171", opacity: 0.4 }} />
              <p className="font-bold text-white mb-2">
                {videos.length === 0 ? "Épisodes bientôt disponibles" : "Aucun résultat"}
              </p>
              <p className="text-sm mb-6" style={{ color: BRAND.silver, opacity: 0.6 }}>
                {videos.length === 0
                  ? "En attendant, retrouvez tous les épisodes directement sur YouTube."
                  : "Essayez un autre terme de recherche."}
              </p>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold"
                style={{ background: "#ff0000", color: "#fff" }}>
                <Youtube className="w-4 h-4" /> Voir sur YouTube
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((v, i) => {
                const thumb = v.miniature_url || `https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg`;
                const link  = v.youtube_url  || `https://www.youtube.com/watch?v=${v.youtube_id}`;
                const epNum = getEpisodeNum(v.titre);
                return (
                  <motion.div key={v.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.4) }} viewport={{ once: true }}
                    className="group rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
                    style={{ background: BRAND.navyLight, border: "1px solid rgba(220,38,38,0.12)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.12)"; e.currentTarget.style.transform = ""; }}>

                    {/* Miniature */}
                    <div className="aspect-video relative overflow-hidden flex-shrink-0 bg-gray-900">
                      <img src={thumb} alt={v.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {/* Overlay play */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.55)" }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                          style={{ background: "#ff0000" }}>
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      {/* Badge épisode */}
                      {epNum && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg text-xs font-black"
                          style={{ background: "#dc2626", color: "#fff" }}>
                          Ép. {epNum}
                        </div>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold" style={{ color: "#f87171" }}>Tour de Dour</span>
                        {v.date_publication && (
                          <span className="text-xs" style={{ color: BRAND.silver, opacity: 0.45 }}>
                            {new Date(v.date_publication).toLocaleDateString("fr-BE", { month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-sm line-clamp-2 mb-2 flex-1">{v.titre}</h3>
                      {v.description && (
                        <p className="text-xs line-clamp-2 mb-3" style={{ color: BRAND.silver, opacity: 0.6 }}>{v.description}</p>
                      )}
                      <a href={link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold transition-colors mt-auto"
                        style={{ color: "#f87171" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#fca5a5"}
                        onMouseLeave={e => e.currentTarget.style.color = "#f87171"}>
                        <Youtube className="w-3.5 h-3.5" /> Voir sur YouTube
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bouton voir plus sur YouTube */}
          {filtered.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-sm mb-4" style={{ color: BRAND.silver, opacity: 0.6 }}>
                Et bien d'autres épisodes disponibles sur la chaîne YouTube
              </p>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm transition-all hover:scale-105"
                style={{ background: "#ff0000", color: "#fff" }}>
                <Youtube className="w-4 h-4" /> Voir tous les épisodes sur YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── PROPOSER UN LIEU ── */}
      <section id="proposer" className="py-20 px-4" style={{ background: BRAND.navy }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-3" style={{ color: BRAND.gold }}>
              Contribuer
            </p>
            <h2 className="text-3xl font-black text-white mb-4">Proposer un lieu ou une initiative</h2>
            <p className="text-sm leading-relaxed" style={{ color: BRAND.silver, opacity: 0.75 }}>
              Vous connaissez un endroit, une personne ou une initiative qui mérite d'être mis en lumière dans le Tour de Dour ? Contactez-nous !
            </p>
          </div>

          {sent ? (
            <div className="text-center py-16 rounded-2xl"
              style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.2)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(220,38,38,0.12)", color: "#f87171" }}>
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Proposition envoyée !</h3>
              <p className="text-sm" style={{ color: BRAND.silver, opacity: 0.7 }}>Merci ! Olivier Trevis étudiera votre suggestion avec plaisir.</p>
            </div>
          ) : (
            <form onSubmit={handleProposer} className="space-y-4 p-7 rounded-2xl"
              style={{ background: "rgba(13,27,42,0.8)", border: `1px solid ${BRAND.gold}20` }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: BRAND.silver }}>Prénom *</label>
                  <input required value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={{ background: BRAND.navy, borderColor: BRAND.gold + "20" }}
                    onFocus={e => e.target.style.borderColor = BRAND.gold + "60"}
                    onBlur={e => e.target.style.borderColor = BRAND.gold + "20"} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: BRAND.silver }}>Nom *</label>
                  <input required value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={{ background: BRAND.navy, borderColor: BRAND.gold + "20" }}
                    onFocus={e => e.target.style.borderColor = BRAND.gold + "60"}
                    onBlur={e => e.target.style.borderColor = BRAND.gold + "20"} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: BRAND.silver }}>Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ background: BRAND.navy, borderColor: BRAND.gold + "20" }}
                  onFocus={e => e.target.style.borderColor = BRAND.gold + "60"}
                  onBlur={e => e.target.style.borderColor = BRAND.gold + "20"} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: BRAND.silver }}>Lieu ou initiative *</label>
                <input required value={form.lieu} onChange={e => setForm(f => ({ ...f, lieu: e.target.value }))}
                  placeholder="ex: La chapelle de Wihéries, L'école de musique de Dour..."
                  className="w-full border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-gray-600"
                  style={{ background: BRAND.navy, borderColor: BRAND.gold + "20" }}
                  onFocus={e => e.target.style.borderColor = BRAND.gold + "60"}
                  onBlur={e => e.target.style.borderColor = BRAND.gold + "20"} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: BRAND.silver }}>Décrivez votre proposition *</label>
                <textarea required rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Pourquoi ce lieu mérite-t-il d'être mis en valeur dans le Tour de Dour ?"
                  className="w-full border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors resize-none placeholder:text-gray-600"
                  style={{ background: BRAND.navy, borderColor: BRAND.gold + "20" }}
                  onFocus={e => e.target.style.borderColor = BRAND.gold + "60"}
                  onBlur={e => e.target.style.borderColor = BRAND.gold + "20"} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={form.consentement_rgpd}
                  onChange={e => setForm(f => ({ ...f, consentement_rgpd: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-red-500" />
                <span className="text-xs leading-relaxed" style={{ color: BRAND.silver, opacity: 0.65 }}>
                  J'accepte que mes données soient utilisées pour traiter cette proposition, conformément à la{" "}
                  <Link to="/mentions-legales" className="hover:underline" style={{ color: BRAND.gold }}>politique de confidentialité</Link>.
                </span>
              </label>
              <button type="submit" disabled={sending}
                className="w-full py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)", color: "#fff" }}>
                {sending ? "Envoi en cours..." : <><Send className="w-4 h-4" /> Envoyer ma proposition</>}
              </button>
            </form>
          )}

          {/* Lien Facebook */}
          <div className="mt-6 text-center">
            <p className="text-xs mb-3" style={{ color: BRAND.silver, opacity: 0.5 }}>Ou rejoignez la communauté sur Facebook</p>
            <a href={SOCIAL_LINKS.tourDeDour.facebook} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{ background: "#1877f215", color: "#1877f2", border: "1px solid #1877f230" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1877f225"}
              onMouseLeave={e => e.currentTarget.style.background = "#1877f215"}>
              <FbIcon /> Page Facebook du Tour de Dour
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
