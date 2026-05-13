import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";
import {
  LOGO_OT, LOGO_MISS, LOGO_FASHION, LOGO_TDD, LOGO_PV, LOGO_SYNERGIE,
  BRAND
} from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";

// ── Icônes sociales ──────────────────────────────────────────────────────────
function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

// ── Liens de navigation ──────────────────────────────────────────────────────
const NAV = [
  { label: "Accueil",      href: "/",             num: "01" },
  { label: "Projets",      href: "/projets",      num: "02" },
  { label: "Tour de Dour", href: "/tour-de-dour", num: "03" },
  { label: "Actualités",   href: "/actualites",   num: "04" },
  { label: "Contact",      href: "/contact",      num: "05" },
];

// ── Projets pour le menu plein écran ────────────────────────────────────────
const MENU_PROJETS = [
  { titre: "Miss & Mister Dour",  logo: LOGO_MISS,    site: "https://www.missetmisterdour.be",  c: "#c9a84c" },
  { titre: "Fashionist'ART",      logo: LOGO_FASHION, site: "https://www.fashionistartdour.be", c: "#e91e8c" },
  { titre: "Le Tour de Dour",     logo: LOGO_TDD,     site: "/tour-de-dour",                c: "#D47A2C", internal: true },
  { titre: "P&V Assurances",      logo: LOGO_PV,      site: "https://www.assurancesdour.be",    c: "#9b1c1c" },
  { titre: "Synergie Dour",       logo: LOGO_SYNERGIE,site: "https://www.synergiedour.be",       c: "#1e40af" },
];

const FOOTER_SOCIALS = [
  { href: SOCIAL_LINKS.olivierTrevis.facebook,   Icon: FbIcon, label: "Facebook"          },
  { href: SOCIAL_LINKS.olivierTrevis.instagram,  Icon: IgIcon, label: "Instagram"         },
  { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, label: "Miss & Mister IG"  },
  { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, label: "TikTok M&M"        },
  { href: SOCIAL_LINKS.fashionistArt.facebook,   Icon: FbIcon, label: "Fashionist'ART"    },
  { href: SOCIAL_LINKS.tourDeDour.facebook,      Icon: FbIcon, label: "Tour de Dour"      },
  { href: SOCIAL_LINKS.pvAssurances.facebook,    Icon: FbIcon, label: "P&V Assurances"    },
];

// ── Burger animé 3 barres → X ────────────────────────────────────────────────
function BurgerButton({ open, onClick, color }) {
  return (
    <button onClick={onClick}
      className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-all z-50 flex-shrink-0"
      style={{ border: `1px solid ${color}30` }}
      aria-label="Menu">
      <motion.span animate={open ? { rotate: 45, y: 6.5, width: "22px" } : { rotate: 0, y: 0, width: "22px" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="block h-[1.5px] rounded-full origin-center"
        style={{ background: open ? color : color, opacity: open ? 1 : 0.7 }} />
      <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-[1.5px] rounded-full"
        style={{ width: "14px", background: color, opacity: 0.5 }} />
      <motion.span animate={open ? { rotate: -45, y: -6.5, width: "22px" } : { rotate: 0, y: 0, width: "22px" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="block h-[1.5px] rounded-full origin-center"
        style={{ background: color, opacity: open ? 1 : 0.7 }} />
    </button>
  );
}

// ── Menu plein écran ─────────────────────────────────────────────────────────
function FullscreenMenu({ open, onClose, isActive }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-40 overflow-y-auto"
          style={{ background: "#040810" }}>

          {/* Grille de fond */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(${BRAND.gold} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.gold} 1px, transparent 1px)`,
              backgroundSize: "60px 60px"
            }} />
          {/* Halos */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${BRAND.gold}08 0%, transparent 60%)` }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, #1e40af08 0%, transparent 60%)` }} />

          <div className="relative min-h-screen flex flex-col px-6 pt-24 pb-10 max-w-7xl mx-auto">

            {/* ── Navigation principale ── */}
            <nav className="flex-1 flex flex-col justify-center">
              <div className="mb-3">
                <p className="text-xs uppercase font-bold tracking-[0.35em]" style={{ color: BRAND.gold, opacity: 0.5 }}>
                  Navigation
                </p>
              </div>
              <ul className="space-y-1">
                {NAV.map((n, i) => (
                  <motion.li key={n.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
                    <Link to={n.href} onClick={onClose}
                      className="group flex items-center gap-4 py-3 transition-all"
                      style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                      {/* Numéro */}
                      <span className="text-xs font-mono w-7 flex-shrink-0 transition-colors"
                        style={{ color: isActive(n.href) ? BRAND.gold : "rgba(255,255,255,0.2)" }}>
                        {n.num}
                      </span>
                      {/* Label géant */}
                      <span className="font-black transition-all leading-none"
                        style={{
                          fontSize: "clamp(2rem, 7vw, 4.5rem)",
                          fontFamily: "'Montserrat', sans-serif",
                          color: isActive(n.href) ? BRAND.gold : "rgba(255,255,255,0.85)",
                          letterSpacing: isActive(n.href) ? "0.02em" : "-0.01em",
                          WebkitTextStroke: isActive(n.href) ? "0" : "0",
                        }}
                        onMouseEnter={e => {
                          if (!isActive(n.href)) {
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.WebkitTextStroke = "0";
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive(n.href)) {
                            e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                          }
                        }}>
                        {n.label}
                      </span>
                      {/* Indicateur actif */}
                      {isActive(n.href) && (
                        <motion.div layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: BRAND.gold, boxShadow: `0 0 8px ${BRAND.gold}` }} />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* ── Logos des projets ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-8">
              <p className="text-xs uppercase font-bold tracking-[0.35em] mb-4" style={{ color: BRAND.gold, opacity: 0.5 }}>
                Les projets
              </p>
              <div className="flex flex-wrap gap-3">
                {MENU_PROJETS.map((p, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}>
                    {p.internal ? (
                      <Link to={p.site} onClick={onClose}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all group"
                        style={{ background: `${p.c}10`, border: `1px solid ${p.c}25` }}
                        onMouseEnter={e => e.currentTarget.style.background = `${p.c}20`}
                        onMouseLeave={e => e.currentTarget.style.background = `${p.c}10`}>
                        <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold whitespace-nowrap" style={{ color: p.c }}>{p.titre}</span>
                      </Link>
                    ) : (
                      <a href={p.site} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all group"
                        style={{ background: `${p.c}10`, border: `1px solid ${p.c}25` }}
                        onMouseEnter={e => e.currentTarget.style.background = `${p.c}20`}
                        onMouseLeave={e => e.currentTarget.style.background = `${p.c}10`}>
                        <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold whitespace-nowrap" style={{ color: p.c }}>{p.titre}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-50" style={{ color: p.c }} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Footer menu ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
              {/* Socials */}
              <div className="flex items-center gap-2 flex-wrap">
                {FOOTER_SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.gold}20`; e.currentTarget.style.color = BRAND.gold; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                    <s.Icon />
                  </a>
                ))}
              </div>
              {/* Credit */}
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                Conçu par <span style={{ color: BRAND.gold, opacity: 0.7 }}>JS-Innov.IA</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Layout principal ─────────────────────────────────────────────────────────
export default function Layout({ children }) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const location = useLocation();
  const indicatorRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Bloquer scroll quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href) => href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BRAND.black }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');

        /* Pill indicator slide */
        .nav-pill {
          position: relative;
          overflow: hidden;
        }
        .nav-pill::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; right: 50%;
          height: 1.5px;
          background: ${BRAND.gold};
          border-radius: 2px;
          transition: left 0.3s ease, right 0.3s ease;
        }
        .nav-pill.active::after,
        .nav-pill:hover::after {
          left: 15%; right: 15%;
        }

        /* Navbar glow line */
        @keyframes navGlow {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.8; }
        }
        .nav-glow-line { animation: navGlow 3s ease-in-out infinite; }

        /* Logo hover */
        .logo-wrap:hover .logo-img { transform: scale(1.05) rotate(-2deg); }
        .logo-img { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1); }
      `}</style>

      {/* ══════════════════════════════════════════
          NAVBAR GLASSMORPHISME
      ══════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop: scrolled ? "0" : "12px",
          paddingBottom: scrolled ? "0" : "12px",
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}>

        {/* Fond glassmorphisme */}
        <div className="absolute inset-0 transition-all duration-400"
          style={{
            background: scrolled
              ? `linear-gradient(180deg, ${BRAND.navy}f5 0%, ${BRAND.navy}e8 100%)`
              : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            borderBottom: scrolled ? `1px solid rgba(201,168,76,0.12)` : "none",
          }} />

        {/* Ligne dorée animée en bas (seulement quand scrollé) */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px nav-glow-line"
            style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}40, transparent)` }} />
        )}

        <div className="relative max-w-7xl mx-auto px-5 flex items-center justify-between gap-6"
          style={{ height: scrolled ? "60px" : "72px", transition: "height 0.4s ease" }}>

          {/* ── Logo ── */}
          <Link to="/" className="logo-wrap flex items-center gap-3 flex-shrink-0 group">
            <div className="relative overflow-hidden rounded-2xl flex-shrink-0"
              style={{
                width: scrolled ? 40 : 48, height: scrolled ? 40 : 48,
                transition: "all 0.4s ease",
                border: `1.5px solid ${BRAND.gold}40`,
                boxShadow: `0 0 20px ${BRAND.gold}15`,
              }}>
              <img src={LOGO_OT} alt="Olivier Trevis" className="logo-img w-full h-full object-cover" />
              {/* Shine au hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
            </div>
            <div className="hidden sm:block overflow-hidden">
              <motion.p
                animate={{ y: scrolled ? -1 : 0 }}
                className="font-black text-white leading-none tracking-wider text-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                OLIVIER TREVIS
              </motion.p>
              <motion.p
                animate={{ opacity: scrolled ? 0.6 : 0.8, y: scrolled ? -1 : 0 }}
                className="text-xs leading-none mt-1 tracking-[0.18em] font-light"
                style={{ color: BRAND.gold }}>
                AGIR ET CONSTRUIRE ENSEMBLE
              </motion.p>
            </div>
          </Link>

          {/* ── Nav desktop — pill avec underline glissant ── */}
          <nav className="hidden lg:flex items-center relative">
            {/* Pill background animé */}
            <AnimatePresence>
              {hoveredNav && (
                <motion.div
                  layoutId="navHoverBg"
                  className="absolute rounded-lg pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              )}
            </AnimatePresence>

            <div className="flex items-center gap-1 relative">
              {NAV.map((n) => {
                const active = isActive(n.href);
                return (
                  <div key={n.href} className="relative">
                    <Link to={n.href}
                      onMouseEnter={() => setHoveredNav(n.href)}
                      onMouseLeave={() => setHoveredNav(null)}
                      className="relative flex flex-col items-center px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap group"
                      style={{
                        color: active ? BRAND.gold : "rgba(255,255,255,0.55)",
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                      onFocus={e => e.currentTarget.style.color = BRAND.gold}
                      onBlur={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>

                      {/* Hover background */}
                      {hoveredNav === n.href && (
                        <motion.div layoutId="navHoverBg"
                          className="absolute inset-0 rounded-lg pointer-events-none"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          style={{ background: "rgba(255,255,255,0.04)" }} />
                      )}

                      <span className="relative z-10 transition-colors duration-200"
                        style={{ color: active ? BRAND.gold : hoveredNav === n.href ? "#fff" : "rgba(255,255,255,0.55)" }}>
                        {n.label}
                      </span>

                      {/* Underline glissant */}
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-all duration-300"
                        style={{
                          width: active ? "65%" : hoveredNav === n.href ? "50%" : "0%",
                          background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)`,
                        }} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* ── CTA + Burger ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* CTA Contact — desktop seulement */}
            <Link to="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs tracking-wider uppercase transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                color: BRAND.navy,
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: `0 4px 16px ${BRAND.gold}25`,
              }}>
              Contact
            </Link>

            {/* Burger animé */}
            <BurgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} color={BRAND.gold} />
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          MENU PLEIN ÉCRAN (clip-path reveal)
      ══════════════════════════════════════════ */}
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />

      {/* ══════════════════════════════════════════
          CONTENU
      ══════════════════════════════════════════ */}
      <main className="flex-1 pt-[72px]">
        {children}
      </main>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ background: BRAND.navy, borderTop: `1px solid ${BRAND.gold}15` }}>
        <div className="max-w-7xl mx-auto px-5 py-14">

          {/* Logo + slogan */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <Link to="/" className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: `1.5px solid ${BRAND.gold}40` }}>
                <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black text-white text-base tracking-wider"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>OLIVIER TREVIS</p>
                <p className="text-xs mt-0.5 tracking-[0.2em] font-light" style={{ color: BRAND.gold, opacity: 0.8 }}>
                  AGIR ET CONSTRUIRE ENSEMBLE
                </p>
              </div>
            </Link>

            {/* Nav footer */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.map(n => (
                <Link key={n.href} to={n.href}
                  className="text-xs font-semibold transition-colors tracking-wider uppercase"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Montserrat', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.color = BRAND.gold}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Séparateur */}
          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}30, transparent)` }} />

          {/* Logos projets */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {MENU_PROJETS.map((p, i) => (
              <div key={i}>
                {p.internal ? (
                  <Link to={p.site} title={p.titre}>
                    <div className="w-10 h-10 rounded-xl overflow-hidden transition-all hover:scale-110"
                      style={{ border: `1px solid ${p.c}30`, opacity: 0.7 }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = `${p.c}60`; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = `${p.c}30`; }}>
                      <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                ) : (
                  <a href={p.site} target="_blank" rel="noopener noreferrer" title={p.titre}>
                    <div className="w-10 h-10 rounded-xl overflow-hidden transition-all hover:scale-110"
                      style={{ border: `1px solid ${p.c}30`, opacity: 0.7 }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = `${p.c}60`; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.borderColor = `${p.c}30`; }}>
                      <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Socials + copyright */}
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
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.15)" }}>
                Conçu & développé par <span style={{ color: BRAND.gold, opacity: 0.6 }}>JS-Innov.IA</span>
              </p>
            </div>
          </div>

          {/* Lien mentions */}
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
