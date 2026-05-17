import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LOGO_OT, LOGO_MISS, LOGO_FASHION, LOGO_TDD, LOGO_PV, LOGO_SYNERGIE, BRAND } from "@/api/supabase";

const ITEMS = [
  { titre: "Miss & Mister Dour", logo: LOGO_MISS,     site: "https://www.missetmisterdour.be",  c: "#c9a84c", external: true  },
  { titre: "Fashionist'ART",     logo: LOGO_FASHION,  site: "https://fashionistartdour.be", c: "#e91e8c", external: true  },
  { titre: "Le Tour de Dour",    logo: LOGO_TDD,      site: "/tour-de-dour",                    c: "#D47A2C", external: false },
  { titre: "P&V Assurances",     logo: LOGO_PV,       site: "https://www.assurancesdour.be",    c: "#dc2626", external: true  },
  { titre: "Synergie Dour",      logo: LOGO_SYNERGIE, site: "https://www.synergiedour.be",      c: "#3b82f6", external: true  },
];

export default function OrbitalSystem() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const R = isMobile ? 110 : 175; // rayon orbite en px
  const CENTER = isMobile ? 140 : 220; // taille totale div / 2
  const CARD = isMobile ? 72 : 92;     // taille carte

  return (
    <div className="relative mx-auto flex-shrink-0"
      style={{ width: CENTER * 2, height: CENTER * 2 }}>

      <style>{`
        @keyframes orbitLoop {
          from { transform: rotate(var(--a0)) translateX(var(--r)) rotate(calc(-1 * var(--a0))); }
          to   { transform: rotate(calc(var(--a0) + 360deg)) translateX(var(--r)) rotate(calc(-1 * (var(--a0) + 360deg))); }
        }
        .orb-item {
          position: absolute;
          top: 50%; left: 50%;
          transform-origin: center;
          animation: orbitLoop var(--dur) linear var(--dl) infinite;
          animation-play-state: var(--ps, running);
          margin-top: calc(var(--sz) / -2);
          margin-left: calc(var(--sz) / -2);
          width: var(--sz); height: var(--sz);
          will-change: transform;
        }
        .orb-item.paused { animation-play-state: paused !important; }

        @keyframes ringCw  { to { transform: rotate(360deg); }  }
        @keyframes ringCcw { to { transform: rotate(-360deg); } }
        .ring-cw  { animation: ringCw  22s linear infinite; }
        .ring-ccw { animation: ringCcw 35s linear infinite; }

        @keyframes centerGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.5), 0 0 30px rgba(201,168,76,0.15); }
          50%     { box-shadow: 0 0 0 18px rgba(201,168,76,0), 0 0 60px rgba(201,168,76,0.3); }
        }
        .center-glow { animation: centerGlow 3.2s ease-in-out infinite; }

        @keyframes particleDrift {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.6; }
          100% { transform: translate(-50%,-120%) scale(0);  opacity: 0; }
        }
      `}</style>

      {/* ── Anneaux décoratifs ── */}
      {/* Anneau 1 — pointillés externes */}
      <div className="ring-cw absolute rounded-full pointer-events-none"
        style={{
          width: R * 2 + 60, height: R * 2 + 60,
          top: CENTER - (R + 30), left: CENTER - (R + 30),
          border: `1px dashed rgba(201,168,76,0.14)`,
        }} />
      {/* Anneau 2 — orbite principale */}
      <div className="ring-ccw absolute rounded-full pointer-events-none"
        style={{
          width: R * 2, height: R * 2,
          top: CENTER - R, left: CENTER - R,
          border: `1px solid rgba(201,168,76,0.07)`,
        }} />
      {/* Anneau 3 — interne décoratif */}
      <div className="ring-cw absolute rounded-full pointer-events-none"
        style={{
          width: R * 2 - 80, height: R * 2 - 80,
          top: CENTER - (R - 40), left: CENTER - (R - 40),
          border: `1px dashed rgba(201,168,76,0.05)`,
        }} />

      {/* Halo fond centre */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 180, height: 180,
          top: CENTER - 90, left: CENTER - 90,
          background: `radial-gradient(circle, ${BRAND.gold}18 0%, transparent 70%)`,
          filter: "blur(20px)",
        }} />

      {/* ── Logo central OT ── */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -4 }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        className="center-glow absolute rounded-3xl overflow-hidden z-10 cursor-pointer"
        style={{
          width: isMobile ? 80 : 104,
          height: isMobile ? 80 : 104,
          top: CENTER - (isMobile ? 40 : 52),
          left: CENTER - (isMobile ? 40 : 52),
          border: `2px solid ${BRAND.gold}70`,
          background: BRAND.navy,
        }}>
        <img src={LOGO_OT} alt="Olivier Trevis" className="w-full h-full object-cover" />
      </motion.div>

      {/* ── Cartes orbitales ── */}
      {ITEMS.map((item, i) => {
        const angle = (360 / ITEMS.length) * i;
        const dur   = 20;
        const dl    = -(dur / ITEMS.length) * i;
        const isH   = hovered === i;

        const cardInner = (
          <div
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center relative cursor-pointer group"
            style={{
              background: `linear-gradient(155deg, rgba(13,27,42,0.97) 0%, rgba(4,8,16,0.99) 100%)`,
              border: `1.5px solid ${item.c}50`,
              boxShadow: isH
                ? `0 0 0 2px ${item.c}60, 0 12px 40px rgba(0,0,0,0.7), 0 0 24px ${item.c}30`
                : `0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
              transform: isH ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease",
              zIndex: isH ? 20 : 1,
            }}>
            {/* Ligne couleur top */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${item.c}90, transparent)` }} />
            {/* Halo fond */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 30%, ${item.c}40 0%, transparent 65%)` }} />
            {/* Logo */}
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 mb-1.5 relative z-10"
              style={{ border: `1px solid ${item.c}40` }}>
              <img src={item.logo} alt={item.titre} className="w-full h-full object-cover" />
            </div>
            {/* Titre */}
            <p className="text-center leading-tight font-black relative z-10 px-1"
              style={{
                fontSize: isMobile ? "6px" : "7.5px",
                color: item.c,
                fontFamily: "'Montserrat',sans-serif",
                letterSpacing: "0.03em",
                textShadow: `0 0 10px ${item.c}80`,
              }}>
              {item.titre}
            </p>
            {/* Icône flèche */}
            <ArrowUpRight className="mt-0.5 opacity-60 relative z-10" style={{ width: 10, height: 10, color: item.c }} />
          </div>
        );

        return (
          <div key={i}
            className={`orb-item${isH ? " paused" : ""}`}
            style={{
              "--a0": `${angle}deg`,
              "--r":  `${R}px`,
              "--dur":`${dur}s`,
              "--dl": `${dl}s`,
              "--sz": `${CARD}px`,
            }}>
            {item.external
              ? <a href={item.site} target="_blank" rel="noopener noreferrer" className="block w-full h-full">{cardInner}</a>
              : <Link to={item.site} className="block w-full h-full">{cardInner}</Link>
            }
          </div>
        );
      })}
    </div>
  );
}
