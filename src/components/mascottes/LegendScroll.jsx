import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";

export default function LegendScroll({ mascotte, nomAffiche, histoire }) {
  const spirit = SPIRIT_COLORS[mascotte?.slug] || SPIRIT_COLORS.lion;
  const displayName = nomAffiche || mascotte?.nom || "cette mascotte";
  if (!histoire) return null;

  return (
    <section id="legende" className="relative py-24 px-6 scroll-mt-10" style={{ background: "#0E0E12" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      <div className="max-w-6xl mx-auto">
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
            La légende de {displayName.replace(/^(Le |La |L')/i, "")}
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
                    alt={displayName}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Right - Story text */}
          <div className="lg:col-span-3">
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base md:text-lg leading-[1.9] whitespace-pre-line"
              style={{ color: "rgba(245,245,247,0.7)", fontFamily: "'Montserrat', sans-serif" }}
            >
              {histoire}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
