import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";

export default function DnaValues({ slug, adn }) {
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  if (!adn || adn.length === 0) return null;

  return (
    <section className="relative py-24 px-6" style={{ background: "#0E0E12" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center md:text-left"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: spirit.primary, opacity: 0.5 }}>
            ADN visuel
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Ses valeurs
          </h2>
          <div className="mt-4 h-px w-24 mx-auto md:mx-0"
            style={{ background: `linear-gradient(90deg, ${spirit.primary}, transparent)` }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adn.map((v, i) => (
            <motion.div
              key={v.mot}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative p-6 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(26,26,30,0.8)",
                border: `1px solid ${spirit.primary}20`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl"
                style={{ background: spirit.glow }} />
              <p className="relative text-base font-bold uppercase tracking-wider mb-2"
                style={{ color: spirit.primary, fontFamily: "'Cinzel', serif" }}>
                {v.mot}
              </p>
              <p className="relative text-sm leading-relaxed"
                style={{ color: "rgba(245,245,247,0.7)", fontFamily: "'Montserrat', sans-serif" }}>
                {v.phrase}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
