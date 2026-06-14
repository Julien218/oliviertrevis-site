import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPIRIT_COLORS, submitVote } from "@/api/mascottes";

function spawnParticles(container, color) {
  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < 24; i++) {
    const p = document.createElement("div");
    const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.3;
    const dist = 60 + Math.random() * 120;
    const size = 3 + Math.random() * 5;
    const dur = 600 + Math.random() * 500;

    Object.assign(p.style, {
      position: "fixed",
      left: cx + "px",
      top: cy + "px",
      width: size + "px",
      height: size + "px",
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 8px ${color}`,
      pointerEvents: "none",
      zIndex: "9999",
      transition: `all ${dur}ms cubic-bezier(.22,1,.36,1)`,
      opacity: "1",
    });

    document.body.appendChild(p);

    requestAnimationFrame(() => {
      p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
      p.style.opacity = "0";
    });

    setTimeout(() => p.remove(), dur + 100);
  }
}

export default function VoteSection({ mascotte }) {
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const btnRef = useRef(null);
  const spirit = SPIRIT_COLORS[mascotte?.slug] || SPIRIT_COLORS.lion;

  const handleVote = useCallback(async () => {
    if (voted || loading) return;
    setLoading(true);

    // Particle explosion
    if (btnRef.current) spawnParticles(btnRef.current, spirit.primary);

    const result = await submitVote(mascotte?.slug, mascotte?.nom);
    setLoading(false);
    setVoted(true);
  }, [voted, loading, mascotte, spirit]);

  return (
    <section className="relative py-32 px-6 flex flex-col items-center justify-center"
      style={{ background: "#0E0E12" }}>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${spirit.bg} 0%, transparent 50%)` }} />

      <AnimatePresence mode="wait">
        {!voted ? (
          <motion.div
            key="vote"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-8 relative z-10"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.5em]"
              style={{ color: spirit.primary, opacity: 0.5 }}>
              Vote confidentiel
            </p>

            <motion.button
              ref={btnRef}
              onClick={handleVote}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 rounded-full font-black text-lg md:text-2xl uppercase tracking-[0.2em] relative overflow-hidden cursor-pointer"
              style={{
                fontFamily: "'Cinzel', serif",
                background: `linear-gradient(135deg, ${spirit.primary}, ${spirit.primary}cc)`,
                color: "#0A0A0B",
                boxShadow: `0 0 60px ${spirit.glow}, 0 8px 32px rgba(0,0,0,0.5)`,
                minHeight: "56px",
              }}
            >
              {/* Sweep animation */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/3"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
                />
              </div>
              <span className="relative z-10">
                {loading ? "..." : `Rallier le ${mascotte?.nom || "clan"}`}
              </span>
            </motion.button>

            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              Votre vote est anonyme et confidentiel
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
              style={{ background: `${spirit.primary}20`, border: `2px solid ${spirit.primary}50` }}
            >
              ✓
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide"
              style={{ fontFamily: "'Cinzel', serif", color: spirit.primary }}>
              Vote enregistré
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Merci pour votre soutien !
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}