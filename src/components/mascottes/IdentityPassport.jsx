import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Sparkles, Award, Target, Quote, Star } from "lucide-react";
import { SPIRIT_COLORS } from "@/api/mascottes";

function Row({ icon: Icon, label, value, spirit }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${spirit.primary}18` }}>
        <Icon className="w-4 h-4" style={{ color: spirit.primary }} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5"
          style={{ color: spirit.primary, opacity: 0.65 }}>
          {label}
        </p>
        <p className="text-sm md:text-base" style={{ color: "rgba(245,245,247,0.9)", fontFamily: "'Montserrat', sans-serif" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function IdentityPassport({ slug, nom, espece, content }) {
  const spirit = SPIRIT_COLORS[slug] || SPIRIT_COLORS.lion;
  if (!content) return null;

  return (
    <section className="relative py-24 px-6" style={{ background: "#0A0A0B" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: spirit.primary, opacity: 0.5 }}>
            Carte d'identité
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Passeport mascotte
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(15,20,32,0.95), rgba(10,12,18,0.95))",
            border: `1.5px solid ${spirit.primary}45`,
            boxShadow: `0 0 80px ${spirit.bg}, inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-40"
            style={{ background: spirit.glow }} />

          <div className="relative flex items-center justify-between mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: spirit.primary }}>
              Tour de Dour · Officiel
            </p>
            <BadgeCheck className="w-5 h-5" style={{ color: spirit.primary }} />
          </div>

          <h3 className="relative text-2xl md:text-3xl font-black uppercase mb-1"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            {nom}
          </h3>
          <p className="relative text-xs uppercase tracking-[0.2em] mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            {espece}
          </p>

          <div className="relative">
            <Row icon={MapPin} label="Origine" value={content.origine} spirit={spirit} />
            <Row icon={Star} label="Lieu préféré" value={content.lieu_prefere} spirit={spirit} />
            <Row icon={Sparkles} label="Objet fétiche" value={content.objet_fetiche} spirit={spirit} />
            <Row icon={Award} label="Talent" value={content.talent} spirit={spirit} />
            <Row icon={Target} label="Mission" value={content.mission} spirit={spirit} />
          </div>

          {content.devise && (
            <div className="relative mt-6 pt-6 flex items-start gap-3" style={{ borderTop: `1px solid ${spirit.primary}25` }}>
              <Quote className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: spirit.primary }} />
              <p className="text-base md:text-lg font-bold italic"
                style={{ fontFamily: "'Cinzel', serif", color: spirit.primary }}>
                {content.devise}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
