import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";

export default function MascotteHero({ mascotte }) {
  const slug = mascotte?.slug || "lion";
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      {mascotte?.image_principale && (
        <div className="absolute inset-0 z-0">
          <img
            src={mascotte.image_principale}
            alt={mascotte.nom}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.15) saturate(0.5)" }}
          />
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 80%, ${spirit.bg} 0%, transparent 60%), linear-gradient(180deg, #0A0A0B 0%, transparent 30%, transparent 70%, #0A0A0B 100%)`
          }} />
        </div>
      )}

      {/* Spirit glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(circle at 50% 60%, ${spirit.glow} 0%, transparent 50%)`
      }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-bold uppercase tracking-[0.4em] mb-6"
          style={{ color: spirit.primary, opacity: 0.7 }}
        >
          {mascotte?.espece || "Mascotte"}
        </motion.p>

        {/* Name - massive typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-black uppercase leading-none mb-4"
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(3.5rem, 14vw, 9rem)",
            letterSpacing: "0.05em",
            color: spirit.primary,
            textShadow: `0 0 60px ${spirit.glow}, 0 0 120px ${spirit.glow}`,
          }}
        >
          {mascotte?.nom || "Mascotte"}
        </motion.h1>

        {/* Surnom */}
        {mascotte?.surnom && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl italic mb-8"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Montserrat', sans-serif" }}
          >
            « {mascotte.surnom} »
          </motion.p>
        )}

        {/* Mascot portrait */}
        {mascotte?.image_principale && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden relative"
            style={{
              border: `3px solid ${spirit.primary}40`,
              boxShadow: `0 0 80px ${spirit.glow}, 0 0 160px ${spirit.bg}`,
            }}
          >
            <img
              src={mascotte.image_principale}
              alt={mascotte.nom}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
          style={{ borderColor: `${spirit.primary}40` }}>
          <div className="w-1 h-2 rounded-full" style={{ background: spirit.primary }} />
        </div>
      </motion.div>
    </section>
  );
}