/**
 * ProjectCarousel — Carrousel de cartes flottantes avec animations WOW
 * Chaque carte a son animation signature unique + logo officiel
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  LOGO_MISS, LOGO_FASHION, LOGO_TDD, LOGO_PV, LOGO_SYNERGIE, BRAND
} from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";

function FbIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

/* ── Données des 5 projets ────────────────────────────────────────────────── */
const PROJETS = [
  {
    id: "miss",
    titre: "Miss & Mister Dour",
    sous: "Concours de beauté",
    desc: "L'événement glamour de Dour — élégance, diversité et charisme depuis 2012.",
    logo: LOGO_MISS,
    site: "https://www.missetmisterdour.be",
    // Couleurs issues du logo : noir/or royal
    c1: "#c9a84c", c2: "#e8d48a", bg: "#0a0800",
    particleColors: ["#c9a84c", "#e8d48a", "#fff8dc", "#f0d060"],
    socials: [
      { href: SOCIAL_LINKS.missMisterDour.facebook,  Icon: FbIcon, c: "#1877f2" },
      { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon, c: "#e1306c" },
      { href: SOCIAL_LINKS.missMisterDour.tiktok,    Icon: TkIcon, c: "#ffffff" },
    ],
    // Animation : particules dorées qui montent + couronne brillante
    animation: "crown",
  },
  {
    id: "fashion",
    titre: "Fashionist'ART",
    sous: "Mode, art & créativité",
    desc: "Mode artistique, expression créative et style autour de Dour.",
    logo: LOGO_FASHION,
    site: "https://fashionistartdour.be",
    // Couleurs : magenta/cyan/orange
    c1: "#e91e8c", c2: "#00bcd4", bg: "#0a0008",
    particleColors: ["#e91e8c", "#ff6b6b", "#00bcd4", "#ff9800", "#c084fc"],
    socials: [
      { href: SOCIAL_LINKS.fashionistArt.facebook,  Icon: FbIcon, c: "#1877f2" },
      { href: SOCIAL_LINKS.fashionistArt.instagram, Icon: IgIcon, c: "#e1306c" },
    ],
    // Animation : tourbillon de peinture + splash
    animation: "splash",
  },
  {
    id: "tdd",
    titre: "Le Tour de Dour",
    sous: "Reportages & vidéos",
    desc: "Des vidéos et reportages pour valoriser Dour et ses habitants.",
    logo: LOGO_TDD,
    site: "/tour-de-dour",
    internal: true,
    // Couleurs : orangé/bleu nuit — ADN Tour de Dour
    c1: "#D47A2C", c2: "#F0C982", bg: "#05080f",
    particleColors: ["#D47A2C", "#F0C982", "#1E6FA5", "#ffffff"],
    socials: [
      { href: SOCIAL_LINKS.tourDeDour.facebook, Icon: FbIcon, c: "#1877f2" },
    ],
    // Animation : étoiles qui scintillent + rotation du logo
    animation: "stars",
  },
  {
    id: "pv",
    titre: "P&V Assurances",
    sous: "Agence de Dour",
    desc: "Votre conseiller assurances de confiance — auto, habitation, famille.",
    logo: LOGO_PV,
    site: "https://www.assurances-dour.be",
    // Couleurs : rouge cardinal/orange P&V
    c1: "#9b1c1c", c2: "#ea580c", bg: "#0a0202",
    particleColors: ["#9b1c1c", "#ea580c", "#fca5a5", "#fed7aa"],
    socials: [
      { href: SOCIAL_LINKS.pvAssurances.facebook, Icon: FbIcon, c: "#1877f2" },
    ],
    // Animation : bouclier qui pulse + ondes de protection
    animation: "shield",
  },
  {
    id: "synergie",
    titre: "Synergie Dour",
    sous: "Réseau économique local",
    desc: "Le réseau qui connecte commerçants et indépendants de Dour.",
    logo: LOGO_SYNERGIE,
    site: "https://www.synergiedour.be",
    // Couleurs : bleu marine/or — ADN Synergie
    c1: "#1e40af", c2: "#d4a847", bg: "#020510",
    particleColors: ["#1e40af", "#3b82f6", "#d4a847", "#fbbf24"],
    socials: [
      { href: SOCIAL_LINKS.synergieDour.facebook, Icon: FbIcon, c: "#1877f2" },
    ],
    // Animation : nœuds qui se connectent + réseaux
    animation: "network",
  },
];

/* ── Styles CSS ────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&display=swap');

  /* ── Particule flottante ── */
  @keyframes floatUp {
    0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.9; }
    50%  { transform: translateY(-60px) translateX(var(--dx)) scale(0.7); opacity: 0.6; }
    100% { transform: translateY(-120px) translateX(calc(var(--dx)*2)) scale(0.3); opacity: 0; }
  }
  .particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: floatUp var(--dur, 2.5s) ease-out var(--delay, 0s) infinite;
  }

  /* ── Couronne scintillante (Miss) ── */
  @keyframes crownGlow {
    0%, 100% { filter: drop-shadow(0 0 8px #c9a84c) drop-shadow(0 0 20px #c9a84c80); }
    50%      { filter: drop-shadow(0 0 20px #e8d48a) drop-shadow(0 0 40px #c9a84ccc); }
  }
  .crown-glow { animation: crownGlow 2s ease-in-out infinite; }

  /* ── Tourbillon peinture (Fashion) ── */
  @keyframes swirl {
    0%   { transform: rotate(0deg) scale(1); }
    100% { transform: rotate(360deg) scale(1); }
  }
  @keyframes swirlPulse {
    0%, 100% { opacity: 0.3; transform: rotate(0deg) scale(0.9); }
    50%      { opacity: 0.7; transform: rotate(180deg) scale(1.1); }
  }
  .swirl-ring { animation: swirl 8s linear infinite; }
  .swirl-ring-2 { animation: swirl 12s linear infinite reverse; }

  /* ── Étoiles Tour de Dour ── */
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50%      { opacity: 1; transform: scale(1.4); }
  }
  .star-twinkle { animation: twinkle var(--dur, 1.5s) ease-in-out var(--delay, 0s) infinite; }

  /* ── Onde bouclier P&V ── */
  @keyframes ripple {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  .ripple-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px solid currentColor;
    animation: ripple 2.5s ease-out var(--delay, 0s) infinite;
  }

  /* ── Réseau Synergie ── */
  @keyframes nodePulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50%      { transform: scale(1.6); opacity: 1; }
  }
  .net-node { animation: nodePulse var(--dur, 2s) ease-in-out var(--delay, 0s) infinite; }

  /* ── Logo rotation douce ── */
  @keyframes logoFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-6px) scale(1.02); }
  }
  .logo-float { animation: logoFloat 3.5s ease-in-out infinite; }

  /* ── Shine scan ── */
  @keyframes shine {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  .shine-scan {
    position: absolute;
    top: 0; bottom: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    animation: shine 3.5s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Carte principale ── */
  .wow-card {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.05s ease;
  }
  .wow-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    padding: 1.5px;
    background: linear-gradient(135deg, var(--c1), transparent 40%, var(--c2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* ── Indicateurs ── */
  .dot-indicator {
    width: 6px; height: 6px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  .dot-indicator.active {
    width: 24px;
    border-radius: 3px;
  }
`;

/* ── Animation : particules flottantes ────────────────────────────────────── */
function Particles({ colors, count = 12 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const color  = colors[i % colors.length];
        const size   = 3 + Math.random() * 5;
        const left   = 10 + Math.random() * 80;
        const bottom = Math.random() * 30;
        const dur    = 2 + Math.random() * 2;
        const delay  = Math.random() * 3;
        const dx     = (Math.random() - 0.5) * 40;
        return (
          <div key={i} className="particle"
            style={{
              width: size, height: size,
              background: color,
              left: `${left}%`, bottom: `${bottom}%`,
              "--dx": `${dx}px`, "--dur": `${dur}s`, "--delay": `${delay}s`,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }} />
        );
      })}
    </div>
  );
}

/* ── Animation couronne : Miss & Mister ──────────────────────────────────── */
function CrownAnim({ color }) {
  return (
    <>
      {/* Cercles concentriques dorés */}
      {[1, 2, 3].map(i => (
        <motion.div key={i}
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: `${i * 12}%`,
            border: `1px solid ${color}`,
          }} />
      ))}
      {/* Éclats dorés aux coins */}
      {[0, 90, 180, 270].map((deg, i) => (
        <motion.div key={i}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            top: "50%", left: "50%",
            transform: `rotate(${deg}deg) translateX(42%) translateY(-50%)`,
            boxShadow: `0 0 8px ${color}`,
          }} />
      ))}
    </>
  );
}

/* ── Animation splash : Fashionist'ART ────────────────────────────────────── */
function SplashAnim() {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Anneaux tourbillon */}
        <div className="swirl-ring absolute w-full h-full rounded-full"
          style={{ border: "2px solid rgba(233,30,140,0.2)", borderTopColor: "#e91e8c" }} />
        <div className="swirl-ring-2 absolute rounded-full"
          style={{ width: "80%", height: "80%", border: "1.5px solid rgba(0,188,212,0.2)", borderBottomColor: "#00bcd4" }} />
        <div className="swirl-ring absolute rounded-full"
          style={{ width: "60%", height: "60%", border: "1px solid rgba(255,152,0,0.2)", borderLeftColor: "#ff9800", animationDuration: "5s" }} />
      </div>
      {/* Gouttes de peinture */}
      {[
        { top: "8%",  left: "10%", c: "#e91e8c", s: 8  },
        { top: "12%", right: "12%", c: "#00bcd4", s: 6 },
        { bottom: "10%", left: "15%", c: "#ff9800", s: 7 },
        { bottom: "8%", right: "10%", c: "#c084fc", s: 9 },
      ].map((d, i) => (
        <motion.div key={i}
          animate={{ y: [0, -8, 0], scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: d.s, height: d.s, background: d.c, top: d.top, left: d.left, right: d.right, bottom: d.bottom, boxShadow: `0 0 12px ${d.c}` }} />
      ))}
    </>
  );
}

/* ── Animation étoiles : Tour de Dour ─────────────────────────────────────── */
function StarsAnim({ c1, c2 }) {
  const stars = Array.from({ length: 16 }).map((_, i) => ({
    x: 5 + Math.random() * 90, y: 5 + Math.random() * 90,
    size: 1.5 + Math.random() * 3,
    dur: 0.8 + Math.random() * 1.5,
    delay: Math.random() * 2,
    color: i % 3 === 0 ? c2 : i % 3 === 1 ? c1 : "#ffffff",
  }));
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s, i) => (
        <div key={i} className="absolute rounded-full star-twinkle"
          style={{
            width: s.size, height: s.size,
            left: `${s.x}%`, top: `${s.y}%`,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            "--dur": `${s.dur}s`, "--delay": `${s.delay}s`,
          }} />
      ))}
      {/* Trainée lumineuse */}
      <motion.div
        animate={{ x: ["0%", "100%"], opacity: [0, 0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        className="absolute h-px top-1/3"
        style={{ width: "40%", background: `linear-gradient(90deg, transparent, ${c2}, transparent)` }} />
    </div>
  );
}

/* ── Animation bouclier : P&V ─────────────────────────────────────────────── */
function ShieldAnim({ c1 }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {[0, 0.8, 1.6].map((delay, i) => (
        <div key={i} className="ripple-ring"
          style={{ color: c1, "--delay": `${delay}s` }} />
      ))}
      {/* Scan horizontal */}
      <motion.div
        animate={{ y: ["-100%", "200%"], opacity: [0, 0.4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${c1}80, transparent)` }} />
    </div>
  );
}

/* ── Animation réseau : Synergie ──────────────────────────────────────────── */
function NetworkAnim({ c1, c2 }) {
  const nodes = [
    { x: 20, y: 20 }, { x: 50, y: 12 }, { x: 80, y: 22 },
    { x: 15, y: 55 },                    { x: 85, y: 55 },
    { x: 25, y: 85 }, { x: 55, y: 80 }, { x: 78, y: 82 },
  ];
  const lines = [
    [0,1],[1,2],[0,3],[1,4],[2,4],[3,5],[1,6],[4,7],[5,6],[6,7]
  ];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
      {/* Lignes */}
      {lines.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={i % 2 === 0 ? c1 : c2}
          strokeWidth="0.3"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }} />
      ))}
      {/* Nœuds */}
      {nodes.map((n, i) => (
        <motion.circle key={i}
          cx={n.x} cy={n.y} r="2"
          fill={i % 2 === 0 ? c1 : c2}
          animate={{ r: [1.5, 3, 1.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }} />
      ))}
      {/* Particule mobile sur les lignes */}
      <motion.circle r="1.5" fill={c2}
        animate={{
          cx: [nodes[0].x, nodes[1].x, nodes[2].x, nodes[4].x, nodes[7].x, nodes[6].x, nodes[5].x, nodes[3].x, nodes[0].x],
          cy: [nodes[0].y, nodes[1].y, nodes[2].y, nodes[4].y, nodes[7].y, nodes[6].y, nodes[5].y, nodes[3].y, nodes[0].y],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
    </svg>
  );
}

/* ── Carte individuelle avec 3D tilt ──────────────────────────────────────── */
function WowCard({ projet, isActive, onClick }) {
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotX.set(((e.clientY - cy) / rect.height) * -14);
    rotY.set(((e.clientX - cx) / rect.width) * 14);
  };
  const handleMouseLeave = () => { rotX.set(0); rotY.set(0); };

  const AnimComponent = {
    crown:   <CrownAnim color={projet.c1} />,
    splash:  <SplashAnim />,
    stars:   <StarsAnim c1={projet.c1} c2={projet.c2} />,
    shield:  <ShieldAnim c1={projet.c1} />,
    network: <NetworkAnim c1={projet.c1} c2={projet.c2} />,
  }[projet.animation];

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="wow-card select-none w-full"
      style={{
        "--c1": projet.c1, "--c2": projet.c2,
        background: `radial-gradient(ellipse at 40% 30%, ${projet.c1}15 0%, ${projet.bg} 60%)`,
        boxShadow: isActive
          ? `0 30px 80px ${projet.c1}40, 0 0 0 1px ${projet.c1}50`
          : `0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px ${projet.c1}20`,
        minHeight: 420,
        rotateX: springX,
        rotateY: springY,
        perspective: 1000,
      }}>

      {/* Fond animé spécifique */}
      {AnimComponent}
      {/* Particules */}
      <Particles colors={projet.particleColors} count={10} />
      {/* Scan lumineux */}
      <div className="shine-scan" />

      {/* Contenu */}
      <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: 420 }}>
        {/* Badge */}
        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
            style={{ background: `${projet.c1}20`, color: projet.c1, border: `1px solid ${projet.c1}35` }}>
            Dour · BE
          </span>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            {projet.internal ? (
              <Link to={projet.site} onClick={e => e.stopPropagation()}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${projet.c1}15`, border: `1px solid ${projet.c1}30` }}>
                <ArrowRight className="w-3.5 h-3.5" style={{ color: projet.c1 }} />
              </Link>
            ) : (
              <a href={projet.site} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${projet.c1}15`, border: `1px solid ${projet.c1}30` }}>
                <ExternalLink className="w-3.5 h-3.5" style={{ color: projet.c1 }} />
              </a>
            )}
          </motion.div>
        </div>

        {/* Logo officiel — centré, flottant */}
        <div className="flex items-center justify-center mb-6 flex-1">
          <motion.div
            animate={{ y: [0, -8, 0], filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative">
            {/* Halo derrière le logo */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: -20,
                background: `radial-gradient(circle, ${projet.c1}50 0%, transparent 70%)`,
              }} />
            <img
              src={projet.logo}
              alt={projet.titre}
              className="relative object-contain"
              style={{ maxHeight: 130, maxWidth: 200, filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.6))" }}
              onError={e => { e.target.style.display = "none"; }}
            />
          </motion.div>
        </div>

        {/* Texte */}
        <div>
          <div className="h-px mb-4 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${projet.c1}60, transparent)` }} />
          <h3 className="font-black text-white text-xl mb-1 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {projet.titre}
          </h3>
          <p className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: projet.c1 }}>
            {projet.sous}
          </p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "#9ab0c8", opacity: 0.8 }}>
            {projet.desc}
          </p>

          {/* Socials + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {projet.socials.map((s, si) => (
                <a key={si} href={s.href} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#8899aa" }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.c + "25"; e.currentTarget.style.color = s.c; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#8899aa"; }}>
                  <s.Icon />
                </a>
              ))}
            </div>
            {projet.internal ? (
              <Link to={projet.site} onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: `${projet.c1}20`, color: projet.c1, border: `1px solid ${projet.c1}35` }}>
                Voir <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <a href={projet.site} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: `${projet.c1}20`, color: projet.c1, border: `1px solid ${projet.c1}35` }}>
                Visiter <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Carousel principal ────────────────────────────────────────────────────── */
export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = PROJETS.length;

  // Auto-play toutes les 4 secondes
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % total);
    }, 4000);
    return () => clearInterval(t);
  }, [paused, total]);

  const goTo = (i) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 6000);
  };
  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  // Indices visibles : prev, current, next
  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  const variants = {
    enter:  (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 0.85, rotateY: d > 0 ? 25 : -25 }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit:   (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, scale: 0.85, rotateY: d > 0 ? -25 : 25 }),
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="relative w-full select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>

        {/* ── Vue 3 cartes desktop ── */}
        <div className="hidden lg:grid grid-cols-3 gap-6 items-center px-4">
          {/* Carte gauche — atténuée */}
          <div className="opacity-40 scale-90 transition-all duration-500 pointer-events-none">
            <WowCard projet={PROJETS[prevIdx]} isActive={false} onClick={() => {}} />
          </div>
          {/* Carte centrale — pleine */}
          <div className="z-10 scale-105 transition-all duration-500">
            <WowCard projet={PROJETS[current]} isActive={true} onClick={() => {}} />
          </div>
          {/* Carte droite — atténuée */}
          <div className="opacity-40 scale-90 transition-all duration-500 pointer-events-none">
            <WowCard projet={PROJETS[nextIdx]} isActive={false} onClick={() => {}} />
          </div>
        </div>

        {/* ── Vue mobile : carte unique animée ── */}
        <div className="lg:hidden relative overflow-hidden px-4" style={{ perspective: 1200 }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div key={current}
              custom={direction}
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}>
              <WowCard projet={PROJETS[current]} isActive={true} onClick={() => {}} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Flèches de navigation ── */}
        <button onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all lg:-translate-x-4"
          style={{ background: `${PROJETS[current].c1}20`, border: `1px solid ${PROJETS[current].c1}40`, color: PROJETS[current].c1 }}
          onMouseEnter={e => e.currentTarget.style.background = PROJETS[current].c1 + "35"}
          onMouseLeave={e => e.currentTarget.style.background = PROJETS[current].c1 + "20"}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all lg:translate-x-4"
          style={{ background: `${PROJETS[current].c1}20`, border: `1px solid ${PROJETS[current].c1}40`, color: PROJETS[current].c1 }}
          onMouseEnter={e => e.currentTarget.style.background = PROJETS[current].c1 + "35"}
          onMouseLeave={e => e.currentTarget.style.background = PROJETS[current].c1 + "20"}>
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* ── Indicateurs dots ── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {PROJETS.map((p, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`dot-indicator transition-all ${i === current ? "active" : ""}`}
              style={{
                background: i === current ? p.c1 : "rgba(255,255,255,0.2)",
                boxShadow: i === current ? `0 0 8px ${p.c1}` : "none",
              }} />
          ))}
        </div>

        {/* ── Nom du projet actif ── */}
        <div className="text-center mt-4">
          <AnimatePresence mode="wait">
            <motion.p key={current}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: PROJETS[current].c1, fontFamily: "'Montserrat', sans-serif" }}>
              {PROJETS[current].titre}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
