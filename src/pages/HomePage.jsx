import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Video, Actualite } from "@/api/entities";
import { LOGO_OT, BRAND, LOGO_TDD } from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";
import { Play, ArrowRight, ExternalLink, ChevronDown, Youtube, Sparkles } from "lucide-react";
import OrbitalSystem from "@/components/OrbitalSystem";

/* ── Google Fonts ───────────────────────────────────────────────────────────── */
function HomeStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Great+Vibes&display=swap');

      /* ── Noise texture pour le hero ── */
      .noise-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 1;
      }

      /* ── Scroll indicator ── */
      @keyframes scrollBounce {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50%       { transform: translateY(6px); opacity: 1; }
      }
      .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }

      /* ── Cartes projets ── */
      .project-card {
        transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                    box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                    border-color 0.3s ease;
      }
      .project-card:hover {
        transform: translateY(-8px) scale(1.015);
      }

      /* ── Marquee infini ── */
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .marquee-track { animation: marquee 28s linear infinite; }
      .marquee-track:hover { animation-play-state: paused; }

      /* ── Gradient text ── */
      .gold-text {
        background: linear-gradient(135deg, ${BRAND.gold} 0%, ${BRAND.goldLight} 50%, ${BRAND.gold} 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* ── Glow doré ── */
      .gold-glow { box-shadow: 0 0 40px ${BRAND.gold}30, 0 0 80px ${BRAND.gold}10; }

      /* ── Ligne lumineuse ── */
      .light-line {
        background: linear-gradient(90deg, transparent, ${BRAND.gold}80, transparent);
        height: 1px;
      }

      /* ── Section slide-in ── */
      .section-reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      .section-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>
  );
}

/* ── Icônes sociales ──────────────────────────────────────────────────────── */
function FbIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

/* ── Définition des 5 projets ────────────────────────────────────────────── */
const PROJETS = [
  {
    id: "miss",
    titre: "Miss & Mister Dour",
    sous: "Concours de beauté & représentation",
    desc: "L'événement le plus glamour de Dour — élégance, diversité et charisme depuis 2012.",
    site: "https://www.missetmisterdour.be",
    emoji: "👑",
    color: BRAND.gold,
    colorBg: `${BRAND.gold}10`,
    colorBorder: `${BRAND.gold}25`,
    colorGlow: `${BRAND.gold}20`,
    socials: [
      { href: SOCIAL_LINKS.missMisterDour.facebook,  Icon: FbIcon, c: "#1877f2" },
      { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, c: "#e1306c" },
      { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, c: "#fff" },
    ],
  },
  {
    id: "fashion",
    titre: "Fashionist'ART",
    sous: "Mode, art & créativité",
    desc: "La plateforme mode et art de Dour — expression créative, style et identité vestimentaire.",
    site: "https://www.fashionistartdour.be",
    emoji: "🎨",
    color: "#c084fc",
    colorBg: "rgba(192,132,252,0.08)",
    colorBorder: "rgba(192,132,252,0.22)",
    colorGlow: "rgba(192,132,252,0.15)",
    socials: [
      { href: SOCIAL_LINKS.fashionistArt.facebook,  Icon: FbIcon, c: "#1877f2" },
      { href: SOCIAL_LINKS.fashionistArt.instagram, Icon: IgIcon, c: "#e1306c" },
    ],
  },
  {
    id: "tdd",
    titre: "Le Tour de Dour",
    sous: "Reportages & vidéos locales",
    desc: "Des reportages vidéo pour mettre en lumière Dour, ses lieux et ses habitants.",
    site: "/tour-de-dour",
    logoSrc: LOGO_TDD,
    color: "#D47A2C",
    colorBg: "rgba(212,122,44,0.08)",
    colorBorder: "rgba(212,122,44,0.22)",
    colorGlow: "rgba(212,122,44,0.15)",
    internal: true,
    socials: [
      { href: SOCIAL_LINKS.tourDeDour.facebook, Icon: FbIcon, c: "#1877f2" },
    ],
  },
  {
    id: "pv",
    titre: "P&V Assurances",
    sous: "Agence de Dour",
    desc: "Votre conseiller assurances local — auto, habitation, famille, santé & entreprise.",
    site: "https://www.assurancesdour.be",
    emoji: "🛡️",
    color: "#4a9eff",
    colorBg: "rgba(74,158,255,0.08)",
    colorBorder: "rgba(74,158,255,0.22)",
    colorGlow: "rgba(74,158,255,0.15)",
    socials: [
      { href: SOCIAL_LINKS.pvAssurances.facebook, Icon: FbIcon, c: "#1877f2" },
    ],
  },
  {
    id: "synergie",
    titre: "Synergie Dour",
    sous: "Réseau économique local",
    desc: "La plateforme qui connecte commerçants, indépendants et acteurs économiques de Dour.",
    site: "https://www.synergiedour.be",
    emoji: "🤝",
    color: "#6ee7b7",
    colorBg: "rgba(110,231,183,0.08)",
    colorBorder: "rgba(110,231,183,0.22)",
    colorGlow: "rgba(110,231,183,0.15)",
    socials: [
      { href: SOCIAL_LINKS.synergieDour.facebook, Icon: FbIcon, c: "#1877f2" },
    ],
  },
];

/* ── Carte projet flottante ───────────────────────────────────────────────── */
function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card relative rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(145deg, ${BRAND.navyLight} 0%, ${BRAND.navy}ee 100%)`,
        border: `1px solid ${hovered ? p.colorBorder.replace('0.22', '0.55') : p.colorBorder}`,
        boxShadow: hovered
          ? `0 20px 60px ${p.colorGlow}, 0 0 0 1px ${p.colorBorder}`
          : `0 4px 20px rgba(0,0,0,0.3)`,
      }}>

      {/* Halo couleur en haut */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(90deg, transparent, ${p.color}80, transparent)`,
        opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s"
      }} />

      {/* Glow de fond subtil */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.color}08 0%, transparent 65%)`, opacity: hovered ? 1 : 0 }} />

      <div className="relative p-6 flex flex-col h-full z-10">
        {/* Header : emoji/logo + badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: p.colorBg, border: `1px solid ${p.colorBorder}` }}>
            {p.logoSrc
              ? <img src={p.logoSrc} alt={p.titre} className="w-full h-full object-cover" />
              : <span className="text-2xl">{p.emoji}</span>
            }
          </div>
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: p.colorBg, color: p.color, border: `1px solid ${p.colorBorder}` }}>
            Dour · BE
          </div>
        </div>

        {/* Titre */}
        <h3 className="font-black text-white text-lg leading-tight mb-1"
          style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {p.titre}
        </h3>
        <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: p.color }}>{p.sous}</p>

        {/* Séparateur */}
        <div className="h-px mb-4 rounded-full" style={{ background: `${p.color}20` }} />

        {/* Description */}
        <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: BRAND.silver, opacity: 0.7 }}>
          {p.desc}
        </p>

        {/* Socials */}
        {p.socials.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            {p.socials.map((s, si) => (
              <a key={si} href={s.href} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.05)", color: BRAND.silver, border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { e.currentTarget.style.background = s.c + "20"; e.currentTarget.style.color = s.c; e.currentTarget.style.borderColor = s.c + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = BRAND.silver; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <s.Icon />
              </a>
            ))}
          </div>
        )}

        {/* CTA */}
        {p.internal ? (
          <Link to={p.site}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: p.colorBg, color: p.color, border: `1px solid ${p.colorBorder}` }}
            onMouseEnter={e => e.currentTarget.style.background = p.colorBg.replace('0.08', '0.18')}
            onMouseLeave={e => e.currentTarget.style.background = p.colorBg}>
            Découvrir <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <a href={p.site} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: `linear-gradient(135deg, ${p.color}25, ${p.color}10)`, color: p.color, border: `1px solid ${p.colorBorder}` }}
            onMouseEnter={e => e.currentTarget.style.background = `linear-gradient(135deg, ${p.color}40, ${p.color}20)`}
            onMouseLeave={e => e.currentTarget.style.background = `linear-gradient(135deg, ${p.color}25, ${p.color}10)`}>
            Site officiel <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ── Marquee logos ─────────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  { label: "Miss & Mister Dour",  href: "https://www.missetmisterdour.be",  color: BRAND.gold    },
  { label: "Fashionist'ART",      href: "https://www.fashionistartdour.be", color: "#c084fc"     },
  { label: "Le Tour de Dour",     href: "/tour-de-dour",                color: "#D47A2C",   internal: true },
  { label: "P&V Assurances",      href: "https://www.assurancesdour.be",    color: "#4a9eff"     },
  { label: "Synergie Dour",       href: "https://www.synergiedour.be",      color: "#6ee7b7"     },
  { label: "Miss & Mister Dour",  href: "https://www.missetmisterdour.be",  color: BRAND.gold    },
  { label: "Fashionist'ART",      href: "https://www.fashionistartdour.be", color: "#c084fc"     },
  { label: "Le Tour de Dour",     href: "/tour-de-dour",                color: "#D47A2C",   internal: true },
  { label: "P&V Assurances",      href: "https://www.assurancesdour.be",    color: "#4a9eff"     },
  { label: "Synergie Dour",       href: "https://www.synergiedour.be",      color: "#6ee7b7"     },
];

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const logoY   = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleY  = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    Video.filter({ actif: true, a_la_une: true }).then(d => setVideos(d.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ background: BRAND.black, fontFamily: "'Montserrat', sans-serif" }}>
      <HomeStyles />

      {/* ══════════════════════════════════════════
          1. HERO IMMERSIF — Parallax + logo
      ══════════════════════════════════════════ */}
      <section ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden noise-bg">

        {/* Fond avec halos multicouches */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 20%, ${BRAND.navyLight} 0%, ${BRAND.black} 75%)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 80%, ${BRAND.gold}08 0%, transparent 50%)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 80% 20%, ${BRAND.gold}05 0%, transparent 40%)` }} />

        {/* Grille de points décorative */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `radial-gradient(${BRAND.gold} 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }} />

        {/* Cercles concentriques animés */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {[300, 500, 700, 900].map((size, i) => (
            <motion.div key={i}
              animate={{ scale: [1, 1.03, 1], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
              className="absolute rounded-full border"
              style={{ width: size, height: size, borderColor: BRAND.gold }} />
          ))}
        </div>

        {/* Contenu hero */}
        <motion.div style={{ y: titleY, opacity }}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{ background: `${BRAND.gold}12`, border: `1px solid ${BRAND.gold}30`, color: BRAND.gold }}>
            <Sparkles className="w-3.5 h-3.5" />
            Dour · Belgique · Agir et Construire Ensemble
          </motion.div>

          {/* Signature animée — remplace logo + nom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.23,1,0.32,1] }}
            className="mb-6 flex flex-col items-center">
            {/* Motto doré animé */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.23,1,0.32,1] }}
              className="text-xs font-bold uppercase mb-2"
              style={{ color: BRAND.gold, fontFamily: "'Montserrat',sans-serif", opacity: 0.85 }}>
              Agir et Construire Ensemble
            </motion.p>
            {/* Ligne lumineuse décorative */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="light-line w-24 mb-0" />
          </motion.div>

          {/* Ligne lumineuse */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="light-line w-32 mb-6" />

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 justify-center">
            <a href="#projets"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}>
              Mes projets <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/contact"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all"
              style={{ border: `1px solid ${BRAND.gold}40`, color: BRAND.gold, background: `${BRAND.gold}08` }}
              onMouseEnter={e => e.currentTarget.style.background = BRAND.gold + "18"}
              onMouseLeave={e => e.currentTarget.style.background = BRAND.gold + "08"}>
              Contact
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-bounce">
          <ChevronDown className="w-5 h-5" style={{ color: BRAND.gold, opacity: 0.5 }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          2. MARQUEE — Défilé des projets
      ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden py-5"
        style={{ background: `linear-gradient(90deg, ${BRAND.black}, ${BRAND.navy}, ${BRAND.black})`, borderTop: `1px solid ${BRAND.gold}15`, borderBottom: `1px solid ${BRAND.gold}15` }}>
        <div className="marquee-track flex items-center gap-0" style={{ width: "200%" }}>
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-5 px-8">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap flex-shrink-0"
                style={{ color: item.color, opacity: 0.75, fontFamily: "'Montserrat', sans-serif" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. PROJETS — Carousel WOW avec logos officiels
      ══════════════════════════════════════════ */}
      <section id="projets" className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, ${BRAND.navyLight}80 0%, ${BRAND.black} 70%)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${BRAND.gold}05 1px, transparent 1px), linear-gradient(90deg, ${BRAND.gold}05 1px, transparent 1px)`,
          backgroundSize: "80px 80px"
        }} />

        <div className="relative max-w-6xl mx-auto">
          {/* En-tête section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs uppercase font-bold tracking-[0.35em] mb-3" style={{ color: BRAND.gold }}>
              L'écosystème
            </p>
            <h2 className="font-black text-white mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              5 projets,{" "}
              <span className="gold-text">1 vision</span>
            </h2>
            <div className="light-line w-20 mx-auto mb-4" />
            <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: BRAND.silver, opacity: 0.65 }}>
              Chaque projet est une entité indépendante avec son propre site, ses réseaux et son identité — tous ancrés dans Dour.
            </p>
          </motion.div>

          {/* Système orbital */}
          <div className="flex justify-center">
            <OrbitalSystem />
          </div>

          {/* CTA voir tout */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-14">
            <Link to="/projets"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{ background: `${BRAND.gold}12`, color: BRAND.gold, border: `1px solid ${BRAND.gold}30` }}>
              Voir tous les projets en détail <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

            {/* ══════════════════════════════════════════
          4. TOUR DE DOUR — Dernières vidéos
      ══════════════════════════════════════════ */}
      {videos.length > 0 && (
        <section className="py-24 px-4 relative overflow-hidden"
          style={{ background: "#090d18" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(212,122,44,0.06) 0%, transparent 55%)" }} />

          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs uppercase font-bold tracking-[0.35em] mb-2" style={{ color: "#D47A2C" }}>
                  Le Tour de Dour
                </p>
                <h2 className="font-black text-white text-3xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Derniers épisodes
                </h2>
              </div>
              <Link to="/tour-de-dour"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
                style={{ border: "1px solid rgba(212,122,44,0.3)", color: "#F0C982", background: "rgba(212,122,44,0.08)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,122,44,0.18)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(212,122,44,0.08)"}>
                Tous les épisodes <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {videos.map((v, i) => {
                const thumb = v.miniature_url || `https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg`;
                const link  = v.youtube_url   || `https://www.youtube.com/watch?v=${v.youtube_id}`;
                return (
                  <motion.a key={v.id} href={link} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                    className="group rounded-2xl overflow-hidden block transition-all duration-300"
                    style={{ background: "rgba(14,22,40,0.9)", border: "1px solid rgba(212,122,44,0.12)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,122,44,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(212,122,44,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,122,44,0.12)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                    <div className="aspect-video relative overflow-hidden bg-gray-900">
                      <img src={thumb} alt={v.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(9,13,24,0.6)" }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #D47A2C, #F0C982)" }}>
                          <Play className="w-5 h-5 ml-0.5" fill="#090d18" style={{ color: "#090d18" }} />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#D47A2C" }}>Tour de Dour</p>
                      <h3 className="text-white font-bold text-sm line-clamp-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{v.titre}</h3>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <a href="https://www.youtube.com/@OlivierTrevis" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold transition-colors"
                style={{ color: "#F0C982", opacity: 0.6 }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}>
                <Youtube className="w-4 h-4" /> Voir la chaîne @OlivierTrevis
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          5. CTA FINAL — Contact
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: BRAND.black }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${BRAND.navyLight}60 0%, transparent 70%)` }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${BRAND.gold}06 0%, transparent 50%)` }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs uppercase font-bold tracking-[0.35em] mb-4" style={{ color: BRAND.gold }}>Contact</p>
            <h2 className="font-black text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
              Un projet en commun ?
            </h2>
            <div className="light-line w-16 mx-auto mb-6" />
            <p className="text-sm leading-relaxed mb-8" style={{ color: BRAND.silver, opacity: 0.65, maxWidth: "450px", margin: "0 auto 2rem" }}>
              Partenariat, événement, candidature ou simple question — Olivier Trevis est disponible pour chaque opportunité.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy, boxShadow: `0 8px 32px ${BRAND.gold}30` }}>
              Prendre contact <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
