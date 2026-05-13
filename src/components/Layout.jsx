import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  LOGO_OT, LOGO_MISS, LOGO_FASHION, LOGO_TDD, LOGO_PV, LOGO_SYNERGIE,
  BRAND
} from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";

/* ── Icônes ────────────────────────────────────────────────────────────────── */
function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

/* ── Data ──────────────────────────────────────────────────────────────────── */
const NAV = [
  { label: "Accueil",      href: "/",             num: "01" },
  { label: "Projets",      href: "/projets",      num: "02" },
  { label: "Tour de Dour", href: "/tour-de-dour", num: "03" },
  { label: "Actualités",   href: "/actualites",   num: "04" },
  { label: "Contact",      href: "/contact",      num: "05" },
];

const ORBITAL_ITEMS = [
  { titre: "Miss & Mister Dour", logo: LOGO_MISS,     site: "https://www.missetmisterdour.be",  c: "#c9a84c", external: true  },
  { titre: "Fashionist'ART",     logo: LOGO_FASHION,  site: "https://www.fashionistartdour.be", c: "#e91e8c", external: true  },
  { titre: "Le Tour de Dour",    logo: LOGO_TDD,      site: "/tour-de-dour",                    c: "#D47A2C", external: false },
  { titre: "P&V Assurances",     logo: LOGO_PV,       site: "https://www.assurancesdour.be",    c: "#dc2626", external: true  },
  { titre: "Synergie Dour",      logo: LOGO_SYNERGIE, site: "https://www.synergiedour.be",      c: "#3b82f6", external: true  },
];

const FOOTER_SOCIALS = [
  { href: SOCIAL_LINKS.olivierTrevis.facebook,   Icon: FbIcon },
  { href: SOCIAL_LINKS.olivierTrevis.instagram,  Icon: IgIcon },
  { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon },
  { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon },
  { href: SOCIAL_LINKS.fashionistArt.facebook,   Icon: FbIcon },
  { href: SOCIAL_LINKS.tourDeDour.facebook,      Icon: FbIcon },
  { href: SOCIAL_LINKS.pvAssurances.facebook,    Icon: FbIcon },
];

/* ── CSS global ────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,300&display=swap');

  /* Orbit animation */
  @keyframes orbit {
    from { transform: rotate(var(--start)) translateX(var(--r)) rotate(calc(-1 * var(--start))); }
    to   { transform: rotate(calc(var(--start) + 360deg)) translateX(var(--r)) rotate(calc(-1 * (var(--start) + 360deg))); }
  }
  .orbital-item {
    position: absolute;
    top: 50%; left: 50%;
    margin-top: calc(var(--size) / -2);
    margin-left: calc(var(--size) / -2);
    width: var(--size);
    height: var(--size);
    animation: orbit var(--dur) linear var(--delay) infinite;
    animation-play-state: var(--play, running);
  }
  .orbital-item:hover { animation-play-state: paused; }

  /* Orbit ring */
  @keyframes ringRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .orbit-ring-dash { animation: ringRotate 20s linear infinite; }
  .orbit-ring-dash-rev { animation: ringRotate 30s linear infinite reverse; }

  /* Center pulse */
  @keyframes centerPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4), 0 0 30px rgba(201,168,76,0.15); }
    50%     { box-shadow: 0 0 0 14px rgba(201,168,76,0), 0 0 50px rgba(201,168,76,0.25); }
  }
  .center-pulse { animation: centerPulse 3s ease-in-out infinite; }

  /* Nav pill glow */
  @keyframes pillGlow {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
    50%     { box-shadow: 0 0 20px 2px rgba(201,168,76,0.2); }
  }

  /* Burger */
  .burger-line { transition: all 0.35s cubic-bezier(0.23,1,0.32,1); transform-origin: center; }

  /* Hover card orbital */
  .orb-card {
    backdrop-filter: blur(12px);
    transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease;
  }
  .orb-card:hover {
    transform: scale(1.18) !important;
    z-index: 10;
  }

  /* Menu nav link hover line */
  .menu-link-line {
    position: absolute;
    bottom: 0; left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    width: 0;
    transition: width 0.4s cubic-bezier(0.23,1,0.32,1);
  }
  .menu-link:hover .menu-link-line { width: 100%; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #040810; }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
`;

/* ── Orbital 3D : logo OT au centre + 5 cartes en orbite ───────────────────── */
function OrbitalSystem({ paused }) {
  const orbitRadius = 150; // px depuis le centre

  return (
    <div className="relative flex items-center justify-center"
      style={{ width: 360, height: 360, flexShrink: 0 }}>

      {/* ── Anneaux décoratifs ── */}
      {/* Anneau externe pointillés */}
      <div className="orbit-ring-dash absolute rounded-full pointer-events-none"
        style={{
          width: orbitRadius * 2 + 80,
          height: orbitRadius * 2 + 80,
          border: `1px dashed rgba(201,168,76,0.18)`,
        }} />
      {/* Anneau moyen plein */}
      <div className="orbit-ring-dash-rev absolute rounded-full pointer-events-none"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          border: `1px solid rgba(201,168,76,0.08)`,
        }} />
      {/* Halo de fond */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 120, height: 120,
          background: `radial-gradient(circle, ${BRAND.gold}20 0%, transparent 70%)`,
          filter: "blur(20px)",
        }} />

      {/* ── Logo Olivier Trevis — centre ── */}
      <div className="center-pulse relative z-10 rounded-3xl overflow-hidden flex-shrink-0"
        style={{
          width: 96, height: 96,
          border: `2px solid ${BRAND.gold}60`,
          background: BRAND.navy,
        }}>
        <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
      </div>

      {/* ── 5 cartes en orbite ── */}
      {ORBITAL_ITEMS.map((item, i) => {
        const angle   = (360 / ORBITAL_ITEMS.length) * i; // angle de départ réparti
        const dur     = 18;   // secondes pour 1 tour complet
        const delay   = -(dur / ORBITAL_ITEMS.length) * i; // décalage pour départ réparti

        const CardContent = (
          <div className="orb-card w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 gap-1.5 cursor-pointer"
            style={{
              background: `linear-gradient(145deg, rgba(13,27,42,0.95) 0%, rgba(5,8,18,0.98) 100%)`,
              border: `1.5px solid ${item.c}40`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}>
            {/* Halo couleur en haut */}
            <div className="absolute top-0 left-0 right-0 h-px rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${item.c}80, transparent)` }} />
            {/* Logo */}
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
              style={{ border: `1px solid ${item.c}30` }}>
              <img src={item.logo} alt={item.titre} className="w-full h-full object-cover" />
            </div>
            {/* Nom */}
            <span className="text-center leading-tight font-bold"
              style={{
                fontSize: "7px", color: item.c, fontFamily: "'Montserrat',sans-serif",
                letterSpacing: "0.04em", lineHeight: 1.2,
                textShadow: `0 0 8px ${item.c}80`,
              }}>
              {item.titre}
            </span>
            {/* Flèche */}
            <ArrowUpRight className="w-2.5 h-2.5 opacity-50" style={{ color: item.c }} />
          </div>
        );

        return (
          <div key={i}
            className="orbital-item"
            style={{
              "--start": `${angle}deg`,
              "--r":     `${orbitRadius}px`,
              "--dur":   `${dur}s`,
              "--delay": `${delay}s`,
              "--size":  "80px",
              "--play":  paused ? "paused" : "running",
            }}>
            {item.external ? (
              <a href={item.site} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                {CardContent}
              </a>
            ) : (
              <Link to={item.site} className="block w-full h-full relative">
                {CardContent}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Burger SVG morphing ───────────────────────────────────────────────────── */
function BurgerBtn({ open, onClick }) {
  return (
    <button onClick={onClick} aria-label="Menu"
      className="relative w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-300 z-[60] flex-shrink-0"
      style={{
        background: open ? `${BRAND.gold}18` : "rgba(255,255,255,0.04)",
        border: `1px solid ${open ? BRAND.gold + "50" : "rgba(255,255,255,0.1)"}`,
      }}>
      <svg width="20" height="14" viewBox="0 0 20 14">
        <motion.line x1="0" y1="2" x2="20" y2="2" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round"
          animate={open ? { x1: 2, y1: 2, x2: 18, y2: 12 } : { x1: 0, y1: 2, x2: 20, y2: 2 }}
          transition={{ duration: 0.35, ease: [0.23,1,0.32,1] }} />
        <motion.line x1="0" y1="7" x2="14" y2="7" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round"
          animate={open ? { opacity: 0, x2: 0 } : { opacity: 0.5, x2: 14 }}
          transition={{ duration: 0.2 }} />
        <motion.line x1="0" y1="12" x2="20" y2="12" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round"
          animate={open ? { x1: 2, y1: 12, x2: 18, y2: 2 } : { x1: 0, y1: 12, x2: 20, y2: 12 }}
          transition={{ duration: 0.35, ease: [0.23,1,0.32,1] }} />
      </svg>
    </button>
  );
}

/* ── Menu plein écran split ────────────────────────────────────────────────── */
function FullscreenMenu({ open, onClose, isActive }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop flou */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45]"
            style={{ background: "rgba(2,4,12,0.4)", backdropFilter: "blur(2px)" }}
            onClick={onClose}
          />

          {/* Panel principal — slide depuis la droite */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[50] overflow-y-auto"
            style={{
              width: "min(100vw, 900px)",
              background: "linear-gradient(135deg, #06090f 0%, #040810 50%, #060a14 100%)",
              borderLeft: `1px solid rgba(201,168,76,0.12)`,
            }}>

            {/* Fond décoratif */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Grille */}
              <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: `linear-gradient(${BRAND.gold} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.gold} 1px, transparent 1px)`,
                backgroundSize: "50px 50px"
              }} />
              {/* Halo coin haut gauche */}
              <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
                style={{ background: `radial-gradient(circle, ${BRAND.gold}06 0%, transparent 70%)` }} />
              {/* Halo coin bas droite */}
              <div className="absolute -bottom-20 -right-10 w-96 h-96 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(30,64,175,0.06) 0%, transparent 70%)" }} />
            </div>

            {/* Layout interne */}
            <div className="relative flex flex-col lg:flex-row min-h-full">

              {/* ══ COLONNE GAUCHE : Navigation ══ */}
              <div className="flex-1 flex flex-col justify-center px-10 py-24 lg:py-16">

                {/* Tag */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xs font-bold uppercase tracking-[0.4em] mb-8"
                  style={{ color: BRAND.gold, opacity: 0.5 }}>
                  Navigation
                </motion.p>

                {/* Liens géants */}
                <nav className="space-y-1">
                  {NAV.map((n, i) => {
                    const active = isActive(n.href);
                    return (
                      <motion.div key={n.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: [0.23,1,0.32,1] }}>
                        <Link to={n.href} onClick={onClose}
                          className="menu-link group relative flex items-center gap-4 py-2.5 overflow-hidden">

                          {/* Numéro */}
                          <span className="font-mono text-xs w-6 flex-shrink-0 transition-all duration-300"
                            style={{ color: active ? BRAND.gold : "rgba(255,255,255,0.2)", fontFamily: "'Montserrat',sans-serif" }}>
                            {n.num}
                          </span>

                          {/* Trait vertical actif */}
                          {active && (
                            <motion.div layoutId="menuActiveBar"
                              className="w-0.5 h-8 rounded-full flex-shrink-0"
                              style={{ background: `linear-gradient(180deg, ${BRAND.gold}, ${BRAND.gold}40)` }} />
                          )}

                          {/* Label */}
                          <span className="font-black transition-all duration-300 leading-none"
                            style={{
                              fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                              fontFamily: "'Montserrat',sans-serif",
                              letterSpacing: "-0.02em",
                              color: active ? BRAND.gold : "rgba(255,255,255,0.75)",
                              textShadow: active ? `0 0 40px ${BRAND.gold}40` : "none",
                            }}
                            onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateX(6px)"; }}}
                            onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.transform = ""; }}}>
                            {n.label}
                          </span>

                          {/* Ligne hover */}
                          <div className="menu-link-line" style={{ color: BRAND.gold }} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Socials + credits */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-10 pt-8 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex gap-2">
                    {FOOTER_SOCIALS.map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.07)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.gold}18`; e.currentTarget.style.color = BRAND.gold; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}>
                        <s.Icon />
                      </a>
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
                    by <span style={{ color: BRAND.gold, opacity: 0.5 }}>JS-Innov.IA</span>
                  </span>
                </motion.div>
              </div>

              {/* ══ COLONNE DROITE : Orbital 3D ══ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.23,1,0.32,1] }}
                className="hidden lg:flex flex-col items-center justify-center px-8 py-16"
                style={{ minWidth: 380, borderLeft: "1px solid rgba(255,255,255,0.04)" }}>

                {/* Label au-dessus */}
                <p className="text-xs font-bold uppercase tracking-[0.4em] mb-8"
                  style={{ color: BRAND.gold, opacity: 0.5 }}>
                  L'écosystème
                </p>

                {/* SYSTÈME ORBITAL */}
                <OrbitalSystem paused={false} />

                {/* Légende en dessous */}
                <div className="mt-8 text-center">
                  <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Montserrat',sans-serif" }}>
                    Cliquez sur un projet pour y accéder
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Version mobile : grille des projets (pas d'orbital) ── */}
            <div className="lg:hidden px-10 pb-10">
              <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: BRAND.gold, opacity: 0.5 }}>
                Les projets
              </p>
              <div className="grid grid-cols-2 gap-3">
                {ORBITAL_ITEMS.map((item, i) => {
                  const card = (
                    <div className="flex items-center gap-3 p-3 rounded-2xl transition-all"
                      style={{ background: `${item.c}10`, border: `1px solid ${item.c}25` }}
                      onMouseEnter={e => e.currentTarget.style.background = `${item.c}20`}
                      onMouseLeave={e => e.currentTarget.style.background = `${item.c}10`}>
                      <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.logo} alt={item.titre} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold leading-tight" style={{ color: item.c, fontFamily: "'Montserrat',sans-serif" }}>
                        {item.titre}
                      </span>
                    </div>
                  );
                  return item.external
                    ? <a key={i} href={item.site} target="_blank" rel="noopener noreferrer" onClick={onClose}>{card}</a>
                    : <Link key={i} to={item.site} onClick={onClose}>{card}</Link>;
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Layout principal ──────────────────────────────────────────────────────── */
export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href) => href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
  const currentNav = NAV.find(n => isActive(n.href));

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BRAND.black, fontFamily: "'Montserrat',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ══════════════════════════════════════════
          NAVBAR — Pill flottant minimaliste
      ══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-[55]"
        style={{ padding: "12px 16px" }}>
        <div className="max-w-7xl mx-auto">

          {/* Pill container */}
          <motion.div
            animate={{
              background: scrolled
                ? "rgba(6,9,15,0.88)"
                : "rgba(6,9,15,0.55)",
              backdropFilter: "blur(24px) saturate(160%)",
              boxShadow: scrolled
                ? `0 4px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.12)`
                : `0 2px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
            }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between gap-4 px-4 rounded-2xl"
            style={{ height: 60 }}>

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.06, rotate: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-xl overflow-hidden relative"
                style={{ width: 38, height: 38, border: `1.5px solid ${BRAND.gold}45`, flexShrink: 0 }}>
                <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
                {/* Shine au hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%)" }} />
              </motion.div>

            </Link>

            {/* ── Nav desktop — pills avec morphing actif ── */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              {NAV.map(n => {
                const active = isActive(n.href);
                return (
                  <Link key={n.href} to={n.href}
                    className="relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 whitespace-nowrap"
                    style={{ color: active ? BRAND.gold : "rgba(255,255,255,0.45)" }}>
                    {/* Background actif morphing */}
                    {active && (
                      <motion.div layoutId="navActivePill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: `${BRAND.gold}15`, border: `1px solid ${BRAND.gold}30` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                    )}
                    <span className="relative z-10">{n.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Droite : page courante mobile + burger ── */}
            <div className="flex items-center gap-3">
              {/* Page courante — visible sur mobile */}
              {currentNav && (
                <span className="lg:hidden text-xs font-bold uppercase tracking-widest"
                  style={{ color: BRAND.gold, opacity: 0.7 }}>
                  {currentNav.label}
                </span>
              )}
              {/* CTA Contact */}
              <Link to="/contact"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                  color: BRAND.navy,
                  boxShadow: `0 4px 14px ${BRAND.gold}30`,
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
                Contact
              </Link>
              {/* Burger */}
              <BurgerBtn open={menuOpen} onClick={() => setMenuOpen(v => !v)} />
            </div>
          </motion.div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MENU PLEIN ÉCRAN
      ══════════════════════════════════════════ */}
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />

      {/* ══════════════════════════════════════════
          CONTENU
      ══════════════════════════════════════════ */}
      <main className="flex-1 pt-[84px]">
        {children}
      </main>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ background: BRAND.navy, borderTop: `1px solid ${BRAND.gold}12` }}>
        <div className="max-w-7xl mx-auto px-5 py-14">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: `1.5px solid ${BRAND.gold}40` }}>
                <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
              </div>

            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.map(n => (
                <Link key={n.href} to={n.href}
                  className="text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={e => e.currentTarget.style.color = BRAND.gold}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}30, transparent)` }} />

          {/* Logos projets footer */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {ORBITAL_ITEMS.map((p, i) => (
              <div key={i}>
                {p.external
                  ? <a href={p.site} target="_blank" rel="noopener noreferrer">
                      <div className="w-10 h-10 rounded-xl overflow-hidden transition-all hover:scale-110"
                        style={{ border: `1px solid ${p.c}30`, opacity: 0.65 }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = `${p.c}60`; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = "0.65"; e.currentTarget.style.borderColor = `${p.c}30`; }}>
                        <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                      </div>
                    </a>
                  : <Link to={p.site}>
                      <div className="w-10 h-10 rounded-xl overflow-hidden transition-all hover:scale-110"
                        style={{ border: `1px solid ${p.c}30`, opacity: 0.65 }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = `${p.c}60`; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = "0.65"; e.currentTarget.style.borderColor = `${p.c}30`; }}>
                        <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                      </div>
                    </Link>
                }
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {FOOTER_SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.gold}18`; e.currentTarget.style.color = BRAND.gold; e.currentTarget.style.borderColor = `${BRAND.gold}35`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  <s.Icon />
                </a>
              ))}
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                © {new Date().getFullYear()} Olivier Trevis · Dour, Belgique
              </p>
              <p className="text-xs mt-0.5">
                Conçu & développé par <span style={{ color: BRAND.gold, opacity: 0.55 }}>JS-Innov.IA</span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/mentions-legales"
              className="text-xs transition-colors"
              style={{ color: "rgba(255,255,255,0.15)" }}
              onMouseEnter={e => e.currentTarget.style.color = BRAND.gold}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.15)"}>
              Mentions légales & Politique de confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
