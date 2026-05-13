import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Video, Actualite } from "@/api/entities";
import { LOGO_OT, BRAND } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";
import { Play, ArrowRight, ExternalLink, MapPin, ChevronRight } from "lucide-react";

// ── Icônes sociales ──────────────────────────────────────────────────────────
function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

// ── Projets avec leurs sites officiels ──────────────────────────────────────
const PROJETS = [
  {
    titre: "Miss & Mister Dour",
    soustitre: "Concours de beauté",
    desc: "Le grand concours de beauté, d'élégance et de représentation locale de Dour.",
    site: "https://missetmisterdour.be",
    emoji: "👑",
    accent: BRAND.gold,
    socials: [
      { href: SOCIAL_LINKS.missMisterDour.facebook, Icon: FbIcon },
      { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon },
      { href: SOCIAL_LINKS.missMisterDour.tiktok, Icon: TkIcon },
    ],
  },
  {
    titre: "Fashionist'ART",
    soustitre: "Mode, art & créativité",
    desc: "Plateforme dédiée à la mode artistique et à l'expression créative autour de Dour.",
    site: "https://fashionistartdour.be",
    emoji: "🎨",
    accent: "#c084fc",
    socials: [
      { href: SOCIAL_LINKS.fashionistArt.facebook, Icon: FbIcon },
      { href: SOCIAL_LINKS.fashionistArt.instagram, Icon: IgIcon },
    ],
  },
  {
    titre: "P&V Assurances",
    soustitre: "Agence de Dour",
    desc: "Votre conseiller assurances de confiance à Dour.",
    site: "https://assurancesdour.be",
    emoji: "🛡️",
    accent: "#4a9eff",
    socials: [{ href: SOCIAL_LINKS.pvAssurances.facebook, Icon: FbIcon }],
  },
  {
    titre: "Synergie Dour",
    soustitre: "Réseau local",
    desc: "Le réseau qui connecte les acteurs économiques de Dour.",
    site: "https://synergiedour.be",
    emoji: "🤝",
    accent: "#6ee7b7",
    socials: [{ href: SOCIAL_LINKS.synergieDour.facebook, Icon: FbIcon }],
  },
  {
    titre: "Le Tour de Dour",
    soustitre: "Reportages & vidéos",
    desc: "Des vidéos et reportages pour valoriser Dour et ses habitants.",
    site: "/tour-de-dour",
    emoji: "🎬",
    accent: "#f87171",
    internal: true,
    socials: [{ href: SOCIAL_LINKS.tourDeDour.facebook, Icon: FbIcon }],
  },
];

// ── Composant : carte projet ─────────────────────────────────────────────────
function ProjetCard({ p, i }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }} viewport={{ once: true }}
      className="group rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px]"
      style={{ background: `linear-gradient(135deg, ${BRAND.navyLight} 0%, ${BRAND.navy} 100%)`, border: `1px solid ${p.accent}25` }}
      onMouseEnter={e => e.currentTarget.style.borderColor = p.accent + "50"}
      onMouseLeave={e => e.currentTarget.style.borderColor = p.accent + "25"}>

      <div className="text-3xl mb-3">{p.emoji}</div>
      <h3 className="font-black text-white text-lg leading-tight">{p.titre}</h3>
      <p className="text-xs font-medium mb-3" style={{ color: p.accent }}>{p.soustitre}</p>
      <p className="text-xs leading-relaxed mb-4" style={{ color: BRAND.silver, opacity: 0.75 }}>{p.desc}</p>

      <div className="flex items-center gap-1.5 mb-4">
        {p.socials.map((s, si) => (
          <a key={si} href={s.href} target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ border: `1px solid ${BRAND.gold}25`, color: BRAND.silver }}
            onMouseEnter={e => { e.currentTarget.style.color = p.accent; e.currentTarget.style.borderColor = p.accent + "60"; }}
            onMouseLeave={e => { e.currentTarget.style.color = BRAND.silver; e.currentTarget.style.borderColor = BRAND.gold + "25"; }}>
            <s.Icon />
          </a>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {p.internal ? (
          <Link to={p.site}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{ background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}30` }}>
            Voir <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <a href={p.site} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}>
            Site officiel <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {p.siteFashion && (
          <a href={p.siteFashion} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: `${BRAND.gold}10`, color: BRAND.gold, border: `1px solid ${BRAND.gold}25` }}>
            Fashionist'ART ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Page principale ──────────────────────────────────────────────────────────
export default function HomePage() {
  const [videos, setVideos]       = useState([]);
  const [actus, setActus]         = useState([]);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    Video.filter({ actif: true, a_la_une: true }).then(d => setVideos(d.slice(0, 3))).catch(() => {});
    Actualite.filter({ publie: true, a_la_une: true }).then(d => setActus(d.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: BRAND.black }}>

      {/* ══════════════════════════════════════════
          HERO — Logo central + identité
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Fond dégradé marine */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 30%, ${BRAND.navyLight} 0%, ${BRAND.black} 70%)` }} />
        {/* Halo doré */}
        <div className="absolute inset-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 50% 40%, ${BRAND.gold} 0%, transparent 55%)` }} />
        {/* Lignes décoratives */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute inset-0 rounded-full border"
              style={{ borderColor: BRAND.gold, transform: `scale(${0.3 + i * 0.2})` }} />
          ))}
        </div>

        <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo officiel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-10">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-3xl overflow-hidden mx-auto shadow-2xl"
              style={{ border: `2px solid ${BRAND.gold}50`, boxShadow: `0 0 60px ${BRAND.gold}25` }}>
              <img
                src={LOGO_OT}
                alt="Olivier Trevis — Agir et Construire Ensemble"
                className="w-full h-full object-cover"
                onLoad={() => setLogoLoaded(true)}
              />
            </div>
          </motion.div>

          {/* Titre + slogan */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-3 leading-none">
              <span className="text-white">OLIVIER</span><br />
              <span style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                TREVIS
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-16" style={{ background: BRAND.gold, opacity: 0.5 }} />
              <p className="text-xs tracking-[0.35em] font-light uppercase" style={{ color: BRAND.silver }}>
                Agir et Construire Ensemble
              </p>
              <div className="h-px w-16" style={{ background: BRAND.gold, opacity: 0.5 }} />
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-3 mb-8">
              <MapPin className="w-3.5 h-3.5" style={{ color: BRAND.gold }} />
              <p className="text-xs" style={{ color: BRAND.silver, opacity: 0.7 }}>Dour · Belgique</p>
            </div>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { href: SOCIAL_LINKS.olivierTrevis.facebook,   Icon: FbIcon, label: "Facebook" },
              { href: SOCIAL_LINKS.olivierTrevis.instagram,  Icon: IgIcon, label: "Instagram" },
              { href: SOCIAL_LINKS.missMisterDour.facebook,  Icon: FbIcon, label: "Miss & Mister Dour" },
              { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, label: "Miss & Mister Dour IG" },
              { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, label: "TikTok" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ border: `1px solid ${BRAND.gold}30`, color: BRAND.silver, background: `${BRAND.navyLight}80` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND.gold + "80"; e.currentTarget.style.color = BRAND.gold; e.currentTarget.style.background = BRAND.gold + "12"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BRAND.gold + "30"; e.currentTarget.style.color = BRAND.silver; e.currentTarget.style.background = BRAND.navyLight + "80"; }}>
                <s.Icon />
              </a>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 justify-center mb-6">
            <Link to="/projets"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}>
              Découvrir les projets <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tour-de-dour"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
              style={{ border: `1.5px solid ${BRAND.gold}40`, color: BRAND.gold, background: `${BRAND.gold}08` }}
              onMouseEnter={e => e.currentTarget.style.background = BRAND.gold + "15"}
              onMouseLeave={e => e.currentTarget.style.background = BRAND.gold + "08"}>
              <Play className="w-4 h-4" /> Le Tour de Dour
            </Link>
          </motion.div>

          {/* Liens rapides */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-2 justify-center text-xs">
            {[
              { label: "Miss & Mister Dour", href: "https://missetmisterdour.be", ext: true },
              { label: "Vidéos",             href: "/videos",                     ext: false },
              { label: "Contact",            href: "/contact",                    ext: false },
            ].map((l, i) => (
              l.ext
                ? <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full transition-all"
                    style={{ border: `1px solid ${BRAND.gold}20`, color: BRAND.silver, opacity: 0.7 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = BRAND.gold + "40"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = BRAND.gold + "20"; }}>
                    {l.label} ↗
                  </a>
                : <Link key={i} to={l.href}
                    className="px-3 py-1.5 rounded-full transition-all"
                    style={{ border: `1px solid ${BRAND.gold}20`, color: BRAND.silver, opacity: 0.7 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = BRAND.gold + "40"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = BRAND.gold + "20"; }}>
                    {l.label}
                  </Link>
            ))}
          </motion.div>
        </div>

        {/* Flèche scroll */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-px h-12 rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${BRAND.gold}60)` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND.gold }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          PROJETS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: `linear-gradient(180deg, ${BRAND.black} 0%, ${BRAND.navy}60 100%)` }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-3" style={{ color: BRAND.gold }}>Ses engagements</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Projets & Initiatives</h2>
            <div className="w-16 h-0.5 rounded-full mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {PROJETS.map((p, i) => <ProjetCard key={i} p={p} i={i} />)}
          </div>
          <div className="text-center">
            <Link to="/projets"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: BRAND.gold }}
              onMouseEnter={e => e.currentTarget.style.gap = "10px"}
              onMouseLeave={e => e.currentTarget.style.gap = ""}>
              Voir tous les projets <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUI EST OLIVIER
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: BRAND.navy }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Logo portrait */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative max-w-xs mx-auto">
                <div className="rounded-3xl overflow-hidden"
                  style={{ border: `2px solid ${BRAND.gold}40`, boxShadow: `0 20px 60px ${BRAND.black}80` }}>
                  <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
                </div>
                {/* Badge slogan */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}>
                  <p className="text-xs font-black tracking-wider">AGIR ET CONSTRUIRE</p>
                </div>
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-4" style={{ color: BRAND.gold }}>À propos</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                Un acteur local ancré dans <span style={{ color: BRAND.gold }}>Dour</span>
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: BRAND.silver, opacity: 0.85 }}>
                Olivier Trevis consacre son énergie à rassembler, valoriser et faire rayonner Dour à travers ses projets culturels, associatifs et événementiels.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: BRAND.silver, opacity: 0.85 }}>
                De Miss & Mister Dour au Tour de Dour, chaque initiative reflète sa conviction que chaque ville, quelle que soit sa taille, peut rayonner grâce à ses talents et à sa communauté.
              </p>
              <blockquote className="border-l-2 pl-5 mb-8" style={{ borderColor: BRAND.gold }}>
                <p className="text-base italic" style={{ color: BRAND.silver }}>"Dour mérite d'être fière d'elle-même."</p>
                <footer className="mt-2 text-xs font-semibold" style={{ color: BRAND.gold }}>— Olivier Trevis</footer>
              </blockquote>
              <Link to="/projets"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
                style={{ color: BRAND.gold }}>
                En savoir plus <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DERNIÈRES VIDÉOS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: BRAND.black }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-2" style={{ color: BRAND.gold }}>Médias</p>
              <h2 className="text-3xl font-black text-white">Dernières vidéos</h2>
            </div>
            <Link to="/videos"
              className="hidden md:flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: BRAND.gold }}>
              Tout voir <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-20 rounded-2xl"
              style={{ background: BRAND.navyLight, border: `1px solid ${BRAND.gold}15` }}>
              <Play className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: BRAND.gold }} />
              <p className="font-bold text-white mb-2">Vidéos bientôt disponibles</p>
              <p className="text-sm mb-6" style={{ color: BRAND.silver, opacity: 0.6 }}>
                En attendant, retrouvez les vidéos sur Facebook
              </p>
              <a href={SOCIAL_LINKS.tourDeDour.facebook} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{ background: `${BRAND.gold}15`, color: BRAND.gold, border: `1px solid ${BRAND.gold}30` }}>
                <FbIcon /> Voir sur Facebook
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((v, i) => {
                const thumb = v.miniature_url || (v.youtube_id ? `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg` : null);
                const link  = v.youtube_url || (v.youtube_id ? `https://youtube.com/watch?v=${v.youtube_id}` : "#");
                return (
                  <motion.a key={v.id} href={link} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="group rounded-2xl overflow-hidden block transition-all duration-300 hover:translate-y-[-2px]"
                    style={{ background: BRAND.navyLight, border: `1px solid ${BRAND.gold}15` }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = BRAND.gold + "40"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = BRAND.gold + "15"}>
                    <div className="aspect-video bg-gray-900 relative overflow-hidden">
                      {thumb ? (
                        <img src={thumb} alt={v.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-10 h-10 opacity-30" style={{ color: BRAND.gold }} />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.5)" }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ background: "#ff0000" }}>
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium mb-1" style={{ color: BRAND.gold }}>{v.categorie}</p>
                      <h3 className="text-white font-bold text-sm line-clamp-2">{v.titre}</h3>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link to="/videos"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: BRAND.gold }}>
              Voir toutes les vidéos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DERNIÈRES ACTUALITÉS
      ══════════════════════════════════════════ */}
      {actus.length > 0 && (
        <section className="py-24 px-4" style={{ background: `linear-gradient(180deg, ${BRAND.black} 0%, ${BRAND.navy} 100%)` }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs uppercase font-semibold tracking-[0.3em] mb-2" style={{ color: BRAND.gold }}>Actualités</p>
                <h2 className="text-3xl font-black text-white">Dernières nouvelles</h2>
              </div>
              <Link to="/actualites"
                className="hidden md:flex items-center gap-2 text-sm font-semibold"
                style={{ color: BRAND.gold }}>
                Tout voir <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {actus.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: BRAND.navyLight, border: `1px solid ${BRAND.gold}15` }}>
                  {a.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={a.image_url} alt={a.titre} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs font-medium mb-2" style={{ color: BRAND.gold }}>{a.categorie}</p>
                    <h3 className="text-white font-bold text-sm line-clamp-2 mb-2">{a.titre}</h3>
                    {a.extrait && <p className="text-xs line-clamp-2" style={{ color: BRAND.silver, opacity: 0.7 }}>{a.extrait}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: BRAND.navy }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6"
            style={{ border: `1.5px solid ${BRAND.gold}50` }}>
            <img src={LOGO_OT} alt="OT" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Agir et Construire Ensemble</h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: BRAND.silver, opacity: 0.8, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Vous avez un projet, une idée, une question ? Olivier Trevis est disponible pour échanger et collaborer autour des initiatives locales de Dour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-black text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}>
              Nous contacter <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/projets"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all"
              style={{ border: `1.5px solid ${BRAND.gold}40`, color: BRAND.gold, background: `${BRAND.gold}08` }}
              onMouseEnter={e => e.currentTarget.style.background = BRAND.gold + "15"}
              onMouseLeave={e => e.currentTarget.style.background = BRAND.gold + "08"}>
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
