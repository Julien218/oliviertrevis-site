import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles } from "lucide-react";
import { SPIRIT_COLORS } from "@/api/mascottes";

export default function InteractiveExperience({ slug, interactif, devise }) {
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  const [revealA, setRevealA] = useState(false);
  const [revealB, setRevealB] = useState(false);

  if (!interactif) return null;

  return (
    <section className="relative py-24 px-6" style={{ background: "#0A0A0B" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: spirit.primary, opacity: 0.5 }}>
            Expérience
          </p>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Entrez dans son univers
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRevealA(v => !v)}
            className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-wider"
            style={{
              background: `linear-gradient(135deg, ${spirit.primary}, ${spirit.primary}cc)`,
              color: "#0A0A0B",
              boxShadow: `0 0 40px ${spirit.glow}`,
            }}
          >
            <Volume2 className="w-4 h-4" />
            {interactif.label}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRevealB(v => !v)}
            className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-wider"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${spirit.primary}40`,
              color: spirit.primary,
            }}
          >
            <Sparkles className="w-4 h-4" />
            Voir sa devise
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {revealA && (
            <motion.div
              key="a"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="p-6 rounded-2xl mb-4 italic"
              style={{
                background: `${spirit.primary}0d`,
                border: `1px solid ${spirit.primary}30`,
                color: "rgba(245,245,247,0.85)",
              }}
            >
              {interactif.revealText}
            </motion.div>
          )}
          {revealB && devise && (
            <motion.div
              key="b"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="p-6 rounded-2xl font-black uppercase tracking-wide"
              style={{
                fontFamily: "'Cinzel', serif",
                background: `${spirit.primary}0d`,
                border: `1px solid ${spirit.primary}30`,
                color: spirit.primary,
              }}
            >
              « {devise} »
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
