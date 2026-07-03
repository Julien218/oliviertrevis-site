import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";

function Bar({ label, value, spirit, delay }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: "rgba(245,245,247,0.75)", fontFamily: "'Montserrat', sans-serif" }}>
          {label}
        </span>
        <span className="text-xs font-black" style={{ color: spirit.primary }}>
          {value}%
        </span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ delay, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${spirit.primary}80, ${spirit.primary})` }}
        />
      </div>
    </div>
  );
}

export default function ScoreBars({ slug, scores }) {
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  if (!scores) return null;
  const entries = Object.entries(scores);

  return (
    <section className="relative py-24 px-6" style={{ background: "#0A0A0B" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: spirit.primary, opacity: 0.5 }}>
            Carte de jeu
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Score mascotte
          </h2>
          <div className="mt-4 h-px w-24 mx-auto"
            style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}, transparent)` }} />
        </motion.div>

        <div className="p-8 md:p-10 rounded-3xl"
          style={{
            background: "rgba(26,26,30,0.8)",
            border: `1px solid ${spirit.primary}25`,
            boxShadow: `0 0 60px ${spirit.bg}`,
            backdropFilter: "blur(12px)",
          }}>
          {entries.map(([label, value], i) => (
            <Bar key={label} label={label} value={value} spirit={spirit} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
