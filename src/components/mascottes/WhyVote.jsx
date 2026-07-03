import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";

export default function WhyVote({ slug, nom, pourquoi }) {
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  if (!pourquoi || pourquoi.length === 0) return null;

  return (
    <section className="relative py-24 px-6" style={{ background: "#0E0E12" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: spirit.primary, opacity: 0.5 }}>
            Pourquoi elle
          </p>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Pourquoi voter pour {nom} ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pourquoi.map((txt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-6 rounded-2xl text-center"
              style={{
                background: "rgba(26,26,30,0.6)",
                border: `1px solid ${spirit.primary}18`,
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-black"
                style={{ background: `${spirit.primary}20`, color: spirit.primary }}>
                {i + 1}
              </div>
              <p className="text-sm md:text-base leading-relaxed"
                style={{ color: "rgba(245,245,247,0.75)", fontFamily: "'Montserrat', sans-serif" }}>
                {txt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
