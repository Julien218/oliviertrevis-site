import { motion } from "framer-motion";
import { SPIRIT_COLORS } from "@/api/mascottes";

function DataPoint({ label, value, delay, spirit }) {
  if (!value) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative p-5 rounded-2xl"
      style={{
        background: "rgba(26,26,30,0.8)",
        border: `1px solid ${spirit.primary}18`,
        backdropFilter: "blur(12px)",
      }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2"
        style={{ color: spirit.primary, opacity: 0.6 }}>
        {label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(245,245,247,0.85)", fontFamily: "'Montserrat', sans-serif" }}>
        {value}
      </p>
      {/* Glow line */}
      <div className="absolute bottom-0 left-4 right-4 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}30, transparent)` }} />
    </motion.div>
  );
}

export default function IdentityHud({ mascotte }) {
  const spirit = SPIRIT_COLORS[mascotte?.slug] || SPIRIT_COLORS.lion;

  const fields = [
    { label: "Nom", value: mascotte?.nom },
    { label: "Espèce", value: mascotte?.espece },
    { label: "Surnom", value: mascotte?.surnom },
    { label: "Personnalité", value: mascotte?.personnalite },
    { label: "Particularités", value: mascotte?.particularites },
    { label: "Lieu associé à Dour", value: mascotte?.lieu_associe },
  ];

  return (
    <section className="relative py-24 px-6" style={{ background: "#0A0A0B" }}>
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-16"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
          style={{ color: spirit.primary, opacity: 0.5 }}>
          Données
        </p>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide"
          style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
          Carte d'identité
        </h2>
        <div className="mt-4 h-px w-24"
          style={{ background: `linear-gradient(90deg, ${spirit.primary}, transparent)` }} />
      </motion.div>

      {/* Description full width */}
      {mascotte?.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(245,245,247,0.6)", fontFamily: "'Montserrat', sans-serif" }}>
            {mascotte.description}
          </p>
        </motion.div>
      )}

      {/* Data grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f, i) => (
          <DataPoint key={f.label} label={f.label} value={f.value} delay={i * 0.08} spirit={spirit} />
        ))}
      </div>
    </section>
  );
}