import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  LOGO_OT, LOGO_MISS, LOGO_FASHION, LOGO_TDD, LOGO_PV, LOGO_SYNERGIE, BRAND
} from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";

/* ── Icônes ────────────────────────────────────────────────────────────────── */
function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

/* ── Data ──────────────────────────────────────────────────────────────────── */
const NAV = [
  { label: "Accueil",      href: "/" },
  { label: "Tour de Dour", href: "/tour-de-dour" },
  { label: "Mascotte 🎭",  href: "/mascotte" },
  { label: "Actualités",   href: "/actualites" },
  { label: "Contact",      href: "/contact" },
];

const PROJECTS = [
  { titre: "Miss & Mister Dour", logo: LOGO_MISS,     site: "https://www.missetmisterdour.be",  c: "#c9a84c", external: true  },
  { titre: "Fashionist'ART",     logo: LOGO_FASHION,  site: "https://www.fashionistartdour.be", c: "#e91e8c", external: true  },
  { titre: "Le Tour de Dour",    logo: LOGO_TDD,      site: "/tour-de-dour",                    c: "#D47A2C", external: false },
  { titre: "P&V Assurances",     logo: LOGO_PV,       site: "https://www.assurancesdour.be",    c: "#dc2626", external: true  },
  { titre: "Synergie Dour",      logo: LOGO_SYNERGIE, site: "https://www.synergiedour.be",      c: "#3b82f6", external: true  },
];

const SOCIALS = [
  { href: SOCIAL_LINKS.olivierTrevis.facebook,   Icon: FbIcon, network: "Facebook",  project: "Olivier Trevis" },
  { href: SOCIAL_LINKS.olivierTrevis.instagram,  Icon: IgIcon, network: "Instagram", project: "Olivier Trevis" },
  { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, network: "Instagram", project: "Miss & Mister Dour" },
  { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, network: "TikTok",    project: "Miss & Mister Dour" },
  { href: SOCIAL_LINKS.fashionistArt.facebook,   Icon: FbIcon, network: "Facebook",  project: "Fashionist'ART" },
  { href: SOCIAL_LINKS.tourDeDour.facebook,      Icon: FbIcon, network: "Facebook",  project: "Tour de Dour" },
  { href: SOCIAL_LINKS.pvAssurances.facebook,    Icon: FbIcon, network: "P&V",       project: "P&V Assurances" },
];

/* ── CSS global ────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');

  .light-line {
    background: linear-gradient(90deg, transparent, ${BRAND.gold}80, transparent);
    height: 1px;
  }
  .gold-text {
    background: linear-gradient(135deg, ${BRAND.gold} 0%, ${BRAND.goldLight} 50%, ${BRAND.gold} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #040810; }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
`;

/* ── Burger morphing ───────────────────────────────────────────────────────── */
function BurgerBtn({ open, onClick }) {
  return (
    <button onClick={onClick} aria-label="Menu"
      className="relative w-11 h-11 flex items-center justify-center rounded-2xl z-[60] flex-shrink-0 transition-all duration-300"
      style={{
        background: open ? `${BRAND.gold}15` : "rgba(255,255,255,0.03)",
        border: `1px solid ${open ? BRAND.gold + "45" : "rgba(255,255,255,0.08)"}`,
      }}>
      <svg width="20" height="14" viewBox="0 0 20 14" overflow="visible">
        <motion.line x1="0" y1="2"  x2="20" y2="2"  stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round"
          animate={open ? { x1:2, y1:2, x2:18, y2:12 } : { x1:0, y1:2, x2:20, y2:2 }}
          transition={{ duration: 0.35, ease:[0.23,1,0.32,1] }} />
        <motion.line x1="0" y1="7"  x2="13" y2="7"  stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round"
          animate={open ? { opacity:0, x2:0 } : { opacity:0.45, x2:13 }}
          transition={{ duration: 0.2 }} />
        <motion.line x1="0" y1="12" x2="20" y2="12" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round"
          animate={open ? { x1:2, y1:12, x2:18, y2:2 } : { x1:0, y1:12, x2:20, y2:12 }}
          transition={{ duration: 0.35, ease:[0.23,1,0.32,1] }} />
      </svg>
    </button>
  );
}

/* ── Menu premium — panneau latéral raffiné ────────────────────────────────── */
function PremiumMenu({ open, onClose, isActive }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[45] cursor-pointer"
            style={{ background: "rgba(2,4,12,0.65)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* Panneau */}
          <motion.aside
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[50] flex flex-col"
            style={{
              width: "min(380px, 92vw)",
              background: "linear-gradient(170deg, #07090f 0%, #040810 60%, #05090f 100%)",
              borderLeft: `1px solid rgba(201,168,76,0.1)`,
              boxShadow: `-40px 0 80px rgba(0,0,0,0.6)`,
            }}>

            {/* Grain texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              }} />

            {/* Halo doré en haut */}
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{ background: `radial-gradient(circle at 80% 10%, ${BRAND.gold}08 0%, transparent 65%)` }} />

            {/* ── Header panneau ── */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {/* Logo miniature */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ border: `1.5px solid ${BRAND.gold}40` }}>
                  <img src={LOGO_OT} alt="OT" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: BRAND.gold, opacity: 0.6 }}>
                    Menu
                  </p>
                </div>
              </div>
              {/* Bouton fermer */}
              <BurgerBtn open={true} onClick={onClose} />
            </div>

            {/* ── Navigation principale ── */}
            <nav className="flex-1 px-8 py-8 overflow-y-auto">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] mb-5"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                Navigation
              </p>

              <div className="space-y-1">
                {NAV.map((n, i) => {
                  const active = isActive(n.href);
                  return (
                    <motion.div key={n.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.23,1,0.32,1] }}>
                      <Link to={n.href} onClick={onClose}
                        className="group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden"
                        style={{
                          background: active ? `${BRAND.gold}12` : "transparent",
                          border: `1px solid ${active ? BRAND.gold + "30" : "transparent"}`,
                        }}
                        onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}}
                        onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}}>

                        {/* Indicateur actif gauche */}
                        {active && (
                          <motion.div layoutId="menuActiveIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                            style={{ background: `linear-gradient(180deg, ${BRAND.gold}, ${BRAND.gold}50)` }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                        )}

                        <span className="font-bold text-sm tracking-wide pl-2 transition-all duration-300"
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            color: active ? BRAND.gold : "rgba(255,255,255,0.6)",
                          }}>
                          {n.label}
                        </span>

                        <motion.div
                          animate={{ x: 0, opacity: active ? 1 : 0 }}
                          whileHover={{ x: 2, opacity: 1 }}
                          className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: active ? `${BRAND.gold}20` : "transparent" }}>
                          <ArrowUpRight className="w-3 h-3" style={{ color: BRAND.gold }} />
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Divider ── */}
              <div className="my-8 light-line" />

              {/* ── Projets — mini cartes ── */}
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] mb-5"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                Les projets
              </p>

              <div className="space-y-2">
                {PROJECTS.map((p, i) => {
                  const cardContent = (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: [0.23,1,0.32,1] }}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300"
                      style={{ background: `${p.c}08`, border: `1px solid ${p.c}18` }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${p.c}16`; e.currentTarget.style.borderColor = `${p.c}35`; e.currentTarget.style.transform = "translateX(3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${p.c}08`; e.currentTarget.style.borderColor = `${p.c}18`; e.currentTarget.style.transform = ""; }}>
                      {/* Logo */}
                      <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0"
                        style={{ border: `1px solid ${p.c}30` }}>
                        <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                      </div>
                      {/* Titre */}
                      <span className="text-xs font-bold flex-1 leading-tight"
                        style={{ color: p.c, fontFamily: "'Montserrat',sans-serif" }}>
                        {p.titre}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 opacity-40" style={{ color: p.c }} />
                    </motion.div>
                  );
                  return p.external
                    ? <a key={i} href={p.site} target="_blank" rel="noopener noreferrer" onClick={onClose}>{cardContent}</a>
                    : <Link key={i} to={p.site} onClick={onClose}>{cardContent}</Link>;
                })}
              </div>
            </nav>

            {/* ── Footer panneau — réseaux sociaux avec labels ── */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-8 py-6 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>

              <p className="text-[9px] font-bold uppercase tracking-[0.35em] mb-4"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                Réseaux sociaux
              </p>

              <div className="space-y-1.5 mb-5">
                {SOCIALS.map((s, i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.04, duration: 0.35, ease: [0.23,1,0.32,1] }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.gold}10`; e.currentTarget.style.borderColor = `${BRAND.gold}25`; e.currentTarget.style.transform = "translateX(3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = ""; }}>
                    {/* Icône réseau */}
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>
                      <s.Icon />
                    </div>
                    {/* Texte */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold leading-tight truncate"
                        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat',sans-serif" }}>
                        {s.project}
                      </p>
                      <p className="text-[9px] leading-tight"
                        style={{ color: "rgba(255,255,255,0.2)" }}>
                        {s.network}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-40 transition-opacity"
                      style={{ color: BRAND.gold }} />
                  </motion.a>
                ))}
              </div>

              <div className="flex justify-end">
                <span className="text-[10px] font-light" style={{ color: "rgba(255,255,255,0.15)" }}>
                  <span style={{ color: BRAND.gold, opacity: 0.45 }}>JS-Innov.IA</span>
                </span>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Layout ────────────────────────────────────────────────────────────────── */
export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
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

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: BRAND.black, fontFamily: "'Montserrat',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ══════════════════════════════
          NAVBAR — pill flottant épuré
      ══════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-[55]" style={{ padding: "12px 16px" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            animate={{
              background: scrolled ? "rgba(5,8,14,0.92)" : "rgba(5,8,14,0.45)",
              boxShadow: scrolled
                ? `0 4px 30px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.13)`
                : `0 2px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)`,
            }}
            transition={{ duration: 0.45 }}
            className="flex items-center justify-between gap-4 px-5 rounded-2xl"
            style={{ height: 60, backdropFilter: "blur(28px) saturate(180%)" }}>

            {/* ── Logo seul ── */}
            <Link to="/" className="group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="rounded-xl overflow-hidden relative"
                style={{ width: 36, height: 36, border: `1.5px solid ${BRAND.gold}40` }}>
                <img src={LOGO_OT} alt="OT" className="w-full h-full object-cover" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 55%)" }} />
              </motion.div>
            </Link>

            {/* ── Nav desktop — pills morphing ── */}
            <nav className="hidden lg:flex items-center gap-0.5 relative">
              {NAV.map(n => {
                const active = isActive(n.href);
                return (
                  <Link key={n.href} to={n.href}
                    className="relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 whitespace-nowrap"
                    style={{ color: active ? BRAND.gold : "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                    {active && (
                      <motion.div layoutId="navPill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: `${BRAND.gold}13`, border: `1px solid ${BRAND.gold}28` }}
                        transition={{ type: "spring", stiffness: 320, damping: 32 }} />
                    )}
                    <span className="relative z-10">{n.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Droite ── */}
            <div className="flex items-center gap-2.5">
              {/* CTA Contact desktop */}
              <Link to="/contact"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.gold}e0, ${BRAND.goldLight}e0)`,
                  color: BRAND.navy,
                  boxShadow: `0 4px 16px ${BRAND.gold}28`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 6px 24px ${BRAND.gold}40`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 16px ${BRAND.gold}28`; }}>
                Contact
              </Link>
              {/* Burger */}
              <BurgerBtn open={menuOpen} onClick={() => setMenuOpen(v => !v)} />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Menu */}
      <PremiumMenu open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />

      {/* Contenu */}
      <main className="flex-1 pt-[84px]">{children}</main>

      {/* ══════════════════════════
          FOOTER
      ══════════════════════════ */}
      <footer style={{ background: BRAND.navy, borderTop: `1px solid ${BRAND.gold}10` }}>
        <div className="max-w-7xl mx-auto px-5 py-14">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <Link to="/">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: `1.5px solid ${BRAND.gold}40` }}>
                <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
              </div>
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV.map(n => (
                <Link key={n.href} to={n.href}
                  className="text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={e => e.currentTarget.style.color = BRAND.gold}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}28, transparent)` }} />

          {/* Logos projets */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {PROJECTS.map((p, i) => (
              <div key={i}>
                {p.external
                  ? <a href={p.site} target="_blank" rel="noopener noreferrer">
                      <div className="w-10 h-10 rounded-xl overflow-hidden transition-all duration-200"
                        style={{ border: `1px solid ${p.c}28`, opacity: 0.55 }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = "0.55"; e.currentTarget.style.transform = ""; }}>
                        <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                      </div>
                    </a>
                  : <Link to={p.site}>
                      <div className="w-10 h-10 rounded-xl overflow-hidden transition-all duration-200"
                        style={{ border: `1px solid ${p.c}28`, opacity: 0.55 }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = "0.55"; e.currentTarget.style.transform = ""; }}>
                        <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
                      </div>
                    </Link>
                }
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.gold}15`; e.currentTarget.style.color = BRAND.gold; e.currentTarget.style.borderColor = `${BRAND.gold}32`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                  <s.Icon />
                </a>
              ))}
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
                © {new Date().getFullYear()} Olivier Trevis · Dour, Belgique
              </p>
              <p className="text-xs mt-0.5">
                Conçu par <span style={{ color: BRAND.gold, opacity: 0.5 }}>JS-Innov.IA</span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/mentions-legales"
              className="text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.12)" }}
              onMouseEnter={e => e.currentTarget.style.color = BRAND.gold}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.12)"}>
              Mentions légales & Politique de confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
