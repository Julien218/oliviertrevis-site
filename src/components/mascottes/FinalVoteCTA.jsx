import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";
import { QUESTIONNAIRE_URL } from "@/data/mascotteContent";

export default function FinalVoteCTA({ slug, nom }) {
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  const displayName = nom?.replace(/^(Le |La |L')/i, "") || "cette mascotte";

  return (
    <section className="relative py-32 px-6 flex flex-col items-center justify-center text-center"
      style={{ background: "#0E0E12" }}>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${spirit.bg} 0%, transparent 50%)` }} />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em]"
          style={{ color: spirit.primary, opacity: 0.5 }}>
          À vous de choisir
        </p>

        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wide"
          style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
          Et vous, pensez-vous que {nom} représente Dour ?
        </h2>

        <motion.a
          href={QUESTIONNAIRE_URL}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 rounded-full font-black text-lg md:text-2xl uppercase tracking-[0.15em] relative overflow-hidden cursor-pointer"
          style={{
            fontFamily: "'Cinzel', serif",
            background: `linear-gradient(135deg, ${spirit.primary}, ${spirit.primary}cc)`,
            color: "#0A0A0B",
            boxShadow: `0 0 60px ${spirit.glow}, 0 8px 32px rgba(0,0,0,0.5)`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
            />
          </div>
          <span className="relative z-10">Je vote pour cette mascotte</span>
        </motion.a>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Cela ne prend qu'une minute.
        </p>
      </div>
    </section>
  );
}
