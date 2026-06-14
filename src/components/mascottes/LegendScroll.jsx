import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";

function LegendBlock({ title, content, spirit, delay }) {
  if (!content) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="mb-12"
    >
      <h3 className="text-lg font-bold uppercase tracking-[0.15em] mb-4"
        style={{ color: spirit.primary, fontFamily: "'Cinzel', serif" }}>
        {title}
      </h3>
      <p className="text-sm md:text-base leading-[1.85] whitespace-pre-line"
        style={{ color: "rgba(245,245,247,0.6)", fontFamily: "'Montserrat', sans-serif" }}>
        {content}
      </p>
    </motion.div>
  );
}

export default function LegendScroll({ mascotte }) {
  const spirit = SPIRIT_COLORS[mascotte?.slug] || SPIRIT_COLORS.lion;

  return (
    <section className="relative py-24 px-6" style={{ background: "#0E0E12" }}>
      {/* Glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: spirit.primary, opacity: 0.5 }}>
            Légende
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Histoire & Origines
          </h2>
          <div className="mt-4 h-px w-24"
            style={{ background: `linear-gradient(90deg, ${spirit.primary}, transparent)` }} />
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left - Portrait sticky */}
          <div className="lg:col-span-2">
            {mascotte?.image_principale && (
              <div className="lg:sticky lg:top-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    border: `1px solid ${spirit.primary}20`,
                    boxShadow: `0 0 60px ${spirit.bg}`,
                  }}
                >
                  <img
                    src={mascotte.image_principale}
                    alt={mascotte.nom}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Right - Scrolling text */}
          <div className="lg:col-span-3">
            <LegendBlock title="Origines" content={mascotte?.origines} spirit={spirit} delay={0} />
            <LegendBlock title="Légende" content={mascotte?.legende} spirit={spirit} delay={0.1} />
            <LegendBlock title="Anecdotes" content={mascotte?.anecdotes} spirit={spirit} delay={0.2} />
            <LegendBlock title="Évolution" content={mascotte?.evolution} spirit={spirit} delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
}