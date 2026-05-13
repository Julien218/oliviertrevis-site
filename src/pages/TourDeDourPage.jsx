import { useState, useEffect } from "react";
import { Video, MessageContact } from "@/api/entities";
import { motion } from "framer-motion";
import { Play, ExternalLink, Search, Youtube, MapPin, Mic, Camera, Send, Wind, Star } from "lucide-react";
import { BRAND, TDD, LOGO_TDD } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";
import { Link } from "react-router-dom";

const CHANNEL_URL = "https://www.youtube.com/@OlivierTrevis";

// ── Google Fonts pour les typos officielles ──────────────────────────────────
// Montserrat Bold = LE TOUR DE DOUR | Great Vibes = Olivier Trevis (script)
function TDDFonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Great+Vibes&display=swap');
      .font-tdd        { font-family: 'Montserrat', sans-serif; font-weight: 800; letter-spacing: 0.05em; }
      .font-tdd-script { font-family: 'Great Vibes', cursive; }

      /* Couleurs TDD */
      .tdd-orange { color: ${TDD.orange}; }
      .tdd-amber  { color: ${TDD.amber};  }
      .tdd-blue   { color: ${TDD.blue};   }
      .tdd-cream  { color: ${TDD.cream};  }

      /* Badge épisode */
      .badge-ep {
        background: linear-gradient(135deg, ${TDD.orange}, ${TDD.amber});
        color: ${TDD.night};
        font-family: 'Montserrat', sans-serif;
        font-weight: 800;
      }

      /* Carte vidéo hover */
      .video-card {
        border: 1.5px solid ${TDD.orange}20;
        background: linear-gradient(160deg, ${TDD.nightMid} 0%, ${TDD.night} 100%);
        transition: all 0.3s ease;
      }
      .video-card:hover {
        border-color: ${TDD.orange}60;
        transform: translateY(-3px);
        box-shadow: 0 8px 30px ${TDD.orange}18;
      }

      /* Lueur dorée sur le logo */
      .logo-glow {
        filter: drop-shadow(0 0 30px ${TDD.amber}40) drop-shadow(0 0 60px ${TDD.orange}20);
      }

      /* Fond hero avec texture étoilée */
      .hero-stars {
        background-image:
          radial-gradient(circle at 20% 30%, ${TDD.blue}15 0%, transparent 30%),
          radial-gradient(circle at 80% 20%, ${TDD.amber}10 0%, transparent 25%),
          radial-gradient(circle at 50% 70%, ${TDD.orange}08 0%, transparent 40%);
      }

      /* Scrollbar TDD */
      ::-webkit-scrollbar-thumb { background: ${TDD.orange}40; }
    `}</style>
  );
}

function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }

const CONCEPT_ITEMS = [
  { icon: <Camera className="w-5 h-5" />,  titre: "Visites de lieux",   desc: "Lieux remarquables et patrimoine de Dour mis en lumière.", color: TDD.orange },
  { icon: <Mic className="w-5 h-5" />,     titre: "Interviews",         desc: "Rencontres avec habitants, artisans et acteurs locaux.",  color: TDD.blue   },
  { icon: <Play className="w-5 h-5" />,    titre: "Événements",         desc: "Couverture des événements culturels de Dour.",            color: TDD.amber  },
  { icon: <Wind className="w-5 h-5" />,    titre: "Initiatives",        desc: "Projets citoyens et innovations locales.",                color: TDD.blue   },
];

function getEpisodeNum(titre) {
  const m = titre.match(/[ÉEé]pisode\s+(\d+)/i) || titre.match(/Episode\s+(\d+)/i);
  return m ? parseInt(m[1]) : null;
}

// ── Composant : en-tête logotype TDD ────────────────────────────────────────
function TDDLogotype({ size = "md" }) {
  const bigTitle  = size === "lg" ? "text-5xl md:text-7xl" : "text-3xl";
  const subScript = size === "lg" ? "text-4xl md:text-6xl" : "text-2xl";
  return (
    <div className="text-center">
      <p className={`font-tdd text-white ${bigTitle} leading-tight tracking-widest uppercase`}>
        LE TOUR <span className="text-sm md:text-2xl font-tdd tracking-widest" style={{ color: TDD.amber }}>de</span> DOUR
      </p>
      <p className={`font-tdd-script ${subScript} mt-1`} style={{ color: TDD.amber }}>
        Olivier Trevis
      </p>
    </div>
  );
}

// ── Composant : séparateur doré ──────────────────────────────────────────────
function GoldSep() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-16 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${TDD.orange})` }} />
      <Star className="w-3 h-3" style={{ color: TDD.amber }} fill={TDD.amber} />
      <div className="h-px w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${TDD.orange}, transparent)` }} />
    </div>
  );
}

export default function TourDeDourPage() {
  const [videos, setVideos]     = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ prenom: "", nom: "", email: "", lieu: "", description: "", consentement_rgpd: false });
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);

  useEffect(() => {
    Video.filter({ categorie: "Tour de Dour", actif: true })
      .then(d => {
        const sorted = d.sort((a, b) => {
          const na = getEpisodeNum(a.titre) || 0;
          const nb = getEpisodeNum(b.titre) || 0;
          if (nb !== na) return nb - na;
          return new Date(b.date_publication || 0) - new Date(a.date_publication || 0);
        });
        setVideos(sorted);
        setFiltered(sorted);
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
        objet: "Tour de Dour — Proposition de lieu",
        message: `Lieu / Initiative : ${form.lieu}\n\n${form.description}`,
        lu: false, repondu: false, consentement_rgpd: form.consentement_rgpd
      });
      setSent(true);
    } catch {}
    setSending(false);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: TDD.night }}>
      <TDDFonts />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden hero-stars">
        {/* Fond nuit profonde */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${TDD.nightMid} 0%, ${TDD.night} 100%)` }} />

        {/* Halo orangé/doré en bas à droite — comme sur le logo */}
        <div className="absolute -bottom-10 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${TDD.amber} 0%, ${TDD.orange} 40%, transparent 70%)` }} />
        {/* Halo bleu à gauche */}
        <div className="absolute top-0 -left-10 w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${TDD.blue} 0%, transparent 70%)` }} />

        {/* Étoiles décoratives */}
        {[
          { top: "15%", left: "8%",  size: 3 },
          { top: "25%", right: "12%", size: 2 },
          { top: "40%", left: "15%", size: 2 },
          { top: "60%", right: "20%", size: 3 },
          { top: "10%", left: "40%", size: 2 },
          { top: "70%", left: "5%",  size: 2 },
        ].map((s, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none animate-pulse"
            style={{ top: s.top, left: s.left, right: s.right, width: s.size, height: s.size, background: TDD.amber, opacity: 0.6, animationDelay: `${i * 0.5}s` }} />
        ))}

        <div className="relative max-w-4xl mx-auto text-center py-24 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }}
            className="mb-8">
            {/* Logo TDD officiel */}
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden logo-glow"
              style={{ border: `3px solid ${TDD.goldRim}60` }}>
              <img src={LOGO_TDD} alt="Le Tour de Dour" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Logotype officiel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <h1 className="font-tdd text-white text-5xl md:text-7xl leading-tight tracking-widest uppercase">
              LE TOUR <span className="font-tdd tracking-widest" style={{ color: TDD.amber, fontSize: "0.55em" }}>de</span> DOUR
            </h1>
            <p className="font-tdd-script mt-1 text-5xl md:text-6xl" style={{ color: TDD.amber }}>
              Olivier Trevis
            </p>
          </motion.div>

          <GoldSep />

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-base leading-relaxed max-w-2xl mb-8"
            style={{ color: TDD.cream, opacity: 0.8 }}>
            Une série de reportages, visites et interviews pour découvrir{" "}
            <strong style={{ color: TDD.amber }}>Dour</strong> autrement — ses lieux, ses gens, ses histoires.
            {videos.length > 0 && (
              <span style={{ color: TDD.orange }}> {videos.length} épisodes disponibles.</span>
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 justify-center">
            <a href="#episodes"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-tdd text-sm transition-all hover:scale-105 uppercase tracking-wider"
              style={{ background: `linear-gradient(135deg, ${TDD.orange}, ${TDD.amber})`, color: TDD.night }}>
              <Play className="w-4 h-4" fill="currentColor" /> Voir les épisodes
            </a>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
              style={{ border: `1.5px solid ${TDD.orange}50`, color: TDD.amber, background: `${TDD.orange}10` }}
              onMouseEnter={e => e.currentTarget.style.background = TDD.orange + "20"}
              onMouseLeave={e => e.currentTarget.style.background = TDD.orange + "10"}>
              <Youtube className="w-4 h-4" /> Chaîne YouTube
            </a>
            <a href="#proposer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
              style={{ border: `1.5px solid ${TDD.blue}50`, color: TDD.blue, background: `${TDD.blue}10` }}
              onMouseEnter={e => e.currentTarget.style.background = TDD.blue + "20"}
              onMouseLeave={e => e.currentTarget.style.background = TDD.blue + "10"}>
              <MapPin className="w-4 h-4" /> Proposer un lieu
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONCEPT
      ════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ background: TDD.nightMid }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase font-tdd tracking-[0.35em] mb-2" style={{ color: TDD.amber }}>Le concept</p>
            <h2 className="font-tdd text-3xl text-white uppercase tracking-wide">Découvrir Dour autrement</h2>
            <GoldSep />
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {CONCEPT_ITEMS.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="text-center p-6 rounded-2xl"
                style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}>
                  {c.icon}
                </div>
                <h3 className="font-tdd text-white text-xs uppercase tracking-widest mb-2">{c.titre}</h3>
                <p className="text-xs leading-relaxed" style={{ color: TDD.cream, opacity: 0.6 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GRILLE ÉPISODES
      ════════════════════════════════════════ */}
      <section id="episodes" className="py-20 px-4" style={{ background: TDD.night }}>
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase font-tdd tracking-[0.35em] mb-2" style={{ color: TDD.amber }}>
                Tous les épisodes
              </p>
              <h2 className="font-tdd text-3xl text-white uppercase tracking-wide">
                {videos.length > 0 ? `${videos.length} épisodes` : "Les épisodes"}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: TDD.amber, opacity: 0.5 }} />
                <input type="text" placeholder="Rechercher..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none transition-colors w-56"
                  style={{ background: TDD.nightMid, borderColor: TDD.orange + "30", color: TDD.cream }}
                  onFocus={e => e.target.style.borderColor = TDD.amber + "70"}
                  onBlur={e => e.target.style.borderColor = TDD.orange + "30"} />
              </div>
              {/* YouTube */}
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-tdd text-xs uppercase tracking-wider transition-all"
                style={{ background: "#ff0000", color: "#fff" }}
                onMouseEnter={e => e.currentTarget.style.background = "#cc0000"}
                onMouseLeave={e => e.currentTarget.style.background = "#ff0000"}>
                <Youtube className="w-4 h-4" /> La chaîne
              </a>
            </div>
          </div>

          {/* Grille */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl animate-pulse" style={{ background: TDD.nightMid }}>
                  <div className="aspect-video rounded-t-2xl" style={{ background: `${TDD.orange}10` }} />
                  <div className="p-4 space-y-2">
                    <div className="h-3 rounded w-1/4" style={{ background: `${TDD.orange}15` }} />
                    <div className="h-4 rounded" style={{ background: `${TDD.orange}10` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 rounded-2xl"
              style={{ background: TDD.nightMid, border: `1px solid ${TDD.orange}20` }}>
              <Youtube className="w-12 h-12 mx-auto mb-4" style={{ color: TDD.amber, opacity: 0.4 }} />
              <p className="font-tdd text-white text-sm uppercase tracking-wider mb-2">
                {videos.length === 0 ? "Bientôt disponibles" : "Aucun résultat"}
              </p>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-tdd text-xs uppercase tracking-wider mt-4"
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
                  <motion.a key={v.id} href={link} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.35) }} viewport={{ once: true }}
                    className="video-card group rounded-2xl overflow-hidden block">

                    {/* Miniature */}
                    <div className="aspect-video relative overflow-hidden flex-shrink-0"
                      style={{ background: TDD.nightMid }}>
                      <img src={thumb} alt={v.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {/* Overlay play */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(9,13,24,0.65)" }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
                          style={{ background: `linear-gradient(135deg, ${TDD.orange}, ${TDD.amber})` }}>
                          <Play className="w-6 h-6 ml-1" style={{ color: TDD.night }} fill={TDD.night} />
                        </div>
                      </div>
                      {/* Badge épisode */}
                      {epNum && (
                        <div className="badge-ep absolute top-2 left-2 px-2.5 py-0.5 rounded-lg text-xs">
                          Ép. {epNum}
                        </div>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-tdd uppercase tracking-widest" style={{ color: TDD.orange }}>
                          Tour de Dour
                        </span>
                        {v.date_publication && (
                          <span className="text-xs" style={{ color: TDD.cream, opacity: 0.35 }}>
                            {new Date(v.date_publication).toLocaleDateString("fr-BE", { month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-sm line-clamp-2 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {v.titre}
                      </h3>
                      {v.description && (
                        <p className="text-xs line-clamp-2 mb-3" style={{ color: TDD.cream, opacity: 0.5 }}>
                          {v.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                        style={{ color: TDD.blue }}>
                        <Youtube className="w-3.5 h-3.5" /> Voir sur YouTube
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}

          {/* Voir plus */}
          {filtered.length > 0 && (
            <div className="text-center mt-14">
              <p className="text-sm mb-4" style={{ color: TDD.cream, opacity: 0.45 }}>
                D'autres épisodes sont disponibles sur la chaîne YouTube
              </p>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-tdd text-xs uppercase tracking-widest transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${TDD.orange}, ${TDD.amber})`, color: TDD.night }}>
                <Youtube className="w-4 h-4" /> Tous les épisodes sur YouTube
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROPOSER UN LIEU
      ════════════════════════════════════════ */}
      <section id="proposer" className="py-20 px-4" style={{ background: TDD.nightMid }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase font-tdd tracking-[0.35em] mb-2" style={{ color: TDD.amber }}>
              Contribuer
            </p>
            <h2 className="font-tdd text-3xl text-white uppercase tracking-wide">
              Proposer un lieu
            </h2>
            <GoldSep />
            <p className="text-sm leading-relaxed" style={{ color: TDD.cream, opacity: 0.65 }}>
              Vous connaissez un endroit, une personne ou une initiative qui mérite d'être mis en lumière ?
            </p>
          </div>

          {sent ? (
            <div className="text-center py-14 rounded-2xl"
              style={{ background: `${TDD.orange}08`, border: `1px solid ${TDD.orange}25` }}>
              <Star className="w-12 h-12 mx-auto mb-4" style={{ color: TDD.amber }} fill={TDD.amber} />
              <h3 className="font-tdd text-white text-lg uppercase tracking-widest mb-2">Proposition envoyée !</h3>
              <p className="text-sm" style={{ color: TDD.cream, opacity: 0.6 }}>
                Merci ! Olivier Trevis étudiera votre suggestion avec plaisir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleProposer} className="space-y-4 p-7 rounded-2xl"
              style={{ background: `${TDD.night}cc`, border: `1px solid ${TDD.goldRim}20` }}>

              {/* Champs */}
              {[
                { label: "Prénom *",  key: "prenom", type: "text" },
                { label: "Nom *",     key: "nom",    type: "text" },
                { label: "Email *",   key: "email",  type: "email" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-tdd uppercase tracking-widest mb-1.5 block" style={{ color: TDD.amber, opacity: 0.7 }}>
                    {f.label}
                  </label>
                  <input required type={f.type} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={{ background: TDD.nightMid, borderColor: TDD.orange + "25", color: TDD.cream }}
                    onFocus={e => e.target.style.borderColor = TDD.amber + "70"}
                    onBlur={e => e.target.style.borderColor = TDD.orange + "25"} />
                </div>
              ))}
              <div>
                <label className="text-xs font-tdd uppercase tracking-widest mb-1.5 block" style={{ color: TDD.amber, opacity: 0.7 }}>
                  Lieu ou initiative *
                </label>
                <input required value={form.lieu}
                  onChange={e => setForm(p => ({ ...p, lieu: e.target.value }))}
                  placeholder="ex: La chapelle de Wihéries, L'école de musique…"
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors placeholder:text-gray-600"
                  style={{ background: TDD.nightMid, borderColor: TDD.orange + "25", color: TDD.cream }}
                  onFocus={e => e.target.style.borderColor = TDD.amber + "70"}
                  onBlur={e => e.target.style.borderColor = TDD.orange + "25"} />
              </div>
              <div>
                <label className="text-xs font-tdd uppercase tracking-widest mb-1.5 block" style={{ color: TDD.amber, opacity: 0.7 }}>
                  Votre message *
                </label>
                <textarea required rows={4} value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Pourquoi ce lieu mérite d'être mis en valeur ?"
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none placeholder:text-gray-600"
                  style={{ background: TDD.nightMid, borderColor: TDD.orange + "25", color: TDD.cream }}
                  onFocus={e => e.target.style.borderColor = TDD.amber + "70"}
                  onBlur={e => e.target.style.borderColor = TDD.orange + "25"} />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={form.consentement_rgpd}
                  onChange={e => setForm(p => ({ ...p, consentement_rgpd: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 flex-shrink-0" style={{ accentColor: TDD.orange }} />
                <span className="text-xs leading-relaxed" style={{ color: TDD.cream, opacity: 0.5 }}>
                  J'accepte que mes données soient utilisées pour traiter cette proposition. Voir les{" "}
                  <Link to="/mentions-legales" className="hover:underline" style={{ color: TDD.amber }}>mentions légales</Link>.
                </span>
              </label>
              <button type="submit" disabled={sending}
                className="w-full py-3.5 rounded-xl font-tdd text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-60 hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${TDD.orange}, ${TDD.amber})`, color: TDD.night }}>
                {sending ? "Envoi…" : <><Send className="w-4 h-4" /> Envoyer ma proposition</>}
              </button>
            </form>
          )}

          {/* Facebook */}
          <div className="mt-6 text-center">
            <p className="text-xs mb-3" style={{ color: TDD.cream, opacity: 0.35 }}>Ou rejoignez la communauté</p>
            <a href={SOCIAL_LINKS.tourDeDour.facebook} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{ background: "#1877f212", color: "#4a90e2", border: "1px solid #1877f225" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1877f225"}
              onMouseLeave={e => e.currentTarget.style.background = "#1877f212"}>
              <FbIcon /> Page Facebook du Tour de Dour
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
