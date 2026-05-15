import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { Actualite } from "@/api/entities";
import {
  LOGO_OT, LOGO_MISS, LOGO_FASHION, LOGO_PV, LOGO_SYNERGIE, LOGO_TDD,
  BRAND
} from "@/api/supabase";
import { SOCIAL_LINKS } from "@/api/links";
import { ExternalLink, ArrowRight, Play, ChevronDown } from "lucide-react";

// ── Icônes sociales ────────────────────────────────────────────────────────
function FbIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IgIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>; }
function TkIcon() { return <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>; }

// ── Données projets ────────────────────────────────────────────────────────
const PROJETS = [
  {
    id: "miss",
    titre: "Miss & Mister Dour",
    soustitre: "Concours de beauté",
    desc: "Le grand concours de beauté, d'élégance et de représentation locale de Dour.",
    logo: LOGO_MISS,
    site: "https://www.missetmisterdour.be",
    accent: "#c9a84c",
    glow: "rgba(201,168,76,0.35)",
    socials: [
      { href: SOCIAL_LINKS.missMisterDour.facebook, Icon: FbIcon },
      { href: SOCIAL_LINKS.missMisterDour.instagram, Icon: IgIcon },
      { href: SOCIAL_LINKS.missMisterDour.tiktok, Icon: TkIcon },
    ],
    // direction d'entrée pour l'intro
    enterFrom: { x: 0, y: 120 },   // bas
  },
  {
    id: "fashion",
    titre: "Fashionist'ART",
    soustitre: "Mode, art & créativité",
    desc: "Plateforme dédiée à la mode artistique et à l'expression créative autour de Dour.",
    logo: LOGO_FASHION,
    site: "https://www.fashionistartdour.be",
    accent: "#c084fc",
    glow: "rgba(192,132,252,0.35)",
    socials: [
      { href: SOCIAL_LINKS.fashionistArt.facebook, Icon: FbIcon },
      { href: SOCIAL_LINKS.fashionistArt.instagram, Icon: IgIcon },
    ],
    enterFrom: { x: 200, y: 0 },   // droite
  },
  {
    id: "tdd",
    titre: "Le Tour de Dour",
    soustitre: "Reportages & vidéos",
    desc: "Des vidéos et reportages pour valoriser Dour et ses habitants.",
    logo: LOGO_TDD,
    site: "/tour-de-dour",
    accent: "#D47A2C",
    glow: "rgba(212,122,44,0.35)",
    internal: true,
    socials: [{ href: SOCIAL_LINKS.tourDeDour.facebook, Icon: FbIcon }],
    enterFrom: { x: -200, y: 0 },  // gauche
  },
  {
    id: "pv",
    titre: "P&V Assurances",
    soustitre: "Agence de Dour",
    desc: "Votre conseiller assurances de confiance à Dour.",
    logo: LOGO_PV,
    site: "https://www.assurancesdour.be",
    accent: "#4a9eff",
    glow: "rgba(74,158,255,0.35)",
    socials: [{ href: SOCIAL_LINKS.pvAssurances.facebook, Icon: FbIcon }],
    enterFrom: { x: 0, y: -120 },  // haut
  },
  {
    id: "synergie",
    titre: "Synergie Dour",
    soustitre: "Réseau local",
    desc: "Le réseau qui connecte les acteurs économiques de Dour.",
    logo: LOGO_SYNERGIE,
    site: "https://www.synergiedour.be",
    accent: "#6ee7b7",
    glow: "rgba(110,231,183,0.35)",
    socials: [{ href: SOCIAL_LINKS.synergieDour.facebook, Icon: FbIcon }],
    enterFrom: { x: 150, y: 150 }, // diagonale
  },
];

// ── Positions orbitales (5 cartes autour du centre) ───────────────────────
// Angles en degrés, rayon adaptatif
const ORBIT_ANGLES = [270, 342, 54, 126, 198]; // top, top-right, right-bottom, left-bottom, left-top

function getOrbitalPos(angle, radius) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

// ── Intro cinématique ──────────────────────────────────────────────────────
function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0: fond noir pur
  // phase 1: logo OT apparaît
  // phase 2: cartes arrivent une par une
  // phase 3: rotation orbitale commence → transition vers page

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),    // logo apparaît
      setTimeout(() => setPhase(2), 2000),   // cartes arrivent (plus tard)
      setTimeout(() => setPhase(3), 6000),   // tout en orbite
      setTimeout(() => onComplete(), 7200),  // fin intro (plus long)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#000" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Particules de fond */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              background: BRAND.gold,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={phase >= 1 ? {
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            } : {}}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Halo central doré */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 400, height: 400, background: `radial-gradient(ellipse, ${BRAND.gold}12 0%, transparent 70%)` }}
        animate={phase >= 1 ? { scale: [0.5, 1.2, 1], opacity: [0, 0.6, 0.3] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Logo Olivier Trevis central */}
      <motion.div
        className="relative z-10"
        style={{ width: 140, height: 140 }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-full h-full rounded-2xl overflow-hidden"
          style={{
            border: `2px solid ${BRAND.gold}60`,
            boxShadow: `0 0 60px ${BRAND.gold}40, 0 0 120px ${BRAND.gold}15`,
          }}
        >
          <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
        </div>
        {/* Anneau rotatif */}
        {phase >= 1 && (
          <motion.div
            className="absolute inset-[-12px] rounded-full"
            style={{ border: `1px solid ${BRAND.gold}30` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}
        {phase >= 1 && (
          <motion.div
            className="absolute inset-[-24px] rounded-full"
            style={{ border: `1px dashed ${BRAND.gold}15` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Cartes qui arrivent */}
      {PROJETS.map((p, i) => {
        const orbitRadius = 210;
        const finalPos = getOrbitalPos(ORBIT_ANGLES[i], orbitRadius);

        return (
          <motion.div
            key={p.id}
            className="absolute z-10"
            style={{ width: 90, height: 90 }}
            initial={{
              x: p.enterFrom.x * 4,
              y: p.enterFrom.y * 4,
              opacity: 0,
              scale: 0.4,
            }}
            animate={phase >= 2 ? {
              x: finalPos.x,
              y: finalPos.y,
              opacity: 1,
              scale: 1,
            } : phase >= 1 ? {
              x: p.enterFrom.x * 4,
              y: p.enterFrom.y * 4,
              opacity: 0,
              scale: 0.4,
            } : {}}
            transition={{
              delay: i * 0.45,
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="w-full h-full rounded-2xl overflow-hidden"
              style={{
                border: `1.5px solid ${p.accent}50`,
                boxShadow: `0 0 20px ${p.glow}`,
                background: BRAND.navy,
              }}
            >
              <img src={p.logo} alt={p.titre} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        );
      })}

      {/* Texte JS-Innov.IA */}
      <motion.p
        className="absolute bottom-8 text-xs tracking-[0.3em] font-light"
        style={{ color: BRAND.gold, opacity: 0 }}
        animate={phase >= 2 ? { opacity: 0.6 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
      >
        RÉALISÉ PAR JS-INNOV.IA
      </motion.p>
    </motion.div>
  );
}

// ── Carte projet orbitale (mode page) ─────────────────────────────────────
function OrbitalCard({ projet, angle, orbitRadius, isHovered, onHover, onLeave, introComplete }) {
  const pos = getOrbitalPos(angle, orbitRadius);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: isHovered ? 180 : 88,
        height: isHovered ? 220 : 88,
        x: pos.x - (isHovered ? 90 : 44),
        y: pos.y - (isHovered ? 110 : 44),
        zIndex: isHovered ? 20 : 10,
      }}
      initial={false}
      animate={{ opacity: introComplete ? 1 : 0, scale: introComplete ? 1 : 0.5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-full h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          border: `1.5px solid ${projet.accent}${isHovered ? "80" : "40"}`,
          boxShadow: isHovered
            ? `0 0 40px ${projet.glow}, 0 20px 60px rgba(0,0,0,0.6)`
            : `0 0 15px ${projet.glow}`,
          background: isHovered
            ? `linear-gradient(135deg, ${BRAND.navyLight}, ${BRAND.navy})`
            : BRAND.navy,
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <div className={`${isHovered ? "h-24" : "w-full h-full"} overflow-hidden flex-shrink-0`}>
          <img src={projet.logo} alt={projet.titre} className="w-full h-full object-cover" />
        </div>

        {/* Infos (visible au hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="flex-1 p-3 flex flex-col justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <p className="font-black text-white text-xs leading-tight">{projet.titre}</p>
                <p className="text-[10px] mt-0.5 font-medium" style={{ color: projet.accent }}>{projet.soustitre}</p>
              </div>

              {/* Socials */}
              <div className="flex gap-1 my-1.5">
                {projet.socials.map((s, si) => (
                  <a key={si} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: `${projet.accent}15`, color: projet.accent, border: `1px solid ${projet.accent}30` }}
                    onClick={e => e.stopPropagation()}>
                    <s.Icon />
                  </a>
                ))}
              </div>

              {/* Bouton */}
              {projet.internal ? (
                <Link to={projet.site}
                  className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold"
                  style={{ background: `${projet.accent}20`, color: projet.accent, border: `1px solid ${projet.accent}30` }}>
                  Voir <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              ) : (
                <a href={projet.site} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold"
                  style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: BRAND.navy }}>
                  Visiter <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ── Système orbital principal ──────────────────────────────────────────────
function OrbitalSystem({ introComplete }) {
  const [rotation, setRotation] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [paused, setPaused] = useState(false);
  const animRef = useRef(null);
  const lastTime = useRef(null);
  const rotRef = useRef(0);

  useEffect(() => {
    if (!introComplete) return;

    const animate = (time) => {
      if (lastTime.current !== null && !paused) {
        const delta = time - lastTime.current;
        rotRef.current += delta * 0.012; // vitesse rotation
        setRotation(rotRef.current);
      }
      lastTime.current = time;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [introComplete, paused]);

  // Rayon responsive
  const [orbitRadius, setOrbitRadius] = useState(220);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setOrbitRadius(w < 640 ? 140 : w < 1024 ? 180 : 230);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: orbitRadius * 2 + 200, height: orbitRadius * 2 + 200, maxWidth: "90vw", maxHeight: "90vw" }}
    >
      {/* Orbites visuelles */}
      {introComplete && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: orbitRadius * 2,
              height: orbitRadius * 2,
              border: `1px solid ${BRAND.gold}12`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: orbitRadius * 2 + 40,
              height: orbitRadius * 2 + 40,
              border: `1px dashed ${BRAND.gold}07`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </>
      )}

      {/* Logo central */}
      <motion.div
        className="relative z-20"
        initial={false}
        animate={{ opacity: introComplete ? 1 : 0, scale: introComplete ? 1 : 0.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Halo doré pulsant */}
        <motion.div
          className="absolute inset-[-20px] rounded-full"
          style={{ background: `radial-gradient(ellipse, ${BRAND.gold}18 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden"
          style={{
            border: `2px solid ${BRAND.gold}60`,
            boxShadow: `0 0 40px ${BRAND.gold}30, 0 0 80px ${BRAND.gold}10`,
          }}
        >
          <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
        </div>
        {/* Anneaux rotatifs */}
        <motion.div
          className="absolute inset-[-14px] rounded-full"
          style={{ border: `1px solid ${BRAND.gold}25` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[-28px] rounded-full"
          style={{ border: `1px dashed ${BRAND.gold}12` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Cartes orbitales */}
      {PROJETS.map((p, i) => {
        const currentAngle = ORBIT_ANGLES[i] + rotation;
        return (
          <OrbitalCard
            key={p.id}
            projet={p}
            angle={currentAngle}
            orbitRadius={orbitRadius}
            isHovered={hoveredId === p.id}
            onHover={() => { setHoveredId(p.id); setPaused(true); }}
            onLeave={() => { setHoveredId(null); setPaused(false); }}
            introComplete={introComplete}
          />
        );
      })}
    </div>
  );
}

// ── Section Actualités preview ─────────────────────────────────────────────
function ActuCard({ actu, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      className="group rounded-2xl overflow-hidden"
      style={{ background: BRAND.navyLight, border: `1px solid ${BRAND.gold}15` }}
    >
      {actu.image_url && (
        <div className="h-40 overflow-hidden">
          <img src={actu.image_url} alt={actu.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-5">
        <p className="text-[10px] tracking-widest font-semibold mb-2" style={{ color: BRAND.gold }}>
          {actu.categorie?.toUpperCase() || "ACTUALITÉ"}
        </p>
        <h3 className="font-black text-white text-sm leading-snug mb-2">{actu.titre}</h3>
        {actu.extrait && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: BRAND.silver }}>{actu.extrait}</p>
        )}
        <Link to="/actualites"
          className="inline-flex items-center gap-1 mt-3 text-xs font-bold"
          style={{ color: BRAND.gold }}>
          Lire <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.article>
  );
}

// ── PAGE PRINCIPALE ────────────────────────────────────────────────────────
export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [actus, setActus] = useState([]);

  useEffect(() => {
    Actualite.filter({ publie: true, a_la_une: true }).then(d => setActus(d.slice(0, 3))).catch(() => {});
    // Ne montrer l'intro qu'une fois par session
    const seen = sessionStorage.getItem("intro_seen");
    if (seen) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("intro_seen", "1");
    setIntroComplete(true);          // orbite démarre immédiatement
    setTimeout(() => setShowIntro(false), 1200); // intro fade-out après
  };

  return (
    <div className="min-h-screen text-white" style={{ background: BRAND.black }}>

      {/* ══ INTRO CINÉMATIQUE ══ */}
      <AnimatePresence>
        {showIntro && (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 1.0 }}>
            <CinematicIntro onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO — SECTION ORBITALE ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Fond */}
        <div className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${BRAND.navyLight} 0%, ${BRAND.black} 65%)` }} />
        <div className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(ellipse at 50% 40%, ${BRAND.gold} 0%, transparent 50%)` }} />

        {/* Lignes décoratives */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute inset-0 rounded-full border border-white"
              style={{ transform: `scale(${0.4 + i * 0.25})`, margin: "auto", width: "60vw", height: "60vw", top: "50%", left: "50%", marginLeft: "-30vw", marginTop: "-30vw" }} />
          ))}
        </div>

        {/* Système orbital */}
        <div className="relative z-10" style={{ opacity: introComplete ? 1 : 0, transition: "opacity 0.5s ease" }}>
          <OrbitalSystem introComplete={introComplete} />
        </div>

        {/* Titre sous le système */}
        <motion.div
          className="relative z-10 text-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="font-black text-2xl md:text-4xl tracking-wide text-white mb-2">
            OLIVIER TREVIS
          </h1>
          <p className="text-xs md:text-sm tracking-[0.25em] font-light" style={{ color: BRAND.gold }}>
            AGIR ET CONSTRUIRE ENSEMBLE
          </p>
          <p className="mt-3 text-xs" style={{ color: BRAND.silver, opacity: 0.6 }}>
            Survolez les projets pour découvrir l'écosystème
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" style={{ color: BRAND.gold, opacity: 0.5 }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ SECTION — Tour de Dour CTA ══ */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, #090d18 0%, #0e1628 100%)`,
              border: `1px solid #D47A2C30`,
            }}
          >
            {/* Halo */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: `radial-gradient(ellipse, #D47A2C, transparent)`, transform: "translate(30%, -30%)" }} />

            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0"
              style={{ border: `2px solid #D47A2C40`, boxShadow: "0 0 30px rgba(212,122,44,0.3)" }}>
              <img src={LOGO_TDD} alt="Tour de Dour" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-xs tracking-[0.2em] font-semibold mb-2" style={{ color: "#D47A2C" }}>SÉRIE DOCUMENTAIRE</p>
              <h2 className="font-black text-2xl md:text-3xl text-white mb-3">Le Tour de Dour</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: BRAND.silver }}>
                Partez à la découverte de Dour et de ses habitants à travers une série de reportages immersifs réalisés par Olivier Trevis.
              </p>
              <Link to="/tour-de-dour"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #D47A2C, #F0C982)", color: "#090d18" }}>
                <Play className="w-4 h-4" /> Voir les épisodes
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ══ SECTION — Actualités ══ */}
      {actus.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.3em] font-semibold mb-2" style={{ color: BRAND.gold }}>DERNIÈRES NOUVELLES</p>
              <h2 className="font-black text-2xl md:text-3xl text-white">Actualités</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {actus.map((a, i) => <ActuCard key={a.id} actu={a} i={i} />)}
            </div>
            <div className="text-center mt-8">
              <Link to="/actualites"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold"
                style={{ border: `1px solid ${BRAND.gold}30`, color: BRAND.gold }}>
                Toutes les actualités <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ FOOTER SIGNATURE ══ */}
      <motion.div
        className="py-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-xs tracking-[0.3em]" style={{ color: BRAND.gold, opacity: 0.5 }}>
          RÉALISÉ PAR JS-INNOV.IA
        </p>
      </motion.div>
    </div>
  );
}
