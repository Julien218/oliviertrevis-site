import { motion } from "framer-motion";

/**
 * Bouton "énergie" futuriste réutilisable pour les mascottes.
 * - Anneau conique rotatif (effet réacteur)
 * - Balayage scanline au survol
 * - Reticule HUD (coins ciblage) qui apparaît au hover/actif
 * - Pulse de glow quand sélectionné/actif
 *
 * IMPORTANT: n'affiche jamais le prénom définitif de la mascotte (nom).
 * On affiche l'espèce (label) + le surnom (subLabel) — le prénom reste
 * à choisir par le public via le vote.
 */
export default function EnergyMascotteButton({
  imageUrl,
  label, // ex: "Lion"
  subLabel, // ex: "Le Capitaine"
  color,
  glow,
  active = false,
  size = 120,
  onClick,
}) {
  const ringSize = size + 20;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center justify-center outline-none group"
      style={{ width: ringSize, height: ringSize + 14 }}
    >
      {/* Anneau conique rotatif — toujours présent, plus visible si actif */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${color} 15%, transparent 30%, transparent 70%, ${color} 85%, transparent 100%)`,
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
          opacity: active ? 0.95 : 0.35,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: active ? 3 : 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Halo pulsant quand actif */}
      {active && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: `0 0 40px 6px ${glow}` }}
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Reticule HUD — coins qui s'écartent au hover / actif */}
      {[
        { top: 0, left: 0, rot: 0 },
        { top: 0, right: 0, rot: 90 },
        { bottom: 0, right: 0, rot: 180 },
        { bottom: 0, left: 0, rot: 270 },
      ].map((corner, i) => (
        <motion.svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          className="absolute pointer-events-none"
          style={{
            ...corner,
            transform: `rotate(${corner.rot}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0.6,
          }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          <path d="M1 6 L1 1 L6 1" stroke={color} strokeWidth="1.5" fill="none" />
        </motion.svg>
      ))}

      {/* Avatar circulaire */}
      <div
        className="relative overflow-hidden rounded-full z-10"
        style={{
          width: size,
          height: size,
          border: `2px solid ${active ? color + "90" : color + "30"}`,
          boxShadow: active ? `0 0 30px ${glow}` : "none",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: `${color}20` }} />
        )}

        {/* Scanline — balayage lumineux au survol */}
        <motion.div
          className="absolute left-0 right-0 h-1/3 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent, ${color}55, transparent)`,
          }}
          initial={{ top: "-40%" }}
          animate={{ top: ["-40%", "120%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
        />
      </div>

      {/* Espèce (jamais le prénom) */}
      <motion.span
        className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] relative z-10 leading-tight"
        style={{ color: active ? color : "rgba(255,255,255,0.45)" }}
        animate={active ? { textShadow: [`0 0 0px ${glow}`, `0 0 12px ${glow}`, `0 0 0px ${glow}`] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {label}
      </motion.span>

      {/* Surnom (flavor text, pas un prénom) */}
      {subLabel && (
        <span
          className="text-[9px] uppercase tracking-[0.1em] relative z-10 leading-tight"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {subLabel}
        </span>
      )}
    </motion.button>
  );
}
